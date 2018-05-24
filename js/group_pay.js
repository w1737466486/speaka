$(function(){
	var commodity_id = location.href.split('?')[1]
 	var url_course=null

 	if(commodity_id){
 		url_course="http://api.speaka.cn/api/commodity/" + commodity_id
 	}else{
 		commodity_id=1
 		url_course="http://api.speaka.cn/api/commodity/" + commodity_id
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
