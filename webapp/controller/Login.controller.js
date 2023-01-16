sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("Motor.additional1.controller.Login", {
			onInit: function () {

			},

			//login code
			onLogin:function()
			{
				debugger;
				var userName = this.getView().byId("input0").getValue();
                var Password = this.getView().byId("input1").getValue();

				if (userName == "" || Password == "") {
                    this.getView().byId("input0").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("input1").setValueState(sap.ui.core.ValueState.Error);
				}else{
				if (userName == "seller" && Password == 123) {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteView1");
                } 
				else if(userName == "user" && Password == 143)
				{
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteProductionView");
				}
			}
			
			},
			//login username
			 onUsername: function() {
                debugger
                var user = this.getView().byId("input0").getValue();
                if (user!="" && user=="seller" ||user=="user") {
                    this.getView().byId("input0").setValueState(sap.ui.core.ValueState.Success);
                } else {
                    this.getView().byId("input0").setValueState(sap.ui.core.ValueState.Error);
                }
            },

			//login password
			onPassword: function() {
                debugger
                var pass = this.getView().byId("input1").getValue();
                if (pass!=0 && pass==143 || pass==123 ) {
                    this.getView().byId("input1").setValueState(sap.ui.core.ValueState.Success);
                } else {
                    this.getView().byId("input1").setValueState(sap.ui.core.ValueState.Error);
                }
            }
			
		});
	});
