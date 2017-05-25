 // 手机号码相关操作
 // <span id="send_btn" onclick="sendCode();">获取验证码</span>
 // 需引入：Post_retrieve
 var idSendButton;

     // 获取验证码
    function sendCode(mobile, id){
        if(!validatePhoneNum(mobile))
        {
            $toast("请输入正确的手机号码！");            
            return;
        }

        idSendButton = id;
        var msgPost = new Post_retrieve();
        
        var params = {
            "mobile":mobile
        };
        
        // 禁止重入
        setAllowSend(false); 

        DataCenter.post(msgPost, params, cbSendCode);
    }
    // 获取验证码回调函数
    function cbSendCode(result, machine)
    {
        if (result) {
            if (result.code == 0){
                $toast("验证码已成功发送到您的手机！");
            }
            else {
                $toast(result.message);
            }
        }
    }
    
    // 发送时间间隔
    var time = 60;
    var isSending = false;
    function timer() {
        if (time >= 0) {
            $("#" + idSendButton).html("已发送(" + time + ")");
            time--;
            setTimeout("timer()", 1000);
        } else {
            $("#" + idSendButton).html("获取验证码");
            time = 60;
            setAllowSend(true);
        }
    }

    // 发送禁止
    function setAllowSend(isAllow)
    {
        if(isAllow)
        {
            isSending = false;
            $("#" + idSendButton).removeClass("c-gray");          
        }
        else
        {
            isSending = true;
            timer();
            $("#" + idSendButton).addClass("c-gray");   
        }
    }