function resizeHeight() {
    const windowHeight = window.innerHeight;
    document.querySelector(".home__sticky").style.height = `${windowHeight}px`;
}

window.addEventListener("resize", resizeHeight);
resizeHeight();

$(function(){
    //ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline()
    .add([
        gsap.fromTo(".intro-bg", {opacity:1}, {opacity:0, display:'none', ease: Power1.easeInOut, duration: 0.8}),
        gsap.fromTo(".home__letter > *", {opacity:0, y:'30px'}, {opacity:1,y:'0%', delay:'.5',  duration: 0.5}),
    ]);
    gsap.timeline().staggerFromTo(".header__logo .split-text span", 1, 
        {opacity:0, y: '0%',}, 
        {opacity:1, y: '0%',delay:.5,force3D: false ,ease: Power1.easeInOut,
        
    },.05);


    //home
    gsap.timeline()
    .fromTo(".home .stemp__item.center .stemp__act", 1, {y: '-30%',rotateY:'-180deg'}, { y: '0%',rotateY:'0deg',delay:'.1', force3D: false ,ease: Power1.easeInOut});
    gsap.timeline().fromTo(".home .stemp__item:nth-child(1) .stemp__item--front", 1, {scale:0,y: '-30%', x: '200%',rotate:'-60deg'}, {scale:1, y: '0%',x: '0%',rotate:'0deg',delay:0.2, force3D: false ,});
    gsap.timeline().fromTo(".home .stemp__item:nth-child(2) .stemp__item--front", 1, {scale:0,y: '-30%', x: '200%',rotate:'-60deg'}, {scale:1, y: '0%',x: '0%',rotate:'0deg',delay:0.2,force3D: false ,});
    gsap.timeline().fromTo(".home .stemp__item:nth-child(4) .stemp__item--front", 1, {scale:0,y: '-30%', x: '-200%',rotate:'60deg'}, {scale:1, y: '0%',x: '0%',rotate:'0deg',delay:0.2,force3D: false ,});
    gsap.timeline().fromTo(".home .stemp__item:nth-child(5) .stemp__item--front", 1, {scale:0,y: '-30%', x: '-200%',rotate:'60deg'}, {scale:1, y: '0%',x: '0%',rotate:'0deg',delay:0.2,force3D: false ,});
    
    const parentWidth = document.querySelector(".home .stemp__item.center").offsetWidth;
    const homeTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".home",
            scroller: window,
            scrub: 1,
            pin: true,
            pinSpacing: false, 
            anticipatePin: 1,
            end: "bottom+=500% bottom",
        },
    });
    
    homeTimeline
    .to(".header__logo", {
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: 1,
            start: "top top",
            end:"+=50%",
        },
        scale: 1,
        y:'0px',
        force3D: false,
    })
    .to(".home__letter", {
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: 1,
            start: "top top",
            end:"+=30%",
        },
        opacity:0,
        force3D: false,
    })
    
    
    const homeTimeline3 = gsap.timeline({
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: 1,
            start: "top top",
            end:"+=100%",
        }
    });
    homeTimeline3.to(".home .stemp__item:nth-child(1),.home .stemp__item:nth-child(5)", {
        y: "-200%",
        force3D: false,
    }, 0); 
    
    homeTimeline3.to(".home .stemp__item:nth-child(1),.home .stemp__item:nth-child(5)", {
        opacity:0,
    }, 0.3);

    const homeTimeline4 = gsap.timeline({
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: 1,
            start: "top top",
            end:"+=100%",
        }
    });
    homeTimeline4.to(".home .stemp__item:nth-child(2),.home .stemp__item:nth-child(4)", {
        y: "-110%",
        force3D: false,
    }, 0); 
    
    homeTimeline4.to(".home .stemp__item:nth-child(2),.home .stemp__item:nth-child(4)", {
        opacity:0,
    }, 0.3);
      
    const homeTimeline2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#wrap",
          scroller: window,
          scrub: 1,
          start: "top top",
          end: "+=120%",
        }
     });
      
    homeTimeline2.to(".home .stemp__item.center", {
    scale: 1,
    y: "10%",
    rotateY: "-360deg",
    force3D: false,
    }, 0); 
    
    homeTimeline2.to(".home .stemp__item.center", {
    opacity:.1,
    rotate:'5deg',
    x:'-15px',
    }, 0.8);
  
    //Projects
    //s: digit
    // 연도 설정
// 연도 설정
const startYear = 2019;
const endYear = 2025;
let currentYear = startYear;
let previousYear = startYear;
const digits = document.querySelectorAll(".digit");
let animationFrameId = null;

// 연도 디지털 애니메이션 함수
function updateDigits(newYear, direction) {
    if (newYear === currentYear) return;

    const newYearDigits = newYear.toString().split("");
    const currentYearDigits = currentYear.toString().split("");

    digits.forEach((digit, index) => {
        const currentSpan = digit.querySelector(".current");
        const nextSpan = digit.querySelector(".next");
        const newDigit = newYearDigits[index] || "0";
        const currentDigit = currentYearDigits[index] || "0";

        if (newDigit !== currentDigit) {
            nextSpan.innerHTML = newDigit;

            gsap.killTweensOf(currentSpan);
            gsap.killTweensOf(nextSpan);

            gsap.set(nextSpan, { y: direction === "up" ? "100%" : "-100%", opacity: 1 });

            gsap.timeline()
                .to(currentSpan, {
                    y: direction === "up" ? "-100%" : "100%",
                    duration: 0.4,
                    ease: "power2.inOut",
                    onComplete: () => {
                        currentSpan.innerHTML = newDigit;
                        gsap.set(currentSpan, { y: "0%" });
                    }
                })
                .to(nextSpan, {
                    y: "0%",
                    duration: 0.4,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.set(nextSpan, { opacity: 0 });
                    }
                }, "-=0.4");
        }
    });

    currentYear = newYear;
}

// 가운데 기준 split-text span 애니메이션 설정
const spans = gsap.utils.toArray(".work .split-text span");

// 메인 타임라인
const projectsTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".work-intro",
        scroller: window,
        scrub: 0.5,
        pin: true,
        start: "top top",
        end: "bottom+=200% top",
        onUpdate: (self) => {
            const progress = self.progress;

            // 연도 변경을 특정 progress 구간에서만 실행
            const min = 0.6;
            const max = 1;

            if (progress >= min && progress <= max) {
                const localProgress = (progress - min) / (max - min); // 0~1
                const newYear = Math.floor(startYear + (endYear - startYear) * localProgress);
                const direction = newYear > previousYear ? "up" : "down";

                previousYear = newYear;

                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                animationFrameId = requestAnimationFrame(() => updateDigits(newYear, direction));
            }
        },
    },
});

// 타임라인 애니메이션 정의
projectsTimeline
    .to(".work-intro .inner", {
        scale: 1,
        y: '0px',
        borderRadius: '0px',
        force3D: false,
    }, 0)
    .to(".work .item-l", {
        x: '-20%',
        force3D: false,
    }, 0)
    .to(".work .item-r", {
        x: '20%',
        force3D: false,
    }, 0)
    .to(".work .year-container", {
        height: '100%',
        force3D: false,
    }, '+=0.4')
    .to(".work .copyright .sec__title--lg", {
        scale:'3',
        force3D: false,
    }, '-=0.4')
    .to(".work .work-intro__desc", {
        y: '-170%',
        force3D: false,
    }, '-=0.6')
    .to(spans, {
        y: '200%',
        force3D: false,
        stagger: function(index, target, list) {
            const middle = (list.length - 1) / 2;
            return Math.abs(index - middle) * 0.03; // 더 빠르게
        }
    }, '-=0.6');



    
    //expertise
    const expertiseTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".expertise",
            scroller: window,
            scrub:.5,
            pin: true,
            start: "top top",
            end: `+=400%`, 
        },
    });
    expertiseTimeline
    .to(".expertise__wrap", {
        scale: 1,
        y: '0px',
        borderRadius: '0px',
        force3D: false,
    }, 0)
    .to(".expertise .bg-1", {
        x: '-20%',
        force3D: false,
    }, 0)
    .to(".expertise .bg-2", {
        x: '20%',
        force3D: false,
    }, 0)
    .to(".expertise .split-text span", {
        y: '0%',
        stagger: 0.05,
        ease: Power2.easeInOut,
        force3D: false,
        start: "top top",
        end: "bottom bottom",
    }, 0)
    .to(".expertise__cont .intro-img.img-2", {
        y: '-100%',
        force3D: false,
        duration: 1 
    }, "+=1")
    .to(".expertise__items", {
        y: '0%',
        force3D: false,
        duration: 1
    }, "-=1")
    .to(".expertise__items", {
        y: '-100%',
        force3D: false,
        duration: 3
    }, "+=0")
    .to(".expertise .split-text span", {
        y: '100%',
        stagger: 0.05,
        ease: Power2.easeInOut,
        force3D: false,
        start: "top top",
        end: "bottom bottom",
    }, "+=0")
    .to(".expertise__wrap", {
        scale:'0.97',
        borderRadius:'20px',
        force3D: false,
        start: "top top",
        end: "bottom bottom",
    }, "+=0");


    
    //stack & tools
    const books = document.querySelectorAll(".stack__item");
    const booksTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".stack",
            scroller: window,
            scrub: true,
            pin: true,
            end: `bottom top-=${window.innerHeight * 2}px`,
            onUpdate: (self) => {
                let scrollProgress = self.progress;
                let maxIndex = books.length - 1;
                let index = Math.round(scrollProgress * maxIndex);
                updateCarousel(index);
            },
            
        },
    });

    function getOffsetValue() {
        return window.innerWidth < 768 ? 130 : 230; // 모바일(768px 이하)에서는 180, PC에서는 230
    }
    
    function updateCarousel(index) {
        const offsetValue = getOffsetValue(); // 현재 화면 크기에 맞는 값 가져오기
    
        books.forEach((book, i) => {
            const offset = i - index;
            let rotateY = 88 - Math.abs(offset) * 20;
            rotateY = Math.max(0, rotateY);
    
            if (offset < 0) rotateY *= 1;
            else rotateY *= -1;
    
            let zIndex = 10 - Math.abs(offset);
    
            gsap.set(book, { zIndex: zIndex });
            gsap.to(book.querySelector(".book"), {
                x: offset * offsetValue, // 적용
                rotateY: rotateY,
                duration: 1, 
            });
            gsap.to(book.querySelector(".stack__info"), {
                x: offset * offsetValue,
                left: offset * (offsetValue / 2),
                duration: 1, 
            });
    
            book.classList.toggle("active", i === index);
        });
    }
    
    // 초기 실행
    updateCarousel(0);
    
    // 창 크기 변경 시 다시 실행
    window.addEventListener("resize", () => updateCarousel(0));
    

    /*
    const cardSlide2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".dd",
            scroller: window,
            scrub: true,
            pin: true,
            end: `bottom top-=${window.innerHeight * 3}px`,
        },
    });
    cardSlide2.to('.dd .card1', { yPercent: 0, className: 'card card1 act' })
    .from('.dd .card2', { yPercent: 200})
    .to('.dd .card1', { scale: 0.9, y: '-40vh' }, "-=0.6")
    .to('.dd .card2', { yPercent: 0, className: 'card card2 act' })
    .from('.dd .card3', { yPercent: 200})
    .to('.dd .card2', { scale: 0.9, y: '-40vh' }, "-=0.6")
    .to('.dd .card1', { scale: 0.8, y: '-80vh' }, "-=0.6")
    .to('.dd .card3', { yPercent: 0, className: 'card card3 act' })
    .to('.dd .card3', { scale: 0.9, y: '0' })
    .to('.dd .card2', { scale: 0.8, y: '-100px' }, "-=0.6")
    .to('.dd .card1', { scale: 0.7, y: '-200px' }, "-=0.6")
    .to('.dd .card1', { scale: 1, y: '0', })
    .to('.dd .card2', { scale: 1, y: '0', }, "-=0.6")
    .to('.dd .card3', { scale: 1, y: '0', }, "-=0.6")
    .to('.dd .card1', { rotate:'-10px' })
    .to('.dd .card2', { rotate:'10px' }, "-=0.6");
    
    
    //card
    var cards = document.querySelectorAll(".folders .pin-card .card");
    cards.forEach(function (card, index) {
        var rotationDegree = (index + 1) * 10;
        gsap.to(card, {
            scrollTrigger: {
                trigger: "#wrap",
                scroller: window,
                scrub: true,
                start: "top top",
                end: "bottom bottom",
                anticipatePin: 1,
            },
            rotation: rotationDegree,
        });
    });

    let horizontalSlider = document.querySelectorAll(".horizontal-slide");
    horizontalSlider.forEach((horizontalSlide) => {
        let pinCard = horizontalSlide.querySelector(".pin-card");
        gsap.to(pinCard, {
            scrollTrigger: {
                trigger: horizontalSlide,
                scroller: window,
                scrub: true,
                pin: true,
                start:'.pin-card',
                end: `bottom top-=${window.innerHeight * 2}px`,
            },
            rotation: -80,
            ease: "none",
        });
    });

    gsap.to(".folders .card.next", {
        scrollTrigger: {
            trigger: ".folders",
            scroller: window,
            scrub: true,
            start: "top 30%",
            end: "top 0%",
        },
        opacity: 0,
    });

    gsap.to(".action-card", {
        scrollTrigger: {
            trigger: ".folders",
            scroller: window,
            scrub: true,
            endTrigger: ".service",
            onEnter: () => {
                gsap.to(".action-card", {
                    top: '100%',
                    marginLeft: '0%',
                    rotateY: '-360deg',
                });
            },
        },
        opacity: 1,
    });
    */
    //service
    const serviceItems = document.querySelector('.service ul').querySelectorAll('li');
    const serviceTotalHeight = serviceItems.length * serviceItems[0].offsetHeight;
    const service = gsap.timeline({
        scrollTrigger: {
            trigger: ".service",
            scroller: window,
            scrub: true,
            pin: true,
            end: `bottom top-=${serviceTotalHeight * 2}px`,
        },
    });
    service
    .to(".service ul", {
        rotateX:'290deg',
        scrollTrigger: {
            trigger: ".service",
            scroller: window,
            scrub: true,
            start:'.service',
            end: `bottom top-=${serviceTotalHeight * 2}px`,
        },
    });

    
    //color change
    const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
    scrollColorElems.forEach((colorSection, i) => {
        const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
        const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;
        ScrollTrigger.create({
            trigger: colorSection,
            scroller: window,
            start: "top 40%",
            onEnter: () => {
                gsap.to("#container", {
                    backgroundColor: colorSection.dataset.bgcolor,
                    color: colorSection.dataset.textcolor,
                    overwrite: "auto",
                });
                document.documentElement.style.setProperty("--bg-color", colorSection.dataset.bgcolor);
                document.documentElement.style.setProperty("--text-color", colorSection.dataset.textcolor);
            },
            onLeaveBack: () => {
                gsap.to("#container", {
                    backgroundColor: prevBg,
                    color: prevText,
                    overwrite: "auto",
                });
                document.documentElement.style.setProperty("--bg-color", prevBg);
                document.documentElement.style.setProperty("--text-color", prevText);
            }
        });
    });

});
/*
    var Example = Example || {};

    Example.mixed = function () {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Common = Matter.Common;

        var engine = Engine.create(),
            world = engine.world;

        var render = Render.create({
            element: document.getElementById('shapes-box'),
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: false,
            }
        });

        Render.run(render);

        var runner = Runner.create();
        Runner.run(runner, engine);

        var shapes = [];
        var shapeCount = 0;
        var wallsRemoved = false;

        var addShape = function (texture, options, x, y) {
            var scale = Math.min(window.innerHeight, window.innerWidth) / 1000;
            options = {...options, ...{
                restitution: 0.7,
                render: {
                    sprite: {
                        texture: texture,
                        xScale: scale * options.scale,
                        yScale: scale * options.scale
                    }
                }
            }};

            var body = options.shape === 'circle' ?
                Bodies.circle(x, y, options.radius * scale, options) :
                Bodies.rectangle(x, y, options.width * scale, options.height * scale, options);

            body.initialScale = scale;
            body.options = options;
            Composite.add(world, body);
            shapes.push(body);

            shapeCount++;

            if (shapeCount >= 60 && !wallsRemoved) {
                Composite.remove(world, walls);
                wallsRemoved = true;
            }

            return body;
        };
        var addInitialShapes = function () {
            var icoTagHeightSize = 103;
            var textures = [
                './img/ico-canvas-chrome.png',
                './img/ico-canvas-work.png',
                './img/ico-canvas-service.png',
                './img/ico-canvas-bulid.png',
                './img/ico-canvas-coffee.png',
                './img/ico-canvas-branding.png',
                './img/ico-canvas-digital.png',
                './img/ico-canvas-ui.png',
                './img/ico-canvas-ux.png',
            ];
            var options = [
                { shape: 'rectangle', width: 150, height: 150, scale: 1},
                { shape: 'rectangle', width: 127, height: 152, scale: 1},
                { shape: 'rectangle', width: 150, height: 150, scale: 1},
                { shape: 'rectangle', width: 150, height: 150, scale: 1},
                { shape: 'rectangle', width: 150, height: 150, scale: 1},
                { shape: 'rectangle', width: 145, height: 174, scale: 1},
                { shape: 'rectangle', width: 150, height: 150, scale: 1},
                { shape: 'rectangle', width: 150, height: 150, scale: 1},
                { shape: 'rectangle', width: 150, height: 150, scale: 1},
            ];
            
            var startX = window.innerWidth/2.5;
            var startY = -window.innerHeight/50;
            
            for (var i = 0; i < 40; i++) {
                var index = i % textures.length;
                addShape(textures[index], options[index], startX + i *2, startY - i *100);
            }
        };

        addInitialShapes();

        var walls = [];
        var addWalls = function() {
            var newWalls = [
                Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true, render: { fillStyle: 'rgba(255, 255, 255, 1)' } }),
                Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { fillStyle: 'rgba(255, 255, 255, 1)' } }),
                Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { fillStyle: 'rgba(255, 255, 255, 1)' } })
            ];
            Composite.add(world, newWalls);
            walls = newWalls;
        };

        addWalls();


        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 1,
                    render: { visible: true }
                }
            });

        Composite.add(world, mouseConstraint);
        render.mouse = mouse;

        window.addEventListener('resize', function() {
            var currentWidth = window.innerWidth;
            var currentHeight = window.innerHeight;

            var widthChange = Math.abs(currentWidth - render.options.width);
            var heightChange = Math.abs(currentHeight - render.options.height);

            if (widthChange >= 200 || heightChange >= 200) {
                render.options.width = currentWidth;
                render.options.height = currentHeight;
                render.canvas.width = currentWidth;
                render.canvas.height = currentHeight;

                var newScale = Math.min(currentWidth, currentHeight) / 1000;

                shapes.forEach(function(body) {
                    var scaleRatio = newScale / body.initialScale;
                    Matter.Body.scale(body, scaleRatio, scaleRatio);
                    body.initialScale = newScale;

                    if (body.circleRadius) {
                        body.circleRadius = body.options.radius * newScale;
                    } else {
                        body.bounds.max.x = body.bounds.min.x + body.options.width * newScale;
                        body.bounds.max.y = body.bounds.min.y + body.options.height * newScale;
                    }

                    var centerX = (body.position.x / currentWidth) * currentWidth;
                    var centerY = (body.position.y / currentHeight) * currentHeight;
                    Matter.Body.setPosition(body, { x: centerX, y: centerY });
                });

                Composite.clear(world, false);
                addWalls();
            }
        });

        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function () {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
            }
        };
    };

    Example.mixed();
*/