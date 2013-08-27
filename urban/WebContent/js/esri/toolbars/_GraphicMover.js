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
define("esri/toolbars/_GraphicMover",["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/dom-style","dojox/gfx/Moveable","dojox/gfx/Mover","dojox/gfx/matrix","esri/kernel","esri/geometry/webMercatorUtils","esri/geometry/ScreenPoint"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){var GM=_1(null,{declaredClass:"esri.toolbars._GraphicMover",constructor:function(_d,_e,_f){this.graphic=_d;this.map=_e;this.toolbar=_f;this._enableGraphicMover();this._moved=false;},refresh:function(_10){var _11=this.graphic.getDojoShape();if(_11&&(_10||!_11._hostGraphic)){this._disableGraphicMover();this._enableGraphicMover();}},destroy:function(){this._disableGraphicMover();},hasMoved:function(){return this._moved;},_enableGraphicMover:function(){var _12=this.graphic,_13=_12.getDojoShape();if(_13){_13._hostGraphic=_12;this._moveable=new _7(_13,{mover:GM.Mover});this._moveStartHandle=_3.connect(this._moveable,"onMoveStart",this,this._moveStartHandler);this._firstMoveHandle=_3.connect(this._moveable,"onFirstMove",this,this._firstMoveHandler);this._movingHandle=_3.connect(this._moveable,"onMoving",this,this._movingHandler);this._moveStopHandle=_3.connect(this._moveable,"onMoveStop",this,this._moveStopHandler);var _14=_13.getEventSource();if(_14){_6.set(_14,"cursor",this.toolbar._cursors.move);}}},_disableGraphicMover:function(){var _15=this._moveable;if(_15){_3.disconnect(this._moveStartHandle);_3.disconnect(this._firstMoveHandle);_3.disconnect(this._movingHandle);_3.disconnect(this._moveStopHandle);var _16=_15.shape;if(_16){_16._hostGraphic=null;var _17=_16.getEventSource();if(_17){_6.set(_17,"cursor",null);}}_15.destroy();}this._moveable=null;},_moveStartHandler:function(){var _18=this.graphic,map=this.map;this._startTx=_18.getDojoShape().getTransform();if(this.graphic.geometry.type==="point"){if(map.snappingManager){map.snappingManager._setUpSnapping();}}this.toolbar.onGraphicMoveStart(_18);},_firstMoveHandler:function(){this.toolbar._beginOperation("MOVE");this.toolbar.onGraphicFirstMove(this.graphic);},_movingHandler:function(_19){this.toolbar.onGraphicMove(this.graphic,_19.shape.getTransform());},_moveStopHandler:function(_1a){var _1b=this.graphic,_1c=this.toolbar,map=this.map,mx=_9,_1d=_1c._geo?_b.geographicToWebMercator(_1b.geometry):_1b.geometry,_1e=_1d.type,_1f=_1b.getDojoShape(),tx=_1f.getTransform();if(_4.toJson(tx)!==_4.toJson(this._startTx)){this._moved=true;switch(_1e){case "point":var _20=[tx,mx.invert(this._startTx)],_21;if(map.snappingManager){_21=map.snappingManager._snappingPoint;}_1d=_21||map.toMap(mx.multiplyPoint(_20,map.toScreen(_1d,true)));if(map.snappingManager){map.snappingManager._killOffSnapping();}break;case "polyline":_1d=this._updatePolyGeometry(_1d,_1d.paths,tx);break;case "polygon":_1d=this._updatePolyGeometry(_1d,_1d.rings,tx);break;}_1f.setTransform(null);_1b.setGeometry(_1c._geo?_b.webMercatorToGeographic(_1d,true):_1d);}else{this._moved=false;}_1c._endOperation("MOVE");_1c.onGraphicMoveStop(_1b,tx);if(!this._moved){var e=_1a.__e,_22=this.map.position,pt=new _c(e.pageX-_22.x,e.pageY-_22.y);_1c.onGraphicClick(_1b,{screenPoint:pt,mapPoint:this.map.toMap(pt)});}},_updatePolyGeometry:function(_23,_24,_25){var map=this.map,_26=_23.getPoint(0,0),_27=map.toMap(map.toScreen(_26).offset(_25.dx,_25.dy)),_28=_27.x-_26.x,_29=_27.y-_26.y,i,j,seg,_2a;for(i=0;i<_24.length;i++){seg=_24[i];for(j=0;j<seg.length;j++){_2a=_23.getPoint(i,j);_23.setPoint(i,j,_2a.offset(_28,_29));}}return _23;}});GM.Mover=_1(_8,{declaredClass:"esri.toolbars._Mover",constructor:function(_2b,e,_2c){this.__e=e;}});if(_5("extend-esri")){_2.setObject("toolbars._GraphicMover",GM,_a);_2.setObject("toolbars._Mover",GM.Mover,_a);}return GM;});