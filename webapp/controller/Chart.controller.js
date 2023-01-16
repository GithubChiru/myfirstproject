sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("Motor.additional1.controller.Chart", {
			onInit: function () {
	

			},
			onItems:function()
			{
				this.getView().getModel("model4");
			}
			
		});
	});
