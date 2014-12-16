var springSystem = new rebound.SpringSystem();

$(document).ready(function($) {
	setupPresentationKeys();
	setupPresentationSprings();
});

setupPresentationKeys = function() {
	$("#keys li").each(function(i, val) {
		$(val).click(function() {
			if (i === 0)
				toggleFullscreen();
			else if (i === 3)
				toggleHand();
		});
	});
	
	$(document).keydown(function(e){
		if (e.keyCode === 70) { // 'F'
			$("#fullscreen-key").addClass("active");
		}
		else if (e.keyCode === 187) { // '='
			$("#plus-key").addClass("active");
		}
		else if (e.keyCode === 189) { // '-'
			$("#minus-key").addClass("active");	
		}
		else if (e.keyCode === 72) { // 'H'
			$("#hand-key").addClass("active");
		}
	});
	
	$(document).keyup(function(e){
		if (e.keyCode === 70) { // 'F'
			$("#fullscreen-key").removeClass("active");
			toggleFullscreen();
		}
		else if (e.keyCode === 187) { // '='
			$("#plus-key").removeClass("active");
		}
		else if (e.keyCode === 189) { // '-'
			$("#minus-key").removeClass("active");
		}
		else if (e.keyCode === 72) { // 'H'
			$("#hand-key").removeClass("active");
			toggleHand();
		}
	});
}

var handVisible = true;
var isFullscreen = false;
var handSpring = springSystem.createSpring();
var fullscreenSpring = springSystem.createSpring();

setupPresentationSprings = function () {
	var hand = $("#screen .hand").get(0);
	handSpring.setSpringConfig(rebound.SpringConfig.fromQcTensionAndFriction(30, 8));
	handSpring.addListener({
	    onSpringUpdate: function (spring) {
	    	var progress = spring.getCurrentValue();
			hand.style['opacity'] = progress;     
		}
	});
	handSpring.setCurrentValue(handVisible);
	
	var phone = $("#screen .phone").get(0);
	var mockup = $("#screen .mockup").get(0);
	var darkening = $("#screen .darkening").get(0);
	fullscreenSpring.setSpringConfig(rebound.SpringConfig.fromQcTensionAndFriction(30, 8));
	fullscreenSpring.addListener({
	    onSpringUpdate: function (spring) {
	    	var progress = spring.getCurrentValue();
	    	var scale = transition(progress, 1, 1.63);
			phone.style['webkitTransform'] = 'scale3d('+scale+', '+scale+', 1.0)';
			phone.style['MozTransform'] = 'scale3d('+scale+', '+scale+', 1.0)'; 
			hand.style['webkitTransform'] = 'scale3d('+scale+', '+scale+', 1.0)';
			hand.style['MozTransform'] = 'scale3d('+scale+', '+scale+', 1.0)';
			mockup.style['webkitTransform'] = 'scale3d('+scale+', '+scale+', 1.0)';
			mockup.style['MozTransform'] = 'scale3d('+scale+', '+scale+', 1.0)';
			darkening.style['webkitTransform'] = 'scale3d('+scale+', '+scale+', 1.0)';
			darkening.style['MozTransform'] = 'scale3d('+scale+', '+scale+', 1.0)';
			darkening.style['opacity'] = progress;
		}
	});
}

toggleHand = function() {
	handVisible = !handVisible;
	handSpring.setEndValue(handVisible);
}

toggleFullscreen = function () {
	isFullscreen = !isFullscreen;
	fullscreenSpring.setEndValue(isFullscreen);
}


// Utilities

transition = function(progress, startValue, endValue) {
	return startValue + (progress * (endValue - startValue));
}