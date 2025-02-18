// @license http://www.gnu.org/licenses/agpl-3.0.html AGPL-3.0
// Function to scan exams using the JSON index file
export async function scanExams() {
  try {
    const response = await fetch("proever/exam-index.json");
    if (!response.ok) throw new Error("Failed to fetch exam index");

    const examData = await response.json();
    return examData;
  } catch (error) {
    console.error("Error scanning exams:", error);
    return {};
  }
}
// @license-end
