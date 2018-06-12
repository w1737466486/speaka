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
				for (var i = 0; i < data.info.length; i++) {
					//console.log(data.info[i].order_no);
					if (data.info[i].type_id == 0) {
						if (data.info[i].state == 0) {
							$('.single_orders').append('<li>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" id="nomark">\u672A\u652F\u4ED8 </em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name">' + data.info[i].name + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                </li>');
						} else if (data.info[i].state == 1) {
							$('.single_orders').append('<li>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" id="yesmark">\u5DF2\u652F\u4ED8 </em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name">' + data.info[i].name + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                </li>');
						}
					} else if (data.info[i].type_id == 1) {
						if (data.info[i].state == 0) {
							$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" id="nomark">\u672A\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name">' + data.info[i].name + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span> \n\t\t                    </p>\n\t\t                </li>');
						} else if (data.info[i].state == 1) {
							if (data.info[i].status == 1) {
								$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" id="yesmark">\u5DF2\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name">' + data.info[i].name + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '">\u5DF2\u6210\u56E2</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span> \n\t\t                    </p>\n\t\t                </li>');
							} else if (data.info[i].status == 2) {
								$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" id="yesmark">\u5DF2\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name">' + data.info[i].name + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '">\u6210\u56E2\u5931\u8D25</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span>\n\t\t                    </p>\n\t\t                </li>');
							} else if (data.info[i].status == 3) {
								$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" id="yesmark">\u5DF2\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name">' + data.info[i].name + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '">\u672A\u6210\u56E2</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span>\n\t\t                        <b commodity_id="' + data.info[i].commodity_id + '">\u9080\u8BF7\u597D\u53CB\u53C2\u56E2</b> \n\t\t                    </p>\n\t\t                </li>');
							}
						} else if (data.info[i].state == 2) {
							$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" id="overmark">\u5DF2\u9000\u6B3E</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name">' + data.info[i].name + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '">\u6210\u56E2\u5931\u8D25</span>\n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span> \n\t\t                    </p>\n\t\t                </li>');
						}
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
			},
			error: function error(res) {
				console.log(res);
			}
		});
	}
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