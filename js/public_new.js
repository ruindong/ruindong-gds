/*******************
 * $File:public_new.js
 *$Description: 公用方法
 *$Author: luyd
 *$Time:2016/10/24
 *$Update:
 *$UpdateDate:
 *$UpdateContent:
 *Copyright(c) 2007 - 2016 by dfhon.com All rights reserved
 *******************/
//    星星的计算
function star_calculate(star_num) {
    var star_num = star_num;
    var star = Math.floor(star_num);//向下取整数
    var else_star = Math.ceil(star_num);//向上取整数
    var html_star = "";
    for (var i = 1; i <= 5; i++) {//全黄星
        if (star == else_star) {//分数为整数
            if (i <= star && star != 0) {
                html_star += '<img class="star_num" src="/images/star_yellow.png">';//全黄星
            } else {
                html_star += '<img class="star_num" src="/images/star_gray.png">';//全灰星
            }
        } else {//分数为小数
            if (i <= star && star != 0) {
                html_star += '<img class="star_num" src="/images/star_yellow.png">';//全黄星
            }
            if (i == (star + 1)) {
                html_star += '<img class="star_num" src="/images/star_half.png">';//加一颗半黄星
            }
            if (i > else_star) {
                html_star += '<img class="star_num" src="/images/star_gray.png">';//全灰星
            }
        }
    }
    return html_star;
}
//获取医院或者医生的案例的dom操作
//获取医院/医生案例
function hosp_or_doc_anli(dom,userId,hospital_id,doctorId,pageSize,fromId) {//插入的dom位置，医院的userid，医院的hostpitalid,医生的doctorid,每页显示条数pagesize,formid
    $.ajax({
        type: "post",
        url: "http://api.dfhon.cn/v3/Post.json?action=GetMyPostByUserId&app_sdk=gds&app_version=1.0.0&app_terminal=pc&userId=" + userId + "&hospitalId=" + hospital_id + "&doctorId=" + doctorId + "&pageSize=" + pageSize + "&fromId=" + fromId + "&direction=1",
        dataType: 'json',
        success: function (result) {
            console.log(this.url);
            console.log(result)
            var anli_comtent = "";
            var anli_num = '<a href="public_jump.html#hospital_anli='+userId+'&'+hospital_id+'">' +
                            '<p class="doc-item">'+
                            '<img class="icon" src="/images/list.jpg">已完成案例'+
                            '<span class="total-peo">'+result.RecordCount+
                            '<img class="arrow_right" src="/images/arrow_right.png">'+
                            '</span>'+
                            '</p></a>';
            for(var i = 0;i <result.Data.length;i++ ){
                anli_comtent += '<div class="over-exam-item">'+
                                img_show(result.Data[i].ImgUrl)+
                                '<p class="item-txt">'+ result.Data[i].DetailContent.substring(0,45)+'</p>'+
                                '<div class="item-mark">'+
                                '<img class="icon tag" src="/images/tag.jpg">'+
                                '<span>'+lable_name(result.Data[i].Lables)+'</span>'+
                                '</div>'+
                                '</div>';
            }
            $("#"+dom).html(anli_num+anli_comtent);
        },
        error: function () {
            alert("error");
        }
    });
}
//多个图片链接的字符串通过","切分方法
function img_show(img_url){
    var img_html = '<div class="imgbox">';
    if(img_url == ""){
        return "";
    }
    var img = img_url.split(",",3);
    for (var i = 0;i < img.length; i++){
        img_html += '<div class="item-img" style="background-image: url('+img[i]+')"></div>';
        //img_html += '<img class="item-img" src="'+ img[i]+'">'
        //width: 2.2rem;height: 2.2rem;float: left;background-position: center;background-size: cover;
    }
    return img_html+'</div>';
}
//LableName标签
function lable_name(lable){
    var lable_name ="";
    for(var i = 0;i < lable.length ;i++){
        lable_name +=  lable[i].LableName+' ';
    }
    return lable_name
}
//是否有认证 有的话加一颗钻石标记
function level(level){
    level = parseInt(level);
    if( level >= 3) {
        var html = '<img id="doc-level" width="0.3rem" class="icon" src="/images/v.jpg">'
    }else {
        html = "";
    }
    return html;
}
//医院等级
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
//聚优惠列表项点击后跳转商品详情页
function list_item_click(){
    $(".recommend_item").click(function(){
        var item_id = $(this).attr("item-id");
        console.log("当前点击id："+item_id);
        window.location.href = '../../index/mall/mall_goods_detail.html#item_id='+item_id;
    });
}
//商城列表项点击后跳转商品详情页
function list_item_click(){
    $(".recommend_item").click(function(){
        var item_id = $(this).attr("item-id");
        console.log("当前点击id："+item_id);
        window.location.href = '../../index/mall/mall_goods_detail.html#item_id='+item_id;
    });
}