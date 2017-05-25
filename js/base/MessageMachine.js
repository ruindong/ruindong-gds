/**
 * 数据处理机基类，每一个数据接口的处理子类都继承自它
 */ 
var MessageMachine = function(){
	this.url = "";
	this.render = "";
	this.colnum = 1;
	this.params = {};
	// Url	
	this.getUrl = function(){
		var strParms = "";
		var params = this.params;
	    if(params != null)
	    {
		    for (items in params){
		        strParms += items + "=" + params[items] + "&";
		    }

	        // 去掉最后一个字符
	        strParms = strParms.substr(0, strParms.length - 1);
	    }

	    var url = this.url;

	    if(strParms != "")
	    {
	    	if(url.indexOf("?") >= 0)
	    	{
	    		url += "&" + strParms;
	    	}
	    	else
	    	{
	    		url += "?" + strParms;
	    	}
	    }

		return url;
	}
	this.setUrl = function(url){
		this.url = url;
	}

	// params
	this.getParams = function(){
		return this.params;
	}
	this.setParams = function(params)
	{
		this.params = params;
	}
	this.addParam = function(name, value)
	{
		this.params[name] = value;
	}
	
	// Render
	this.getRender = function(){
		return this.render;
	}
	this.setRender = function(str){
		this.render = template.compile(str);
	}
	
	// Colnum；分列显示需要用到，极少使用
	this.setColNum = function(colnum){
		this.colnum = colnum;
	}
	this.getColNum = function(){
		return this.colnum;
	}
	
	// 格式转换
	this.transfer = function(data){
		return data;
	}
	
	// 测试数据
	this.getTestData = function(){
		return "";
	}
}