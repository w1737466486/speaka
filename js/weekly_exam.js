$(function(){
	/**
	 * 控制音频播放
	 */
	$(document).ready(function () {
	    // 控制音频文件名显示宽度
	    var maxW = $('.audio-right').width();
	    $('.audio-right p').css({
	        "max-width": maxW
	    });
	
	    // 可能会有多个音频，逐个初始化音频控制事件
	    initAudioEvent();
	});
	
	function initAudioEvent() {
	    var audio = document.getElementsByTagName('audio')[0];
	
	    // 点击播放/暂停图片时，控制音乐的播放与暂停
	    $('#audioPlayer').click(function () {
	
	        // 监听音频播放时间并更新进度条
	        audio.addEventListener('timeupdate', function () {
	            updateProgress(audio);
	        }, false);
	
	        // 监听播放完成事件
	        audio.addEventListener('ended', function () {
	            audioEnded();
	        }, false);
	
	        // 改变播放/暂停图片
	        if (audio.paused) {
	            // 开始播放当前点击的音频
	            audio.play();
	            $('#audioPlayer').attr('src', '../img/暂停按钮.png');
	            // $('#progressBarBg').css('cursor', 'pointer');    
	        } else {
	            audio.pause();
	            $('#audioPlayer').attr('src', '../img/播放.png');
	            // $('#progressBarBg').css('cursor', 'default');
	        }
	    });
	}
	
	/**
	 * 更新进度条与当前播放时间
	 * @param {object} audio - audio对象
	 */
	function updateProgress(audio) {
	    var value = audio.currentTime / audio.duration;
	    $('#progressBar').css('width', value * 100 + '%');
	    $('#progressDot').css('left', value * 100 + '%');
	    $('#audioCurTime').html(transTime(audio.currentTime));
	}
	
	/**
	 * 播放完成时把进度调回开始的位置
	 */
	function audioEnded() {
	    $('#progressBar').css('width', 0);
	    $('#progressDot').css('left', 0);
	    $('#audioCurTime').html(transTime(0));
	    $('#audioPlayer').attr('src', '../img/播放.png');
	}
	
	/**
	 * 音频播放时间换算
	 * @param {number} value - 音频当前播放时间，单位秒
	 */
	function transTime(value) {
	    var time = "";
	    var h = parseInt(value / 3600);
	    value %= 3600;
	    var m = parseInt(value / 60);
	    var s = parseInt(value % 60);
	    if (h > 0) {
	        time = formatTime(h + ":" + m + ":" + s);
	    } else {
	        time = formatTime(m + ":" + s);
	    }
	    return time;
	}
	 
	/**
	 * 格式化时间显示，补零对齐
	 * eg：2:4  -->  02:04
	 * @param {string} value - 形如 h:m:s 的字符串 
	 */
	function formatTime(value) {
	    var time = "";
	    var s = value.split(':');
	    var i = 0;
	    for (; i < s.length - 1; i++) {
	        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
	        time += ":";
	    }
	    time += s[i].length == 1 ? ("0" + s[i]) : s[i];
	
	    return time;
	}
	//将url参数转对象
	function queryURL(url) {
		var arr1 = url.split("?");
		var params = arr1[1].split("&"); 
		var obj = {};
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split("=");
			obj[param[0]] = param[1]; 
		}
		return obj;
	};
	var weekly_url=queryURL(location.href);
	var weekly_id=weekly_url.weekly_id;
	var token=weekly_url.stamp;
	window.get_token = get_token;
	get_token(token);
	console.log(token);
	function get_token(_results) {
		token='Bearer ' + _results;
		$.ajax({
			type:"post",
			url:"https://api.speaka.live/api/weektest-report",
			dataType: 'JSON',
			async:true,
			data:{
				commodity_lesson_video_id:weekly_id
			},
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success:function(data){
				console.log(data);
				if(data.code==200){
					$('.exam_head_title p').eq(0).find('b').html(data.data.commodity_name)
					if(data.data.weekly_id==1){
						$('.exam_head_title p').eq(1).html('First weekly report');
						$('title').html(data.data.commodity_name+' '+'第一周报告')
					}else if(data.data.weekly_id==2){
						$('.exam_head_title p').eq(1).html('Second weekly report');
						$('title').html(data.data.commodity_name+' '+'第二周报告')
					}else if(data.data.weekly_id==3){
						$('.exam_head_title p').eq(1).html('Third weekly report');
						$('title').html(data.data.commodity_name+' '+'第三周报告')
					}else if(data.data.weekly_id==4){
						$('.exam_head_title p').eq(1).html('Fourth weekly report');
						$('title').html(data.data.commodity_name+' '+'第四周报告')
					}
					$('.exam_content .pic1').append('<img src="https://s.speaka.live/' + data.data.pics[0].pic + '"/>');
					$('.exam_content .pic2').append('<img src="https://s.speaka.live/' + data.data.pics[1].pic + '"/>');
					$('.exam_content .pic3').append('<img src="https://s.speaka.live/' + data.data.pics[2].pic + '"/>');
					$('.exam_content .pic4').append('<img src="https://s.speaka.live/' + data.data.pics[3].pic + '"/>');
					$('.exam_content .exam_left_text').eq(0).html('<span>'+data.data.pics[0].share_desc+'</span>');
					$('.exam_content .exam_left_text').eq(1).html('<span>'+data.data.pics[1].share_desc+'</span>');
					$('.exam_content .exam_left_text').eq(2).html('<span>'+data.data.pics[2].share_desc+'</span>');
					$('.exam_content .exam_left_text').eq(3).html('<span>'+data.data.pics[3].share_desc+'</span>');
					$('.audio-right b').html(data.data.user_name);
					$('.audio-wrapper audio').attr('src','https://s.speaka.live/'+data.data.whole_voice);
					$('.exam_envelope span').eq(0).find('b').html(data.data.user_name+'<em></em>');
					$('.exam_envelope span').eq(2).find('b').html(data.data.teacher_name);
					for(var i=0;i<data.data.teacher_comment.length;i++){
						$('.exam_envelope_text').append('<p>' + data.data.teacher_comment[i] + '</p>');
					}
				}else if(data.code==404){
					alert(data.msg)
				}
			},
			error:function(res){
				alert('请求过于频繁请重新刷新页面或返回重试！')
				console.log(JSON.stringify(res));  
			}
		});
	}
})
