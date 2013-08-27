/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
define("esri/tasks/RouteTask",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","esri/kernel","esri/graphic","esri/request","esri/geometry/normalizeUtils","esri/tasks/Task","esri/tasks/RouteResult","esri/tasks/NAMessage"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){var _c=_1(_9,{declaredClass:"esri.tasks.RouteTask",_eventMap:{"solve-complete":["result"]},constructor:function(_d){this._url.path+="/solve";this._handler=_2.hitch(this,this._handler);this.registerConnectEvents();},__msigns:[{n:"solve",c:3,a:[{i:0,p:["stops.features","barriers.features","polylineBarriers.features","polygonBarriers.features"]}],e:2}],_handler:function(_e,io,_f,_10,dfd){try{var _11=[],_12=[],_13=_e.directions||[],_14=_e.routes?_e.routes.features:[],_15=_e.stops?_e.stops.features:[],_16=_e.barriers?_e.barriers.features:[],_17=_e.polygonBarriers?_e.polygonBarriers.features:[],_18=_e.polylineBarriers?_e.polylineBarriers.features:[],_19=_e.messages,_1a="esri.tasks.RouteTask.NULL_ROUTE_NAME",_1b=_3.forEach,_1c=_3.indexOf,_1d=true,_1e,_1f,sr=((_e.routes&&_e.routes.spatialReference)||(_e.stops&&_e.stops.spatialReference)||(_e.barriers&&_e.barriers.spatialReference)||(_e.polygonBarriers&&_e.polygonBarriers.spatialReference)||(_e.polylineBarriers&&_e.polylineBarriers.spatialReference));_1b(_13,function(dir){_11.push(_1e=dir.routeName);_12[_1e]={directions:dir};});_1b(_14,function(_20){if(_1c(_11,(_1e=_20.attributes.Name))===-1){_11.push(_1e);_12[_1e]={};}_12[_1e].route=_20;});_1b(_15,function(_21){_1f=_21.attributes;if(_1c(_11,(_1e=_1f.RouteName||_1a))===-1){_11.push(_1e);_12[_1e]={};}if(_1e!==_1a){_1d=false;}if(_12[_1e].stops===undefined){_12[_1e].stops=[];}_12[_1e].stops.push(_21);});if(_15.length>0&&_1d===true){_12[_11[0]].stops=_12[_1a].stops;delete _12[_1a];_11.splice(_3.indexOf(_11,_1a),1);}var _22=[];_1b(_11,function(_23,i){_12[_23].routeName=_23===_1a?null:_23;_12[_23].spatialReference=sr;_22.push(new _a(_12[_23]));});var _24=function(_25){_1b(_25,function(_26,i){if(_26.geometry){_26.geometry.spatialReference=sr;}_25[i]=new _6(_26);});return _25;};_1b(_19,function(_27,i){_19[i]=new _b(_27);});var _28={routeResults:_22,barriers:_24(_16),polygonBarriers:_24(_17),polylineBarriers:_24(_18),messages:_19};this._successHandler([_28],"onSolveComplete",_f,dfd);}catch(err){this._errorHandler(err,_10,dfd);}},solve:function(_29,_2a,_2b,_2c){var _2d=_29.stops;if(_2d&&_2d.declaredClass==="esri.tasks.FeatureSet"){var _2e=[],_2f=false,_30;_3.forEach(_2d.features,function(_31){_30=_31.attributes;if((!_30||!_30.RouteName)&&!_2f){_2f=true;}else{if(_3.indexOf(_2e,_30?_30.RouteName:"")===-1){_2e.push(_30?_30.RouteName:"");}}});if(_2e.length>1&&_2f){_2f=new Error("'RouteName' not specified for atleast 1 stop in stops FeatureSet.");this.onError(_2f);if(_2b){_2b(_2f);}throw _2f;}}var _32=_2c.assembly,_33=this._encode(_2.mixin({},this._url.query,{f:"json"},_29.toJson(_32&&_32[0]))),_34=this._handler,_35=this._errorHandler;return _7({url:this._url.path,content:_33,callbackParamName:"callback",load:function(r,i){_34(r,i,_2a,_2b,_2c.dfd);},error:function(r){_35(r,_2b,_2c.dfd);}});},onSolveComplete:function(){}});_8._createWrappers(_c);if(_4("extend-esri")){_2.setObject("tasks.RouteTask",_c,_5);}return _c;});