/* ============================================
   Interactive Functionality - BookEase
   ============================================ */

// ---- Mobile Menu Toggle ----
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Accessibility: Update aria-expanded
    const isExpanded = navLinks.classList.contains('active');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', false);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinks.classList.remove('active');
    }
});

// ---- Smooth Scroll to Section ----
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        // For accessibility
        section.focus();
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ---- Form Submission Handler ----
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!email) {
        alert('אנא הזן דוא״ל תקף');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('אנא הזן דוא״ל תקף');
        return;
    }
    
    // Show success message
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    button.disabled = true;
    button.textContent = '⏳ דקה אחת...';
    
    // Simulate API call
    setTimeout(() => {
        button.textContent = '✅ תוכן להצטרף בקרוב!';
        button.style.background = 'var(--secondary-color)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
            button.style.background = '';
            form.reset();
        }, 3000);
    }, 1500);
    
    // In a real application, you would send the email to your backend
    console.log('Email submitted:', email);
}

// ---- Intersection Observer for Animations ----
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and pricing cards for fade-in animation
document.querySelectorAll('.feature-card, .pricing-card, .benefit-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ---- Add Focus Visible Styles ----
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ---- Keyboard Accessibility ----
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
    }
});

// ---- Prevent Layout Shift (CLS) ----
// Ensure scrollbar is always visible to prevent layout shift
document.documentElement.style.overflowY = 'scroll';

// ---- Analytics Helper ----
function trackEvent(eventName, eventData = {}) {
    // Log events for analytics
    console.log(`Event: ${eventName}`, eventData);
    
    // In a real application, send to analytics service
    // Example: gtag('event', eventName, eventData);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('button_click', {
            buttonText: button.textContent,
            buttonClass: button.className
        });
    });
});

// ---- Performance: Lazy Loading Images (if images added) ----
if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in IntersectionObserverEntry.prototype) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ---- Print Styles Support ----
window.addEventListener('beforeprint', () => {
    // Optimize for printing
    document.body.style.background = 'white';
});

// ---- Service Worker Registration (Progressive Web App) ----
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // In production, register service worker for offline support
        // navigator.serviceWorker.register('sw.js');
    });
}

// ---- Accessibility: Skip to Main Content ----
const skipLink = document.querySelector('.skip-link');
if (skipLink) {
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const main = document.querySelector('main');
        main?.focus();
    });
}

console.log('BookEase Landing Page Ready! 📅');
