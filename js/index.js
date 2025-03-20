function resizeHeight() {
    const windowHeight = window.innerHeight;
    document.querySelector(".home__sticky").style.height = `${windowHeight}px`;
}

window.addEventListener("resize", resizeHeight);
resizeHeight();

$(function(){
    //ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    //home
    const homeTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".home",
            scroller: window,
            scrub: true,
            pin: true,
            pinSpacing: false, 
            anticipatePin: 1,
            endTrigger: ".profile",
            end: "bottom bottom",
        },
    });
    homeTimeline
    .to(".header__logo", {
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: true,
            start: "top top",
            end:"+=50%",
        },
        scale: 1,
        force3D: false,
    })
    .to(".home__title", {
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: true,
            start: "top top",
            end:"+=30%",
        },
        opacity:0,
        force3D: false,
    })
    .to(".home__shapes-area", {
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: true,
            start: "top top",
            end:"+=50%",
        },
        background:'#3c3d40',
    })
    .to(".home__shapes-area", {
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: true,
            start: "top top",
            end:"+=50%",
        },
        scale:'1',
        x:'0',
        borderRadius:'0px',
    })
    .to(".overlay", {
        scrollTrigger: {
            trigger: ".profile",
            scroller: window,
            scrub: true,
            start:"top bottom",
            end:"top +=100vh",
        },
        background: 'rgba(0,0,0,0)',
    });

    //works
    const initialScale = 1;
    const finalScale = 0.75;
    const initialHeight = document.querySelector('.work .sec__title--lg').offsetHeight;
    const reducedHeight = initialHeight * (initialScale - finalScale);
    const totalImages = document.querySelectorAll('.work .work__img img').length;
    const revealPercentage = 100 / totalImages;

    //s: digit
    const startYear = 2019;
    const endYear = 2025;
    let currentYear = startYear;
    const digits = document.querySelectorAll(".digit");

    let animationFrameId = null;

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

    ScrollTrigger.create({
        trigger: ".work__lineup",
        scroller: window,
        scrub: true,
        pin: true,
        start: ".work",
        onUpdate: (self) => {
            const progress = self.progress;
            const newYear = Math.floor(startYear + (endYear - startYear) * progress);
            const direction = self.direction > 0 ? "up" : "down";

            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => updateDigits(newYear, direction));
        },
    });

    //e:digit
    const workTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".work__lineup",
            scroller: window,
            scrub: true,
            pin: true,
        },
    });
    workTimeline
    .to(".work .sec__title--lg", {
        scale: finalScale,
        force3D: false,
        scrollTrigger: {
            trigger: ".work__lineup",
            scroller: window,
            scrub: true,
            start: ".work",
        },
    })
    .to(".work .sec__title--lg .box", {
        width: '50%',
        force3D: false,
        scrollTrigger: {
            trigger: ".work__lineup",
            scroller: window,
            scrub: true,
            start: ".work",
        },
    })
    .to(".work .work__img", {
        scale: 1,
        force3D: false,
        marginTop: `-=${reducedHeight}px`, 
        scrollTrigger: {
            trigger: ".work__lineup",
            scroller: window,
            scrub: true,
            start: ".work",
        },
    }) 
    .to(".work .work__img img", {
        autoAlpha: 1, 
        stagger: {
            each: revealPercentage / 100,
            start: 0,  
        },
        duration: 0.05,
    });

    //expertise
    const cardSlide2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".expertise",
            scroller: window,
            scrub: true,
            pin: true,
            end: `bottom top-=${window.innerHeight * 3}px`,
        },
    });
    cardSlide2.to('.expertise .card1', { yPercent: 0, className: 'card card1 act' })
    .from('.expertise .card2', { yPercent: 200})
    .to('.expertise .card1', { scale: 0.9, y: '-60px' }, 0.6)
    .to('.expertise .card2', { yPercent: 0, className: 'card card2 act' })
    .from('.expertise .card3', { yPercent: 200})
    .to('.expertise .card2', { scale: 0.9, y: '-60px' }, "-=0.6")
    .to('.expertise .card1', { scale: 0.8, y: '-120px' }, "-=0.6")
    .to('.expertise .card3', { yPercent: 0, className: 'card card3 act' })
    
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
            endTrigger: ".skills",
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
            },
            onLeaveBack: () => {
                gsap.to("#container", {
                    backgroundColor: prevBg,
                    color: prevText,
                    overwrite: "auto",
                });
            }
        });
    });

    //skills
    const skillsItems = document.querySelector('.skills ul').querySelectorAll('li');
    const skillsTotalHeight = skillsItems.length * skillsItems[0].offsetHeight;
    const skills = gsap.timeline({
        scrollTrigger: {
            trigger: ".skills",
            scroller: window,
            scrub: true,
            pin: true,
            end: `bottom top-=${skillsTotalHeight * 2}px`,
        },
    });
    skills
    .to(".skills ul", {
        rotateX:'290deg',
        scrollTrigger: {
            trigger: ".skills",
            scroller: window,
            scrub: true,
            start:'.skills',
            end: `bottom top-=${skillsTotalHeight * 2}px`,
        },
    });
});

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
            var scale = Math.min(window.innerHeight, window.innerWidth) / 1500;
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

            if (shapeCount >= 50 && !wallsRemoved) {
                Composite.remove(world, walls);
                wallsRemoved = true;
            }

            return body;
        };
        var addInitialShapes = function () {
            var icoTagHeightSize = 103;
            var textures = [
                './img/ico-canvas-ui.png',
                './img/ico-canvas-ux.png',
                './img/ico-canvas-bulid.png',
                './img/ico-canvas-work.png',
                './img/ico-canvas-digital.png',
                './img/ico-canvas-service.png',
            ];
            var options = [
                { shape: 'rectangle', width: 142, height: icoTagHeightSize,scale: 1},
                { shape: 'rectangle', width: 170, height: icoTagHeightSize,scale: 1},
                { shape: 'rectangle', width: 251, height: icoTagHeightSize,scale: 1},
                { shape: 'rectangle', width: 270, height: icoTagHeightSize,scale: 1},
                { shape: 'rectangle', width: 303, height: icoTagHeightSize,scale: 1},
                { shape: 'rectangle', width: 321, height: icoTagHeightSize,scale: 1},
            ];
            
            var startX = 50;
            var startY = -window.innerHeight/50;
            
            for (var i = 0; i < 30; i++) {
                var index = i % textures.length;
                addShape(textures[index], options[index], startX + i * 70, startY - i *50);
            }
        };

        addInitialShapes();

        setInterval(function() {
            var icoTagHeightSize = 103;
            var textures = [
                './img/ico-canvas-ui.png',
                './img/ico-canvas-ux.png',
                './img/ico-canvas-bulid.png',
                './img/ico-canvas-work.png',
                './img/ico-canvas-digital.png',
                './img/ico-canvas-service.png',
            ];
            var options = [
                { shape: 'rectangle', width: 142, height: icoTagHeightSize,scale: 1},
                { shape: 'rectangle', width: 170, height: icoTagHeightSize,scale: 1},
                { shape: 'rectangle', width: 251, height: icoTagHeightSize,scale: 1},
                { shape: 'rectangle', width: 270, height: icoTagHeightSize,scale: 1},
                { shape: 'rectangle', width: 303, height: icoTagHeightSize,scale: 1},
                { shape: 'rectangle', width: 321, height: icoTagHeightSize,scale: 1},
            ];
            
            var index = Math.floor(Math.random() * textures.length);
            var startX = Math.random() * (window.innerWidth - 200) + 100;
            var startY = -100;

            addShape(textures[index], options[index], startX, startY);
        }, 400);

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

        setInterval(function() {
            if (wallsRemoved) {
                var outOfBoundsCount = shapes.reduce(function(count, body) {
                    if (body.position.y > window.innerHeight + 100 ||
                        body.position.x < -100 ||
                        body.position.x > window.innerWidth + 100) {
                        return count + 1;
                    }
                    return count;
                }, 0);

                if (outOfBoundsCount >=30) {
                    shapeCount = 0;
                    wallsRemoved = false;
                    addWalls();
                    shapes = shapes.filter(function(body) {
                        return body.position.y <= window.innerHeight + 100 &&
                            body.position.x >= -100 &&
                            body.position.x <= window.innerWidth + 100;
                    });
                }
            }
        }, 1000);

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
