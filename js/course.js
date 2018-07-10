'use strict';

$(function () {
	
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
	//去掉alert显示网页
	window.alert = function(name) {
		var iframe = document.createElement("IFRAME");
		iframe.style.display = "none";
		iframe.setAttribute("src", 'data:text/plain,');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
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
	
	
	
	
	var lessons_url=queryURL(location.href)
	console.log(lessons_url)
	var team_id=lessons_url.team_id;
	var comm_id=lessons_url.comm_id;
	var comm_url=null;
	//console.log(str.split('?')[1])
	if(team_id){
		comm_url="http://api.speaka.live/api/team/"+team_id+"/commodity"
	}
	if(comm_id){
		comm_url="http://api.speaka.live/api/comm/"+comm_id
	}
	$.ajax({
		type: "get",
		async: true,
		//url:"../json/speaka.json", 
		url: comm_url,
		success: function success(data) {
           console.log(data)
			var lessonId = lessons_url.lessonId;
			console.log(data.lessons[0].id);
			for (var k = 0; k < data.lessons.length; k++) {
				//判断是第几天的课程
				if (lessonId==(k+1) ) {
					//console.log(k)
					//替换文字内容
					$('.header .header_s2').html('Lesson' + ' ' + lessonId);

					$('.describe span').html('<b class="b_eng">' + data.lessons[k].eng + '</b>' + '' + '<b>' + data.lessons[k].chn + '</b>');
					//$('.describe span').html(data.lessons[k].eng+'<br/>'+data.lessons[k].chn)
					//导读视频预览图获取
					$('.nav_v .nav_img').attr('src', 'http://s.speaka.live/' + data.lessons[k].pic_path);

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
						console.log(JSON.stringify(obj));
						if (window.webkit) {
							window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
						} else {
							curson.punchCurson(JSON.stringify(obj));
						}
					});

					//判断有几个课时，就添加几个课程盒子
					var arrlessons = Object.keys(data.lessons[k].items);
					console.log(arrlessons)
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
							console.log(data.lessons[k].items[arrlessons[i - 1]][j-1].learn_at)
							$('.main_d' + i + '>div').attr('learn_at',data.lessons[k].items[arrlessons[i - 1]][j-1].learn_at);
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
						console.log($(this).attr('learn_at'))
						console.log(arrlessons);
						console.log(day_index);
						console.log(arrlessons.indexOf(day_index));
						data = eval(data);
						var txt1 = $(this).find('p').html();
						var day1 = data.lessons[lessonId - 1].items[day_index];
						var txtId = $(this).find('p').attr('chnid');
						console.log(txtId);
						var curr_time = getNowFormatDate();
						var last_time = $(this).attr('learn_at');
						curr_time = curr_time.substr(0, 4) + '/' + curr_time.substr(5, 2) + '/' + curr_time.substr(8, 2) + ' ' + curr_time.substr(11);
						last_time = last_time.substr(0, 4) + '/' + last_time.substr(5, 2) + '/' + last_time.substr(8, 2) + ' ' + last_time.substr(11);
						curr_time = new Date(curr_time).valueOf();
						last_time = new Date(last_time).valueOf();
						//剩余总时间
						var remain_time = (last_time - curr_time) / 1000;
						if(remain_time<=0){
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
									console.log(JSON.stringify(obj));
	
									if (window.webkit) {
										window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
									} else {
										curson.punchCurson(JSON.stringify(obj));
									}
								}
							}
						}else{
							//var learn_at=$(this).attr('learn_at').substr(5)
							$('.dialog').show()
							$('.dialog .dialog_box').html("<p>未到上课时间，该视频暂时无法播放!</br>上课时间："+$(this).attr('learn_at').substr(5)+"</p>")
							//alert("未到上课时间，该视频暂时无法播放！"+'\n'+"上课时间："+$(this).attr('learn_at').substr(5))
							$('.dialog').click(function(){
								$('.dialog').hide()
							})
						}
						
					});
				}
			}
		}
	});
});