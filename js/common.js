$(function () {
	//s:setup
	history.scrollRestoration = "manual";

	const getDeviceType = () => {
		let width = window.innerWidth;
		if (width >= 1280) return "pc";
		if (width >= 768) return "tablet";
		return "mobile";
	};
	let currentDeviceType = getDeviceType();
	//scroll 위치 저장
	const saveScrollPosition = () => {
		localStorage.setItem("scrollPosition", window.scrollY);
	};
	window.addEventListener("resize", () => {
		const newDeviceType = getDeviceType();
		if (newDeviceType !== currentDeviceType) {
			saveScrollPosition(); //스크롤 위치 저장
			location.reload(); //페이지 새로고침
		}
	});
	//scroll 위치 복구
	window.addEventListener("load", () => {
		const savedScrollPosition = localStorage.getItem("scrollPosition");
		if (savedScrollPosition !== null) {
			window.scrollTo(0, parseInt(savedScrollPosition));
			localStorage.removeItem("scrollPosition");
		}
	});

	tl = TweenMax;

	//현재 연도 표기
	document.querySelectorAll(".current-year").forEach(el => {
		el.textContent = new Date().getFullYear();
	});
	//Lenis js
	const lenis = new Lenis();
	let lastScroll = 0;
	let scrollTimer;

	lenis.on('scroll', (e) => {
		document.body.classList.remove('scrolled-init');
		if (e.scroll > 0) {
			document.body.classList.add('scrolled');
		} else {
			document.body.classList.remove('scrolled');
		}
		if (e.scroll > lastScroll) {
			document.body.classList.add('scrolled-down');
			document.body.classList.remove('scrolled-up');
		} else {
			document.body.classList.add('scrolled-up');
			document.body.classList.remove('scrolled-down');
		}
		lastScroll = e.scroll;
		document.body.classList.add('scrolling');
		clearTimeout(scrollTimer);
		scrollTimer = setTimeout(() => {
			if (!gnb.matches(':hover')) {
				document.body.classList.remove('scrolling');
			}
		}, 2000);
	});

	//s:gnb
	const gnb = document.querySelector('.gnb');
	gnb.addEventListener('mouseenter', () => {
		clearTimeout(scrollTimer);
	});
	gnb.addEventListener('mouseleave', () => {
		scrollTimer = setTimeout(() => {
			if (!gnb.matches(':hover')) {
				document.body.classList.remove('scrolling');
			}
		}, 2000);
	});
	//e:gnb

	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}
	requestAnimationFrame(raf);
	//e:setup

	//js
	headerJS();
	gnbJS();
	customCursorJS();
	splitJS();
	animationJS();
	footerJS();
	//motionLogo();
});
////////////////////////////////////////////////////////////////////////////////////

function headerJS() {
	document.querySelectorAll("nav.gnb li a").forEach(anchor => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			let targetId = this.getAttribute("href").substring(1);
			let targetSection = document.getElementById(targetId);
			//현재 스크롤 위치 좌표
			let scrollToPosition = window.scrollY + targetSection.getBoundingClientRect().top;
			//console.log(scrollToPosition);
			window.scrollTo({
				top: scrollToPosition,
				behavior: "smooth"
			});
		});
	});
}
function gnbJS(){
	const gnbBtn = document.querySelector('.gnb__btn');
	const headerGnb = document.querySelector('.gnb__menu');
	
	gnbBtn.addEventListener('click', () => {
		const isOpen = headerGnb.classList.toggle('show');
	  
		gnbBtn.textContent = isOpen ? '( CLOSE )' : '( MENU )';
	  
		if (isOpen) {
		  const tl = gsap.timeline();
		  tl.fromTo(
			".gnb li",
			{ opacity: 0, y: 10 },
			{ opacity: 1, y: 0, ease: Power1.easeInOut, stagger: 0.1 }
		  );
		}
	  });
}

function customCursorJS() {
	const $cursor_primary = $('#custom-cursor');
	const $circle = $cursor_primary.find('.custom-cursor__circle');
	const $cursor_secondary = $('#custom-cursor__text');
	const $cursor_txt = $cursor_secondary.find('.custom-cursor__text__txt');
	const $cursor_secondary2 = $('#custom-cursor__img');
	const $cursor_img = $cursor_secondary2.find('.custom-cursor__img__src');
	let hoverTimer; // 타이머 
	// mousemove
	$('body').mousemove(function (e) {
		TweenMax.to($cursor_primary, 0.3, { opacity: 1, x: e.clientX, y: e.clientY, ease: Power3.easeOut });
		TweenMax.to($cursor_secondary, 0.5, { x: e.clientX, y: e.clientY, ease: Power3.easeOut });
		TweenMax.to($cursor_secondary2, 1, { x: e.clientX + 100, y: e.clientY - 100, ease: Power3.easeOut });
	});

	// [common] mouseenter 
	$(document).on('mouseenter', 'button, a, .mouse-hv', function () {
		const $this = $(this);
		const words = $this.data('hover') || '';
		const size = $this.data('size') || '100%';
		$cursor_txt.find('> span').text(words);
		TweenMax.to($circle, 0.3, { width: size, height: size, autoAlpha: 1, ease: Power0.easeNone });
		TweenMax.to($cursor_txt, 0.7, { width: size, height: size, autoAlpha: 1, ease: Power0.easeNone });
	});
	// [common] mouseleave
	$(document).on('mouseleave', 'button, a, .mouse-hv', function () {
		$cursor_txt.find('> span').text('');
		TweenMax.to($circle, 0.3, { width: '15px', height: '15px', ease: Power0.easeNone });
		TweenMax.to($cursor_txt, 0, { width: '0%', height: '0%', autoAlpha: 0, ease: Power0.easeNone });
	});
	// [.hover-image-cursor] mouseenter
	$(document).on('mouseenter', '.hover-image-cursor', function () {
		const $this = $(this);
		const imgs = $this.data('hoverimg') || '';
		const alt = $this.data('hoveralt') || '';
		const size = $this.data('size') || '100%';
		$cursor_secondary2.addClass('in-view');
		$cursor_img.find('> img').attr({ src: imgs, alt: alt });

		clearTimeout(hoverTimer);
		hoverTimer = setTimeout(() => {
			$cursor_img.find('.background').stop(true, true).fadeIn(200).css('background-image', `url(${imgs})`);
		}, 500);
		TweenMax.to($cursor_img, 0, { opacity: 1, width: size, height: size, autoAlpha: 1, ease: Power0.easeNone });
	});
	// [.hover-image-cursor] mouseleave
	$(document).on('mouseleave', '.hover-image-cursor', function () {
		clearTimeout(hoverTimer);
		$cursor_secondary2.removeClass('in-view');
		$cursor_img.find('> img').attr({ src: '../img/no-img.png', alt: '' });
		TweenMax.to($cursor_img, 0, { autoAlpha: 0, ease: Power0.easeNone });
	});

	//drag
	$(document).on('mouseenter', '.drag', function () {
		$cursor_primary.addClass('drag');
		$cursor_secondary.addClass('drag');
		$cursor_secondary2.addClass('drag');
	});
	$(document).on('mouseleave', '.drag', function () {
		$cursor_primary.removeClass('drag');
		$cursor_secondary.removeClass('drag');
		$cursor_secondary2.removeClass('drag');
	});

	// TweenMax.killTweensOf
	TweenMax.killTweensOf($circle);
	TweenMax.killTweensOf($cursor_txt);
	TweenMax.killTweensOf($cursor_img);

}

function splitJS() {
	var containers = document.querySelectorAll('.split-text');

	containers.forEach(function (container) {
		var splitText = container.textContent;
		container.innerHTML = '';

		for (var i = 0; i < splitText.length; i++) {
			var span = document.createElement('span');
			span.textContent = splitText[i];
			container.appendChild(span);
		}
	});
}

function motionLogo() {
	var animation = gsap.timeline();
	var logo = document.querySelector('.header__logo');
	animation
		.staggerFromTo(".header__logo a", 0, { opacity: 0 }, { opacity: 1 })
		.staggerFromTo(".header__logo span", 0.8, { y: '200%', }, { y: '0%', force3D: false, ease: Power2.easeInOut }, 0.05);
}


function animationJS() {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("in-view");
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.2
	});

	document.querySelectorAll('.ani').forEach(el => observer.observe(el));
}

function footerJS() {
	const root = document.documentElement;
	const footer = document.querySelector("footer");
	const bg = footer.querySelector(".bg");

	let footerTimeline; 

	const updateFooterHeight = () => {
		const height = footer.offsetHeight;
		root.style.setProperty('--footer-height', `${height}px`);

		if (footerTimeline) footerTimeline.kill();

		footerTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: "#container",
				start: "bottom bottom",
				end: `+=${height}`,
				scrub: true,
				scroller: window,
			}
		});
		footerTimeline.to(footer, {y:'0vh'});
	};

	updateFooterHeight();
	window.addEventListener('resize', updateFooterHeight);
	new ResizeObserver(() => updateFooterHeight()).observe(footer);
}