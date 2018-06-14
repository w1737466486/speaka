'use strict';

$(function () {
	//console.log(str.split('?')[1])
	$.ajax({
		type: "get",
		async: true,
		//url:"../json/speaka.json", 
		url: 'http://api.speaka.cn/api/team/77/commodity',
		success: function success(data) {

			var lessonId = location.href.split('?')[1];
			console.log(data.lessons[0].id);
			for (var k = 0; k < data.lessons.length; k++) {
				//判断是第几天的课程
				if (data.lessons[k].id == lessonId) {
					//console.log(k)
					//替换文字内容
					$('.header .header_s2').html('Lesson' + ' ' + data.lessons[k].id);

					$('.describe span').html('<b class="b_eng">' + data.lessons[k].eng + '</b>' + '' + '<b>' + data.lessons[k].chn + '</b>');
					//$('.describe span').html(data.lessons[k].eng+'<br/>'+data.lessons[k].chn)
					//导读视频预览图获取
					$('.nav_v .nav_img').attr('src', 'http://s.speaka.cn/' + data.lessons[k].pic_path);

					var obj = {};
					//点击获取导读视频
					$('.nav_v').click(function () {
						obj={};
						var v_tit = 'Lesson' + ' ' + lessonId;
						var txt1 = $('.nav span').html();
						obj.id = data.lessons[lessonId - 1].id;
						obj.type = 0;
						obj.video_path = data.lessons[lessonId - 1].video_path;
						obj.v_id = 0;
						obj.v_tit = v_tit;
						obj.v_text = txt1;
						console.log(obj);
						if (window.webkit) {
							window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
						} else {
							curson.punchCurson(JSON.stringify(obj));
						}
					});

					//判断有几个课时，就添加几个课程盒子
					var arrlessons = Object.keys(data.lessons[k].items);
					//console.log(arrlessons.length)
					for (var i = 1; i <= arrlessons.length; i++) {
						$('.main').append("<div class='main_d" + i + "'><span></span></div>");
						$('.main_d' + i + '>span').html('Day' + ' ' + i);
						$('.main_d' + i + '>span').attr('data_day', arrlessons[i - 1]);
						$('.main_d' + i + '>span').css({
							'width': '50px',
							'height': '21px',
							'font-size': '16px',
							'color': ' #333333'
						});
						$('.main_d' + i).css({
							'position': 'relative',
							'width': '92%',
							'left': '3.7%',
							'margin-top': '15px',
							'margin-bottom': '15px'
						});
						console.log(arrlessons[i - 1]);
						for (var j = 1; j <= data.lessons[k].items[arrlessons[i - 1]].length; j++) {
							$('.main .main_d' + i).append("<div class='main_f" + j + "'><span class='d1'></span><p></p></div>");
							$('.main_d' + i + '>div').addClass('y1');
							//console.log($('.main_d'+i).find('p').length)
							$('.main_d' + i).find('p').eq($('.main_d' + i).find('p').length - 1).html(data.lessons[k].items[arrlessons[i - 1]][j - 1].chn);
							$('.main_d' + i).find('p').eq($('.main_d' + i).find('p').length - 1).attr('chnId', data.lessons[k].items[arrlessons[i - 1]][j - 1].id);
							console.log(data.lessons[k].items[arrlessons[i - 1]][j - 1].chn);
							//console.log(data.lessons[k].items[arrlessons[i-1]])
						}
						//console.log(data.lessons[k].items[arrlessons[i]])
					}
					//console.log($('.main').find('p').length)

					$('.main .y1').click(function () {
						obj={};
						var day_index = $(this).parent().find('span').attr('data_day');
						var v_tit = 'Lesson' + ' ' + lessonId;
						console.log(arrlessons);
						console.log(day_index);
						console.log(arrlessons.indexOf(day_index));
						data = eval(data);
						var txt1 = $(this).find('p').html();
						var day1 = data.lessons[lessonId - 1].items[day_index];
						var txtId = $(this).find('p').attr('chnid');
						console.log(txtId);
						for (var _i = 0; _i < day1.length; _i++) {
							if (day1[_i].chn == txt1 && day1[_i].id == txtId) {
								obj.id = day1[_i].id;
								obj.type = day1[_i].type;
								obj.video_path = day1[_i].video_path;
								obj.v_id = day1[_i].v_id;
								obj.v_tit = v_tit;
								obj.v_text = txt1;
								obj.subtitle_en = day1[_i].subtitle_en;
								obj.subtitle_ch = day1[_i].subtitle_ch;
								if (day1[_i].which_page) {
									obj.which_page = day1[_i].which_page;
								} else {
									obj.which_page = 1;
								}
								console.log(obj);

								if (window.webkit) {
									window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
								} else {
									curson.punchCurson(JSON.stringify(obj));
								}
							}
						}
					});
				}
			}
		}
	});
});