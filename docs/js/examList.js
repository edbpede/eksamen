import { scanExams } from './examScanner.js';

// List of all possible subjects
export const subjects = [
	"Biologi",
	"Dansk", 
	"Matematik",
	"Engelsk",
	"Tysk",
	"Fransk",
	"Geografi",
	"Fysik/kemi"
];

// Initialize empty exam data
export let examData = {};

// Function to initialize exam data
export async function initializeExamData() {
	try {
		examData = await scanExams();
	} catch (error) {
		console.error('Error initializing exam data:', error);
	}
}

