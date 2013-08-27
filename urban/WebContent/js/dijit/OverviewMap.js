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
require({cache:{"url:esri/dijit/templates/OverviewMap.html":"<div class=\"esriOverviewMap\">\r\n  <div class=\"ovwContainer\" dojoattachpoint=\"_body\" style=\"width: ${width}px; height: ${height}px;\">\r\n    <div id=\"${id}-map\" style=\"width: 100%; height: 100%;\">\r\n      <div class=\"ovwHighlight\" dojoattachpoint=\"_focusDiv\" title=\"${NLS_drag}\" style=\"border: 1px solid ${color}; background-color: ${color};\"></div>\r\n    </div>\r\n  </div>\r\n  <div class=\"ovwButton ovwController\" title=\"${NLS_show}\" dojoattachpoint=\"_controllerDiv\" dojoattachevent=\"onclick: _visibilityHandler\">\r\n  </div>\r\n  <div class=\"ovwButton ovwMaximizer\" title=\"${NLS_maximize}\" dojoattachpoint=\"_maximizerDiv\" dojoattachevent=\"onclick: _maximizeHandler\">\r\n  </div>\r\n</div>\r\n"}});define("esri/dijit/OverviewMap",["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/html","dojo/has","dojo/sniff","dojo/dom-class","dojo/dom-style","dojo/dnd/Moveable","dijit/_Widget","dijit/_Templated","esri/map","esri/geometry/Point","esri/geometry/ScreenPoint","esri/layers/TiledMapServiceLayer","esri/layers/DynamicMapServiceLayer","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/OpenStreetMapLayer","esri/virtualearth/VETiledLayer","esri/kernel","esri/config","esri/domUtils","dojo/text!esri/dijit/templates/OverviewMap.html","dojo/i18n!esri/nls/jsapi"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19,_1a,_1b){var OM=_2([_b,_c],{declaredClass:"esri.dijit.OverviewMap",widgetsInTemplate:true,templateString:_1a,basePath:_1.toUrl("esri/dijit")+"/",constructor:function(_1c,_1d){_3.mixin(this,_1b.widgets.overviewMap);_1c=_1c||{};if(!_1c.map){console.error("esri.dijit.OverviewMap: "+this.NLS_noMap);return;}var _1e={};if(_1d){this._detached=true;_1e=_5.coords(_1d,true);}this.map=_1c.map;this.baseLayer=_1c.baseLayer;this.width=_1c.width||_1e.w||this.map.width/4;this.height=_1c.height||_1e.h||this.map.height/4;this.attachTo=_1c.attachTo||"top-right";this.expandFactor=_1c.expandFactor||2;this.color=_1c.color||"#000000";this.opacity=_1c.opacity||0.5;this.maximizeButton=!!_1c.maximizeButton;this.visible=!!_1c.visible;if(this.map.loaded){this._initialSetup();}else{var _1f=_4.connect(this.map,"onLoad",this,function(){_4.disconnect(_1f);_1f=null;this._initialSetup();});}if(this._detached){this.visible=true;}this._maximized=false;},startup:function(){this.inherited(arguments);if(_6("ie")){if(!this.domNode.parentElement){this.map.container.appendChild(this.domNode);}}else{if(!this.domNode.parentNode){this.map.container.appendChild(this.domNode);}}if(this._detached){_9.set(this._body,"display","block");_9.set(this._controllerDiv,"display","none");_9.set(this._maximizerDiv,"display","none");if(this.map.loaded){this._initialize();}else{_4.connect(this.map,"onLoad",this,this._initialize);}}else{if(this.attachTo.split("-")[0]==="bottom"){this.domNode.insertBefore(this._maximizerDiv,this._controllerDiv);}if(!this.maximizeButton){_8.add(this._maximizerDiv,"ovwDisabledButton");}if(this.visible&&this.map.loaded){this.visible=false;this.show();}_8.add(this.domNode,{"top-left":"ovwTL","top-right":"ovwTR","bottom-left":"ovwBL","bottom-right":"ovwBR"}[this.attachTo]);_8.add(this._controllerDiv,"ovwShow");_8.add(this._maximizerDiv,"ovwMaximize");}_9.set(this._focusDiv,"opacity",this.opacity);},destroy:function(){this._deactivate();if(this.overviewMap){this.overviewMap.destroy();}this.overviewMap=this.baseLayer=null;this.inherited(arguments);},resize:function(_20){if(!_20||_20.w<=0||_20.h<=0){return;}this._resize(_20.w,_20.h);},show:function(){if(!this.visible){var div=this._controllerDiv;div.title=this.NLS_hide;_8.remove(div,"ovwShow");_8.add(div,"ovwHide");_19.show(this._body);_19.show(this._maximizerDiv);this._initialize();this.visible=true;}},hide:function(){if(this.visible){var div=this._controllerDiv;div.title=this.NLS_show;_8.remove(div,"ovwHide");_8.add(div,"ovwShow");if(this._maximized){this._maximizeHandler();}_19.hide(this._body);_19.hide(this._maximizerDiv);this._deactivate();this.visible=false;}},_initialSetup:function(){this._mainMapLayer=this.map.getLayer(this.map.layerIds[0]);if(!this._mainMapLayer){console.error("esri.dijit.OverviewMap: "+this.NLS_noLayer);return;}var _21=this.baseLayer||this._mainMapLayer;var _22=this.map.spatialReference,_23=_21.spatialReference;if((_23.wkid!==_22.wkid)&&(_23.wkt!==_22.wkt)){console.error("esri.dijit.OverviewMap: "+this.NLS_invalidSR);return;}var _24=_21.declaredClass;if(_21 instanceof _10){if(_24.indexOf("VETiledLayer")!==-1){this.baseLayer=new _16({resourceInfo:_21.getResourceInfo(),culture:_21.culture,mapStyle:_21.mapStyle,bingMapsKey:_21.bingMapsKey});}else{if(_24.indexOf("OpenStreetMapLayer")!==-1){this.baseLayer=new _15({tileServers:_21.tileServers});}else{if(_24.indexOf("WebTiledLayer")!==-1){var _25=_21.initialExtent,_26=_21.fullExtent,_27=_21.tileInfo;this.baseLayer=new _21.constructor(_21.urlTemplate,{initialExtent:_25&&new _25.constructor(_25.toJson()),fullExtent:_26&&new _26.constructor(_26.toJson()),tileInfo:_27&&new _27.constructor(_27.toJson()),tileServers:_21.tileServers&&_21.tileServers.slice(0)});}else{this.baseLayer=new _12(_21.url,{resourceInfo:_21.getResourceInfo()});}}}}else{if(_21 instanceof _11){if(_24.indexOf("ArcGISImageServiceLayer")!==-1){this.baseLayer=new _14(_21.url);}else{this.baseLayer=new _13(_21.url);this.baseLayer.setImageFormat("png24");}}else{console.error("esri.dijit.OverviewMap: "+this.NLS_invalidType);return;}}if(!this._detached&&this.visible&&this._controllerDiv){var _28=function(){this.visible=false;this.show();};if(this.baseLayer.loaded){_28.call(this);}else{_4.connect(this.baseLayer,"onLoad",this,_28);}}},_visibilityHandler:function(){if(this.visible){this.hide();}else{this.show();}},_maximizeHandler:function(){var div=this._maximizerDiv;if(this._maximized){div.title=this.NLS_maximize;_8.remove(div,"ovwRestore");_8.add(div,"ovwMaximize");this._resize(this.width,this.height);}else{div.title=this.NLS_restore;_8.remove(div,"ovwMaximize");_8.add(div,"ovwRestore");this._resize(this.map.width,this.map.height);}this._maximized=!this._maximized;},_resize:function(_29,_2a){_9.set(this._body,{width:_29+"px",height:_2a+"px"});var _2b=_18.defaults.map.panDuration,_2c=this.overviewMap;_18.defaults.map.panDuration=0;_2c.resize(true);_2c.centerAt(this._focusExtent.getCenter());_18.defaults.map.panDuration=_2b;},_initialize:function(){if(!this.overviewMap){var _2d;_2d=(this.overviewMap=new _d(this.id+"-map",{slider:false,showAttribution:false,logo:false,lods:this._overviewLods,wrapAround180:this.map.wrapAround180}));_4.connect(_2d,"onLoad",this,function(){this._map_resize_override=_3.hitch(_2d,this._map_resize_override);_2d.disableMapNavigation();this._activate();});_2d.addLayer(this.baseLayer);}else{this._activate();}},_activate:function(){var map=this.map,_2e=this.overviewMap;this._moveableHandle=new _a(this._focusDiv);this._soeConnect=_4.connect(map,"onExtentChange",this,this._syncOverviewMap);this._ufoConnect=_4.connect(map,"onPan",this,this._updateFocus);this._oecConnect=_4.connect(_2e,"onExtentChange",this,this._ovwExtentChangeHandler);this._opaConnect=_4.connect(_2e,"onPan",this,this._ovwPanHandler);this._ozsConnect=_4.connect(_2e,"onZoomStart",this,function(){_19.hide(this._focusDiv);});this._ozeConnect=_4.connect(_2e,"onZoomEnd",this,function(){_19.show(this._focusDiv);});this._omsConnect=_4.connect(this._moveableHandle,"onMoveStop",this,this._moveStopHandler);this._syncOverviewMap(map.extent,null,null,null);},_deactivate:function(){_4.disconnect(this._soeConnect);_4.disconnect(this._ufoConnect);_4.disconnect(this._oecConnect);_4.disconnect(this._opaConnect);_4.disconnect(this._ozsConnect);_4.disconnect(this._ozeConnect);_4.disconnect(this._omsConnect);if(this._moveableHandle){this._moveableHandle.destroy();}},_syncOverviewMap:function(ext,_2f,_30,lod){if(this._suspendPanHandling){this._suspendPanHandling=false;return;}this._focusExtent=ext;this.overviewMap.setExtent(ext.expand(this.expandFactor),true);},_updateFocus:function(ext){if(this._suspendPanHandling){return;}this._focusExtent=ext;this._drawFocusDiv(ext);},_drawFocusDiv:function(ext,_31){var _32=this.overviewMap;var tl=_32.toScreen(new _e(ext.xmin,ext.ymax,_32.spatialReference));var br=_32.toScreen(new _e(ext.xmax,ext.ymin,_32.spatialReference));var _33=br.x-tl.x,_34=br.y-tl.y,_35=true;if((_33>this.overviewMap.width)&&(_34>this.overviewMap.height)){_35=false;}_9.set(this._focusDiv,{left:tl.x+(_31?_31.x:0)+"px",top:tl.y+(_31?_31.y:0)+"px",width:_33+"px",height:_34+"px",display:_35?"block":"none"});},_moveStopHandler:function(evt){var _36=this._moveableHandle.node.style;var ext=this._focusExtent;var _37=this.overviewMap;var _38=_37.toMap(new _f(parseInt(_36.left,10),parseInt(_36.top,10)));var _39=new _e(ext.xmin,ext.ymax,_37.spatialReference);this._focusExtent=ext.offset(_38.x-_39.x,_38.y-_39.y);if(this._maximized){this._maximizeHandler();}else{_37.centerAt(this._focusExtent.getCenter());}this._suspendPanHandling=true;this.map.setExtent(this._focusExtent);},_ovwExtentChangeHandler:function(){this._drawFocusDiv(this._focusExtent);},_ovwPanHandler:function(ext,_3a){this._drawFocusDiv(this._focusExtent,_3a);}});if(_6("extend-esri")){_3.setObject("dijit.OverviewMap",OM,_17);}return OM;});