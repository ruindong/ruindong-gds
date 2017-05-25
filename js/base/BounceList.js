/**
 *  弹动式数据处理类
 */

var that; // json回调函数会丢失this指针，暂且用这么low的办法处理

function BounceListMgr(mainId)
{
	this.machine;
	this.mainId; // 容器id
	this.showId; // 滚动列表显示的id
	this.iScrollPlug;
	this.pageIndex = 0;
	this.pageCount = 1;
	this.lastId = 0;
	this.page = 2;// 最后一条记录的id

	this.maxPageSize = 30; // 最多允许缓存30个页面

	that = this;
	// 初始化弹动控件
    this.iScrollPlug = new ScrollPlug($$(mainId));
    // 上拉和下拉执行函数
    this.iScrollPlug.init(_pdfn, _pufn);
	
	// 初始化
	BounceListMgr.prototype.init=function(showId, machine)
	{
		this.machine = machine;
		this.showId = showId;

        // 下拉获取数据
        this.pullDown();
	}

	// 下拉处理
	BounceListMgr.prototype.pullDown=function()
	{
		this.pageIndex = 0;
		this.refreshPage();
	}

	// 上拉处理
	BounceListMgr.prototype.pullUp=function()
	{
		if(typeof (this.lastId) == "undefined"){
			check_last_id();
			// 弹动恢复
			this.iScrollPlug.reset();
			return;
		}
		else {
			this.refreshPage(this.lastId);
		}
	}
	
	// 获取某一页数据
	BounceListMgr.prototype.refreshPage=function(lastId)
	{
		if(lastId != '页数加载'){
			this.machine.addParam("fromId", lastId);
		}else {
			this.machine.addParam("pageIndex", this.page++);
		}
		//this.machine.addParam("pageSize", 10); // 翻页测试
        DataCenter.getDataAnsyc(this.showId, this.machine, _afterS, _afterF);
	}

	// 数据后续处理
	BounceListMgr.prototype.afterSuccess=function(response, showId, machine)		
	{
		if( !response || !response.Data || !response.Success || !(response.Data instanceof Array))
		{
		    // 弹动恢复
		    this.iScrollPlug.reset();
			return;
		}

		var data = response.Data;
		var curHtml = DataCenter.getHTML_DataList(machine, data, machine.transfer);
		this.pageIndex = this.pageIndex + 1;

		curHtml = '<div id="page' + this.pageIndex + '" name="PAGE">' + curHtml + '</div>';		

		var div = $("#" + this.showId);
		// 如果是第一页
		if(this.pageIndex == 1)
		{
			// 没有数据
			if(data.length == 0)
			{
				div.html('<div style="width: 100%;height:2rem;line-height:2rem;font-size: 0.32rem;text-align: center;">无数据</div>');
			}
			else
			{
	            div.html(curHtml);
			}
		}
		else
		{
			if(this.pageIndex > this.maxPageSize)
			{
				// 删除第一个节点
				var node = document.getElementsByName('PAGE')[0];
				if(node)
				{
					node.parentNode.removeChild(node);
				}
			}
			var innerHtml = div.html();
			innerHtml = innerHtml.concat(curHtml);
	        div.html(innerHtml);
	    }

		this.lastId = getLastId(data, this.machine.getUrl());
		if(typeof (this.lastId) == "undefined"){
			check_last_id();
		}
		// 弹动恢复
		this.iScrollPlug.reset();
	}	

	// 数据后续处理
	BounceListMgr.prototype.afterFailed=function(err)
	{
		JsonEx.afterFailedDefault(err);

		// 弹动恢复
		this.iScrollPlug.reset();
	}
}
// 几个回调函数，注意that指针
function _pdfn()
{
	that.pullDown();
}

function _pufn()
{
	that.pullUp();
}

function _afterS(response, showId, machine)
{
	that.afterSuccess(response, showId, machine);
}
function _afterF(err)
{
	that.afterFailed(err);
}
//function screen_change(){
//	$("textarea ,input").blur(function(){
//		setTimeout("that.pullDown()",1000)
//	});
//}
//判断加载后的lastid
function check_last_id(){
	var mark = '<div id="mark" style="position:fixed;top:6rem;left:2.75rem;color:#ffffff;font-size:0.3rem;' +
				'width: 2rem;height: 1rem;border-radius: 0.2rem;background-color: rgba(0,0,0,0.7);' +
				'line-height: 1rem;text-align: center">已加载全部</div>';
	$("body").append(mark);
	$('#mark').animate({opacity: 'hide'}, 2000);
	setTimeout("$('#mark').remove()",2000);
}
//判断formID
function getLastId(data, url)
{
	var lastId;

	if(data && data.length > 0)
	{
		var action = url.split("?")[1].split("&")[0].split("=")[1];
		if( action == "GetHospitalProductList" ||action == "GetProductList"){//医院商品
			lastId = data[data.length - 1].ID;
		}
		else if( action == "GetHospitalCommentList"){//评价列表
			lastId = data[data.length - 1].CommentId;
		}
		else if( action == "GetDoctorByHospitalId"){//医生团队
			lastId = data[data.length - 1].Quanwei;
		}
		else if( action == "GetMyPostByUserId"){//医生团队
			lastId = data[data.length - 1].ID;
		}
		else if( action == "FindHospital"){//医院列表
			lastId = data[data.length - 1].HospitalId;
		}
		else if( action == "GetCouponCommentListByCouponId"){
			lastId = data[data.length - 1].ID;
		}
		else if( action == "GetMyPopWRRecord" || action == "GetOrderDetailList" || action == "GetCommissionList") {
			lastId = data[data.length - 1].Id;
		}
		else if( action == "GetOrderReturnVisit" || action == "GetPushMessageList") {
			lastId = data[data.length - 1].ID;
		}
		else if( action == "search") {
			lastId = "页数加载";
		}
	}
	console.log(action);
	console.log(lastId);
	return lastId;
}