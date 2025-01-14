// Date formatting function
function formatDate(dateString) {
    const [year, month] = dateString.split('-');
    const monthNames = {
        '05': 'maj',
        '12': 'dec'
    };
    return `${year} ${monthNames[month] || ''}`;
}

// List of all possible subjects
const subjects = [
    "Biologi",
    "Dansk", 
    "Matematik",
    "Engelsk",
    "Tysk",
    "Fransk",
    "Geografi",
    "Fysik/kemi"
];

// Mapping of subjects to their exam folders
const examData = {
    "Dansk": [
        {
            name: "Skriftlig Fremstilling",
            date: "2023-05-02",
            path: "proever/FP9_dansk/2023-05-02_Skriftlig_Fremstilling/index.html"
        }
    ],
    "Matematik": [
        {
            name: "Med Hjælpemidler",
            date: "2023-12-04",
            path: "proever/FP9_matematik/2023-12-04_Med_Hjaelpemidler/index.html"
        }
    ]
};

// Get the grid container
const grid = document.querySelector('.subject-grid');

// Function to create a subject card
function createSubjectCard(subject) {
    const card = document.createElement('div');
    card.className = 'subject-card';
    
    const title = document.createElement('h2');
    title.textContent = subject;
    card.appendChild(title);
    
    const examList = document.createElement('ul');
    examList.className = 'exam-list';
    
    if (examData[subject]) {
        examData[subject].forEach(exam => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = exam.path;
            link.textContent = `${exam.name} (${formatDate(exam.date)})`;
            listItem.appendChild(link);
            examList.appendChild(listItem);
        });
    } else {
        const noExams = document.createElement('p');
        noExams.textContent = 'Ingen eksamener tilgængelige endnu';
        examList.appendChild(noExams);
    }
    
    card.appendChild(examList);
    return card;
}

// Generate and display all subject cards
subjects.forEach(subject => {
    const card = createSubjectCard(subject);
    grid.appendChild(card);
});