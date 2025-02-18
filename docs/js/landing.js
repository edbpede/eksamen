// @license http://www.gnu.org/licenses/agpl-3.0.html AGPL-3.0
import { subjects, examData, initializeExamData } from "./examList.js";

// Date formatting function
function formatDate(dateString) {
  const [year, month] = dateString.split("-");
  const monthNames = {
    "05": "maj",
    12: "dec",
  };
  return `${year} ${monthNames[month] || ""}`;
}

const grid = document.querySelector(".subject-grid");

// Function to create a subject card
function createSubjectCard(subject) {
  const card = document.createElement("div");
  card.className = "subject-card";

  const title = document.createElement("h2");
  title.textContent = subject;
  card.appendChild(title);

  const examList = document.createElement("ul");
  examList.className = "exam-list";

  if (examData[subject] && examData[subject].length > 0) {
    examData[subject].forEach((exam) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `proever/shared/exam-start.html?exam=${exam.path}`;
      link.textContent = `${exam.name} (${formatDate(exam.date)})`;
      listItem.appendChild(link);
      examList.appendChild(listItem);
    });
  } else {
    const noExams = document.createElement("p");
    noExams.textContent = "Ingen eksamener tilgængelige endnu";
    examList.appendChild(noExams);
  }

  card.appendChild(examList);
  return card;
}

// Initialize exam data and then create cards
async function initializeAndCreateCards() {
  try {
    await initializeExamData();
    subjects.forEach((subject) => {
      const card = createSubjectCard(subject);
      grid.appendChild(card);
    });
  } catch (error) {
    console.error("Error initializing and creating cards:", error);
    // Show error message to user
    const errorMsg = document.createElement("div");
    errorMsg.className = "error-message";
    errorMsg.textContent = "Der opstod en fejl ved indlæsning af eksamener.";
    grid.appendChild(errorMsg);
  }
}

// Start initialization when page loads
document.addEventListener("DOMContentLoaded", initializeAndCreateCards);
// @license-end
