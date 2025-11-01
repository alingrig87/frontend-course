document.querySelectorAll('.toggle-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = btn.nextElementSibling;
    if (next && next.classList.contains('solution')) {
      next.style.display = next.style.display === 'block' ? 'none' : 'block';
    }
  });
});
<script>
  // Selectăm toate butoanele const buttons =
  document.querySelectorAll('.eye-btn'); buttons.forEach(button ={' '}
  {button.addEventListener('click', () => {
    const answer = button.nextElementSibling; // răspunsul imediat după buton
    answer.classList.toggle('hidden'); // adaugă/șterge clasa hidden
    // Schimbăm textul butonului
    if (answer.classList.contains('hidden')) {
      button.textContent = '👁️ Vezi răspunsul';
    } else {
      button.textContent = '🙈 Ascunde răspunsul';
    }
  })}
  );
</script>;
