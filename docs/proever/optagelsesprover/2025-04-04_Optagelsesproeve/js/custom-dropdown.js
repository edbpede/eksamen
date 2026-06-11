document.querySelectorAll('.custom-select').forEach(function (selectWrapper) {
    let trigger = selectWrapper.querySelector('.custom-select-trigger');
    let options = selectWrapper.querySelectorAll('.custom-option');

    // Toggle the dropdown on trigger click
    trigger.addEventListener('click', function () {
        closeAllSelects(selectWrapper); // Close other open selects
        selectWrapper.classList.toggle('open');
    });

    // Handle option selection
    options.forEach(function (option) {
        option.addEventListener('click', function () {
            // Set the selected value as HTML content
            trigger.querySelector('.select-text').innerHTML = this.innerHTML;
            selectWrapper.classList.remove('open'); // Close the dropdown
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
