$(function(){
	window.get_token=get_token;
	var token = null;
	function get_token(_results) {
		//console.log(_results)
		token = 'Bearer ' + _results;
	
	    $.ajax({
	       type:'POST',
	       dataType:'JSON',
	       async:true,
	       //url:"../json/my_order.json",
	       url:'http://api.speaka.cn/api/u/orders',
	       beforeSend: function (request) {
		        request.setRequestHeader("Authorization", token);
		    },
	       success:function (data) {
	           console.log("成功获取数据",data.info);
	           for(let i=0;i<data.info.length;i++){
	               console.log(data.info[i].order_no);
	               $('.orders').append(`
	                <li>
	                    <p>
	                        <span>订单编号：</span>
	                        <span class="order_no">${data.info[i].order_no}</span>
	                    </p>
	                    <p>
	                        <span>商品名称：</span>
	                        <span class="order_name">${data.info[i].name}</span>
	                    </p>
	                    <p>
	                        <span>下单时间：</span>
	                        <span class="order_time">${data.info[i].created_at}</span>
	                    </p>
	                    <p>
	                        <span>价<span class="zhanwei">价格</span>格：</span>
	                        <span class="price"><em>￥</em>${data.info[i].price}</span>  
	                    </p>
	                    <img  class="mark" src="" alt="">
	                </li>
	               `);
	               if(data.info[i].state===1){
	                   $('.mark').eq(i).attr('src','../img/pay_yes.png')
	               }else{
	                   $('.mark').eq(i).attr('src','../img/pay_no.png')
	               }
	           }
	       },
	       error:function(res){
	       	alert(err)
	       }
	    })
    }
});

