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
require({cache:{"url:esri/dijit/templates/InfoWindow.html":"<div id=\"${id}.infowindow\" class=\"infowindow\" dojoAttachPoint=\"_infowindow\"\r\n  ><div style=\"position:relative;\"\r\n    ><div class=\"window\" dojoAttachPoint=\"_window\"\r\n      ><div class=\"top\"\r\n        ><div class=\"left\" dojoAttachPoint=\"_topleft\"><div class=\"sprite\"></div></div\r\n    \t\t><div class=\"right\" dojoAttachPoint=\"_topright\"\r\n    \t\t\t><div class=\"sprite\"></div\r\n    \t\t\t><div class=\"user\" dojoAttachPoint=\"_user\"\r\n    \t\t\t  ><div class=\"titlebar\" dojoAttachPoint=\"_titlebar\"\r\n    \t\t\t    ><a class=\"hide\" dojoAttachPoint=\"_hide\" dojoAttachEvent=\"onclick:hide\"><div class=\"sprite\"></div></a\r\n              ><div class=\"title\" dojoAttachPoint=\"_title\">${title}</div\r\n    \t\t\t  ></div\r\n            ><div class=\"border\" dojoAttachPoint=\"_border\"></div\r\n    \t\t\t  ><div class=\"layout content\" dojoAttachPoint=\"_content, containerNode\"\r\n    \t\t\t  ></div\r\n    \t\t\t></div\r\n    \t\t></div\r\n        ><div class=\"bottom\"\r\n          ><div class=\"left\" dojoAttachPoint=\"_bottomleft\"><div class=\"sprite\"></div></div\r\n\t\t      ><div class=\"right\" dojoAttachPoint=\"_bottomright\"><div class=\"sprite\"></div></div\r\n        ></div\r\n      ></div\r\n    ></div\r\n    ><div class=\"pointer\" dojoAttachPoint=\"_pointer\"><div dojoAttachPoint=\"_sprite\" class=\"sprite\"></div></div\r\n  ></div\r\n></div>"}});define("esri/dijit/InfoWindow",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/window","dojo/_base/kernel","dojo/has","dojo/query","dojo/sniff","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dijit/_Widget","dijit/_Templated","dijit/_Container","esri/kernel","esri/domUtils","esri/InfoWindowBase","esri/dijit/_EventedWidget","dojo/text!esri/dijit/templates/InfoWindow.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13){var IW=_1([_12,_c,_d,_e,_11],{declaredClass:"esri.dijit.InfoWindow",isContainer:true,templateString:_13,anchor:"upperright",fixedAnchor:null,coords:null,isShowing:true,isContentShowing:true,isTitleBarShowing:true,width:250,height:150,title:"Info Window",setMap:function(map){this.inherited(arguments);_a.place(this.domNode,map.root);},startup:function(){if(this._started){return;}this.inherited(arguments);this._ANCHORS=[IW.ANCHOR_UPPERRIGHT,IW.ANCHOR_LOWERRIGHT,IW.ANCHOR_LOWERLEFT,IW.ANCHOR_UPPERLEFT];if(_6("ie")<7){var url=_b.getComputedStyle(this._sprite).backgroundImage.replace(/url\(\"/i,"").replace(/\"\)/,""),_14="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true', sizingMethod='crop', src='"+url+"')";var s=_a.create("div",null,_4.body());_b.set(s,{width:"1px",height:"1px",display:"none",backgroundImage:"none",filter:_14});var t=setTimeout(function(){_a.destroy(s);clearTimeout(t);t=s=null;},100);_5.query(".sprite",this.domNode).forEach(function(n){n.style.backgroundImage="none";n.style.filter=_14;});}this.resize(this.width,this.height);this.hide();},destroy:function(){if(this._destroyed){return;}this.__unregisterMapListeners();this.destroyDijits(this._title);this.destroyDijits(this._content);this._title.innerHTML=this._content.innerHTML="";this.inherited(arguments);},resize:function(_15,_16){if(!_15||!_16){return;}var _17=_b.set;_17(this._topleft,{height:_16+"px",marginLeft:_15+"px"});_17(this._topright,{width:_15+"px",height:_16+"px"});_17(this._user,"width",(_15-8)+"px");_17(this._hide,"marginLeft",(_15-22)+"px");_17(this._title,"width",(_15-25)+"px");_17(this._content,"height",(_16-37)+"px");_17(this._bottomleft,{marginLeft:_15+"px",marginTop:_16+"px"});_17(this._bottomright,{width:(_15-5)+"px",marginTop:_16+"px"});this.width=_15;this.height=_16;if(this.coords){this._adjustPosition(this.coords,this.anchor);}this.onResize(_15,_16);},_adjustPosition:function(_18,_19){var _1a=_b.set;_1a(this._infowindow,{left:Math.round(_18.x)+"px",top:Math.round(_18.y)+"px"});if(_19===IW.ANCHOR_UPPERLEFT){_1a(this._window,{left:null,right:(this.width+18)+"px",top:null,bottom:(this.height+50)+"px"});}else{if(_19===IW.ANCHOR_UPPERRIGHT){_1a(this._window,{left:"6px",right:null,top:null,bottom:(this.height+50)+"px"});}else{if(_19===IW.ANCHOR_LOWERRIGHT){_1a(this._window,{left:"6px",right:null,top:"43px",bottom:null});}else{if(_19===IW.ANCHOR_LOWERLEFT){_1a(this._window,{left:null,right:(this.width+18)+"px",top:"43px",bottom:null});}}}}},_getAnchor:function(pt){var map=this.map;return (map&&pt)?(((pt.y<(map.height/2))?"lower":"upper")+((pt.x<(map.width/2))?"right":"left")):"upperright";},show:function(_1b,_1c){if(!_1b){return;}if(_1b.spatialReference){this.mapCoords=_1b;_1b=this.coords=this.map.toScreen(_1b,true);}else{this.mapCoords=null;this.coords=_1b;}var _1d=this.map._getFrameWidth();if(_1d!==-1){_1b.x=_1b.x%_1d;if(_1b.x<0){_1b.x+=_1d;}if(this.map.width>_1d){var _1e=(this.map.width-_1d)/2;while(_1b.x<_1e){_1b.x+=_1d;}}}if(!_1c||_3.indexOf(this._ANCHORS,_1c)===-1){_1c=this._getAnchor(_1b);}_9.remove(this._pointer,this.anchor);_1c=(this.anchor=this.fixedAnchor||_1c);this._adjustPosition(_1b,_1c);_9.add(this._pointer,_1c);_10.show(this.domNode);this.isShowing=true;if(!arguments[2]){this.onShow();}},hide:function(evt){_10.hide(this.domNode);this.isShowing=false;if(!arguments[1]){this.onHide();}},showTitleBar:function(){_10.show(this._titlebar);_10.show(this._border);this.isTitleBarShowing=true;},hideTitleBar:function(){_10.hide(this._titlebar);_10.hide(this._border);this.isTitleBarShowing=false;},showContent:function(){_10.show(this._content);_10.show(this._border);this.isContentShowing=true;},hideContent:function(){_10.hide(this._content);_10.hide(this._border);this.isContentShowing=false;},move:function(_1f,_20){if(_20){_1f=this.coords.offset(_1f.x,_1f.y);}else{this.coords=_1f;if(this.mapCoords){this.mapCoords=this.map.toMap(_1f);}}_b.set(this._infowindow,{left:Math.round(_1f.x)+"px",top:Math.round(_1f.y)+"px"});},setFixedAnchor:function(_21){if(_21&&_3.indexOf(this._ANCHORS,_21)===-1){return;}this.fixedAnchor=_21;if(this.isShowing){this.show(this.mapCoords||this.coords,_21);}this.onAnchorChange(_21);},setTitle:function(_22){this.destroyDijits(this._title);this.__setValue("_title",_22);return this;},setContent:function(_23){this.destroyDijits(this._content);this.__setValue("_content",_23);return this;},onShow:function(){this.__registerMapListeners();this.startupDijits(this._title);this.startupDijits(this._content);},onHide:function(){this.__unregisterMapListeners();},onResize:function(){},onAnchorChange:function(){}});_2.mixin(IW,{ANCHOR_UPPERRIGHT:"upperright",ANCHOR_LOWERRIGHT:"lowerright",ANCHOR_LOWERLEFT:"lowerleft",ANCHOR_UPPERLEFT:"upperleft"});if(_6("extend-esri")){_2.setObject("dijit.InfoWindow",IW,_f);}return IW;});