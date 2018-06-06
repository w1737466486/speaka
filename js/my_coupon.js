'use strict';

$(function() {
	window.get_token = get_token;
	var token = null;
get_token()
	function get_token(_results) {
		token = 'Bearer ' + _results;
		$.ajax({
			type: 'get',
			dataType: 'JSON',
			async: true,
			url: "../json/my_coupon.json",
			//url:'api.speaka.cn/api/coupon/m',
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success: function success(data) {
				console.log("成功获取数据", data.info);
				for(var i = 0; i < data.info.length; i++) {
					console.log(data.info[i]);
					$('.coupon').append('\n\t                <li>\n\t\t\t\t\t<div class="coupon_left">\n\t\t\t\t\t\t<div class="coupon_price">\n\t\t\t\t\t\t\t<strong>' + data.info[i].price + '</strong>\n\t\t\t\t\t\t\t<span>\u5143</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="use_time">\n\t\t\t\t\t\t\t<span>\u6709\u6548\u671F :</span>\n\t\t\t\t\t\t\t<span>\n' + (data.info[i].usable_start_at.substr(0, 4) + "年" + data.info[i].usable_start_at.substr(5, 2) + "月" + data.info[i].usable_start_at.substr(8, 2) + "日") + '\n</span>\n\t\t\t\t\t\t\t<span>-</span>\n\t\t\t\t\t\t\t<span>' + (data.info[i].usable_end_at.substr(0, 4) + "年" + data.info[i].usable_end_at.substr(5, 2) + "月" + data.info[i].usable_end_at.substr(8, 2) + "日") + '</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="coupon_right">\n\t\t\t\t\t\t<div>\u6EE1\u51CF\u5238</div>\n\t\t\t\t\t\t<div>\u6EE1&nbsp;<span>' + data.info[i].required_price + '</span>&nbsp;\u53EF\u7528</div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t               ');
				}
			},
			error: function error(res) {
				console.log(res);
			}
		});
	}
});