document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle removed as navigation is no longer needed
    
    // Countdown timer in header
    const countdownElement = document.querySelector('.countdown-title');
    
    if (countdownElement) {
        // Set the countdown to 24 hours from now
        const countDownDate = new Date();
        countDownDate.setHours(countDownDate.getHours() + 24);
        
        // Update the countdown every 1 second
        const countdownTimer = setInterval(function() {
            // Get current date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the countdown date
            const distance = countDownDate - now;
            
            // Time calculations for hours, minutes and seconds
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            countdownElement.innerHTML = `⏰ Our Sales Offer Ends In: ${hours}h ${minutes}m ${seconds}s ⏰`;
            
            // If the countdown is finished, display expired message
            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownElement.innerHTML = "⏰ OFFER EXPIRED ⏰";
            }
        }, 1000);
    }
    
    // Final countdown timer
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (hoursElement && minutesElement && secondsElement) {
        // Set the countdown to 24 hours from now
        const finalCountDownDate = new Date();
        finalCountDownDate.setHours(finalCountDownDate.getHours() + 24);
        
        // Update the countdown every 1 second
        const finalCountdownTimer = setInterval(function() {
            // Get current date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the countdown date
            const distance = finalCountDownDate - now;
            
            // Time calculations for hours, minutes and seconds
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            hoursElement.textContent = hours < 10 ? '0' + hours : hours;
            minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
            
            // If the countdown is finished, display zeros
            if (distance < 0) {
                clearInterval(finalCountdownTimer);
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
            }
        }, 1000);
    }
    
    // FAQ toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-toggle i');
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                }
            });
            
            // Toggle the current FAQ item
            item.classList.toggle('active');
            
            // Change the icon
            const icon = item.querySelector('.faq-toggle i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(this.getAttribute('href'));
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Redirect all CTA buttons to xyz.com
    const ctaButtons = document.querySelectorAll(
        '.hero-cta-button, .features-cta-button, .video-cta-button, ' +
        '.value-cta-button, .buy-now-button, .testimonial-cta-button, ' +
        '.products-cta-button, .faq-cta-button, .final-cta-button, .sticky-cta-button'
    );
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'https://xyz.com';
        });
    });
    
    // Add animation to value comparison on scroll
    const valueSection = document.querySelector('.value-section');
    const highlightValue = document.querySelector('.highlight-value');
    
    if (valueSection && highlightValue) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    highlightValue.classList.add('animated');
                    setTimeout(() => {
                        highlightValue.classList.add('pulse');
                    }, 500);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(valueSection);
    }
    
    // Show sticky CTA after scrolling
    const stickyCta = document.querySelector('.sticky-cta');
    
    if (stickyCta) {
        // Initially hide the sticky CTA
        stickyCta.style.display = 'none';
        
        window.addEventListener('scroll', function() {
            // Show sticky CTA after scrolling 300px
            if (window.scrollY > 300) {
                stickyCta.style.display = 'block';
            } else {
                stickyCta.style.display = 'none';
            }
        });
    }
    
    // Add urgency with visitor counter
    const createVisitorCounter = () => {
        const counterContainer = document.createElement('div');
        counterContainer.className = 'visitor-counter';
        
        // Generate a random number between 15-30
        const visitorCount = Math.floor(Math.random() * 16) + 15;
        
        counterContainer.innerHTML = `
            <div class="visitor-counter-content">
                <i class="fas fa-eye"></i>
                <p><strong>${visitorCount} people</strong> are viewing this page right now</p>
            </div>
        `;
        
        // Add styles
        counterContainer.style.position = 'fixed';
        counterContainer.style.bottom = '80px';
        counterContainer.style.left = '20px';
        counterContainer.style.backgroundColor = '#fff';
        counterContainer.style.padding = '10px 15px';
        counterContainer.style.borderRadius = '5px';
        counterContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        counterContainer.style.zIndex = '999';
        counterContainer.style.fontSize = '14px';
        counterContainer.style.display = 'none';
        
        const counterContent = counterContainer.querySelector('.visitor-counter-content');
        counterContent.style.display = 'flex';
        counterContent.style.alignItems = 'center';
        counterContent.style.gap = '10px';
        
        document.body.appendChild(counterContainer);
        
        // Show after 5 seconds
        setTimeout(() => {
            counterContainer.style.display = 'block';
        }, 5000);
    };
    
    createVisitorCounter();

    // Optimize product images loading
    const productImages = document.querySelectorAll('.product-thumbnail');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('src');
                    
                    // Only load the image when it's in the viewport
                    if (src) {
                        img.style.opacity = '0';
                        
                        // Create a new image to preload
                        const newImg = new Image();
                        newImg.src = src;
                        
                        newImg.onload = function() {
                            img.style.opacity = '1';
                            img.style.transition = 'opacity 0.5s ease';
                        };
                        
                        // Stop observing the image after loading
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        productImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Improve mobile experience for product grid
    if (window.innerWidth <= 768) {
        const productItems = document.querySelectorAll('.product-item');
        
        productItems.forEach(item => {
            // Add touch feedback for mobile
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Adjust video container height for mobile
    const adjustVideoHeight = () => {
        const videoContainer = document.querySelector('.video-container iframe');
        if (videoContainer && window.innerWidth <= 480) {
            videoContainer.style.height = '200px';
        } else if (videoContainer && window.innerWidth <= 768) {
            videoContainer.style.height = '300px';
        }
    };
    
    // Run on load and resize
    adjustVideoHeight();
    window.addEventListener('resize', adjustVideoHeight);
}); 