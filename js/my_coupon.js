$(function(){
       window.get_token=get_token;
       var token = null;
       function get_token(_results) {
           token = 'Bearer ' + _results;
        $.ajax({
            type:'GET',
            dataType:'JSON',
            async:true,
           //url:"../json/my_coupon.json",
	        url:'http://api.speaka.cn/api/u/orders',
	         beforeSend: function (request) {
	             request.setRequestHeader("Authorization", token);
	         },
            success:function (data){
                console.log("成功获取数据",data.info);
                for(let i=0;i<data.info.length;i++){
                    console.log(data.info[i]);
                    $('.coupon').append(`
	                <li>
					<div class="coupon_left">
						<div class="coupon_price">
							<strong>${data.info[i].price}</strong>
							<span>元</span>
						</div>
						<div class="use_time">
							<span>有效期 :</span>
							<span>
${data.info[i].usable_start_at.substr(0,4)+"年"+data.info[i].usable_start_at.substr(5,2)+"月"+data.info[i].usable_start_at.substr(8,2)+"日"}
</span>
							<span>-</span>
							<span>${data.info[i].usable_end_at.substr(0,4)+"年"+data.info[i].usable_end_at.substr(5,2)+"月"+data.info[i].usable_end_at.substr(8,2)+"日"}</span>
						</div>
					</div>
					<div class="coupon_right">
						<div>满减券</div>
						<div>满&nbsp;<span>${data.info[i].required_price}</span>&nbsp;可用</div>
					</div>
				</li>
	               `);

                }
            },
            error:function(res){
                console.log(res)
            }
        })
     }
});
