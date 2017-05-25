/**
 * Created by Administrator on 2016/11/17.
 */
var DM_month_earnings = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/popularize.json?action=GetCommissionList&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<div class="item">\
                            <p>{{Title}}</p>\
                            <p>{{DealTime}}</p>\
                            <span>￥{{Commission}}</span>\
                        </div>';

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