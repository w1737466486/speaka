$(function(){
	$.ajax({
		type:"get",
		url:"http://api.speaka.cn/api/commodity/1",
		//url:"../js/ocean.json",
		async:true,
		success:function(data){
			console.log(data)
			$('.v_nav .v_s1').html(data.eng)
			$('.v_nav .v_s2').html(data.chn)
			$('.v_nav img').attr('src','http://s.speaka.cn/'+data.pic_path)
			$('.v_img img').eq(0).attr('src','http://s.speaka.cn/'+data.pages[0].pic_path)
			$('.v_img img').eq(1).attr('src','http://s.speaka.cn/'+data.pages[1].pic_path)
			$('.v_img img').eq(2).attr('src','http://s.speaka.cn/'+data.pages[2].pic_path)
			$('.v_det .v_det_s1').html('开课时间：'+data.begin_time.substr(0,10))
			$('.v_det .v_det_s2').html('课程时长：'+data.last_days+'天')
			$('.v_footer .v_pay span').html(data.price/100+'元购买')
			$('.course_pay p span').eq(0).html(data.eng+' '+data.chn+' '+'微课')
			$('.course_pay p span').eq(1).html('￥'+data.price/100+'元')
			$('.course_pay p span').eq(2).html('暂无可用')
			$('.course_pay p span').eq(3).html('￥'+data.price/100+'元')
		}
	});
	
	
	setInterval(function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			//console.log(sTop)
			if(sTop>100){
				$('.v_footer').css({'height':'13.1%'})
			}else{
				$('.v_footer').css({'height':'0%'})
			}
		},50)
	
	$('.v_pay').click(function(){
		$('.course_pay').css({'display':'block'})
		
	})
	$('.course_pay div b').eq(0).click(function(){
		$('.course_pay').css({'display':'none'})
	})
})
