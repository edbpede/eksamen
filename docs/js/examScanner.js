// Function to extract subject name from folder name (e.g., "FP9_dansk" -> "Dansk")
function extractSubject(folderName) {
	const subject = folderName.replace('FP9_', '');
	return subject.charAt(0).toUpperCase() + subject.slice(1);
}

// Function to extract exam info from folder name (e.g., "2023-05-02_Skriftlig_Fremstilling")
function extractExamInfo(folderName) {
	const [date, ...nameParts] = folderName.split('_');
	return {
		date,
		name: nameParts.join(' ')
	};
}

// Function to scan the proever directory and return exam data
export async function scanExams() {
	const examData = {};
	
	try {
		// Get all FP9_* directories
		const response = await fetch('../proever/');
		if (!response.ok) throw new Error('Failed to fetch directory listing');
		
		const text = await response.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(text, 'text/html');
		
		// Find all directory links that start with FP9_
		const subjectDirs = Array.from(doc.querySelectorAll('a'))
			.filter(a => a.href.includes('FP9_'))
			.map(a => a.href.split('/').filter(Boolean).pop());

		// Process each subject directory
		for (const dir of subjectDirs) {
			if (dir.startsWith('FP9_')) {
				const subject = extractSubject(dir);
				examData[subject] = [];

				// Get exam directories within the subject directory
				const examResponse = await fetch(`../proever/${dir}/`);
				if (examResponse.ok) {
					const examText = await examResponse.text();
					const examDoc = parser.parseFromString(examText, 'text/html');
					
					// Find exam directories (they should follow the pattern YYYY-MM-DD_Name)
					const examDirs = Array.from(examDoc.querySelectorAll('a'))
						.filter(a => /^\d{4}-\d{2}-\d{2}_/.test(a.textContent))
						.map(a => a.textContent.trim());

					// Process each exam directory
					examDirs.forEach(examDir => {
						const examInfo = extractExamInfo(examDir);
						examData[subject].push({
							name: examInfo.name,
							date: examInfo.date,
							path: `proever/FP9_${subject.toLowerCase()}/${examDir}/index.html`
						});
					});
				}
			}
		}
	} catch (error) {
		console.error('Error scanning exams:', error);
	}

	return examData;
}