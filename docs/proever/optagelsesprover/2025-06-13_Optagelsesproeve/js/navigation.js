const navLinks = document.querySelectorAll('a[data-target]');
const pages = document.querySelectorAll('.page');
const subMenus = document.querySelectorAll('.nav__sub-menu');

// Function to show the selected page
function showPage(pageId) {
    // First hide all pages by removing visible class
    pages.forEach(page => {
        page.classList.remove('page--visible');
    });

    // Then show the corresponding page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('page--visible');
    }
}

// Hide pages by removing 'page--visible' class from all pages
function hideAllPages() {
    pages.forEach(page => {
        page.classList.remove('page--visible');
    });
}

// Show a specific page with the given pageId by adding the 'page--visible' class
function showSpecificPage(pageId) {
    pages.forEach(page => {
        // Check if the current page's id matches the provided pageId
        if (page.id === pageId) {
            page.classList.add('page--visible');
        }
    });
}

// Hide the 'nav__sub-menu--active' class from all sub-menus and their parent elements
function hideAllSubMenus() {
    subMenus.forEach(subMenu => {
        // Remove active classes from the sub-menu and its parent element
        subMenu.classList.remove('nav__sub-menu--active');
        subMenu.parentElement.classList.remove('nav-overview--active');
    });
}

// Show a specific sub-menu by adding the 'nav__sub-menu--active' class to it
function showSubMenu(subMenu) {
    // Hide all sub-menus before showing the specific one
    hideAllSubMenus();
    // Add the 'nav__sub-menu--active' class to the provided sub-menu
    subMenu.classList.add('nav__sub-menu--active');
    // Add the 'nav-overview--active' class to the parent element of the sub-menu
    subMenu.parentElement.classList.add('nav-overview--active');
}

// Show a specific page and its associated sub-menu (if any)
function showPageWithSubMenu(target, pageId) {
    // Hide all pages and sub-menus before showing the specific ones
    hideAllPages();
    hideAllSubMenus();

    showSpecificPage(pageId);

    if (target.nextElementSibling && target.nextElementSibling.classList.contains('nav__sub-menu')) {
        showSubMenu(target.nextElementSibling);
    }
}

// Attach event listeners to navLinks
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        handleNavLinkClick(event);
    });

    // Add keydown event listener specifically for the Enter key
    link.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleNavLinkClick(event);
        }
    });
});

// Add event listeners to sub-links within sub-menus
if (subMenus) {
    const subLinks = document.querySelectorAll('.nav__sub-link');
    subLinks.forEach(subLink => {
        subLink.addEventListener('click', (event) => {
            handleSubLinkClick(event);
        });

        // Add keydown event listener specifically for the Enter key
        subLink.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleSubLinkClick(event);
            }
        });
    });
}

function handleNavLinkClick(event) {
    const target = event.currentTarget;
    const pageId = target.getAttribute('data-target');
    const subMenu = target.nextElementSibling;

    // Remove active class from all nav__links
    navLinks.forEach(navLink => {
        navLink.classList.remove('nav__link--active');
    });

    // Add active class to the clicked nav__link
    target.classList.add('nav__link--active');

    // Hide the content of previously selected page
    hideAllPages();

    // Show the corresponding page for the clicked nav__link
    showPage(pageId);

    if (subMenu && subMenu.classList.contains('nav__sub-menu')) {
        event.preventDefault(); // Prevent following the link
        showSubMenu(subMenu);
    } else {
        hideAllSubMenus();
    }
}

function handleSubLinkClick(event) {
    const subMenu = event.currentTarget.closest('.nav__sub-menu');
    if (subMenu) {
        event.preventDefault(); // Prevent following the link
        showSubMenu(subMenu);
    }
}

printButton.addEventListener("click", function () {
    // Function to handle the scroll event
    function handleScroll() {
        // Check if the window is scrolled to the top
        if (window.scrollY === 0) {
            // Remove the scroll event listener to prevent multiple calls
            window.removeEventListener('scroll', handleScroll);
            // Open the print dialog
            window.print();
        }
    }

    // Check if the window is already at the top
    if (window.scrollY === 0) {
        // Directly open the print dialog if already at the top
        window.print();
    } else {
        // Scroll to the top of the page
        window.scrollTo(0, 0);

        // Add a scroll event listener to check when scrolling is complete
        window.addEventListener('scroll', handleScroll);
    }
});