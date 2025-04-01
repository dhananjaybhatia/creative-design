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
  tl.from(".hero h1, #hero3 h2", {
    y: 150,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power4.out"
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
cursorAnimation();
