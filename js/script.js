// script.js for Nexora Web Agency

document.addEventListener('DOMContentLoaded', function() {

    // --- Testimonial Slider ---
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentTestimonial = 0;
    let slideInterval;

    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Remove 'active' class from all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        // Add 'active' class to the correct one
        testimonials[index].classList.add('active');
    }

    // Function to show the next testimonial
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Function to show the previous testimonial
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Start the automatic slide rotation
    function startSlideShow() {
        slideInterval = setInterval(nextTestimonial, 5000); // Change slide every 5 seconds
    }

    // Stop the automatic slide rotation
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event Listeners for buttons
    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        stopSlideShow(); // Optional: Stop auto-play when user interacts
    });

    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        stopSlideShow(); // Optional: Stop auto-play when user interacts
    });

    // Initialize the slider
    showTestimonial(currentTestimonial);
    startSlideShow();
// 1. Select all the sections you want to apply the effect to
    const sectionsToAnimate = document.querySelectorAll('.core-services, .featured-projects, .value-proposition, .testimonials, .lead-magnet');

    // 2. Set up the observer options
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    // 3. Create the Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (i.e., in view)
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing the element after it has become visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 4. Attach the observer to each of the sections
    sectionsToAnimate.forEach(section => {
        section.classList.add('fade-in-section'); // Add the initial hidden state
        observer.observe(section);
    });

});