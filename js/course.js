$(function(){
	//console.log(str.split('?')[1])
   $.ajax({
   	type:"get",
   	async:true,
   	//url:"../js/speaka.json", 
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
   		var lessonId=location.href.split('?')[1];
   		console.log(data.lessons[0].id) 
   		for(var k=0;k<data.lessons.length;k++){
   			//判断是第几天的课程
   			if(data.lessons[k].id==lessonId){
   				//console.log(k)
   				//替换文字内容
   				$('.header .header_s2').html('Lesson'+' '+data.lessons[k].id)
   				
   				$('.describe span').html('<b class="b_eng">'+data.lessons[k].eng+'</b>'+'<br/>'+'<b>'+data.lessons[k].chn+'</b>')
   				//$('.describe span').html(data.lessons[k].eng+'<br/>'+data.lessons[k].chn)
   				//导读视频预览图获取
   		       $('.nav_v .nav_img').attr('src','http://s.speaka.cn/'+data.lessons[k].pic_path)
   				//var obj1=JSON.stringify(data.lessons[k].items).substr(2,11)
   				/*for( let i in data.lessons[k].items){
   					if(i==obj1){
   						console.log(i)
   						console.log(data.lessons[k].items[i])
   						$('.main_f1 p').html(data.lessons[k].items[i][0].chn)
   					}
   				}*/
   				var obj={};
   				//点击获取导读视频
   				$('.nav_v').click(function(){
	   			obj.id=data.lessons[lessonId-1].id;
				obj.type=0;
				obj.video_path=data.lessons[lessonId-1].video_path;
				obj.v_id=0
				console.log(obj)
	   			
		   				if (window.webkit) {
					      window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
					    } else {
					      curson.punchCurson(JSON.stringify(obj));
					    }
		   				
	   		})   	
			   		
			   		//判断有几个课时，就添加几个课程盒子
   				var  arrlessons= Object.keys(data.lessons[k].items); 
   				//console.log(arrlessons.length)
   				for(let i=1;i<=arrlessons.length;i++){
   					$('.main').append("<div class='main_d"+i+"'><span></span></div>")
   					$('.main_d'+i+'>span').html('Day'+' '+i)
   					$('.main_d'+i+'>span').attr('data_day',arrlessons[i-1])
   					$('.main_d'+i+'>span').css({'width': '50px','height': '21px','font-size': '16px','color':' #333333'})
   					$('.main_d'+i).css({'position': 'relative','width': '92%','left': '3.7%','margin-top': '15px','margin-bottom': '15px'})
	                console.log(arrlessons[i-1])
   					for(let j=1;j<=data.lessons[k].items[arrlessons[i-1]].length;j++){
   						$('.main .main_d'+i).append("<div class='main_f"+j+"'><span class='d1'></span><p></p></div>")
   						$('.main_d'+i+'>div').addClass('y1')	
   						//console.log($('.main_d'+i).find('p').length)
   						$('.main_d'+i).find('p').eq($('.main_d'+i).find('p').length-1).html(data.lessons[k].items[arrlessons[i-1]][j-1].chn)
   						$('.main_d'+i).find('p').eq($('.main_d'+i).find('p').length-1).attr('chnId',data.lessons[k].items[arrlessons[i-1]][j-1].id)
   						console.log(data.lessons[k].items[arrlessons[i-1]][j-1].chn)
   						//console.log(data.lessons[k].items[arrlessons[i-1]])
   					}
   					//console.log(data.lessons[k].items[arrlessons[i]])
   				}
   				//console.log($('.main').find('p').length)
   				
   					
   				$('.main .y1').click(function(){
   					let day_index=$(this).parent().find('span').attr('data_day')
   					let v_day=$(this).parent().find('span').html()
   					console.log(arrlessons)
   					console.log(day_index)
   					console.log(arrlessons.indexOf(day_index))
   					data=eval(data)
			   			let txt1=$(this).find('p').html();
			   			let day1=data.lessons[lessonId-1].items[day_index];
			   			let txtId=$(this).find('p').attr('chnid');
			   			console.log(txtId)
			   			for(let i=0;i<day1.length;i++){
				   			if(day1[i].chn==txt1&&day1[i].id==txtId){
				   				obj.id=day1[i].id;
				   				obj.type=day1[i].type;
				   				obj.video_path=day1[i].video_path;
				   				obj.v_id=day1[i].v_id;
				   				obj.v_day=v_day
				   				obj.v_text=txt1
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
   		}
   		
   		
   		
   		
   	
   	}
   });
});  

//$('body .main .y1').click(function(){
//	$('body .main .y1').removeClass('active');
//	$(this).addClass('active')
//})


