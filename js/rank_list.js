"use strict";

$(function () {
	window.get_token = get_token;
	var token = null;
	//get_token();
	function get_token(_results) {
		//console.log(_results)
		token = 'Bearer ' + _results;
		$.ajax({
			type: "get",
			url: "http://api.speaka.cn/api/top100 ",
			//url: "../json/top.json",
			async: true,
			success: function success(data) {
				console.log(data);
				for (var i = 0; i < data.info.top.length; i++) {
					//console.log(data.info.top[i])
					if (i < 3) {
						console.log($('.rank_ul_one .li' + i).html());
						$('.rank_ul_one .li' + i).find('span').eq(0).find('img').attr('src', 'http://s.speaka.cn/' + data.info.top[i].head);
						$('.rank_ul_one .li' + i).find('span').eq(1).html(data.info.top[i].name);
						$('.rank_ul_one .li' + i).find('span').eq(2).find('em').html(data.info.top[i].score);
					} else {
						var _head = null;
						if (data.info.top[i].head == '') {
							_head = '../img/mr.png';
						} else {
							_head = 'http://s.speaka.cn/' + data.info.top[i].head;
						}
						if (data.info.top[i].head.substr(5, 2) == 'mj') {
							_head = '../img/mr.png';
						}
						$('.rank_ul_two').append("<li>\n\t\t\t\t\t\t<b>No." + (i + 1) + "</b>\n\t\t\t\t\t\t<span><img src=\"" + _head + "\"/></span>\n\t\t\t\t\t\t<span>" + data.info.top[i].name + "</span>\n\t\t\t\t\t\t<span><em>" + data.info.top[i].score + "</em><img src=\"../img/\u5B9D\u77F3.png\"/></span>\n\t\t\t\t\t</li>");
					}
				}
				$('.rank_ul_three li b').html('No.' + data.info.mine.rank);
				$('.rank_ul_three li').find('span').eq(0).find('img').attr('src', 'http://s.speaka.cn/' + data.info.mine.head);
				$('.rank_ul_three li').find('span').eq(1).html(data.info.mine.name);
				$('.rank_ul_three li').find('span').eq(2).find('em').html(data.info.mine.score);
			},
			error: function error(res) {
				console.log(res);
			}
		});
	}
	console.log('1');
});