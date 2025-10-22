// app.js - comportament minim: show/hide pentru demo-uri, întrebări, exerciții.
// Fişierul este intenţionat mic şi comentat pentru uşurinţa înțelegerii.

document.addEventListener('DOMContentLoaded', function () {
  // butoane cu clasa .eye-btn au atribut data-target="#id"
  const buttons = document.querySelectorAll('.eye-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sel = btn.getAttribute('data-target');
      if (!sel) return;
      const target = document.querySelector(sel);
      if (!target) return;
      // toggle vizibilitate
      const isHidden = getComputedStyle(target).display === 'none';
      if (isHidden) {
        target.style.display = 'block';
        btn.textContent = '🙈 Ascunde';
      } else {
        target.style.display = 'none';
        btn.textContent = '👁️ Vezi rezolvare';
      }
    });
  });

  // ascundem toate .answer la început (pentru a fi sigur)
  document.querySelectorAll('.answer').forEach(a => a.style.display = 'none');

  // Comportament accesibil: permite toggle cu Enter/Space când butonul are focus
  buttons.forEach(btn => {
    btn.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        btn.click();
      }
    });
  });
});
