document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    const images = []; // Array to store image data (src and alt)

    // Populate images array and add click listeners to thumbnails
    galleryItems.forEach((item, index) => {
        const imgElement = item.querySelector('img');
        images.push({
            src: item.getAttribute('href'), // Full image src from link's href
            alt: imgElement ? imgElement.getAttribute('alt') : '' // Alt text from img
        });

        item.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link navigation
            currentIndex = index;
            showLightbox();
            updateLightboxImage();
        });
    });

    // Function to show the lightbox
    function showLightbox() {
        lightbox.style.display = 'block';
        // Optional: Add a class to body to prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }

    // Function to hide the lightbox
    function hideLightbox() {
        lightbox.style.display = 'none';
        // Optional: Remove the class to restore scrolling
        document.body.style.overflow = 'auto';
    }

    // Function to update the image and caption in the lightbox
    function updateLightboxImage() {
        if (currentIndex >= 0 && currentIndex < images.length) {
            const image = images[currentIndex];
            lightboxImage.src = image.src;
            lightboxCaption.textContent = image.alt; // Use alt text as caption
        }
         // Show/hide arrows based on position
         prevBtn.style.display = (currentIndex === 0) ? 'none' : 'block';
         nextBtn.style.display = (currentIndex === images.length - 1) ? 'none' : 'block';
    }

    // Event listener for the close button
    closeBtn.addEventListener('click', hideLightbox);

    // Event listener for clicking outside the image (on the overlay)
    lightbox.addEventListener('click', (event) => {
        // Close only if the click is directly on the overlay, not the image or controls
        if (event.target === lightbox) {
            hideLightbox();
        }
    });

    // Event listener for the previous button
    prevBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent triggering lightbox click
        if (currentIndex > 0) {
            currentIndex--;
            updateLightboxImage();
        }
    });

    // Event listener for the next button
    nextBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent triggering lightbox click
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateLightboxImage();
        }
    });

    // Optional: Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (lightbox.style.display === 'block') { // Only if lightbox is visible
            if (event.key === 'ArrowLeft') {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateLightboxImage();
                }
            } else if (event.key === 'ArrowRight') {
                 if (currentIndex < images.length - 1) {
                    currentIndex++;
                    updateLightboxImage();
                }
            } else if (event.key === 'Escape') {
                hideLightbox();
            }
        }
    });

});