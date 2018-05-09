import React, { Component } from 'react';
import $ from 'jquery'
require ('../public/css/calendar.css')
class Calendar extends Component {

 

  render() {

    return (
      <div>
        <div className='calendar' id='calendar' style={{background:'url(./public/images/top.png) no-repeat',backgroundSize: '100% auto'}}>
        
        </div>
      </div>
    )
  }

  componentDidMount() {
			(function(){
			  /*
			   * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
			   */
			  var dateObj = (function(){
			    var _date = new Date();    // 默认为当前系统时间
			    return {
			      getDate : function(){
			        return _date;
			      },
			      setDate : function(date) {
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
			    var titleBox = document.createElement("div");  // 标题盒子 设置上一月 下一月 标题
			    var bodyBox = document.createElement("div");  // 表格区 显示数据
			 
			    // 设置标题盒子中的html
			    titleBox.className = 'calendar-title-box';
			    titleBox.innerHTML = "<span class='prev-month' id='prevMonth'></span>" +
			      "<span class='calendar-title' id='calendarTitle'></span>" +
			      "<span id='nextMonth' class='next-month'></span>";
			    calendar.appendChild(titleBox);    // 添加到calendar div中
			 
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
			              "<td></td>" +
			              "<td></td>" +
			              "<td></td>" +
			              "<td></td>" +
			              "<td></td>" +
			              "<td></td>" +
			              "<td></td>" +
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
			    var titleStr=null;
			    switch (_dateStr.substr(4,2)){
			    	case '01':
			    	 titleStr ='Jan';
			    		break;
			    	case '02':
			    	 titleStr ='Feb';
			    		break;
			    	case '03':
			    	 titleStr ='Mar';
			    		break;
			    	case '04':
			    	 titleStr ='Apr';
			    		break;
			    	case '05':
			    	 titleStr ='May';
			    		break;
			    	case '06':
			    	 titleStr ='Jun';
			    		break;
			    	case '07':
			    	 titleStr ='Jul';
			    		break;
			    	case '08':
			    	 titleStr ='Aug';
			    		break;
			    	case '09':
			    	 titleStr ='Sep';
			    		break;
			    	case '10':
			    	 titleStr ='Oct';
			    		break;
			    	case '11':
			    	 titleStr ='Nov';
			    		break;
			    	case '12':
			    	 titleStr ='Dec';
			    		break;
			    	default:
			    	titleStr ='May';
			    		break;
			    }
			    calendarTitle.innerText = titleStr;
			   
			    // 设置表格中的日期数据
			    var _table = document.getElementById("calendarTable");
			    var _tds = _table.getElementsByTagName("td");
			    var _firstDay = new Date(_year, _month - 1, 1);  // 当前月第一天
			    for(var i = 0; i < _tds.length; i++) {
			      var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
			      var _thisDayStr = getDateStr(_thisDay);
			      _tds[i].innerText = _thisDay.getDate();
			      //_tds[i].data = _thisDayStr;
			      _tds[i].setAttribute('data', _thisDayStr);
			      if(_thisDayStr === getDateStr(new Date())) {    // 当前天
			        _tds[i].className = 'currentDay';
			      }else if(_thisDayStr.substr(0, 6) === getDateStr(_firstDay).substr(0, 6)) {
			        _tds[i].className = 'currentMonth';  // 当前月
			      }else {    // 其他月
			        _tds[i].className = 'otherMonth';
			       
			      }
			    }
			    //console.log(_thisDay)
			     var other=document.getElementsByClassName('otherMonth');
					  //console.log(other.length)
					  for(var j=0;j<other.length;j++){
					  	//console.log(other[i])
					  	other[j].innerHTML=''
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
			    if(dom.addEventListener) {  // DOM 2.0
			      dom.addEventListener(eType, function(e){
			        func(e);
			      });
			    } else if(dom.attachEvent){  // IE5+
			      dom.attachEvent('on' + eType, function(e){
			        func(e);
			      });
			    } else {  // DOM 0
			      dom['on' + eType] = function(e) {
			        func(e);
			      }
			    }
			  }
			 
			  /**
			   * 点击上个月图标触发
			   */
			  function toPrevMonth() {
			    var date = dateObj.getDate();
			    dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
			    showCalendarData();
			    //点击上个月图标清除被选择的tr
			    $('.calendar-table td').css({'background':'','border-radius':''})
			  }
			 
			  /**
			   * 点击下个月图标触发
			   */
			  function toNextMonth() {
			    var date = dateObj.getDate();
			    dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
			    showCalendarData();
			    //点击下个月图标清除被选择的tr
			    $('.calendar-table td').css({'background':'','border-radius':''})
			  }
			 
			  /**
			   * 日期转化为字符串， 4位年+2位月+2位日
			   */
			  function getDateStr(date) {
			    var _year = date.getFullYear();
			    var _month = date.getMonth() + 1;    // 月从0开始计数
			    var _d = date.getDate();
			     
			    _month = (_month > 9) ? ("" + _month) : ("0" + _month);
			    _d = (_d > 9) ? ("" + _d) : ("0" + _d);
			    return _year + _month + _d;
			  }
			 
			  //点击日期下方显示detail
			  $('.calendar-table td').click(function(){
			  	
			  //	console.log($(this).html())
			  	if($(this).html()!=''){
			  		//其余颜色设为黑色
				  	$('.calendar-table td').css({'background':'','border-radius':'','color':'black'})
				  	//当天日期设为红色
				  	$('.currentDay').css({'color':'red'})
				  	//点击日期添加背景色
				  	$(this).css({'background':'#EF5064','border-radius':'50%','color':'#FFFFFF'})
			  	}
			  })
			})();

  }

}

export default Calendar;