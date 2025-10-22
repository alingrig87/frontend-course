// Toggle răspunsuri la întrebările de interviu
const buttons = document.querySelectorAll('.eye-btn');
buttons.forEach((btn) => {
btn.addEventListener('click', async () => {
const answer = btn.nextElementSibling;
if (answer && answer.classList.contains('answer')) {
const visible = answer.style.display === 'block';
answer.style.display = visible ? 'none' : 'block';
btn.textContent = visible ? ' Vezi răspunsul' : ' Ascunde răspunsul';
return;
}
// Butonul de încărcare TODO-uri (are listă după el)
if (btn.id === 'load-todos') {
await loadTodos(btn);
13
}
});
});
async function loadTodos(trigger) {
const list = document.getElementById('todos');
if (!list) return;
trigger.disabled = true;
const original = trigger.textContent;
trigger.textContent = 'Se încarcă...';
try {
const res = await fetch('https://jsonplaceholder.typicode.com/todos?
_limit=5');
if (!res.ok) throw new Error('HTTP ' + res.status);
const todos = await res.json();
list.innerHTML = '';
todos.forEach((t) => {
const li = document.createElement('li');
li.textContent = (t.completed ? ' ' : ' ') + t.title;
list.appendChild(li);
});
} catch (err) {
list.innerHTML = '<li style="color:#b91c1c">Eroare la încărcare: ' +
err.message + '</li>';
} finally {
trigger.disabled = false;
trigger.textContent = original;
}
}
// Evidențiere link activ la scroll
const links = document.querySelectorAll('.side-nav a[href^="#"]');
const sections = Array.from(links).map((a) =>
document.querySelector(a.getAttribute('href'))).filter(Boolean);
function onScroll() {
const pos = window.scrollY + 120;
let currentId = sections[0]?.id;
for (const sec of sections) {
if (sec.offsetTop <= pos) currentId = sec.id;
}
links.forEach((lnk) => lnk.classList.toggle('active',
lnk.getAttribute('href') === `#${currentId}`));
}
14
document.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', onScroll);