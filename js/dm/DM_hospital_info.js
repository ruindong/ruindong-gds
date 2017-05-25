/**
 * Created by Administrator on 2016/11/4.
 */
var DM_hospital_info = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Hospital.json?action=GetHospitalInfo&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<div id="header">\
                            <img src="{{HospitalPicture}}">\
                            <p class="p1">\
                                <span>{{HospitalName}}</span>\
                                <img id="credit-level" width="0.3rem" class="icon" src="/images/v.jpg">\
                            </p>\
                            <p class="ccc">\
                                <span>{{HospitalTitle}}</span>\
                            </p>\
                        </div>\
                        <div class="bg_f4f4f4"></div>\
                            <a id="total_comment" href="">\
                                <div class="detail_read_more" id="have-star">\
                                    {{if ImgScores && ImgScores.length>0}}\
                                        {{each ImgScores as img i }}\
                                            <img class="star_num" src="{{img}}">\
                                        {{/each}}\
                                    {{/if}}\
                                    <img class="arrow_right" src="/images/arrow_right.png">\
                                    <span class="comment-num">共{{CommentCount}}人评论&nbsp;&nbsp;</span>\
                                </div>\
                            </a>\
                            <div class="hospitalSite">\
                                <p class="list" id="hosp-intro">医院介绍，资质认证\
                                    <img class="arrow_right" src="/images/arrow_right.png">\
                                </p>\
                                <p class="list">门诊时间：{{OperatingTime}}</p>\
                            <div class="hosptital_address">\
                                <img src="/images/area.png">\
                                <p>{{Address}}</p>\
                                <a href="tel:{{Phone}}"><img src="/images/telephone.png"></a>\
                            </div>\
                        </div>\
                        <div class="hospital_masking">\
                            <div class="hospital-intro">医院信息</div>\
                            <div class="hospital-certif"><span class="col">资质认证：</span>{{CreditLevel}}</div>\
                            <div class="business-hours"><span class="col">营业时间：</span>{{OperatingTime}}</div>\
                            <div class="bg_f4f4f4"></div>\
                            <div id="hospital-content">{{Description}}</div>\
                        </div> ';

    // set Render
    this.setRender(this._template);

    // 数据格式转换
    this.transfer = function(data){
        var Level = parseInt(data.CreditLevel);//医院等级
        var star = data.CommentScore;
        data.ImgScores = star_calculate(star);
        return data;
    };
    // 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};
//    星星的计算
function star_calculate(star_num) {
    var star_num = star_num;
    var aryImgSrc = new Array();

    for (var i = 0; i < 5; i++) {

        if(star_num >= (i+1)){
            aryImgSrc[i] = "/images/star_yellow.png";
        }
        else if(star_num >= i && star_num < (i+1)){
            aryImgSrc[i] = "/images/star_half.png";
        }
        else{
            aryImgSrc[i] = "/images/star_gray.png";
        }
    }
    return aryImgSrc;
}