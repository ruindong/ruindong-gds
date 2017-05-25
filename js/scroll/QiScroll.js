/*
 * 使用方法：1：引入优化过的iscroll-probe
 *         2: 引入style文件
 *         3：var a=new ScrollPlug(包裹的顶层元素)
 *            a.init(pulldownAction,pullupAction);
 *    参数：pulldownAction：刷新函数 pullupAction：加载函数
 * */
function ScrollPlug(objContain) {
    var htmlWrapper = 
        '<div id="wrapper">' +
        '     <div id="scroller">' +
        '         <div id="pullDown">' +
        '             <span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新...</span>' +
        '         </div>' +

        '         <div id="mainContain" class="mainContent">' +
        objContain.innerHTML +
        '         </div>' +

        '         <div id="pullUp">' +
        '             <span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载...</span>' +
        '         </div>' +
        '     </div>' +
        '</div>';
    // this.objCtn = objContain;
    objContain.innerHTML = htmlWrapper;

    this.pullDownEl = document.getElementById('pullDown');//上
    this.pullUpEl = document.getElementById('pullUp');//下
    this.pullDownOffset = this.pullDownEl.offsetHeight;
    this.pullUpOffset = this.pullUpEl.offsetHeight;    
}

var _this;
ScrollPlug.prototype.init = function (pulldownAction, pullupAction) {
    _this = this;
    var parms = { probeType: 1, startY: -_this.pullDownOffset, click: true, useTransform:false, bounceTime: 600};
    this.myScroll = new IScroll('#wrapper', parms);
 
    // 设置mainContent缺省高度
    document.querySelector(".mainContent").style.minHeight=document.documentElement.clientHeight+"px";

    // 刷新
    this.myScroll.refresh();

    // 屏幕高度
    this.screenHeight = document.documentElement.clientHeight;


    this.myScroll.on("refresh", function () {       
        document.getElementById("pullDown").style.visibility="visible";
        document.getElementById("pullUp").style.visibility="visible";

        if (_this.pullDownEl.className.match('loading')) {//match返回匹配的集合
            _this.pullDownEl.className = '';//设定背景图的位置
            _this.pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
        } else if (_this.pullUpEl.className.match('loading')) {
            _this.pullUpEl.className = '';
            _this.pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
        }


        // 底部菜单高度
        var footerHeight = 0;
        var footerDiv = document.getElementById("index-foot");
        if(footerDiv)
        {
            footerHeight = footerDiv.offsetHeight;
        }

        // 滚动区域高度修正
        var _maxH = document.getElementById("scroller").offsetHeight;
        this.maxScrollY = -_maxH  - footerHeight + _this.screenHeight + _this.pullDownOffset;
        _maxScrollY = this.maxScrollY;

        // 隐藏顶部
        if(this.y > -_this.pullUpOffset)
        {
            this.scrollTo(0, -_this.pullDownOffset);
        }
        // 隐藏底部
        if(this.y < _maxScrollY)
        {
            this.scrollTo(0, _maxScrollY);
        }
    });

    var _maxScrollY;
    this.myScroll.on("scrollStart", function () {
        // 刷新一下，某些动态加载的内容会导致maxScrollY需要变化
        this.refresh();
        
        // 滚动区域顶部，refresh之后这个属性会清零
        this.minScrollY = -_this.pullDownOffset;
    });

    //用onScroll就必须当probeType==1时
    this.myScroll.on("scroll", function () {         
        if (this.y >= 5 && !_this.pullDownEl.className.match('flip')) {//找不到flip ,图标还没旋转
            _this.pullDownEl.className = 'flip';//让图标旋转180度
            _this.pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新...';
            this.minScrollY = 0;//表示加载的时候不能让它缩回去
        } else if (this.y < 5 && _this.pullDownEl.className.match('flip')) {            
            _this.pullDownEl.className = '';//又转回来
            _this.pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            this.minScrollY = -_this.pullDownOffset;
        } else if (this.y <= (_maxScrollY - _this.pullUpOffset - 5) && !_this.pullUpEl.className.match('flip')) {
            _this.pullUpEl.className = 'flip';
            _this.pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载...';
            this.maxScrollY = _maxScrollY - _this.pullUpOffset;
        } else if (this.y > (_maxScrollY - _this.pullUpOffset) && _this.pullUpEl.className.match('flip')) {
            _this.pullUpEl.className = '';
            _this.pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载...';
            this.maxScrollY = _maxScrollY - _this.pullUpOffset;
        }
    });

    this.myScroll.on("scrollEnd", function () {       
        if (_this.pullDownEl.className.match('flip')) {
            _this.pullDownEl.className = 'loading';
            _this.pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在刷新...';
            pulldownAction?pulldownAction():this.refresh();
        } else if (_this.pullUpEl.className.match('flip')) {
            _this.pullUpEl.className = 'loading';
            _this.pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
            pullupAction?pullupAction():this.refresh();
        }
    });
}

// reset
ScrollPlug.prototype.reset = function () {
    this.myScroll.refresh();
}

ScrollPlug.prototype.des = function () {

}