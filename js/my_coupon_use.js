'use strict';

$(function () {
	window.get_token = get_token;
	var token = null;
	var back_url = location.href.split('?')[1];
	var coupon_token= queryURL(location.href)
	coupon_token=coupon_token.token
	console.log(back_url);
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
	
	
	get_token();
	function get_token() {
		token = coupon_token
		$.ajax({
			type: 'get',
			dataType: 'JSON',
			async: true,
			//url: "../json/my_coupon.json",
			url: 'http://api.speaka.cn/api/coupon/usable?token='+token+'&id='+coupon_token.id+'&price='+coupon_token.price,
			success: function success(data) {
				console.log("成功获取数据", data.info);
				for (var i = 0; i < data.info.length; i++) {
					$('.coupon').append('<li coupon_no="' + data.info[i].coupon_no + '">\n\t\t\t\t\t<div class="coupon_left">\n\t\t\t\t\t\t<div class="coupon_price">\n\t\t\t\t\t\t\t<strong>' + data.info[i].price + '</strong>\n\t\t\t\t\t\t\t<span>\u5143</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="use_time">\n\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="coupon_right">\n\t\t\t\t\t\t<div>\u6EE1\u51CF\u5238</div>\n\t\t\t\t\t\t<div>\u6EE1&nbsp;<span>' + data.info[i].required_price + '</span>&nbsp;\u53EF\u7528</div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>');

					if (data.info[i].usable_start_at != null || data.info[i].usable_end_at != null) {
						console.log("有限时间");
						var start_year = data.info[i].usable_start_at.substr(0, 4) + "年";
						var start_month = data.info[i].usable_start_at.substr(5, 2) + "月";
						var start_day = data.info[i].usable_start_at.substr(8, 2) + "日";
						var end_year = data.info[i].usable_end_at.substr(0, 4) + "年";
						var end_month = data.info[i].usable_end_at.substr(5, 2) + "月";
						var end_day = data.info[i].usable_end_at.substr(8, 2) + "日";
						$('.use_time').eq(i).html('有效期：' + start_year + start_month + start_day + '-' + end_year + end_month + end_day);
					}
					if (data.info[i].usable_start_at == null && data.info[i].usable_end_at == null) {
						$('.use_time').eq(i).append('\u65E0\u9650\u671F\u4F7F\u7528');
						console.log('可无限使用');
					}
				}
				$('.coupon li').click(function () {
					var coupon_money = $(this).find('strong').html();
					var coupon_no = $(this).attr('coupon_no');
					console.log($(this).find('strong').html());
					window.location.href = 'http://h5.speaka.cn/front/html/course_details_pay.html?' + back_url + '&coupon_money=' + coupon_money + '&coupon_no=' + coupon_no;
					//window.location.href='../html/course_details_pay.html?'+back_url+'&coupon_money='+coupon_money+'&coupon_no='+coupon_no
				});
			},
			error: function error(res) {
				console.log(res);
			}
		});
	}
});