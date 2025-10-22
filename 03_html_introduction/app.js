// app.js — toggle soluții + întrebări, smooth scroll + scroll spy
document.addEventListener('DOMContentLoaded', () => {
  // Toggle pentru soluțiile exercițiilor
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (!target) return;
      const el = document.querySelector(target);
      if (!el) return;
      el.classList.toggle('hidden');
      btn.textContent = el.classList.contains('hidden') ? '👁️ Vezi soluția' : '🙈 Ascunde soluția';
    });
  });

  // Toggle pentru răspunsurile la întrebări de interviu
  document.querySelectorAll('.question .eye-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.parentElement.querySelector('.answer');
      if (!answer) return;
      answer.classList.toggle('hidden');
      btn.textContent = answer.classList.contains('hidden') ? '👁️ Vezi răspunsul' : '🙈 Ascunde răspunsul';
    });
  });

  // Smooth scroll + Scroll spy pentru navbar lecții
  const navLinks = Array.from(document.querySelectorAll('.lesson-side-nav a[href^="#"]'));
  const targets = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  // Smooth scroll pe click
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.forEach(l => l.classList.remove('active'));
      a.classList.add('active');
      history.replaceState(null, '', id);
    });
  });

  // Scroll spy
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting && id) {
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '0px 0px -60% 0px', threshold: 0.2 });

  targets.forEach(t => io.observe(t));
});
