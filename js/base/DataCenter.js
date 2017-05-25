/**
 * 数据处理中心
 */
function DataCenter(){
}

// 获取数据，并自动解析后显示
DataCenter.getDataAnsyc = function(showId, machine, afterSuccess, afterFailed){
	// 异步获取数据
	if(afterSuccess)
	{
		// 有时候需要设置回调函数处理，比如需要取到返回的数据
		JsonEx.getDataASync(showId, machine, afterSuccess, afterFailed);
	}
	else
	{
		// 参数未设置，则用缺省方法处理
        JsonEx.getDataASync(showId, machine, DataCenter.afterSuccess, afterFailed);		
	}
}

// Post数据，并自动解析后显示
DataCenter.post = function(machine, params, callBack){
	JsonEx.post(machine, params, callBack);
}

// 成功获取数据，回调方法
DataCenter.afterSuccess = function(response, showId, machine)
{
    if(response)
	{
		var data = response.Data;
		if(response.Success)
		{
			// 如果data是数组
			if (data instanceof Array) {
				DataCenter.showDataList(machine, showId, data, machine.transfer);
			}
			else {
				DataCenter.showData(machine, showId, data, machine.transfer);
			}
		}
		else {
			$toast(response.Msg);
		}
	}
}

// 显示数据列表
DataCenter.showDataList = function(machine, showId, datalist, transfer){
    var html = this.getHTML_DataList(machine, datalist, transfer);
    $$(showId).innerHTML = html;
}

// 获取数据HTML
DataCenter.getHTML_DataList = function(machine, datalist, transfer){	
    var render = machine.getRender();
	var colnum = machine.colnum; 
	
	var innerHtml = "";
	
	if (datalist && datalist.length > 0) {
		for(var i = 0; i < datalist.length; i++)
		{
		   var html = "";
			
            var data = datalist[i];
            
            if (transfer) {
                data = transfer(data);
            }
            
            html = render(data);
			
			// 分列显示
            if (colnum && colnum > 1) {
                if (i % colnum == 0) {
                    // 如果不是第一条数据
                    if (i > 0) {
                        innerHtml = innerHtml.concat('</div>');
                    }
                    
					// 如果不是最后一条数据
					if(i < datalist.length - 1)
					{
                        innerHtml = innerHtml.concat('<div class="ub umar-t">');
					}
					
					// 加入内容
                    innerHtml = innerHtml.concat(html);
                }
				else
				{
					// 加入内容
                    innerHtml = innerHtml.concat(html);
					
					// 如果是最后一条数据
					if(i == datalist.length - 1)
					{
						// 增加一条div凑数
                        innerHtml = innerHtml.concat('<div class="ub-f1"></div>');
						
						// 关闭						
                        innerHtml = innerHtml.concat('</div>');						
					}
				}
            }
			else
			{
                innerHtml = innerHtml.concat(html);
			}			
		}	
	}

	return innerHtml;
}

// 显示一条记录
DataCenter.showData = function(machine, showId, data, transfer){
	var html = this.getHTML_Data(machine, data, transfer);

    $$(showId).innerHTML = html;	
}

DataCenter.getHTML_Data = function(machine, data, transfer){	
    var render = machine.getRender();
	
    var innerHtml = "";
    
    if (data) {
        var html = "";
        
        try {
            if (transfer) {
                data = transfer(data);
            }
            
            html = render(data);
        } 
        catch (e) {
			html = "发生以下错误，请向管理员报告<br/>" + e.message;
        }
		
        innerHtml = innerHtml.concat(html);
    }

    return innerHtml;
}