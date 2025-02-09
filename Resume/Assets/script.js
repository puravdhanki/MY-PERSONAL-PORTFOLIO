// Initialize Lucide icons
lucide.createIcons();

// Theme toggle
const themeToggle = document.querySelector(".theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");

  const sunIcon = document.querySelector(".sun");
  const moonIcon = document.querySelector(".moon");

  sunIcon.style.display = isDark ? "block" : "none";
  moonIcon.style.display = isDark ? "none" : "block";
}

// Initialize theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme === "dark");
} else {
  setTheme(prefersDark.matches);
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark");
  setTheme(!isDark);
});

// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(".fade-in, .slide-in").forEach((el) => {
  observer.observe(el);
});

// Smooth progress bar animation for skills
const skillBars = document.querySelectorAll(".skill-progress");
const skillsSection = document.querySelector(".skills");

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      skillBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

skillsObserver.observe(skillsSection);

// Contact form handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  // Here you would typically send the form data to your backend
  console.log("Form submitted:", formData);

  // Reset form
  contactForm.reset();

  // Show success message (you can enhance this)
  alert("Message sent successfully!");
});
