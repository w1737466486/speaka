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
	//获取当前url
	//var current_url=location.href
	var current_url='http://h5.speaka.cn/front/html/course_details.html?item=1&code=011c8JvR1CO4R914E2tR1VDSvR1c8Jv7-&state=1'
    current_url=current_url.split('?')[1].split('&').join().replace('=',':').replace('=',':').replace('=',':').split(',')
    console.log(current_url)
     var arrurl=[]
    for(let k=0;k<current_url.length;k++){
    	if(k!=0){
    	  arrurl.push(current_url[k])
    	}
    }
    var strurl=JSON.stringify(arrurl.join(','))
      console.log(strurl)
      $.post("http://api.speaka.cn/api/pay",strurl,
	   function(data){
	    //alert("Data Loaded: " + data);
	    console.log(data)
	    
	 /*   
	    //微信支付
	    //通过config接口注入权限验证配置
	    wx.config({
	    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: 'wx0b778a82184cf52f', // 必填，公众号的唯一标识
	    timestamp: , // 必填，生成签名的时间戳
	    nonceStr: '', // 必填，生成签名的随机串
	    signature: '',// 必填，签名
	    jsApiList: [] // 必填，需要使用的JS接口列表
	});
	//通过ready接口处理成功验证
	    wx.ready(function(){
	    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	
	    });
	    //通过error接口处理失败验证
	    wx.error(function(res){
		    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		});
	    //判断当前客户端版本是否支持指定JS接口
	    wx.checkJsApi({
		    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
		    success: function(res) {
		    // 以键值对的形式返回，可用的api值true，不可用为false
		    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
		    }
		});
	    
	    
	    wx.chooseWXPay({

			timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			
			nonceStr: '', // 支付签名随机串，不长于 32 位
			
			package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
			
			signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			
			paySign: '', // 支付签名
			
			success: function (res) {
			
			// 支付成功后的回调函数
			
		}

*/
	    
	    
	   });
	
	
	setInterval(function(){
			var sTop=document.documentElement.scrollTop||document.body.scrollTop;
			//console.log(sTop)
			if(sTop>100){
				$('.v_footer').css({'height':'13.1%'})
			}else{
				$('.v_footer').css({'height':'0%'})
			}
		},50)
	
	
	$('.v_pay').click(function(){
		$('.course_pay').css({'display':'block'})
		
	})
	$('.course_pay div b').eq(0).click(function(){
		$('.course_pay').css({'display':'none'})
	})
})
