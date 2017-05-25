/**
 * Created by Administrator on 2016/11/16.
 */
var DM_order = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Popularize.json?action=GetOrderDetailList';
    this._template = '<p class="user-class">{{HospitalName}}\
                            <span class="card-set">{{StateStr}}</span>\
                        </p>\
                        <a href="/user/order_detail.html#{{Id}}">\
                            <div class="recommend_item" style="border-bottom: 0px;border-top: 1px solid#ebebeb">\
                                <div class="item_pic">\
                                    <img src="{{ImgUrl}}">\
                                </div>\
                                <div class="item_content">\
                                    <ul>\
                                        <li><span class="item_title">{{Title}}</span></li>\
                                        <li><span class="item_now_price">用户姓名：</span><span class="money">{{UserName}}</span></li>\
                                        <li><span class="item_now_price">联系方式：</span><span class="money">{{Mobile}}</span></li>\
                                        <li><span class="item_now_price">佣金：</span><span class="money">￥{{Commission}}</span></li>\
                                    </ul>\
                                </div>\
                            </div>\
                        </a>';

// set Render
    this.setRender(this._template);

// 数据格式转换
    this.transfer = function(data){
        if(data.ImgUrl.indexOf(",") >= 0 ){
            var imgurl = data.ImgUrl.split(",")[0];
            data.ImgUrl = imgurl;
        }
        return data;
    };
// 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};
