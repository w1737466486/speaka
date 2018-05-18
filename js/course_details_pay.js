$(function(){
	
	$.ajax({
		type:"get",
		url:"../json/ocean.json",
		async:true,
		success:function(data){
			console.log(data.pages)
			$('.course_pay p span').eq(0).html(data.eng + ' ' + data.chn + ' ' + '微课')
			$('.course_pay p span').eq(1).html('￥' + data.price / 100 + '元')
			$('.course_pay p span').eq(2).html('￥' + data.groupon_price / 100 + '元')
			$('.course_pay p span').eq(3).html('实付： ￥' + data.price / 100 + '元')
		}
	});
	
})
