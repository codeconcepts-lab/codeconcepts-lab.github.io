 // --- Mobile Nav Toggle Script ---
 const navToggle = document.querySelector('.nav-toggle');
 const navLinksContainer = document.querySelector('.nav-links-container');
 if (navToggle && navLinksContainer) {
     navToggle.addEventListener('click', () => {
         navLinksContainer.classList.toggle('active');
         const icon = navToggle.querySelector('i');
         if (icon.classList.contains('fa-bars')) {
             icon.classList.remove('fa-bars'); icon.classList.add('fa-times');
         } else {
             icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
         }
     });
 }

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

 // Add sr-only class CSS for accessibility (hiding labels visually but keeping for screen readers)
 const style = document.createElement('style');
 style.innerHTML = `
     .sr-only {
         position: absolute;
         width: 1px;
         height: 1px;
         padding: 0;
         margin: -1px;
         overflow: hidden;
         clip: rect(0, 0, 0, 0);
         white-space: nowrap;
         border-width: 0;
     }
  `;
 document.head.appendChild(style);


 // --- Initialize Scripts on DOM Load ---
 document.addEventListener('DOMContentLoaded', function () {
     scrollFunction(); // Run scroll function once on load

     // Initialize Litepicker for Acacia Room
     try {
         const pickerAcacia = new Litepicker({
             element: document.getElementById('checkin-acacia'),
             elementEnd: document.getElementById('checkout-acacia'),
             singleMode: false, numberOfMonths: 1, numberOfColumns: 1,
             format: 'DD MMM YYYY', // Standard Format
             tooltipText: { one: 'night', other: 'nights' },
             minDate: new Date(), // Prevent past dates
             autoApply: true,
             mobileFriendly: true,
             showTooltip: true,
             // Optional: Add other configurations based on needs
         });
     } catch (error) {
         console.error("Litepicker initialization failed for Acacia Room:", error);
     }

     // Optional: Add share functionality to the share button
     const shareButton = document.querySelector('.btn-share');
     if (shareButton && navigator.share) { // Check if Web Share API is supported
         shareButton.addEventListener('click', async () => {
             try {
                 await navigator.share({
                     title: document.title,
                     text: `Check out the ${document.querySelector('h1')?.textContent || 'room'} at Bush Creek Guest House!`, // Get room name dynamically
                     url: window.location.href
                 });
                 console.log('Page shared successfully');
             } catch (err) {
                 console.error('Share failed:', err.message);
             }
         });
     } else if (shareButton) {
         // Fallback for browsers that don't support navigator.share
         shareButton.addEventListener('click', () => {
             alert('Sharing is not supported on this browser, please copy the URL manually.');
             // You could also implement a custom share modal here
         });
     }

 });

 document.addEventListener('DOMContentLoaded', function() {
    const checkAvailabilityBtn = document.getElementById('checkAvailabilityBtn');
    const checkinInput = document.getElementById('checkin-acacia');
    const checkoutInput = document.getElementById('checkout-acacia');

    checkAvailabilityBtn.addEventListener('click', function() {
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