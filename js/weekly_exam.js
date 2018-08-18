$(function(){
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

    // 点击进度条跳到指定点播放
    // PS：此处不要用click，否则下面的拖动进度点事件有可能在此处触发，此时e.offsetX的值非常小，会导致进度条弹回开始处（简直不能忍！！）
    /*$('#progressBarBg').on('mousedown', function (e) {
        // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
        if (!audio.paused || audio.currentTime != 0) {
            var pgsWidth = $('.progress-bar-bg').width();
            var rate = e.offsetX / pgsWidth;
            audio.currentTime = audio.duration * rate;
            updateProgress(audio);
        }
    });

    var dot = document.getElementById('progressDot');

    // 鼠标拖动进度点时可以调节进度
    // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
    // 鼠标按下时
    dot.onmousedown = function (event) {
        if (!audio.paused || audio.currentTime != 0) {
            var oriLeft = dot.offsetLeft;
            var mouseX = event.clientX;
            var maxLeft = oriLeft; // 向左最大可拖动距离
            var maxRight = document.getElementById('progressBarBg').offsetWidth - oriLeft; // 向右最大可拖动距离

            // 禁止默认的选中事件（避免鼠标拖拽进度点的时候选中文字）
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }

            // 禁止事件冒泡
            if (event && event.stopPropagation) {
                event.stopPropagation();
            } else {
                window.event.cancelBubble = true;
            }

            // 开始拖动
            document.onmousemove = function (event) {
                var length = event.clientX - mouseX;
                if (length > maxRight) {
                    length = maxRight;
                } else if (length < -maxLeft) {
                    length = -maxLeft;
                }
                var pgsWidth = $('.progress-bar-bg').width();
                var rate = (oriLeft + length) / pgsWidth;
                audio.currentTime = audio.duration * rate;
                updateProgress(audio);
            };

            // 拖动结束
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    };*/
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
})
