/**
 * Created by Administrator on 2016/11/21.
 */
var DM_message_list= function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Message.json?action=GetMessageTypeList&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<a href="/user/message_type.html#{{ID}}">\
                            <div class="messages">\
                                <img src="{{ImgUrl}}">\
                                <p class="title">{{TypeName}}</p>\
                                <p>{{LastPushTitle}}</p>\
                                {{if NewTipsCount > 0}}\
                                    <div class ="msg-mark">{{NewTipsCount}}</div>\
                                {{/if}}\
                            </div>\
                        </a>';

// set Render
    this.setRender(this._template);

// 数据格式转换
    this.transfer = function(data){
        var NewTipsCount = parseInt(data.NewTipsCount);
        data.NewTipsCount = NewTipsCount;
        return data;
    };
// 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};
