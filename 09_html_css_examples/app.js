// app.js - logic pentru navbar + formular + localStorage + întrebări

document.addEventListener("DOMContentLoaded", function () {
  // === TOGGLE NAVBAR ===
  var navToggle = document.querySelector(".nav-toggle");
  var navList = document.querySelector(".nav-list");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!expanded));
      navList.classList.toggle("open");
    });
  }

  // === TOGGLE "ARATĂ / ASCUNDE REZOLVARE" ===
  document.querySelectorAll(".show-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.querySelector(this.dataset.target);
      if (!target) return;
      var visible = !target.hasAttribute("hidden");
      if (visible) {
        target.setAttribute("hidden", "");
        this.textContent = "Arată rezolvare";
      } else {
        target.removeAttribute("hidden");
        this.textContent = "Ascunde rezolvare";
      }
    });
  });

  // === FORMULAR: VALIDARE + SALVARE + MESAJ ===
  var form = document.getElementById("contactForm");
  var savedList = document.getElementById("savedItems");
  var result = document.getElementById("formResult");
  var saveBtn = document.getElementById("saveBtn");
  let isSubmitting = false;

  function setMsg(fieldName, text) {
    var field = form.querySelector('[name="' + fieldName + '"]');
    if (!field) return;
    var small = field.parentElement.querySelector(".field-msg");
    if (small) small.textContent = text;
    field.setAttribute("aria-invalid", "true");
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (m) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m];
    });
  }

  function renderSaved() {
    var items = JSON.parse(localStorage.getItem("contacts_demo") || "[]");
    savedList.innerHTML = "";
    if (items.length === 0) {
      savedList.innerHTML = '<li style="opacity:.7">Niciun mesaj salvat.</li>';
      return;
    }
    items.forEach(function (it, idx) {
      var li = document.createElement("li");
      li.innerHTML =
        "<strong>" +
        escapeHtml(it.name) +
        "</strong> — " +
        escapeHtml(it.email) +
        ' <button data-index="' +
        idx +
        '" class="del-btn" style="margin-left:10px;">Șterge</button>';
      savedList.appendChild(li);
    });

    savedList.querySelectorAll(".del-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = Number(this.dataset.index);
        var arr = JSON.parse(localStorage.getItem("contacts_demo") || "[]");
        arr.splice(i, 1);
        localStorage.setItem("contacts_demo", JSON.stringify(arr));
        renderSaved();
      });
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (isSubmitting) return;

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      var valid = true;
      form.querySelectorAll(".field-msg").forEach(function (m) {
        m.textContent = "";
      });
      form.querySelectorAll("[aria-invalid]").forEach(function (el) {
        el.removeAttribute("aria-invalid");
      });

      if (name.length < 2) {
        setMsg("name", "Numele trebuie să aibă cel puțin 2 caractere");
        valid = false;
      }
      if (!/.+@.+\..+/.test(email)) {
        setMsg("email", "Introdu o adresă de email validă");
        valid = false;
      }
      if (message.length < 6) {
        setMsg("message", "Mesajul este prea scurt (minim 6 caractere)");
        valid = false;
      }

      if (!valid) {
        result.textContent = "Există erori. Corectează câmpurile evidențiate.";
        result.style.color = "#b00020";
        return;
      }

      // === SUCCES - Simulăm trimiterea ===
      isSubmitting = true;
      result.textContent = "Se trimite...";
      result.style.color = "#333";

      setTimeout(() => {
        result.textContent = "Mesaj pregătit pentru trimitere (demo).";
        result.style.color = "#00796b";
        isSubmitting = false;
      }, 1500);
    });
  }

  // === SAVE IN LOCALSTORAGE ===
  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      var obj = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
        createdAt: new Date().toISOString(),
      };
      var arr = JSON.parse(localStorage.getItem("contacts_demo") || "[]");
      arr.push(obj);
      localStorage.setItem("contacts_demo", JSON.stringify(arr));
      renderSaved();
    });
  }

  renderSaved();
});
