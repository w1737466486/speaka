$(function () {
	$('.recommended_word_head p span').eq(1).click(function(){
		$('.recommended_word_head').css({
			'display':'none'
		})
		$('.recommended_word_search').css({
			'display':'block'
		})
	})
	var word=null;
	$('.recommended_word_search p span').click(function(){
		if($('.recommended_word_search p span img').attr('state')=='cancel'){
		alert('2')
		$('.recommended_word_search').css({
			'display':'none'
		})
		$('.recommended_word_head').css({
			'display':'block'
		})
		}else if($('.recommended_word_search p span img').attr('state')=='search'){
			alert('1')
				word=$('.recommended_word_search p input').val()
				$.ajax({
				type:"get",
				dataType: 'JSON',
				//url:'../json/word.json',
				url:"http://api.speaka.cn/api/q?word="+word,
				async:true,
				success:function(data){
					alert(data)
					console.log(data)
					if(data.status==1){
						
					}else{
						
					}
					
				},
				error: function error(res) {
						console.log(res);
				}
			});
		}
		
	})
	$(".keyword").on('keypress',function(e) {  
        var keycode = e.keyCode;  
        var searchName = $(this).val();  
        if(keycode=='13') {  
            e.preventDefault();    
            //请求搜索接口            
				$.ajax({
				type:"get",
				dataType: 'JSON',
				//url:'../json/word.json',
				url:"http://api.speaka.cn/api/q?word="+searchName,
				async:true,
				success:function(data){
					console.log(data)
					$('.recommended_word_search p span img').attr('src','../img/search.png')
					$('.recommended_word_search p span img').attr('state','search')
					alert(data)
					
				},
				error: function error(res) {
						console.log(res);
				}
			});
        }  
     }); 
	
	//音频播放
	var audio = document.getElementById('mp3Btn');
    audio.volume = 0.3;
	$('.btn-audio').click(function() {
            event.stopPropagation();//防止冒泡
            if(audio.paused){ //如果当前是暂停状态
                audio.play(); //播放
                return;
            }else{//当前是播放状态
                audio.pause(); //暂停
            }
        });
})
