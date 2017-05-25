// Post通用消息，不需要数据展示的情况，一般交由主调函数自己处理返回值
var MessagePostWithoutRsp = function (){
	MessageMachine.call(this);
	
	// 数据格式转换
	this.transfer = function(data){
		return data;
	}
	
	// 测试数据
	this.getTestData = function(){
		var response = '{} ';
		
		return JSON.parse(response);
	}
}
