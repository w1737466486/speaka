$(function() {
	var commodity_id = location.href.split('?')[1]
 	var url_course=null

 	if(commodity_id){
 		url_course="http://api.speaka.cn/api/commodity/" + commodity_id
 	}else{
 		commodity_id=1
 		url_course="http://api.speaka.cn/api/commodity/" + commodity_id
 	}
	$.ajax({
		type: "get",
		url: url_course,
		//url: "../json/ocean.json",
		async: true,
		success: function(data) {
			if(JSON.stringify(data) != "{}"){
				alert('该商品不存在，请重试！')
			}else{
			//console.log(data)
			$('.v_nav .v_s1').html(data.eng)
			$('.v_nav .v_s2').html(data.chn)
			$('.v_nav img').attr('src', 'http://s.speaka.cn/' + data.pic_path)
			$('.v_img img').eq(0).attr('src', 'http://s.speaka.cn/' + data.pages[0].pic_path)
			$('.v_img img').eq(1).attr('src', 'http://s.speaka.cn/' + data.pages[1].pic_path)
			$('.v_img img').eq(2).attr('src', 'http://s.speaka.cn/' + data.pages[2].pic_path)
			$('.v_det .v_det_s1').html('开课时间：' + data.begin_time.substr(0, 10))
			$('.v_det .v_det_s2').html('课程时长：' + data.last_days + '天')
			$('.v_footer .v_pay span').eq(0).html('<div>￥' +data.price / 100 + '</div><b>单人购</b>')
			$('.v_footer .v_pay span').eq(1).html('<div>￥' +data.groupon_price / 100 + '</div><b>'+data.groupon_num+'人起购</b>')
			$('.course_pay p span').eq(0).html(data.eng + ' ' + data.chn + ' ' + '微课')
			$('.course_pay p span').eq(1).html('￥' + data.price / 100 + '元')
			$('.course_pay p span').eq(2).html('暂无可用')
			$('.course_pay p span').eq(3).html('￥' + data.price / 100 + '元')
			}	
		}
	});
	setInterval(function() {
		var sTop = document.documentElement.scrollTop || document.body.scrollTop;
		//console.log(sTop)
		if(sTop > 100) {
			$('.v_footer').css({
				'height': '11.9%'
			})
		} else {
			$('.v_footer').css({
				'height': '0%'
			})
		}
	}, 50)

	//判断是否是安卓还是ios  
	function isAndroid_ios() {
		var u = navigator.userAgent,app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
		return isAndroid == true ? true : false;
	}
	//判断是否是微信浏览器
	function isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	}
	//参数：1微信/单人购买     2App/团购   11微信单人12微信团购21App单人22App团购
	$('.v_pay p').eq(0).click(function() {
		if(isWeiXin()) {
			//http://api.speaka.cn/api/buy/1?type_id=11
			window.location.href = 'http://api.speaka.cn/api/buy/1?type_id='+11+'&commodity_id='+commodity_id;
		}else{
			window.location.href = '../html/course_details_pay.html?type_id='+21+'&commodity_id='+commodity_id;
		}		
	})
	$('.v_pay p').eq(1).click(function() {
    		if(isWeiXin()) {
			window.location.href = 'http://api.speaka.cn/api/buy/1?type_id='+12+'&commodity_id='+commodity_id;
		}else{
			window.location.href = '../html/course_details_pay.html?type_id='+22+'&commodity_id='+commodity_id;
		}
	})
})