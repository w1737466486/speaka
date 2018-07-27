$(function () {
	var word=null;
	var word_id=null;
	var tokenurl = queryURL(location.href);
	var token='Bearer ' + tokenurl.token;
	//默认页面点击搜索，显示搜索框，隐藏今日单词
	$('.recommended_word_head p span').eq(1).click(function(){
		$('.recommended_word_head').css({
			'display':'none'
		});
		$('.recommended_word_search').css({
			'display':'block'
		});
	})
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
	};
	
	
	
	
	//每日一词推荐
	$.ajax({
		type:"get",
		//url:'../json/day_word.json',
		url:"https://api.speaka.live/api/word/day-word",
		async:false,
		dataType:'JSON',
		success:function(data){
			console.log(data);
			word_id=data.info.word.id;
			console.log(word_id);
			$('.recommended_word_img').append('<img src="https://s.speaka.live/'+data.info.word.pic_path+'">');
			$('.recommended_word_box p').eq(0).html(data.info.word.eng);
			$('.recommended_word_box p').eq(1).html(data.info.word.chn);
			$('.recommended_word_box .mp3Btn').attr('src','https://s.speaka.live/'+data.info.word.voice);
		   /* if(data.info.videos.length>=1){
		    	$('.recommended_word_foot ul').html('')
				for(var i=0;i<data.info.videos.length;i++){
					if(i==0){
						$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+data.info.videos[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+data.info.videos[i].like_num+'</p><img src="../img/最佳标签.png"></li>')
					}else{
						$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+data.info.videos[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+data.info.videos[i].like_num+'</p></li>')
					}
				}
			}*/
			
			$.ajax({
				type:"get",
				url:"https://api.speaka.live/api/memberVideo/memberVideo",
				//url:'../json/video_data.json',
				async:false,
				data:{ 
					id: word_id,
                    type: 'list',
                    upload_type: 'word_card'
                    },
				dataType:'JSON',
				beforeSend: function beforeSend(request) {
					request.setRequestHeader("Authorization", token);
				},
				success:function(res){
					console.log(res);
					if(res.code==200){
						if(res.data.length>=1){
						$('.recommended_word_foot').show();
				    	$('.recommended_word_foot ul').html('');
						for(var i=0;i<res.data.length;i++){
							if(i==0){
								$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+res.data[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+res.data[i].like_num+'</p><img src="../img/最佳标签.png"></li>');
							}else{
								$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+res.data[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+res.data[i].like_num+'</p></li>');
							}
						  }
						}else{
							$('.recommended_word_foot').hide();
						}
						 $('.recommended_word_foot ul li').click(function(){
					    	console.log($(this).index());
					    	var obj={};
					    	obj.pic_path=res.data[$(this).index()].pic_path;
					    	obj.video_path=res.data[$(this).index()].video_path;
					    	console.log(obj);
					    	if (window.webkit) {
								window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
							} else {
								curson.punchCurson(JSON.stringify(obj));
							}
					    	
					    });
					}else{
						alert('数据请求失败，请重试！');
					}
					
					
				}
			});
				
		}
	});
	//点击cancel或者search触发返回或搜索事件
	$('.recommended_word_search p span').click(function(){
		if($('.recommended_word_search p span img').attr('state')=='cancel'){
		$('.recommended_word_search').css({
			'display':'none'
		});
		$('.recommended_word_head').css({
			'display':'block'
		});
		}else if($('.recommended_word_search p span img').attr('state')=='search'){
				word=$('.recommended_word_search p input').val();
				$.ajax({
				type:"get",
				dataType: 'JSON',
				//url:'../json/true_card.json',
				//url:'../json/false_card.json',
				url:"https://api.speaka.live/api/word/search?keyword="+word,
				async:false,
				success:function(data){
					//alert(JSON.stringify(data))
					console.log(data);
					$('.recommended_word_search p input').val('');
					if(data.status==1&&data.info.length>0){
						if(data.info[0].isCard){
							console.log('命中闪卡');
							word_id=data.info[0].id;
							console.log(word_id);
							//命中闪卡
							$.ajax({
								type:"get",
								//url:'../json/day_word.json',
								//url:'../json/false_card.json',
								url:"https://api.speaka.live/api/word/day-word?id="+word_id,
								async:false,
								dataType:'JSON',
								success:function(data){
									$('.recommended_word_img img').attr('src','https://s.speaka.live/'+data.info.word.pic_path);
									$('.recommended_word_box p').eq(0).html(data.info.word.eng);
									$('.recommended_word_box p').eq(1).html(data.info.word.chn);
									$('.recommended_word_box .mp3Btn').attr('src','https://s.speaka.live/'+data.info.word.voice);
								   /* if(data.info.videos.length>=1){
								    	$('.recommended_word_foot
								    	').show()
								    	$('.recommended_word_foot ul').html('')
										for(var i=0;i<data.info.videos.length;i++){
											if(i==0){
												$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+data.info.videos[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+data.info.videos[i].like_num+'</p><img src="../img/最佳标签.png"></li>')
											}else{
												$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+data.info.videos[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+data.info.videos[i].like_num+'</p></li>')
											}
										}
									}*/
									 $.ajax({
										type:"get",
										url:"https://api.speaka.live/api/memberVideo/memberVideo",
										//url:'../json/video_data.json',
										async:false,
										data:{ 
											id: word_id,
						                    type: 'list',
						                    upload_type: 'word_card'
						                    },
										dataType:'JSON',
										beforeSend: function beforeSend(request) {
											request.setRequestHeader("Authorization", token);
										},
										success:function(res){
											console.log(res);
											if(res.code==200){
												if(res.data.length>=1){
												$('.recommended_word_foot').show();
										    	$('.recommended_word_foot ul').html('');
												for(var i=0;i<res.data.length;i++){
													if(i==0){
														$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+res.data[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+res.data[i].like_num+'</p><img src="../img/最佳标签.png"></li>');
													}else{
														$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+res.data[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+res.data[i].like_num+'</p></li>');
													}
												  }
												}else{
													$('.recommended_word_foot').hide();
												}
												 $('.recommended_word_foot ul li').click(function(){
											    	console.log($(this).index());
											    	var obj={};
											    	obj.pic_path=res.data[$(this).index()].pic_path;
											    	obj.video_path=res.data[$(this).index()].video_path;
											    	console.log(obj);
											    	if (window.webkit) {
														window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
													} else {
														curson.punchCurson(JSON.stringify(obj));
													}
											    	
											    })
											}else{
												alert('数据请求失败，请重试！');
											}
											
										}
									});
								}
							});
							$('.recommended_word_word').hide();
							$('.recommended_word_box').show();
						}else{
							$('.recommended_word_word').html('');
							$('.recommended_word_foot ul').html('');
							$('.recommended_word_foot').hide();
							$('.recommended_word_word').append('<p>'+data.info[0].eng+'</p>');
							var arr_word=data.info[0].chn.split("\\n");
							console.log(arr_word);
							for(var i=0;i<arr_word.length;i++){
								$('.recommended_word_word').append('<p>'+arr_word[i]+'</p>');
							}
							
							$('.recommended_word_word').show();
							$('.recommended_word_box').hide();
						}
					}else{
						alert('查无此词，请重新输入！');
					}
					
				},
				error: function error(res) {
						console.log(res);
				}
			});
		}
		
	})
	//键盘回车键触发搜索事件
	$(".keyword").on('keypress',function(e) {  
        var keycode = e.keyCode;  
        var searchName = $(this).val();  
        if(keycode=='13') {  
            e.preventDefault();    
            //请求搜索接口            
				$.ajax({
				type:"get",
				dataType: 'JSON',
				//url:'../json/true_card.json',
				//url:'../json/false_card.json',
				url:"https://api.speaka.live/api/word/search?keyword="+searchName,
				async:false,
				success:function(data){
					//console.log(data)
					$('.recommended_word_search p span img').attr('src','../img/search.png');
					$('.recommended_word_search p span img').attr('state','search');
					//alert(JSON.stringify(data))
					$(".keyword").val('');
					if(data.status==1&&data.info.length>0){
						if(data.info[0].isCard){
							console.log('命中闪卡');
							word_id=data.info[0].id;
							console.log(word_id);
							//命中闪卡
							$.ajax({
								type:"get",
								//url:'../json/day_word.json',
								//url:'../json/false_card.json',
								url:"https://api.speaka.live/api/word/day-word?id="+word_id,
								async:false,
								dataType:'JSON',
								success:function(data){
									//alert(JSON.stringify(data))
									$('.recommended_word_img img').attr('src','https://s.speaka.live/'+data.info.word.pic_path);
									$('.recommended_word_box p').eq(0).html(data.info.word.eng);
									$('.recommended_word_box p').eq(1).html(data.info.word.chn);
									$('.recommended_word_box .mp3Btn').attr('src','https://s.speaka.live/'+data.info.word.voice);
								   /* if(data.info.videos.length>=1){
								    	$('.recommended_word_foot p').show()
								    	$('.recommended_word_foot ul').html('')
										for(var i=0;i<data.info.videos.length;i++){
											if(i==0){
												$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+data.info.videos[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+data.info.videos[i].like_num+'</p><img src="../img/最佳标签.png"></li>')
											}else{
												$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+data.info.videos[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+data.info.videos[i].like_num+'</p></li>')
											}
										}
									}*/
									$.ajax({
										type:"get",
										url:"https://api.speaka.live/api/memberVideo/memberVideo",
										//url:'../json/video_data.json',
										async:false,
										data:{ 
											id: word_id,
						                    type: 'list',
						                    upload_type: 'word_card'
						                    },
										dataType:'JSON',
										beforeSend: function beforeSend(request) {
											request.setRequestHeader("Authorization", token);
										},
										success:function(res){
											console.log(res);
											if(res.code==200){
												if(res.data.length>=1){
												$('.recommended_word_foot').show();
										    	$('.recommended_word_foot ul').html('');
												for(var i=0;i<res.data.length;i++){
													if(i==0){
														$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+res.data[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+res.data[i].like_num+'</p><img src="../img/最佳标签.png"></li>');
													}else{
														$('.recommended_word_foot ul').append('<li><span><img src="https://s.speaka.live/'+res.data[i].pic_path+'" alt=""></span><p><img src="../img/Like.png">'+res.data[i].like_num+'</p></li>');
													}
												  }
												}else{
													$('.recommended_word_foot').hide();
												}
												 $('.recommended_word_foot ul li').click(function(){
											    	console.log($(this).index());
											    	var obj={};
											    	obj.pic_path=res.data[$(this).index()].pic_path;
											    	obj.video_path=res.data[$(this).index()].video_path;
											    	console.log(obj);
											    	if (window.webkit) {
														window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(obj));
													} else {
														curson.punchCurson(JSON.stringify(obj));
													}
											    	
											    });
											}else{
												alert('数据请求失败，请重试！');
											}
											
										}
									});
								}
							});
							$('.recommended_word_word').hide();
							$('.recommended_word_box').show();
						}else{
							$('.recommended_word_word').html('');
							$('.recommended_word_foot ul').html('');
							$('.recommended_word_foot').hide();
							$('.recommended_word_word').append('<p>'+data.info[0].eng+'</p>');
							var arr_word=data.info[0].chn.split("\\n");
							console.log(arr_word);
							for(var i=0;i<arr_word.length;i++){
								$('.recommended_word_word').append('<p>'+arr_word[i]+'</p>');
							}
							
							$('.recommended_word_word').show();
							$('.recommended_word_box').hide();
						}
					}else{
						alert('查无此词，请重新输入！');
					}
				    console.log($(".keyword").val());
					
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
	      audio.play(); //播放
	});
   						
	
})
