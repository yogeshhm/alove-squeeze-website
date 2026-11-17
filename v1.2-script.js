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

// Background Video Play/Pause Controller (WCAG 2.2.2)
const videoToggleBtn = document.getElementById("bgVideoToggle");
const heroBgVideo = document.getElementById("heroBgVideo");
if (videoToggleBtn && heroBgVideo) {
  videoToggleBtn.addEventListener("click", () => {
    if (heroBgVideo.paused) {
      heroBgVideo.play();
      videoToggleBtn.innerHTML = '<span class="btn-icon">❚❚</span> <span class="btn-text">PAUSE BG</span>';
      videoToggleBtn.setAttribute("aria-label", "Pause background video");
    } else {
      heroBgVideo.pause();
      videoToggleBtn.innerHTML = '<span class="btn-icon">▶</span> <span class="btn-text">PLAY BG</span>';
      videoToggleBtn.setAttribute("aria-label", "Play background video");
    }
  });
}

// GSAP Animations with 3D Scroll Scrollytelling
if (window.gsap && window.ScrollTrigger && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initial Hero Load Entrance
  const heroTL = gsap.timeline();
  heroTL
    .from(".announcement", { y: -30, opacity: 0, duration: 0.6, ease: "power2.out" })
    .from(".site-header", { y: -20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
    .from(".hero-top-badge-row", { y: -20, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
    .from(".hero-center-titles > *", {
      y: 35,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out"
    }, "-=0.4")
    .from(".bottle-3d-card", {
      y: 120,
      scale: 0.85,
      opacity: 0,
      duration: 1.1,
      stagger: 0.14,
      ease: "power3.out"
    }, "-=0.6")
    .from(".hero-bottom-bar", {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.4");

  // 2. 3D Scroll Scrollytelling & 3D Camera Scrub
  const pinWrap = document.getElementById("heroPinWrap");
  const stage = document.getElementById("hero3DStage");
  const bgVideo = document.getElementById("heroBgVideo");
  const content = document.querySelector(".hero-3d-content");
  const titles = document.querySelector(".hero-center-titles");
  const kiwiCard = document.querySelector(".card-kiwi");
  const guavaCard = document.querySelector(".card-guava");
  const orangeCard = document.querySelector(".card-orange");

  if (pinWrap && stage) {
    // Only pin on screens > 900px to allow native responsive flow on mobile
    if (window.innerWidth > 900) {
      const tl3D = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: stage,
          anticipatePin: 1
        }
      });

      // Background video zoom in 3D
      tl3D.to(bgVideo, {
        scale: 1.28,
        filter: "contrast(1.15) saturate(1.25) brightness(0.6)",
        ease: "none"
      }, 0);

      // Center titles float forward in 3D and dissolve
      tl3D.to(titles, {
        y: -100,
        scale: 1.15,
        opacity: 0,
        ease: "power2.in"
      }, 0);

      // 3D Bottles Fan-Out & Fly Through Camera
      tl3D.to(kiwiCard, {
        x: -360,
        y: 80,
        rotationY: -45,
        rotationZ: -18,
        opacity: 0.1,
        ease: "power1.inOut"
      }, 0);

      tl3D.to(orangeCard, {
        x: 360,
        y: 80,
        rotationY: 45,
        rotationZ: 18,
        opacity: 0.1,
        ease: "power1.inOut"
      }, 0);

      tl3D.to(guavaCard, {
        scale: 1.35,
        y: 90,
        ease: "power1.inOut"
      }, 0);
    }

    // Interactive 3D Cursor Gyroscope / Pointer Tracking
    stage.addEventListener("pointermove", (e) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(content, {
        rotationY: px * 18,
        rotationX: -py * 12,
        transformPerspective: 1200,
        duration: 0.7,
        ease: "power3.out"
      });

      gsap.to(bgVideo, {
        x: -px * 25,
        y: -py * 18,
        duration: 0.9,
        ease: "power3.out"
      });
    });

    stage.addEventListener("pointerleave", () => {
      gsap.to(content, {
        rotationY: 0,
        rotationX: 0,
        duration: 1.1,
        ease: "power3.out"
      });
      gsap.to(bgVideo, {
        x: 0,
        y: 0,
        duration: 1.1,
        ease: "power3.out"
      });
    });
  }

  // 3. Intro Section Scroll Entrance & Exit
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

  // 4. Stacked Flavour Cards
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

  // 5. Guava Section
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

  // 6. Orange Video Section
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

  // 7. Closing Section
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
