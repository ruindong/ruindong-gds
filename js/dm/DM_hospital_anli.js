/**
 * Created by Administrator on 2016/11/4.
 */
var DM_hospital_anli = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Post.json?action=GetMyPostByUserId&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<div class="over-exam">\
                            {{if ImgUrl != "" && ImgUrl.length>0}}\
                            <div class="imgbox">\
                                {{each ImgUrl as img i }}\
                                    <div class="item-img" style="background-image: url({{img}})"></div>\
                                {{/each}}\
                            </div>\
                            {{/if}}\
                            <p class="item-txt">{{DetailContent}}...</p>\
                            <div class="item-mark">\
                                <img class="icon tag" src="/images/tag.jpg">\
                                <span>\
                                {{Lables}}\
                                </span>\
                            </div>\
                        </div>';

    // set Render
    this.setRender(this._template);

    // 数据格式转换
    this.transfer = function(data){
        var ImgUrl = data.ImgUrl;
        var lables = "";
        data.ImgUrl = img_show(ImgUrl);
        data.DetailContent = data.DetailContent.substring(0,43);
        for (var i = 0 ; i < data.Lables.length; i++){
            lables += data.Lables[i].LableName+' ';
        }
        data.Lables = lables;
        return data;
    };
    // 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
    function img_show(img_url){
        var img = img_url.split(",",3);
        var aryImgSrc = new Array();
        for (var i = 0; i < img.length; i++) {
            aryImgSrc[i] = img[i];
        }
        return aryImgSrc;
    }
};
/*
{{if Lables && Lables.length>0}}\
{{each Lables as LableName i }}\
{{lable_name}}\
{{/each}}\
{{/if}}\*/
