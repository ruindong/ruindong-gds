/**
 * Created by Administrator on 2016/11/4.
 */
var DM_banner = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/popularize.json?action=GetFXAds&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<li class="swiper-slide">\
                            <a href="{{LinkUrl}}">\
                                <img  width="100%" src="{{PicUrl}}">\
                            </a>\
                        </li>';

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