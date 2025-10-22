// Funcție simplă pentru testare
function aduna(a, b) {
  return a + b;
}

// Test logic (fără Jest, direct în browser)
const rezultat = aduna(2, 3);
const rezultatEl = document.getElementById("testResult");

if (rezultat === 5) {
  rezultatEl.textContent = "✅ Test trecut! Funcția adună corect.";
  rezultatEl.style.color = "green";
} else {
  rezultatEl.textContent = "❌ Test eșuat! Verifică funcția.";
  rezultatEl.style.color = "red";
}
