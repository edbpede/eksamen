// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
const DANISH_MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAJ",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OKT",
  "NOV",
  "DEC",
];

// Optagelsesprøver kan dele måned/år (fx to i august 2024), så datoen vises
// med dag for at holde hver prøve entydig.
function formatShortDate(iso) {
  const [year, month, day] = iso.split("-");
  const m = DANISH_MONTHS[parseInt(month, 10) - 1] || "";
  return `${parseInt(day, 10)}. ${m} ${year}`;
}

function createExamLink(exam) {
  const item = document.createElement("li");
  item.className = "exam-list__item";

  const link = document.createElement("a");
  link.className = "exam-list__link";
  link.href = `proever/shared/exam-start.html?exam=${exam.path}`;

  const title = document.createElement("span");
  title.className = "exam-list__title";
  title.textContent = exam.name;

  const date = document.createElement("span");
  date.className = "exam-list__date";
  date.textContent = formatShortDate(exam.date);

  link.appendChild(title);
  link.appendChild(date);
  item.appendChild(link);
  return item;
}

function createExamCard(exams) {
  const card = document.createElement("article");
  card.className = "subject-card";

  const header = document.createElement("header");
  header.className = "subject-card__header";

  const name = document.createElement("h2");
  name.className = "subject-card__name";
  name.textContent = "Optagelsesprøver";
  header.appendChild(name);

  const count = document.createElement("span");
  count.className = "subject-card__count";
  count.textContent = `${exams.length} ${exams.length === 1 ? "PRØVE" : "PRØVER"}`;
  header.appendChild(count);

  card.appendChild(header);

  const list = document.createElement("ul");
  list.className = "exam-list";
  for (const exam of exams) {
    list.appendChild(createExamLink(exam));
  }
  card.appendChild(list);
  return card;
}

async function initialize() {
  const main = document.querySelector(".subject-grid");
  try {
    const response = await fetch("proever/optagelsesprover-index.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const exams = await response.json();
    exams.sort((a, b) => (a.date < b.date ? 1 : -1));
    main.appendChild(createExamCard(exams));
  } catch (error) {
    console.error("Error loading optagelsesprøver:", error);
    const errorMsg = document.createElement("div");
    errorMsg.className = "error-message";
    errorMsg.textContent = "Der opstod en fejl ved indlæsning af optagelsesprøverne.";
    main.appendChild(errorMsg);
  }
}

document.addEventListener("DOMContentLoaded", initialize);
// @license-end
