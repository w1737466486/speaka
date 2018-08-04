'use strict';

$(function () {
	//获取当前url
	var group_url = location.href;
	var groupurl = queryURL(group_url);
	var group_order=groupurl.order_no;
	//判断是否购买
	var isbuy_code=groupurl.code;
    console.log(isbuy_code);
    var isbuy_token=null;
    var u_id=groupurl.u_id;//null
	var u_id_new=null;
	var commodity_id = groupurl.commodity_id;
	var joy_from=groupurl.joy_from;
	var share_dec=true;
	//判断是否是购买成功的回调
	if(groupurl.is_pay){	
		$('.v_nav').hide();
		$('html').css({
			'height':'100%'
		})
	}else{
		$('#course_progress').hide();
	}
	//显示推荐人信息
	if(u_id&&u_id!='undefined'){
		$('.share_dec').css({'right':'-80px'});
		$.ajax({
			type:"get",
			//url:'http://dev.speaka.cn/api/u/head',
			url:'https://api.speaka.live/api/u/head',
			data:{
				id:u_id
			},
			async:true,
			success:function(data){
				console.log(data);
				if(data.code==200){
					if(data.data[u_id].head_wx==null){
						$('.share_wxhead img').attr('src','https://s.speaka.live/' +data.data[u_id].head);
					}else{
						$('.share_wxhead img').attr('src',data.data[u_id].head_wx);
					}
					$('.share_dec p b').eq(1).html(data.data[u_id].name);
				}
			},
			error:function(res){
				console.log(res);
			}
		});
	}
	$('.share_dec').click(function(){
			if(share_dec){
				$('.share_dec').css({'right':'0px'});
				share_dec=false;
			}else{
				$('.share_dec').css({'right':'-80px'});
				share_dec=true;
			}
		});
	
	if (isWeiXin()) {
		if(isbuy_code){
		$.ajax({
			type:"get",
			url:"https://api.speaka.live/api/commoditybuy/" + commodity_id+'?code='+isbuy_code,
			async:false,
			success:function(res){
				u_id_new=res.now_uid;
				console.log(res);
				 if(!res.token){
				 	window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b778a82184cf52f&redirect_uri='+encodeURI(location.href.split("?")[0]+'?commodity_id='+commodity_id)+'%26joy_from='+joy_from+'%26order_no='+group_order+'%26u_id='+u_id+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
				 }else{
				 	isbuy_token=res.token;
				 }
				
			},
			error:function(res){
				console.log(res);
			}
		});
	 }else{
		window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b778a82184cf52f&redirect_uri='+encodeURI(location.href.split("?")[0]+'?commodity_id='+commodity_id)+'%26joy_from='+joy_from+'%26order_no='+group_order+'%26u_id='+u_id+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
	  }
	}
	if (groupurl.is_share == 1) {
		$('.group_share').show();
		$('.group_share').click(function () {
			$('.group_share').hide();
		});
	}
	$('.group_share').click(function () {
		$('.group_share').hide();
	});
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
	//判断是否是微信浏览器
	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

	$.ajax({
		type: "get",
		url: "https://api.speaka.live/api/commodity/" + commodity_id,
		//url:"../json/ocean.json",
		async: true,
		success: function success(data) {
			console.log(data);
			$('.v_nav .v_s1').html(data.eng);
			$('.v_nav .v_s2').html(data.chn);
			$('.v_nav>img').attr('src', 'https://s.speaka.live/' + data.pic_path);
			for (var i = 0; i < data.pages.length; i++) {
					if(data.pages[i].type==1){
						$('.v_img').append('<div class="img_video" width="100%"><video controls="true" poster="https://s.speaka.live/' + data.pages[i].pic_path+'" controlslist="nodownload" width="100%" src="https://s.speaka.live/'+data.pages[i].video_path+'"></video><img src="../img/Play.png"/></div> ');
					}
					if(data.pages[i].type==0){
						$('.v_img').append('<img src="https://s.speaka.live/' + data.pages[i].pic_path+'"/>');
					}
			}
			var _stop=true;
			$('.img_video').click(function(){
				if(_stop){
					_stop=false;
					$(this).find('video').trigger('play');
					$(this).find('img').remove();
				}else{
					_stop=true;
					$(this).find('video').trigger('pause');
					$(this).append('<img src="../img/Play.png"/>');
				}
				
			});
			$('.v_det .v_det_s1').html('开课时间：' + data.begin_time.substr(0, 10));
			$('.v_det .v_det_s2').html('课程时长：' + data.last_days + '天');
			$('.v_det .v_det_s3').html('购买截止时间：' + data.begin_time.substr(0, 10));
			$('.group_foot p span').eq(0).html('<div>￥' + data.price / 100 + '</div><b>单人购</b>');
			$('.group_foot p span').eq(1).html('<div>￥' + data.groupon_price / 100 + '</div><b>团购省 ' + (data.price / 100-data.groupon_price / 100) + ' 元</b>');	
			$.ajax({
					type:"get",
					url:"https://api.speaka.live/api/commoditybuy/" + commodity_id+'?token='+'Bearer ' +isbuy_token,
					async:false,
					success:function(res){
						console.log(res);
						if(res.code==403||res.code==404||res.code==405){
							$('.v_nav').hide();
							$('#course_progress').show();
							$('html').css({'height':'100%'});
							$('.group_foot').hide();
							$('.buy_success').show();
							$('.buy_success .buy_pay p').eq(0).click(function(){
								if (window.webkit) {
									window.location.href='https://itunes.apple.com/cn/app/speak-a/id1345905287';
								} else {
									window.location.href='https://www.pgyer.com/q8oQ';
								}
							});
							$('.buy_success .buy_pay p').eq(1).click(function(){
								$('.group_share').show();
							});
						}else{
							$('#course_progress').hide();
						}
						
					},
					error:function(res){
						console.log(res);
					}
				});
			//微信配置
			//优惠金额
			var discount_amount = data.price / 100 - data.groupon_price / 100;
		},
		error: function error(_error) {
			console.log(_error);
		}
	});

	//获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
	function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var _hours = date.getHours();
		var _minutes = date.getMinutes();
		var _seconds = date.getSeconds();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if (_hours >= 0 && _hours <= 9) {
			_hours = "0" + _hours;
		}
		if (_minutes >= 0 && _minutes <= 9) {
			_minutes = "0" + _minutes;
		}
		if (_seconds >= 0 && _seconds <= 9) {
			_seconds = "0" + _seconds;
		}

		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + _hours + seperator2 + _minutes + seperator2 + _seconds;
		return currentdate;
	}
	//获取微信头像
	$.ajax({
		type: "get",
		url: "https://api.speaka.live/api/order_group/" + groupurl.order_no,
		async: true,
		success: function success(data) {
			console.log(data);
			if (data.group.length > 0) {
				var group_member = $('.group_member li');
				for (var i = 0; i < data.group.length; i++) {
					if(data.group[i].user_info.head_wx==null){
						$('.group_member li').eq(i).find('img').eq(1).attr('src','https://s.speaka.live/' +data.group[i].user_info.head);
					}else{
						$('.group_member li').eq(i).find('img').eq(1).attr('src',data.group[i].user_info.head_wx);
					}
					
					$('.group_member li').eq(i).find('b').html(data.group[i].user_info.name);
				}
				if(!u_id||u_id=='undefined'){
					u_id=data.group[0].u_id;
				}
			}
			var curr_time = getNowFormatDate();
			var last_time = data.limit_at;
			curr_time = curr_time.substr(0, 4) + '/' + curr_time.substr(5, 2) + '/' + curr_time.substr(8, 2) + ' ' + curr_time.substr(11);
			last_time = last_time.substr(0, 4) + '/' + last_time.substr(5, 2) + '/' + last_time.substr(8, 2) + ' ' + last_time.substr(11);
			//console.log(last_time)
			curr_time = new Date(curr_time).valueOf();
			last_time = new Date(last_time).valueOf();

			//剩余总时间
			var remain_time = last_time / 1000 - curr_time / 1000;
			console.log(remain_time);
			//剩余时
			var remain_hours = Math.floor(remain_time / 3600);
			console.log(remain_hours);
			//剩余分
			var remain_min = Math.floor((remain_time - remain_hours * 3600) / 60);
			console.log(remain_min);
			//剩余秒
			var remain_sec = Math.floor(remain_time - remain_hours * 3600 - remain_min * 60);
			console.log(remain_sec);
			$('.group_head p').eq(1).find('span').eq(0).html(remain_hours);
			$('.group_head p').eq(1).find('span').eq(1).html(remain_min);
			$('.group_head p').eq(1).find('span').eq(2).html(remain_sec);

			if (remain_time > 0 && data.group.length >= 3 && data.group.length < 10) {
				$('.group_head p').eq(0).html('该拼团已成团！');
			} else if (data.group.length >= 10) {
				$('.group_head p').eq(0).html('该拼团人数已满！');
				$('.group_head p').eq(1).find('span').eq(0).html('00');
				$('.group_head p').eq(1).find('span').eq(1).html('00');
				$('.group_head p').eq(1).find('span').eq(2).html('00');
				$('.group_foot p').eq(1).css({
					'cursor': 'default',
					'opacity': '0.2'
				});
			} else if (remain_time <= 0 && data.group.length < 3) {
				$('.group_head p').eq(0).html('拼团失败！');
				$('.group_head p').eq(1).find('span').eq(0).html('00');
				$('.group_head p').eq(1).find('span').eq(1).html('00');
				$('.group_head p').eq(1).find('span').eq(2).html('00');
				$('.group_foot p').eq(1).css({
					'cursor': 'default',
					'opacity': '0.2'
				});
			} else if (remain_time <= 0) {
				$('.group_head p').eq(0).html('该拼团已结束');
				$('.group_head p').eq(1).find('span').eq(0).html('00');
				$('.group_head p').eq(1).find('span').eq(1).html('00');
				$('.group_head p').eq(1).find('span').eq(2).html('00');
				$('.group_foot p').eq(1).css({
					'cursor': 'default',
					'opacity': '0.2'
				});
			}
			if (remain_time > 0 && data.group.length ==1){
				$('.group_head p').eq(0).html('还差<i>2</i>人成团');
			}
			if (remain_time > 0 && data.group.length ==2){
				$('.group_head p').eq(0).html('还差<i>1</i>人成团');
			}

			//设置定时器
			setInterval(function () {
				var curr_time = getNowFormatDate();
				var last_time = data.limit_at;
				curr_time = curr_time.substr(0, 4) + '/' + curr_time.substr(5, 2) + '/' + curr_time.substr(8, 2) + ' ' + curr_time.substr(11);
				last_time = last_time.substr(0, 4) + '/' + last_time.substr(5, 2) + '/' + last_time.substr(8, 2) + ' ' + last_time.substr(11);
				curr_time = new Date(curr_time).valueOf();
				last_time = new Date(last_time).valueOf();

				//剩余总时间
				var remain_time = last_time / 1000 - curr_time / 1000;
				//剩余时
				var remain_hours = Math.floor(remain_time / 3600);
				//console.log(remain_hours)
				//剩余分
				var remain_min = Math.floor((remain_time - remain_hours * 3600) / 60);
				//console.log(remain_min)
				//剩余秒
				var remain_sec = Math.floor(remain_time - remain_hours * 3600 - remain_min * 60);
				//console.log(remain_sec)
				$('.group_head p').eq(1).find('span').eq(0).html(remain_hours);
				$('.group_head p').eq(1).find('span').eq(1).html(remain_min);
				$('.group_head p').eq(1).find('span').eq(2).html(remain_sec);
				if (remain_time > 0 && data.group.length >= 3 && data.group.length <= 10) {
					$('.group_head p').eq(0).html('该拼团已成团！');
				} else if (data.group.length > 10) {
					$('.group_head p').eq(0).html('该拼团人数已满！');
					$('.group_head p').eq(1).find('span').eq(0).html('00');
					$('.group_head p').eq(1).find('span').eq(1).html('00');
					$('.group_head p').eq(1).find('span').eq(2).html('00');
					$('.group_foot p').eq(1).css({
						'cursor': 'default',
						'opacity': '0.2'
					});
				} else if (remain_time <= 0 && data.group.length < 3) {
					$('.group_head p').eq(0).html('拼团失败！');
					$('.group_head p').eq(1).find('span').eq(0).html('00');
					$('.group_head p').eq(1).find('span').eq(1).html('00');
					$('.group_head p').eq(1).find('span').eq(2).html('00');
					$('.group_foot p').eq(1).css({
						'cursor': 'default',
						'opacity': '0.2'
					});
				} else if (remain_time <= 0) {
					$('.group_head p').eq(0).html('该拼团已结束');
					$('.group_head p').eq(1).find('span').eq(0).html('00');
					$('.group_head p').eq(1).find('span').eq(1).html('00');
					$('.group_head p').eq(1).find('span').eq(2).html('00');
					$('.group_foot p').eq(1).css({
						'cursor': 'default',
						'opacity': '0.2'
					});
				}
				if (remain_time > 0 && data.group.length ==1){
					$('.group_head p').eq(0).html('还差<i>2</i>人成团');
				}
				if (remain_time > 0 && data.group.length ==2){
					$('.group_head p').eq(0).html('还差<i>1</i>人成团');
				}
				if (remain_time > 0 && data.group.length <= 10) {
					$('.group_foot p').eq(1).click(function () {
						alert(window.location.href = 'https://api.speaka.live/api/buy/'+commodity_id+'?type_id=' + 12 + '&commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id + '&joy_from=' + joy_from)
						window.location.href = 'https://api.speaka.live/api/buy/'+commodity_id+'?type_id=' + 12 + '&commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id + '&joy_from=' + joy_from ;
					});
				}
			}, 1000);
		},
		error: function error(_error2) {
			console.log(_error2);
		}
	});

	$.post("https://api.speaka.live/api/wxconfig", {
		location: window.location.href
	}, function (data) {
		console.log(data);
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
				wx.hideMenuItems({

				    menuList: ['menuItem:copyUrl'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				
				});
				wx.onMenuShareAppMessage({
					title: '【每天仅需1.99】跟着美国家庭学英语，看世界！', // 分享标题    
					desc: 'Youtube英文教育红人家庭中国首秀，台湾帅气老师Lyle担当讲解。欢乐体验美国地道家庭生活', // 分享描述    
					link: 'https://h5.speaka.live/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id_new + '&joy_from=' + joy_from, // 分享链接    
					imgUrl: 'https://s.speaka.live/static/logo-white.png', // 分享图标    
					type: '', // 分享类型,music、video或link，不填默认为link    
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空    
					success: function success() {
						// 用户确认分享后执行的回调函数    
						window.location.href = 'https://h5.speaka.live/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id_new + '&joy_from=' + joy_from;
					},
					cancel: function cancel() {
						// 用户取消分享后执行的回调函数    
						window.location.href = 'https://h5.speaka.live/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&joy_from=' + joy_from;
					}
				});
				wx.onMenuShareTimeline({
					title: '【每天仅需1.99】跟着美国家庭学英语，看世界！', // 分享标题    
					link: 'https://h5.speaka.live/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id_new + '&joy_from=' + joy_from, // 分享链接    
					imgUrl: 'https://s.speaka.live/static/logo-white.png', // 分享图标    
					success: function success() {
						// 用户确认分享后执行的回调函数    
						window.location.href = 'https://h5.speaka.live/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id_new + '&joy_from=' + joy_from;
					},
					cancel: function cancel() {
						// 用户取消分享后执行的回调函数    
						window.location.href = 'https://h5.speaka.live/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&joy_from=' + joy_from;
					}
				});
			});
			//通过error接口处理失败验证
			wx.error(function (res) {
				alert(JSON.stringify(res));
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
    //添加提示框
    $('.group_foot p').eq(0).click(function () {
    	window.location.href = 'https://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id + '&joy_from=' + joy_from;
    });
});