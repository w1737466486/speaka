$(function(){
	window.get_token = get_token;
	var token = null;
	var token_code=null;
	//get_token();
	function get_token(_results) {
		token = 'Bearer ' + _results;
		token_code=_results;
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
				if(data.code==200){
					for(var i=0;i<data.data.length;i++){
						/*$('.weekly_main').append(`<div class="weekly_li">
						<p>${data.data[i].comm_name}</p>
						<ul>
							<li>
								<p>第一周</p>
								<p>报告</p>
							</li>
							<li>
								<p>第二周</p>
								<p>报告</p>
							</li>
							<li>
								<p>第三周</p>
								<p>报告</p>
							</li>
							<li>
								<p>第四周</p>
								<p>报告</p>
							</li>
						</ul>
						<p><span>学习月报</span></p>
					</div>`)*/
					 $('.weekly_main').append(("<div class=\"weekly_li\">\n\t\t\t\t\t\t<p>" + data.data[i].comm_name + "</p>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<p>第一周</p>\n\t\t\t\t\t\t\t\t<p>报告</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<p>第二周</p>\n\t\t\t\t\t\t\t\t<p>报告</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<p>第三周</p>\n\t\t\t\t\t\t\t\t<p>报告</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<p>第四周</p>\n\t\t\t\t\t\t\t\t<p>报告</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<p><span>学习月报</span></p>\n\t\t\t\t\t</div>"));
						for(var j=0;j<data.data[i].weeks.length;j++){
							//console.log(data.data[i].weeks[j])
							if(data.data[i].weeks[j].code==200){
								//console.log($('.weekly_li').eq(i).find('ul').html())
								$('.weekly_li').eq(i).find('ul').find('li').eq(j).addClass('weeks')
								$('.weekly_li').eq(i).find('ul').find('li').eq(j).attr('weeks_i',i)
								$('.weekly_li').eq(i).find('ul').find('li').eq(j).attr('weeks_j',j)
							}
						}
						if(data.data[i].month.code==200){
							$('.weekly_li').eq(i).children().eq(2).addClass('month')
							$('.weekly_li').eq(i).children().eq(2).attr('month_i',i)
						}
					}
					if(data.data.length>3){
						$('.weekly_bg .weekly_box').css({'height':'auto'})
					}
				}
				//点击跳转详细周报
				$('.weekly_li ul .weeks').click(function(){
					console.log($(this).attr('weeks_i'))
					var weeks_i=$(this).attr('weeks_i')
					var weeks_j=$(this).attr('weeks_j')
					window.location.href='https://h5.speaka.live/front/html/weekly.html?weeks_i='+weeks_i+'&weeks_j='+weeks_j+'&token='+token_code
				})
				$('.weekly_li .month').click(function(){
					var month_i=$(this).attr('month_i')
					window.location.href='https://h5.speaka.live/front/html/weekly.html?month_i='+month_i+'&token='+token_code
				})
				
				
			},
			error: function error(res) {
				console.log(res);
			}
		});
	}
	
})
