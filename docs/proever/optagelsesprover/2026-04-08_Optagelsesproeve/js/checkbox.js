
// Hent alle tabeller med klassen 'checkbox-table
const tables = document.querySelectorAll('.checkbox-table');

tables.forEach(table => {
    // Find alle checkboxes inden for denne tabel
    const checkboxes = table.querySelectorAll('.single-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                // Fjern check fra alle andre checkboxes i samme tabel
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
});

// Funktion til at fjerne dobbeltmarkeringer
function removeDuplicateSelections() {
    // Find alle tabeller med checkboxes
    const tables = document.querySelectorAll('.checkbox-table');

    tables.forEach(table => {
        // Find alle markerede checkboxes i tabellen
        const checkedCheckboxes = table.querySelectorAll('.single-checkbox:checked');

        if (checkedCheckboxes.length > 1) {
            // Hvis der er flere markerede, ryd alle
            checkedCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        }
    });
}

// Kør funktionen, når siden indlæses
window.addEventListener('load', removeDuplicateSelections);

// Funktion til at gemme markeret checkbox
function saveSelection() {
    const tables = document.querySelectorAll('.checkbox-table');

    tables.forEach((table, index) => {
        const checkedCheckbox = table.querySelector('.single-checkbox:checked');
        if (checkedCheckbox) {
            // Gem id på den markerede checkbox i localStorage
            localStorage.setItem(`table-${index}`, checkedCheckbox.id);
        } else {
            // Fjern gemte data, hvis ingen checkbox er markeret
            localStorage.removeItem(`table-${index}`);
        }
    });
}

// Funktion til at gendanne markeret checkbox
function restoreSelection() {
    const tables = document.querySelectorAll('.checkbox-table');

    tables.forEach((table, index) => {
        const savedCheckboxId = localStorage.getItem(`table-${index}`);
        if (savedCheckboxId) {
            // Find og markér den gemte checkbox
            const checkboxToRestore = table.querySelector(`#${savedCheckboxId}`);
            if (checkboxToRestore) {
                checkboxToRestore.checked = true;
            }
        }
    });
}

// Funktion til at sikre kun én markering per tabel
function initializeCheckboxLogic() {
    const tables = document.querySelectorAll('.checkbox-table');

    tables.forEach(table => {
        const checkboxes = table.querySelectorAll('.single-checkbox');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    // Fjern check fra alle andre checkboxes i samme tabel
                    checkboxes.forEach(otherCheckbox => {
                        if (otherCheckbox !== this) {
                            otherCheckbox.checked = false;
                        }
                    });
                }
                // Gem den nye markering
                saveSelection();
            });
        });
    });
}

// Initialiser logik ved sideindlæsning
window.addEventListener('load', () => {
    restoreSelection();
    initializeCheckboxLogic();
});
