function resizeHeight() {
    const windowHeight = window.innerHeight;
    document.querySelector(".home__sticky").style.height = `${windowHeight}px`;
}

window.addEventListener("resize", resizeHeight);
resizeHeight();

$(function () {

    //***** ScrollTrigger 
    // [intro] animation
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline()
    .add([
        gsap.fromTo(".intro-bg", { opacity: 1 }, { opacity: 0, display: 'none', ease: Power1.easeInOut, duration: 0.8 }),
        gsap.fromTo(".home__letter > *", { opacity: 0, y: '30px' }, { opacity: 1, y: '0%', delay: '.5', duration: 0.5 }),
    ]);
    gsap.timeline().staggerFromTo(".header__logo .split-text span", 1,
    { opacity: 0, y: 0, },
    {
        opacity: 1, y: 0, delay: .5, force3D: false, ease: Power1.easeInOut,

    }, .05);


    //***** home
    //[home] post card animation
    gsap.timeline()
        .fromTo(".home .stamp__item.center .stamp__act", 1, { y: '-30%', rotateY: '-180deg' }, { y: '0%', rotateY: '0deg', delay: '.1', force3D: false, ease: Power1.easeInOut });
    
    //[home] intro ani
    const homeTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".home",
            scroller: window,
            scrub: 1,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            end: "bottom bottom",
            endTrigger: '.work',
        },
    });
    homeTimeline
    .to(".header__logo", {
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: 1,
            start: "top top",
            end: "+=50%",
        },
        scale: 1,
        y: '0px',
        force3D: false,
    })
    .to(".home__letter", {
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: 1,
            start: "top top",
            end: "+=20%",
        },
        opacity: 0,
        force3D: false,
    });

    // [home] postcard flip, home fade-out .3 animation
    const homeTimeline2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#wrap",
            scroller: window,
            scrub: 1,
            start: "top top",
            end: "+=200%",
        }
    });
    homeTimeline2
    .to(".home .stamp__item.center", {
        y: "8%",
        scale:1,
        rotateY: "-540deg",
        force3D: false,
    }, 0)
    homeTimeline2.to(".home .bg", {
        opacity:.3,
        duration:1,
     },0);
    
     // [home] postcard fade-out animation
    const homeTimeline3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".profile",
            scroller: window,
            scrub: 1,
            start: "top top",
            end: "+=60%",
        }
    });
    homeTimeline3
    .to(".home .stamp__wrap", {
        opacity:0
    }, 0);

    // [home] bg fade-out 0 animation
    const homeTimeline5 = gsap.timeline({
        scrollTrigger: {
            trigger: ".work-intro",
            scroller: window,
            scrub: 1,
            start: "top top",
            end: "bottom+=200% bottom",
        }
    });
    homeTimeline5.to(".home", {
        opacity: 0,
    });


    //***** works
    //s:work intro
    // [work] canvas JS
    var Example = Example || {};
    Example.mixed = function () {
        const {
            Engine,
            Render,
            Runner,
            Bodies,
            Composite,
            Mouse,
            Events
        } = Matter;

        const engine = Engine.create();
        engine.world.gravity.y = 2;
        const world = engine.world;

        const render = Render.create({
            element: document.getElementById("shapes-box"),
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight * 2,
                wireframes: false,
                background: false
            }
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        let shapes = [];
        let walls = [];

        var addWalls = function () {
            var newWalls = [
                Bodies.rectangle(window.innerWidth / 2, (window.innerHeight *2) + 50, window.innerWidth, 100, { isStatic: true, render: { fillStyle: 'rgba(255, 255, 255, 1)' } }),
                Bodies.rectangle(-50, (window.innerHeight *2) / 2, 100, (window.innerHeight *2), { isStatic: true, render: { fillStyle: 'rgb(255, 255, 255)' } }),
                Bodies.rectangle(window.innerWidth + 50, (window.innerHeight *2) / 2, 100, (window.innerHeight *2), { isStatic: true, render: { fillStyle: 'rgba(255, 255, 255, 1)' } })
            ];
            Composite.add(world, newWalls);
            walls = newWalls;
        };

        addWalls();

        const addShape = (texture, options, x, y) => {
            const scale = Math.min(window.innerHeight, window.innerWidth) / 1000;
            const renderOptions = {
                ...options,
                restitution: 0.5,
                render: {
                    sprite: {
                        texture,
                        xScale: scale * options.scale,
                        yScale: scale * options.scale
                    }
                }
            };

            const body = options.shape === "circle"
                ? Bodies.circle(x, y, options.radius * scale, renderOptions)
                : Bodies.rectangle(x, y, options.width * scale, options.height * scale, renderOptions);

            body.initialScale = scale;
            body.options = options;
            Composite.add(world, body);
            shapes.push(body);
        };

        const addInitialShapes = () => {
            const textures = [
                './img/img-client-stamp-1.png',
                './img/img-client-stamp-2.png',
                './img/img-client-stamp-3.png',
                './img/img-client-stamp-4.png',
                './img/img-client-stamp-5.png',
                './img/img-client-stamp-6.png',
                './img/img-client-stamp-7.png',
                './img/img-client-stamp-8.png',
                './img/img-client-stamp-10.png',
                './img/img-client-stamp-11.png',
                './img/img-client-stamp-13.png',
            ];

            const isMobile = window.innerWidth <= 768;
            const baseOptions = {
                shape: "rectangle",
                width: 720 / (isMobile ? 4 : 5),
                height: 887 / (isMobile ? 4 : 5),
                scale: isMobile ? 0.25 : 0.2
            };

            const startY = -window.innerHeight / 50;

            textures.forEach((texture, i) => {
                const padding = 60;
                const randomX = padding + Math.random() * (window.innerWidth - padding * 2);
                addShape(texture, baseOptions, randomX, startY - i * 100);
            });
        };

        addInitialShapes();

        const mouse = Mouse.create(render.canvas);

        Events.on(engine, 'beforeUpdate', () => {
            const mousePos = mouse.position;

            shapes.forEach(body => {
                const dx = body.position.x - mousePos.x;
                const dy = body.position.y - mousePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const distanceThreshold = 150;
                if (distance < distanceThreshold) {
                    const forceMagnitude = (1 - distance / distanceThreshold) * 1;
                    const force = {
                        x: (dx / distance) * forceMagnitude,
                        y: (dy / distance) * forceMagnitude
                    };
                    Matter.Body.applyForce(body, body.position, force);
                }
            });
        });

        return {
            engine,
            runner,
            render,
            canvas: render.canvas,
            stop: () => {
                Render.stop(render);
                Runner.stop(runner);
                Composite.clear(engine.world);
                engine.events = {};
            }
        };
    };

    let hasRun = false;
    let currentApp = null;
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasRun) {
                currentApp = Example.mixed();
                initProjectsTimeline();
                hasRun = true;
            }
        });
    }, { threshold:0});

    const target = document.querySelector('.work');
    if (target) observer.observe(target);

    window.addEventListener("resize", () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const widthDiff = Math.abs(newWidth - lastWidth);
        const heightDiff = Math.abs(newHeight - lastHeight);

        if (widthDiff > 100 || heightDiff > 100) {
            lastWidth = newWidth;
            lastHeight = newHeight;

            if (currentApp && typeof currentApp.stop === "function") {
                currentApp.stop();
            }

            const container = document.getElementById("shapes-box");
            if (container) container.innerHTML = "";

            currentApp = Example.mixed();
        }
    });

    // [work] work intro current year JS
    const startYear = 2019;
    const endYear = 2025;
    let currentYear = startYear;
    let previousYear = startYear;
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
                        duration: .4,
                        onComplete: () => {
                            currentSpan.innerHTML = newDigit;
                            gsap.set(currentSpan, { y: "0%" });
                        }
                    })
                    .to(nextSpan, {
                        y: "0%",
                        duration: .4,
                        onComplete: () => {
                            gsap.set(nextSpan, { opacity: 0 });
                        }
                    }, "-=0.4");
            }
        });

        currentYear = newYear;
    }

    // [work] work intro current year scrolltrigger
    function initProjectsTimeline() {
        const projectsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".work .work-intro",
                scroller: window,
                scrub: 0.5,
                start: "top-=500vh top",
                end: "bottom-=100vh bottom",
                onUpdate: (self) => {
                    const progress = self.progress;
                    const min = 0;
                    const max = 1;

                    if (progress >= min && progress <= max) {
                        const localProgress = (progress - min) / (max - min);
                        const newYear = Math.floor(startYear + (endYear - startYear) * localProgress);
                        const direction = newYear > previousYear ? "up" : "down";

                        previousYear = newYear;

                        if (animationFrameId) cancelAnimationFrame(animationFrameId);
                        animationFrameId = requestAnimationFrame(() => updateDigits(newYear, direction));
                    }
                },
            },
        });
    }

    

    //******** stack & tools
    // [stack] scrollTrigger animation
    const books = document.querySelectorAll(".stack__item");
    const booksTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".stack",
            scroller: window,
            scrub: 1,
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
    
    // [stack] expertise bg scale up animation
   /* const stackTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".stack",
            start: "top-=100% top",
            end: "+=100%",
            scroller: window,
            scrub: 1,
            //markers:true,
        }
    });
    stackTimeline
    .to(".expertise .bg", {
        scale:1.2
    });*/

    // [stack] books JS animation
    function getOffsetValue() {
        return window.innerWidth < 768 ? 230 : 230; // 모바일(768px 이하)에서는 180, PC에서는 230
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
    //init
    updateCarousel(0);
    //resize
    window.addEventListener("resize", () => updateCarousel(0));


    //******* expertise
    // [expertise] scrolltrigger pin
    const expertiseTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".expertise",
            start: "top top",
            endTrigger: ".expertise__cont",
            end: "bottom bottom",
            scroller: window,
            scrub: 1,
            pin: ".fixed-cont",
            pinSpacing: false,
        }
    });
    // [expertise] intro title fade-out, bg fade-in animation
    const expertiseTimeline2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".expertise",
            start: "top top",
            end: "+=100%",
            scroller: window,
            scrub: 1,
        }
    });
    expertiseTimeline2
    .to(".expertise .sec__title", {
        opacity:.4,
    },"+=.2");
    /*.to(".expertise .bg-1", {
        opacity:1,
    },"-=.2");*/


    //****** service
    // [service] scrollTrigger pin
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
    // [service] scrollTrigger items trigger
    service
        .to(".service ul", {
            rotateX: '290deg',
            scrollTrigger: {
                trigger: ".service",
                scroller: window,
                scrub: true,
                start: '.service',
                end: `bottom top-=${serviceTotalHeight * 2}px`,
            },
        });
    
// [service] positionCardsInCircle JS
function positionCardsInCircle() {
    const container = document.querySelector(".service .stamp__wrap");
    const cards = container.querySelectorAll(".service .stamp__item");
 
    //const radius = window.innerWidth/2;
    const radius = 1500;//지정정
    const total = cards.length;
    
    totalAngle = Math.PI * (150 / 180);
    cards.forEach((card, index) => {
        //const angle = (index / (total - 1)) * Math.PI; // 반원 180deg
        const angle = (index / (total - 1)) * totalAngle; // 150deg
        const deg = angle * (180 / Math.PI);
 
        const x = radius * Math.cos(angle) - card.offsetWidth / 2;
        const y = radius * Math.sin(angle) - card.offsetHeight / 2;
 
        card.style.left = x + "px";
        card.style.top = y + "px";
        card.style.transform = `rotate(${deg + 90}deg)`; // 카드 정방향 설정
    });
}
 
window.addEventListener("load", positionCardsInCircle);
window.addEventListener("resize", positionCardsInCircle);


    //[common] BG/Text color change JS
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


