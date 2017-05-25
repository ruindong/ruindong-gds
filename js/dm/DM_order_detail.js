/**
 * Created by Administrator on 2016/11/4.
 */
var DM_order_detail = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/popularize.json?action=GetPopOrderDetail&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<div class="recommend_item">\
                            <div class="item_pic"><img src="{{ImgUrl}}"></div>\
                            <div class="item_content">\
                                <ul>\
                                    <li><span class="item_title">{{Title}}</span></li>\
                                    <li><span class="item_hos">{{HospitalName}}</span></li>\
                                    <li><span class="item_now_price">佣金：</span><span class="money">￥{{Commission}}</span></li>\
                                    <li><span class="item_now_price">现价：</span><span class="money">￥{{PreferPrice}}</span></li>\
                                </ul>\
                            </div>\
                        </div>\
                        <p class="user-class">下单时间：<span class="card-set">{{AddTime}}</span></p>\
                        <p class="user-class">预约时间：<span class="card-set">{{OrderTime}}</span></p>\
                        <p class="user-class">客户姓名：<span class="card-set">{{UserName}}</span></p>\
                        <p class="user-class">客户电话：<span class="card-set">{{Mobile}}</span></p>';

// set Render
    this.setRender(this._template);

// 数据格式转换
    this.transfer = function(data){
        if(data.ImgUrl.indexOf(",") >= 0 ){
            var imgurl = data.ImgUrl.split(",")[0];
            data.ImgUrl = imgurl;
        }
        data.Title = data.Title.substr(0,14);
        if(data.StateStr == "未消费"){
            $("#order_state").show();
            $("#order").click(function(){
                $(".masking").show();
            });
        }else {
            $("#order").html(data.StateStr);
        }
        if(data.StateStr != "已取消"){
            $("#order_tacking").click(function(){
                window.location.href = '/user/order_tracking.html#'+orderid;
            });
        }else {
            $("#order_tacking").html("订单已无跟踪");
        }
        //if(data.ImgUrl == ""){
        //    data.ImgUrl = "/images/class-pic.jpg"
        //}
        return data;
    };
// 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};