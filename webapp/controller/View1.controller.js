sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageToast'
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,MessageToast) {
		"use strict";

		return Controller.extend("Motor.additional1.controller.View1", {
			onInit: function () {
				var model3 = new sap.ui.model.json.JSONModel({ tableItem: [] });
                this.getOwnerComponent().setModel(model3, "model3");
			},
			//to store values of piechart global
			onBeforeRendering:function()
			{
				var model11 = new sap.ui.model.json.JSONModel({ pieChartValues: [] });
				this.getOwnerComponent().setModel(model11, "model11");
			},
			//to set default data for details page items
			onAfterRendering:function()
			{
				debugger
				var s=this.getView().getModel();
				var d=s.oData.details;

				var sItems=[],
			  sItems= d.slice(0,5);

			  var model2 = new sap.ui.model.json.JSONModel({ selectedItem:sItems});
			  this.getOwnerComponent().setModel(model2, "model2");

			},
			// for logout
			onHome1:function()
			{
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteLoginView");
               
			},


			// for livesearch items in master page
			onSearch:function(oEvent)
			{
               var searchStr=oEvent.getParameter("query");
			   if(!searchStr)
			   {
				 searchStr=oEvent.getParameter("newValue");
			   }
			  var oFilter=new sap.ui.model.Filter(
				  "name",
				  sap.ui.model.FilterOperator.Contains,
				  searchStr);

				  var aFilter=[oFilter];
				  var oList=this.getView().byId("idList");
				  oList.getBinding("items").filter(aFilter);
			},
			//select items in details page to send billing
			onSelectItems: function(oEvent) {
				 var oListItem = oEvent.getParameter("listItem");
				 var arrData = this.getView().getModel().getProperty("/details");
				 var selectedItem = oListItem.mProperties.title;
				 var item = arrData.filter(element => {
 
						 if (element.name == selectedItem) {
							 return element;
						 }
 
					 })
				 var model = new sap.ui.model.json.JSONModel({ selectedItem: item });
				 this.getOwnerComponent().setModel(model, "model2");
			 },

			//popup code for details
			 DetailsPopup: null,
			 onRequest: function(oEvent) {
				 var tObject = oEvent.getSource().getBindingContext("model2");
				 var arr = [];
				 arr.push(tObject.getObject());
 
  
				 if (!this.DetailsPopup) {
  
					 this.DetailsPopup = new sap.ui.xmlfragment("Motor.additional1.fragments.Details", this);
  
					 this.getView().addDependent(this.DetailsPopup);
  
				 }
				 this. DetailsPopup.open();
				 var model4 = new sap.ui.model.json.JSONModel({ tableItem: arr });
				 this.getOwnerComponent().setModel(model4, "model4");
  
			 },

            //code for billing popup
			 billPopup: null,
			 arr:[],
			 arr2:[],
             total:0,
			 lastSold:[],
			 onBill: function() {
				 debugger;

				if (this.getView().getModel("model3").getProperty("/tableItem").length >= 1)
				 {
                    this.arr = this.getView().getModel("model3").getProperty("/tableItem");
                }
  
				if (this.getView().getModel("model11").getProperty("/pieChartValues").length >= 1)
				 {
                    this.arr2=this.getView().getModel("model11").getProperty("/pieChartValues");
                }
				
				// this.getView().getModel().setProperty("/motors1",this.arr2);
				 var tObject = this.getView().byId("tabId").getSelectedContexts("model2");
				
				 for (var i = 0; i < tObject.length; i++) {
					 this.arr.push(tObject[i].getObject());
					 this.total += Number(tObject[i].getObject().price);
				 }
             
				 var model3 = new sap.ui.model.json.JSONModel({ tableItem: this.arr });
				 this.getOwnerComponent().setModel(model3, "model3");

				 var y=this.getView().getModel("model3").oData.tableItem;
				 this.lastSold= y.slice((y.length - 3), y.length);

				var model8 = new sap.ui.model.json.JSONModel({ lastSoldProducts: this.lastSold});
                this.getOwnerComponent().setModel(model8, "model8");

				 var model7 = new sap.ui.model.json.JSONModel({ totalAmount: this.total });
                this.getOwnerComponent().setModel(model7, "model7");

				// this code for quantity of items to show in pie chart
				var Arraychart = [];
                for (var i = 0; i < this.arr.length; i++) {
                    Arraychart.push(this.arr[i].name)
                }
                const counts = {};
                Arraychart.forEach(function(x) { counts[x] = (counts[x] || 0) + 1; });
				var arr5=[];
				arr5.push(counts);

				var x=arr5[0].Scooty;
				var y=arr5[0].Regular;
				var z=arr5[0].Sports;
				this.arr2.push({
					"name":"Scooty",
					"qnt":x
				},
				{
					"name":"Regular",
					"qnt":y
				},
				{
					"name":"Sports",
					"qnt":z
				});
					
					var model11 = new sap.ui.model.json.JSONModel({ pieChartValues: this.arr2 });
					this.getOwnerComponent().setModel(model11, "model11");
					
			 },

			 //code for adding accessories for total price
			 accessory:0,
			 handleSelectionFinish:function(oEvent1)
			 {
				 debugger;
				var selectedItems = oEvent1.getParameter("selectedItems");
				for(var i=0;i<selectedItems.length;i++)
				{
					var x=Number(selectedItems[i].mProperties.key);
					this.accessory=this.accessory+x;
				}	
	
				this.total=this.total+this.accessory;
				var model7 = new sap.ui.model.json.JSONModel({ totalAmount: this.total });
                this.getOwnerComponent().setModel(model7, "model7");

			 },

			 onCloseDetails:function()
			 {
				 this.DetailsPopup.close();
			 },
	

			// for generating pdf
			 printPDF:function()
			{

			  var model3=this.getView().getModel("model3");
				var printdata2 = model3.oData.tableItem[0].name;
				var printdata3 = model3.oData.tableItem[0].item;

				var printdata4 = model3.oData.tableItem[0].price;

				var printdata5 = model3.oData.tableItem[0].color;

				var printdata6 = model3.oData.tableItem[0].Desc;
			
                var today1 = new Date();
                var day = today1.getDate(),
                    month = today1.getMonth() + 1,
                    year = today1.getFullYear();
                if (day < 10) {
                    day = '0' + day
                }
                if (month < 10) {
                    month = '0' + month
                }
                today1 = year + '-' + month + '-' + day;
                var todaysdate = today1;

                var doc = new jsPDF();
                doc.rect(5, 6, 203, 50);

                doc.line(5, 225, 205, 225)
                doc.setFontSize(15);
                doc.text(30, 280, 'thank you');
                doc.setFontSize(20);
                doc.setFontSize(25);
                doc.text(60, 35, 'Invoice');
                doc.setFontSize(14);

                doc.text(145, 25, 'Date:');
                doc.text(165, 25, todaysdate);
                doc.setFontSize(23);
                doc.setFontSize(18);
              
                doc.text(20, 85, 'Name');
                doc.text(70, 85, ':');
                doc.text(80, 85, printdata2);
                doc.text(20, 100, 'Model');
                doc.text(70, 100, ':');
                doc.text(80, 100, printdata3);
                doc.text(20, 115, 'Price');
                doc.text(70, 115, ':');
                doc.text(80, 115, printdata4);
                doc.text(20, 130, 'Color');
                doc.text(70, 130, ':');
                doc.text(80, 130, printdata5);
                doc.text(20, 145, 'Description');
                doc.text(70, 145, ':');
                doc.text(80, 145, printdata6);
                doc.save("invoice.pdf");
  
			},
		    
		   // generate tickets
			onRowSelect:function(oEvent)
			{
			  
				var oModel = this.getView().getModel();
	
				var modeldata = oModel.oData.tickets;
	
			this.getView().getModel().setProperty("/tickets",modeldata);

			  var oSimple=this.getView().byId("idSimple");
			  var aSelectedItems = oSimple.getSelectedItems();
	 
			   for(var i=0; i<aSelectedItems.length; i++){
				oSimple.removeItem(aSelectedItems[i])
				 }

			},
			
		});
	});
