import React, { Component } from 'react';
import {Router,Route,Link,hashHistory,IndexRedirect,IndexRoute} from 'react-router'
import $ from 'jquery'
require('../public/css/map.css')
class Map extends Component {

	constructor(props) {
		super(props)
		this.state = {
		}
	}


  
	render() {

		return(
			<div className="main">
			<img className="backImgPlaceHolder" src="./public/images/bg.png"/>
			<img className="bg" src="./public/images/bg.png"/>
			<Link to={{pathname:'/calendar',query:{id:1}}}><img className="img1 imgall" src="./public/images/1.png"/></Link>
			<img className="img2 imgall" src="./public/images/locked.png"/>
			<img className="img3 imgall" src="./public/images/locked.png"/>
			<img className="img4 imgall" src="./public/images/locked.png"/>
			<img className="img5 imgall" src="./public/images/locked.png"/>
			<img className="img6 imgall" src="./public/images/locked.png"/>
			<img className="img7 imgall" src="./public/images/locked.png"/>
			<img className="img8 imgall" src="./public/images/locked.png"/>
            </div>
		)
	}

	componentDidMount() {
		(function() {
			//获取当前日期格式20180507
	 	 	function getNowFormatDate() {
			    var date = new Date();
			    var month = date.getMonth() + 1;
			    var strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    var currentdate = date.getFullYear() + month + strDate
			    return currentdate;
			}
		 	
		 	console.log(getNowFormatDate())
		 	$.ajax({
		 		type:"get",
		 		//url:"http://api.speaka.cn/api/team/77/commodity",
		 		url:"./public/js/speaka.json",
		 		async:true,
		 		success:function(data){
		 			//console.log(JSON.stringify(data.lessons[1].items.length))
		 			for(var j=0;j<data.lessons.length;j++){
		 				//课程存在长度为undefined，未创建为0
		 				/*if(JSON.stringify(data.lessons[j].items.length)==undefined){
		 					console.log('222')
		 				}*/
		 				if(JSON.stringify(data.lessons[j].items).substr(5,8)<=getNowFormatDate()&&JSON.stringify(data.lessons[j].items.length)==undefined){
		 					var k=j+1
		 					$('.main .imgall').eq(j).attr('src','./public/images/'+k+'.png')
		 					//console.log(j)
		 				}
		 			}
		 		}
		 	});
		   /* $('.main .imgall').click(function(){
		    	//console.log($(this).attr('src'))
		    	$(this).attr('src','../img/'+$(this).index()+'.png')
		    })*/
		   /* $('.main .img1').click(function(){
		    	console.log(1)
		    	window.location.href = "../html/course.html?1";
		    }) */ 
		    $('.main .imgall').click(function(){
		    	console.log($(this).attr('src').substr(7,6))
		    	if($(this).attr('src').substr(7,6)=='locked'){
		    		console.log($(this).index())
		    	}else{
		    		//window.location.href = '../html/course.html?'+$(this).index();
		    		hashHistory.push('/calendar')
		    	}
		    	
		    })

		})();

	}

}

export default Map;