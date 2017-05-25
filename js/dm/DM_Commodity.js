// 商品详情
var DM_Commodity = function(){
	MessageMachine.call(this);

	// url
	this.url = url_host + "/trade/";

	// template
    this._template = '\
      <div class="uinn f-big2">测试回调拦截，商品名称<em class="umar-l c-special">{{commodity.name}}</em></div>\
      ';


	// set Render
	this.setRender(this._template);

	
	// 数据格式转换
	this.transfer = function(data){
        return data;
	}
	
	
	// 测试数据
	this.getTestData = function(){
		var response = '{}';

		return JSON.parse(response);
	}
}
