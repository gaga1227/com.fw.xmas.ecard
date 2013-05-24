/* ------------------------------------------------------------------------------ */
/* common - debug - log */
/* ------------------------------------------------------------------------------ */
if(!window.console){console={log:function(a){alert(a)}}};
/* ------------------------------------------------------------------------------ */
/* common - debug - displayDebugInfo */
/* ------------------------------------------------------------------------------ */
function displayDebugInfo(debug){
	
	//vars
	var $debug = $(debug),
		$html = $('html'),
		on = '',
		toggle = function() {
			if ( on == 'true' ) {
				$debug.css('opacity', '1');
				$html.addClass('debug');	
			} else {
				$debug.css('opacity', '0');
				$html.removeClass('debug');
			}
		},
		update = function(){
			$debug.attr('data-width',$(window).width());
			on = $debug.attr('data-on');
			toggle();
		};
	
	//init and bind event
	$debug.on('click', function(e){
		e.preventDefault();
		var state = '';
		( on == 'true' ) ? state = 'false' : state = 'true';
		$debug.attr('data-on', state);
		update();
	});
	
	//init
	update();
	$(window).bind('resize', update);
		
}
/* ------------------------------------------------------------------------------ */
/* common - get Platform */
/* ------------------------------------------------------------------------------ */
var Platform = new function(){
	//detecting functions
	function checkPlatform(os) { return (navigator.userAgent.toLowerCase().indexOf(os.toLowerCase())>=0); }
	function checkEvent(e) { return (e in document.documentElement); }
	//add properties
	this.iPhone = checkPlatform('iPhone');
	this.iPad = checkPlatform('iPad');
	this.iPod = checkPlatform('iPod');
	this.iOS = this.iPhone||this.iPad||this.iPod;
	this.android = checkPlatform('android');
	this.touchOS = checkEvent('ontouchstart');
	this.addDOMClass = function(){
		var $html = $('html'),
			cls = '';
		if ( this.iPhone )	cls = 'iPhone';
		if ( this.iPad )	cls = 'iPad';
		if ( this.iPod )	cls = 'iPod';
		if ( this.iOS )		cls = 'iOS';
		if ( this.android )	cls = 'android';
		$html.addClass(cls);
	}
	this.debugLog = function(){
		console.log('iPhone: '+this.iPhone);
		console.log('iPad: '+this.iPad);
		console.log('iPod: '+this.iPod);
		console.log('iOS: '+this.iOS);
		console.log('android: '+this.android);
		console.log('touchOS: '+this.touchOS);
	}
	//css3 transition end event
	this.transEndEventNames = {
		'WebkitTransition' : 'webkitTransitionEnd',
		'MozTransition'    : 'transitionend',
		'OTransition'      : 'oTransitionEnd',
		'msTransition'     : 'MSTransitionEnd',
		'transition'       : 'transitionend'
	}
	//this.transEndEventName = this.transEndEventNames[ Modernizr.prefixed('transition') ];
	
	//return self
	return this;
}
/* ------------------------------------------------------------------------------ */
/* common - mqStates */
/* ------------------------------------------------------------------------------ */
var mqStates = {
	max960:	'only screen and (max-width:960px)',
	max800:	'only screen and (max-width:800px)',
	max640:	'only screen and (max-width:640px)',
	max500:	'only screen and (max-width:500px)',
	max400:	'only screen and (max-width:400px)',
	max320:	'only screen and (max-width:320px)'
}
/* ------------------------------------------------------------------------------ */
/* common - insert First and Last Child */
/* ------------------------------------------------------------------------------ */
function insertFirstLastChild(selection) {
	var $tgts = $(selection);//cache selection
	if (!$tgts.length) return false;//cancel if no target found
	$.each($tgts,function(idx,ele){//go through all selected items
		var $ele = $(ele),//cache current item
			$fstChild = $ele.find('> :first-child'),//find and cache first-child
			$lstChild = $ele.find('> :last-child');//find and cache last-child
		//add class if not already
		if (!$fstChild.hasClass('first-child')) { $fstChild.addClass('first-child'); }
		if (!$lstChild.hasClass('last-child')) { $lstChild.addClass('last-child'); }
	});	
}
/* ------------------------------------------------------------------------------ */
/* common - initCSS3PIE */
/* ------------------------------------------------------------------------------ */
function initCSS3PIE() {
	var oldIE = $('html').hasClass('oldie'),
		triggerCLS = 'css3pie';
	if ( oldIE && window.PIE ) {
		$.each( $('.' + triggerCLS), function(idx, ele){
			PIE.attach(ele);
		});
	} else {
		return false;	
	}
}
/* ------------------------------------------------------------------------------ */
/* common - cssAnim (working specifically with animate.css) */
/* ------------------------------------------------------------------------------ */
function cssAnim(target,anim) {
	if ( !Modernizr.cssanimations || !target.length || !anim ) return false;
	var $target = target,
		animCls = anim,
		scopeCls = 'animated',
		cleanTarget = function(){ $target.removeClass(scopeCls).removeClass(animCls); },
		updateTarget = function(){ cleanTarget(); $target.addClass(scopeCls).addClass(animCls); },
		delay;
	updateTarget();
	delay = window.setTimeout( function(){ cleanTarget() }, 1300 );
}