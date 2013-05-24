/* ------------------------------------------------------------------------------ */
/* init */
/* ------------------------------------------------------------------------------ */
var StaticVideos;

//onFlashVideoEnd
function onFlashVideoEnd(){
	//vars
	var $btnReplay = $('#videoEnd'),
		video = StaticVideos.video1;
	
	//enable btn
	function bindBtnReplay(){
		$btnReplay.one('click', function(e){
			$btnReplay.fadeOut();
			if ( video.solution.tech == 'html5' ) {
				video.player.play();
			} else if ( video.solution.tech == 'flash' ) {
				video.player.playVideo();
			}
		})
	}

	//show end msg and enable btn
	$btnReplay.fadeIn(function(){
		bindBtnReplay();	
	});
}

//init
function init(){
	//init video player
	StaticVideos = new initStaticVideos(); 
	
	//cache video obj
	var video = StaticVideos.video1;
	
	//hide msg end
	$('#videoEnd').hide();
	
	//bind video end event html5
	if ( video.solution.tech == 'html5' ) {
		video.player.addEvent('ended', function(e){
			onFlashVideoEnd();
		});
	}	
}

/* DOM.ready */
$(document).ready(function(){ 
	Platform.addDOMClass();
	init();	
});
