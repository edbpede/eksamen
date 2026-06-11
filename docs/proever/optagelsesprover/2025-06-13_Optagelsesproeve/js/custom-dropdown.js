document.querySelectorAll('.custom-select').forEach(function (selectWrapper, index) {
    let trigger = selectWrapper.querySelector('.custom-select-trigger');
    let options = selectWrapper.querySelectorAll('.custom-option');
    let selectText = trigger.querySelector('.select-text');

    const storageKey = "selectedOption_" + index; // Unique key for each dropdown

    // Ensure .select-text exists to prevent errors
    if (!selectText) {
        console.warn(`.select-text missing in dropdown ${index}`);
        return;
    }

    // Load saved value from localStorage safely
    try {
        const savedValue = localStorage.getItem(storageKey);
        if (savedValue) {
            let selectedOption = [...options].find(option => option.dataset.value === savedValue);
            if (selectedOption) {
                selectText.innerHTML = selectedOption.innerHTML;
            }
        }
    } catch (error) {
        console.error("Error accessing localStorage:", error);
    }

    // Toggle the dropdown on trigger click
    trigger.addEventListener('click', function () {
        closeAllSelects(selectWrapper); // Close other open selects
        selectWrapper.classList.toggle('open');
    });

    // Handle option selection
    options.forEach(function (option) {
        option.addEventListener('click', function () {
            selectText.innerHTML = this.innerHTML;
            selectWrapper.classList.remove('open'); // Close the dropdown

            // Save selected value to localStorage safely
            try {
                localStorage.setItem(storageKey, this.dataset.value);
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        });
    });
});

// Function to close all other selects when opening a new one
function closeAllSelects(currentSelect) {
    document.querySelectorAll('.custom-select').forEach(function (selectWrapper) {
        if (selectWrapper !== currentSelect) {
            selectWrapper.classList.remove('open');
        }
    });
}

// Close the dropdown if clicked outside
document.addEventListener('click', function (event) {
    if (!event.target.closest('.custom-select')) {
        document.querySelectorAll('.custom-select').forEach(function (selectWrapper) {
            selectWrapper.classList.remove('open');
        });
    }
});
