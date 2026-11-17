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
  gsap.from(".hero-bottle", {
    y: 55, opacity: 0, scale: .94, duration: 1.15, delay: .2, ease: "power3.out"
  });
  gsap.to(".hero-bottle", {
    y: 34, scale: 1.035, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
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
