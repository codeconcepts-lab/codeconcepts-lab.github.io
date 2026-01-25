tailwind.config = {
    theme: {
        extend: {
            colors: {
                redwolf: {
                    DEFAULT: '#972f1e', // Updated: New Primary Red
                    dark: '#5e160a',    // Darker shade for hovers
                    gold: '#ebaf0b',    // Updated: New Primary Yellow
                    black: '#0a0a0a',
                    gray: '#171717',
                    red: '#972f1e',
                    lightred: '#DC2626',
                    darkgold:'#9a7702'
                }
            },
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
                display: ['Montserrat', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
}
function switchPage(pageId) {
    // Get all pages
    const allPages = document.querySelectorAll('.page-section');
    
    // Hide all pages & remove active class for animation reset
    allPages.forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
        // Small delay to ensure the DOM has updated hidden state before adding animation class
        setTimeout(() => {
            selectedPage.classList.add('active');
        }, 10);
    } else {
        console.error("Page ID not found:", pageId);
        return;
    }

    // Update Nav States
    document.querySelectorAll('.nav-link').forEach(el => {
        el.classList.remove('nav-active');
    });

    // Define Title Mapping
    const pageTitles = {
        'service-guarding': 'Guarding & Rapid Response',
        'service-cctv': 'CCTV & Surveillance',
        'service-fire': 'Fire Detection',
        'service-solar': 'Solar Solutions',
        'service-access': 'Access Control',
        'service-smarthome': 'Smart Home',
        'service-investigation': 'Investigation',
        'service-consulting': 'Consulting',
        'service-tracking': 'Vehicle Tracking',
        'about': 'About Us',
        'contact': 'Contact Us',
        'services': 'Our Services',
        'home': 'Home' // Default for home page
    };

    // Set Page Title based on Map (Fallback to proper case if not found)
    let titleText = pageTitles[pageId];
    
    if (!titleText) {
        // Fallback: Capitalize first letter of pageId if not in map
        titleText = pageId.charAt(0).toUpperCase() + pageId.slice(1);
    }

    let page_title = document.querySelector('head > title');
    page_title.textContent = titleText + " | Red Wolf Security";

    // Determine active nav button based on pageId
    let navId = 'nav-' + pageId;
    if (pageId.startsWith('service-')) {
        navId = 'nav-services';
    }

    const activeNav = document.getElementById(navId);
    if (activeNav) activeNav.classList.add('nav-active');

    // Scroll to top
    window.scrollTo(0, 0);

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}