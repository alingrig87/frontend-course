// Active sidebar item highlight
const items = document.querySelectorAll(".sidebar li");

items.forEach((item) => {
  item.addEventListener("click", () => {
    items.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  });
});
