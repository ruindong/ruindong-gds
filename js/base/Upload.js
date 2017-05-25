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
	var url = 'http://api.dfhon.cn/V3/UploadFile.json?action=UploadFile&isWater=false';//图片存放路径
	var xhr = new XMLHttpRequest();
	var fd = new FormData();
	xhr.open("POST", url, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) 
		{
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

	fd.append("upload_file", file);
	xhr.send(fd);
}

// 上传多图
// @file - 图片数组
Upload.uploadFileMultiple = function(files, cbSuccess, cbFailed)
{
	if(!files || files.length == 0)
	{
		$toast("图片列表为空！")
		return;
	}

    var url = 'http://api.dfhon.cn/V3/UploadFile.json?action=UploadFileMultiple&isWater=false';//图片存放路径
    var xhr = new XMLHttpRequest();
    var fd = new FormData();//新建一个空对象
    xhr.open("POST", url, true);	

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) 
		{
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

	for(var i = 0; i < files.length; i++)
	{
		var file = files[i];
		fd.append("upload_file", file);
	}

	xhr.send(fd);
}


