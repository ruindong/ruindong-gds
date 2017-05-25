/**
 * Created by Administrator on 2016/11/18.
 */
var DM_order_mingxi= function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Popularize.json?action=GetOrderDetailList&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<div class="item">\
                            <p>{{Title}}</p>\
                            <p>{{AddTime}}</p>\
                            <span>￥{{DealMoney}}</span>\
                            <mark>{{StateStr}}</mark>\
                        </div>';

// set Render
    this.setRender(this._template);

// 数据格式转换
    this.transfer = function(data){
        var Title = data.Title;
        data.Title = Title.replace("【","").replace("】",",");
        return data;
    };
// 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};
