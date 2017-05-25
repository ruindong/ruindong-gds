// 首页商品列表
var DM_Index_ShopList = function(){
	MessageMachine.call(this);

	// url
	this.url = url_host + "index/list.json";

	// template
    this._template = '\
        <div class="uinn bc-white bd-b" ontouchstart="dfh_touch()" onclick="openTradeInfo({{tradeNo}})"> \
	      <div class="ub ub-fh">\
	        <div class="ub-img1 img-cover" style="background-image:url({{coverImgUrl}})""></div>\
	        <div class="umar-l ub-f1">\
	          <div class="f-normal comm_name">{{commName}}</div>\
	          <div class="ub bottom_bar">\
	            <div class="ub-f1">\
	              <div class="umar-t progress umar-ts"><div class="ub-f1 completed" style="width:{{progress}}%"></div></div>\
	              <div class="ub ub-fh c-gray number"> \
	                 <div class="ub-f1">总需<span class="zxq_s">{{totalCount}}</span>({{ecoupon}}元/人次)</div>\
	                 <div><span class="umar-l">剩余</span><span class="c-link">{{remainCount}}</span></div> \
	              </div>\
	            </div>\
	            <div class="umar-l buy ub ub-ac ub-pc" ontouchstart="dfh_touch()" onclick="popOrder({{tradeNo}}, \'{{commName}}\', \'{{coverImgUrl}}\', {{ecoupon}}, {{remainCount}});"> \
	              <div class="c-white c-center">抢</div>\
	            </div>\
	          </div>\
	        </div>\
	      </div> \
	    </div>\
	    ';    

	// set Render
	this.setRender(this._template);

	
	// 数据格式转换
	this.transfer = function(data){
		if (data) {
			var progress = 0;
			var remainCount = data.remainCount;
			var totalCount = data.totalCount;

			if(totalCount > 0)
			{
				progress = (totalCount - remainCount) * 100 / totalCount;
			}
			
			data.progress = parseInt(progress);
		}
		
		return data;
	}
	
	
	// 测试数据
	this.getTestData = function(){
		var response = '{}';

		return JSON.parse(response);
	}
}


