$(function () {
	window.get_token = get_token;
	var token = null;
	//get_token();
	function get_token(_results) {
		//console.log(_results)
		token = 'Bearer ' + _results;
		$.ajax({
			type: "get",
			url: "http://api.speaka.cn/api/top100 ",
			//url: "../json/top.json",
			async: true,
			success: function success(data) {
				console.log(data)
				for(var i=0;i<data.info.top.length;i++){
					//console.log(data.info.top[i])
					if(i<3){
						console.log($('.rank_ul_one .li'+i).html())
						$('.rank_ul_one .li'+i).find('span').eq(0).find('img').attr('src','http://s.speaka.cn/' + data.info.top[i].head)
					    $('.rank_ul_one .li'+i).find('span').eq(1).html(data.info.top[i].name)
					    $('.rank_ul_one .li'+i).find('span').eq(2).find('em').html(data.info.top[i].score)
					}else{
						$('.rank_ul_two').append(`<li>
						<b>No.${i+1}</b>
						<span><img src="http://s.speaka.cn/${data.info.top[i].head}"/></span>
						<span>${data.info.top[i].name}</span>
						<span><em>${data.info.top[i].score}</em><img src="../img/宝石.png"/></span>
					</li>`)
					}
				}
				$('.rank_ul_three li b').html('No.'+data.info.mine.rank)
				$('.rank_ul_three li').find('span').eq(0).find('img').attr('src','http://s.speaka.cn/' + data.info.mine.head)
			    $('.rank_ul_three li').find('span').eq(1).html(data.info.mine.name)
				$('.rank_ul_three li').find('span').eq(2).find('em').html(data.info.mine.score)
			},
			error:function(res){
				console.log(res)
			}
		});
	}
	console.log('1')
});