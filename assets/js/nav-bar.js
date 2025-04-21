// --- Dropdown Menu on Click ---
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('li.dropdown');

    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('dropdown-active');
        });
    }

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn'); // Or target the <a> directly
        if (dropbtn) {
            dropbtn.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent any default link behavior
                event.stopPropagation(); // Stop the click from closing immediately

                if (!dropdown.classList.contains('dropdown-active')) {
                    closeAllDropdowns(); // Close other dropdowns
                }
                dropdown.classList.toggle('dropdown-active'); // Toggle this one
            });
        }
    });

    // Close dropdowns if clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('li.dropdown')) {
            closeAllDropdowns();
        }
    });
});