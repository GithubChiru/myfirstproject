sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"

],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,MessageToast) {
		"use strict";

		return Controller.extend("Motor.additional1.controller.Ticketing", {
			onInit: function () {
            
			},
			Tickets:[],
			onClick: function(bEvent)
			 {	
				var oFormField2 = this.getView().byId("input2").mProperties.selectedKey;
				var oFormField3 = this.getView().byId("input3").mProperties.selectedKey;
				var oFormField4 = this.getView().byId("input4").mProperties.selectedKey;
				var oFormField5 = this.getView().byId("input5").getValue();
				if (oFormField2 == "" || oFormField3 == "" || oFormField4 == "" || oFormField5 == 0) {
                    this.getView().byId("input2").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("input3").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("input4").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("input5").setValueState(sap.ui.core.ValueState.Error);

					MessageToast.show( "Please Select Every Field...!");
				}
				else{ 
                       
					var oModel = this.getView().getModel();
				
	
					var modeldata = oModel.oData.tickets;
		
				  modeldata.push({
					"ingrd1": oFormField2,
				
					"ingrd2": oFormField3,
				
					"ingrd3": oFormField4,
					"ingrd4": oFormField5,
					"ingrd5": "Pending"
				});
				 	
				this.getView().getModel().setProperty("/tickets",modeldata);
				  this.getView().byId("input2").setValueState(sap.ui.core.ValueState.Success);
					this.getView().byId("input3").setValueState(sap.ui.core.ValueState.Success);
					this.getView().byId("input4").setValueState(sap.ui.core.ValueState.Success);
					this.getView().byId("input5").setValueState(sap.ui.core.ValueState.Success);

					MessageToast.show( "Ticket generated...!");
			
				} 				
			},


			fieldValidation:function(Event1)
			{
				var oFormField2 = this.getView().byId("input2").mProperties.selectedKey;
				var oFormField3 = this.getView().byId("input3").mProperties.selectedKey;
				var oFormField4 = this.getView().byId("input4").mProperties.selectedKey;
				var oFormField5 = this.getView().byId("input5").getValue();
				oFormField2.setValue("");
				oFormField3.setValue("");
				oFormField4.setValue("");
              
			},

			//for accepting selected tickets
			onAccept:function(oEvent)
			{

				var oModel = this.getView().getModel();
	
				var modeldata = oModel.oData.tickets;
	
			this.getView().getModel().setProperty("/tickets",modeldata);
			var oTable = this.getView().byId("idSimple11");
            var aSelectedItems = oTable.getSelectedContexts();

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


		// to delete selected tickets
			onRowSelect:function(oEvent)
			{
			  
				var oModel = this.getView().getModel();
	
				var modeldata = oModel.oData.tickets;
	
			this.getView().getModel().setProperty("/tickets",modeldata);
			var oTable = this.getView().byId("idSimple");
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
		
		});
	});
