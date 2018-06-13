$(function () {
	window.get_token = get_token;
	var token = null;
	get_token();
	function get_token(_results) {
		//console.log(_results)
		token = 'Bearer ' + _results;
		$.ajax({
			type: "get",
			//url: "http://api.speaka.cn/api/top100 ",
			url: "../json/top.json",
			async: true,
			success: function success(data) {
				console.log(data)
				for(var i=0;i<data.info.top.length;i++){
					console.log(data.info.top[i])
				}
			},
			error:function(res){
				console.log(res)
			}
		});
	}
	console.log('1')
});