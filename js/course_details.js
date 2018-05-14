$(function(){
	$.ajax({
		type:"get",
		url:"http://api.speaka.cn/api/commodity/"+1,
		//url:"../js/ocean.json",
		async:true,
		success:function(data){
			//console.log(data)
			$('.v_nav .v_s1').html(data.eng)
			$('.v_nav .v_s2').html(data.chn)
			$('.v_nav img').attr('src','http://s.speaka.cn/'+data.pic_path)
			$('.v_img img').eq(0).attr('src','http://s.speaka.cn/'+data.pages[0].pic_path)
			$('.v_img img').eq(1).attr('src','http://s.speaka.cn/'+data.pages[1].pic_path)
			$('.v_img img').eq(2).attr('src','http://s.speaka.cn/'+data.pages[2].pic_path)
			$('.v_det .v_det_s1').html('开课时间：'+data.begin_time.substr(0,10))
			$('.v_det .v_det_s2').html('课程时长：'+data.last_days+'天')
			$('.v_footer .v_pay span').html(data.price/100+'元购买')
			$('.course_pay p span').eq(0).html(data.eng+' '+data.chn+' '+'微课')
			$('.course_pay p span').eq(1).html('￥'+data.price/100+'元')
			$('.course_pay p span').eq(2).html('暂无可用')
			$('.course_pay p span').eq(3).html('￥'+data.price/100+'元')
		}
	});
	
	
	setInterval(function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			//console.log(sTop)
			if(sTop>100){
				$('.v_footer').css({'height':'17.1%'})
			}else{
				$('.v_footer').css({'height':'0%'})
			}
		},50)
	
	$('.v_pay').click(function(){
		
		//将url参数转对象
		
		function queryURL(url){
		    var arr1 = url.split("?");
		    var params = arr1[1].split("&");//进行分割成数组
		    var obj = {};
		    for(var i=0;i<params.length;i++){
		        var param = params[i].split("=");//进行分割成数组
		        obj[param[0]] = param[1];//为对象赋值
		    }
		
		    return obj;
		}
		
		//获取当前url
		var current_url=location.href
		//测试url
		//var current_url='http://h5.speaka.cn/front/html/course_details.html?item=1&code=011c8JvR1CO4R914E2tR1VDSvR1c8Jv7-&state=1'
		
		console.log(current_url)
		var objurl=queryURL(current_url)
		console.log(objurl)
	
   
      $.post("http://api.speaka.cn/api/pay",{code:objurl.code,state:objurl.state,location:window.location.href},
	   function(data){
	   	var data=data;
	    //alert("Data Loaded: " + data);  
	    //测试数据  ~商户id===1500516481
	     /* var data={
		    "status": 1,
		    "order_no": "2018051118065256229",
		    "prepay_id": "wx11180652597696856feb0f581358570244",
		    "config": {
		        "debug": false,
		        "beta": false,
		        "jsApiList": [
		            "chooseWXPay"
		        ],
		        "appId": "wx0b778a82184cf52f",
		        "nonceStr": "OysMAJLdI1",
		        "timestamp": 1526033212,
		        "url": "http://api.speaka.cn/api/pay",
		        "signature": "d9be4356ec60ff5c864dbb4d55dff261e81a1904"
		    },
		    "pay_config": {
		        "appId": "wx0b778a82184cf52f",
		        "nonceStr": "5af56b3c9c034",
		        "package": "prepay_id=wx11180652597696856feb0f581358570244",
		        "signType": "MD5",
		        "paySign": "DE8569BA33C8055BA2C5785635EDE382",
		        "timestamp": "1526033212"
		    }
		}*/
		
		
	    console.log(data.config)
	    //随机数函数
	    //Math.random().toString(36).substr(2);
	    if(data.status==1){
	    	 //微信支付
			  //通过config接口注入权限验证配置
			   wx.config({
			    debug: data.config.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: data.config.appId, // 必填，公众号的唯一标识
			    timestamp:data.config.timestamp, // 必填，生成签名的时间戳
			    nonceStr: data.config.nonceStr, // 必填，生成签名的随机串
			    signature: data.config.signature,// 必填，签名
			    jsApiList: data.config.jsApiList // 必填，需要使用的JS接口列表
			});
			$('.course_pay').css({'display':'block'})
			
		 //通过ready接口处理成功验证
			    wx.ready(function(){
			    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			
				  $('.course_pay div b').eq(1).click(function(){
						
						
						wx.chooseWXPay({
			
						timestamp: data.pay_config.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						
						nonceStr: data.pay_config.nonceStr, // 支付签名随机串，不长于 32 位
						
						package: data.pay_config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						
						signType: data.pay_config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						
						paySign: data.pay_config.paySign, // 支付签名
						
						success: function (res) {
							let objpay={}
							objpay.partnerid=1500516481;
							objpay.prepayid=data.prepay_id;
							objpay.package=data.pay_config.package;
							objpay.nonceStr=data.pay_config.nonceStr;
							objpay.timestamp=data.pay_config.timestamp;
							objpay.paySign=data.pay_config.paySign
							if (window.webkit) {
							      window.webkit.messageHandlers.itemClick.postMessage(JSON.stringify(objpay));
							    } else {
							      curson.punchCurson(JSON.stringify(objpay));
							    }
							
						// 支付成功后的回调函数
						console.log(res)
							}
				    	})
		
					})
			
			
			    });
			    //通过error接口处理失败验证
			    wx.error(function(res){
				    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				     console.log(res)
			    });
			    //判断当前客户端版本是否支持指定JS接口
			    wx.checkJsApi({
				    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
				    success: function(res) {
				    // 以键值对的形式返回，可用的api值true，不可用为false
				    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
				    }
				});
	    	
	            
	    	 	  	   
	    	
	    }else{
	    	alert('授权失败，请重试')
	    }
	      
	   },'json');
	
		
		
		
		
	
		
	})
	$('.course_pay div b').eq(0).click(function(){
		$('.course_pay').css({'display':'none'})
	})
})
