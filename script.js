const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-header nav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

// Motion is deliberately applied to the original product image only.
// No bottle rotation, reshaping, or substitute packaging is used.
if (window.gsap && window.ScrollTrigger && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-copy > *", {
    y: 28, opacity: 0, duration: .8, stagger: .12, ease: "power3.out"
  });
  gsap.from(".intro-content", {
    y: 60, opacity: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: ".intro", start: "top 72%" }
  });
  gsap.from(".scribble", {
    rotate: -22, scale: .7, opacity: 0, duration: .8,
    scrollTrigger: { trigger: ".intro", start: "top 65%" }
  });
  gsap.from(".fruit-word", {
    scale: .55, rotate: -25, opacity: 0, duration: 1.1, ease: "back.out(1.4)",
    scrollTrigger: { trigger: ".guava-section", start: "top 65%" }
  });
  gsap.from(".orange-heading", {
    y: 55, opacity: 0, duration: .9, ease: "power3.out",
    scrollTrigger: { trigger: ".orange-section", start: "top 70%" }
  });
  gsap.from(".orange-frame", {
    y: 70, scale: .94, opacity: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: ".orange-section", start: "top 68%" }
  });
  gsap.to(".star-a", {
    y: -28, rotate: 35, ease: "none",
    scrollTrigger: { trigger: ".guava-section", start: "top bottom", end: "bottom top", scrub: 1 }
  });
  gsap.from(".stage-bottle", {
    y: 90, scale: .9, opacity: 0, ease: "none",
    scrollTrigger: { trigger: ".product-section", start: "top 70%", end: "center center", scrub: 1 }
  });
  gsap.from(".stage-left", {
    x: -45, opacity: 0, duration: .8,
    scrollTrigger: { trigger: ".product-section", start: "top 65%" }
  });
  gsap.from(".stage-right", {
    x: 45, opacity: 0, duration: .8,
    scrollTrigger: { trigger: ".product-section", start: "top 65%" }
  });
  gsap.from(".closing h2", {
    y: 55, opacity: 0, duration: .9,
    scrollTrigger: { trigger: ".closing", start: "top 72%" }
  });
}

(function () {
  if (!window.gsap || !window.ScrollTrigger || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const hero = document.querySelector(".hero");
  gsap.from(".tb", { y: 150, opacity: 0, rotationY: -35, duration: 1.2, ease: "power3.out", stagger: .14, delay: .15 });
  const st = { trigger: hero, start: "top top", end: "bottom top", scrub: 1 };
  gsap.to(".tb-k", { x: -70, y: 40, scrollTrigger: st, ease: "none" });
  gsap.to(".tb-o", { x: 70, y: 40, scrollTrigger: st, ease: "none" });
  gsap.to(".tb-g", { y: 60, scale: 1.06, scrollTrigger: st, ease: "none" });
  const tilt = [...document.querySelectorAll(".tb")].map((el, i) => ({
    ry: gsap.quickTo(el, "rotationY", { duration: .7, ease: "power3" }),
    rx: gsap.quickTo(el, "rotationX", { duration: .7, ease: "power3" }),
    k: [.7, 1, .7][i]
  }));
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect(),
      px = (e.clientX - r.left) / r.width - .5,
      py = (e.clientY - r.top) / r.height - .5;
    tilt.forEach(t => {
      t.ry(px * 26 * t.k);
      t.rx(-py * 10 * t.k);
    });
  });
  hero.addEventListener("pointerleave", () => tilt.forEach(t => {
    t.ry(0);
    t.rx(0);
  }));
  document.querySelectorAll(".fpanel").forEach(p => {
    const img = p.querySelector(".fbottle img"),
      word = p.querySelector(".fword"),
      txt = p.querySelector(".ftext");
    const enter = { trigger: p, start: "top bottom", end: "top top", scrub: .8 };
    gsap.from(img, { y: 170, rotationY: -24, scale: .86, ease: "none", scrollTrigger: enter });
    gsap.from(word, { x: p.matches(":nth-child(even)") ? -220 : 220, ease: "none", scrollTrigger: enter });
    gsap.from(txt, { y: 60, opacity: 0, ease: "none", scrollTrigger: { trigger: p, start: "top 85%", end: "top 25%", scrub: .8 } });
    const ry = gsap.quickTo(img, "rotationY", { duration: .7, ease: "power3" }),
      rx = gsap.quickTo(img, "rotationX", { duration: .7, ease: "power3" });
    p.addEventListener("pointermove", e => {
      const r = p.getBoundingClientRect(),
        px = (e.clientX - r.left) / r.width - .5,
        py = (e.clientY - r.top) / r.height - .5;
      ry(px * 28);
      rx(-py * 12);
    });
    p.addEventListener("pointerleave", () => {
      ry(0);
      rx(0);
    });
  });
})();
