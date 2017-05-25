/**登录过滤器*/
/*
$(document).ready = signInFilter();

function signInFilter()
{
	// 页面过滤
	var pages = [
	  '/my/',
	  '/address/'
	];

	// 当前页面
	var backUrl = window.location.href;
	var strUrl = backUrl;

	// 去掉http://xxx.com开头
	var pstr = ".*://.*?(/.*)";
	var patt1 = new RegExp(pstr);
	var ary = patt1.exec(strUrl);
    if(ary && ary.length == 2)
    {
    	strUrl = ary[1];
    }

	var bRet = false;
	if(pages && pages.length > 0)
	{
		for(var i = 0; i < pages.length; i++)
		{
			if(strUrl.indexOf(pages[i]) == 0)
			{
				bRet = true;
				break;
			}
		}
	}

    // 符合过滤条件
	if(bRet)
	{
		// 如果未登录，此方法会自动登录
		getUserId();
	}
}
*/


var aop = {  
	before: function(name)
	{
		var thisObj = this;
		var orign = eval(name);  
		var func = function () {
			// 是否登录
			if(!isSignIn())
			{
				var backUrl = window.location.href;
				saveBackUrl(backUrl);

				// 如果未登录，此方法会自动登录
		        getUserId();
			}		
			else
			{
				if(orign)
				{
				    return orign.apply(this, arguments);					
				}
			}
		}  
		eval(name + " = func;");
	}  
};


// 添加过滤函数名
$(function () {  
	aop.before("window.onload");
	aop.before("$(window).load");
})  