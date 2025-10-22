// Butoane show/hide pentru exerciții
const buttons = document.querySelectorAll(".eye-btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

// Task Tracker logică
const addBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;
  const li = document.createElement("li");
  li.textContent = taskInput.value;
  li.addEventListener("click", () => li.classList.toggle("completed"));
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    li.remove();
  });
  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.textContent,
      done: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem("tasks")) || [];
  data.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t.text;
    if (t.done) li.classList.add("completed");
    li.addEventListener("click", () => li.classList.toggle("completed"));
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      li.remove();
    });
    taskList.appendChild(li);
  });
}
loadTasks();
