$(function () {
	function isAndroid_ios() {
	    var u = navigator.userAgent,
	    app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
		return isAndroid == true ? true : false;
	}
	//判断是否是微信浏览器
	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
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
		/**
  * 日期转化为字符串， 4位年+2位月+2位日
  */
	function getDateStr(date) {
		var _year = date.getFullYear();
		var _month = date.getMonth() + 1; // 月从0开始计数
		var _d = date.getDate();

		_month = _month > 9 ? "" + _month : "0" + _month;
		_d = _d > 9 ? "" + _d : "0" + _d;
		return _year + _month + _d;
	}
})