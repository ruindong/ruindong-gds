/**
 * 图片上传
 * 依赖：
 */
function Upload(){
}

// 上传单图
// @file - 图片对象；@cbSuccess - 成功回调函数；@cbFailed - 失败回调函数
Upload.uploadFile = function(file, cbSuccess, cbFailed)
{
    var ary = new Array();
    ary.push(file);

    Upload.uploadFileMultiple(ary, cbSuccess, cbFailed);
}

// 上传多图
// @file - 图片数组
Upload.uploadFileMultiple = function(files, cbSuccess, cbFailed)
{
    if(!files || files.length == 0)
    {
        $toast("请先选择图片！")
        return;
    }

    var url = 'http://api.dfhon.cn/v3/UploadFile.json?action=MGUploadFileMultiple&isWater=false';
    var xhr = new XMLHttpRequest();
    var fd = new FormData();//新建一个空对象

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) 
        {
            hideProgress(); // 关闭进度条

            var response =xhr.responseText;
            var resJson =JSON.parse(response);//json转字符串
            if(resJson && resJson.Success)
            {
                var picurls=resJson.Data[0].picurls;//返回图片存放位置的图片地址
                if(picurls)
                {
                    picurls = picurls.replace(new RegExp(/(@!face)/g),"");
                }            
                console.log(picurls);

                // 回调
                cbSuccess(picurls);                
            }
            else
            {
                hideProgress(); // 关闭进度条

                if(cbFailed)
                {
                    cbFailed();
                }
                else
                {
                    $toast("上传失败！");
                }
            }            
        }
    };

/*
// 存在跨域问题
    // 进度
    xhr.upload.onprogress = function(evt) {
        loaded = evt.loaded;
        tot = evt.total;
        per = Math.floor(100 * loaded / tot); //已经上传的百分比
        if(updateProgress instanceof Function){
            console.log(per);
        }
    }; 
*/
    // 进度
    xhr.onprogress = function(evt) {
        loaded = evt.loaded;
        tot = evt.total;
        per = Math.floor(100 * loaded / tot); //已经上传的百分比
        if(updateProgress instanceof Function){
            console.log(per);
        }
    }; 

    // 错误
    xhr.onerror = function(evt){
        hideProgress(); // 关闭进度条

        if(cbFailed)
        {
            cbFailed();
        }
        else
        {
            $toast("上传失败！");
        }    
    };

    // 多图
    for(var i = 0; i < files.length; i++)
    {
        var file = files[i];
        fd.append("upload_file", file);
    }

    xhr.open("POST", url, true);
    showProgress(); // 进度条

    // 延迟300毫秒处理，手机拍照反应不过来
    window.setTimeout(function(){
        xhr.send(fd);
        simulateProgress();  // 模拟进度条
    }, 300);
}


var isPopup = false;
function showProgress()
{
    if(isPopup)
    {
        $("#mask").fadeIn("slow");
        $(".upload").show();
    }
    else
    {
        isPopup = true;

        var html = '\
            <div id="mask" class="mask" style="display: none;"></div>\
            <div class="upload">\
              <div class="progress">\
                <div class="completed"></div>\
              </div>\
              <div class="info">图片上传中：<em id="progress">0</em>%</div>\
            </div>\
          ';

        $("body").append(html);
        $("#mask").fadeIn("slow");
        $(".upload").show();
    }

    // 进度归零
    updateProgress(0);
}

function hideProgress()
{
    stopSimulate(); // 清楚模拟器
    $(".upload").hide();
    $("#mask").fadeOut("slow");
}

function updateProgress(rate)
{
    if(rate == null || rate < 0)
    {
        rate = 0;
    }
    else if(rate > 100)
    {
        rate = 100;
    }

    $(".progress .completed").css("width", rate + "%");
    $("#progress").html(rate);

    if(rate == 100)
    {
        hideProgress();
    }
}

// 模拟进度条，upload.progress问题的替代方案
var loop;
function simulateProgress() 
{
	var percent = 0;
    loop = setInterval(function () {
        updateProgress(++percent);

        if (percent == 98) 
        {
            clearInterval(loop);
        }
    }, 100);
}
function stopSimulate()
{
	clearInterval(loop);
}