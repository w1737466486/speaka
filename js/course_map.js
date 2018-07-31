 $(function(){  
 	//获取当前日期格式20180507
 	 	function getNowFormatDate() {
		    var date = new Date();
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    var currentdate = date.getFullYear() + month + strDate;
		    return currentdate;
		}
 		//将url参数转对象
		function queryURL(url) {
			var arr1 = url.split("?");
			var params = arr1[1].split("&"); //进行分割成数组
			var obj = {};
			for (var i = 0; i < params.length; i++) {
				var param = params[i].split("="); //进行分割成数组
				obj[param[0]] = param[1]; //为对象赋值
			}
			return obj;
		}

 	console.log(getNowFormatDate());
 	
 	var mapurl=location.href.split('?')[1];
 	var url_map=null;
 	var team_id=null;
 	if(mapurl){
 		console.log(mapurl.substr(8));
 		team_id=mapurl.substr(8);
 	}else{
 		team_id=77;
 	}
 	var obj={};
 	$.ajax({
 		type:"get",
 		url:"https://api.speaka.live/api/team/"+team_id+"/commodity",
 		//url:"../json/speaka.json",
 		async:true,
 		success:function(data){
 			console.log(data);
 			//console.log(JSON.stringify(data.lessons[1].items.length))
 			if(JSON.stringify(data) != "{}"){
	 			for(var j=0;j<data.lessons.length;j++){
	 				//课程存在长度为undefined，未创建为0
	 				/*if(JSON.stringify(data.lessons[j].items.length)==undefined){
	 					console.log('222')
	 				}*/
	 				if(JSON.stringify(data.lessons[j].items).substr(5,8)<=getNowFormatDate()&&JSON.stringify(data.lessons[j].items.length)==undefined){
	 					var k=j+1;
	 					$('.main .imgall').eq(j).attr('src','../img/map'+k+'.png');
	 					//console.log(j)
	 				}else{
	 					$('.main .imgall').eq(j).attr('src','../img/locked.png');
	 				}
	 			}
 			}
 		}
 	});
   /* $('.main .imgall').click(function(){
    	//console.log($(this).attr('src'))
    	$(this).attr('src','../img/'+$(this).index()+'.png')
    })*/
   /* $('.main .img1').click(function(){
    	console.log(1)
    	window.location.href = "../html/course.html?1";
    }) */ 
    
    $('.main .imgall').click(function(){
    	console.log($(this).attr('src').substr(7,6));
    	if($(this).attr('src').substr(7,6)=='locked'){
    		console.log($(this).index());
    	}else{
    		window.location.href = 'https://h5.speaka.live/front/html/course.html?lessonId='+($(this).index()-1)+'&team_id='+team_id;
    	}
    	
    });
    
});  
  
