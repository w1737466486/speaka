"use strict";

$(function () {
	window.get_token = get_token;
	var token = null;
	get_token();
	function get_token(_results) {
		token = 'Bearer ' + 1257;
		$.ajax({
			type: "get",
			url: "https://api.speaka.live/api/top100 ",
			async: true,
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success: function success(data) {
				$('.rank_ul_two').html('')
				for (var i = 0; i < data.info.top.length; i++) {
					if (i < 3) {
						$('.rank_ul_one .li' + i).find('span').eq(0).find('img').attr('src', 'https://s.speaka.live/' + data.info.top[i].head+'?x-oss-process=style/w60');
						$('.rank_ul_one .li' + i).find('span').eq(1).html(data.info.top[i].name);
						$('.rank_ul_one .li' + i).find('span').eq(2).find('em').html(data.info.top[i].score);
					} else {
						var _head = null;
						if (data.info.top[i].head == '') {
							_head = '../img/mr.png';
						} else {
							_head = 'https://s.speaka.live/' + data.info.top[i].head+'?x-oss-process=style/w60';
						}
						if (data.info.top[i].head.substr(5, 2) == 'mj') {
							_head = '../img/mr.png';
						}
						
						$('.rank_ul_two').append("<li><b>No." + (i + 1) + "</b><span><img src=\"" + _head + "\"/></span><span>" + data.info.top[i].name + "</span><span><em>" + data.info.top[i].score + "</em><img src=\"../img/\u5B9D\u77F3.png\"/></span></li>");
					}
				}
                //$('.rank').append('<ul class="rank_ul_three"><li><b>No.' + data.info.mine.rank + '</b><span><img src="https://s.speaka.live/' + data.info.mine.head + '?x-oss-process=style/w60"></span><span>' + data.info.mine.name + '</span><span><em>' + data.info.mine.score + '</em><img src="../img/\u5B9D\u77F3.png"></span></li></ul>');
				$('.rank_ul_three li b').html('No.' + data.info.mine.rank);
				$('.rank_ul_three li').find('span').eq(0).find('img').attr('src', 'https://s.speaka.live/' + data.info.mine.head+'?x-oss-process=style/w60');
				$('.rank_ul_three li').find('span').eq(1).html(data.info.mine.name);
				$('.rank_ul_three li').find('span').eq(2).find('em').html(data.info.mine.score);
				$('.loading').hide();
			},
			error: function error(res) {
				console.log(res);
			}
		});
	}
});