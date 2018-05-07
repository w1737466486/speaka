 
 $(function(){  
   $.ajax({
   	type:"get",
   	async:true,
   	url:"http://api.speaka.cn/api/team/77/commodity", 
   	success:function(data){
   		
   		$('.main .main_f1').click(function(){
   			data=eval(data)
   			var obj={}
   			//console.log(data.lessons[1].items.Day20180504[0].video_path)
   			obj.video_path=data.lessons[1].items.Day20180504[0].video_path
   			obj.pic_path=data.lessons[1].items.Day20180504[0].pic_path
   			console.log(JSON.stringify(obj))
   			curson.punchCurson(JSON.stringify(obj))
   			
   		})
   	}
   });
});  

//$('body .main .y1').click(function(){
//	$('body .main .y1').removeClass('active');
//	$(this).addClass('active')
//})
 $('.header_s1').click(function(){
    	window.location.href = "../html/map.html";
})

