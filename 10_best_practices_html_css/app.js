// Bune practici HTML & CSS (naming, organizare) - app.js (gol, folosește pentru exerciții)
console.log("Chapter: Bune practici HTML & CSS (naming, organizare)");

// Show/Hide pentru exerciții
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sol = btn.nextElementSibling;
    sol.style.display = sol.style.display === 'block' ? 'none' : 'block';
    btn.textContent = sol.style.display === 'block' ? '🙈 Ascunde rezolvarea' : '👁️ Arată rezolvarea';
  });
});

// Show/Hide pentru întrebări de interviu
document.querySelectorAll('.eye-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const ans = btn.nextElementSibling;
    ans.style.display = ans.style.display === 'block' ? 'none' : 'block';
    btn.textContent = ans.style.display === 'block' ? '🙈 Ascunde răspunsul' : '👁️ Vezi răspunsul';
  });
});
