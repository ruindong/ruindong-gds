/**
 * Created by Administrator on 2016/11/4.
 */
var DM_juyouhui = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Hospital.json?action=GetHospitalProductList&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<a href="/goods/goods_detail.html#item-id={{ID}}">\
                        <div class="recommend_item"> \
                            <div class="item_pic"> \
                                <img src="{{ImgUrl}}"> \
                            </div> \
                            <div class="item_content">\
                                <ul> \
                                    <li><span class="item_title">{{Title}}</span></li> \
                                    <li><span class="item_hos">{{HospitalName}}</span></li> \
                                    <li><span class="item_now_price">现价：</span></span><span class="money">￥{{PreferPrice}}</span></li>\
                                    <li><span class="item_now_price">佣金：</span><span class="money">￥{{Commission}}</span></li> \
                                </ul>\
                            </div> \
                        </div></a>';

// set Render
    this.setRender(this._template);

// 数据格式转换
    this.transfer = function(data){
        var ImgUrl = data.ImgUrl.split(",")[0];
        var Title = data.Title.substr(0,16);
        data.Title = Title;
        data.ImgUrl = ImgUrl;
        return data;
    };
// 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};