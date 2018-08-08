$(function() {
		$.ajax({
		type:"post",
		dataType: 'JSON',
		//url:'../json/word.json',
		url:"http://106.14.3.202:8091/dynamic/ctrl/findAllUserDynamic",
		async:true,
		success:function(data){
			console.log(data.data.listdata);
			for(var i=0;i<data.data.listdata.length;i++){
				console.log(data.data.listdata[i].dynamic.photo.split(','))
			}
			
		},
		error: function error(res) {
				console.log(res);
		}
	});

});

/*const app = getApp();

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
app.globalData.*/