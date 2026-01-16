function switchPage(pageId) {
            // Hide all pages including sub-services
            const allPages = document.querySelectorAll('.page-section');
            allPages.forEach(page => {
                page.classList.add('hidden');
            });

            // Show selected page
            const selectedPage = document.getElementById(pageId);
            if(selectedPage) {
                selectedPage.classList.remove('hidden');
            } else {
                console.error("Page ID not found:", pageId);
                return;
            }

            // Update Nav States
            document.querySelectorAll('.nav-link').forEach(el => {
                el.classList.remove('nav-active');
            });
            
            // Determine active nav button based on pageId
            let navId = 'nav-' + pageId;
            if (pageId.startsWith('service-')) {
                navId = 'nav-services';
            }
            
            const activeNav = document.getElementById(navId);
            if(activeNav) activeNav.classList.add('nav-active');

            // Scroll to top
            window.scrollTo(0, 0);

            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }