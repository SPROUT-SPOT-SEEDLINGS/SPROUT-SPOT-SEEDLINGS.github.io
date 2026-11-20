const toggle = document.querySelector("#nav-toggle");
const nav = document.querySelector("#nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const filter = document.querySelector("#filter");
const cards = [...document.querySelectorAll(".seed")];
const empty = document.querySelector("#empty");

filter.addEventListener("input", () => {
  const query = filter.value.trim().toLowerCase();
  let shown = 0;
  cards.forEach((card) => {
    const match = card.dataset.name.includes(query);
    card.hidden = !match;
    if (match) shown += 1;
  });
  empty.hidden = shown !== 0;
});

document.querySelector("#order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const lines = [
    "Hello Sprout Spot, I would like to order seedlings.",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Seedling: ${data.get("seedling")}`,
    `Quantity: ${data.get("qty")}`,
  ];
  const note = String(data.get("note") || "").trim();
  if (note) lines.push(`Note: ${note}`);
  const url = `https://wa.me/254722750416?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener");
});
