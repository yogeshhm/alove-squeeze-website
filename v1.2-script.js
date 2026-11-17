// Mobile navigation toggle
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

// Scroll progress bar
const progressBar = document.getElementById("scrollProgress");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

// Accessible Video Play/Pause Controller (WCAG 2.2.2)
const videoToggleBtn = document.getElementById("heroVideoToggle");
const heroVideo = document.getElementById("heroVideoElement");
if (videoToggleBtn && heroVideo) {
  videoToggleBtn.addEventListener("click", () => {
    if (heroVideo.paused) {
      heroVideo.play();
      videoToggleBtn.innerHTML = '<span class="toggle-icon">❚❚</span> <span class="toggle-text">PAUSE MOTION</span>';
      videoToggleBtn.setAttribute("aria-label", "Pause background video");
    } else {
      heroVideo.pause();
      videoToggleBtn.innerHTML = '<span class="toggle-icon">▶</span> <span class="toggle-text">PLAY MOTION</span>';
      videoToggleBtn.setAttribute("aria-label", "Play background video");
    }
  });
}

// GSAP Animations with Entrance and Exit Effects
if (window.gsap && window.ScrollTrigger && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero v1.2 Entrance Sequence
  const heroTL = gsap.timeline();
  heroTL
    .from(".announcement", { y: -30, opacity: 0, duration: 0.6, ease: "power2.out" })
    .from(".site-header", { y: -20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
    .from(".hero-v12 .hero-copy > *", {
      y: 35,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out"
    }, "-=0.2")
    .from(".hero-video-frame", {
      scale: 0.88,
      rotationY: 15,
      opacity: 0,
      duration: 1.15,
      ease: "power3.out"
    }, "-=0.6")
    .from(".glass-badge", {
      scale: 0,
      opacity: 0,
      duration: 0.65,
      stagger: 0.15,
      ease: "back.out(1.8)"
    }, "-=0.4")
    .from(".hero-flavour-dock", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.3");

  // Hero v1.2 Video 3D Cursor Parallax
  const heroContainer = document.querySelector(".hero-v12");
  const videoFrame = document.querySelector(".hero-video-frame");
  if (heroContainer && videoFrame) {
    const rx = gsap.quickTo(videoFrame, "rotationX", { duration: 0.8, ease: "power3" });
    const ry = gsap.quickTo(videoFrame, "rotationY", { duration: 0.8, ease: "power3" });

    heroContainer.addEventListener("pointermove", (e) => {
      const rect = heroContainer.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ry(px * 18);
      rx(-py * 12);
    });

    heroContainer.addEventListener("pointerleave", () => {
      ry(-1.5);
      rx(0);
    });

    // Hero Scroll Offload Morph
    const heroScroll = { trigger: heroContainer, start: "top top", end: "bottom top", scrub: 1 };
    gsap.to(".hero-video-frame", {
      y: 60,
      scale: 0.94,
      rotationX: 8,
      opacity: 0.75,
      scrollTrigger: heroScroll,
      ease: "none"
    });
    gsap.to(".hero-v12 .hero-copy", {
      y: -50,
      opacity: 0.3,
      scrollTrigger: heroScroll,
      ease: "none"
    });
  }

  // 2. Intro Section Scroll Entrance & Exit
  gsap.from(".intro-content", {
    y: 65,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".intro",
      start: "top 75%",
      end: "bottom top",
      toggleActions: "play reverse play reverse"
    }
  });

  gsap.from(".scribble", {
    rotate: -25,
    scale: 0.6,
    opacity: 0,
    duration: 0.9,
    ease: "back.out(1.5)",
    scrollTrigger: { trigger: ".intro", start: "top 65%" }
  });

  gsap.to(".intro-fruit", {
    y: -80,
    rotate: 45,
    ease: "none",
    scrollTrigger: { trigger: ".intro", start: "top bottom", end: "bottom top", scrub: 1 }
  });

  // 3. Stacked Flavour Cards
  document.querySelectorAll(".fpanel").forEach(p => {
    const img = p.querySelector(".fbottle img");
    const word = p.querySelector(".fword");
    const txt = p.querySelector(".ftext");
    const halo = p.querySelector(".fhalo");

    const enter = { trigger: p, start: "top bottom", end: "top top", scrub: 0.8 };
    if (img) gsap.from(img, { y: 160, rotationY: -22, scale: 0.85, ease: "none", scrollTrigger: enter });
    if (word) gsap.from(word, { x: p.matches(":nth-child(even)") ? -240 : 240, opacity: 0.3, ease: "none", scrollTrigger: enter });
    if (txt) gsap.from(txt, { y: 60, opacity: 0, ease: "none", scrollTrigger: { trigger: p, start: "top 85%", end: "top 25%", scrub: 0.8 } });
    if (halo) gsap.from(halo, { scale: 0.6, opacity: 0, ease: "none", scrollTrigger: enter });

    if (img) {
      const ry = gsap.quickTo(img, "rotationY", { duration: 0.7, ease: "power3" });
      const rx = gsap.quickTo(img, "rotationX", { duration: 0.7, ease: "power3" });
      p.addEventListener("pointermove", e => {
        const r = p.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 28);
        rx(-py * 12);
      });
      p.addEventListener("pointerleave", () => {
        ry(0);
        rx(0);
      });
    }
  });

  // 4. Guava Section
  gsap.from(".fruit-word", {
    scale: 0.5,
    rotate: -28,
    opacity: 0,
    duration: 1.1,
    ease: "back.out(1.4)",
    scrollTrigger: { trigger: ".guava-section", start: "top 65%" }
  });
  gsap.to(".ring-a", {
    rotate: 360,
    ease: "none",
    scrollTrigger: { trigger: ".guava-section", start: "top bottom", end: "bottom top", scrub: 3 }
  });
  gsap.to(".star-a", {
    y: -35,
    rotate: 45,
    ease: "none",
    scrollTrigger: { trigger: ".guava-section", start: "top bottom", end: "bottom top", scrub: 1 }
  });

  // 5. Orange Video Section
  gsap.from(".orange-heading", {
    y: 55,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: ".orange-section", start: "top 70%" }
  });
  gsap.from(".orange-frame", {
    y: 70,
    scale: 0.92,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".orange-section", start: "top 68%" }
  });

  // 6. Closing Section
  gsap.from(".closing h2", {
    y: 55,
    opacity: 0,
    scale: 0.92,
    duration: 0.9,
    scrollTrigger: { trigger: ".closing", start: "top 75%" }
  });
  gsap.from(".closing-button", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.15,
    ease: "power3.out",
    scrollTrigger: { trigger: ".closing", start: "top 72%" }
  });
}
