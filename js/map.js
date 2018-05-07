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
		    var currentdate = date.getFullYear() + month + strDate
		    return currentdate;
		}
 	
 	console.log(getNowFormatDate())
 	$.ajax({
 		type:"get",
 		url:"../js/speaka.json",
 		async:true,
 		success:function(data){
 			//console.log(JSON.stringify(data.lessons[1].items.length))
 			for(var j=0;j<data.lessons.length;j++){
 				//课程存在长度为undefined，未创建为0
 				/*if(JSON.stringify(data.lessons[j].items.length)==undefined){
 					console.log('222')
 				}*/
 				if(JSON.stringify(data.lessons[j].items).substr(5,8)<=getNowFormatDate()&&JSON.stringify(data.lessons[j].items.length)==undefined){
 					var k=j+1
 					$('.main .imgall').eq(j).attr('src','../img/'+k+'.png')
 					//console.log(j)
 				}
 			}
 		}
 	});
 	
 	
 	
   /* $('.main .imgall').click(function(){
    	//console.log($(this).attr('src'))
    	$(this).attr('src','../img/'+$(this).index()+'.png')
    })*/
    $('.main .img1').click(function(){
    	console.log(1)
    	window.location.href = "../html/course.html";
    })  
});  
  
