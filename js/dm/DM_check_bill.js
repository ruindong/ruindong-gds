/**
 * Created by Administrator on 2016/11/17.
 */
var DM_check_bill = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Popularize.json?action=GetMyPopWRRecord&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<a href="/user/check_bill_detail.html">\
                            <div class="item">\
                                <p>{{Type}}</p>\
                                <p>{{CreateDate}}</p>\
                                <span>{{Money}}</span>\
                                <mark>{{Status}}</mark>\
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
