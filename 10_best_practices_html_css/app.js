document.addEventListener("DOMContentLoaded", () => {
  // Pentru toate butoanele "Vezi detalii" (👁️)
  const eyeButtons = document.querySelectorAll(".eye-btn");

  eyeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) {
        target.style.display =
          target.style.display === "block" ? "none" : "block";
      }
    });
  });

  // Pentru toate butoanele de pe index.html care deschid pagini
  const navButtons = document.querySelectorAll(".details-btn");

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      fetch(target)
        .then((res) => {
          if (res.ok) {
            window.location.href = target;
          } else {
            alert("Fișierul nu a fost găsit: " + target);
          }
        })
        .catch(() => alert("Eroare la încărcarea fișierului: " + target));
    });
  });
});

  // === EXERCIȚII: butonul "Arată rezolvarea" ===
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const solution = btn.nextElementSibling;
      if (solution.style.display === "block") {
        solution.style.display = "none";
        btn.textContent = "👁️ Arată rezolvarea";
      } else {
        solution.style.display = "block";
        btn.textContent = "🙈 Ascunde rezolvarea";
      }
    });
  });

  // === ÎNTREBĂRI DE INTERVIU ===
  const interviewButtons = document.querySelectorAll("#interviu .eye-btn");
  interviewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      answer.style.display =
        answer.style.display === "block" ? "none" : "block";
    });
  });

  // Apăsare pe butoanele din capitole (cu data-target)
document.querySelectorAll(".eye-btn[data-target]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.target);
    if (target) {
      target.classList.toggle("visible");
    }
  });
});

// Apăsare pe butoanele "👁️ Vezi răspunsul" din exerciții (toggle-btn)
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const sol = btn.nextElementSibling;
    if (sol) sol.classList.toggle("visible");
  });
});

// Apăsare pe butoanele "👁️ Vezi răspunsul" din întrebările de interviu (fără data-target)
document.querySelectorAll(".card .eye-btn:not([data-target])").forEach((btn) => {
  btn.addEventListener("click", () => {
    const ans = btn.nextElementSibling;
    if (ans) ans.classList.toggle("visible");
  });
});
