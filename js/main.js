document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    initMobileMenu();
    initNavbar();
    initSmoothScroll();
    initFormValidation();
    initAnimations();
    initBeforeAfterSlider();
    initTabs();
    initDashboard();
    highlightActiveNav();
});

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        updateDarkModeIcon(true);
    } else {
        updateDarkModeIcon(false);
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateDarkModeIcon(isDark);
            showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'success');
        });
    }
}

function updateDarkModeIcon(isDark) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    if (sunIcon && moonIcon) {
        sunIcon.classList.toggle('hidden', !isDark);
        moonIcon.classList.toggle('hidden', isDark);
    }
}

function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
    }

    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }

    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-effect', 'shadow-lg');
        } else {
            navbar.classList.remove('glass-effect', 'shadow-lg');
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initFormValidation() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateBookingForm()) {
                showToast('Booking submitted successfully! We will contact you soon.', 'success');
                bookingForm.reset();
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                showToast('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLoginForm()) {
                showToast('Login successful! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1500);
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateSignupForm()) {
                showToast('Account created successfully! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1500);
            }
        });
    }
}

function validateBookingForm() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const service = document.getElementById('service')?.value;
    const date = document.getElementById('date')?.value;

    if (!name || !email || !phone || !service || !date) {
        showToast('Please fill in all required fields', 'error');
        return false;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }

    return true;
}

function validateContactForm() {
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
        showToast('Please fill in all required fields', 'error');
        return false;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }

    return true;
}

function validateLoginForm() {
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;

    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return false;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }

    return true;
}

function validateSignupForm() {
    const name = document.getElementById('signupName')?.value.trim();
    const email = document.getElementById('signupEmail')?.value.trim();
    const password = document.getElementById('signupPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;

    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return false;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return false;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showToast(message, type) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function initBeforeAfterSlider() {
    const slider = document.querySelector('.before-after-slider');
    if (!slider) return;

    const handle = slider.querySelector('.slider-handle');
    const beforeImage = slider.querySelector('.before-image');
    let isDragging = false;

    if (!handle || !beforeImage) return;

    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);

    function startDrag(e) {
        isDragging = true;
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;
        
        const rect = slider.getBoundingClientRect();
        let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
        
        const percentage = (x / rect.width) * 100;
        beforeImage.style.width = percentage + '%';
        handle.style.left = percentage + '%';
    }

    function stopDrag() {
        isDragging = false;
    }
}

function initTabs() {
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => {
                btn.classList.remove('gradient-bg', 'text-white');
                btn.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
            });
            
            this.classList.add('gradient-bg', 'text-white');
            this.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
            
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
}

function initDashboard() {
    const dashboardToggle = document.getElementById('dashboardToggle');
    const userDashboard = document.getElementById('userDashboard');
    const adminDashboard = document.getElementById('adminDashboard');
    const adminNavItems = document.querySelectorAll('.admin-nav-item');
    const adminContent = document.querySelectorAll('.admin-content');

    if (dashboardToggle && userDashboard && adminDashboard) {
        dashboardToggle.addEventListener('change', function() {
            if (this.checked) {
                adminDashboard.classList.remove('hidden');
                userDashboard.classList.add('hidden');
            } else {
                adminDashboard.classList.add('hidden');
                userDashboard.classList.remove('hidden');
            }
        });
    }

    adminNavItems.forEach(item => {
        item.addEventListener('click', function() {
            adminNavItems.forEach(i => i.classList.remove('bg-indigo-50', 'dark:bg-indigo-900', 'text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600'));
            adminNavItems.forEach(i => i.classList.add('text-gray-600', 'dark:text-gray-400', 'border-transparent'));
            
            this.classList.add('bg-indigo-50', 'dark:bg-indigo-900', 'text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600');
            this.classList.remove('text-gray-600', 'dark:text-gray-400', 'border-transparent');
            
            adminContent.forEach(content => content.classList.add('hidden'));
            const target = document.getElementById(this.getAttribute('data-section'));
            if (target) target.classList.remove('hidden');
        });
    });
}

function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

function highlightActiveNav() {
    const currentPath = window.location.pathname;
    let currentPage = currentPath.split('/').pop();
    if (currentPage === '') currentPage = 'index.html';

    const excludePages = ['login.html', 'signup.html', 'admin.html', 'user.html'];
    if (excludePages.includes(currentPage)) return;

    // Reset old explicitly hard-coded classes if any were left in the templates
    document.querySelectorAll('.active-nav').forEach(el => el.classList.remove('active-nav'));

    // Reset all nav links first
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.tagName === 'A' || link.tagName === 'BUTTON') {
            link.classList.remove('text-primary', 'font-medium', 'font-bold');
            link.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:text-primary');
        }
    });

    document.querySelectorAll('#mobileMenu a.block').forEach(link => {
        if (!link.classList.contains('border-2') && !link.classList.contains('gradient-bg')) {
            link.classList.remove('text-primary', 'font-medium', 'font-bold', 'bg-primary/10', 'rounded-lg');
            link.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-slate-800');
        }
    });

    document.querySelectorAll('#mobileMenu button.w-full').forEach(btn => {
        btn.classList.remove('text-primary', 'font-medium', 'font-bold', 'bg-primary/10', 'rounded-lg');
        btn.classList.add('text-gray-600', 'dark:text-gray-300');
    });

    // Now set active-nav dynamically
    const links = document.querySelectorAll(`a[href="${currentPage}"]`);
    links.forEach(link => {
        // Desktop nav
        if (link.closest('.hidden.lg\\\\:flex')) {
            if (link.classList.contains('nav-link')) {
                link.classList.add('text-primary', 'font-medium');
                link.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:text-primary');
            } else if (link.closest('.group')) {
                const btn = link.closest('.group').querySelector('button');
                if (btn) {
                    btn.classList.add('text-primary', 'font-medium');
                    btn.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:text-primary');
                }
                link.classList.add('text-primary', 'font-medium', 'bg-primary/5', 'rounded-lg');
            }
        }
        
        // Mobile nav
        if (link.closest('#mobileMenu')) {
            if (link.classList.contains('block') && link.classList.contains('py-3') && link.classList.contains('px-4')) {
                link.classList.add('text-primary', 'font-medium', 'bg-primary/10', 'rounded-lg');
                link.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-slate-800');
            } else if (link.parentElement && link.parentElement.id && link.parentElement.id.endsWith('Mobile')) {
                const btn = link.parentElement.previousElementSibling;
                if (btn && btn.tagName === 'BUTTON') {
                    btn.classList.add('text-primary', 'font-medium', 'bg-primary/10', 'rounded-lg');
                    btn.classList.remove('text-gray-600', 'dark:text-gray-300');
                }
                link.classList.add('text-primary', 'font-medium');
            }
        }
    });
}
