// app.js — logica show/hide pentru soluții și răspunsuri interviu
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
});
