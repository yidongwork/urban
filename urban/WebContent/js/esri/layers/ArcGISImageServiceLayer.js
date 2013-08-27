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
define("esri/layers/ArcGISImageServiceLayer",["dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/array","dojo/_base/json","dojo/_base/config","dojo/has","dojo/io-query","esri/kernel","esri/config","esri/lang","esri/request","esri/deferredUtils","esri/urlUtils","esri/geometry/Extent","esri/geometry/Point","esri/SpatialReference","esri/layers/MosaicRule","esri/layers/DynamicMapServiceLayer","esri/layers/TimeInfo","esri/layers/Field","esri/graphic","esri/tasks/ImageServiceIdentifyTask","esri/tasks/ImageServiceIdentifyParameters"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,_18){var _19=_1(_13,{declaredClass:"esri.layers.ArcGISImageServiceLayer",_eventMap:{"rendering-change":true,"mosaic-rule-change":true},constructor:function(url,_1a){this._url=_e.urlToObject(url);var _1b=_1a&&_1a.imageServiceParameters;this.format=_1b&&_1b.format;this.interpolation=_1b?_1b.interpolation:null;this.compressionQuality=_1b?_1b.compressionQuality:null;this.bandIds=_1b?_1b.bandIds:null;this.mosaicRule=_1b?_1b.mosaicRule:null;this.renderingRule=_1b?_1b.renderingRule:null;this._params=_2.mixin({},this._url.query,{f:"image",interpolation:this.interpolation,format:this.format,compressionQuality:this.compressionQuality,bandIds:this.bandIds?this.bandIds.join(","):null},_1b?_1b.toJson():{});this._initLayer=_2.hitch(this,this._initLayer);this._queryVisibleRastersHandler=_2.hitch(this,this._queryVisibleRastersHandler);this._visibleRasters=[];this.useMapImage=(_1a&&_1a.useMapImage)||false;this.infoTemplate=_1a&&_1a.infoTemplate;this._rasterAttributeTableFields=[];this._rasterAttributeTableFeatures=[];this._loadCallback=_1a&&_1a.loadCallback;var _1c=_1a&&_1a.resourceInfo;if(_1c){this._initLayer(_1c);}else{_c({url:this._url.path,content:_2.mixin({f:"json"},this._url.query),callbackParamName:"callback",load:this._initLayer,error:this._errorHandler});}this.registerConnectEvents();},disableClientCaching:false,_initLayer:function(_1d,io){this._findCredential();var ssl=(this.credential&&this.credential.ssl)||(_1d&&_1d._ssl);if(ssl){this._useSSL();}var _1e=this.minScale,_1f=this.maxScale;_2.mixin(this,_1d);this.minScale=_1e;this.maxScale=_1f;this.initialExtent=(this.fullExtent=this.extent=(new _f(_1d.extent)));this.spatialReference=this.initialExtent.spatialReference;this.pixelSizeX=parseFloat(this.pixelSizeX);this.pixelSizeY=parseFloat(this.pixelSizeY);var i,il,_20=this.minValues,_21=this.maxValues,_22=this.meanValues,_23=this.stdvValues,bs=(this.bands=[]);for(i=0,il=this.bandCount;i<il;i++){bs[i]={min:_20[i],max:_21[i],mean:_22[i],stddev:_23[i]};}var _24=this.timeInfo;this.timeInfo=(_24&&_24.timeExtent)?new _14(_24):null;var _25=this.fields=[];var _26=_1d.fields;if(_26){for(i=0;i<_26.length;i++){_25.push(new _15(_26[i]));}}this.version=_1d.currentVersion;if(!this.version){var ver;if("fields" in _1d||"objectIdField" in _1d||"timeInfo" in _1d){ver=10;}else{ver=9.3;}this.version=ver;}if(_b.isDefined(_1d.minScale)&&!this._hasMin){this.setMinScale(_1d.minScale);}if(_b.isDefined(_1d.maxScale)&&!this._hasMax){this.setMaxScale(_1d.maxScale);}var _27={};if(_1d.defaultMosaicMethod){_27.method=_1d.defaultMosaicMethod;_27.operation=_1d.mosaicOperator;_27.sortField=_1d.sortField;_27.sortValue=_1d.sortValue;}else{_27.method=_12.METHOD_NONE;}this.defaultMosaicRule=new _12(_27);this.defaultMosaicRule.ascending=true;if(this.version>10&&this.hasRasterAttributeTable){var _28=this.getRasterAttributeTable();_28.then(_2.hitch(this,function(_29){if(_29&&_29.features&&_29.features.length>0){this._rasterAttributeTableFeatures=_2.clone(_29.features);}if(_29&&_29.fields&&_29.fields.length>0){this._rasterAttributeTableFields=_2.clone(_29.fields);}}));}this.loaded=true;this.onLoad(this);var _2a=this._loadCallback;if(_2a){delete this._loadCallback;_2a(this);}},getKeyProperties:function(){var url=this._url.path+"/keyProperties",dfd=new _3(_d._dfdCanceller);if(this.version>10){dfd._pendingDfd=_c({url:url,content:{f:"json"},handleAs:"json",callbackParamName:"callback"});dfd._pendingDfd.then(function(_2b){dfd.callback(_2b);},function(_2c){dfd.errback(_2c);});}else{var err=new Error("Layer does not have key properties");err.log=_6.isDebug;dfd.errback(err);}return dfd;},getRasterAttributeTable:function(){var url=this._url.path+"/rasterAttributeTable",dfd=new _3(_d._dfdCanceller);if(this.version>10&&this.hasRasterAttributeTable){dfd._pendingDfd=_c({url:url,content:{f:"json"},handleAs:"json",callbackParamName:"callback"});dfd._pendingDfd.then(function(_2d){dfd.callback(_2d);},function(_2e){dfd.errback(_2e);});}else{var err=new Error("Layer does not support raster attribute table");err.log=_6.isDebug;dfd.errback(err);}return dfd;},_getRasterAttributeTableFeatures:function(){var dfd=new _3();if(this._rasterAttributeTableFeatures&&this._rasterAttributeTableFeatures.length>0){dfd.resolve(this._rasterAttributeTableFeatures);return dfd;}if(this.version>10&&this.hasRasterAttributeTable){var _2f=this.getRasterAttributeTable();_2f.then(_2.hitch(this,function(_30){if(_30&&_30.features&&_30.features.length>0){this._rasterAttributeTableFeatures=_2.clone(_30.features);}}));return _2f;}else{dfd.resolve(this._rasterAttributeTableFeatures);return dfd;}},getCustomRasterFields:function(_31){var _32=_31?_31.rasterAttributeTableFieldPrefix:"";var _33={name:"Raster.ItemPixelValue",alias:"Item Pixel Value",domain:null,editable:false,length:50,type:"esriFieldTypeString"};var _34={name:"Raster.ServicePixelValue",alias:"Service Pixel Value",domain:null,editable:false,length:50,type:"esriFieldTypeString"};var _35=this.fields?_2.clone(this.fields):[];var _36=_35.length;_35[_36]=_34;if(this.capabilities&&this.capabilities.toLowerCase().indexOf("catalog")>-1){_35[_36+1]=_33;}if(this._rasterAttributeTableFields&&this._rasterAttributeTableFields.length>0){var _37=_4.filter(this._rasterAttributeTableFields,function(_38){return (_38.type!=="esriFieldTypeOID"&&_38.name.toLowerCase()!=="value");});var _39=_4.map(_37,function(_3a){var _3b=_2.clone(_3a);_3b.name=_32+_3a.name;return _3b;});_35=_35.concat(_39);}return _35;},getImageUrl:function(_3c,_3d,_3e,_3f){var sr=_3c.spatialReference.wkid||_5.toJson(_3c.spatialReference.toJson());delete this._params._ts;var _40=this._url.path+"/exportImage?";_2.mixin(this._params,{bbox:_3c.xmin+","+_3c.ymin+","+_3c.xmax+","+_3c.ymax,imageSR:sr,bboxSR:sr,size:_3d+","+_3e},this.disableClientCaching?{_ts:new Date().getTime()}:{});var _41=(this._params.token=this._getToken()),_42=_e.addProxy(_40+_8.objectToQuery(_2.mixin(this._params,{f:"image"})));if((_42.length>_a.defaults.io.postLength)||this.useMapImage){this._jsonRequest=_c({url:_40,content:_2.mixin(this._params,{f:"json"}),callbackParamName:"callback",load:function(_43,io){var _44=_43.href;if(_41){_44+=(_44.indexOf("?")===-1?("?token="+_41):("&token="+_41));}_3f(_e.addProxy(_44));},error:this._errorHandler});}else{_3f(_42);}},onRenderingChange:function(){},onMosaicRuleChange:function(){},setInterpolation:function(_45,_46){this.interpolation=(this._params.interpolation=_45);if(!_46){this.refresh(true);}},setCompressionQuality:function(_47,_48){this.compressionQuality=(this._params.compressionQuality=_47);if(!_48){this.refresh(true);}},setBandIds:function(ids,_49){var _4a=false;if(this.bandIds!==ids){_4a=true;}this.bandIds=ids;this._params.bandIds=ids.join(",");if(_4a&&!_49){this.onRenderingChange();}if(!_49){this.refresh(true);}},setDefaultBandIds:function(_4b){this.bandIds=(this._params.bandIds=null);if(!_4b){this.refresh(true);}},setDisableClientCaching:function(_4c){this.disableClientCaching=_4c;},setMosaicRule:function(_4d,_4e){var _4f=false;if(this.mosaicRule!==_4d){_4f=true;}this.mosaicRule=_4d;this._params.mosaicRule=_5.toJson(_4d.toJson());if(_4f&&!_4e){this.onMosaicRuleChange();}if(!_4e){this.refresh(true);}},setRenderingRule:function(_50,_51){var _52=false;if(this.renderingRule!==_50){_52=true;}this.renderingRule=_50;this._params.renderingRule=_50?_5.toJson(_50.toJson()):null;if(_52&&!_51){this.onRenderingChange();}if(!_51){this.refresh(true);}},setImageFormat:function(_53,_54){this.format=(this._params.format=_53);if(!_54){this.refresh(true);}},setInfoTemplate:function(_55){this.infoTemplate=_55;},setDefinitionExpression:function(_56,_57){var _58=this.mosaicRule?this.mosaicRule.toJson():{};if(!this.mosaicRule){if(this.defaultMosaicRule){_58=this.defaultMosaicRule.toJson();}else{_58.method=_12.METHOD_NONE;}}_58.where=_56;var _59=new _12(_58);this.setMosaicRule(_59,_57);return this;},getDefinitionExpression:function(){return this.mosaicRule?this.mosaicRule.where:null;},refresh:function(_5a){if(_5a){this.inherited(arguments);}else{var dc=this.disableClientCaching;this.disableClientCaching=true;this.inherited(arguments);this.disableClientCaching=dc;}},exportMapImage:function(_5b,_5c){var m=_a.defaults.map,p=_2.mixin({size:m.width+","+m.height},this._params,_5b?_5b.toJson(this.normalization):{},{f:"json"});delete p._ts;this._exportMapImage(this._url.path+"/exportImage",p,_5c);},queryVisibleRasters:function(_5d,_5e,_5f,_60){var map=this._map,dfd=_d._fixDfd(new _3(_d._dfdCanceller));this._visibleRasters=[];var i,_61,_62=true;if(this.infoTemplate&&this.infoTemplate.info.fieldInfos&&this.infoTemplate.info.fieldInfos.length>0){_62=false;for(i=0;i<this.infoTemplate.info.fieldInfos.length;i++){_61=this.infoTemplate.info.fieldInfos[i];if(_61&&_61.visible&&_61.fieldName.toLowerCase()!=="raster.servicepixelvalue"){_62=true;}}}var _63=new _18();_63.geometry=_5d.geometry.getCenter();_63.returnGeometry=true;_63.returnCatalogItems=_62;_63.timeExtent=_5d.timeExtent;_63.mosaicRule=(this.mosaicRule?this.mosaicRule:null);_63.renderingRule=(this.renderingRule?this.renderingRule:null);if(map){var psX=(map.extent.xmax-map.extent.xmin)/(map.width*2);var psY=(map.extent.ymax-map.extent.ymin)/(map.height*2);var _64=map.extent.spatialReference;var _65=new _10(psX,psY,_64);_63.pixelSize=_65;}var _66=this;var _67=new _17(this.url);var _68=dfd._pendingDfd=_67.execute(_63);_68.addCallbacks(function(_69){_66._queryVisibleRastersHandler(_69,_5e,_5f,_60,dfd);},function(err){_66._resolve([err],null,_60,dfd,true);});return dfd;},_queryVisibleRastersHandler:function(_6a,_6b,_6c,_6d,dfd){var _6e=_6a.features;var _6f=_6a.value;var _70;if(_6a.catalogItems){_6e=_6a.catalogItems.features;_70=_6a.properties.Values;}this._visibleRasters=[];var _71,_72=this.objectIdField;var _73=_6f.toLowerCase().indexOf("nodata")>-1;if(_6f&&!_6e&&!_73){_72="ObjectId";_6e=[];var _74={};_74.ObjectId=0;_71=new _16(new _f(this.fullExtent),null,_74);_6e.push(_71);}var _75=[];if(!_6e){this._resolve([_75,null,null],null,_6c,dfd);return;}var _76=this.getCustomRasterFields(_6b);var _77=this._getDomainFields(_76);var _78=_6b?_6b.returnDomainValues:false;var _79=_6b&&_6b.rasterAttributeTableFieldPrefix;var i,oid,_7a,_7b,_7c,_7d,_7e,_7f,_80;var _81=this._getRasterAttributeTableFeatures();_81.then(_2.hitch(this,function(_82){for(i=0;i<_6e.length;i++){_71=_6e[i];oid=_71.attributes[_72];_71.setInfoTemplate(this.infoTemplate);if(_6f){_7a=_6f;if(_70&&_70.length>=i){_7b=_70[i];_7a=_7b.replace(/ /gi,", ");}_71.attributes["Raster.ItemPixelValue"]=_7a;_71.attributes["Raster.ServicePixelValue"]=_6f;if(_82&&_82.length>0){_7c=_4.filter(_82,function(_83){if(_83&&_83.attributes){if(_83.attributes.hasOwnProperty("Value")){return (_83.attributes.Value==_7a);}else{return (_83.attributes.VALUE==_7a);}}});if(_7c.length>0){_7d=_2.clone(_7c[0]);if(_79&&_7d){_80={};for(_7e in _7d.attributes){if(_7d.attributes.hasOwnProperty(_7e)){_7f=_79+_7e;_80[_7f]=_7d.attributes[_7e];}}_7d.attributes=_80;_71.attributes=_2.mixin(_71.attributes,_7d.attributes);}}}}if(_78&&_77&&_77.length>0){_4.forEach(_77,function(_84){if(_84){var _85=_71.attributes[_84.name];if(_b.isDefined(_85)){var _86=this._getDomainValue(_84.domain,_85);if(_b.isDefined(_86)){_71.attributes[_84.name]=_86;}}}},this);}_75.push(_71);this._visibleRasters.push(_71);}this._resolve([_75,null,true],null,_6c,dfd);}));},getVisibleRasters:function(){var _87=this._visibleRasters,_88=[],_89;for(_89 in _87){if(_87.hasOwnProperty(_89)){_88.push(_87[_89]);}}return _88;},_getDomainFields:function(_8a){if(!_8a){return;}var _8b=[];_4.forEach(_8a,function(_8c){if(_8c.domain){var _8d={};_8d.name=_8c.name;_8d.domain=_8c.domain;_8b.push(_8d);}});return _8b;},_getDomainValue:function(_8e,_8f){if(_8e&&_8e.codedValues){var _90;_4.some(_8e.codedValues,function(_91){if(_91.code===_8f){_90=_91.name;return true;}return false;});return _90;}},_resolve:function(_92,_93,_94,dfd,_95){if(_93){this[_93].apply(this,_92);}if(_94){_94.apply(null,_92);}if(dfd){_d._resDfd(dfd,_92,_95);}}});if(_7("extend-esri")){_2.setObject("layers.ArcGISImageServiceLayer",_19,_9);}return _19;});