 $(function(){  
    $('.main .imgall').click(function(){
    	//console.log($(this).attr('src'))
    	$(this).attr('src','../img/'+$(this).index()+'.png')
    })
    $('.main .img1').click(function(){
    	console.log(1)
    	window.location.href = "../html/course.html";
    })
   
});  
  
