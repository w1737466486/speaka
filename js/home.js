$(function() {
	console.log(123)
	var word=null;
	$('.form p b').click(function(){
		word=$('.form p input').val()
		$.ajax({
		type:"get",
		dataType: 'JSON',
		//url:'../json/word.json',
		url:"https://api.speaka.live/api/q?word="+word,
		async:true,
		success:function(data){
			console.log(data)
			if(data.status==1){
				$('.content p').eq(0).html(data.w.phonetic)
				var rep=data.w.translation.replace(/\\n/g,'<br/>')
				$('.content p').eq(1).html(rep)
			}else{
				alert('查无此词，请重新输入！')
				$('.content p').eq(0).html('')
				$('.content p').eq(1).html('')
			}
			
		},
		error: function error(res) {
				console.log(res);
		}
	});
	})

});