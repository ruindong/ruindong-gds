/**
 * Created by Administrator on 2016/11/4.
 */
var DM_comments_list = function(){
    MessageMachine.call(this);
    console.log("111")
    //url
    this.url ='http://api.dfhon.cn/v3/Hospital.json?action=GetHospitalCommentList&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<div class="discuss_item">\
                            <div class="discuss_item_header">\
                                <img class="user_photo" src="{{UserFace}}">\
                                <div class="user_name"><span>{{UserName}}</span><span>{{CreateOn}}</span></div>\
                                <div class="discuss_star">\
                                    {{if ImgScores && ImgScores.length>0}}\
                                        {{each ImgScores as img i }}\
                                            <img class="star_num" src="{{img}}">\
                                        {{/each}}\
                                    {{/if}}\
                                </div>\
                            </div>\
                            <p>{{CommentContent}}</p>\
                        </div>';

// set Render
    this.setRender(this._template);

// 数据格式转换
    this.transfer = function(data){
        console.log(data)
        var star = data.CommentScore;
        data.ImgScores = star_calculate(star);//星星数量
        return data;
    };
// 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    };
    //    星星的计算
    function star_calculate(star_num) {
        var aryImgSrc = new Array();
        var star_num = star_num;

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
};
