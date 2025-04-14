function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  let tl = gsap.timeline();

  tl.from(".line h1, .line h2", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
    opacity: 0,
  });

  tl.from("#line1-part1, .line h2", {
    opacity: 0,
    onStart: function () {
      const h5Timer = document.querySelector("#line1-part1 h5");
      let grow = 0;

      const interval = setInterval(function () {
        if (grow < 100) {
          h5Timer.innerHTML = grow++;
        } else {
          h5Timer.innerHTML = grow;

          clearInterval(interval);
        }
      }, 25);
    },
  });

  tl.to("#loader", {
    opacity: 0,
    delay: 1.9,
    duration: 0.3,
  });

  tl.from("#page1", {
    delay: 0.3,
    y: 1600,
    opacity: 0,
    ease: Power4,
  });

  tl.to("#loader", {
    display: "none",
  });
  tl.from(".hero h1, #hero2 h1, #hero3 h2, #hero4 h1", {
    y: 150,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power4.out",
  });

  tl.from(
    "#page2",
    {
      opacity: 0,
    },
    "-=1"
  );

  tl.from("#nav", {
    opacity: 0,
  });
}

// function cursorAnimation() {
//   document.addEventListener("mousemove", function (debts) {
//     gsap.to("#crsr", {
//       left: debts.x,
//       top: debts.y,
//     });
//   });

//   Shery.makeMagnet("#nav-part2 h4", {});
// }

// function cursorAnimation() {
//   const crsr = document.querySelector("#crsr");

//   const setX = gsap.quickSetter(crsr, "left", "px");
//   const setY = gsap.quickSetter(crsr, "top", "px");

//   document.addEventListener("mousemove", (e) => {
//     setX(e.clientX);
//     setY(e.clientY);
//     duration: 0.3;
//     ease: "power3.out"
//   });

