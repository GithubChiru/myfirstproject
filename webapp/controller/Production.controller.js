sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,MessageToast) {
		"use strict";

		return Controller.extend("Motor.additional1.controller.Production", {
			onInit: function () {
                
			},
	    //logout
			onHome:function(oEvent)
			{
			
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteLoginView");
               
			},
			
			onClick: function() {
				
				debugger;
			
				var oModel = this.getView().getModel();
	
				var modeldata = oModel.oData.tickets;

			},

			//tickets popup
			Ticketspopup: null,
 
			onTicket: function(oEvent) {
			   debugger;
		
				if (!this.Ticketspopup) {
 
					this.Ticketspopup = new sap.ui.xmlfragment("Motor.additional1.fragments.Tickets", this);
 
					this.getView().addDependent(this.Ticketspopup);
 
				}
				this.Ticketspopup.open();
 
			},
			
			//code for accepting in popup
			onAccept:function(oEvent)
			{
             
				var oModel = this.getView().getModel();
	
				var modeldata = oModel.oData.tickets;
	
			this.getView().getModel().setProperty("/tickets",modeldata);
			var oTable = sap.ui.getCore().byId("idSimple11");
            var aSelectedItems = oTable.getSelectedItems();

            for(var i=aSelectedItems.length-1; i>=0; i--){ 
            var oItemContextPath = aSelectedItems[i].getBindingContext().getPath()
            var aPathParts = oItemContextPath.split("/");
            var iIndex = aPathParts[aPathParts.length - 1]; 

           var oJSONData = this.getView().getModel().getData();
           oJSONData.tickets[iIndex].ingrd5="Accepted"; 
		 
		   var z=oJSONData.tickets[iIndex].ingrd2;
		   var x=this.getView().getModel().oData.details;
		   for(var i=iIndex;i<x.length;i++)
             {
             if(x[i].prdID==z)
             {
			
				var aProducts=x[iIndex].qnt;
				var rProducts=oJSONData.tickets[iIndex].ingrd4;
				var y=aProducts-rProducts;
                if(aProducts==rProducts || aProducts>rProducts)
				{
                	MessageToast.show( "Tickets are accepted...!");
				    x[i].qnt=y;

					
				}else if(aProducts<rProducts)
				{
					MessageToast.show( "Required no of tickets are not available...!");
					oJSONData.tickets[iIndex].ingrd5="Rejected"; 
				}
             } 
		
			 this.getView().getModel().setData(x);
             }
			 this.getView().getModel().setData(oJSONData);
		 }		
			},
		
			//delete tickets in popup
			onRowSelect:function(oEvent)
			{
			 
			  
				var oModel = this.getView().getModel();
	
				var modeldata = oModel.oData.tickets;
	
			this.getView().getModel().setProperty("/tickets",modeldata);

			var oTable = sap.ui.getCore().byId("idSimple11");
            var aSelectedItems = oTable.getSelectedItems();

            for(var i=aSelectedItems.length-1; i>=0; i--){ 
            var oItemContextPath = aSelectedItems[i].getBindingContext().getPath()
            var aPathParts = oItemContextPath.split("/");
            var iIndex = aPathParts[aPathParts.length - 1]; 

           var oJSONData = this.getView().getModel().getData();
           oJSONData.tickets.splice(iIndex, 1); 
           this.getView().getModel().setData(oJSONData); 
		   MessageToast.show( " Selected tickets are deleted...!");
          }

		
			},
			
			onCloseTickets:function()
			{
				this.Ticketspopup.close();
			}
		});
	});
