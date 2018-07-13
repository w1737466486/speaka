$(function(){
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
	var weekly_url=queryURL(location.href)
	var weeks_i=weekly_url.weeks_i
	var weeks_j=weekly_url.weeks_i
	var month_i=weekly_url.month_i
	console.log(weeks_i+'-----'+weeks_j+'-----'+month_i)
	console.log(typeof(month_i))
		token = 'Bearer ' + weekly_url.token;
		console.log(token)
		$.ajax({
			type: 'get',
			data:{
				type:'weeklyReport'
			},
			dataType: 'JSON',
			async: true,
			url:'https://api.speaka.live/api/statistics/statistics',
			//url: '../json/weekly.json',
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success: function success(data) {
				console.log(data)
				if(typeof(weeks_i)!='undefined'){
					console.log("周报")
					if(weeks_j==0){
						console.log('第一次周报')
						$('.weekly_li p').eq(0).html(data.data[weeks_i].comm_name+' 第一次周报')
						$('.weekly_li p').eq(1).find('span').html(data.data[weeks_i].weeks[weeks_j].data.time1+'~'+data.data[weeks_i].weeks[weeks_i].data.time2)
						$('.weekly_li .weekly_con p').eq(0).html('本周活跃度：')
						$('.weekly_li .weekly_con p').eq(1).html(data.data[weeks_i].weeks[weeks_j].data.data[0])
						$('.weekly_li .weekly_con p').eq(2).html(data.data[weeks_i].weeks[weeks_j].data.data[1])
						$('.weekly_li .weekly_con p').eq(3).html(data.data[weeks_i].weeks[weeks_j].data.data[2])
						$('.weekly_li .weekly_con p').eq(4).html(data.data[weeks_i].weeks[weeks_j].data.data[3])
						$('.weekly_li .weekly_con p').eq(5).html(data.data[weeks_i].weeks[weeks_j].data.data[4])
						$('.weekly_li .weekly_con p').eq(6).html(data.data[weeks_i].weeks[weeks_j].data.data[5])
					}
				}
				if(typeof(month_i)!='undefined'){
					console.log('月报')
					console.log(data.data[month_i].month)
					if(data.data[month_i].month.code==200){
						$('.weekly_li p').eq(0).html(data.data[month_i].comm_name+' 月报')
						$('.weekly_li p').eq(1).find('span').html(data.data[month_i].weeks[0].data.time1+'~'+data.data[month_i].weeks[data.data[month_i].weeks.length-1].data.time2)
						$('.weekly_li .weekly_con p').eq(0).html('本月活跃度：')
						$('.weekly_li .weekly_con p').eq(1).html(data.data[month_i].month.data.data[0])
						$('.weekly_li .weekly_con p').eq(2).html(data.data[month_i].month.data.data[1])
						$('.weekly_li .weekly_con p').eq(3).html(data.data[month_i].month.data.data[2])
						$('.weekly_li .weekly_con p').eq(4).html(data.data[month_i].month.data.data[3])
						$('.weekly_li .weekly_con p').eq(5).html(data.data[month_i].month.data.data[4])
						$('.weekly_li .weekly_con p').eq(6).html(data.data[month_i].month.data.data[5])
					}
					
				}
			},
			error: function error(res) {
				console.log(res);
			}
		});
	
})
