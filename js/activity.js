$(function(){
	var activity_url = queryURL(location.href);
	var commodity_id=activity_url.commodity_id;
	var token=null;
	var has_mobile=true;
	//通过code判断用户是否绑定过手机号
	if(activity_url.code){
			$.ajax({
				type:'post',
				url:'https://api.speaka.live/api/u/wxinfo',
				data:{
					code:activity_url.code
				},
				async:false,
				success:function(data){
					console.log(data);
					if(data.code==200){
						token='Bearer '+data.data.token;
						if(data.data.has_mobile==1){
							has_mobile=true;
						}else{
							has_mobile=false;
						}
					}
				},
				error:function(res){
					console.log(JSON.stringify(res))
				}
			})
	 }else{
		window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b778a82184cf52f&redirect_uri='+encodeURI(location.href.split("?")[0]+'?commodity_id='+commodity_id)+'%26joy_from='+activity_url.joy_from+'%26order_no='+activity_url.group_order+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
	 }
	 //判断用户是否购买过改商品
	$.ajax({
		type:"get",
		url:"https://api.speaka.live/api/commoditybuy/" + commodity_id,
		async:false,
		data:{
			token:token
		},
		success:function(res){
			console.log(res);
			if(res.code==403||res.code==404||res.code==405){
                alert('已购买过该产品')
				$('.buy_success .buy_pay p').eq(1).click(function(){
					if (window.webkit) {
						window.location.href='https://itunes.apple.com/cn/app/speak-a/id1345905287';
					} else {
						window.location.href='https://www.pgyer.com/q8oQ';
					}
				});
			}
		},
		error:function(res){
			console.log(res);
		}
	});
	//点击单人购
	$('.buyAlone_btn').click(function(){
		pay(0);
	})
	//点击开团按钮
	$('.group_btn').click(function(){
		if(has_mobile){
			pay(1);	
		}else{
			$('.login_mask').show()
		}
	})
	/**
	 * 调取支付,typeId订单类型   0普通订单    1团购订单
	 */
	function pay(typeId){
		$.ajax({
			type:"post",
			url:"https://api.speaka.live/api/order/insertOrder",
			async:true,
			dataType:'JSON',
			data:{
				commodity_id: commodity_id,
				type_id: typeId,
				pay_type:0,
				from_type:0,
				order_no: activity_url.order_no,
				joy_from:activity_url.joy_from,
				location: window.location.href
			},
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success:function(data){
				if(data.status==-1){
					alert('请登录后重试！')
				}
			   if (data.code == 200) {
	            console.log(data.data.config);
				//微信支付
				//通过config接口注入权限验证配置
				wx.config({
					debug: data.data.config.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: data.data.config.appId, // 必填，公众号的唯一标识
					timestamp: data.data.config.timestamp, // 必填，生成签名的时间戳
					nonceStr: data.data.config.nonceStr, // 必填，生成签名的随机串
					signature: data.data.config.signature, // 必填，签名
					jsApiList: data.data.config.jsApiList // 必填，需要使用的JS接口列表
				});
				//通过ready接口处理成功验证
				wx.ready(function () {
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
						wx.chooseWXPay({
	
							timestamp: data.data.pay_config.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	
							nonceStr: data.data.pay_config.nonceStr, // 支付签名随机串，不长于 32 位
	
							package: data.data.pay_config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
	
							signType: data.data.pay_config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
	
							paySign: data.data.pay_config.paySign, // 支付签名
	
							success: function success(data) {
								// 支付成功后的回调函数
							    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b778a82184cf52f&redirect_uri='+encodeURI(location.href.split("?")[0]+'?commodity_id='+commodity_id)+'%26joy_from='+activity_url.joy_from+'%26order_no='+ data.data.order_no+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
							}
						});
				});
				//通过error接口处理失败验证
				wx.error(function (res) {
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					console.log(res);
				});
				//判断当前客户端版本是否支持指定JS接口
				wx.checkJsApi({
					jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
					success: function success(res) {
						// 以键值对的形式返回，可用的api值true，不可用为false
						// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
					}
				});
			} else {
					if (data.code == 401) {
						alert('课程状态异常！');
					}else if (data.code == 402) {
						alert('课程已下架！');
					}else if (data.code == 403) {
						alert('课程已经卖完啦！');
					}else if (data.code == 404) {
						alert('订单支付方式错误！');
					}else if (data.code == 405) {
						alert('来源非法！');
					}else if (data.code == 406) {
						alert('订单类型非法！');
					}else if (data.code == 410) {
						alert('您已经参团了！');
					}else if (data.code == 411) {
						alert('当前url非法！');
					}else if (data.code == 412) {
						alert('优惠券id错误！');
					}else if (data.code == 413) {
						alert('推荐人非法！');
					}else if (data.code == 420) {
						alert('下单失败请重试！');
					}else if (data.code == 422) {
						alert('余额不足！');
					}else if (data.code == 423) {
						alert('当前课程不允许开团！');
					}else if (data.code == 424) {
						alert('你已经购过该课程，请勿重复购买！');
					}else if (data.code == 425) {
						alert('该课程购买时间已过！');
					}
				}
			}
		});
	}
	//分享设置
	$.post("https://api.speaka.live/api/weChat/wxconfig", {
		location: window.location.href
	}, function (data) {
		if (data.status == 1) {
			//微信支付
			//通过config接口注入权限验证配置
			wx.config({
				debug: data.config.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.config.appId, // 必填，公众号的唯一标识
				timestamp: data.config.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.config.nonceStr, // 必填，生成签名的随机串
				signature: data.config.signature, // 必填，签名
				jsApiList: data.config.jsApiList // 必填，需要使用的JS接口列表
			});
			//通过ready接口处理成功验证
			wx.ready(function () {
				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
				wx.onMenuShareAppMessage({
					title: '【推荐2人免费学】跟着美国家庭学英语，看世界！', // 分享标题    
					desc: 'Youtube网红家庭中国首秀，台湾帅气老师Lyle实时互动讲解，趣味练习巩固效果。', // 分享描述    
					link: 'https://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id + '&joy_from=' + joy_from, // 分享链接    
					imgUrl: 'https://s.speaka.live/static/logo-white.png', // 分享图标    
					type: '', // 分享类型,music、video或link，不填默认为link    
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空    
					success: function success() {
						// 用户确认分享后执行的回调函数    
						window.location.href = 'https://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id + '&joy_from=' + joy_from;
					},
					cancel: function cancel() {
						// 用户取消分享后执行的回调函数    
						window.location.href = 'https://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id + '&joy_from=' + joy_from;
					}
				});
				wx.onMenuShareTimeline({
					title: '【6~12岁英文微课】跟着美国家庭学英语，看世界！', // 分享标题    
					link: 'https://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id  + '&joy_from=' + joy_from, // 分享链接    
					imgUrl: 'https://s.speaka.live/static/logo-white.png', // 分享图标    
					success: function success() {
						// 用户确认分享后执行的回调函数    
						window.location.href = 'https://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id  + '&joy_from=' + joy_from;
					},
					cancel: function cancel() {
						// 用户取消分享后执行的回调函数    
						window.location.href = 'https://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id  + '&joy_from=' + joy_from;
					}
				});
			});
			//通过error接口处理失败验证
			wx.error(function (res) {
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

			});
			//判断当前客户端版本是否支持指定JS接口
			wx.checkJsApi({
				jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
				success: function success(res) {
					// 以键值对的形式返回，可用的api值true，不可用为false
					// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
				}
			});
		} else {
			alert('验证信息已失效，请重新获取订单信息！');
		}
	}, 'json');
	
	
    //新用户绑定手机号发送验证码
	$('.get_code').click(function(e){
		e.stopPropagation();
		var phone=$('.phone').val()	;
		var num=59;
		$.ajax({
			type:"get",
			url:"https://api.speaka.live/api/sms",
			data:{
              mobile:phone				
			},
			async:false,
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success:function(data){
				if(data.status==1){
					console.log(data);
					$('.send_btn').removeClass('get_code');
					var stopTime=setInterval(function(){
					$('.send_btn').html(num+'s');
					 if(num==-1){
						clearInterval(stopTime);
						$('.send_btn').addClass('get_code');
						$('.send_btn').html('发送验证码');
					  }
					 num--;
					},1000)
				}
				if(data.status==0){
					alert(data.info)
				}
			},
			error:function(res){
				console.log(JSON.stringify(res))
			}
		});
		console.log(phone)
		return false;
	})
	//点击确定绑定手机号
	$('.submit_btn').click(function(){
		var phone=$('.phone').val()	;
		var verifyCode=$('.phone_code').val();
		$.ajax({
			type:"post",
			url:"https://api.speaka.live/api/u/update",
			data:{
              mobile:phone,
              verifyCode:verifyCode
			},
			async:false,
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success:function(data){
				console.log(data)
				if(data.status==1){
					pay(1)
				}else{
					alert(data.info)
				}
			},
			error:function(res){
				alert('验证信息错误请返回重试！')
				console.log(JSON.stringify(res))
			}
		});
	})
	//关闭手机号绑定窗口
	$('.close_phone').on('click',function(){
		$('.login_mask').hide()
		$('.phone').val('');
		$('.phone_code').val('');
	})
	//将url参数转对象
	function queryURL(url) {
		var arr1 = url.split("?");
		var params = arr1[1].split("&"); //进行分割成数组
		var obj = {};
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split("="); //进行分割成数组
			obj[param[0]] = param[1]; //为对象赋值
		}
		return obj;
	}
		//去掉alert显示网页
	window.alert = function(name) {
		var iframe = document.createElement("IFRAME");
		iframe.style.display = "none";
		iframe.setAttribute("src", 'data:text/plain,');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
	};
})
