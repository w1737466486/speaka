'use strict';

$(function () {
	window.get_token = get_token;
	var token = null;
	var back_url = location.href.split('?')[1];
	console.log(back_url);
	//get_token();
	function get_token(_results) {
		token = 'Bearer ' + _results;
		$.ajax({
			type: 'get',
			dataType: 'JSON',
			async: true,
			//url: "../json/my_coupon.json",
			url: 'https://api.speaka.live/api/coupon/m',
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
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
			},
			error: function error(res) {
				console.log(res);
			}
		});
	}
	$.ajax({
	    type: 'HEAD', // 获取头信息，type=HEAD即可
	    url : window.location.href,
	    //url:"http://device.qq.com/cgi-bin/device_cgi/remote_bind_get_Verify",
	    complete: function( xhr,data ){
	        // 获取相关Http Response header
	        var wpoInfo = {
	            // 服务器端时间
	            "date" : xhr.getResponseHeader('Date'),
	            // 如果开启了gzip，会返回这个东西
	            "contentEncoding" : xhr.getResponseHeader('Content-Encoding'),
	            // keep-alive ？ close？
	            "connection" : xhr.getResponseHeader('Connection'),
	            // 响应长度
	            "contentLength" : xhr.getResponseHeader('content-length'),
	            // 服务器类型，apache？lighttpd？
	            "server" : xhr.getResponseHeader('Server'),
	            "vary" : xhr.getResponseHeader('Vary'),
	            "transferEncoding" : xhr.getResponseHeader('Transfer-Encoding'),
	            // text/html ? text/xml?
	            "contentType" : xhr.getResponseHeader('Content-Type'),
	            "cacheControl" : xhr.getResponseHeader('Cache-Control'),
	            // 生命周期？
	            "exprires" : xhr.getResponseHeader('Exprires'),
	            "lastModified" : xhr.getResponseHeader('Last-Modified')
	        };
	        console.log(xhr.getAllResponseHeaders());
	        console.log(wpoInfo)
	    }
	});
});