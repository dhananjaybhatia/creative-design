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

  // tl.to("#loader", {
  //   display: "none",
  // });
  tl.to("#loader", {
    display: "none",
  });
  tl.from(".hero h1, #hero3 h2", {
    y: 150,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power4.out",
  });

  tl.from("#nav", {
    opacity: 0,
  });
}

function cursorAnimation() {
  document.addEventListener("mousemove", function (debts) {
    console.log(debts.x);
    gsap.to("#crsr", {
      left: debts.x,
      top: debts.y,
    });
  });

  Shery.makeMagnet("#nav-part2 h4", {});
}
loadingAnimation();
// cursorAnimation();
locomotiveAnimation();
