// --- Carousel Script ---
            let slideIndex = 1;
            let slideInterval;
            let slides = document.querySelectorAll(".hero-section .slide");
            let dots = document.querySelectorAll(".hero-section .dot");

            function plusSlides(n) {
                clearInterval(slideInterval);
                showSlide(slideIndex += n);
                startSlideInterval();
            }

            function currentSlide(n) {
                clearInterval(slideInterval);
                showSlide(slideIndex = n);
                startSlideInterval();
            }

            function showSlide(n) {
                let i;
                if (!slides || slides.length === 0) return;

                if (n > slides.length) { slideIndex = 1 }
                if (n < 1) { slideIndex = slides.length }

                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                    slides[i].classList.remove('active');
                }

                if (dots && dots.length > 0) {
                    for (i = 0; i < dots.length; i++) {
                        dots[i].classList.remove("active");
                    }
                }

                if (slides[slideIndex - 1]) {
                    slides[slideIndex - 1].style.display = "block";
                    setTimeout(() => {
                        if (slides[slideIndex - 1]) slides[slideIndex - 1].classList.add('active');
                    }, 10);
                }
                if (dots && dots[slideIndex - 1]) {
                    dots[slideIndex - 1].classList.add("active");
                }
            }

            function startSlideInterval() {
                clearInterval(slideInterval);
                slideInterval = setInterval(() => plusSlides(1), 5000);
            }

            // --- Mobile Nav Toggle Script ---
            const navToggle = document.querySelector('.nav-toggle');
            const navLinksContainer = document.querySelector('.nav-links-container');

            if (navToggle && navLinksContainer) {
                navToggle.addEventListener('click', () => {
                    navLinksContainer.classList.toggle('active');
                    const icon = navToggle.querySelector('i');
                    if (icon.classList.contains('fa-bars')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            }

            // --- Date Input Placeholder Script ---
            // REMOVED - Litepicker handles interaction now.
            /*
            function setupDateInput(inputId) { ... }
            */

            // --- Shrinking Navbar Script ---
            function scrollFunction() {
                const navbar = document.querySelector(".navbar");
                if (!navbar) return;
                const scrollThreshold = 100;
                if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
                    navbar.classList.add("shrunk");
                } else {
                    navbar.classList.remove("shrunk");
                }
            }
            window.addEventListener('scroll', scrollFunction);


            // --- Initialize Scripts on DOM Load ---
            document.addEventListener('DOMContentLoaded', function () {
                // Start slideshow
                if (slides.length > 0) {
                    showSlide(slideIndex);
                    startSlideInterval();
                }

                // Setup date inputs using Litepicker
                // REMOVED: setupDateInput('checkin');
                // REMOVED: setupDateInput('checkout');

                // Initialize Litepicker
                const picker = new Litepicker({
                    element: document.getElementById('checkin'),
                    elementEnd: document.getElementById('checkout'),
                    singleMode: false, // Enable range selection
                    numberOfMonths: 2, // Show two months like the image
                    numberOfColumns: 2,
                    format: 'DD MMM YYYY', // Example format, adjust as needed
                    tooltipText: {
                        one: 'night',
                        other: 'nights'
                    },
                    minDate: new Date(), // Prevent selecting past dates
                    autoApply: true, // Apply selection immediately
                    mobileFriendly: true, // Improve mobile experience
                    // Add more configuration options as needed:
                    // disableBookedDays: ['2025-04-20', '2025-04-21'], // Example
                    // selectForward: true, // Only allow selecting forward ranges
                });

                // Run scroll function once on load
                scrollFunction();
            });
             document.addEventListener('DOMContentLoaded', function () {
                const checkAvailabilityBtn = document.getElementById('checkAvailabilityBtn');
                const checkinInput = document.getElementById('checkin');
                const checkoutInput = document.getElementById('checkout');

                checkAvailabilityBtn.addEventListener('click', function () {
                    const checkinDate = checkinInput.value;
                    const checkoutDate = checkoutInput.value;

                    // Construct the URL
                    let bookingUrl = 'https://book.nightsbridge.com/38214';
                    bookingUrl += '?activeTab=main%5B';

                    // Add checkin and checkout only if they have values
                    if (checkinDate) {
                        //  Format the date if necessary (Booking.com may require a specific format)
                        const formattedCheckinDate = formatDate(checkinDate); //  Implement formatDate function
                        bookingUrl += `&checkin=${formattedCheckinDate}`;
                    }
                    if (checkoutDate) {
                        //  Format the date if necessary
                        const formattedCheckoutDate = formatDate(checkoutDate); //  Implement formatDate function
                        bookingUrl += `&checkout=${formattedCheckoutDate}%5D`;
                    }

                    // Redirect to Booking.com
                    window.location.href = bookingUrl;
                });

                //  --- Date Formatting Function ---
                function formatDate(dateString) {
                    //  The dateString will be in the format 'DD MMM YYYY' (e.g., '25 Apr 2025')
                    const dateParts = dateString.split(' ');
                    const day = dateParts[0];
                    const month = dateParts[1];
                    const year = dateParts[2];

                    //  Convert month abbreviation to a number
                    const monthNumber = {
                        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
                        'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
                    }[month];

                    //  Return in YYYY-MM-DD format (Booking.com standard)
                    return `${year}-${monthNumber}-${day.padStart(2, '0')}`;  //  Pad day with leading zero if needed
                }
            });
