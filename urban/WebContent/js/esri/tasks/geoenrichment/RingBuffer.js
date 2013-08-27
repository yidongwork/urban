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
define("esri/tasks/geoenrichment/RingBuffer",["../../declare","esri/units","./StudyAreaOptions"],function(_1,_2,_3){return _1("esri.tasks.geoenrichment.RingBuffer",[_3],{radii:null,units:null,constructor:function(_4){if(_4){if(_4.bufferRadii){this.radii=_4.bufferRadii;}else{if(_4.radius){this.radii=[_4.radius];}else{if(_4.radii){this.radii=_4.radii;}}}this.units=_4.bufferUnits||_4.units;}if(!this.radii){this.radii=[1];}if(!this.units){this.units=_2.MILES;}},toJson:function(){return {areaType:"RingBuffer",bufferUnits:this.units,bufferRadii:this.radii};}});});