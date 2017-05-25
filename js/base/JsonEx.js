/**
 * Json封装
 */
function JsonEx(){
}

// 禁止ajax缓存
$.ajaxSetup({ cache: false });

// 异步获得数据
JsonEx.getDataASync = function(showId, machine, afterSuccess, afterFailed){
    // 获取token
    /*
    var token = getToken();
    if(token != null)
    {
        machine.addParam("req_token", token);
    }
    */

	var url = machine.getUrl();

    // 修正url格式
    url = url.replace(new RegExp("(http://.*?)(//)(.*)"),"$1/$3");
    console.log("Get >> " + url);

    jQuery.ajax({
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        type: 'GET',
        url: url,
        //data: params,
        dataType: "json",
        timeout: 15000,
        success: function(response){
            console.log(response);
            if(afterSuccess)
            {
                afterSuccess(response, showId, machine);
            }
            else
            {
                $toast('无处理对象，请与管理员联系！');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log(textStatus);
                
            if (afterFailed) {
                afterFailed(textStatus);
            }
            else
            {           
                JsonEx.afterFailedDefault(textStatus);
            }
        }
    })
}

// Post
/**
 * 
 * @param {Object} machine 
 * @param {Object} params
 * @param {Object} afterSuccess
 * @param {Object} afterFailed
 */
JsonEx.post = function(machine, params, afterSuccess, afterFailed)
{
    var url = machine.getUrl();

    // 加上token
    /*
    var token = getToken();
    if(token != null)
    {
        params.req_token = token;
    }
    */

    // 修正url格式
    url = url.replace(new RegExp("(http://.*?)(//)(.*)"),"$1/$3");
    console.log("Post >> " + url + parseParms(params));

	
	// 增加了utf-8编码，否则尼玛出现乱码
    jQuery.ajax({
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		type: 'POST',
        url: url,
        data: params,
        dataType: "json",
        timeout: 15000,        
        success: function(json){
                afterSuccess(json, machine);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log(textStatus);
            if (afterFailed) {
                afterFailed(textStatus);
            }
            else
            {           
                JsonEx.afterFailedDefault(textStatus);
            }
        }
    })
}

// 缺省的错误处理
JsonEx.afterFailedDefault = function(err){
    var msg = "未知错误：" + err;
    if (err.indexOf("timeout") >= 0) {
        msg = "网络连接超时";
    }    
    if (err.indexOf("network error") >= 0) {
        msg = "网络未连接";
    }
    else if (err.indexOf("json parse failed") >= 0) {
        msg = "数据解析错误";
    } 
    else if (err.indexOf("file does not exist") >= 0) {
        msg = "文件不存在";
    } 
    else if (err.indexOf("read file failed") >= 0) {
        msg = "文件读取错误";
    }
     
    $toast(msg, 2000);
}

// 解析参数
function parseParms(params)
{
    if(params == null)
    {
        return "";
    }

    var strParms = "?";
    for (items in params){
        strParms += items + "=" + params[items] + "&";
    }

    // 去掉最后一个字符
    return strParms.substr(0, strParms.length - 1);
}
