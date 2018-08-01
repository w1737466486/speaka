$(function(){
	console.log(dns_url);
	window.get_token = get_token;
	var token = null;
	var token_code=null;
	//get_token();
	if (window.webkit) {
		window.webkit.messageHandlers.getToken.postMessage('get_token');
	} else {
		//curson.punchCurson(JSON.stringify(obj));
	}
	function get_token(_results) {
		token='Bearer ' + _results;
		token_code=_results;
		$.ajax({
			type:"get",
			url:"https://api.speaka.live/api/file/myFile",
			//url:'http://dev.speaka.cn/api/file/myFile',
			dataType: 'JSON',
			async:true,
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success:function(data){
				console.log(data)
				if(data.code==200){
					$('.weekly_main>ul li').eq(0).find('p').eq(1).html(data.data.wordWeek);
					$('.weekly_main>ul li').eq(1).find('p').eq(1).html(data.data.wordTotal);
					$('.weekly_main>ul li').eq(2).find('p').eq(1).html(data.data.workTotal);
					$('.weekly_main>ul li').eq(3).find('p').eq(1).html((data.data.successWork*100).toFixed(2)+'%');
				}
				
			},
			error:function(res){
				console.log(res);
			}
		});
		$.ajax({
			type: 'get',
			dataType: 'JSON',
			async: true,
			//url:'http://dev.speaka.cn/api/file/getTeamsReport',
			url:"https://api.speaka.live/api/file/getTeamsReport",
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success: function success(data) {
				console.log(data);
				if(data.code==200){
					for(var i=0;i<data.data.length;i++){
						if(data.data.length>=2){
							$('html').css({'height':'auto'})
						}
						/*$('.weekly_main').append(`<div class="weekly_li">
						<p>${data.data[i].eng}</p>
						<ul comm_id="${data.data[i].id}">
							<li weeks="${data.data[i].week[0]}" class=
							"week">
								<p>第一周</p>
								<p>报告</p>
							</li>
							<li weeks="${data.data[i].week[1]}" class=
							"week">
								<p>第二周</p>
								<p>报告</p>
							</li>
							<li weeks="${data.data[i].week[2]}" class=
							"week">
								<p>第三周</p>
								<p>报告</p>
							</li>
							<li weeks="${data.data[i].week[3]}" class=
							"week">
								<p>第四周</p>
								<p>报告</p>
							</li>
							
						</ul>
						<p months="${data.data[i].month[0]}" class="month" comm_id="${data.data[i].id}"><span>学习月报</span></p>
					</div>`)*/	
					$('.weekly_main').append("<div class=\"weekly_li\">\n\t\t\t\t\t\t<p>" + data.data[i].eng + "</p>\n\t\t\t\t\t\t<ul comm_id=\"" + data.data[i].id + "\">\n\t\t\t\t\t\t\t<li weeks=\"" + data.data[i].week[0] + "\" class=\n\t\t\t\t\t\t\t\"week\">\n\t\t\t\t\t\t\t\t<p>\u7B2C\u4E00\u5468</p>\n\t\t\t\t\t\t\t\t<p>\u62A5\u544A</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li weeks=\"" + data.data[i].week[1] + "\" class=\n\t\t\t\t\t\t\t\"week\">\n\t\t\t\t\t\t\t\t<p>\u7B2C\u4E8C\u5468</p>\n\t\t\t\t\t\t\t\t<p>\u62A5\u544A</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li weeks=\"" + data.data[i].week[2] + "\" class=\n\t\t\t\t\t\t\t\"week\">\n\t\t\t\t\t\t\t\t<p>\u7B2C\u4E09\u5468</p>\n\t\t\t\t\t\t\t\t<p>\u62A5\u544A</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li weeks=\"" + data.data[i].week[3] + "\" class=\n\t\t\t\t\t\t\t\"week\">\n\t\t\t\t\t\t\t\t<p>\u7B2C\u56DB\u5468</p>\n\t\t\t\t\t\t\t\t<p>\u62A5\u544A</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p months=\"" + data.data[i].month[0] + "\" class=\"month\" comm_id=\"" + data.data[i].id + "\"><span>\u5B66\u4E60\u6708\u62A5</span></p>\n\t\t\t\t\t</div>");
					
					}
					
				}
				//给含有周报的按钮添加入口
				for(var i=0;i<$('.week').length;i++){
					console.log(i);
					//console.log($('.weeks').eq(i).attr('weeks'))
					if($('.week').eq(i).attr('weeks')==0){
						console.log($('.week').eq(i).attr('weeks'));
					}else{
						$('.week').eq(i).addClass('weeks');
					}
				}
				//给含有月报的按钮添加入口
				for(var j=0;j<$('.month').length;j++){
					if($('.month').eq(j).attr('months')==0){
						console.log($('.month').eq(j).attr('months'));
					}else{
						$('.month').eq(j).addClass('months');
					}
				}
				//点击跳转详细周报
				$('.weekly_li ul .weeks').click(function(){
					var comm_id=$(this).parent('ul').attr('comm_id');
					var weeks_num=$(this).attr('weeks');
					console.log(comm_id+'------'+weeks_num);
					window.location.href='https://h5.speaka.live/front/html/weekly.html?comm_id='+comm_id+'&weeks_num='+weeks_num+'&token='+token_code;
				})
				$('.weekly_li .months').click(function(){
					var month_num=$(this).attr('months');
					var comm_id=$(this).attr('comm_id');
					window.location.href='https://h5.speaka.live/front/html/weekly.html?comm_id='+comm_id+'&month_num='+month_num+'&token='+token_code;
				})
				
				
			},
			error: function error(res) {
				console.log(res);
			}
		});
	}
	
})
