document.addEventListener("DOMContentLoaded", function () {
    // Toggle answers/buttons
    document.querySelectorAll(".eye-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const target = btn.getAttribute("data-target");
            if (!target) return;
            const el = document.querySelector(target);
            if (!el) return;
            if (el.style.display === "block") {
                el.style.display = "none";
                btn.textContent = "👁️ Vezi/Ascunde rezolvarea";
            } else {
                el.style.display = "block";
                btn.textContent = "🙈 Ascunde";
            }
        });
    });

    // Toggle chapter subchapters
    document.querySelectorAll(".chapter-header").forEach(function (header) {
        header.addEventListener("click", function () {
            const chapter = header.parentElement;
            const subchapters = chapter.querySelectorAll(".subchapter-content");
            const icon = header.querySelector(".toggle-icon");

            subchapters.forEach((sub) => {
                const isOpen = sub.style.display === "block";
                sub.style.display = isOpen ? "none" : "block";
            });

            if (icon) icon.textContent = icon.textContent === "▼" ? "▶" : "▼";
        });
    });

    // Project tasks persistence
    document
        .querySelectorAll('.project-tasks input[type="checkbox"]')
        .forEach(function (cb, idx) {
            const key = "task-" + idx;
            if (sessionStorage.getItem(key) === "1") cb.checked = true;
            cb.addEventListener("change", function () {
                sessionStorage.setItem(key, cb.checked ? "1" : "0");
            });
        });

    // Code snippet selection
    document.querySelectorAll(".code-snippet").forEach(function (pre) {
        pre.addEventListener("click", function () {
            try {
                const range = document.createRange();
                range.selectNodeContents(pre);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } catch (e) { }
        });
    });
});

// Toggle subtopics in sidebar
function toggleSubtopics(e) {
    e.preventDefault();
    const link = e.currentTarget;
    const subtopics = link.nextElementSibling;
    const icon = link.querySelector(".toggle-icon");
    if (subtopics && subtopics.classList.contains("subtopics")) {
        subtopics.classList.toggle("collapsed");
        if (icon) {
            icon.textContent = subtopics.classList.contains("collapsed") ? "▶" : "▼";
        }
    }
}

// Toggle chapters in main content
function toggleChapter(e) {
    const header = e.currentTarget;
    const content = header.nextElementSibling;
    const icon = header.querySelector(".toggle-icon");
    if (!content) return;
    const isOpen = content.style.display === "block";
    content.style.display = isOpen ? "none" : "block";
    if (icon) icon.textContent = isOpen ? "▶" : "▼";
}

// Toggle answers (Show/Hide)
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".eye-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const target = btn.getAttribute("data-target");
            const el = document.querySelector(target);
            if (!el) return;
            if (el.style.display === "block") {
                el.style.display = "none";
                btn.textContent = "👁️ Vezi/Ascunde rezolvarea";
            } else {
                el.style.display = "block";
                btn.textContent = "🙈 Ascunde";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // --- TOGGLE ANSWERS ---
    document.querySelectorAll(".eye-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const target = btn.getAttribute("data-target");
            if (!target) return;
            const el = document.querySelector(target);
            if (!el) return;

            if (el.style.display === "block") {
                el.style.display = "none";
                btn.textContent = "👁️ Vezi răspunsul";
            } else {
                el.style.display = "block";
                btn.textContent = "🙈 Ascunde";
            }
        });
    });

    // --- TOGGLE CHAPTERS (COLLAPSABLE) ---
    document.querySelectorAll(".chapter-header").forEach(function (header) {
        header.addEventListener("click", function () {
            const content = header.nextElementSibling;
            const icon = header.querySelector(".toggle-icon");
            if (!content) return;

            const isOpen = content.style.display === "block";
            content.style.display = isOpen ? "none" : "block";
            if (icon) icon.textContent = isOpen ? "▶" : "▼";
        });
    });

    // --- PROJECT TASKS (Persistenta in sessionStorage) ---
    document
        .querySelectorAll('.project-tasks input[type="checkbox"]')
        .forEach(function (cb, idx) {
            const key = "task-" + idx;
            if (sessionStorage.getItem(key) === "1") cb.checked = true;
            cb.addEventListener("change", function () {
                sessionStorage.setItem(key, cb.checked ? "1" : "0");
            });
        });

    // --- CODE SNIPPET SELECT ---
    document.querySelectorAll(".code-snippet").forEach(function (pre) {
        pre.addEventListener("click", function () {
            try {
                const range = document.createRange();
                range.selectNodeContents(pre);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } catch (e) { }
        });
    });

    // --- SIDEBAR SUBTOPICS TOGGLE ---
    document.querySelectorAll(".mod-link").forEach(function (link) {
        link.addEventListener("click", function (e) {
            const subtopics = link.nextElementSibling;
            const icon = link.querySelector(".toggle-icon");
            if (subtopics && subtopics.classList.contains("subtopics")) {
                subtopics.classList.toggle("collapsed");
                if (icon)
                    icon.textContent = subtopics.classList.contains("collapsed")
                        ? "▶"
                        : "▼";
            }
        });
    });
});
