// ============================================
// VigneshTech — Premium Portfolio JS Enhancements
// ============================================

// 1️⃣ Footer Year Auto Update
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 2️⃣ Logo Animation (Draw + Gentle Pulse)
const logoV = document.querySelector('.logo-v');
const logoWrap = document.querySelector('.logo-wrap');

if (logoV) {
  const pathLength = logoV.getTotalLength();
  logoV.style.strokeDasharray = pathLength;
  logoV.style.strokeDashoffset = pathLength;

  // Animate the "V" drawing
  logoV.animate(
    [
      { strokeDashoffset: pathLength },
      { strokeDashoffset: 0 }
    ],
    {
      duration: 2500,
      easing: 'ease-in-out',
      fill: 'forwards'
    }
  );
}

if (logoWrap) {
  // Gentle floating pulse effect
  logoWrap.animate(
    [
      { transform: 'translateY(0) scale(1)' },
      { transform: 'translateY(-5px) scale(1.03)' },
      { transform: 'translateY(0) scale(1)' }
    ],
    {
      duration: 4000,
      iterations: Infinity,
      easing: 'ease-in-out'
    }
  );
}

// 3️⃣ Scroll Reveal Animations (Fade-up)
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.15 }
  );

  revealEls.forEach(el => observer.observe(el));
}

// 4️⃣ Smooth Internal Navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.length > 1) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// 5️⃣ Optional: Hero fade-in on page load
window.addEventListener('load', () => {
  const heroText = document.querySelector('.hero-content');
  if (heroText) {
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroText.style.transition = 'all 1.2s ease-out';
      heroText.style.opacity = '1';
      heroText.style.transform = 'translateY(0)';
    }, 300);
  }
});
// ========== THEME TOGGLE FUNCTIONALITY ==========

// Select toggle and body
const themeSwitch = document.getElementById("themeSwitch");
const body = document.body;

// Check saved preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-theme");
  themeSwitch.checked = true;
}

// Listen for toggle changes
themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  }
});

// 7️⃣ Back To Top Button
const backToTopBtn = document.getElementById("backToTopBtn");

// Show or hide button on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 250) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// *** Throttled scroll handler for best performance ****
let ticking = false;
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 250) {
          backToTopBtn.classList.add("show");
        } else {
          backToTopBtn.classList.remove("show");
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Slow smooth scroll animation
function slowScrollToTop() {
  const currentPos = window.scrollY;

  if (currentPos > 0) {
    window.scrollTo(0, currentPos - currentPos * 0.08); // smooth slow easing
    requestAnimationFrame(slowScrollToTop);
  }
}

// Scroll to top slowly on button click
backToTopBtn.addEventListener("click", () => {
  requestAnimationFrame(slowScrollToTop);
});

