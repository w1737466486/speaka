'use strict';

$(function () {
	window.get_token = get_token;
	var token = null;
	//get_token();
	function get_token(_results) {
		//console.log(_results)
		token = 'Bearer ' + _results;
		$.ajax({
			type: 'post',
			dataType: 'JSON',
			async: true,
			//url: "../json/my_order.json",
			url: 'http://api.speaka.cn/api/u/orders',
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success: function success(data) {
				//console.log("成功获取数据",data.info);

				//团购订单
				for (var i = 0; i < data.info.length; i++) {
					//console.log(data.info[i].order_no);
					if (data.info[i].type_id == 1) {
						if (data.info[i].status > 1) {
							$('.group_orders').append('\n\t\t                <li is_group_failed=' + data.info[i].status + '>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class=\'mark\'></em>\n\t\t                    </p>\n\t\t                    <p class=\'xuxian\'></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name">' + data.info[i].name + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state=' + data.info[i].state + '>\u672A\u6210\u56E2</span>  \n\t\t                    </p>\n\t\t                     <p class=\'share_order\'>\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span>\n\t\t                        <b commodity_id=\'' + data.info[i].commodity_id + '\'>\u9080\u8BF7\u597D\u53CB\u53C2\u56E2</b> \n\t\t                    </p>\n\t\t                </li>\n\t\t               ');
						} else {
							$('.group_orders').append('\n\t\t                <li is_group_failed=' + data.info[i].status + '>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class=\'mark\'></em>\n\t\t                    </p>\n\t\t                    <p class=\'xuxian\'></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name">' + data.info[i].name + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state=' + data.info[i].state + ' >\u5DF2\u6210\u56E2</span>  \n\t\t                    </p>\n\t\t                    <p class=\'share_order\'>\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span>\n\t\t                        <b commodity_id=\'' + data.info[i].commodity_id + '\'>\u5206\u4EAB</b> \n\t\t                    </p>\n\t\t                </li>\n\t\t               ');
						}
					}
					$('.group_state').css({ 'color': '#2FBBA9' });
					if (data.info[i].state == 1) {
						$('.mark').eq(i).html('已支付').css({ 'color': '#2FBBA9' });
					}
					if (data.info[i].state == 0 && data.info[i].type_id == 1) {
						$('.mark').eq(i).html('未支付').css({ 'color': '#999999' });
						$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'none' });
					}
					if (data.info[i].state == 2) {
						$('.mark').eq(i).html('已退款').css({ 'color': '#FD7C7C' });
						$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'none' });
					}
				}

				for (var i = 0; i < data.info.length; i++) {
					//console.log(data.info[i].order_no);
					if (data.info[i].type_id == 0) {
						$('.single_orders').append('\n\t\t                <li>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class=\'mark\'></em>\n\t\t                    </p>\n\t\t                    <p class=\'xuxian\'></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name">' + data.info[i].name + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                </li>\n\t\t               ');
					}
					if (data.info[i].state == 1) {
						$('.mark').eq(i).html('已支付').css({ 'color': '#2FBBA9' });
					}
					if (data.info[i].state == 0) {
						$('.mark').eq(i).html('未支付').css({ 'color': '#999999' });
						$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'none' });
					}
					if (data.info[i].state == 2) {
						$('.mark').eq(i).html('已退款').css({ 'color': '#FD7C7C' });
					}
				}
				$('.share_order b').click(function () {
					var order_no = $(this).parent().parent().find('p').eq(0).children('span').eq(1).html();
					var obj = {};
					obj.title = '【三人成团！】，超有趣的少儿互动英文课！';
					obj.desc = 'Youtube英文教育红人家庭中国首秀，台湾帅气老师Lyle担当讲解。欢乐体验美国地道家庭生活';
					obj.share_url = 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id=' + $(this).attr('commodity_id') + '&order_no=' + order_no;
					console.log(obj);
					if (window.webkit) {
						window.webkit.messageHandlers.payClick.postMessage(JSON.stringify(obj));
					} else {
						androidpay.androidWechatPay(JSON.stringify(obj));
					}
				});
		console.log($('.group_orders li').length);
				for (var i = 0; i < $('.group_orders li').length; i++) {
					var pay_state = $('.group_orders li').eq(i).find('p').eq(5).find('span').eq(1).attr('state');
					var is_group_failed = $('.group_orders li').eq(i).attr('is_group_failed');
					console.log(pay_state);
					console.log(is_group_failed);
					if (pay_state == 0) {
						$('.mark').eq(i).html('未支付').css({ 'color': '#999999' });
						$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'none' });
						if (is_group_failed == 'undefined') {
							$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'none' });
							$('.group_orders li').eq(i).find('p').eq(5).find('span').eq(1).html('成团失败');
						}
					}
					if (pay_state == 1) {
						$('.mark').eq(i).html('已支付').css({ 'color': '#2FBBA9' });
						if (is_group_failed == 2) {
							$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'none' });
							$('.group_orders li').eq(i).find('p').eq(5).find('span').eq(1).html('成团失败');
						}
						if (is_group_failed == 1) {
							$('.group_orders li').eq(i).find('p').eq(5).find('span').eq(1).html('已成团');
						}
						if (is_group_failed == 3) {
							$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'block' });
							$('.group_orders li').eq(i).find('p').eq(5).find('span').eq(1).html('未成团');
						}
					}
				}
			},
			error: function error(res) {
				console.log(res);
			}
		});
	}
	setTimeout(function(){
		console.log($('.group_orders li').length);
		for (var i = 0; i < $('.group_orders li').length; i++) {
			var pay_state = $('.group_orders li').eq(i).find('p').eq(5).find('span').eq(1).attr('state');
			var is_group_failed = $('.group_orders li').eq(i).attr('is_group_failed');
			console.log(pay_state);
			console.log(is_group_failed);
			if (pay_state == 0) {
				$('.mark').eq(i).html('未支付').css({ 'color': '#999999' });
				$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'none' });
				if (is_group_failed == 'undefined') {
					$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'none' });
					$('.group_orders li').eq(i).find('p').eq(5).find('span').eq(1).html('成团失败');
				}
			}
			if (pay_state == 1) {
				$('.mark').eq(i).html('已支付').css({ 'color': '#2FBBA9' });
				if (is_group_failed == 2) {
					$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'none' });
					$('.group_orders li').eq(i).find('p').eq(5).find('span').eq(1).html('成团失败');
				}
				if (is_group_failed == 1) {
					$('.group_orders li').eq(i).find('p').eq(5).find('span').eq(1).html('已成团');
				}
				if (is_group_failed == 3) {
					$('.group_orders li').eq(i).find('p').last().find('b').css({ 'display': 'block' });
					$('.group_orders li').eq(i).find('p').eq(5).find('span').eq(1).html('未成团');
				}
			}
		}
	},500)
		


	$('.order_nav p').eq(1).click(function () {
		$('.order_nav p').eq(1).find('b').css({ 'display': 'block' });
		$('.group_orders').css({ 'display': 'none' });
		$('.order_nav p').eq(0).find('b').css({ 'display': 'none' });
		$('.single_orders').css({ 'display': 'block' });
	});
	$('.order_nav p').eq(0).click(function () {
		$('.order_nav p').eq(1).find('b').css({ 'display': 'none' });
		$('.group_orders').css({ 'display': 'block' });
		$('.order_nav p').eq(0).find('b').css({ 'display': 'block' });
		$('.single_orders').css({ 'display': 'none' });
	});
});