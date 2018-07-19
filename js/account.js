$(function(){
	window.get_token = get_token;
	var token = null;
	get_token();
	function get_token(_results) {
		token = 'Bearer ' + 1257;
		//控制循环开关
		var bstop=true;
		for(var j=1;j<999;j++){
			var page=j;
			if(bstop){
				$.ajax({
					type:"get",
					//url:"https://api.speaka.live/api/u/account",
					url:"http://dev.speaka.cn/api/u/account",
					dataType: 'JSON',
					data:{
						page:page
					},
					async:false,
					beforeSend: function beforeSend(request) {
						request.setRequestHeader("Authorization", token);
					},
					success:function(data){
						console.log(typeof data.data.drawableMoney)
						if(data.code==200&&j==1){
							$('.account_head p').eq(0).find('span').eq(1).html('￥'+data.data.drawableMoney/100+'元')
							$('.account_head p').eq(1).find('span').eq(1).html('￥'+data.data.waitedMoney/100+'元')
						}
						if(data.code==200&&data.data.orders.length>0){
							console.log(data.data.orders)
							for(var i=0;i<data.data.orders.length;i++){
								if(data.data.orders[i].commision_status==1){
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
	function rulebooks(){
		$('.account_rule_box').show()
	}
	$('.account_rule_box').click(function(){
		$('.account_rule_box').hide()
	})
	//点击转存，弹出打款界面
	$('.account_foot p').click(function(){
		$('.account_zfb_box').show()
	})
	$('.account_zfb>p').click(function(){
		var data={
			account:'',
			name:''
		}
		data.account=$('.account_zfb_id input').val();
		data.name=$('.account_zfb_name input').val();
		console.log(data)
		//手机号和邮箱正则表达式验证
        var myphonereg=/^1[34578]{1}\d{9}$/;
        var myemailreg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(data.account==''){
        	alert('请输入支付宝账号!');
        }
        if(data.name==''){
        	alert('请输入支付宝账号绑定姓名！');
        }
         if(!myphonereg.test(data.account) && !myemailreg.test(data.account)){
           alert('请输入正确的支付宝账号！')
        }
        $.ajax({
            type: "POST",
            url: "http://dev.speaka.cn/api/u/commision/draw",
            data: data,
            dataType: "json",
            beforeSend: function beforeSend(request) {
                request.setRequestHeader("Authorization", token);
            },
            success: function (data) {
            	console.log(data)
            	alert(data.msg)
            	$('.account_zfb_box').hide()
            },
            error: function (res) {
            	
            }
        });
	})
	$('.account_zfb_top').click(function(){
		$('.account_zfb_box').hide()
	})
})