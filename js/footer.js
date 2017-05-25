/**
 * Created by Administrator on 2016/11/4.
 * 底部公用样式
 */
$(function(){
    // 东方虹APP内嵌，不执行该方法
    var html=
        "<div class='index-foot' id='index-foot'>"
        +"  <ul>"
        +"    <a href='/index.html'><li><img id='index' src='/images/index_false.png'></li></a>"
        +"    <a href='/order.html'><li><img id='order' src='/images/order_false.png'></li></a>"
        +"    <a href='/kefu.html'><li> <img id='kefu' src='/images/kefu_false.png'></li></a>"
        +"    <a href='/user.html'><li> <img id='user' src='/images/user_false.png'></li></a>"
        +"  </ul>"
        +"</div>";

    $("footer").html(html);
    var curPage = window.location.pathname;
    var page = curPage.split("/")[1].split(".")[0];
    console.log(page);
    if(page == ""){
        page = "index";
    }
    $("#index-foot img").each(function(){
       if($(this).attr("id") == page ){
           $(this).attr("src","/images/"+page+"_true.png");
           $(this).siblings().attr("src","/images/"+page+"_false.png");
       }
    });
});

//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfb60bf259f3eba01&redirect_uri=http%3a%2f%2fgds.dfhon.cn%2fuser.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect