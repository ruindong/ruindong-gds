
// 测试环境
var url_weixin_signin = "http://api2.yymgo.cn/wechat/code";
var url_host = "http://api2.yymgo.cn/";

var ua = navigator.userAgent;
var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isWeixin = ua.toLowerCase().match(/MicroMessenger/i)=="micromessenger"; // 是否微信

// 尺寸设置
window.scale=document.documentElement.clientWidth/7.5;
document.getElementsByTagName("html")[0].style.fontSize=window.scale + "px";
if( window.scale*3.75 > 1200){ document.getElementsByTagName("html")[0].style.fontSize=window.scale/4 + "px";}


//---------------------------------------------------
function $$(id) {
    return !id ? null : document.getElementById(id);
}

function $toast(s,t){
	if(s == null)
	{
		return;
	}
	if(t == null || t < 2500)
	{
		t = 2500;
	}

	var html = 
	'<div id="DFH_toast" class="needFadeIn ub ub-fh ub-pc" style="left:0;bottom:1rem;position:absolute;z-index:50;width:3.75rem">'+
	'  <div style="background:#43C6DB;padding:0.1rem 0.3rem;margin:0.1rem;border-radius:.08rem;font-size:0.12rem;color:#fff;text-align:center;line-height:146%;">'+ s + '</div>'+
	'</div>';	

    $("body").append(html);    
    setTimeout(function(){
        $("#DFH_toast").remove();
    },t);
}
// 带遮罩的，仅用于登录判断
function $toastMask(s,t){
	if(s == null)
	{
		return;
	}
	if(t == null || t < 2500)
	{
		t = 2500;
	}

	var html=
	' <div id="mask" class="mask" style="display: none;"></div> '+
	' <div id="DFH_toast_MASK" class="needFadeIn"> '+
	'     <div class="uinn ub bd-b ub-ac">'+
	'        <div class="ub-img img-cover" style="background-image:url(/images/tips2.gif)"></div>'+
	'        <div class="ub-f1 umar-l">{Title}</div>'+
	'     </div>'+
	'     <div class="uinn c-center c-gray f-small">即将自动前往...</div>'+
	' </div>';

	html = html.replace('{Title}', s);
	$("body").append(html);
	$("#mask").addClass("mask").fadeIn("slow");
	$("#DFH_toast_MASK").show();

    setTimeout(function(){
        $("#mask").hide();    	
        $("#DFH_toast_MASK").hide();
    },t);      
}

// 获取页面请求参数
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return decodeURI(r[2]); return null; 
}

// 打开窗口
function openWindow(url)
{
    location.href = encodeURI(encodeURI(url));	
}

// 存储变量，有封装提示
function setItem(storage, key, value)
{
	if(storage == null)
	{
		return false;
	}

    try
    {
    	storage.setItem(key, value);
    	return true;
    }
    catch(err)
    {
    	openWindow("/err/no_cache.html");
    }

    return false;
}

// 手机号码校验
function validatePhoneNum(PhoneNum) {
    var reg = /^((13)|(14)|(15)|(17)|(18))\d{9}$/;
    return reg.test(PhoneNum);
}

// 返回上一页：上一页必须事先调用historyRefresh，否则可能会出错
function goBack()
{
	history.back();	

	var browser = userBrowser();
	
	// referrer来源页面，必须重新加载才会刷新的情况
	if((browser == "QQ") && (window.history && history.pushState))
	{
		var url = document.referrer;  // 简单处理
		if(!url)
		{
			url = "/index.html";
		}

		//location.replace(url);
        var stateObj = { from: "history" }; 
        history.replaceState(stateObj, "", url); 
		history.back();   		
	}
	// 返回后，页面会自动刷新的情况
	else
	{
        history.back();		
	}
}

