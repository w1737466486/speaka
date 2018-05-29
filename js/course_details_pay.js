$(function(){
	//获取当前url
	var current_url = location.href
	//测试url
	//var current_url = 'http://h5.speaka.cn/front/html/course_details.html?item=1&code=011c8JvR1CO4R914E2tR1VDSvR1c8Jv7-&state=1'

	console.log(current_url)
	var objurl = queryURL(current_url)
	console.log(objurl)
	var commodity_id =objurl.commodity_id
    window.get_token=get_token;
	//将url参数转对象
	function queryURL(url) {
		var arr1 = url.split("?");
		var params = arr1[1].split("&"); //进行分割成数组
		var obj = {};
		for(var i = 0; i < params.length; i++) {
			var param = params[i].split("="); //进行分割成数组
			obj[param[0]] = param[1]; //为对象赋值
		}
		return obj;
	}


	$.ajax({
		type:"get",
		url: "http://api.speaka.cn/api/commodity/" + commodity_id,
		//url:"../json/ocean.json",
		async:true,
		success:function(data){
			console.log(data.pages)
			$('.course_pay p span').eq(0).html(data.eng + ' ' + data.chn + ' ' + '微课')
			$('.course_pay p span').eq(1).html('￥' + data.price / 100 + '元')
			$('.course_pay p span').eq(2).html('￥' + data.groupon_price / 100 + '元')
			if(objurl.type_id==11||objurl.type_id==21){
				$('.course_pay p span').eq(3).html('实付： ￥' + data.price / 100 + '元')
			}
			if(objurl.type_id==12||objurl.type_id==22){
				$('.course_pay p span').eq(3).html('实付： ￥' + data.groupon_price / 100 + '元')
			}
			
		    if(objurl.type_id==11||objurl.type_id==21){
			    $('.course_pay p').eq(2).css({
			    	'display':'none'
			    })
		    }
		    if(objurl.type_id==11||objurl.type_id==12){
			    $('.wx_stutas').css({
			    	'display':'none'
			    })
		    }
		}
	});
	
	//判断是否是安卓还是ios  
	function isAndroid_ios() {
		var u = navigator.userAgent,app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
		return isAndroid == true ? true : false;
	}
	//判断是否是微信浏览器
	function isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	}
	var token = null;
	function get_token(_results) {
		//console.log(_results)
		token = 'Bearer ' + _results;
		//alert(token)
		$.ajax({
			type: "post",
			url: "http://api.speaka.cn/api/apppay",
			data: {
				commodity_id: commodity_id
			},
			beforeSend: function(request) {
				request.setRequestHeader("Authorization", token);
			},
			dataType: 'JSON',
			async: true,
			success: function(data) {
				//alert(data);
				if(data.status==1){
					var obj_pay = {}
					obj_pay.paytypeId = 2;
					obj_pay.partnerid = data.pay_config.partnerid;
					obj_pay.prepayid  = data.pay_config.prepayid;
					obj_pay.package   = data.pay_config.package;
					obj_pay.noncestr  = data.pay_config.noncestr;
					obj_pay.timestamp = data.pay_config.timestamp;
					obj_pay.sign = data.pay_config.sign;
					
					alert(JSON.stringify(obj_pay));
					if(isAndroid_ios()) {
						//安卓  
						 androidpay.androidWechatPay(JSON.stringify(obj_pay));
					} else {
						//ios  
						window.webkit.messageHandlers.payClick.postMessage(JSON.stringify(obj_pay));
					}
				}else{
					alert('请求失败，请重试！')
				}
			
			},
			error:function(res){
				alert(JSON.stringify(res))
			}

		});
	}
	//微信购买，配置微信环境参数设置
	if(objurl.type_id==11||objurl.type_id==12){
		
         
			var typeId=null
			//微信单人购买
				if(objurl.type_id==11){
					typeId=0;
					$('.pay_success p').eq(3).html('分享得优惠')
				}
				//微信团购
				if(objurl.type_id==12){
					typeId=1;
					$('.pay_success p').eq(3).html('邀请好友参团')
					$('.pay_success div span').html('去分享邀请')
				}

			$.post("http://api.speaka.cn/api/pay", {
					code: objurl.code,
					state: objurl.state,
					commodity_id:commodity_id,
					typeId:typeId,
					order_no:objurl.order_no,
					location: window.location.href
				},
				function(data) {
					var data = data;
					objurl.order_no=data.order_no;
					//测试数据  ~商户id===1500516481
					/*var data = {
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
					if(data.status == 0&&data.code==403){
						$('.wx_pay span').eq(1).click(function() {
							alert('亲！你已经购买过该商品了，请勿重复购买！')	
						})
					}
					if(data.status == 0&&data.code==401){
						$('.wx_pay span').eq(1).click(function() {
							alert('该商品团购已被取消！')	
						})
					}
					if(data.status == 0&&data.code==402){
						$('.wx_pay span').eq(1).click(function() {
							alert('未知用户分享！')	
						})
					}
					
					if(data.status == 1) {
						//微信支付
						//通过config接口注入权限验证配置
						wx.config({
							debug: data.config.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: data.config.appId, // 必填，公众号的唯一标识
							timestamp: data.config.timestamp, // 必填，生成签名的时间戳
							nonceStr: data.config.nonceStr, // 必填，生成签名的随机串
							signature: data.config.signature, // 必填，签名
							jsApiList: data.config.jsApiList // 必填，需要使用的JS接口列表
						});
						//通过ready接口处理成功验证
						wx.ready(function() {
							// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

							$('.wx_pay span').eq(1).click(function() {

								wx.chooseWXPay({

									timestamp: data.pay_config.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符

									nonceStr: data.pay_config.nonceStr, // 支付签名随机串，不长于 32 位

									package: data.pay_config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）

									signType: data.pay_config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'

									paySign: data.pay_config.paySign, // 支付签名

									success: function(res) {
										// 支付成功后的回调函数
										//alert(JSON.stringify(res))
											$('.course_pay_success').css({
												'display':'block'
											})
											
										//微信单人
										if(objurl.type_id==11){
											$('.pay_success p').eq(0).find('span').click(function(){
												window.location.href = 'http://h5.speaka.cn/front/html/course_details.html?'+commodity_id
											})
											$('.pay_success .pay_share').click(function(){
												window.location.href = 'http://h5.speaka.cn/front/html/course_details.html?'+commodity_id
											})
										}
										//微信团购
								        if(objurl.type_id==12){
								        	$('.pay_success p').eq(0).find('span').click(function(){
												window.location.href = 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id='+commodity_id+'&order_no='+objurl.order_no
											})
								        	$('.pay_success .pay_share').click(function(){
												window.location.href = 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id='+commodity_id+'&order_no='+objurl.order_no+'&is_share='+1
											})
								        	/*setInterval(function(){
												window.location.href = 'http://h5.speaka.cn/front/html/group_pay.html?commodity_id='+commodity_id+'&order_no='+objurl.order_no
											},1000)*/
								        }
									}
								})
							

							})
						});
						//通过error接口处理失败验证
						wx.error(function(res) {
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
							$('.course_pay_error').css({
								'display':'block'
							})
							window.location.href = 'http://h5.speaka.cn/front/html/course_details.html?'+commodity_id
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

					} else {
						alert('验证信息已失效，请重新获取订单信息！')
						$('.wx_pay span').eq(1).click(function() {
							alert('验证信息已失效，请重新获取订单信息！')	
						})
					}

				}, 'json');

			
	//App单人购买	
	}else{
		$('.wx_pay span').eq(1).click(function() {
			
			if(objurl.type_id==21){
				 if(isAndroid_ios()) {
					//alert('android')
					let objpay = {}
					objpay.typeId=0
					objpay.paytypeId = 1
					objpay.paycallback = 'get_token'
					objpay.title='超有趣的少儿互动英文课！'
					objpay.desc= 'Youtube英文教育红人家庭中国首秀，台湾帅气老师Lyle担当讲解。欢乐体验美国地道家庭生活'
					objpay.share_url='http://h5.speaka.cn/front/html/course_details.html?'+commodity_id
					androidpay.androidWechatPay(JSON.stringify(objpay));
				} else {
					//alert('ios')
					let objpay = {}
					objpay.typeId=0
					objpay.paytypeId = 1;
					objpay.paycallback = 'get_token'
					objpay.title='超有趣的少儿互动英文课！'
					objpay.desc= 'Youtube英文教育红人家庭中国首秀，台湾帅气老师Lyle担当讲解。欢乐体验美国地道家庭生活'
					objpay.share_url='http://h5.speaka.cn/front/html/course_details.html?'+commodity_id
					window.webkit.messageHandlers.payClick.postMessage(JSON.stringify(objpay));
				}
				//App团购
			}else if(objurl.type_id==22){
				 if(isAndroid_ios()) {
					//alert('android')
					let objpay = {}
					objpay.typeId=1
					objpay.paytypeId = 1
					objpay.paycallback = 'get_token'
					objpay.title='参团立享优惠！超有趣的少儿互动英文课！'
					objpay.desc= 'Youtube英文教育红人家庭中国首秀，台湾帅气老师Lyle担当讲解。欢乐体验美国地道家庭生活!'
					objpay.share_url='http://h5.speaka.cn/front/html/group_pay.html?commodity_id='+commodity_id+'&order_no='+objurl.order_no
					androidpay.androidWechatPay(JSON.stringify(objpay));
				} else {
					//alert('ios')
					let objpay = {}
					objpay.typeId=1
					objpay.paytypeId = 1;
					objpay.paycallback = 'get_token'
					objpay.title='参团立享优惠！超有趣的少儿互动英文课！'
					objpay.desc= 'Youtube英文教育红人家庭中国首秀，台湾帅气老师Lyle担当讲解。欢乐体验美国地道家庭生活!'
					objpay.share_url='http://h5.speaka.cn/front/html/group_pay.html?commodity_id='+commodity_id+'&order_no='+objurl.order_no
					window.webkit.messageHandlers.payClick.postMessage(JSON.stringify(objpay));
				}
			}
		})
		
		
	}
	
	$('.pay_success p span').click(function(){
		$('.course_pay_success').css({
			'display':'none'
		})
	})
	$('.pay_error p span').click(function(){
		$('.course_pay_error').css({
			'display':'none'
		})
	})
	
	$('.wx_pay span').eq(0).click(function(){
		window.location.href = '../html/course_details.html?'+commodity_id
	})

	
	
})
