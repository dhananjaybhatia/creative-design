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
    setInterval(function () {
      if (grow < 100) {
        h5Timer.innerHTML = grow++;
      } else {
        h5Timer.innerHTML = grow;
        console.log(grow);
      }
    }, 25);
  },
});

tl.to("#loader", {
  opacity: 0,
  delay: 2.8,
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


