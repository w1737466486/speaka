$(function(){
	window.get_token = get_token;
	var token = null;
	//去掉alert显示网页
	window.alert = function(name) {
		var iframe = document.createElement("IFRAME");
		iframe.style.display = "none";
		iframe.setAttribute("src", 'data:text/plain,');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
	};
	//get_token();
	function get_token(_results) {
		token = 'Bearer ' + _results;
		//控制循环开关
		var bstop=true;
		for(var j=1;j<999;j++){
			var page=j;
			if(bstop){
				$.ajax({
					type:"get",
					url:"https://api.speaka.live/api/u/account",
					//url:"http://dev.speaka.cn/api/u/account",
					dataType: 'JSON',
					data:{
						page:page
					},
					async:false,
					beforeSend: function beforeSend(request) {
						request.setRequestHeader("Authorization", token);
					},
					success:function(data){
						console.log(typeof data.data.drawableMoney);
						if(data.code==200&&j==1){
							$('.account_head p').eq(0).find('span').eq(1).html('￥'+data.data.drawableMoney/100+'元');
							$('.account_head p').eq(1).find('span').eq(1).html('￥'+data.data.waitedMoney/100+'元');
						}
						if(data.code==200&&data.data.orders.length>0){
							console.log(data.data.orders);
							for(var i=0;i<data.data.orders.length;i++){
								/*if(data.data.orders[i].commision_status==1){
									$('.order_list').append(`<li>
															<p>
																<span>佣金：￥${data.data.orders[i].commision_num/100}</span>
																<span class="noclearing">未结算</span>
															</p>
															<p class="xuxian"></p>
															<p>
																<span>下单时间</span>
																<span>${data.data.orders[i].created_at}</span>
															</p>
															<p>
																<span>预计结算时间</span>
																<span>${data.data.orders[i].limit_at}</span>
															</p>
														</li>`)
								}else if(data.data.orders[i].commision_status==2){
									$('.order_list').append(`<li>
															<p>
																<span>佣金：￥${data.data.orders[i].commision_num/100}</span>
																<span class="clearing">已结算</span>
															</p>
															<p class="xuxian"></p>
															<p>
																<span>下单时间</span>
																<span>${data.data.orders[i].created_at}</span>
															</p>
															<p>
																<span>预计结算时间</span>
																<span>${data.data.orders[i].limit_at}</span>
															</p>
														</li>`)
								
								}else if(data.data.orders[i].commision_status==3){
									$('.order_list').append(`<li>
															<p>
																<span>佣金：￥${data.data.orders[i].commision_num/100}</span>
																<span class="repeating">已转存</span>
															</p>
															<p class="xuxian"></p>
															<p>
																<span>下单时间</span>
																<span>${data.data.orders[i].created_at}</span>
															</p>
															<p>
																<span>预计结算时间</span>
																<span>${data.data.orders[i].limit_at}</span>
															</p>
														</li>`)
								
								}else if(data.data.orders[i].commision_status==4){
									$('.order_list').append(`<li>
															<p>
																<span>佣金：￥${data.data.orders[i].commision_num/100}</span>
																<span class="refund">已退款</span>
															</p>
															<p class="xuxian"></p>
															<p>
																<span>下单时间</span>
																<span>${data.data.orders[i].created_at}</span>
															</p>
															<p>
																<span>预计结算时间</span>
																<span>${data.data.orders[i].limit_at}</span>
															</p>
														</li>`)
								
								}else if(data.data.orders[i].commision_status==5){
									$('.order_list').append(`<li>
															<p>
																<span>佣金：￥${data.data.orders[i].commision_num/100}</span>
																<span class="audit">提现中</span>
															</p>
															<p class="xuxian"></p>
															<p>
																<span>下单时间</span>
																<span>${data.data.orders[i].created_at}</span>
															</p>
															<p>
																<span>预计结算时间</span>
																<span>${data.data.orders[i].limit_at}</span>
															</p>
														</li>`)
								}*/
								if (data.data.orders[i].commision_status == 1) {
									$('.order_list').append("<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u4F63\u91D1\uFF1A\uFFE5" + data.data.orders[i].commision_num / 100 + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"noclearing\">\u672A\u7ED3\u7B97</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"xuxian\"></p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u4E0B\u5355\u65F6\u95F4</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>" + data.data.orders[i].created_at + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u9884\u8BA1\u7ED3\u7B97\u65F6\u95F4</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>" + data.data.orders[i].limit_at + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>");
								} else if (data.data.orders[i].commision_status == 2) {
									$('.order_list').append("<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u4F63\u91D1\uFF1A\uFFE5" + data.data.orders[i].commision_num / 100 + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"clearing\">\u5DF2\u7ED3\u7B97</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"xuxian\"></p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u4E0B\u5355\u65F6\u95F4</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>" + data.data.orders[i].created_at + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u9884\u8BA1\u7ED3\u7B97\u65F6\u95F4</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>" + data.data.orders[i].limit_at + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>");
								} else if (data.data.orders[i].commision_status == 3) {
									$('.order_list').append("<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u4F63\u91D1\uFF1A\uFFE5" + data.data.orders[i].commision_num / 100 + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"repeating\">\u5DF2\u8F6C\u5B58</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"xuxian\"></p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u4E0B\u5355\u65F6\u95F4</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>" + data.data.orders[i].created_at + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u9884\u8BA1\u7ED3\u7B97\u65F6\u95F4</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>" + data.data.orders[i].limit_at + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>");
								} else if (data.data.orders[i].commision_status == 4) {
									$('.order_list').append("<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u4F63\u91D1\uFF1A\uFFE5" + data.data.orders[i].commision_num / 100 + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"refund\">\u5DF2\u9000\u6B3E</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"xuxian\"></p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u4E0B\u5355\u65F6\u95F4</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>" + data.data.orders[i].created_at + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u9884\u8BA1\u7ED3\u7B97\u65F6\u95F4</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>" + data.data.orders[i].limit_at + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>");
								} else if (data.data.orders[i].commision_status == 5) {
									$('.order_list').append("<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u4F63\u91D1\uFF1A\uFFE5" + data.data.orders[i].commision_num / 100 + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"audit\">\u63D0\u73B0\u4E2D</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"xuxian\"></p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u4E0B\u5355\u65F6\u95F4</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>" + data.data.orders[i].created_at + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u9884\u8BA1\u7ED3\u7B97\u65F6\u95F4</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>" + data.data.orders[i].limit_at + "</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>");
								}
								
							}
						}else{
							bstop=false;
						}
						
						
					},
					error:function(res){
						
					}
				});
			}else{
				break;
			}
			
		}
		
	}
	//客户端点击规则说明，显示规则说明弹窗
	window.rulebooks=rulebooks;
	// rulebooks()
	function rulebooks(res){
		$('.account_rule_box').show();
	}
	$('.account_rule_box').click(function(){
		$('.account_rule_box').hide();
	});
	//点击转存，弹出打款界面
	$('.account_foot p').click(function(){
		$('.account_zfb_box').show();
	});
	$('.account_zfb>p').click(function(){
		var data={
			account:'',
			name:''
		};
		data.account=$('.account_zfb_id input').val();
		data.name=$('.account_zfb_name input').val();
		console.log(data);
		//手机号和邮箱正则表达式验证
        var myphonereg=/^1[34578]{1}\d{9}$/;
        var myemailreg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(data.account==''){
        	alert('请输入支付宝账号!');
        }else if(data.name==''){
        	alert('请输入支付宝账号绑定姓名！');
        }else if(!myphonereg.test(data.account) && !myemailreg.test(data.account)){
           alert('请输入正确的支付宝账号！');
        }else{
        	$.ajax({
            type: "POST",
            url:"https://api.speaka.live/api/u/commision/draw",
            //url: "http://dev.speaka.cn/api/u/commision/draw",
            data: data,
            dataType: "json",
            beforeSend: function beforeSend(request) {
                request.setRequestHeader("Authorization", token);
            },
            success: function (data) {
            	console.log(data);
            	if(data.code==200){
            		$('.account_zfb_id input').val('');
            		$('.account_zfb_name input').val('');
            		$('.account_zfb_box').hide();
            	    alert('转存成功！');
            	}else{
            		$('.account_zfb_id input').val('');
            		$('.account_zfb_name input').val('');
            	    alert(data.msg);
            	}
            	
            },
            error: function (res) {
            	
            }
        });
        }
        
	});
	$('.account_zfb_top').click(function(){
		$('.account_zfb_box').hide();
	});
});