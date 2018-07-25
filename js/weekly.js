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
	var weekly_url=queryURL(location.href);
	var comm_id=weekly_url.comm_id;
	var weeks_num=weekly_url.weeks_num;
	var month_num=weekly_url.month_num;
	console.log(comm_id+'-----'+weeks_num+'-----'+month_num);
	console.log(typeof(month_num));
		token = 'Bearer ' + weekly_url.token;
		console.log(token);
		//获取周报详情表
		if(typeof(weeks_num)!='undefined'){
			$.ajax({
				type:"get",
				//url:"https://api.speaka.live/api/file/getWeekly",
				url:"http://dev.speaka.cn/api/file/getWeekly",
				async:false,
				data:{
					commodity_id:comm_id,
					weekly_id:weeks_num
				},
				beforeSend: function beforeSend(request) {
					request.setRequestHeader("Authorization", token);
				},
				success:function(data){
					console.log(data)
					if(data.code==200){
						$('body,html').css({'height':'auto'})
						$('.weekly_bg').css({'margin-bottom':'80px'})
						if(weeks_num==1){
							$('.weekly_main>p').eq(0).html(data.data.eng+' 第一次周报');
						}
						if(weeks_num==2){
							$('.weekly_main>p').eq(0).html(data.data.eng+' 第二次周报');
						}
						if(weeks_num==3){
							$('.weekly_main>p').eq(0).html(data.data.eng+' 第三次周报');
						}
						if(weeks_num==4){
							$('.weekly_main>p').eq(0).html(data.data.eng+' 第四次周报');
						}
						var begin_time=data.data.days[0].substr(0, 4)+'.'+data.data.days[0].substr(5, 2)+'.'+data.data.days[0].substr(8, 2)
						var over_time=data.data.days[data.data.days.length-1].substr(0, 4)+'.'+data.data.days[data.data.days.length-1].substr(5, 2)+'.'+data.data.days[data.data.days.length-1].substr(8, 2)
						$('.weekly_main>p').eq(1).find('span').html(begin_time+'~'+over_time);
					
						$('.weekly_main>ul li').eq(0).find('p').eq(1).html(data.data.wordCard);
						$('.weekly_main>ul li').eq(1).find('p').eq(1).html(data.data.wordTotal);
						$('.weekly_main>ul li').eq(2).find('p').eq(1).html(data.data.workTotal);
						$('.weekly_main>ul li').eq(3).find('p').eq(1).html(data.data.successWork*100+'%');
						$('.weekly_main').append('<p class="weeklyChart">上课发言次数曲线图<p>');
						$('.weekly_main').append('<div id="weekly_map"></div>');
						var weeklyChart=echarts.init(document.getElementById('weekly_map'));
						 var weekly_data = {
				            title: {
				                text: '上课发言次数曲线图'
				            },
				            tooltip: {},
				            legend: {
				                data:['times']
				            },
				            xAxis: {
				                data: ['周一','周二','周三','周四','周五','周六','周日']
				            },
				             grid:{
					            x:40,
					            x2:40,
					            y:25,
					            height:170
					        }, 
				            yAxis: {},
				            series: [{
				                name: 'times',
				                type: 'line',
				                smooth: true,
				                data: data.data.speak,
				               // areaStyle: {}
				            }]
				        };
				        weeklyChart.setOption(weekly_data);
				        //周报分享描述
						$('.weekly_share p').click(function(){
							//alert('周报')
							var _obj = {};
							_obj.title = '我在speak.a参加《'+data.data.eng+'》课程第'+weeks_num+'周，总共学会了'+data.data.wordCard+'个英文单词';
							_obj.desc = '我在speak.a参加《'+data.data.eng+'》课程第'+weeks_num+'周，总共学会了'+data.data.wordCard+'个英文单词';
							_obj.share_url =location.href
							//alert(JSON.stringify(_obj))
							if (window.webkit) {
								window.webkit.messageHandlers.weeklyClick.postMessage(JSON.stringify(_obj));
							} else {
								androidMyFile.JsUserFileShare(JSON.stringify(_obj));
							}
						})
				        
					}
				},
				error:function(res){
					console.log(res)
				}
			});
			
			
			
		}
		//获取月报详情表
		if(typeof(month_num)!='undefined'){
			$('.weekly_bg .weekly_box').css({
				'height':'80%'
			})
			$.ajax({
				type:"get",
				//url:"https://api.speaka.live/api/file/getMonthly",
				url:"http://dev.speaka.cn/api/file/getMonthly",
				async:false,
				data:{
					commodity_id:comm_id,
					month_id:month_num
				},
				beforeSend: function beforeSend(request) {
					request.setRequestHeader("Authorization", token);
				},
				success:function(data){
					console.log(data)
					if(data.code==200){
						
						$('.weekly_main>p').eq(0).html(data.data.eng+' 月报')	
						var begin_time=data.data.days[0].substr(0, 4)+'.'+data.data.days[0].substr(5, 2)+'.'+data.data.days[0].substr(8, 2)
						var over_time=data.data.days[data.data.days.length-1].substr(0, 4)+'.'+data.data.days[data.data.days.length-1].substr(5, 2)+'.'+data.data.days[data.data.days.length-1].substr(8, 2)
						$('.weekly_main>p').eq(1).find('span').html(begin_time+'~'+over_time)
						$('.weekly_main>ul li').eq(0).find('p').eq(1).html(data.data.wordCard)
						$('.weekly_main>ul li').eq(1).find('p').eq(1).html(data.data.wordTotal)
						$('.weekly_main>ul li').eq(2).find('p').eq(1).html(data.data.workTotal)
						$('.weekly_main>ul li').eq(3).find('p').eq(1).html(data.data.successWork*100+'%')
                        //月报分享描述
						$('.weekly_share p').click(function(){
							//alert('周报')
							var _obj = {};
							_obj.title = '我在speak.a参加《'+data.data.eng+'》课程，总共学会了'+data.data.wordTotal+'个英文单词';
							_obj.desc = '我在speak.a参加《'+data.data.eng+'》课程，总共学会了'+data.data.wordTotal+'个英文单词';
							_obj.share_url =location.href
							//alert(JSON.stringify(_obj))
							if (window.webkit) {
								window.webkit.messageHandlers.weeklyClick.postMessage(JSON.stringify(_obj));
							} else {
								androidMyFile.JsUserFileShare(JSON.stringify(_obj));
							}
						})
		
					}
				},
				error:function(res){
					console.log(res)
				}
			});
		}
		
	
})