//   try {
//     Shery.makeMagnet("#nav-part2 h4", {});
//   } catch (err) {
//     console.warn("Shery.makeMagnet error:", err);
//   }
// }
function cursorAnimation() {
  const crsr = document.querySelector("#crsr");

  const setX = gsap.quickSetter(crsr, "left", "px");
  const setY = gsap.quickSetter(crsr, "top", "px");

  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // GSAP's ticker runs every animation frame (60fps)
  gsap.ticker.add(() => {
    posX += (mouseX - posX) * 0.15; // adjust 0.15 for more/less trail
    posY += (mouseY - posY) * 0.15;

    setX(posX);
    setY(posY);
  });

  try {
    Shery.makeMagnet("#nav-part2 h4", {});
  } catch (err) {
    console.warn("Shery.makeMagnet error:", err);
  }

  const videoContainer = document.querySelector("#video-container");
  const videoCursor = document.querySelector("#video-cursor");
  const mainCursor = document.querySelector("#crsr");
  const video = document.querySelector("#video-container video")
  const previewImage = videoContainer.querySelector("#video-container img");
  
  // Store the original/default position of the video cursor
  const defaultPos = {
    left: "80%",  // or any starting position you want
    top: "-10%"   // same as in your CSS
  };
  
  // On mouse enter
  videoContainer.addEventListener("mouseenter", () => {
    gsap.to(mainCursor, { opacity: 0 });
    gsap.to(videoCursor, { opacity: 1 });
  });
  
  // On mouse move — set position immediately (no animation to avoid shaking)
  videoContainer.addEventListener("mousemove", (e) => {
    gsap.set(videoCursor, {
      left: e.offsetX,
      top: e.offsetY,
    });
  });
  
  // On mouse leave — fade out and return to original position
  videoContainer.addEventListener("mouseleave", () => {
    gsap.to(mainCursor, { opacity: 1 });
    gsap.to(videoCursor, {
      opacity: 1  ,
      left: defaultPos.left,
      top: defaultPos.top,
      duration: 0.5,
      ease: "power3.out"
    });
  });

  let isPlaying = false
  
  // Play video on click
  videoContainer.addEventListener("click", () => {
    if (!isPlaying) {
      video.play();
      gsap.to(video, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(previewImage, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    // Change to pause icon
    videoCursor.innerHTML = `<i class="ri-pause-line"></i>`;
    gsap.to(videoCursor, { scale: 0.5, duration: 0.3 });

      isPlaying = true;
    } else {
      video.pause();
      gsap.to(video, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(previewImage, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    // Change to play icon
    videoCursor.innerHTML = `<i class="ri-play-mini-fill"></i>`;
    gsap.to(videoCursor, { scale: 1, duration: 0.3 });
      isPlaying = false;
    }
  });

  function resetVideo() {
    video.pause();
    isPlaying = false;
    videoCursor.innerHTML = `<i class="ri-play-mini-fill"></i>`;
    gsap.to(videoCursor, { scale: 1, duration: 0.3 });
    gsap.to(video, { opacity: 0, duration: 0.5, ease: "power2.out" });
    gsap.to(previewImage, { opacity: 1, duration: 0.5, ease: "power2.out" });
  }

  videoContainer.addEventListener("mouseleave", () => {
    if (isPlaying) {
      resetVideo()
    }
  
    gsap.to(mainCursor, { opacity: 1 });
  
    gsap.to(videoCursor, {
      opacity: 1,
      left: defaultPos.left,
      top: defaultPos.top,
      duration: 0.5,
      ease: "power3.out"
    });

  });
}

function sheryAnimation() {
  Shery.imageEffect(".img-div", {
    style: 5,
    config: {"a":{"value":2.5,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7857096237313579},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.2,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.35,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
    gooey: true,

  });
}

function flagAnimation() {
  const flag = document.querySelector("#flag");
  const hero3 = document.querySelector("#hero3");
  const mainCursor = document.querySelector("#crsr");

  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;
  let lastX = 0;
  let rotation = 0;
  let skewX = 0;

  // On enter — place + fade + pop
  hero3.addEventListener("mouseenter", (e) => {
    mouseX = e.clientX - 50;
    mouseY = e.clientY - 50;
    posX = mouseX;
    posY = mouseY;

    gsap.to(mainCursor, {
      opacity:0
    })
    gsap.set(flag, {
      x: posX,
      y: posY,
      scale: 0.8,
      rotation: 0,
      skewX: 0
    });

    gsap.to(flag, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.7)"
    });
  });

  // On move — update target and curve values
  hero3.addEventListener("mousemove", (e) => {
    mouseX = e.clientX - 50;
    mouseY = e.clientY - 50;

    const dx = mouseX - lastX;
    rotation = gsap.utils.clamp(-8, 8, dx * 0.3); // subtle rotation
    skewX = gsap.utils.clamp(-10, 10, dx * 0.6);   // flag pull curve
    lastX = mouseX;
  });

  // On leave — fade + shrink
  hero3.addEventListener("mouseleave", () => {
    gsap.to(mainCursor, {
      opacity:1
    })
    gsap.to(flag, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.inOut"
    });
  });

  // Animate smoothly
  gsap.ticker.add(() => {
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;

    gsap.set(flag, {
      x: posX,
      y: posY,
      rotation: rotation,
      skewX: skewX
    });
  });
}

function textAnimate() {
  const footer = document.querySelector("#footer");
  const $text = $('#footer h1');

  // Step 2: Initialize textillate once
  $text.textillate({
    autoStart: true,
    in: { effect: 'fadeInLeftBig', sequence: true },
  });

  // Step 3: Trigger animation only when user hovers on footer
  footer.addEventListener("mouseenter", () => {
    $text.textillate('stop').textillate('in');
  });

}


locomotiveAnimation();
loadingAnimation();
cursorAnimation();
sheryAnimation();
flagAnimation()
textAnimate();
