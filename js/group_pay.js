'use strict';

$(function () {
	//获取当前url
	var group_url = location.href;
	var protocol = window.location.protocol;
	var host = window.location.host;
	console.log(protocol);
	console.log(host);
	//测试url
	//var group_url = 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id=1&order_no=2018052410495565873'

	console.log(group_url);
	var groupurl = queryURL(group_url);
	console.log(groupurl);
	var u_id=groupurl.u_id;
	var commodity_id = groupurl.commodity_id;
	if (groupurl.is_share == 1) {
		$('.group_share').css({
			'display': 'block'
		});
		$('.group_share').click(function () {
			$('.group_share').css({
				'display': 'none'
			});
		});
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

	$.ajax({
		type: "get",
		url: "http://api.speaka.cn/api/commodity/" + commodity_id,
		//url:"../json/ocean.json",
		async: true,
		success: function success(data) {
			console.log(data);
			$('.v_nav .v_s1').html(data.eng);
			$('.v_nav .v_s2').html(data.chn);
			$('.v_nav img').attr('src', 'http://s.speaka.cn/' + data.pic_path);
			for (var i = 0; i < data.pages.length; i++) {
				$('.v_img').append('<img src=""/>');
			}
			for (var _i = 0; _i < data.pages.length; _i++) {
				$('.v_img img').eq(_i).attr('src', 'http://s.speaka.cn/' + data.pages[_i].pic_path);
			}
			$('.v_det .v_det_s1').html('开课时间：' + data.begin_time.substr(0, 10));
			$('.v_det .v_det_s2').html('课程时长：' + data.last_days + '天');
			$('.v_det .v_det_s3').html('购买截止时间：' + data.alloc_at.substr(0, 10));
			$('.group_foot p').eq(1).find('span').html('<div><s>￥' + data.price / 100 + '</s>&nbsp￥' + data.groupon_price / 100 + '</div><b>我要参团</b>');
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
		url: "http://api.speaka.cn/api/order_group/" + groupurl.order_no,
		//url:"../json/order.json",
		async: true,
		success: function success(data) {
			console.log(data);
			if (data.group.length > 0) {
				var group_member = $('.group_member li');
				for (var i = 0; i < data.group.length; i++) {
					$('.group_member li').eq(i).find('img').eq(1).attr('src','http://s.speaka.cn/' +data.group[i].user_info.head);
					$('.group_member li').eq(i).find('b').html(data.group[i].user_info.name);
				}
				u_id=data.group[data.group.length-1].u_id
				console.log(u_id)
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

			if (remain_time > 0 && data.group.length >= 3 && data.group.length <= 10) {
				$('.group_head p').eq(0).html('该拼团已成团！剩余参团时间:');
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

				//remain_time=0


				if (remain_time > 0 && data.group.length >= 3 && data.group.length <= 10) {
					$('.group_head p').eq(0).html('该拼团已成团！剩余参团时间:');
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
				if (remain_time > 0 && data.group.length <= 10) {
					$('.group_foot p').eq(1).click(function () {
						window.location.href = 'http://api.speaka.cn/api/buy/'+commodity_id+'?type_id=' + 12 + '&commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id + '&env=' + 1;
					});
				}
			}, 1000);
		},
		error: function error(_error2) {
			console.log(_error2);
		}
	});

	$.post("http://api.speaka.cn/api/wxconfig", {
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
					title: '【三人成团】！超有趣的少儿互动英文课！', // 分享标题    
					desc: 'Youtube英文教育红人家庭中国首秀，台湾帅气老师Lyle担当讲解。欢乐体验美国地道家庭生活', // 分享描述    
					link: 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id, // 分享链接    
					imgUrl: 'http://s.speaka.cn/static/logo-white.png', // 分享图标    
					type: '', // 分享类型,music、video或link，不填默认为link    
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空    
					success: function success() {
						// 用户确认分享后执行的回调函数    
						window.location.href = 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id;
					},
					cancel: function cancel() {
						// 用户取消分享后执行的回调函数    
						window.location.href = 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no;
					}
				});
				wx.onMenuShareTimeline({
					title: '【三人成团】！超有趣的少儿互动英文课！', // 分享标题    
					link: 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id, // 分享链接    
					imgUrl: 'http://s.speaka.cn/static/logo-white.png', // 分享图标    
					success: function success() {
						// 用户确认分享后执行的回调函数    
						window.location.href = 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no + '&u_id=' + u_id;
					},
					cancel: function cancel() {
						// 用户取消分享后执行的回调函数    
						window.location.href = 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id=' + commodity_id + '&order_no=' + groupurl.order_no;
					}
				});
			});
			//通过error接口处理失败验证
			wx.error(function (res) {
				alert(res);
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

	$('.group_foot p').eq(0).click(function () {
		window.location.href = 'http://h5.speaka.cn/front/html/course_details.html?commodity_id=' + commodity_id;
	});
});