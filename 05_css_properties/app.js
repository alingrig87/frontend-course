document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = btn.nextElementSibling;
    if (next && next.classList.contains('solution')) {
      next.style.display = next.style.display === 'block' ? 'none' : 'block';
    }
  });
});
