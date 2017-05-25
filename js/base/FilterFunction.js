
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
	aop.before("popOrder");
})  