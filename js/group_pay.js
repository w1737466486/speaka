$(function(){
	//获取当前url
	var group_url = location.href
	//测试url
	//var current_url = 'http://h5.speaka.cn/front/html/course_details.html?item=1&code=011c8JvR1CO4R914E2tR1VDSvR1c8Jv7-&state=1'

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
		//url: url_course,
		url:"../json/ocean.json",
		async:true,
		success:function(data){
			console.log(data)
			$('.group_foot p').eq(1).find('span').html('<div><s>￥98</s>￥49</div><b>我要参团</b>')
		},
		error:function(error){
			console.log(error)
		}
	});
	
})
