/**
 * Created by Administrator on 2016/11/21.
 */
var DM_order_tracking = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://crm.dfhon.com/Ajax/DisHandler.ashx?action=OrderTrackList';
    this._template = '<div class="order_tacking">\
                            <div class="title">{{CREATEUSERNAME}}</div>\
                            <p>{{TRACK_DETAIL}}</p>\
                            <span>{{CREATEDATE}}</span>\
                        </div>';

// set Render
    this.setRender(this._template);

// 数据格式转换
    this.transfer = function(data){
        //console.log(data);
        return data;
    };
// 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};