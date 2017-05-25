/**
 * Created by Administrator on 2016/11/4.
 */
var DM_project_keyword_list = function(){
    MessageMachine.call(this);
    //url
    this.url = "http://index.dfhon.cn/Product.ashx?action=search&locationCity=&channel_id=dfhon_zchd1&format=json&jsoncallback=?"
    this._template = '<a href="/goods/goods_detail.html#item-id={{ID}}">\
                            <div class="recommend_item"> \
                                <div class="item_pic"> \
                                    <img src="{{SmallImgUrl}}"> \
                                    </div> \
                                <div class="item_content">\
                                    <ul> \
                                        <li><span class="item_title">{{Title}}</span></li> \
                                        <li><span class="item_hos">{{HospitalName}}</span></li> \
                                        <li><span class="item_now_price">现价：</span></span><span class="money">￥{{PreferPrice}}</span>\
                                        <li><span class="item_now_price">佣金：</span><span class="money">￥{{CommissionPrice}}</span>\
                                        </li> \
                                    </ul>\
                                </div> \
                            </div>\
                            </a>';

// set Render
    this.setRender(this._template);

// 数据格式转换
    this.transfer = function(data){
        /*var ImgUrl = data.ImgUrl.split(",")[0];
        data.ImgUrl = ImgUrl;*/
        return data;
    };
// 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};