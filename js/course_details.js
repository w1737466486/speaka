"use strict";

$(function () {
	var url_course = null;
	//http://h5.speaka.live/front/html/course_details.html?commodity_id=1&code=061TBw1T0MeiPX1eiU1T0f5P1T0TBw1Y&state=1
	var courseurl = queryURL(location.href);
	console.log(courseurl)
	var isbuy_code=courseurl.code;
    console.log(isbuy_code)
    var isbuy_token=null;
	var commodity_id=courseurl.commodity_id;
	if (isWeiXin()) {
		if(isbuy_code){
		$.ajax({
			type:"get",
			url:"http://api.speaka.live/api/commoditybuy/" + commodity_id+'?code='+isbuy_code,
			async:false,
			success:function(res){
				console.log(res)
				 if(!res.token){
				 	window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b778a82184cf52f&redirect_uri='+encodeURI(location.href.split("?")[0]+'?commodity_id='+commodity_id)+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
				 }else{
				 	isbuy_token=res.token
				 }
				
			},
			error:function(res){
				console.log(res)
			}
		});
	 }else{
		window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b778a82184cf52f&redirect_uri='+encodeURI(location.href.split("?")[0]+'?commodity_id='+commodity_id)+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
	  }
	}
	//去掉alert显示网页
	window.alert = function(name) {
		var iframe = document.createElement("IFRAME");
		iframe.style.display = "none";
		iframe.setAttribute("src", 'data:text/plain,');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
	}
	
	//
	//alert('测试')
	window.get_share = get_share;
	console.log(url_course)
    var slip_up=true;
    //重新获取url
    //courseurl = 'http://h5.speaka.live/front/html/course_details.html?commodity_id=1&code=0613JmsR1tCw091geEvR1vrFsR13JmsK&state=1'
    //courseurl = queryURL(courseurl)
    console.log(courseurl)
    url_course = "http://api.speaka.live/api/commodity/" + commodity_id;
    
    //get_share();
	function get_share(_results) {
		var _obj = {};
		_obj.title = '【每天仅需1.99】跟着美国家庭学英语，看世界!';
		_obj.desc = 'Youtube英文教育红人家庭中国首秀，台湾帅气老师Lyle担当讲解。欢乐体验美国地道家庭生活';
		_obj.share_url =location.href
		if (window.webkit) {
			window.webkit.messageHandlers.shareClick.postMessage(JSON.stringify(_obj));
		} else {
			androidCorsonShare.CorsonShare(JSON.stringify(_obj));
		}
	}

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
	$.ajax({
		type: "get",
		url: url_course,
		//url: "../json/ocean.json",
		async: true,
		success: function success(data) {
			if (JSON.stringify(data) != "{}") {
				//console.log(data)
				$('.v_nav .v_s1').html(data.eng);
				$('.v_nav .v_s2').html(data.chn);
				$('.v_nav .nav_video').attr('src', 'http://s.speaka.live/' + data.pic_path);
				
				for (var i = 0; i < data.pages.length; i++) {
					if(data.pages[i].type==1){
						$('.v_img').append('<div class="img_video" width="100%"><video controls="true" poster="http://s.speaka.live/' + data.pages[i].pic_path+'" controlslist="nodownload" width="100%" src="http://s.speaka.live/'+data.pages[i].video_path+'"></video><img src="../img/Play.png"/></div> ')
					}
					if(data.pages[i].type==0){
						$('.v_img').append('<img src="http://s.speaka.live/' + data.pages[i].pic_path+'"/>');
					}
				}
				
				/*for (var i = 0; i < data.pages.length; i++) {
					if(data.pages[i].type==0&&i<data.pages.length-1){
						$('.v_img').append('<div><img src="http://s.speaka.live/' + data.pages[i].pic_path+'"/></div>');
					}
					if(data.pages[i].type==0&&i==data.pages.length-1){
						$('.v_img').append('<div class="video_position"><img src="http://s.speaka.live/' + data.pages[i].pic_path+'"/><div class="img_video"><video controls="true" controlslist="nodownload" width="100%" height="100%" src="http://s.speaka.live/static/spk.mp4"></video><img src="../img/Play.png"/></div></div>');
					}
				}*/
				
				
				var _stop=true
				$('.img_video').click(function(){
					if(_stop){
						_stop=false
						$(this).find('video').trigger('play')
						$(this).find('img').remove()
					}else{
						_stop=true
						$(this).find('video').trigger('pause')
						$(this).append('<img src="../img/Play.png"/>')
					}
					
				})
				$('.v_det .v_det_s1').html('开课时间：' + data.begin_time.substr(0, 10));
				$('.v_det .v_det_s2').html('课程时长：' + data.last_days + '天');
				$('.v_det .v_det_s3').html('购买截止时间：' + data.begin_time.substr(0, 10));
				$('.v_footer .v_pay span').eq(0).html('<div>￥' + data.price / 100 + '</div><b>单人购</b>');
				$('.v_footer .v_pay span').eq(1).html('<div>￥' + data.groupon_price / 100 + '</div><b>' + data.groupon_num + '人起团购</b>');
				$.ajax({
					type:"get",
					url:"http://api.speaka.live/api/commoditybuy/" + commodity_id+'?token='+'Bearer ' +isbuy_token,
					async:false,
					success:function(res){
						console.log(res)
						if(res.code==403||res.code==404||res.code==405){
							$('.v_footer').hide();
							$('.buy_success').show();
							$('.buy_success .buy_pay p').eq(0).click(function(){
								window.location.href='http://h5.speaka.live/front/html/lecture_notes.html'
							})
							$('.buy_success .buy_pay p').eq(1).click(function(){
								if (window.webkit) {
									window.location.href='https://itunes.apple.com/cn/app/speak-a/id1345905287'
								} else {
									window.location.href='https://www.pgyer.com/q8oQ'
								}
							})
						}
						
					},
					error:function(res){
						console.log(res)
					}
				});
				var curr_time = getNowFormatDate();
				var last_time = data.alloc_at;
				curr_time = curr_time.substr(0, 4) + '/' + curr_time.substr(5, 2) + '/' + curr_time.substr(8, 2) + ' ' + curr_time.substr(11);
				last_time = last_time.substr(0, 4) + '/' + last_time.substr(5, 2) + '/' + last_time.substr(8, 2) + ' ' + last_time.substr(11);
				curr_time = new Date(curr_time).valueOf();
				last_time = new Date(last_time).valueOf();
				//剩余总时间
				var remain_time = (last_time - curr_time) / 1000;
				if (remain_time <= 0) {
					$('.v_pay p').eq(0).click(function () {
						alert('记得来早点，亲！购买时间已经过了哦！');
					});
					$('.v_pay p').eq(1).click(function () {
						alert('记得来早点，亲！购买时间已经过了哦！');
					});
				} else {
					//参数：1微信/单人购买     2App/团购   11微信单人  12微信团购  21App单人   22App团购
					$('.v_pay p').eq(0).click(function () {
						if (isWeiXin()) {
							//http://api.speaka.live/api/buy/1?type_id=11
							window.location.href = 'http://api.speaka.live/api/buy/'+commodity_id+'?type_id=' + 11 + '&commodity_id=' + commodity_id;
						} else {
							window.location.href = 'http://h5.speaka.live/front/html/course_details_pay.html?type_id=' + 21 + '&commodity_id=' + commodity_id;
						}
					});
					$('.v_pay p').eq(1).click(function () {
						if (isWeiXin()) {
							window.location.href = 'http://api.speaka.live/api/buy/'+commodity_id+'?type_id=' + 12 + '&commodity_id=' + commodity_id;
						} else {
							window.location.href = 'http://h5.speaka.live/front/html/course_details_pay.html?type_id=' + 22 + '&commodity_id=' + commodity_id;
						}
					});
				}
			} else {
				alert('该商品不存在，请重试！');
			}
		}
	});
	setInterval(function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			//console.log(sTop)
			if(sTop>50){
				$('.v_footer').css({'opacity': '0.4','display': 'block'})
			}
			if(sTop>150){
				$('.v_footer').css({'opacity': '0.6'})
			}
			if(sTop>250){
				$('.v_footer').css({'opacity': '1'})
			}
			if(sTop<50){
				$('.v_footer').css({'opacity': '0','display': 'none'})
			}
		},50)
	//上划按键跳动显示
	setInterval(function(){
		var aTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(aTop==0){
			$('.v_nav .slip_up').css({'display': 'block'})
			slip_up=!slip_up;
			if(slip_up){
				$('.v_nav .slip_up').css({'bottom': '25px'})
			}else{
				$('.v_nav .slip_up').css({'bottom': '40px'})
			}
			
		}else{
			$('.v_nav .slip_up').css({'display': 'none'})
		}
	},500)
	//判断是否是安卓还是ios  
	function isAndroid_ios() {
		var u = navigator.userAgent,
		    app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
		return isAndroid == true ? true : false;
	}
	//判断是否是微信浏览器
	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

	if (isWeiXin()) {

		$.post("http://api.speaka.live/api/wxconfig", {
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
					wx.onMenuShareAppMessage({
						title: '【每天仅需1.99】跟着美国家庭学英语，看世界！', // 分享标题    
						desc: 'Youtube英文教育红人家庭中国首秀，台湾帅气老师Lyle担当讲解。欢乐体验美国地道家庭生活', // 分享描述    
						link: 'http://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id, // 分享链接    
						imgUrl: 'http://s.speaka.live/static/logo-white.png', // 分享图标    
						type: '', // 分享类型,music、video或link，不填默认为link    
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空    
						success: function success() {
							// 用户确认分享后执行的回调函数    
							window.location.href = 'http://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id;
						},
						cancel: function cancel() {
							// 用户取消分享后执行的回调函数    
							window.location.href = 'http://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id;
						}
					});
					wx.onMenuShareTimeline({
						title: 'Youtube英文教育红人家庭中国首秀，台湾帅气老师Lyle担当讲解。欢乐体验美国地道家庭生活', // 分享标题    
						link: 'http://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id, // 分享链接    
						imgUrl: 'http://s.speaka.live/static/logo-white.png', // 分享图标    
						success: function success() {
							// 用户确认分享后执行的回调函数    
							window.location.href = 'http://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id;
						},
						cancel: function cancel() {
							// 用户取消分享后执行的回调函数    
							window.location.href = 'http://h5.speaka.live/front/html/course_details.html?commodity_id=' + commodity_id;
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
	}
});