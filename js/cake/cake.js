/**
 * Created by Administrator on 2016/11/18.
 */
function data_array(total_data){
    // 路径配置
    require.config({
        paths: {
            'echarts': '/js/cake/echarts',
            'echarts/chart/pie': '/js/cake/echarts'
        }
    });
    // 使用
    require(
        [
            'echarts',
            'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('main'));
            var option = {
                /*title: {
                 text: '某站点用户访问来源',
                 subtext: '纯属虚构',
                 x: 'center'
                 },*/
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                /*legend: {
                 orient: 'vertical',
                 x: 'left',
                 data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                 },*/
                toolbox: {
                    show: false,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                series: [
                    {
                        name: '分销统计',
                        type: 'pie',
                        radius: '55%',
                        center: ['48%', '50%'],
                        data: total_data
                    }
                ]
            };
            myChart.setOption(option);
        }
    );
}
