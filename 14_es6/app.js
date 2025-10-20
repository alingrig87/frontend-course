// app.js - comportament interactiv pentru tutorial ES6
// Comentarii: folosim vanilla JS; butoanele cu clasa .toggle-btn vor afișa/ascunde solutiile
document.addEventListener('DOMContentLoaded', () => {
  // Toggle show/hide pentru soluții
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const el = document.getElementById(targetId);
      if (!el) return;
      el.classList.toggle('hidden');
      btn.textContent = el.classList.contains('hidden') ? '👁️ Arată/Ascunde soluția' : '🙈 Ascunde soluția';
    });
  });

  // Generare dinamică a listei de întrebări de interviu (sunt multe)
  const qList = [
    {q: 'Ce diferență există între var, let și const?', a: 'var are scope de funcție; let și const au scope de bloc; const nu permite reatribuire.'},
    {q: 'Ce sunt arrow functions și când NU ar trebui folosite?', a: 'Sintaxă scurtă; nu au propriul this, nu pot fi folosite ca constructori.'},
    {q: 'Ce este destructuring și cum se folosește cu valori implicite?', a: 'Extrage valori din array/obj în variabile; poți defini valori implicite în destructuring.'},
    {q: 'Ce sunt template literals?', a: 'Șiruri delimitate cu backticks (`) care permit interpolare ${} și multiple linii.'},
    {q: 'Ce este o Promise?', a: 'Obiect care reprezintă o operațiune asincronă ce poate fi rezolvată sau respinsă.'},
    {q: 'Care este diferența între then/catch și async/await?', a: 'async/await oferă sintaxă mai clară; se bazează pe Promises.'},
    {q: 'Ce sunt modulele ES6 (import/export)?', a: 'Mecanism nativ pentru a împărți cod JS în fișiere reutilizabile.'},
    {q: 'Ce înseamnă "hoisting"?', a: 'Deplasarea declarațiilor de var și funcții în vârful scope-ului la execuție; let/const nu sunt accesibile înainte de declarație.'},
    {q: 'Ce este "rest" și "spread" operator?', a: '... folosit pentru a agrega sau extinde elemente (ex: [...arr], function(...args)).'},
    {q: 'Cum clonezi un obiect superficial în ES6?', a: 'Folosește spread: const clone = {...obj};'},
    {q: 'Ce sunt simbolurile (Symbol)?', a: 'Primitive unice, utile pentru chei non-colizionabile în obiecte.'},
    {q: 'Ce sunt template tagged functions?', a: 'Funcții care prelucrează template literals înainte de a returna un string.'},
    {q: 'Ce sunt generator functions?', a: 'Funcții cu asterisk (function*) care pot yield-ui valori și pot fi iterate.'},
    {q: 'Ce este Promise.all și când se folosește?', a: 'Rulează mai multe Promises în paralel; se rezolvă când toate rezolvă.'},
    {q: 'Cum tratezi erori cu async/await?', a: 'Folosești try/catch în jurul await-urilor.'},
    {q: 'Ce este optional chaining (?.)?', a: 'Permite accesul sigur la proprietăți nested fără a arunca eroare.'},
    {q: 'Ce este nullish coalescing (??)?', a: 'Operator care alege valoarea din dreapta doar dacă stânga este null sau undefined.'},
    {q: 'Care sunt avantajele folosirii const pentru obiecte?', a: 'Previne reatribuirea variabilei; nu împiedică modificarea proprietăților.'},
    {q: 'Ce este "dynamic import"?', a: 'import() returnează o Promise și permite încărcare lazy a modulelor.'},
    {q: 'Cum funcționează import/export default vs named?', a: 'Default export permite import fără acolade; named require acolade cu nume exact.'},
    {q: 'Ce sunt template strings multiliniar?', a: 'Backticks permit linii noi direct în string.'},
    {q: 'Care e diferența între shallow copy și deep copy?', a: 'Shallow copy copiază referințe pentru obiectele nested; deep copy creează copii independente.'},
    {q: 'Ce este "class" în ES6 și diferența față de funcțiile constructor?', a: 'class este sintactic sugar peste prototype-based inheritance; se comportă ca funcție constructor.'},
    {q: 'Ce sunt property shorthand și method shorthand în obiecte?', a: 'Syntactic sugar pentru a scrie {x} în loc de {x: x} și metode scurte.'},
    {q: 'Ce este "computed property names"?', a: 'Permite definirea cheilor dinamice în obiecte: {[expr]: value}.'},
    {q: 'Cum folosești Map și Set în ES6?', a: 'Colecții care permit chei de orice tip (Map) și valori unice (Set).'},
    {q: 'Ce este "for...of" vs "for...in"?', a: 'for...of iterează valori iterabile (array); for...in iterează chei enumerate.'},
    {q: 'Cum funcționează Default Parameters?', a: 'Poți seta valori implicite în definiția funcției: fn(a=1){...}.'},
    {q: 'Ce înseamnă "tail call optimization"?', a: 'Optimizare pentru apeluri recursive în poziție finală (nu suportată uniform).' }
  ];

  const container = document.querySelector('.question-list');
  qList.forEach((item, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'question';
    const html = `
      <p><strong>${idx+1}. ${item.q}</strong></p>
      <button class="eye-btn small" data-ans="${'ans-'+idx}">👁️ Vezi răspuns</button>
      <div id="${'ans-'+idx}" class="answer hidden">${item.a}</div>
    `;
    wrapper.innerHTML = html;
    container.appendChild(wrapper);
  });

  // delegate pentru butoanele de răspuns
  container.addEventListener('click', (e) => {
    if (e.target.matches('.eye-btn')) {
      const id = e.target.getAttribute('data-ans');
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('hidden');
      e.target.textContent = el.classList.contains('hidden') ? '👁️ Vezi răspuns' : '🙈 Ascunde';
    }
  });

  // Project task toggles: check/uncheck
  document.querySelectorAll('.project-tasks input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const li = cb.closest('li');
      if (cb.checked) li.style.opacity = '0.6';
      else li.style.opacity = '1';
    });
  });
});
