/**
 * @class Application_WidgetDiagram
 * 
 * Draw grid with badge 

 * 
<example>
<div class="x-lprjwdg-gridwbadge" id="grid1">
	<span class="x-lprjelm x-lprjvar-dimgrid">10x10</span>
	<span class="x-lprjelm x-lprjvar-dimbox">10</span>
</div>
</example>
 * 
 */
var Application_WidgetGridwbadge = Object.extend(Application_Widget, {
	
	sWidget: "gridwbadge",
	oElement: null,
	oApplication: null,
	iWidth: 10,
	iHeight: 10,
	iBoxWidth: 10,
	iBoxHeight: 10,
	iBoxPadding: 5,

	aBox: [],
	aBoxActive: [],
	aBoxActiveId: [],
	

	oWrapper: $('<div class="widgetwbadgewrapper"></div>'),

	aExternalCss: ["grid.css"],

		
	constructor: function(oElement, oApplication){
		
		this.oElement = oElement;
		this.oApplication = oApplication;
		this.aBox = [];
		this.aBoxActive = [];
		this.aBoxActiveId = [];
		
	},
	
	startWidget: function(oCallback){
		$(this.oElement).append(this.oWrapper);

		var oData = this.oApplication.oLibClass.Vars.getElementVar(this.oElement);
		if (oData.dimgrid != undefined){
			var aDim = oData.dimgrid.split("x");
			this.iWidth = parseInt(aDim[0]);
			this.iHeight = parseInt(aDim[1]);
		}
		if (oData.dimbox != undefined){
			var aDim = oData.dimbox.split("x");
			this.iBoxWidth = parseInt(aDim[0]);
			this.iBoxHeight = parseInt(aDim[1]);
		}
		
		// Column
		var sColumnString = "";
		for (var i = 0; i < this.iWidth; i++) {
			sColumnString += (this.iBoxWidth + this.iBoxPadding) + "px ";
		}
		this.oWrapper.css("grid-template-columns", sColumnString);
		this.oWrapper.css("grid-gap",this.iBoxHeight+"px");

		this.displayGrid();
		oCallback();
	},

	displayGrid: function (iWidth, iHeight){
		this.oWrapper.html("");
		for (var i=0; i< this.iWidth; i++){
			for (var k=0; k < this.iHeight; k++){
				this.aBox[i+"-"+k] = $("<div>");//.css("grid-column",(i+1)+" / "+(i+2)).css("grid-column",(k+1)+" / "+(k+2));
				this.aBox[i + "-" + k].css("padding", this.iBoxPadding + "px");
				this.aBox[i + "-" + k].css("height", this.iBoxHeight + "px");
				this.aBox[i + "-" + k].addClass("box");
				this.aBox[i + "-" + k].html("&nbsp;");
				this.oWrapper.append(this.aBox[i + "-" + k]);
			}
		}
	},

	fireAction: function(aData){
		this.clear();
		
		console.log(aData);
		this.displayBadgeArray(aData);
	},

	displayBadgeArray: function(aData){
		for (var i=0; i< aData.length; i++){
			this.displayBadge(aData[i]);
		}
	},

	/**
	 * 
	 * @param {*} oData {x,y,color,link} 
	 */
	displayBadge: function(oData){
		if (this.aBox[oData.x+"-"+oData.y] != undefined){
			this.aBox[oData.x + "-" + oData.y].css("background-color", oData.color);
			var sId = this.aBoxActiveId.length;
			if (this.aBoxActive[oData.x + "-" + oData.y] == undefined){
				this.aBoxActive[oData.x + "-" + oData.y] = sId;
				this.aBoxActiveId.push(oData.x + "-" + oData.y);
			}else{
				//Do nothing
			}
			
		}

	},

	clear: function(){
		for (var i = 0; i < this.aBoxActiveId.length; i++){
			console.log(this.aBoxActiveId[i]);
			this.aBox[this.aBoxActiveId[i]].css("background-color", "");
		}
		this.aBoxActive = [];
		this.aBoxActiveId = [];

		
	},
	
	destroy: function(){
		console.log("Destroy called");
		$(this.oElement).empty();
	}

});
