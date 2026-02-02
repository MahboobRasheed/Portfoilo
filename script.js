
// Global Variables
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
// Timer Configuration
const TIMERS = {
    skills: 4000,    // 4 seconds for skills rotation
    projects: 3000,  // 3 seconds for projects rotation
    certificates: 3000 // 3 seconds for certificates rotation
};
// Navigation System
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Back to Top Button
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    updateActiveNav();
});
// Active Navigation Link
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});
// Skills Rotation System
class SkillsRotator {
    constructor() {
        this.categories = document.querySelectorAll('.skills-category');
        this.dots = document.querySelectorAll('.skills-dots .dot');
        this.currentIndex = 0;
        this.timer = null;
        this.isPaused = false;
        
        if (this.categories.length > 1) {
            this.init();
        }
    }
    
    init() {
        // Start automatic rotation
        this.startRotation();
        
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToCategory(index);
                this.resetTimer();
            });
        });
        
        // Pause rotation on hover
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.addEventListener('mouseenter', () => {
                this.isPaused = true;
                if (this.timer) {
                    clearInterval(this.timer);
                }
            });
            
            skillsSection.addEventListener('mouseleave', () => {
                this.isPaused = false;
                this.startRotation();
            });
        }
    }
    
    startRotation() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timer = setInterval(() => {
            if (!this.isPaused) {
                this.nextCategory();
            }
        }, TIMERS.skills);
    }
    
    nextCategory() {
        this.goToCategory((this.currentIndex + 1) % this.categories.length);
    }
    
    goToCategory(index) {
        // Remove active class from current category
        this.categories[this.currentIndex].classList.remove('active');
        this.categories[this.currentIndex].classList.add('leaving');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Add active class to new category
        this.currentIndex = index;
        this.categories[this.currentIndex].classList.add('active');
        this.categories[this.currentIndex].classList.remove('leaving');
        this.dots[this.currentIndex].classList.add('active');
        
        // Remove leaving class after animation
        setTimeout(() => {
            this.categories.forEach(cat => {
                cat.classList.remove('leaving');
            });
        }, 600);
    }
    
    resetTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.startRotation();
    }
}
// Projects Rotation System
class ProjectsRotator {
    constructor() {
        this.slides = document.querySelectorAll('.project-slide');
        this.dots = document.querySelectorAll('.projects-slider .slider-dots .dot');
        this.prevBtn = document.querySelector('.projects-slider .slider-arrow.prev');
        this.nextBtn = document.querySelector('.projects-slider .slider-arrow.next');
        this.currentIndex = 0;
        this.timer = null;
        this.isPaused = false;
        
        if (this.slides.length > 1) {
            this.init();
        }
    }
    
    init() {
        // Start automatic rotation
        this.startRotation();
        
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetTimer();
            });
        });
        
        // Add click events to arrows
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetTimer();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetTimer();
            });
        }
        
        // Pause rotation on hover
        const projectsSlider = document.querySelector('.projects-slider');
        if (projectsSlider) {
            projectsSlider.addEventListener('mouseenter', () => {
                this.isPaused = true;
                if (this.timer) {
                    clearInterval(this.timer);
                }
            });
            
            projectsSlider.addEventListener('mouseleave', () => {
                this.isPaused = false;
                this.startRotation();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetTimer();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetTimer();
            }
        });
    }
    
    startRotation() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timer = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, TIMERS.projects);
    }
    
    nextSlide() {
        this.goToSlide((this.currentIndex + 1) % this.slides.length);
    }
    
    prevSlide() {
        this.goToSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length);
    }
    
    goToSlide(index) {
        // Remove active class from current slide
        this.slides[this.currentIndex].classList.remove('active');
        this.slides[this.currentIndex].classList.add('leaving');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Add active class to new slide
        this.currentIndex = index;
        this.slides[this.currentIndex].classList.add('active');
        this.slides[this.currentIndex].classList.remove('leaving');
        this.dots[this.currentIndex].classList.add('active');
        
        // Remove leaving class after animation
        setTimeout(() => {
            this.slides.forEach(slide => {
                slide.classList.remove('leaving');
            });
        }, 800);
    }
    
    resetTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.startRotation();
    }
}
// Certificates Rotation System
class CertificatesRotator {
    constructor() {
        this.slides = document.querySelectorAll('.certificate-slide');
        this.dots = document.querySelectorAll('.certificates-slider .slider-dots .dot');
        this.prevBtn = document.querySelector('.certificates-slider .slider-arrow.prev');
        this.nextBtn = document.querySelector('.certificates-slider .slider-arrow.next');
        this.currentIndex = 0;
        this.timer = null;
        this.isPaused = false;
        
        if (this.slides.length > 1) {
            this.init();
        }
    }
    
