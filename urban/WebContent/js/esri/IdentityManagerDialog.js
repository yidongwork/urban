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
define("esri/IdentityManagerDialog",["dojo/_base/kernel","dojo/_base/declare","dojo/_base/config","dojo/_base/Deferred","dojo/_base/lang","dojo/has","dojo/dom-attr","dojo/keys","dojo/i18n","dijit/registry","dijit/Dialog","esri/kernel","esri/lang","esri/domUtils","esri/IdentityManagerBase","dojo/i18n!esri/nls/jsapi","dojo/query","dijit/form/Button","dijit/form/ValidationTextBox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f){var _10=_2([_f],{declaredClass:"esri.IdentityManager",_eventMap:{"dialog-cancel":["info"]},constructor:function(_11){_5.mixin(this,_11);this.registerConnectEvents();},_dialogContent:"<div class='dijitDialogPaneContentArea'>"+"<div style='padding-bottom: 5px; word-wrap: break-word;'>${info}</div>"+"<div style='margin: 0px; padding: 0px; height: 10px;'></div>"+"<div class='esriErrorMsg' style='display: none; color: white; background-color: #D46464; text-align: center; padding-top: 3px; padding-bottom: 3px;'>${invalidUser}</div>"+"<div style='margin: 0px; padding: 0px; height: 10px;'></div>"+"<table style='width: 100%;'>"+"<tr>"+"<td><label>${lblUser}</label><br/>"+"<input data-dojo-type='dijit.form.ValidationTextBox' data-dojo-props='type:\"text\", \"class\":\"esriIdUser\", required:true, trim:true, style:\"width: 100%;\"' /></td>"+"</tr>"+"<tr>"+"<td><label>${lblPwd}</label><br/>"+"<input data-dojo-type='dijit.form.ValidationTextBox' data-dojo-props='type:\"password\", \"class\":\"esriIdPwd\", required:true, style:\"width: 100%;\"' /></td>"+"</tr>"+"</table>"+"</div>"+"<div class='dijitDialogPaneActionBar'>"+"<button data-dojo-type='dijit.form.Button' data-dojo-props='type:\"button\", \"class\":\"esriIdSubmit\"'>${lblOk}</button>"+"<button data-dojo-type='dijit.form.Button' data-dojo-props='type:\"button\", \"class\":\"esriIdCancel\"'>${lblCancel}</button>"+"</div>",onDialogCreate:function(){},onDialogCancel:function(){},signIn:function(_12,_13,_14){if(!this._nls){this._nls=_9.getLocalization("esri","jsapi").identity;}if(!this._loginDialog){this._loginDialog=(this.dialog=this._createLoginDialog());this.onDialogCreate();}var dlg=this._loginDialog,_15=_14&&_14.error,_16=_14&&_14.token,dfd=new _4(function(){dlg.onCancel();});if(dlg.open){var err=new Error("BUSY");err.code="IdentityManager."+1;err.log=_3.isDebug;dfd.errback(err);return dfd;}_e.hide(dlg.errMsg_);if(_15){if(_15.code==403&&_16){_7.set(dlg.errMsg_,"innerHTML",this._nls.forbidden);_e.show(dlg.errMsg_);}}dlg.dfd_=dfd;dlg.serverInfo_=_13;dlg.resUrl_=_12;dlg.admin_=_14&&_14.isAdmin;_7.set(dlg.resLink_,{"title":_12,"innerHTML":"("+(this.getResourceName(_12)||this._nls.lblItem)+")"});_7.set(dlg.serverLink_,{"title":_13.server,"innerHTML":(_13.server.toLowerCase().indexOf("arcgis.com")!==-1?"ArcGIS Online":_13.server)+" "});dlg.txtPwd_.set("value","");dlg.show();return dfd;},_createLoginDialog:function(){var nls=this._nls,_17=_d.substitute(nls,this._dialogContent);_17=_d.substitute({resource:"<span class='resLink' style='word-wrap: break-word;'></span>",server:"<span class='serverLink' style='word-wrap: break-word;'></span>"},_17);var dlg=new _b({title:nls.title,content:_17,"class":"esriSignInDialog",style:"width: 18em;",esriIdMgr_:this,keypressed_:function(evt){if(evt.charOrCode===_8.ENTER){this.execute_();}},execute_:function(){var usr=this.txtUser_.get("value"),pwd=this.txtPwd_.get("value"),dfd=this.dfd_,dlg=this;if(!usr||!pwd){return;}this.btnSubmit_.set("label",nls.lblSigning);var _18=_c.id.findCredential(dlg.resUrl_,usr),_19=function(_1a){dlg.btnSubmit_.set("label",nls.lblOk);dlg.btnSubmit_.set("disabled",false);_e.hide(dlg.errMsg_);dlg.hide();_b._DialogLevelManager.hide(dlg);var _1b=dlg.serverInfo_;dlg.dfd_=dlg.serverInfo_=dlg.generateDfd_=dlg.resUrl_=null;var _1c,_1d,_1e=_18,ssl;if(_1a){_1c=_1a.token;_1d=_d.isDefined(_1a.expires)?Number(_1a.expires):null;ssl=!!_1a.ssl;if(_1e){_1e.userId=usr;_1e.token=_1c;_1e.expires=_1d;_1e.validity=_1a.validity;_1e.ssl=ssl;_1e.creationTime=(new Date()).getTime();}else{_1e=new _f.Credential({userId:usr,server:_1b.server,token:_1c,expires:_1d,ssl:ssl,isAdmin:dlg.admin_,validity:_1a.validity});}}dfd.callback(_1e);};if(_18&&!_18._enqueued){_19();return;}dlg.btnSubmit_.set("disabled",true);dlg.generateDfd_=_c.id.generateToken(this.serverInfo_,{username:usr,password:pwd},{isAdmin:this.admin_}).addCallback(_19).addErrback(function(_1f){dlg.btnSubmit_.set("disabled",false);dlg.generateDfd_=null;dlg.btnSubmit_.set("label",nls.lblOk);_7.set(dlg.errMsg_,"innerHTML",(_1f&&_1f.code)?nls.invalidUser:nls.noAuthService);_e.show(dlg.errMsg_);});},cancel_:function(){if(dlg.generateDfd_){dlg.generateDfd_.cancel();}var dfd=dlg.dfd_,_20=dlg.resUrl_,_21=dlg.serverInfo_;dlg.btnSubmit_.set("disabled",false);dlg.dfd_=dlg.serverInfo_=dlg.generateDfd_=dlg.resUrl_=null;_e.hide(dlg.errMsg_);_b._DialogLevelManager.hide(dlg);dlg.esriIdMgr_.onDialogCancel({resourceUrl:_20,serverInfo:_21});var err=new Error("ABORTED");err.code="IdentityManager."+2;err.log=_3.isDebug;dfd.errback(err);}});var _22=dlg.domNode;dlg.txtUser_=_a.byNode(_1.query(".esriIdUser",_22)[0]);dlg.txtPwd_=_a.byNode(_1.query(".esriIdPwd",_22)[0]);dlg.btnSubmit_=_a.byNode(_1.query(".esriIdSubmit",_22)[0]);dlg.btnCancel_=_a.byNode(_1.query(".esriIdCancel",_22)[0]);dlg.resLink_=_1.query(".resLink",_22)[0];dlg.serverLink_=_1.query(".serverLink",_22)[0];dlg.errMsg_=_1.query(".esriErrorMsg",_22)[0];dlg.connect(dlg.txtUser_,"onKeyPress",dlg.keypressed_);dlg.connect(dlg.txtPwd_,"onKeyPress",dlg.keypressed_);dlg.connect(dlg.btnSubmit_,"onClick",dlg.execute_);dlg.connect(dlg.btnCancel_,"onClick",dlg.onCancel);dlg.connect(dlg,"onCancel",dlg.cancel_);return dlg;}});if(_6("extend-esri")){_c.IdentityManagerDialog=_c.IdentityManager=_10;}return _10;});