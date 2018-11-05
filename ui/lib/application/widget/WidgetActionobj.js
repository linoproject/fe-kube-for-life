/**
 *
 * @class Application_WidgetActionobj
 * 
 * @description
 * Execute actions when fire action is called. 
 * Multiple actions must use '|' as separation mark and 
 * Notes: 
 * - Async fired objects methods will not handled.
 * - If you want to sequence multiple async action you must use another Widget like this
 * 
 * @param x-lprjelm define the single action defined with x-lprjvar
 * 
<example>
<span class="x-lprjwdg-actionobj" id="wdgAction1">
	<span class="x-lprjelm x-lprjvar-Action1">Application_index.action(0)|Application2_index.action(1)|...</span> 
</span>
</example>
 *
 * 
 * 
 */
var Application_WidgetActionobj = Object.extend(Application_Widget, {
	
	sWidget: "actionobj",
	oElement: null,
	oApplication: null,
	
	
	oActions : {},
	
	constructor: function(oElement, oApplication){
		
		this.oElement = oElement;
		this.oApplication = oApplication;
		
		if (this.oApplication.bDebug){
			this.oApplication.writeDebugMsg("Init Actions");
		}
	},
	
	startWidget: function(oCallback){
		
		if (this.oApplication.bDebug){
			this.oApplication.writeDebugMsg("Instantiate and place action hooks");
		}
		
		// Catch action
		this.oActions =  this.oApplication.oLibClass.Vars.getElementVar(this.oElement);
		
		oCallback();
	},
	
	
	fireAction: function(sWidgetSubAction){
		
		
		
		if (this.oApplication.bDebug){
			this.oApplication.writeDebugMsg("Fire action object");
		}

		this.oApplication.oLibClass.Action.evalMultipleActionsSub(this.oApplication, this.oActions,sWidgetSubAction );

	},
	
	
});
