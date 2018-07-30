$(function() {
	console.log(123);
	var word=null;
	$('.form p b').click(function(){
		word=$('.form p input').val();
		$.ajax({
		type:"get",
		dataType: 'JSON',
		//url:'../json/word.json',
		url:"https://api.speaka.live/api/q?word="+word,
		async:true,
		success:function(data){
			console.log(data);
			if(data.status==1){
				$('.content p').eq(0).html(data.w.phonetic);
				var rep=data.w.translation.replace(/\\n/g,'<br/>');
				$('.content p').eq(1).html(rep);
			}else{
				alert('查无此词，请重新输入！');
				$('.content p').eq(0).html('');
				$('.content p').eq(1).html('');
			}
			
		},
		error: function error(res) {
				console.log(res);
		}
	});
	});

});

const app = getApp();

const baseUrl = "https://app.sfys365.xyz/"; //设置基础url
let requestPayment = {
url: "",
parameter: {},
fuSuccess: function () { },
fuFail: function () { },
complete: function () { },
showToast: true,
method: "post",
header: { 'Accept': 'application/vnd.yunshui.v2.4.1+json', 'content-type': 'application/json' },
}
const mergeModel = function (model_1, model_2) {
for (let k in model_2) {
model_1[k] = model_2[k];
}

}
const mergeRequset = function (request) {
let token = wx.getStorageSync("token");
if(token && token.length>0){
requestPayment.parameter.access_token = token;
}

for (let key in request) {
if (key == 'url') {
if (request[key].indexOf("http") == -1) {
requestPayment[key] = baseUrl + request[key];
} else {
requestPayment[key] = request[key];
}
continue;
} else if (key == "header") {
mergeModel(requestPayment[key], request[key]);
continue;
} else if (key == "parameter") {
mergeModel(requestPayment[key], request[key]);
continue;
}
requestPayment[key] = request[key];
}
return requestPayment;

}
const initPara = function () {
requestPayment = {
url: "",
parameter: {},
fuSuccess: function () { },
fuFail: function () { },
complete: function () { },
showToast: true,
method: "post",
header: { 'Accept': 'application/vnd.yunshui.v2.4.1+json', 'content-type': 'application/json' },
};
}

//网络请求
const http = function (request) {
initPara();
wx.hideLoading();
let requestPayment = mergeRequset(request);
if (requestPayment.showToast) {
wx.showLoading({
title: '加载中...',
mask: true
})
}
wx.request({
url: requestPayment.url,
method: requestPayment.method,
data: requestPayment.parameter,
header: requestPayment.header,
success(res) {
if (requestPayment.showToast) {
wx.hideLoading();
}
if (res.statusCode === 404) {
requestPayment.fuFail(res);
return;
}
if(res.statusCode == 200 && res.data.status == 0){
requestPayment.fuFail(res);
return;
}
if (res.statusCode == 200 && res.data.status == 99999) {
wx.removeStorageSync("userInfo");
wx.removeStorageSync("token");
app.globalData.userInfo = null;
app.globalData.