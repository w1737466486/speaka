$(function(){
	//获取当前url
	var group_url = location.href
	//测试url
	//var group_url = 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id=1&order_no=2018052410495565873'

	console.log(group_url)
	var groupurl = queryURL(group_url)
	console.log(groupurl)
	var commodity_id =groupurl.commodity_id
		//将url参数转对象
	function queryURL(url) {
		var arr1 = url.split("?");
		var params = arr1[1].split("&"); //进行分割成数组
		var obj = {};
		for(var i = 0; i < params.length; i++) {
			var param = params[i].split("="); //进行分割成数组
			obj[param[0]] = param[1]; //为对象赋值
		}
		return obj;
	}
	
	
	$.ajax({
		type:"get",
		//url: "http://api.speaka.cn/api/commodity/" + commodity_id,
		url:"../json/ocean.json",
		async:true,
		success:function(data){
			console.log(data)
			$('.group_foot p').eq(1).find('span').html('<div><s>￥'+data.price/100+'</s>&nbsp￥'+data.groupon_price/100+'</div><b>我要参团</b>')
		    $('.group_main .eng_chn em').html(data.eng)
		    $('.group_main .eng_chn span').html(data.chn)
		},
		error:function(error){
			console.log(error)
		}
	});
	
	//获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    var _hours=date.getHours();
	    var _minutes=date.getMinutes();
	    var _seconds=date.getSeconds();
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
	    
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + _hours + seperator2 + _minutes
	            + seperator2 + _seconds;
	    return currentdate;
	}
	//获取微信头像
	$.ajax({
		type:"get",
		//url: "http://api.speaka.cn/api/order_group/" + groupurl.order_no,
		url:"../json/order.json",
		async:true,
		success:function(data){
			console.log(data)
			if(data.group.length>0){
				var group_member=$('.group_member li');
				for(let i=0;i<data.group.length;i++){
					$('.group_member li').eq(i).find('img').eq(1).attr('src',data.group[i].user_info.head_wx)
				    $('.group_member li').eq(i).find('b').html(data.group[i].user_info.name)
				}
			}
			    let curr_time=getNowFormatDate();
				let last_time=data.limit_at;
				let curr_day=curr_time.substr(8, 2)
				let last_day=last_time.substr(8, 2)
				let curr_hours=curr_time.substr(11, 2)
				let last_hours=last_time.substr(11, 2)
				let curr_min=curr_time.substr(14, 2)
				let last_min=last_time.substr(14, 2)
				let curr_sec=curr_time.substr(17, 2)
				let last_sec=last_time.substr(17, 2)
				//剩余总时间
				let remain_time=(last_day-curr_day)*24*60*60+(last_hours-curr_hours)*60*60+(last_min-curr_min)*60+(last_sec-curr_sec)
				console.log(remain_time)
				//剩余时
				let remain_hours=Math.floor(remain_time/3600)
				console.log(remain_hours)
				//剩余分
				let remain_min=Math.floor((remain_time-remain_hours*3600)/60)
				console.log(remain_min)
				//剩余秒
				let remain_sec=Math.floor(remain_time-remain_hours*3600-remain_min*60)
				console.log(remain_sec)
				$('.group_head p').eq(1).find('span').eq(0).html(remain_hours)
				$('.group_head p').eq(1).find('span').eq(1).html(remain_min)
				$('.group_head p').eq(1).find('span').eq(2).html(remain_sec)
				
				//设置定时器
			setInterval(function(){
				let curr_time=getNowFormatDate();
				let last_time=data.limit_at;
				let curr_day=curr_time.substr(8, 2)
				let last_day=last_time.substr(8, 2)
				let curr_hours=curr_time.substr(11, 2)
				let last_hours=last_time.substr(11, 2)
				let curr_min=curr_time.substr(14, 2)
				let last_min=last_time.substr(14, 2)
				let curr_sec=curr_time.substr(17, 2)
				let last_sec=last_time.substr(17, 2)
				//剩余总时间
				let remain_time=(last_day-curr_day)*24*60*60+(last_hours-curr_hours)*60*60+(last_min-curr_min)*60+(last_sec-curr_sec)
				//console.log(remain_time)
				//剩余时
				let remain_hours=Math.floor(remain_time/3600)
				//console.log(remain_hours)
				//剩余分
				let remain_min=Math.floor((remain_time-remain_hours*3600)/60)
				//console.log(remain_min)
				//剩余秒
				let remain_sec=Math.floor(remain_time-remain_hours*3600-remain_min*60)
				//console.log(remain_sec)
				$('.group_head p').eq(1).find('span').eq(0).html(remain_hours)
				$('.group_head p').eq(1).find('span').eq(1).html(remain_min)
				$('.group_head p').eq(1).find('span').eq(2).html(remain_sec)
			},1000)
			

			
		},
		error:function(error){
			console.log(error)
		}
	});
	
	$('.group_foot p').eq(0).click(function(){
		window.location.href = 'http://h5.speaka.cn/front/html/course_details.html?'+commodity_id
	})
	
	$('.group_foot p').eq(1).click(function(){
		window.location.href = 'http://api.speaka.cn/api/buy/1?type_id='+12+'&commodity_id='+commodity_id+'&order_no='+groupurl.order_no+'&env='+1;
	})
	
})
