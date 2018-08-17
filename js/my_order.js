'use strict';

$(function () {
	window.get_token = get_token;
	var token = null;
	//app端业务逻辑，接收token，根据ios和android传过来的token调取get_token函数渲染界面
	//get_token();
	function get_token(_results) {
		token = 'Bearer ' + _results;
		$.ajax({
			type: 'post',
			dataType: 'JSON',
			async: true,
			url: 'https://api.speaka.live/api/u/orders',
			beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
			success: function success(data) {
				for (var i = 0; i < data.info.length; i++) {
					if (data.info[i].type_id == 0) {
						if (data.info[i].state == 0) {
							$('.single_orders').append('<li>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #999999">\u672A\u652F\u4ED8 </em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                </li>');
						} else if (data.info[i].state == 1) {
							$('.single_orders').append('<li>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #2FBBA9">\u5DF2\u652F\u4ED8 </em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                </li>');
						}
					} else if (data.info[i].type_id == 1) {
						if (data.info[i].state == 0) {
							$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #999999">\u672A\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span> \n\t\t                    </p>\n\t\t                </li>');
						} else if (data.info[i].state == 1) {
							if (data.info[i].status == 1) {
								$('.group_orders').append('<li has_share_url="' + data.info[i].has_share_url + '" is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #2FBBA9">\u5DF2\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '" style="color: #2FBBA9">\u5DF2\u6210\u56E2</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span> \n\t\t         <b commodity_id="' + data.info[i].commodity_id + '">分享</b> \n\t\t             </p>\n\t\t                </li>');
							} else if (data.info[i].status == 2) {
								$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #2FBBA9">\u5DF2\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '" style="color: #2FBBA9">\u6210\u56E2\u5931\u8D25</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span>\n\t\t                    </p>\n\t\t                </li>');
							} else if (data.info[i].status == 3) {
								var need_num=3-data.info[i].groupcount;
								$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #2FBBA9">\u5DF2\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '" style="color: #2FBBA9">\u672A\u6210\u56E2(缺'+need_num+'人)</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span>\n\t\t                        <b commodity_id="' + data.info[i].commodity_id + '">\u9080\u8BF7\u597D\u53CB\u53C2\u56E2</b> \n\t\t                    </p>\n\t\t                </li>');
							}
						} else if (data.info[i].state == 2) {
							$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #FD7C7C">\u5DF2\u9000\u6B3E</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '" style="color: #2FBBA9">\u6210\u56E2\u5931\u8D25</span>\n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span> \n\t\t                    </p>\n\t\t                </li>');
						}
					}
				}
				//已成团订单是否显示分享按钮
				for(var j=0;j<$('.group_orders li').length;j++){
					if($('.group_orders li').eq(j).attr('has_share_url')==0){
						$('.group_orders li').eq(j).find('p').eq(6).find('b').css({
							'display':'none'
						});
					}
				}
				$('.share_order b').click(function () {
					var order_no = $(this).parent().parent().find('p').eq(0).children('span').eq(1).html();
					var obj = {};
					obj.title = '【推荐2人免费学】跟着美国家庭学英语，看世界！';
					obj.desc = 'Youtube网红家庭中国首秀，台湾帅气老师Lyle实时互动讲解，趣味练习巩固效果。';
					obj.share_url = 'https://h5.speaka.live/front/html/group_pay.html?commodity_id=' + $(this).attr('commodity_id') + '&order_no=' + order_no;
					console.log(obj);
					if (window.webkit) {
						window.webkit.messageHandlers.orderClick.postMessage(JSON.stringify(obj));
					} else {
						androidDetialShare.JsUserDetialShare(JSON.stringify(obj));
						
					}
				});
			},
			error: function error(res) {
				console.log(res);
			}
		});
	}
	//微信端显示我的订单：通过判断是否是微信端浏览器，获取url上传递的token渲染界面，需要获取微信配置参数，实现分享功能
	//判断是否是微信浏览器
	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
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
	var orderurl = queryURL(location.href);
	var isbuy_code=orderurl.code;
	//调用isWeiXin()方法判断是微信浏览器端，无app传递token，执行业务逻辑
	if (isWeiXin()) {
		if(isbuy_code){
			$.ajax({
				type:"get",
				url:"https://api.speaka.live/api/commoditybuy/1"+'?code='+isbuy_code,
				async:false,
				success:function(res){
					console.log(res);
					token=res.token;
					 if(!res.token){
					 	window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b778a82184cf52f&redirect_uri='+encodeURI(location.href)+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
					 }else{
					 	token=res.token;
					 }
				},
				error:function(res){
					console.log(res);
				}
			  });
				var wx_token = 'Bearer ' + token;
				console.log(token);
				$.ajax({
					type: 'post',
					dataType: 'JSON',
					async: true,
					url: 'https://api.speaka.live/api/u/orders',
					beforeSend: function beforeSend(request) {
						request.setRequestHeader("Authorization", wx_token);
					},
					success: function success(data) {
						console.log("成功获取数据",data.info);
						for (var i = 0; i < data.info.length; i++) {
						if (data.info[i].type_id == 0) {
							if (data.info[i].state == 0) {
								$('.single_orders').append('<li>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #999999">\u672A\u652F\u4ED8 </em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                </li>');
							} else if (data.info[i].state == 1) {
								$('.single_orders').append('<li>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #2FBBA9">\u5DF2\u652F\u4ED8 </em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                </li>');
							}
						} else if (data.info[i].type_id == 1) {
							if (data.info[i].state == 0) {
								$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #999999">\u672A\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span> \n\t\t                    </p>\n\t\t                </li>');
							} else if (data.info[i].state == 1) {
								if (data.info[i].status == 1) {
									$('.group_orders').append('<li has_share_url="' + data.info[i].has_share_url + '" is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #2FBBA9">\u5DF2\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '" style="color: #2FBBA9">\u5DF2\u6210\u56E2</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span> \n\t\t         <b commodity_id="' + data.info[i].commodity_id + '">分享</b> \n\t\t             </p>\n\t\t                </li>');
								} else if (data.info[i].status == 2) {
									$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #2FBBA9">\u5DF2\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '" style="color: #2FBBA9">\u6210\u56E2\u5931\u8D25</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span>\n\t\t                    </p>\n\t\t                </li>');
								} else if (data.info[i].status == 3) {
									var need_num=3-data.info[i].groupcount;
									$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #2FBBA9">\u5DF2\u652F\u4ED8</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '" style="color: #2FBBA9">\u672A\u6210\u56E2(缺'+need_num+'人)</span>  \n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span>\n\t\t                        <b commodity_id="' + data.info[i].commodity_id + '">\u9080\u8BF7\u597D\u53CB\u53C2\u56E2</b> \n\t\t                    </p>\n\t\t                </li>');
								}
							} else if (data.info[i].state == 2) {
								$('.group_orders').append('<li is_group_failed="' + data.info[i].status + '">\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u7F16\u53F7\uFF1A</span>\n\t\t                        <span class="order_no">' + data.info[i].order_no + '</span>\n\t\t                        <em class="mark" style="color: #FD7C7C">\u5DF2\u9000\u6B3E</em>\n\t\t                    </p>\n\t\t                    <p class="xuxian"></p>\n\t\t                    <p>\n\t\t                        <span>\u5546\u54C1\u540D\u79F0\uFF1A</span>\n\t\t                        <span class="order_name"><a href="https://h5.speaka.live/front/html/course_details.html?commodity_id='+data.info[i].commodity_id+'">' + data.info[i].name + '</a></span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>\n\t\t                        <span class="order_time">' + data.info[i].created_at + '</span>\n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u8BA2\u5355\u91D1\u989D\uFF1A</span>\n\t\t                        <span class="price"><em>\uFFE5</em>' + data.info[i].price + '</span>  \n\t\t                    </p>\n\t\t                    <p>\n\t\t                        <span>\u6210\u56E2\u72B6\u6001\uFF1A</span>\n\t\t                        <span state="' + data.info[i].state + '" style="color: #2FBBA9">\u6210\u56E2\u5931\u8D25</span>\n\t\t                    </p>\n\t\t                     <p class="share_order">\n\t\t                        <span>\u56E2\u8D2D\u8BA2\u5355</span> \n\t\t                    </p>\n\t\t                </li>');
							}
						}
					}
						//已成团订单是否显示分享按钮
						for(var j=0;j<$('.group_orders li').length;j++){
							if($('.group_orders li').eq(j).attr('has_share_url')==0){
								$('.group_orders li').eq(j).find('p').eq(6).find('b').css({
									'display':'none'
								});
							}
						}
						$('.share_order b').click(function () {
							var order_no = $(this).parent().parent().find('p').eq(0).children('span').eq(1).html();
							//微信端跳转团购分享页
							window.location.href= 'https://h5.speaka.live/front/html/group_pay.html?commodity_id=' + $(this).attr('commodity_id') + '&order_no=' + order_no;
						});
					},
					error: function error(res) {
						console.log(res);
					}
				});
		}else{
			  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b778a82184cf52f&redirect_uri='+encodeURI(location.href)+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
		  }
	}
		$('.order_nav p').eq(1).click(function () {
			$('.order_nav p').eq(1).find('b').css({ 'display': 'block' });
			$('.group_orders').css({ 'display': 'none' });
			$('.order_nav p').eq(0).find('b').css({ 'display': 'none' });
			$('.single_orders').css({ 'display': 'block' });
		});
		$('.order_nav p').eq(0).click(function () {
			$('.order_nav p').eq(1).find('b').css({ 'display': 'none' });
			$('.group_orders').css({ 'display': 'block' });
			$('.order_nav p').eq(0).find('b').css({ 'display': 'block' });
			$('.single_orders').css({ 'display': 'none' });
		});
	
});