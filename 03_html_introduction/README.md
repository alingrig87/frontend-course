
# HTML Introduction — Tutorial Extins

Acest proiect oferă o lecție completă de **introducere în HTML** cu:
- **Teorie** pe concepte fundamentale;
- **Exerciții** pentru fiecare concept, cu **soluții Show/Hide**;
- **Întrebări de interviu** (răspunsuri ascunse/afișabile);
- **Mini-proiect** „Pagina CV” cu **10+ taskuri**;
- Exemple de **comenzi Git** pentru versionare.

Stilul și paleta sunt refolosite la maximum din template-ul existent.

---

## 🗂 Structură fișiere

```
.
├─ index.html     # Pagina principală: teorie, exerciții+soluții, întrebări de interviu, mini-proiect
├─ style.css      # Stiluri (bazate pe template-ul furnizat)
└─ app.js         # Logica Show/Hide pentru soluții și răspunsuri
```

**Lista Module (sidebar):**
- 01 — HTML Introduction
- 02 — CSS de bază
- 03 — JavaScript de bază
- 04 — React Intro
- 05 — Proiect final

---

## 📚 Conținutul lecției

- Structura de bază a unui document HTML
- `<head>`, meta taguri și SEO de bază
- Heading-uri & paragrafe (`h1..h6`, `p`)
- Linkuri & imagini (`a`, `img` + `alt`)
- Liste (`ul`, `ol`, `li`)
- Tabele (`table`, `thead`, `tbody`, `th[scope]`)
- Formulare (etichetare cu `label` ↔ `for`, `required`)
- Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
- Media (`video`, `audio`)
- Entități HTML & diacritice
- Atribute (`id`, `class`, `data-*`)
- Încărcarea scripturilor (`defer`, `async`)

---

## 📌 DOCTYPE (detaliat)

- **Ce este:** o declarație care anunță browserului că documentul folosește **standardul HTML5**.
- **De ce e important:** activează **Standards Mode** și evită **Quirks Mode** (mod vechi care poate strica layout-ul și box-model-ul).
- **Nu este un tag HTML** — nu are pereche de închidere; în HTML5 **nu** mai referă un DTD.
- **Case-insensitive:** poate fi scris și `<!doctype html>`, dar forma recomandată este **`<!DOCTYPE html>`**.
- **Universal:** aceeași declarație pentru toate paginile HTML5.
- **Verificare mod randare:** în consolă, `document.compatMode` ar trebui să fie `CSS1Compat` (standard).

Exemplu minim:
```html
<!DOCTYPE html>
<html lang="ro">
  <head> … </head>
  <body> … </body>
</html>
```

---

## ▶️ Cum rulezi local

**Varianta rapidă:**
1. Deschide `index.html` direct în browser.

**Varianta recomandată (auto-reload):**
1. Deschide folderul în VS Code.
2. Instalează extensia **Live Server**.
3. Click dreapta pe `index.html` → **Open with Live Server**.

---

## 👁️ Show/Hide — cum funcționează

În `app.js`:
- Butoanele `.toggle-btn` afișează/ascund blocurile de tip **soluție** (`.solution`).
- Butoanele `.eye-btn` afișează/ascund **răspunsurile** la întrebările de interviu (`.answer`).

Nu se folosesc biblioteci externe.

---

## 🧪 Mini-proiect: „Pagina CV” (rezumat taskuri)

1. DOCTYPE + `lang="ro"` + meta viewport + titlu.
2. `header` cu nume + navigație internă.
3. Secțiune „Despre” cu `h2`, paragrafe, imagine cu `alt`.
4. Semantic HTML: `main`, `section`, `article`, `footer`.
5. Listă abilități (`ul`).
6. Tabel experiență (`table`, `thead`, `tbody`, `th[scope]`).
7. Formular Contact (`label` ↔ `for`, `required`).
8. Video de prezentare (`<video controls>`).
9. Linkuri externe (GitHub, LinkedIn) cu `target="_blank"` + `rel="noopener"`.
10. Atribute `data-*` pe un buton (bonus: citește cu JS).
11. Validează HTML cu W3C Validator.
12. Versionare cu Git.

---

## 🐙 Comenzi Git utile

```bash
git init
git add .
git commit -m "feat: initialize HTML Introduction tutorial"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

**Exemple mesaje commit:**
- `feat: add interview questions for HTML semantics`
- `docs: extend exercise solutions for forms`
- `fix: correct table scope attributes`

**Naming branch:**
- `feat/html-forms`
- `docs/interview-questions`
- `fix/typo-headings`

---

## ♿ Accesibilitate — checklist scurt

- Setează `lang="ro"` pe `<html>`.
- Etichetează corect câmpurile: `label[for]` ↔ `input[id]`.
- Folosește descrieri `alt` utile pentru imagini.
- Respectă ierarhia heading-urilor (un singur `h1`).
- Folosește tabele **doar** pentru date tabulare.

---

## 🛠 Personalizare

- Refolosește clasele și paleta din `style.css`.
- Evită culori noi și stiluri suplimentare, pentru consistență cu template-ul.

---

## 🔌 Extensii posibile

- Butoane „Arată toate soluțiile” / „Ascunde toate soluțiile”.
- CSS pentru print („print-ready”).
- Organizare pe mai multe pagini (HTML/CSS/JS ca module separate).

---

© 2025 Frontend Learning Path — HTML Introduction
