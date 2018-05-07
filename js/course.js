$(function(){  
   $.ajax({
   	type:"get",
   	async:true,
   	//url:"http://api.speaka.cn/api/team/77/commodity", 
   	url:'http://api.speaka.cn/api/team/77/commodity',
   	success:function(data){
   		/*$('.main .main_f1').click(function(){
   			data=eval(data)
   			var obj={}
   			//console.log(data.lessons[1].items.Day20180504[0].video_path)
   			obj.video_path=data.lessons[1].items.Day20180504[0].video_path
   			obj.pic_path=data.lessons[1].items.Day20180504[0].pic_path
   			console.log(JSON.stringify(obj))
   			//curson.punchCurson(JSON.stringify(obj))
   			
   		})*/
   		//导读视频预览图获取
   		$('.nav_v .nav_img').attr('src','http://s.speaka.cn/'+data.lessons[1].pic_path)
   		$('.nav_v div').click(function(){
   			obj.id=data.lessons[1].id;
			obj.type=0;
			obj.video_path=data.lessons[1].video_path;
			obj.v_id=0
			console.log(obj)
   			
	   				if (window.webkit) {
				      window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
				    } else {
				      curson.punchCurson(JSON.stringify(obj));
				    }
	   				
   		})
   		
   		//day 1视频获取
   		var obj={};
   		$('.main .main_d1 .y1').click(function(){
             console.log('2')
   			data=eval(data)
   			//console.log(data.lessons[1].items.Day20180504.length)
   			var txt1=$(this).find('p').html();
   			//console.log(txt1)
   			var day1=data.lessons[1].items.Day20180504;
   			for(var i=0;i<day1.length;i++){
	   			if(day1[i].chn==txt1){
	   				obj.id=day1[i].id;
	   				obj.type=day1[i].type;
	   				obj.video_path=day1[i].video_path;
	   				obj.v_id=day1[i].v_id;
	   				console.log(obj)
	   				//curson.punchCurson(JSON.stringify(obj))
	   				
	   				if (window.webkit) {
				      window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
				    } else {
				      curson.punchCurson(JSON.stringify(obj));
				    }
	   				
	   			}
   			}
   			
   		})
   		//day 2视频获取
   		$('.main .main_d2 .y1').click(function(){
             console.log('2')
   			data=eval(data)
   			//console.log(data.lessons[1].items.Day20180504.length)
   			var txt1=$(this).find('p').html();
   			var day1=data.lessons[1].items.Day20180505;
   			for(var i=0;i<day1.length;i++){
	   			if(day1[i].chn==txt1){
	   				obj.id=day1[i].id;
	   				obj.type=day1[i].type;
	   				obj.video_path=day1[i].video_path;
	   				obj.v_id=day1[i].v_id;
	   				console.log(obj)
	   				
	   				if (window.webkit) {
				      window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
				    } else {
				      curson.punchCurson(JSON.stringify(obj));
				    }
	   				
	   			}
   			}
   			
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

