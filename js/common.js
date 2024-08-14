$(function(){
	history.scrollRestoration = "manual";
	tl = TweenMax;
    customCursorJS();
    splitJS();
	motionLogo();
});
function customCursorJS(){
	var $cursor_primary = $('#custom-cursor');
	var $circle = $cursor_primary.find('.custom-cursor__circle');
	var $cursor_secondary = $('#custom-cursor-text');
	var $cursor_txt = $cursor_secondary.find('.custom-cursor-text__txt');


	$('body').mousemove(function(e) {
	tl.to($cursor_primary, 0.7, {opacity:1, x: e.clientX,y: e.clientY,ease: Power3.easeOut});
		TweenMax.to($cursor_primary, 0.3, {x: e.clientX,y: e.clientY,ease: Power3.easeOut});
		TweenMax.to($cursor_secondary, 0.5, {x: e.clientX,y: e.clientY,ease: Power3.easeOut});
	});
	

	$(document).on('mouseenter', 'button, a, .mouse-hv', function(){
		var $this = $(this);
		var words = ( $this.data('hover') != undefined ) ? $this.data('hover') : '';
		var size = ( $this.data('size') != undefined ) ? $this.data('size') : '100%';

		if( $this.hasClass('drag') ){
			$cursor_primary.addClass('drag');
			$cursor_secondary.addClass('drag');
		}

		$cursor_txt.find('> span').text( words );
		TweenMax.killTweensOf($circle);
		TweenMax.killTweensOf($cursor_txt);
		TweenMax.to($circle, .3, {width: size,height: size,autoAlpha: 1,ease: Power0.easeNone});
		TweenMax.to($cursor_txt, .5, {width: size,height: size,autoAlpha: 1,ease: Power0.easeNone});
	});

	$(document).on('mouseleave', 'button, a, .mouse-hv', function(){
		var $this = $(this);

		if( $this.hasClass('drag') ){
			$cursor_primary.removeClass('drag');
			$cursor_secondary.removeClass('drag');
		}

		TweenMax.killTweensOf($circle);
		TweenMax.killTweensOf($cursor_txt);
		TweenMax.to($circle, .3, {width: '15px',height: '15px',ease: Power0.easeNone});
		TweenMax.to($cursor_txt, 0, {width: '0%',height: '0%',autoAlpha: 0,ease: Power0.easeNone});
	});
}

function splitJS(){
	var splitText = document.querySelector('.split-text').textContent;
    var container = document.querySelector('.split-text');

    container.innerHTML = '';

    for (var i = 0; i < splitText.length; i++) {
        var span = document.createElement('span');
        span.textContent = splitText[i];
        container.appendChild(span);
    }
}
function motionLogo() {
    var animation = gsap.timeline();

    var logo = document.querySelector('.header__logo');

    animation.staggerFromTo(".header__logo span", 0.8, { y: '100%',  }, { y: '0%',force3D: false ,ease: Power2.easeInOut }, 0.05);

   /* logo.addEventListener('mouseenter', () => {
		var animation2 = gsap.timeline(); 
        animation2
            .staggerFromTo(".header__logo span", 0.8, { y: '0%' }, { y: '-100%', delay:'-0.1', ease: Power2.easeInOut }, 0.05)
            .staggerFromTo(".header__logo span", 0.8, { y: '100%' }, { y: '0%', delay:'-0.2', ease: Power2.easeInOut }, 0.05);
    });*/
	
	
}
