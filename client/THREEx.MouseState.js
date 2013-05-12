// THREEx.KeyboardState.js keep the current state of the keyboard.
// It is possible to query it at any time. No need of an event.
// This is particularly convenient in loop driven case, like in
// 3D demos or games.
//
// # Usage
//
// **Step 1**: Create the object
//
// ```var keyboard	= new THREEx.KeyboardState();```
//
// **Step 2**: Query the keyboard state
//
// This will return true if shift and A are pressed, false otherwise
//
// ```keyboard.pressed("shift+A")```
//
// **Step 3**: Stop listening to the keyboard
//
// ```keyboard.destroy()```
//
// NOTE: this library may be nice as standaline. independant from three.js
// - rename it keyboardForGame
//
// # Code
//

/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * - NOTE: it would be quite easy to push event-driven too
 *   - microevent.js for events handling
 *   - in this._onkeyChange, generate a string from the DOM event
 *   - use this as event name
*/
THREEx.MouseState	= function()
{
	// to store the current state
	this.buttons	= {
		"leftM" : false,
		"middleM" : false,
		"rightM" : false
	};
	this.buttonsClicked = {
		"leftM" : 0,
		"middleM" : 0,
		"rightM" : 0
	}
	
	this.delta = 0
	this.targetX = 0
	this.targetY = 0
	this.lastTargetX = 0
	this.lastTargetY = 0

	//var timers= {};
	// var delays = delays;
	
	// create callback to bind/unbind keyboard events
	var self	= this;
	this.onButtonDown	= function(event){ self._onButtonChange(event, true); };
	this.onButtonUp	= function(event){ self._onButtonChange(event, false);};
	this.onScrollChange = function(event){self._onScrollChange(event);};
	this.onMouseMove = function(event){self._onMouseMove(event);};
	this.onMouseClick = function(event){self._onMouseClick(event);};

	// bind keyEvents
	document.addEventListener("mousedown", this.onButtonDown, false);
	document.addEventListener("mouseup", this.onButtonUp, false);
	document.addEventListener("mousewheel",this.onScrollChange,false);
	document.addEventListener("DOMMouseScroll", this.onScrollChange, false);
	document.addEventListener("mousemove", this.onMouseMove,false);
	document.addEventListener("click",this.onMouseClick,false);
	document.addEventListener("contextmenu",this.onMouseClick,false);
}

/**
 * To stop listening of the keyboard events
*/
THREEx.MouseState.prototype.destroy	= function()
{
	// unbind keyEvents
	document.removeEventListener("mousedown", this.onButtonDown, false);
	document.removeEventListener("mouseup", this.onButtonUp, false);
	document.removeEventListener("mousewheel",this.onScrollChange,false);
	document.removeEventListener("DOMMouseScroll", this.onScrollChange, false)
	document.removeEventListener("mousemove", this.onMouseMove,false);
	document.removeEventListener("click",this.onMouseClick,false);
	document.removeEventListener("contextmenu",this.onMouseClick(),false);
}

/**
 * to process the keyboard dom event
*/
THREEx.MouseState.prototype._onButtonChange	= function(event, pressed)
{
	// log to debug
	//console.log("onKeyChange", event, pressed, event.keyCode, event.shiftKey, event.ctrlKey, event.altKey, event.metaKey)

	// update this.keyCodes
	var buttonCode	= (event || window.event).which;
	var button = null

	if(buttonCode==1){
		button="leftM"
	} else if(buttonCode==2){
		button="middleM"
	} else if(buttonCode==3){
		button="rightM"
	}

	if(button){
		this.buttons[button]	= pressed;
	}

	return false;
	
}

THREEx.MouseState.prototype._onMouseMove = function(event){
	var rect = document.getElementById("cvs").getBoundingClientRect();
	var curX = event.clientX - rect.left
    var curY = event.clientY - rect.top
    this.lastTargetX = this.targetX
    this.lastTargetY = this.targetY
    this.targetX = curX
    this.targetY = curY

    return false;
}

THREEx.MouseState.prototype._onScrollChange = function(event){
	event.preventDefault();
	var curDelta = 0
	if(event.wheelDelta){
		curDelta = event.wheelDelta/120
	} else if(event.detail){
		curDelta = -event.detail/3
	}
	this.delta +=curDelta

	return false;
}

THREEx.MouseState.prototype._onMouseClick = function(event){
	event.preventDefault();
	var buttonCode	= (event || window.event).which;
	var button
	if(!buttonCode){
		buttonCode = (event || window.event).button
	}

	if(buttonCode==1){
		button="leftM"
	} else if(buttonCode==2){
		button="middleM"
	} else if(buttonCode==3){
		button="rightM"
	}

	this.buttonsClicked[button]	+= 1;

	return false;
}

/**
 * query keyboard state to know if a key is pressed of not
 *
 * @param {String} keyDesc the description of the key. format : modifiers+key e.g shift+A
 * @returns {Boolean} true if the key is pressed, false otherwise
*/
THREEx.MouseState.prototype.clicked	= function(button)
{
	var pressedN = 0;
	if( (Object.keys(this.buttonsClicked).indexOf( button ) != -1) ){
		pressedN = this.buttonsClicked[button];
		this.buttonsClicked[button]=0
	}
	return pressedN;
}

THREEx.MouseState.prototype.down = function(button){

	var pressed = false;
	if( (Object.keys(this.buttons).indexOf( button ) != -1) ){
		pressed	= this.buttons[button];
	}
	return pressed;
}

THREEx.MouseState.prototype.getScrollDelta = function(){
	var tmp = this.delta
	this.delta = 0
	return tmp
}

THREEx.MouseState.prototype.getTarget = function(){
	var x = this.targetX
	var y = this.targetY
	return {
		targetX : x,
		targetY : y
	}
}

THREEx.MouseState.prototype.getLastTarget = function(){
	var x = this.lastTargetX
	var y = this.lastTargetY
	return {
		lastTargetX : x,
		lastTargetY : y
	}
}