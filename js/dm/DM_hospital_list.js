/**
 * Created by Administrator on 2016/11/3.
 * 医院列表
 */
var DM_hospital_list = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Hospital.json?action=FindHospital&creditLevel=1&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<a href="/hospital/hospital_index.html#{{HospitalId}}">\
                            <div class="recommend_item">\
                            <div class="item_pic"><img src="{{HospitalPicture}}"></div>\
                            <div class="item_content">\
                                <ul>\
                                    <li><span class="item_title">{{HospitalName}}</span></li>\
                                    <li>\
                                       <span class="item_hos">\
                                            {{if ImgScores && ImgScores.length>0}}\
                                                {{each ImgScores as img i }}\
                                                    <img class="star_num" src="{{img}}">\
                                                {{/each}}\
                                            {{/if}}\
                                       </span></li>\
                                    <li><span class="item_hos">{{CreditLevel}}</span></li>\
                                    <li><span class="item_hos">{{Address}}</span></li>\
                                </ul>\
                            </div>\
                            </div>\
                        </a>';
    // set Render
    this.setRender(this._template);

    // 数据格式转换
    this.transfer = function(data){
        var Level = parseInt(data.CreditLevel);//医院等级
        var star = data.CommentScore;
        var Address = data.Address.substr(0,15)+"...";
        data.Address = Address;
        data.CreditLevel = CreditLevel(Level);
        data.ImgScores = star_calculate(star);
        return data;
    };

    // 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};
function CreditLevel(Level){
    var Level = parseInt(Level);
    var name = "";
    switch (Level)
    {
        case 0: name = "普通医院";break;
        case 1: name = "私立医院";break;
        case 2: name = "公立医院";break;
        case 3: name = "认证私立医院";break;
        case 4: name = "认证公立医院";break;
        case 5: name = "认证合作私立医院";break;
        case 6: name = "认证合作公立医院";break;
        case 7: name = "认证合作核心医院";break;
    }
    return name;
}
//    星星的计算
function star_calculate(star_num) {
    var star_num = star_num;
    var aryImgSrc = new Array();

    for (var i = 0; i < 5; i++) {

        if(star_num >= (i+1)){
            aryImgSrc[i] = "images/star_yellow.png";
        }
        else if(star_num >= i && star_num < (i+1)){
            aryImgSrc[i] = "images/star_half.png";
        }
        else{
            aryImgSrc[i] = "images/star_gray.png";
        }
    }
    return aryImgSrc;
}