// CSS Grid — layout pe linii și coloane - app.js (gol, folosește pentru exerciții)
console.log("Chapter: CSS Grid — layout pe linii și coloane");
document.addEventListener('DOMContentLoaded', function () {
    // toggle answers/buttons
    document.querySelectorAll('.eye-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var target = btn.getAttribute('data-target');
            if (!target) return;
            var el = document.querySelector(target);
            if (!el) return;
            if (el.style.display === 'block') {
                el.style.display = 'none';
                btn.textContent = '👁️ Vezi/Ascunde rezolvarea';
            } else {
                el.style.display = 'block';
                btn.textContent = '🙈 Ascunde';
            }
        });
    });

    // make project tasks interactive (toggle checked state persistence in sessionStorage)
    var tasks = document.querySelectorAll('.project-tasks input[type="checkbox"]');
    tasks.forEach(function (cb, idx) {
        // restore
        var key = 'task-' + idx;
        var saved = sessionStorage.getItem(key);
        if (saved === '1') cb.checked = true;

        cb.addEventListener('change', function () {
            sessionStorage.setItem(key, cb.checked ? '1' : '0');
        });
    });

    // optional: code snippet selection on click
    document.querySelectorAll('.code-snippet').forEach(function (pre) {
        pre.addEventListener('click', function () {
            try {
                var range = document.createRange();
                range.selectNodeContents(pre);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } catch (e) {
                // ignore
            }
        });
    });
});
