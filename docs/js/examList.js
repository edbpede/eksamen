// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
import { scanExams } from "./examScanner.js";

// List of all possible subjects
export const subjects = [
  "Biologi",
  "Dansk",
  "Matematik",
  "Engelsk",
  "Tysk",
  "Fransk",
  "Geografi",
  "Fysik/kemi",
];

// Initialize empty exam data
export let examData = {};

// Function to initialize exam data
export async function initializeExamData() {
  try {
    examData = await scanExams();
    // Ensure these subjects exist in examData even if empty
    ["Dansk", "Matematik", "Engelsk"].forEach((subject) => {
      if (!examData[subject]) {
        examData[subject] = [];
      }
    });
  } catch (error) {
    console.error("Error initializing exam data:", error);
  }
}

// @license-end
