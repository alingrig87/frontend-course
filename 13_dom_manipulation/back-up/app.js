// app.js — DOM Manipulation: explicații + exemple interactive (RO)
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".side-nav a");
  const area = document.getElementById("exercise-area");

  // Mapare secțiuni - păstrăm ordinea conform meniului
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      const section = link.dataset.section || link.getAttribute("data-section");
      loadSection(section);
    });
  });

  // === Funcții pentru încărcarea fiecărei secțiuni ===
  function loadSection(section) {
    switch (section) {
      case "intro":
        loadIntro();
        break;
      case "select":
        loadSelect();
        break;
      case "modify":
        loadModify();
        break;
      case "create-remove":
        loadCreateRemove();
        break;
      case "traverse":
        loadTraverse();
        break;
      case "events":
        loadEvents();
        break;
      case "forms":
        loadForms();
        break;
      case "xo":
        loadXO();
        break;
      case "todo":
        loadTodo();
        break;
      case "tema":
        loadTema();
        break;
      default:
        area.innerHTML = "<h2>Secțiune necunoscută</h2>";
    }
  }

  // === 1. Ce este DOM-ul ===
  function loadIntro() {
    area.innerHTML = `
      <h2>1. Ce este DOM-ul</h2>
      <p>
        DOM (Document Object Model) este o reprezentare în memorie a structurii documentului HTML.
        Browser-ul parsează HTML-ul și construiește un arbore de noduri (elemente, text, comment),
        iar JavaScript poate interacționa cu acest arbore pentru a citi sau modifica pagina.
      </p>

      <h3>Explicație detaliată</h3>
      <p>
        Gândește-te la DOM ca la o hartă a paginii: fiecare element (body, header, p, div) devine un nod
        pe care îl poți accesa. Acest lucru permite operații dinamice: adăugare/ștergere de conținut,
        modificare de stiluri, răspuns la evenimente și multe altele.
      </p>

      <h3>Exemplu simplu</h3>
      <pre><code>// JS (exemplu)
const h1 = document.querySelector('h1');
console.log(h1.textContent);
h1.style.color = 'crimson';
</code></pre>

      <p>Apasă butonul de mai jos pentru a vedea un exemplu live (se va modifica titlul paginii):</p>
      <button id="intro-demo">Activează exemplu</button>
      <div id="intro-result" style="margin-top:12px;"></div>
    `;

    const btn = document.getElementById("intro-demo");
    btn.addEventListener("click", () => {
      const h1 = document.querySelector("h1");
      if (!h1) return;
      const prev = document.getElementById("intro-result");
      h1.textContent = "DOM activ — experiment în curs";
      h1.style.transition = "all 0.3s ease";
      h1.style.transform = "translateY(-2px)";
      prev.textContent =
        "Titlul a fost modificat din JavaScript (vedeți consola pentru textul original).";
      console.log("Titlul curent:", h1.textContent);
    });
  }

  // === 2. Selectarea elementelor ===
  function loadSelect() {
    area.innerHTML = `
      <h2>2. Selectarea elementelor</h2>
      <p>
        Există mai multe metode utile pentru a selecta elemente în DOM:
      </p>
      <ul>
        <li><code>getElementById(id)</code> — un singur element după id.</li>
        <li><code>getElementsByClassName(cls)</code> — colecție live de elemente după clasă.</li>
        <li><code>getElementsByTagName(tag)</code> — colecție după tag (ex: 'p', 'li').</li>
        <li><code>querySelector(selector)</code> — primul element care corespunde selectorului CSS.</li>
        <li><code>querySelectorAll(selector)</code> — NodeList (static) cu toate elementele potrivite.</li>
      </ul>

      <h3>Exemplu live</h3>
      <p>Folosește butoanele pentru a selecta și evidenția elementele demonstrative.</p>

      <div id="select-demo" style="margin-top:12px;">
        <p id="para-1">Paragraf #1 (id = para-1)</p>
        <p class="note">Paragraf cu clasa <code>note</code> (1)</p>
        <p class="note">Paragraf cu clasa <code>note</code> (2)</p>

        <button id="sel-by-id">Selectează by ID</button>
        <button id="sel-by-class">Selectează by Class</button>
        <button id="sel-qsa">Selectează querySelectorAll</button>

        <div id="select-output" style="margin-top:10px;"></div>
      </div>
    `;

    document.getElementById("sel-by-id").addEventListener("click", () => {
      const p = document.getElementById("para-1");
      flash(p);
      showOutput("getElementById → " + p.textContent);
    });

    document.getElementById("sel-by-class").addEventListener("click", () => {
      const nodes = document.getElementsByClassName("note"); // HTMLCollection
      Array.from(nodes).forEach((n) => flash(n));
      showOutput("getElementsByClassName → " + nodes.length + " elemente");
    });

    document.getElementById("sel-qsa").addEventListener("click", () => {
      const nodes = document.querySelectorAll("#select-demo p");
      nodes.forEach((n) => (n.style.fontWeight = "600"));
      showOutput(
        "querySelectorAll → " + nodes.length + " elemente (stil modif.)"
      );
      setTimeout(() => nodes.forEach((n) => (n.style.fontWeight = "")), 1000);
    });

    function flash(el) {
      const prevBg = el.style.backgroundColor;
      el.style.backgroundColor = "#fff3b0";
      setTimeout(() => (el.style.backgroundColor = prevBg), 600);
    }

    function showOutput(text) {
      document.getElementById("select-output").textContent = text;
    }
  }

  // === 3. Modificarea textului și stilurilor ===
  function loadModify() {
    area.innerHTML = `
      <h2>3. Modificarea textului și stilurilor</h2>
      <p>
        Poți schimba textul unui element folosind <code>textContent</code> sau <code>innerHTML</code>.
        Pentru stiluri, folosește <code>element.style.prop</code> sau adaugă/elimină clase CSS.
      </p>

      <h3>Exemplu: schimbă text + stil</h3>
      <div>
        <p id="mod-target">Text original — modifică-mă!</p>
        <button id="btn-change-text">Schimbă text</button>
        <button id="btn-add-class">Adaugă clasă</button>
        <button id="btn-toggle-hidden">Ascunde/Afișează</button>
      </div>

      <pre><code>// Exemplu JS
document.getElementById('mod-target').textContent = 'Text nou';
document.getElementById('mod-target').style.color = 'blue';
</code></pre>
    `;

    document.getElementById("btn-change-text").addEventListener("click", () => {
      const t = document.getElementById("mod-target");
      t.textContent =
        "Textul a fost actualizat! (" + new Date().toLocaleTimeString() + ")";
      t.style.fontStyle = "italic";
    });

    document.getElementById("btn-add-class").addEventListener("click", () => {
      const t = document.getElementById("mod-target");
      t.classList.toggle("highlight-js");
      // definim stil direct dacă clasa nu există în CSS (fallback)
      if (t.classList.contains("highlight-js")) {
        t.style.backgroundColor = "#eaffea";
        t.style.padding = "6px";
        t.style.borderRadius = "4px";
      } else {
        t.style.backgroundColor = "";
        t.style.padding = "";
      }
    });

    document
      .getElementById("btn-toggle-hidden")
      .addEventListener("click", () => {
        const t = document.getElementById("mod-target");
        if (t.style.display === "none") t.style.display = "";
        else t.style.display = "none";
      });
  }

  // === 4. Crearea și eliminarea elementelor ===
  function loadCreateRemove() {
    area.innerHTML = `
      <h2>4. Crearea și eliminarea elementelor</h2>
      <p>
        Poți crea elemente cu <code>document.createElement()</code>, seta proprietăți și
        insera în arbore cu <code>appendChild</code>, <code>insertBefore</code> sau
        <code>element.append()</code>. Pentru a elimina, folosește <code>remove()</code> sau
        <code>parent.removeChild(child)</code>.
      </p>

      <h3>Exemplu live: galerie dinamică</h3>
      <div>
        <input id="new-item-text" placeholder="Text element nou" />
        <button id="btn-add">Adaugă element</button>
        <button id="btn-clear">Șterge tot</button>
        <ul id="dyn-list" style="margin-top:10px;"></ul>
      </div>

      <pre><code>// Exemplu JS
const li = document.createElement('li');
li.textContent = 'Element nou';
document.getElementById('dyn-list').appendChild(li);
</code></pre>
    `;

    const addBtn = document.getElementById("btn-add");
    const clearBtn = document.getElementById("btn-clear");
    const input = document.getElementById("new-item-text");
    const list = document.getElementById("dyn-list");

    addBtn.addEventListener("click", () => {
      const val = input.value.trim();
      if (!val) return alert("Scrie ceva în câmp!");
      const li = document.createElement("li");
      li.textContent = val;
      // buton de ștergere per element
      const del = document.createElement("button");
      del.textContent = "✖";
      del.setAttribute("aria-label", "Șterge element");
      del.style.marginLeft = "8px";
      del.addEventListener("click", () => li.remove());
      li.appendChild(del);
      list.appendChild(li);
      input.value = "";
    });

    clearBtn.addEventListener("click", () => {
      if (!list.hasChildNodes()) return;
      if (confirm("Ștergi toate elementele?")) list.innerHTML = "";
    });
  }

  // === 5. Traversarea DOM-ului ===
  function loadTraverse() {
    area.innerHTML = `
      <h2>5. Traversarea DOM-ului</h2>
      <p>
        Traversarea înseamnă navigarea între noduri: <code>parentNode</code>, <code>children</code>,
        <code>firstElementChild</code>, <code>lastElementChild</code>, <code>nextElementSibling</code>,
        <code>previousElementSibling</code>.
      </p>

      <h3>Exemplu</h3>
      <div id="tree-demo">
        <ul id="tree">
          <li>Item A
            <ul>
              <li id="leaf-1">Leaf 1</li>
              <li id="leaf-2">Leaf 2</li>
            </ul>
          </li>
          <li>Item B</li>
          <li>Item C</li>
        </ul>
      </div>

      <button id="btn-traverse">Traversare exemplu (pornește de la Leaf 1)</button>
      <div id="traverse-output" style="margin-top:10px;"></div>

      <pre><code>// Exemplu JS
const leaf = document.getElementById('leaf-1');
console.log(leaf.parentNode); // LI-ul părinte
console.log(leaf.parentNode.parentNode); // UL-ul părinte etc.
</code></pre>
    `;

    document.getElementById("btn-traverse").addEventListener("click", () => {
      const leaf = document.getElementById("leaf-1");
      const parentLi = leaf.parentNode.parentNode; // urcăm la LI părinte
      const siblings = Array.from(parentLi.parentNode.children).map((c) =>
        c.textContent.trim()
      );
      const firstChild = parentLi.firstElementChild
        ? parentLi.firstElementChild.textContent.trim()
        : "(fără)";
      const out = document.getElementById("traverse-output");
      out.innerHTML = `
        <strong>Parent LI text:</strong> ${parentLi.firstChild.textContent.trim()}<br/>
        <strong>Siblings of parent LI:</strong> ${siblings.join(" | ")}<br/>
        <strong>First element child of parent LI:</strong> ${firstChild}
      `;
      // highlight
      parentLi.style.backgroundColor = "#f0f8ff";
      setTimeout(() => (parentLi.style.backgroundColor = ""), 1200);
    });
  }

  // === 6. Event listeners ===
  function loadEvents() {
    area.innerHTML = `
      <h2>6. Event listeners</h2>
      <p>
        Evenimentele (click, input, submit, mouseover, keydown etc.) se ascultă cu
        <code>addEventListener('eveniment', callback)</code>. Poți atașa mai multe funcții
        la același eveniment și poți elimina cu <code>removeEventListener</code>.
      </p>

      <h3>Exemplu interactiv</h3>
      <div>
        <button id="ev-click">Click me</button>
        <button id="ev-remove">Elimină listener</button>
        <input id="ev-input" placeholder="Scrie ceva..." />
        <p id="ev-output" style="margin-top:8px;"></p>
      </div>

      <pre><code>// Exemplu JS
const btn = document.getElementById('ev-click');
function onClick() { console.log('clicked'); }
btn.addEventListener('click', onClick);
btn.removeEventListener('click', onClick);
</code></pre>
    `;

    const btn = document.getElementById("ev-click");
    const remove = document.getElementById("ev-remove");
    const input = document.getElementById("ev-input");
    const out = document.getElementById("ev-output");

    function onClickHandler() {
      out.textContent = "Buton apăsat la " + new Date().toLocaleTimeString();
    }

    btn.addEventListener("click", onClickHandler);

    remove.addEventListener("click", () => {
      btn.removeEventListener("click", onClickHandler);
      out.textContent =
        "Listenerul de click a fost eliminat (reîncărcați secțiunea pentru a-l restaura).";
    });

    input.addEventListener("input", (e) => {
      out.textContent = "Input: " + e.target.value;
    });
  }

  // === 7. Form handling ===
  function loadForms() {
    area.innerHTML = `
      <h2>7. Form handling</h2>
      <p>
        Form-urile pot fi validate și gestionate prin JavaScript. Ascultă evenimentul <code>submit</code>
        și previne comportamentul default cu <code>e.preventDefault()</code>.
      </p>

      <h3>Exemplu: form cu validare</h3>
      <form id="contact-form" style="margin-top:10px;">
        <label>
          Nume: <input type="text" id="f-name" required />
        </label>
        <br/><br/>
        <label>
          Email: <input type="email" id="f-email" required />
        </label>
        <br/><br/>
        <label>
          Mesaj: <textarea id="f-msg" rows="3" required></textarea>
        </label>
        <br/><br/>
        <button type="submit">Trimite</button>
      </form>
      <div id="form-result" style="margin-top:10px;"></div>

      <pre><code>// Exemplu JS
form.addEventListener('submit', e => {
  e.preventDefault();
  // citim valorile și procesăm
});
</code></pre>
    `;

    const form = document.getElementById("contact-form");
    const result = document.getElementById("form-result");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("f-name").value.trim();
      const email = document.getElementById("f-email").value.trim();
      const msg = document.getElementById("f-msg").value.trim();

      // validare simplă
      if (!name || !email || !msg) {
        result.textContent = "Completează toate câmpurile!";
        result.style.color = "crimson";
        return;
      }

      result.style.color = "green";
      result.innerHTML = `
        <strong>Trimis cu succes!</strong>
        <div>Nume: ${escapeHtml(name)}</div>
        <div>Email: ${escapeHtml(email)}</div>
        <div>Mesaj: ${escapeHtml(msg)}</div>
      `;

      // reset form
      form.reset();
    });

    function escapeHtml(str) {
      return str.replace(/[&<>"']/g, function (m) {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m];
      });
    }
  }

  // === 8. Joc de X și 0 (Tic-Tac-Toe) ===
  function loadXO() {
    area.innerHTML = `
      <h2>8. Joc de X și 0</h2>
      <p>
        Mic joc Tic-Tac-Toe (două jucători pe același ecran). Am implementat logica de bază:
        alternare jucători, verificare winner și reset.
      </p>

      <div id="xo-game" style="margin-top:12px;">
        <div id="xo-status">Jucător curent: <strong id="xo-player">X</strong></div>
        <div id="xo-board" style="display:grid; grid-template-columns:repeat(3, 80px); gap:6px; margin-top:8px;"></div>
        <div style="margin-top:8px;">
          <button id="xo-reset">Reset joc</button>
        </div>
      </div>

      <pre><code>// Pseudo (logica)
const board = ['',...];
function play(i) { board[i] = current; checkWin(); toggle(); }
</code></pre>
    `;

    const boardEl = document.getElementById("xo-board");
    const statusPlayer = document.getElementById("xo-player");
    const resetBtn = document.getElementById("xo-reset");

    // init board
    let board = Array(9).fill("");
    let current = "X";
    let finished = false;

    function renderBoard() {
      boardEl.innerHTML = "";
      board.forEach((cell, idx) => {
        const btn = document.createElement("button");
        btn.style.height = "80px";
        btn.style.fontSize = "28px";
        btn.style.cursor = "pointer";
        btn.textContent = cell;
        btn.addEventListener("click", () => handleMove(idx));
        boardEl.appendChild(btn);
      });
      statusPlayer.textContent = current;
    }

    function handleMove(i) {
      if (finished) return;
      if (board[i] !== "") return;
      board[i] = current;
      renderBoard();
      const winner = checkWinner();
      if (winner) {
        finished = true;
        statusPlayer.parentElement.innerHTML = `<strong>Rezultat:</strong> Jucător ${winner} a câștigat!`;
      } else if (board.every((c) => c !== "")) {
        finished = true;
        statusPlayer.parentElement.innerHTML = `<strong>Rezultat:</strong> Remiză`;
      } else {
        current = current === "X" ? "O" : "X";
        statusPlayer.textContent = current;
      }
    }

    function checkWinner() {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (const [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c])
          return board[a];
      }
      return null;
    }

    resetBtn.addEventListener("click", () => {
      board = Array(9).fill("");
      current = "X";
      finished = false;
      statusPlayer.parentElement.innerHTML =
        'Jucător curent: <strong id="xo-player">X</strong>';
      // rebind statusPlayer (recreat in DOM)
      renderBoard();
    });

    // initial render
    renderBoard();
  }

  // === 9. Workshop: To-Do List App ===
  function loadTodo() {
    area.innerHTML = `
      <h2>9. Workshop: To-Do List App</h2>
      <p>
        Aplicație simplă de To-Do: adaugă/editează/șterge/mişcă elemente, marchează ca finalizate.
        Lista este salvată în <code>localStorage</code> pentru a persista între sesiuni.
      </p>

      <div id="todo-app" style="margin-top:10px; max-width:600px;">
        <form id="todo-form">
          <input id="todo-input" placeholder="Adaugă o sarcină..." required />
          <button type="submit">Adaugă</button>
        </form>
        <ul id="todo-list" style="margin-top:12px;"></ul>
        <div style="margin-top:8px;">
          <button id="todo-clear">Șterge toate</button>
        </div>
      </div>

      <pre><code>// Funcționalități: create, read, update, delete, toggle done, persist (localStorage)</code></pre>
    `;

    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const listEl = document.getElementById("todo-list");
    const clearBtn = document.getElementById("todo-clear");

    let todos = loadTodos();

    function saveTodos() {
      try {
        localStorage.setItem("dom_todos_v1", JSON.stringify(todos));
      } catch (err) {
        console.warn("Nu s-a putut salva în localStorage:", err);
      }
    }

    function loadTodos() {
      try {
        const raw = localStorage.getItem("dom_todos_v1");
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    }

    function renderTodos() {
      listEl.innerHTML = "";
      if (todos.length === 0) {
        listEl.innerHTML =
          "<li style='opacity:0.7'>Nicio sarcină. Adaugă una!</li>";
        return;
      }
      todos.forEach((t, idx) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.justifyContent = "space-between";
        li.style.padding = "6px 0";

        const left = document.createElement("div");
        left.style.display = "flex";
        left.style.alignItems = "center";
        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.checked = !!t.done;
        chk.addEventListener("change", () => {
          todos[idx].done = chk.checked;
          saveTodos();
          renderTodos();
        });

        const txt = document.createElement("span");
        txt.textContent = t.text;
        txt.style.marginLeft = "8px";
        if (t.done) {
          txt.style.textDecoration = "line-through";
          txt.style.opacity = "0.6";
        }

        left.appendChild(chk);
        left.appendChild(txt);

        const actions = document.createElement("div");
        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.style.marginRight = "6px";
        edit.addEventListener("click", () => editTodo(idx));

        const del = document.createElement("button");
        del.textContent = "Șterge";
        del.addEventListener("click", () => {
          if (!confirm("Ștergi această sarcină?")) return;
          todos.splice(idx, 1);
          saveTodos();
          renderTodos();
        });

        actions.appendChild(edit);
        actions.appendChild(del);

        li.appendChild(left);
        li.appendChild(actions);
        listEl.appendChild(li);
      });
    }

    function editTodo(index) {
      const text = prompt("Editează sarcina:", todos[index].text);
      if (text === null) return; // cancel
      const val = text.trim();
      if (!val) return alert("Text invalid!");
      todos[index].text = val;
      saveTodos();
      renderTodos();
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      todos.push({ text, done: false, created: Date.now() });
      input.value = "";
      saveTodos();
      renderTodos();
    });

    clearBtn.addEventListener("click", () => {
      if (!todos.length) return;
      if (!confirm("Ștergi toate sarcinile?")) return;
      todos = [];
      saveTodos();
      renderTodos();
    });

    // initial render
    renderTodos();
  }

  // === 10. Tema: aplicație DOM completă ===
  function loadTema() {
    area.innerHTML = `
      <h2>10. Tema: aplicație DOM completă</h2>
      <p>
        Tema ta: construiește o aplicație care folosește toate conceptele învățate:
        selectare, creare/ștergere elemente, traversare, event listeners și form handling.
      </p>

      <h3>Cerinte sugerate</h3>
      <ol>
        <li>Form pentru autentificare simplă (doar UI), cu validare.</li>
        <li>Listă dinamică cu elemente ce pot fi editate și rearanjate.</li>
        <li>Un mini-joc sau widget (de ex. counter, timer).</li>
        <li>Persistență locală folosind <code>localStorage</code>.</li>
        <li>Documentează fiecare funcție JS cu comentarii și include blocuri <code>&lt;pre&gt;</code> cu cod exemplu.</li>
      </ol>

      <h3>Șablon de pornire (copiază în proiect)</h3>
      <pre><code>// Sugestie schelet
// index.html (secțiune)
<section id="app">
  <form id="auth-form">...</form>
  <div id="widget"></div>
  <ul id="dynamic-list"></ul>
</section>

// app.js (funcții)
function initAuth() { ... }
function initList() { ... }
function initWidget() { ... }
</code></pre>

      <p>Spor la proiect! Dacă vrei, pot genera fișiere de start (HTML/CSS/JS) pentru tema ta — spune-mi ce funcționalități vrei incluse.</p>
    `;
  }

  // === utilități ===
  // la încărcare, încarcă intro implicit
  loadIntro();

  // helper: escape HTML folosit mai sus deja definit în loadForms (duplicat local dacă e necesar)
});