    init() {
        // Start automatic rotation
        this.startRotation();
        
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetTimer();
            });
        });
        
        // Add click events to arrows
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetTimer();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetTimer();
            });
        }
        
        // Pause rotation on hover
        const certificatesSlider = document.querySelector('.certificates-slider');
        if (certificatesSlider) {
            certificatesSlider.addEventListener('mouseenter', () => {
                this.isPaused = true;
                if (this.timer) {
                    clearInterval(this.timer);
                }
            });
            
            certificatesSlider.addEventListener('mouseleave', () => {
                this.isPaused = false;
                this.startRotation();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.activeElement.tagName !== 'INPUT' && 
                document.activeElement.tagName !== 'TEXTAREA') {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                    this.resetTimer();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                    this.resetTimer();
                }
            }
        });
    }
    
    startRotation() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timer = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, TIMERS.certificates);
    }
    
    nextSlide() {
        this.goToSlide((this.currentIndex + 1) % this.slides.length);
    }
    
    prevSlide() {
        this.goToSlide((this.currentIndex - 1 + this.slides.length) % this.slides.length);
    }
    
    goToSlide(index) {
        // Remove active class from current slide
        this.slides[this.currentIndex].classList.remove('active');
        this.slides[this.currentIndex].classList.add('leaving');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Add active class to new slide
        this.currentIndex = index;
        this.slides[this.currentIndex].classList.add('active');
        this.slides[this.currentIndex].classList.remove('leaving');
        this.dots[this.currentIndex].classList.add('active');
        
        // Remove leaving class after animation
        setTimeout(() => {
            this.slides.forEach(slide => {
                slide.classList.remove('leaving');
            });
        }, 800);
    }
    
    resetTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.startRotation();
    }
}
// Initialize Lightbox
function initLightbox() {
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Certificate %1 of %2',
            'fadeDuration': 300,
            'imageFadeDuration': 300
        });
    }
}
// Set Current Year in Footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}
// Initialize Hero Animations
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}
// Initialize Image Loading
function initImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading');
        
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.classList.remove('loading');
                this.classList.add('error');
                console.log('Failed to load image:', this.src);
            });
        }
    });
}
// Alert System
function showAlert(message, type = 'info', duration = 5000) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-message">${message}</span>
            <button class="alert-close">&times;</button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 100px;
                right: 20px;
                min-width: 300px;
                max-width: 400px;
                z-index: 9999;
                animation: slideIn 0.3s ease;
            }
            .alert-content {
                padding: 20px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            }
            .custom-alert.success .alert-content {
                background: #d4edda;
                color: #155724;
                border-left: 4px solid #28a745;
            }
            .custom-alert.error .alert-content {
                background: #f8d7da;
                color: #721c24;
                border-left: 4px solid #dc3545;
            }
            .custom-alert.info .alert-content {
                background: #d1ecf1;
                color: #0c5460;
                border-left: 4px solid #17a2b8;
            }
            .alert-message {
                flex: 1;
                margin-right: 15px;
                font-weight: 500;
            }
            .alert-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: inherit;
                line-height: 1;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            .alert-close:hover {
                background: rgba(0,0,0,0.1);
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add close functionality
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    });
    
    // Auto remove after duration
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }
    }, duration);
    
    document.body.appendChild(alert);
    return alert;
}
// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mahboob Rasheed Portfolio Initialized');
    
    // Set current year
    setCurrentYear();
    
    // Initialize animations
    initHeroAnimations();
    initImageLoading();
    
    // Initialize rotation systems
    const skillsRotator = new SkillsRotator();
    const projectsRotator = new ProjectsRotator();
    const certificatesRotator = new CertificatesRotator();
    
    // Initialize lightbox
    initLightbox();
    
    // Initial animations
    updateActiveNav();
    
    // Add scroll event listeners
    window.addEventListener('scroll', updateActiveNav);
    
    // Log initialization
    console.log('Skills Rotator:', skillsRotator ? 'Active' : 'Inactive');
    console.log('Projects Rotator:', projectsRotator ? 'Active' : 'Inactive');
    console.log('Certificates Rotator:', certificatesRotator ? 'Active' : 'Inactive');
    
    // Show welcome message
    setTimeout(() => {
        showAlert('Welcome to my portfolio! Explore my skills, projects, and certificates.', 'info', 8000);
    }, 2000);
});

// Error Handling

window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden 
        console.log('Page is hidden');
    } else {
        // Page is visible
        console.log('Page is visible');
    }
});

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }, 0);
    });
}