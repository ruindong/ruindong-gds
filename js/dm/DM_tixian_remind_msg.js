/**
 * Created by Administrator on 2016/11/21.
 */
var DM_tixian_msg = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Message.json?action=GetPushMessageList&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<div class="order-remind_msg">\
                            <p>{{Msg_Content}}</p>\
                            <p class="time-right">{{AddTime}}</p>\
                        </div>';

// set Render<span>  查看原因</span>
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
