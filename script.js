
// LOADER
window.addEventListener("load", () => {
  document.getElementById("loader").classList.add("hide");
});

// HEADER
const header = document.getElementById("header");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
  backTop.classList.toggle("show", window.scrollY > 500);
});

// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// REVEAL ANIMATIONS
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// STATISTICS COUNTER
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.count);
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      counter.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.6 });

document.querySelectorAll("[data-count]").forEach(counter => {
  counterObserver.observe(counter);
});

// PROJECT FILTER
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectItems.forEach(item => {
      const match = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hidden", !match);
    });
  });
});

// FAQ ACCORDION
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    const wasActive = item.classList.contains("active");

    faqItems.forEach(faq => faq.classList.remove("active"));

    if (!wasActive) {
      item.classList.add("active");
    }
  });
});

// TESTIMONIAL SLIDER
const reviewTrack = document.getElementById("reviewTrack");
const reviews = [...reviewTrack.children];
let reviewIndex = 0;

function showReview() {
  const mobile = window.innerWidth <= 800;

  if (mobile) {
    reviewTrack.style.transform =
      `translateX(-${reviewIndex * 100}%)`;
  } else {
    reviewTrack.style.transform = "translateX(0)";
  }

  reviews.forEach((review, index) => {
    review.style.opacity =
      mobile && index !== reviewIndex ? ".35" : "1";
  });
}

document.getElementById("nextReview").addEventListener("click", () => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  showReview();
});

document.getElementById("prevReview").addEventListener("click", () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  showReview();
});

window.addEventListener("resize", showReview);
showReview();

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (name.length < 2 || message.length < 5) {
    formStatus.textContent = "Ma'lumotlarni to‘g‘ri kiriting.";
    return;
  }

  const subject = encodeURIComponent("NEXORA — yangi loyiha so‘rovi");
  const body = encodeURIComponent(
    `Ism: ${name}\nTelefon: ${phone}\nEmail: ${email}\nXizmat: ${service}\nXabar: ${message}`
  );

  formStatus.textContent =
    "Email dasturi ochilmoqda. Xabarni yuborish uchun email ilovasida tasdiqlang.";

  window.location.href =
    `mailto:hello@nexora.uz?subject=${subject}&body=${body}`;
});

// CURRENT YEAR
document.getElementById("year").textContent =
  new Date().getFullYear();
