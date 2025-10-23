// app.js - Funcționalitate show/hide pentru lecții
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".eye-btn");

  // ascundem toate răspunsurile la început
  document.querySelectorAll(".answer").forEach((a) => (a.style.display = "none"));

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sel = btn.getAttribute("data-target");
      if (!sel) return;
      const target = document.querySelector(sel);
      if (!target) return;

      const isHidden = getComputedStyle(target).display === "none";
      if (isHidden) {
        target.style.display = "block";
        btn.textContent = "🙈 Ascunde detalii";
      } else {
        target.style.display = "none";
        btn.textContent = "👁️ Vezi detalii";
      }
    });

    // accesibilitate: Enter / Space
    btn.addEventListener("keyup", (e) => {
      if (e.key === "Enter" || e.key === " ") btn.click();
    });
  });
});
