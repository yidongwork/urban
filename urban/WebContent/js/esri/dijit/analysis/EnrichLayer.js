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
require({cache:{"url:esri/dijit/analysis/templates/EnrichLayer.html":"<div class=\"esriAnalysis\">\r\n    <div data-dojo-type=\"dijit/layout/ContentPane\" style=\"margin-top:0.5em; margin-bottom: 0.5em;\">\r\n      <div data-dojo-attach-point=\"_aggregateToolContentTitle\" class=\"analysisTitle\">\r\n        <table class=\"esriFormTable\" > \r\n          <tr>\r\n            <td class=\"esriToolIconTd\"><div class=\"geoenrichLayerIcon\"></div></td>\r\n            <td class=\"esriAlignLeading\">${i18n.enrichLayer}</td>\r\n            <td>\r\n              <div class=\"esriFloatTrailing\" style=\"padding:0;\">\r\n                  <a href=\"#\" class='esriFloatLeading helpIcon' esriHelpTopic=\"toolDescription\"></a>\r\n                  <a href=\"#\" data-dojo-attach-point=\"_closeBtn\" title=\"${i18n.close}\" class=\"closeIcon\">              \r\n                  <img data-dojo-attach-point=\"_closeImg\" border=\"0\"/></a>            \r\n              </div>                \r\n            </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n      <div style=\"clear:both; border-bottom: #333 thin solid; height:1px;width:100%;\"></div>\r\n    </div>\r\n    <div data-dojo-type=\"dijit/form/Form\" data-dojo-attach-point=\"_form\" readOnly=\"true\">\r\n       <table class=\"esriFormTable\"  data-dojo-attach-point=\"_aggregateTable\"  style=\"border-collapse:collapse;border-spacing:5px;\" cellpadding=\"5px\" cellspacing=\"5px\"> \r\n         <tbody>\r\n          <tr>\r\n            <td  colspan=\"3\" class=\"sectionHeader\" data-dojo-attach-point=\"_aggregateToolDescription\" >${i18n.enrichDefine}</td>\r\n          </tr>      \r\n          <tr>\r\n            <td colspan=\"3\" style=\"padding-bottom:0;\">\r\n              <label class=\"esriFloatLeading esriTrailingMargin025\">${i18n.oneLabel}</label>\r\n              <label class=\"\">${i18n.chooseDataCollectionLabel}</label>\r\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"DataCollection\"></a>\r\n              <select class=\"esriMediumlabel longInput esriLeadingMargin1\"  style=\"margin-top:0.5em; table-layout:fixed;\" data-dojo-type=\"dijit/form/Select\" data-dojo-props=\"maxHeight:100, style:'maxHeight:100px'\" data-dojo-attach-event=\"onChange:_handleCollectionSelectChange\" data-dojo-attach-point=\"_collectionSelect\"></select>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td colspan=\"3\" style=\"padding-top:0;\">\r\n              <select multiple=\"true\"  class=\"esriLeadingMargin1 longInput\"  style=\"margin-top:10px;\" data-dojo-type=\"dojox/form/CheckedMultiSelect\" data-dojo-props=\"required:true\"   data-dojo-attach-point=\"_dataSelect\"></select>\r\n            </td>\r\n          </tr>\r\n          \r\n          <tr>\r\n            <td colspan=\"3\" class=\"clear\"></td>\r\n          </tr>\r\n            \r\n          <tr>\r\n            <td colspan=\"2\">\r\n              <label data-dojo-attach-point=\"_labelOne\" class=\"esriFloatLeading esriTrailingMargin025 \">${i18n.twoLabel}</label>\r\n              <label data-dojo-attach-point=\"_measurelabel\" class=\"\">${i18n.defAreasLabel}</label>\r\n            </td>\r\n            <td class=\"shortTextInput\">\r\n              <a href=\"#\" class='esriFloatTrailing helpIcon' data-dojo-attach-point=\"_analysisFieldHelpLink\" esriHelpTopic=\"BufferOption\"></a>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td style=\"padding:0.25em;width:34%\">\r\n              <div class=\"esriLeadingMargin1 bufferSelector selected\" data-dojo-attach-point=\"_straightLine\" >\r\n                <div class=\"bufferIcon esriStraightLineDistanceIcon\"></div>\r\n                <div><label data-dojo-attach-point=\"_straightLineLabel\" class=\"esriFloatLeading esriTrailingMargin1 esriSelectLabel\">${i18n.straightLineDistance}</label></div>\r\n              </div>\r\n            </td>\r\n            <td style=\"esriTrailingMargin2 padding:0.25em;width:33%\">\r\n              <div class=\"bufferSelector\" data-dojo-attach-point=\"_drivingTime\" >\r\n                <div class=\"bufferIcon esriDrivingTimeIcon\"></div>\r\n                <div><label data-dojo-attach-point=\"_drivingTimeLabel\" class=\"esriFloatLeading esriSelectLabel\">${i18n.drivingTime}</label></div>\r\n              </div>\r\n            </td>\r\n          </tr>\r\n          <tr>\r\n            <td style=\"padding-right:0;padding-bottom:0;width:20%;\">\r\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" data-dojo-attach-event=\"onChange:_handleDistUnitsChange\" data-dojo-props=\"intermediateChanges:true,value:'1',required:true,missingMessage:'${i18n.distanceMsg}'\" data-dojo-attach-point=\"_distanceInput\" class=\"esriLeadingMargin1\"  style=\"width:75%;\">\r\n            </td>\r\n            <td colspan=\"2\" style=\"padding-left:0.25em;padding-bottom:0;width:60%;\">\r\n              <select class=\"mediumInput esriAnalysisSelect\" data-dojo-type=\"dijit/form/Select\" data-dojo-attach-event=\"onChange:_handleDistUnitsChange\" data-dojo-attach-point=\"_distanceUnitsSelect\" style=\"width:85%;table-layout:fixed;\">\r\n                <option value=\"Seconds\">${i18n.seconds}</option>\r\n                <option value=\"Minutes\" selected=\"selected\">${i18n.minutes}</option>\r\n                <option value=\"Hours\">${i18n.hours}</option>\r\n              </select>\r\n            </td>\r\n          </tr>\r\n          <tr data-dojo-attach-point=\"_useTrafficRow\">\r\n            <td style=\"padding:0\" colspan=\"3\">\r\n              <div style=\"width:100%;\" data-dojo-type=\"esri/dijit/analysis/TrafficTime\" data-dojo-attach-point=\"_trafficTimeWidget\"></div>\r\n            </td>\r\n          </tr> \r\n          <tr>\r\n            <td colspan=\"3\" class=\"clear\"></td>\r\n          </tr>\r\n          <tr>\r\n            <td colspan=\"2\">\r\n              <label class=\"esriFloatLeading esriTrailingMargin025\">${i18n.threeLabel}</label>\r\n              <label class=\"longTextInput\">${i18n.outputLayerLabel}</label>\r\n            </td>\r\n            <td class=\"shortTextInput\">\r\n              <a href=\"#\" class='esriFloatTrailing helpIcon' esriHelpTopic=\"OutputName\"></a> \r\n            </td>             \r\n          </tr>\r\n          <tr>\r\n            <td colspan=\"3\">\r\n              <input type=\"text\" data-dojo-type=\"dijit/form/ValidationTextBox\" class=\"esriLeadingMargin1 esriOutputText\"  data-dojo-props=\"required:true\" data-dojo-attach-point=\"_outputLayerInput\" value=\"\"></input>\r\n            </td>                \r\n          </tr> \r\n          <tr>\r\n            <td colspan=\"3\">\r\n               <div class=\"esriLeadingMargin1\" data-dojo-attach-point=\"_chooseFolderRow\">\r\n                 <label style=\"width:9px;font-size:smaller;\">${i18n.saveResultIn}</label>\r\n                 <input class=\"longInput esriFolderSelect\" dojoAttachPoint=\"_webMapFolderSelect\" dojotype=\"dijit/form/ComboBox\" trim=\"true\"></input>\r\n               </div>              \r\n            </td>\r\n          </tr>                                      \r\n        </tbody>         \r\n       </table>\r\n     </div>\r\n    <div data-dojo-attach-point=\"_aggregateToolContentButtons\" style=\"padding:5px;margin-top:5px;border-top:solid 1px #BBB;\">\r\n      <div style=\"width:100%;padding:0.5em 0 0.5em 0\">\r\n        <a class=\"esriFloatTrailing esriSmallFont\"  href=\"#\" data-dojo-attach-point=\"_showCreditsLink\" data-dojo-attach-event=\"onclick:_handleShowCreditsClick\">${i18n.showCredits}</a>\r\n       <label data-dojo-attach-point=\"_chooseExtentDiv\"class=\"esriSelectLabel\" style=\"font-size:smaller;\">\r\n         <input type=\"radio\" data-dojo-attach-point=\"_useExtentCheck\" data-dojo-type=\"dijit/form/CheckBox\" data-dojo-props=\"checked:true\" name=\"extent\" value=\"true\"/>\r\n           ${i18n.useMapExtent}\r\n       </label>\r\n      </div>\r\n      <button data-dojo-type=\"dijit/form/Button\" type=\"submit\" data-dojo-attach-point=\"_saveBtn\" class=\"esriLeadingMargin4\" data-dojo-attach-event=\"onClick:_handleSaveBtnClick\">\r\n          ${i18n.runAnalysis}\r\n      </button>\r\n    </div>\r\n    <div data-dojo-type=\"dijit/Dialog\" title=\"${i18n.creditTitle}\" data-dojo-attach-point=\"_usageDialog\" style=\"width:40em;\">\r\n      <div data-dojo-type=\"esri/dijit/analysis/CreditEstimator\"  data-dojo-attach-point=\"_usageForm\"></div>\r\n    </div>    \r\n</div>\r\n"}});define("esri/dijit/analysis/EnrichLayer",["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/i18n","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/number","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/ComboBox","dojox/form/CheckedMultiSelect","esri/kernel","esri/dijit/analysis/AnalysisBase","esri/dijit/analysis/CreditEstimator","esri/dijit/analysis/utils","esri/dijit/analysis/TrafficTime","dojo/text!esri/dijit/analysis/templates/EnrichLayer.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19,_1a,_1b,_1c,_1d,_1e,_1f,_20,_21,_22,_23,_24,_25){var _26=_2([_11,_12,_13,_14,_15,_21],{declaredClass:"esri.dijit.analysis.SummarizeNearby",templateString:_25,basePath:_1.toUrl("esri/dijit/analysis"),widgetsInTemplate:true,inputLayer:null,outputLayerName:null,distance:null,showSelectFolder:false,showChooseExtent:true,showTrafficWidget:false,_isBufferSelectionEnabled:true,showHelp:true,showCredits:true,i18n:null,toolName:"EnrichLayer",helpFileName:"EnrichLayer",resultParameter:"enrichedLayer",constructor:function(_27){this.inherited(arguments);this._pbConnects=[];this._statsRows=[];this._isLineEnabled=false;if(_27.containerNode){this.container=_27.containerNode;}},destroy:function(){this.inherited(arguments);_4.forEach(this._pbConnects,_5.disconnect);delete this._pbConnects;},postMixInProperties:function(){this.inherited(arguments);_3.mixin(this.i18n,_8.getLocalization("esri","jsapi").bufferTool);_3.mixin(this.i18n,_8.getLocalization("esri","jsapi").driveTimes);_3.mixin(this.i18n,_8.getLocalization("esri","jsapi").enrichLayerTool);},postCreate:function(){this.inherited(arguments);_f.add(this._form.domNode,"esriSimpleForm");_c.set(this._closeImg,"src",this.basePath+"/images/close.gif");_b.set(this._dataSelect.selectNode,"width","90%");this._distanceInput.set("validator",_3.hitch(this,this.validateDistance));this._outputLayerInput.set("validator",_3.hitch(this,this.validateServiceName));this._buildUI();},startup:function(){},_onClose:function(_28){if(_28){this._save();this.onSave();}this.onClose();},_handleShowCreditsClick:function(e){e.preventDefault();if(!this._form.validate()){return;}var _29={},_2a={};_29.inputLayer=_6.toJson(_23.constructAnalysisInputLyrObj(this.inputLayer));if(this._isBufferSelectionEnabled||this._isLineEnabled){_29.bufferType=this.get("bufferType");_29.distance=this.get("distance");_29.units=this._distanceUnitsSelect.get("value");}if(this.get("country")){_29.country=this.get("country");}_29.dataCollections=this.get("dataCollections");if(this.get("showTrafficWidget")&&this._trafficTimeWidget.get("checked")){_29.TimeOfDay=this._trafficTimeWidget.get("timeOfDay");}_29.OutputName=_6.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}});if(this.showChooseExtent){if(this._useExtentCheck.get("checked")){_29.context=_6.toJson({extent:this.map.extent});}}this.getCreditsEstimate(this.toolName,_29).then(_3.hitch(this,function(_2b){this._usageForm.set("content",_2b);this._usageDialog.show();}));},_handleSaveBtnClick:function(){if(!this._form.validate()){return;}this._saveBtn.set("disabled",true);var _2c={},_2d={};_2c.inputLayer=_6.toJson(_23.constructAnalysisInputLyrObj(this.inputLayer));if(this._isBufferSelectionEnabled||this._isLineEnabled){_2c.bufferType=this.get("bufferType");_2c.distance=this.get("distance");_2c.units=this._distanceUnitsSelect.get("value");}if(this.get("country")){_2c.country=this.get("country");}_2c.dataCollections=this.get("dataCollections");if(this.get("showTrafficWidget")&&this._trafficTimeWidget.get("checked")){_2c.TimeOfDay=this._trafficTimeWidget.get("timeOfDay");}_2c.OutputName=_6.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}});if(this.showChooseExtent){if(this._useExtentCheck.get("checked")){_2c.context=_6.toJson({extent:this.map.extent});}}_2d.jobParams=_2c;this._saveBtn.set("disabled",false);_2d.itemParams={"description":_a.substitute(this.i18n.itemDescription,{inputLayerName:this.inputLayer.name}),"tags":_a.substitute(this.i18n.itemTags,{inputLayerName:this.inputLayer.name}),"snippet":this.i18n.itemSnippet};if(this.showSelectFolder){_2d.itemParams.folder=this._webMapFolderSelect.item?this.folderStore.getValue(this._webMapFolderSelect.item,"id"):"";}this.execute(_2d);},_handleDistUnitsChange:function(_2e){this.set("outputLayerName");},_handleDistanceTypeChange:function(_2f){this.set("bufferType",_2f);_f.remove(this._straightLine,"selected");_f.remove(this._drivingTime,"selected");if(_2f){_f.add((_2f==="time")?this._drivingTime:this._straightLine,"selected");if(this.get("showTrafficWidget")){_b.set(this._useTrafficRow,"display",_2f==="time"?"":"none");this._trafficTimeWidget.set("disabled",_2f!=="time");this._trafficTimeWidget.set("reset",_2f!=="time");}}if(_2f==="time"){this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions());this._distanceUnitsSelect.addOption([{value:"Seconds",label:this.i18n.seconds},{value:"Minutes",label:this.i18n.minutes,selected:"selected"},{value:"Hours",label:this.i18n.hours}]);}else{this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions());this._distanceUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Yards",label:this.i18n.yards},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]);}this.set("outputLayerName");},_save:function(){},_buildUI:function(){_23.initHelpLinks(this.domNode,this.showHelp);this._collectionSelect.addOption([{value:"-1",label:this.i18n.selectCountryLabel},{value:"GLOBAL",label:this.i18n.globalCode},{value:"AT",label:this.i18n.austriaCountryCode},{value:"CA",label:this.i18n.canadaCountryCode},{value:"BR",label:this.i18n.brazilCountryCode},{value:"BE",label:this.i18n.belgiumCountryCode},{value:"DK",label:this.i18n.denmarkCountryCode},{value:"FI",label:this.i18n.finlandCountryCode},{value:"FR",label:this.i18n.franceCountryCode},{value:"DE",label:this.i18n.germanyCountryCode},{value:"GR",label:this.i18n.greeceCountryCode},{value:"IN",label:this.i18n.indiaCountryCode},{value:"IE",label:this.i18n.irelandCountryCode},{value:"IT",label:this.i18n.italyCountryCode},{value:"JP",label:this.i18n.japanCountryCode},{value:"LI",label:this.i18n.liechtensteinCountryCode},{value:"LU",label:this.i18n.luxembourgCountryCode},{value:"NL",label:this.i18n.netherlandsCountryCode},{value:"NO",label:this.i18n.norwayCountryCode},{value:"PT",label:this.i18n.portugalCountryCode},{value:"ES",label:this.i18n.spainCountryCode},{value:"SE",label:this.i18n.swedenCountryCode},{value:"CH",label:this.i18n.switzerlandCountryCode},{value:"TR",label:this.i18n.turkeyCountryCode},{value:"GB",label:this.i18n.ukCountryCode},{value:"US",label:this.i18n.usCountryCode}]);this._buildDataSelectUI();if(this.inputLayer){_c.set(this._aggregateToolDescription,"innerHTML",_a.substitute(this.i18n.enrichDefine,{inputLayerName:this.inputLayer.name}));if(this.inputLayer.geometryType==="esriGeometryPolygon"){this._isBufferSelectionEnabled=false;_f.add(this._straightLine,"disabled");_f.remove(this._straightLine,"selected");_f.add(this._drivingTime,"disabled");_f.add(this._straightLineLabel,"disabled");_f.remove(this._drivingTimeLabel,"esriSelectLabel");_f.add(this._distanceInput,"disabled");this._distanceInput.set("disabled",true);_f.add(this._distanceUnitsSelect,"disabled");this._distanceUnitsSelect.set("disabled",true);}if(this.inputLayer.geometryType==="esriGeometryPolyline"){_f.add(this._drivingTime,"disabled");_f.remove(this._drivingTimeLabel,"esriSelectLabel");this._isLineEnabled=true;this._isBufferSelectionEnabled=false;}this._outputLayerInput.set("value",_a.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name}));}this._loadConnections();if(this._isBufferSelectionEnabled||this._isLineEnabled){this._handleDistanceTypeChange("line");}_b.set(this._useTrafficRow,"display",this.get("showTrafficWidget")?"":"none");if(this.outputLayerName){this._outputLayerInput.set("value",this.outputLayerName);}_b.set(this._chooseFolderRow,"display",this.showSelectFolder===true?"block":"none");if(this.showSelectFolder){this.getFolderStore().then(_3.hitch(this,function(_30){this.folderStore=_30;this._webMapFolderSelect.set("store",_30);this._webMapFolderSelect.set("value",this.portalUser.username);}));}if(this.outputLayerName){this._outputLayerInput.set("value",this.outputLayerName);}_b.set(this._chooseExtentDiv,"display",this.showChooseExtent===true?"block":"none");},validateDistance:function(){var _31=this,val,_32=[],_33,_34,_35,v;_33=_f.contains(this._drivingTime,"selected")?"time":"distance";this.set("distance");val=_3.trim(this._distanceInput.get("value"));if(!val){return false;}v=_10.parse(val);if(isNaN(v)){_32.push(0);return false;}_34=_10.format(v,{locale:"en-us"});_35=_3.trim(_34).match(/\D/g);if(_35){_4.forEach(_35,function(m){if(m==="."||m===","){_32.push(1);}else{if(m==="-"&&_31.inputType==="polygon"){_32.push(1);}else{_32.push(0);}}});}if(_4.indexOf(_32,0)!==-1){return false;}return true;},_loadConnections:function(){this._connect(this,"onExecute",_3.hitch(this,"_onClose",false));this._connect(this._closeBtn,"onclick",_3.hitch(this,"_onClose",false));if(this._isBufferSelectionEnabled){_5.connect(this._drivingTime,"onclick",_3.hitch(this,"_handleDistanceTypeChange","time"));_5.connect(this._straightLine,"onclick",_3.hitch(this,"_handleDistanceTypeChange","line"));}},_handleCollectionSelectChange:function(){this._buildDataSelectUI();},_buildDataSelectUI:function(){var _36=this._collectionSelect.get("value"),_37=[];this._dataSelect.removeOption(this._dataSelect.getOptions());if(_36==="-1"){return;}if(_36==="US"){_37=[{value:"Age",label:this.i18n.age},{value:"HouseholdsByIncome",label:this.i18n.householdsByIncome},{value:"HUsByOccupancy",label:this.i18n.husByOccupancy},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"KeyUSFacts",label:this.i18n.keyUSFacts},{value:"Policy",label:this.i18n.policy},{value:"RaceAndEthnicity",label:this.i18n.raceAndEthnicity},{value:"Tapestry",label:this.i18n.tapestry},{value:"Wealth",label:this.i18n.wealth},{value:"Infrastructure",label:this.i18n.infrastructure},{value:"LandCover",label:this.i18n.landCover},{value:"LandscapeFacts",label:this.i18n.landscapeFacts},{value:"PublicLands",label:this.i18n.publicLands},{value:"Soils",label:this.i18n.soils},{value:"WaterWetlands",label:this.i18n.waterWetlands}];}else{if(_36==="CA"){_37=[{value:"Age",label:this.i18n.age},{value:"HouseholdsByIncome",label:this.i18n.householdsByIncome},{value:"HUsByOccupancy",label:this.i18n.husByOccupancy},{value:"keyCanFacts",label:this.i18n.keyCanFacts},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"Policy",label:this.i18n.policy},{value:"RaceAndEthnicity",label:this.i18n.raceAndEthnicity},{value:"Wealth",label:this.i18n.wealth}];}else{if(_36==="AT"){_37=[{value:"ATFacts",label:this.i18n.aTFacts},{value:"ATSpend",label:this.i18n.aTSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="BE"){_37=[{value:"BEFacts",label:this.i18n.bEFacts},{value:"BESpend",label:this.i18n.bESpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="BR"){_37=[{value:"BRFacts",label:this.i18n.bRFacts},{value:"BRSpend",label:this.i18n.bRSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts}];}else{if(_36==="DK"){_37=[{value:"DKFacts",label:this.i18n.dKFacts},{value:"DKSpend",label:this.i18n.dKSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="Fr"){_37=[{value:"FRFacts",label:this.i18n.fRFacts},{value:"FRSpend",label:this.i18n.fRSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="FI"){_37=[{value:"FIFacts",label:this.i18n.fIFacts},{value:"FISpend",label:this.i18n.fISpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="DE"){_37=[{value:"DEFacts",label:this.i18n.dEFacts},{value:"DESpend",label:this.i18n.dESpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="GR"){_37=[{value:"GRFacts",label:this.i18n.gRFacts},{value:"GRSpend",label:this.i18n.gRSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="IN"){_37=[{value:"INFacts",label:this.i18n.iNFacts},{value:"INSpend",label:this.i18n.iNSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts}];}else{if(_36==="IE"){_37=[{value:"IEFacts",label:this.i18n.iEFacts},{value:"IESpend",label:this.i18n.iESpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="IT"){_37=[{value:"ITFacts",label:this.i18n.iTFacts},{value:"ITSpend",label:this.i18n.iTSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="JP"){_37=[{value:"JPFacts",label:this.i18n.jPFacts},{value:"JPSpend",label:this.i18n.jPSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts}];}else{if(_36==="LI"){_37=[{value:"LIFacts",label:this.i18n.lIFacts},{value:"LISpend",label:this.i18n.lISpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="LU"){_37=[{value:"LUFacts",label:this.i18n.lUFacts},{value:"LUSpend",label:this.i18n.lUSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="NL"){_37=[{value:"NLFacts",label:this.i18n.nLFacts},{value:"NLSpend",label:this.i18n.nLSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="NO"){_37=[{value:"NOFacts",label:this.i18n.nOFacts},{value:"NOSpend",label:this.i18n.nOSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="PT"){_37=[{value:"PTFacts",label:this.i18n.pTFacts},{value:"PTSpend",label:this.i18n.pTSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="ES"){_37=[{value:"ESFacts",label:this.i18n.eSFacts},{value:"ESSpend",label:this.i18n.eSSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="SE"){_37=[{value:"SEFacts",label:this.i18n.sEFacts},{value:"SESpend",label:this.i18n.sESpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="CH"){_37=[{value:"CHFacts",label:this.i18n.cHFacts},{value:"CHSpend",label:this.i18n.cHSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="TR"){_37=[{value:"TRFacts",label:this.i18n.tRFacts},{value:"TRSpend",label:this.i18n.tRSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="GB"){_37=[{value:"GBFacts",label:this.i18n.gBFacts},{value:"GBSpend",label:this.i18n.gBSpend},{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}];}else{if(_36==="GLOBAL"){this._dataSelect.addOption([{value:"KeyGlobalFacts",label:this.i18n.keyGlobalFacts},{value:"keyWEFacts",label:this.i18n.keyWEFacts}]);}}}}}}}}}}}}}}}}}}}}}}}}}this._dataSelect.addOption(_37);this._dataSelect.set("value",this._dataSelect.getOptions(0));},_setAnalysisGpServerAttr:function(url){this.analysisGpServer=url;this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName);},_setInputLayerAttr:function(_38){this.inputLayer=_38;},_setDisableRunAnalysisAttr:function(_39){this._saveBtn.set("disabled",_39);},_setShowSelectFolderAttr:function(_3a){this.showSelectFolder=_3a;},_getShowSelectFolderAttr:function(){return this.showSelectFolder;},_setShowChooseExtentAttr:function(_3b){this.showChooseExtent=_3b;},_getShowChooseExtentAttr:function(){return this.showChooseExtent;},_setMapAttr:function(map){this.map=map;},_getMapAttr:function(){return this.map;},_setShowHelpAttr:function(_3c){this.showHelp=_3c;},_getShowHelpAttr:function(){return this.showHelp;},_setShowTrafficWidgetAttr:function(_3d){this.showTrafficWidget=_3d;},_getShowTrafficWidgetAttr:function(){return this.showTrafficWidget;},_setBufferTypeAttr:function(_3e){if(_3e==="line"){this.bufferType="StraightLine";}else{if(_3e==="time"){this.bufferType="DrivingTime";}}},_getBufferTypeAttr:function(){return this.bufferType;},_setDistanceAttr:function(_3f){if(_3f){this.distance=_3f;}},_setShowCreditsAttr:function(_40){this.showCredits=_40;},_getShowCreditsAttr:function(){return this.showCredits;},_getDistanceAttr:function(){this.distance=this._distanceInput.get("value");return this.distance;},_setCountryAttr:function(_41){this.country=_41;},_getCountryAttr:function(){this.country=this._collectionSelect.get("value");if(this.country==="-1"||this.country==="GLOBAL"){return false;}return this.country;},_setDataCollectionsAttr:function(arr){this.dataCollections=arr;},_getDataCollectionsAttr:function(){var _42=this._collectionSelect.get("value");if(_42==="-1"){return [];}this.dataCollections=this._dataSelect.get("value");return this.dataCollections;},validateServiceName:function(_43){var _44=/(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(_43);if(_43.length===0||((_a.trim(_43)).length===0)){this._outputLayerInput.set("invalidMessage",this.i18n.requiredValue);return false;}if(_44){this._outputLayerInput.set("invalidMessage",this.i18n.invalidServiceName);return false;}if(_43.length>98){this._outputLayerInput.set("invalidMessage",this.i18n.invalidServiceNameLength);return false;}return true;},_connect:function(_45,evt,_46){this._pbConnects.push(_5.connect(_45,evt,_46));},onSave:function(){},onClose:function(){}});if(_7("extend-esri")){_3.setObject("dijit.analysis.EnrichLayer",_26,_20);}return _26;});