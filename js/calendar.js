$(function() {
	/*
	 * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
	 */

	var dateObj = (function() {
		var _date = new Date(); // 默认为当前系统时间
		return {
			getDate: function() {
				return _date;
			},
			setDate: function(date) {
				_date = date;
			}
		};
	})();

	// 设置calendar div中的html部分
	renderHtml();
	// 表格中显示日期
	showCalendarData();
	// 绑定事件
	bindEvent();

	/**
	 * 渲染html结构
	 */
	function renderHtml() {
		var calendar = document.getElementById("calendar");
		var titleBox = document.createElement("div"); // 标题盒子 设置上一月 下一月 标题
		var bodyBox = document.createElement("div"); // 表格区 显示数据

		// 设置标题盒子中的html
		titleBox.className = 'calendar-title-box';
		titleBox.innerHTML = "<span class='prev-month' id='prevMonth'><em></em></span>" +
			"<span class='calendar-title' id='calendarTitle'></span>" +
			"<span id='nextMonth' class='next-month'><em></em></span>";
		calendar.appendChild(titleBox); // 添加到calendar div中

		// 设置表格区的html结构
		bodyBox.className = 'calendar-body-box';
		var _headHtml = "<tr>" +
			"<th>Sun</th>" +
			"<th>Mon</th>" +
			"<th>Tue</th>" +
			"<th>Wed</th>" +
			"<th>Thu</th>" +
			"<th>Fri</th>" +
			"<th>Sat</th>" +
			"</tr>";
		var _bodyHtml = "";

		// 一个月最多31天，所以一个月最多占6行表格
		for(var i = 0; i < 6; i++) {
			_bodyHtml += "<tr>" +
				"<td><span></span></td>" +
				"<td><span></span></td>" +
				"<td><span></span></td>" +
				"<td><span></span></td>" +
				"<td><span></span></td>" +
				"<td><span></span></td>" +
				"<td><span></span></td>" +
				"</tr>";
		}
		bodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +
			_headHtml + _bodyHtml +
			"</table>";
		// 添加到calendar div中
		calendar.appendChild(bodyBox);
	}

	/**
	 * 表格中显示数据，并设置类名
	 */
	function showCalendarData() {
		var _year = dateObj.getDate().getFullYear();
		var _month = dateObj.getDate().getMonth() + 1;
		var _dateStr = getDateStr(dateObj.getDate());

		// 设置顶部标题栏中的 年、月信息
		var calendarTitle = document.getElementById("calendarTitle");
		//var titleStr = _dateStr.substr(0, 4) + "年" + _dateStr.substr(4,2) + "月";
		// calendarTitle.innerText = titleStr;
		var titleStr = null;
		switch(_dateStr.substr(4, 2)) {
			case '01':
				titleStr = 'Jan';
				break;
			case '02':
				titleStr = 'Feb';
				break;
			case '03':
				titleStr = 'Mar';
				break;
			case '04':
				titleStr = 'Apr';
				break;
			case '05':
				titleStr = 'May';
				break;
			case '06':
				titleStr = 'Jun';
				break;
			case '07':
				titleStr = 'Jul';
				break;
			case '08':
				titleStr = 'Aug';
				break;
			case '09':
				titleStr = 'Sep';
				break;
			case '10':
				titleStr = 'Oct';
				break;
			case '11':
				titleStr = 'Nov';
				break;
			case '12':
				titleStr = 'Dec';
				break;
			default:
				titleStr = 'May';
				break;
		}
		calendarTitle.innerText = titleStr;

		// 设置表格中的日期数据
		var _table = document.getElementById("calendarTable");
		var _tds = _table.querySelectorAll("td span");
		var _firstDay = new Date(_year, _month - 1, 1); // 当前月第一天
		for(var i = 0; i < _tds.length; i++) {
			var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
			var _thisDayStr = getDateStr(_thisDay);
			_tds[i].innerText = _thisDay.getDate();
			//_tds[i].data = _thisDayStr;
			_tds[i].setAttribute('data', _thisDayStr);
			if(_thisDayStr === getDateStr(new Date())) { // 当前天
				//_tds[i].className = 'currentDay';
				$(_tds[i]).addClass('currentDay')
			} else if(_thisDayStr.substr(0, 6) === getDateStr(_firstDay).substr(0, 6)) {
				_tds[i].className = 'currentMonth'; // 当前月
			} else { // 其他月
				//_tds[i].className = 'otherMonth';
				$(_tds[i]).addClass('otherMonth')

			}
		}
		//console.log(_thisDay)
		var other = document.getElementsByClassName('otherMonth');
		//console.log(other.length)
		for(var j = 0; j < other.length; j++) {
			//console.log(other[i])
			other[j].innerHTML = ''
		}
	}

	/**
	 * 绑定上个月下个月事件
	 */
	function bindEvent() {
		var prevMonth = document.getElementById("prevMonth");
		var nextMonth = document.getElementById("nextMonth");
		addEvent(prevMonth, 'click', toPrevMonth);
		addEvent(nextMonth, 'click', toNextMonth);
	}

	/**
	 * 绑定事件
	 */
	function addEvent(dom, eType, func) {
		if(dom.addEventListener) { // DOM 2.0
			dom.addEventListener(eType, function(e) {
				func(e);
			});
		} else if(dom.attachEvent) { // IE5+
			dom.attachEvent('on' + eType, function(e) {
				func(e);
			});
		} else { // DOM 0
			dom['on' + eType] = function(e) {
				func(e);
			}
		}
	}

	//添加图标
	// $('.calendar .next-month').css({'background':'url(./public/images/right.png) no-repeat','background-size': '14px 24px;'})

	/**
	 * 点击上个月图标触发
	 */
	function toPrevMonth() {
		var date = dateObj.getDate();
		dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
		showCalendarData();
		
		$('#calendarTable .currentDay').css({
				'color': 'red'
			})
		//点击上个月图标清除被选择的tr
		$('.calendar-table td').find('span').css({
			'background': '',
			'border-radius': '',
			'color': 'black'
		})
		$('.calendar_detail').empty().append('<p></p>')
 	   	$('.calendar-table td').find('em').remove()
   		for(let i=0;i<$('.calendar-table td').length;i++){
			if($('.calendar-table td').eq(i).find('span').hasClass('currentMonth currentDay')){
				console.log($('.calendar-table td').eq(i).find('span').html(''))
			}
		}
	}

	/**
	 * 点击下个月图标触发
	 */
	function toNextMonth() {
		var date = dateObj.getDate();
		dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
		showCalendarData();
		$('#calendarTable .currentDay').css({
				'color': 'red'
			})
		//点击下个月图标清除被选择的tr
		$('.calendar-table td').find('span').css({
			'background': '',
			'border-radius': '',
			'color': 'black'
		})
		$('.calendar_detail').empty().append('<p></p>')
		$('.calendar-table td').find('em').remove()
		for(let i=0;i<$('.calendar-table td').length;i++){
			if($('.calendar-table td').eq(i).find('span').hasClass('currentMonth currentDay')){
				console.log($('.calendar-table td').eq(i).find('span').html(''))
			}
		}
		//var _currentDay=$('.calendar-table td').find('span').hasClass('currentMonth currentDay')
		//console.log(_currentDay)
	}

	/**
	 * 日期转化为字符串， 4位年+2位月+2位日
	 */
	function getDateStr(date) {
		var _year = date.getFullYear();
		var _month = date.getMonth() + 1; // 月从0开始计数
		var _d = date.getDate();

		_month = (_month > 9) ? ("" + _month) : ("0" + _month);
		_d = (_d > 9) ? ("" + _d) : ("0" + _d);
		return _year + _month + _d;
	}
	//接收token
	window.get_token=get_token;
	var token=null;
	//var token = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjF9.j9BQTyq8bNjnU9PAp5iGFESksWxSv8KNWKKqI1AFweg';
	//get_token();
    function get_token(_results){
    //console.log(_results)
	token='Bearer ' +_results
			
				
    //console.log(token)
    function current_course(){
     	 //当天课程默认显示  获取当前日期，日期格式为YYYY-MM-DD
	     var currentdate = new Date();
		 currentdate.setTime(currentdate.getTime());
		 var current_m=currentdate.getMonth()+1
		 var current_d=currentdate.getDate()
		 current_m = (current_m > 9) ? ("" + current_m) : ("0" + current_m);
	     current_d = (current_d > 9) ? ("" + current_d) : ("0" + current_d);
		 var current_day = currentdate.getFullYear()+"-" + current_m + "-" + current_d;
		 console.log(current_day)

     
     
		 $('#calendarTable .currentDay').parent().css({
			'position': 'relative',
			'color': '#000000'
			})
		 
		 $('#calendarTable .currentDay').css({
				'text-align': 'center',
				'background': '#EF5064',
				'border-radius': '50%',
				'position': 'absolute',
				'top': '50%',
				'left':'50%' ,
				'display':'inline-block',
				'color': '#FFFFFF',
				'width':'35px',
				'height':'35px',
			    'line-height':'35px',
			    'transform':'translate(-50%,-50%)'
			})
		 
		
		  $.ajax({
			 	type:"get",
			 	//url:"../json/calendar.json",
			 	url:'http://api.speaka.cn/api/lesson/day?day='+current_day,
			    beforeSend: function(request) {
		            request.setRequestHeader("Authorization", token);
		        },
		        dataType: 'JSON',
			 	async:false,
			 	success:function(data){
			 		console.log(data)
			 		
			 		$('.calendar_detail>p').html('详情')
			 		for(let i=0;i<data.info.lessons.length;i++){
			 			$('.calendar_detail').append('<div lesson_id='+data.info.lessons[i].lesson_id+'><span></span><p>'+data.info.lessons[i].name+'</p><p>'+data.info.lessons[i].begin_at+'~'+data.info.lessons[i].end_at+'</p><span></span></div>')
			 		}
			 		$('.calendar_detail div').css({'position': 'relative','width': '92%','left': '3.7%','margin-top': '15px','margin-bottom': '15px'})
			 	    let less_days=data.info.has_lesson_days
			 	   console.log(less_days)
			 	   let arr_days=$('.calendar-table span')
			 	   //console.log(arr_days)
			 	   for(let i=0;i<arr_days.length;i++){
			 	   	for(let j=0;j<less_days.length;j++){
			 	   		var has_days=(arr_days[i].innerHTML> 9 )? ("" + arr_days[i].innerHTML) : ("0" + arr_days[i].innerHTML);
			 	   		
			 	   		if(has_days==less_days[j]){
			 	   			//console.log(has_days,arr_days[i])
			 	   			//console.log($('.calendar-table span').eq(i).parent())
			 	   			$('.calendar-table span').eq(i).parent().css({
			 	   				'position': 'relative',
			                    'color': '#000000'
			 	   			}).append('<em></em>')
			 	   			$('.calendar-table span').eq(i).parent().find('em').css({
			 	   				'background': '#3AAB87',
								'border-radius': '50%',
								'position': 'absolute',
								'bottom': '10%',
								'left':'50%' ,
								'display':'inline-block',
								'width':'4px',
								'height':'4px',
								'transform':'translate(-50%,-50%)'
			 	   			})
			 	   		}
			 	    }
			 	   }
			 	   
			 	}
			 });
		 
  		 }
     current_course()   
	//点击日期下方显示detail
	$('.calendar-table td').click(function() {
		//	console.log($(this).html())
		if($(this).find('span').html() != '') {
			//其余颜色设为黑色
			$('.calendar-table td').find('span').css({
				'background': '',
				'border-radius': '',
				'color': 'black'
			})
			//当天日期设为红色
			$('#calendarTable .currentDay').css({
				'color': 'red'
			})
			$(this).css({
			'position': 'relative',
			'color': '#000000'
			})
			//点击日期添加背景色
			$(this).find('span').css({
				'text-align': 'center',
				'background': '#EF5064',
				'border-radius': '50%',
				'position': 'absolute',
				'top': '50%',
				'left':'50%' ,
				'display':'inline-block',
				'color': '#FFFFFF',
				'width':'35px',
				'height':'35px',
			    'line-height':'35px',
			    'transform':'translate(-50%,-50%)'
			})
			var click_day=$(this).find('span').attr('data')
			click_day=click_day.substr(0, 4)+'-'+click_day.substr(4, 2)+'-'+click_day.substr(6, 2)
			console.log(click_day)
			
			
			$('.calendar_detail').empty().append('<p></p>')
			 $.ajax({
			 	type:"get",
			 	//url:"../json/calendar.json",
			 	url:'http://api.speaka.cn/api/lesson/day?day='+click_day,
			 	 beforeSend: function(request) {
		            request.setRequestHeader("Authorization", token);
		        },
		        dataType: 'JSON',
			 	async:false,
			 	success:function(data){
			 		console.log(data)
			 		$('.calendar_detail>p').html('详情')
			 		for(let i=0;i<data.info.lessons.length;i++){
			 			$('.calendar_detail').append('<div><span></span><p>'+data.info.lessons[i].name+'</p><p>'+data.info.lessons[i].begin_at+'~'+data.info.lessons[i].end_at+'</p><span></span></div>')
			 		}
			 		$('.calendar_detail div').css({'position': 'relative','width': '92%','left': '3.7%','margin-top': '15px','margin-bottom': '15px'})
			 	   let less_days=data.info.has_lesson_days
			 	   console.log(less_days)
			 	   let arr_days=$('.calendar-table span')
			 	   //console.log(arr_days)
			 	   for(let i=0;i<arr_days.length;i++){
			 	   	for(let j=0;j<less_days.length;j++){
			 	   		var has_days=(arr_days[i].innerHTML> 9 )? ("" + arr_days[i].innerHTML) : ("0" + arr_days[i].innerHTML);
			 	   		if(has_days==less_days[j]){
			 	   			//console.log(has_days,arr_days[i])
			 	   			//console.log($('.calendar-table span').eq(i).parent())
			 	   			$('.calendar-table span').eq(i).parent().css({
			 	   				'position': 'relative',
			                    'color': '#000000'
			 	   			}).append('<em></em>')
			 	   			$('.calendar-table span').eq(i).parent().find('em').css({
			 	   				'background': '#3AAB87',
								'border-radius': '50%',
								'position': 'absolute',
								'bottom': '10%',
								'left':'50%' ,
								'display':'inline-block',
								'width':'4px',
								'height':'4px',
								'transform':'translate(-50%,-50%)'
			 	   			})
			 	   		}
			 	   	}
			 	   }
			 	}
			 });
			
		}
	})
	
 //点击跳转课程详情
   $('.calendar_detail div').click(function(){
 	let lesson_id=$('.calendar_detail div').attr('lesson_id')
 	//console.log(lesson_id)
 	window.location.href = 'http://h5.speaka.cn/front/html/course.html?'+lesson_id;
 })
}	

})