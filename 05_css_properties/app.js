// --- Pentru butoanele din exerciții (toggle soluții) ---
document.querySelectorAll('.toggle-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetSelector = btn.getAttribute('data-target');
    const target = document.querySelector(targetSelector);

    if (!target) return; // dacă nu există, nu face nimic

    target.classList.toggle('hidden');

    // schimbăm textul butonului
    if (target.classList.contains('hidden')) {
      btn.textContent = '👁️ Vezi soluția';
    } else {
      btn.textContent = '🙈 Ascunde soluția';
    }
  });
});

// --- Pentru întrebările de interviu (eye-btn) ---
document.querySelectorAll('.eye-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling; // răspunsul e imediat după buton
    if (!answer) return;

    answer.classList.toggle('hidden');

    if (answer.classList.contains('hidden')) {
      btn.textContent = '👁️ Vezi răspunsul';
    } else {
      btn.textContent = '🙈 Ascunde răspunsul';
    }
  });
});
