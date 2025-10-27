// app.js - toggling show/hide pentru soluții și meniul hamburger
document.addEventListener('DOMContentLoaded', () => {
  // Toggle show/hide pentru răspunsuri
  document.querySelectorAll('.eye-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;
      const ans = document.getElementById(targetId);
      if (!ans) return;
      const isHidden = ans.classList.toggle('hidden');
      btn.textContent = isHidden ? '👁️ Vezi răspunsul' : '🙈 Ascunde răspunsul';
    });

    // accesibilitate: allow Enter / Space to toggle
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Hamburger menu toggling & accessibility
  const burger = document.querySelector('.burger');
  const mobileNav = document.getElementById('mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const nowHidden = mobileNav.classList.toggle('hidden');
      burger.setAttribute('aria-expanded', !nowHidden);
      mobileNav.setAttribute('aria-hidden', nowHidden);
      // simple animation class toggle (optional)
      mobileNav.classList.toggle('nav-open', !nowHidden);
    });
  }
});
