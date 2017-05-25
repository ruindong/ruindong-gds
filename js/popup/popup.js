/**
 * 弹窗
 */
function Popup(){
}

// 确认窗口
Popup.confirm = function(e, content, cbOK)
{
    try
    {
        e = e || window.event;
        e.preventDefault();
    }
    catch(err)
    {
    }

    var html = '\
      <div class="cd-popup" role="alert">\
          <div class="cd-popup-container">\
              <p>{CONTENT}</p>\
              <ul class="cd-buttons">\
                  <li><span class="cd-popup-ok">确定</span></li>\
                  <li><span class="cd-popup-cancel">取消</span></li>\
              </ul>\
              <span class="cd-popup-close img-replace">Close</span>\
          </div>\
      </div>\
      ';

    html = html.replace("{CONTENT}", content);
    $("body").append(html);  
    $('.cd-popup').addClass('is-visible');

    //close popup
    $('.cd-popup').on('click', function(event){
        if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') || $(event.target).is('.cd-popup-cancel')) {
            event.preventDefault();
            //$(this).removeClass('is-visible');
            $('.cd-popup').remove();
        }
        else if($(event.target).is('.cd-popup-ok'))
        {
            event.preventDefault();            
            //$(this).removeClass('is-visible');
            $('.cd-popup').remove();            
            cbOK();
        }
    });

    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            //$('.cd-popup').removeClass('is-visible');
            $('.cd-popup').remove();            
        }
    });      
}