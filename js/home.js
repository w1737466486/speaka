$(function() {
	var word=null;
	$('.form p b').click(function(){
		word=$('.form p input').val()
		$.ajax({
		type:"get",
		dataType: 'JSON',
		//url:'../json/word.json',
		url:"http://api.speaka.cn/api/q?word="+word,
		async:true,
		success:function(data){
			console.log(data)
			if(data.status==1){
				$('.content p').eq(0).html(data.w.phonetic)
				var rep=data.w.translation.replace(/\\n/g,'<br/>')
				$('.content p').eq(1).html(rep)
			}else{
				alert('查无此词，请重新输入！')
			}
			
		},
		error: function error(res) {
				console.log(res);
		}
	});
	})

});