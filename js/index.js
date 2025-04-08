function resizeHeight() {
    const windowHeight = window.innerHeight;
    document.querySelector(".home__sticky").style.height = `${windowHeight}px`;
}

window.addEventListener("resize", resizeHeight);
resizeHeight();

$(function(){

    //***** ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline()
    .add([
        gsap.fromTo(".intro-bg", {opacity:1}, {opacity:0, display:'none', ease: Power1.easeInOut, duration: 0.8}),
        gsap.fromTo(".home__letter > *", {opacity:0, y:'30px'}, {opacity:1,y:'0%', delay:'.5',  duration: 0.5}),
    ]);
    gsap.timeline().staggerFromTo(".header__logo .split-text span", 1, 
        {opacity:0,y:0, }, 
        {opacity:1,y:0, delay:.5,force3D: false ,ease: Power1.easeInOut,
        
    },.05);


    //***** home
    gsap.timeline()
    .fromTo(".home .stemp__item.center .stemp__act", 1, {y: '-30%',rotateY:'-180deg'}, { y: '0%',rotateY:'0deg',delay:'.1', force3D: false ,ease: Power1.easeInOut});
    gsap.timeline().fromTo(".home .stemp__item:nth-child(1) .stemp__item--front", 1, {scale:0,y: '-30%', x: '200%',rotate:'-60deg'}, {scale:1, y: '0%',x: '0%',rotate:'0deg',delay:0.2, force3D: false ,});
    gsap.timeline().fromTo(".home .stemp__item:nth-child(2) .stemp__item--front", 1, {scale:0,y: '-30%', x: '200%',rotate:'-60deg'}, {scale:1, y: '0%',x: '0%',rotate:'0deg',delay:0.2,force3D: false ,});
    gsap.timeline().fromTo(".home .stemp__item:nth-child(4) .stemp__item--front", 1, {scale:0,y: '-30%', x: '-200%',rotate:'60deg'}, {scale:1, y: '0%',x: '0%',rotate:'0deg',delay:0.2,force3D: false ,});
    gsap.timeline().fromTo(".home .stemp__item:nth-child(5) .stemp__item--front", 1, {scale:0,y: '-30%', x: '-200%',rotate:'60deg'}, {scale:1, y: '0%',x: '0%',rotate:'0deg',delay:0.2,force3D: false ,});
    
    //sticky ani
    const homeTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".home",
            scroller: window,
            scrub: 1,
            pin: true,
            pinSpacing: false, 
            anticipatePin: 1,
            end: "bottom bottom",
            endTrigger:'.work',
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
    
    // side stemp ani - scroll Y
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

    // side stemp ani - hide
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
     
    // center stemp ani
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
    y: "8%",
    rotateY: "-360deg",
    force3D: false,
    }, 0); 

    // center stemp ani - spin
    const homeTimeline5 = gsap.timeline({
        scrollTrigger: {
          trigger: ".profile",
          scroller: window,
          scrub: 1,
          start: "top top",
          end: "bottom+=300vh bottom",
        }
     });
     homeTimeline5.to(".home .stemp__item.center", {
        rotate:'-10deg',
        x:'25px',
     },0);
     homeTimeline5.to(".home .stemp", {
        opacity:.2
     },0);
     homeTimeline5.to(".home .stemp__item.center", {
        rotateY:'180deg',
        },0.4);

    
    const homeTimeline6 = gsap.timeline({
        scrollTrigger: {
            trigger: ".profile",
            scroller: window,
            scrub: .05,
            start: "top top",
            end: "bottom+=500vh bottom",
        }
     });
     homeTimeline6.to(".home .stemp__item.center", {
        opacity:0,
     },'+=.5');
    
    /*//우표 1개 추가
    const homeTimeline5 = gsap.timeline({
        scrollTrigger: {
          trigger: "#wrap",
          scroller: window,
          scrub: 1,
          start: "top top",
          end: "+=130%",
        }
     });
    homeTimeline5.to(".home .stemp__item--up", {
    opacity:1,
    y:'10%',
    rotate:'-15deg',
    x:'-400%',
    scale:'1.8',
    rotateY: "-300deg",
    }, 1);*/
 


    //***** Profile/AboutMe
    //***** Projects
    //s:work intro
    //stemp cards ani
    /*
    function positionCardsInCircle() {
        const container = document.querySelector(".work .stemp__wrap");
        const cards = container.querySelectorAll(".work .stemp__item");
    
        //const radius = window.innerWidth/2;
        const radius = 1500;
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
            card.style.transform = `rotate(${deg + 90}deg)`; // 정방향 설정
        });
    }
    
    window.addEventListener("load", positionCardsInCircle);
    window.addEventListener("resize", positionCardsInCircle);
    */
    
    //s: digit
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


    // 메인 타임라인
   const projectsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".work-intro",
            scroller: window,
            scrub: 0.5,
            start: "top top",
            end: "bottom+=100vh bottom",
            onUpdate: (self) => {
                const progress = self.progress;

                // 연도 변경을 특정 progress 구간에서만 실행
                const min = 0;
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
    

     /*const workTimeline1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".work",
            scroller: window,
            scrub: .5,
            start: "top-=100% top",
            end: "bottom bottom",
        }
     });
     workTimeline1.to(".work .stemp__wrap", {
         rotate:'280deg'
      });*/
     

    //e:intro
    
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


var Example = Example || {};
Example.mixed = function () {
  const {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Mouse,
    MouseConstraint
  } = Matter;

  // 기본 설정
  const engine = Engine.create();
  engine.world.gravity.y =2;
  const world = engine.world;

  const render = Render.create({
    element: document.getElementById("shapes-box"),
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: false
    }
  });

  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  let shapes = [];
  let shapeCount = 0;
  let wallsRemoved = false;

  // walls 생성 함수
  let walls = [];
  const addWalls = () => {
    const newWalls = [
        Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true, render: { fillStyle: 'rgba(255, 255, 255, 1)' } }),
        Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { fillStyle: 'rgba(255, 255, 255, 1)' } }),
        Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { fillStyle: 'rgba(255, 255, 255, 1)' } })
    ];
    Composite.add(world, newWalls);
    walls = newWalls;
  };

  addWalls();

  // 도형 추가 함수
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

  // 초기 도형 등록
  const addInitialShapes = () => {
    //const textures = Array.from({ length: 14 }, (_, i) => `./img/img-client-stemp-${i + 1}.png`);
    const textures = [
        './img/img-client-stemp-1.png',
        './img/img-client-stemp-2.png',
        './img/img-client-stemp-3.png',
        './img/img-client-stemp-4.png',
        './img/img-client-stemp-5.png',
        './img/img-client-stemp-6.png',
        './img/img-client-stemp-7.png',
        './img/img-client-stemp-8.png',
        './img/img-client-stemp-10.png',
        './img/img-client-stemp-11.png',
        './img/img-client-stemp-13.png',
      ];
    const isMobile = window.innerWidth <= 768;
  
    // mobile /3, pc /5
    const baseOptions = {
      shape: "rectangle",
      width: 720 / (isMobile ? 3 : 5),
      height: 887 / (isMobile ? 3 : 5),
      scale: isMobile ? 0.3 : 0.2
    };
  
    const startY = -window.innerHeight / 50;
  
    
    textures.forEach((texture, i) => {
        const padding = 60; // 좌우 벽 피하기
        const randomX = padding + Math.random() * (window.innerWidth - padding * 2);
        addShape(texture, baseOptions, randomX, startY - i * 100);
      });
  };

  addInitialShapes();

  // 마우스 제어 추가
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  });

  Composite.add(world, mouseConstraint);
  render.mouse = mouse;

  // 리사이즈 이벤트 처리
  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    const widthChange = Math.abs(currentWidth - render.options.width);
    const heightChange = Math.abs(currentHeight - render.options.height);

    if (widthChange >= 200 || heightChange >= 200) {
      render.options.width = currentWidth;
      render.options.height = currentHeight;
      render.canvas.width = currentWidth;
      render.canvas.height = currentHeight;

      const newScale = Math.min(currentWidth, currentHeight) / 1000;

      shapes.forEach((body) => {
        const scaleRatio = newScale / body.initialScale;
        Matter.Body.scale(body, scaleRatio, scaleRatio);
        body.initialScale = newScale;

        if (body.circleRadius) {
          body.circleRadius = body.options.radius * newScale;
        }

        const centerX = (body.position.x / currentWidth) * currentWidth;
        const centerY = (body.position.y / currentHeight) * currentHeight;
        Matter.Body.setPosition(body, { x: centerX, y: centerY });
      });

      Composite.clear(world, false);
      addWalls();
    }
  });

  // 공개 인터페이스 반환
  return {
    engine,
    runner,
    render,
    canvas: render.canvas,
    stop: () => {
      Render.stop(render);
      Runner.stop(runner);
    }
  };
};

let hasRun = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasRun) {
      Example.mixed(); // 캔버스 실행
      hasRun = true;   // 한 번만 실행되도록
    }
  });
}, {
  threshold: 0
});

const target = document.querySelector('.work');
if (target) observer.observe(target);