document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".side-nav a");
  const sections = document.querySelectorAll("article section");
  const themeToggle = document.getElementById("theme-toggle");

  /* ===== NAVBAR SCROLL ===== */
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href").substring(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ===== ACTIVE LINK ===== */
  window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom > 150) {
        currentSection = sec.id;
      }
    });
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active");
      }
    });
  });

  /* ===== FADE-IN ANIMATIONS ===== */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );
  sections.forEach((sec) => observer.observe(sec));

  /* ===== DARK/LIGHT THEME TOGGLE ===== */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme);

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "🌙" : "☀️";
  }

  // Setează corect icon-ul la încărcare
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", toggleTheme);
});
