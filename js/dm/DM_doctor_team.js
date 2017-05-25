/**
 * Created by Administrator on 2016/11/4.
 */
var DM_doctor_team = function(){
    MessageMachine.call(this);
    //url
    this.url ='http://api.dfhon.cn/v3/Doctor.json?action=GetDoctorByHospitalId&app_sdk=gds&app_version=1.0.0&app_terminal=pc';
    this._template = '<li class="parent-pos">\
                            <div class="facebox">\
                                <img class="userFace" src="{{UserFace}}">\
                                </div>\
                                <div class="inner">\
                                    <p><span class="name">{{DoctorName}}   </span>{{JobTitle}}</p>\
                                    <p>{{HospitalName}}</p>\
                                    <p>擅长：<span>{{DoctorProject}}</span></p>\
                                </div>\
                            </li>';


    // set Render
    this.setRender(this._template);

    // 数据格式转换
    this.transfer = function(data){
        return data;
    };
    // 测试数据
    this.getTestData = function(){
        var response = '{}';
        return JSON.parse(response);
    }
};