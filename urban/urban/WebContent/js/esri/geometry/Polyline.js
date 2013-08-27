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
define("esri/geometry/Polyline",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/has","esri/kernel","esri/lang","esri/SpatialReference","esri/geometry/Geometry","esri/geometry/Point","esri/geometry/Extent"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){var _b={type:"polyline",paths:null};var _c=_1(_8,{declaredClass:"esri.geometry.Polyline",constructor:function(_d){_3.mixin(this,_b);this.paths=[];this._path=0;if(_d){if(_d.paths){_3.mixin(this,_d);}else{this.spatialReference=_d;}if(this.spatialReference){this.spatialReference=new _7(this.spatialReference);}}this.verifySR();},_extent:null,addPath:function(_e){this._extent=null;this._path=this.paths.length;this.paths[this._path]=[];if(_3.isArray(_e[0])){_2.forEach(_e,this._addPointArr,this);}else{_2.forEach(_e,this._addPoint,this);}return this;},_addPointArr:function(_f){this.paths[this._path].push(_f);},_addPoint:function(_10){this.paths[this._path].push([_10.x,_10.y]);},_insertPoints:function(_11,_12){this._extent=null;this._path=_12;if(!this.paths[this._path]){this.paths[this._path]=[];}_2.forEach(_11,this._addPoint,this);},_validateInputs:function(_13,_14){if((_13!==null&&_13!==undefined)&&(_13<0||_13>=this.paths.length)){return false;}if((_14!==null&&_13!==undefined)&&(_14<0||_14>=this.paths[_13].length)){return false;}return true;},getPoint:function(_15,_16){if(this._validateInputs(_15,_16)){return new _9(this.paths[_15][_16],this.spatialReference);}},setPoint:function(_17,_18,_19){if(this._validateInputs(_17,_18)){this._extent=null;this.paths[_17][_18]=[_19.x,_19.y];return this;}},insertPoint:function(_1a,_1b,_1c){if(this._validateInputs(_1a)&&_6.isDefined(_1b)&&(_1b>=0&&_1b<=this.paths[_1a].length)){this._extent=null;this.paths[_1a].splice(_1b,0,[_1c.x,_1c.y]);return this;}},removePath:function(_1d){if(this._validateInputs(_1d,null)){this._extent=null;var arr=this.paths.splice(_1d,1)[0],i,il=arr.length,sr=this.spatialReference;for(i=0;i<il;i++){arr[i]=new _9(arr[i],sr);}return arr;}},removePoint:function(_1e,_1f){if(this._validateInputs(_1e,_1f)){this._extent=null;return new _9(this.paths[_1e].splice(_1f,1)[0],this.spatialReference);}},getExtent:function(){var _20;if(this._extent){_20=new _a(this._extent);_20._partwise=this._partwise;return _20;}var _21=this.paths,pal=_21.length;if(!pal||!_21[0].length){return;}var _22,_23,x,y,_24,_25,pa,pt,ptl,_26=(_24=_21[0][0][0]),_27=(_25=_21[0][0][1]),min=Math.min,max=Math.max,sr=this.spatialReference,_28=[],_29,_2a,_2b,_2c;for(pa=0;pa<pal;pa++){_22=_21[pa];_29=(_2a=_22[0]&&_22[0][0]);_2b=(_2c=_22[0]&&_22[0][1]);ptl=_22.length;for(pt=0;pt<ptl;pt++){_23=_22[pt];x=_23[0];y=_23[1];_26=min(_26,x);_27=min(_27,y);_24=max(_24,x);_25=max(_25,y);_29=min(_29,x);_2b=min(_2b,y);_2a=max(_2a,x);_2c=max(_2c,y);}_28.push(new _a({xmin:_29,ymin:_2b,xmax:_2a,ymax:_2c,spatialReference:(sr?sr.toJson():null)}));}this._extent={xmin:_26,ymin:_27,xmax:_24,ymax:_25,spatialReference:sr?sr.toJson():null};this._partwise=_28.length>1?_28:null;_20=new _a(this._extent);_20._partwise=this._partwise;return _20;},toJson:function(){var _2d={paths:_3.clone(this.paths)},sr=this.spatialReference;if(sr){_2d.spatialReference=sr.toJson();}return _2d;}});_c.defaultProps=_b;if(_4("extend-esri")){_3.setObject("geometry.Polyline",_c,_5);_5.geometry.defaultPolyline=_b;}return _c;});