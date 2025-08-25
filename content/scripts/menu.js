// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    let menuOverlay = null;

    function toggleMenu() {
        const isOpen = hamburgerBtn.classList.contains('open');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        hamburgerBtn.classList.add('open');
        hamburgerMenu.classList.add('open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        hamburgerMenu.setAttribute('aria-hidden', 'false');
        
        // Create overlay
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
        
        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', closeMenu);
        
        // Focus first menu item for accessibility
        const firstMenuItem = hamburgerMenu.querySelector('a');
        if (firstMenuItem) {
            firstMenuItem.focus();
        }
    }

    function closeMenu() {
        hamburgerBtn.classList.remove('open');
        hamburgerMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerMenu.setAttribute('aria-hidden', 'true');
        
        // Remove overlay
        if (menuOverlay) {
            menuOverlay.remove();
            menuOverlay = null;
        }
        
        // Return focus to hamburger button
        hamburgerBtn.focus();
    }

    // Toggle menu on button click
    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking menu links
    const menuLinks = hamburgerMenu.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburgerBtn.classList.contains('open')) {
            closeMenu();
        }
    });

    // Handle focus trapping (optional but good for accessibility)
    hamburgerMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = hamburgerMenu.querySelectorAll('a[href]');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
});