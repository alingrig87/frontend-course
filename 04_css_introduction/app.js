// Toggle răspunsuri la întrebările de interviu
const buttons = document.querySelectorAll(".eye-btn");
buttons.forEach((btn) => {
  6;
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    if (!answer) return;
    const visible = answer.style.display === "block";
    answer.style.display = visible ? "none" : "block";
    btn.textContent = visible ? " Vezi răspunsul" : " Ascunde răspunsul";
  });
});
// Evidențiere link activ când se face scroll
const links = document.querySelectorAll('.side-nav a[href^="#"]');
const sections = Array.from(links)
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);
function onScroll() {
  const pos = window.scrollY + 120; // offset pentru titluri
  let currentId = sections[0]?.id;
  for (const sec of sections) {
    if (sec.offsetTop <= pos) currentId = sec.id;
  }
  links.forEach((lnk) =>
    lnk.classList.toggle("active", lnk.getAttribute("href") === `#${currentId}`)
  );
}
document.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("load", onScroll);