// 浏览器识别
function userBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

    if (userAgent.indexOf("Opera") > -1) {
        return "Opera"
    } //Opera浏览器
    else if ((userAgent.indexOf("QQBrowser") > -1) || (userAgent.indexOf("TencentTraveler") > -1)) {
        return "QQ";
    }//腾讯或QQ浏览器
    else if (userAgent.indexOf("MicroMessenger") > -1) {
        return "WX";
    } //微信内置浏览器      
    else if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //Firefox浏览器
    else if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
    }
    else if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //Safari浏览器
    else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }//IE浏览器
    else{
        return "Unknow";	
    }
}

// 阻止冒泡
function stopPropagationEx()
{
	var event = getEvent();
	if(event == null)
	{
		return;
	}

	if(event.stopPropagation)
	{
		event.stopPropagation();
	}
	else
	{
		event.cancelBubble = true;
	}
}
// 获得event，兼容ie和ff
function getEvent() 
{  
	try
	{
	    if(document.all)  return window.event;    
	    func=getEvent.caller;

	    while(func!=null)
	    {
	        var arg0=func.arguments[0]; 
	        if(arg0) 
	        { 
	          if((arg0.constructor==Event || arg0.constructor ==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
	          {
	            return arg0; 
	          } 
	        } 
	        func=func.caller; 
	    } 		
	}
	catch(err)
	{
	}

    return null; 
}

//cookies设置
function cookies_op() {
	has_cookie = true;
	try{
		test_cookie = document.cookie;
	}
	catch (e){
		has_cookie = false;
	}
	this.get = function (key) {
		if(has_cookie){
			var cookie = document.cookie;
			var cookieArray = cookie.split('; ');
			var val = "";
			for (var i = 0; i < cookieArray.length; i++) {
				var arr = cookieArray[i].split("=");
				if (arr[0] == key) {
					val = arr[1];
					break;
				}
			}
		}else{
			val=cookie_array.key;
		}
		return val;
	};
	this.set = function (key, value, time) {
		if(has_cookie){
			if (!arguments[2]) {
				time = 1800;
			}
			var date = new Date();
			if (parseInt(time) != NaN) {
				date.setTime(date.getTime() + time * 1000);
				last_date = date.toString();
			} else {
				last_date = null;
			}
			var cookie = "";
			cookie += key + "=" + value + ";";
			if (last_date != null) {
				cookie += "expires=" + last_date + ";";
			}
			cookie += "path=/;";
			document.cookie = cookie;
		}else{
			cookie_array.key = value;
		}
	};
	this.remove = function (key) {
		if(has_cookie){
			var date = new Date();
			date.setFullYear(date.getFullYear() - 1);
			var cookie = "" + key + "=;expires=" + date + ";path=/;"
			document.cookie = cookie;
		}else{
			delete cookie_array.key;
		}
	}
}
//公用遮罩显示方法
function show_public_mask(title,content){//标题，内容
	var body = $("body");
	var mask = $(".public-mask");
	var box = $(".box");
	var mask_html = "<div class='public-mask'>" +
						"<div class='box'>"+
							"<p class='box-title'>"+title+"</p>"+
							"<p>"+content+"</p>"+
							"<div class='box-button' id='box-button'>知道了</div>"+
						"</div>"+
					"</div>";
	var box_html = "<div class='box'>"+
					"<p class='box-title'>"+title+"</p>"+
					"<p>"+content+"</p>"+
					"<div class='box-button'>知道了</div>"+
				"</div>";
	if(mask.length>0){
		mask.append(box_html);
	}else {
		body.append(mask_html);
	}
	$(".box-button").click(function(){
		console.log($(".box").length);
		if($(".box").length > 1){
			$(this).parent(".box").remove();
		}else {
			$(".public-mask").remove();
		}
	});
}

function nickName(openid){
	$.ajax({
		type: "post",
		url:"http://api.dfhon.cn/v3/User.json?action=FXLogin&state=WeiXin&openId="+openid,
		dataType:'json',
		success:function(result){
			nickname = result.Data[0].nickName;
		}
	});
}