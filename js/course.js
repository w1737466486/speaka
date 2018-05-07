$(function(){
	//console.log(str.split('?')[1])
   $.ajax({
   	type:"get",
   	async:true,
   	url:"../js/speaka.json", 
   	//url:'http://api.speaka.cn/api/team/77/commodity',
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
   		var lessonId=location.href.split('?')[1];
   		//console.log(data.lessons[0].id) 
   		for(var k=0;k<data.lessons.length;k++){
   			//判断是第几天的课程
   			if(data.lessons[k].id==lessonId){
   				//console.log(k)
   				//替换文字内容
   				$('.header .header_s2').html('Lesson'+' '+data.lessons[k].id)
   				$('.describe span').html(data.lessons[k].eng+'<br/>'+data.lessons[k].chn)
   				//导读视频预览图获取
   		       $('.nav_v .nav_img').attr('src','http://s.speaka.cn/'+data.lessons[k].pic_path)
   				$('.main_d1>span').html(JSON.stringify(data.lessons[k].items).substr(2,11));
   				var obj1=JSON.stringify(data.lessons[k].items).substr(2,11)
   				/*for( let i in data.lessons[k].items){
   					if(i==obj1){
   						console.log(i)
   						console.log(data.lessons[k].items[i])
   						$('.main_f1 p').html(data.lessons[k].items[i][0].chn)
   					}
   				}*/
   				var arr=[];
   				$('.main_d1 .main_f1 p').html(data.lessons[k].items[obj1][0].chn)
   				$('.main_d1 .main_f2 p').html(data.lessons[k].items[obj1][1].chn)
   				$('.main_d1 .main_f3 p').html(data.lessons[k].items[obj1][2].chn)
   				for( let i in data.lessons[k].items){
   					
   					arr.push(i);
   				}
   				
   				$('.main_d2>span').html(arr[1]);
   				var obj2=arr[1]
   				console.log(obj2)
   				
   				$('.main_d2 .main_f1 p').html(data.lessons[k].items[obj2][0].chn)
   				$('.main_d2 .main_f2 p').html(data.lessons[k].items[obj2][1].chn)
   				
   			}
   		}
   		
   		
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


