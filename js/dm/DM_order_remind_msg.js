/**
 * Created by Administrator on 2016/11/21.
 */
var DM_order_remind_msg= function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Message.json?action=GetPushMessageList&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<a href="/user/order_detail.html#{{LinkUrl}}">\
                            <div class="order-remind_msg">\
                                <p>{{Msg_Content}}</p>\
                                <p class="time-right">{{AddTime}}</p>\
                            </div>\
                        </a>';

// set Render
    this.setRender(this._template);

// 数据格式转换
    this.transfer = function(data){
        return data;
    };
// 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};

