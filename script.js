/* =========================================================================
   Sanchit Sharma Portfolio - Interactive Logic
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Current Year for Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('ion-icon');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('name', 'close-outline');
            } else {
                icon.setAttribute('name', 'menu-outline');
            }
        });
    }

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('ion-icon');
                if (icon) icon.setAttribute('name', 'menu-outline');
            }
        });
    });

    // 3. Sticky Navbar Blur Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once faded in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));

    // trigger immediately if already in view on load
    setTimeout(() => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

    // 5. Active Section Highlighting in Navbar
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });

    // 6. Contact Form Handle (Mailto intercept logic)
    const contactForm = document.getElementById('mailto-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            // Since it's a mailto, the sender email technically comes from their client
            // but we can put it in the body for clarity
            const senderEmail = document.getElementById('email').value; 
            const msg = document.getElementById('message').value;

            const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${msg}`
            );

            // Trigger default mail client
            window.location.href = `mailto:sanchit2462005@gmail.com?subject=${subject}&body=${body}`;
            
            // Optional: clear form
            contactForm.reset();
        });
    }

    // 7. Project Modal Logic
    const projectsData = {
        'crypto': {
            title: 'Crypto Market Intelligence',
            image: 'assets/images/crypto.png',
            desc: 'End-to-end intelligent platform integrating real-time market data and news sentiment to forecast crypto movements using supervised machine learning models and decision-driven analytics.',
            features: [
                'Real-time data ingestion via CoinGecko & NewsAPI',
                'Multi-model ML engine (Regression + Classification)',
                'News sentiment analysis integrated into prediction pipeline',
                'AI-powered Buy/Hold/Avoid decision system',
                'Dual-mode 6-month investment simulator (past + forecast)',
                'Interactive analytics dashboard with live visualization'
            ],
            stack: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas', 'NumPy', 'CoinGecko API', 'NewsAPI'],
            link: 'https://github.com/SanchitSharma24/Crypto_analysis'
        },
        'rainfall': {
            title: 'Rainfall Prediction System',
            image: 'assets/images/rainfall.png',
            desc: 'End-to-end machine learning system for predicting rainfall intensity using meteorological data, integrated with a web-based interface and interactive BI dashboard for real-time forecasting and data-driven insights.',
            features: [
                'High-accuracy ML model (Decision Tree ~98% accuracy)',
                'Multi-model experimentation (Logistic, RF, SVM, Gradient Boosting)',
                'Real-time prediction via Flask REST API',
                'Interactive web interface for live weather input',
                'Power BI dashboard for trend analysis & decision support',
                'Full data pipeline: preprocessing → modeling → deployment → visualization'
            ],
            stack: ['Python', 'Scikit-learn', 'Flask', 'Pandas', 'NumPy', 'HTML', 'CSS', 'JavaScript', 'Power BI'],
            link: 'https://github.com/SanchitSharma24/rain_prediction_system'
        },
        'gamezon': {
            title: 'Gamezon – AI-Powered Gaming Marketplace',
            image: 'assets/images/gamezon.png',
            desc: 'Full-stack e-commerce platform built for gamers, featuring real-time cart management, dynamic pricing, and an AI-powered gaming assistant for strategy guidance, integrated with SEO and analytics for performance tracking.',
            features: [
                'Custom e-commerce platform with real-time cart & pricing engine',
                'Multi-currency + seasonal discount automation',
                'Advanced search, filtering, and sorting',
                'AI gaming assistant (Flask + Gemini API)',
                'Responsive UI with animations',
                'SEO + Google Analytics integration'
            ],
            stack: ['HTML', 'CSS', 'JavaScript', 'Python (Flask)', 'Gemini API', 'Google Analytics'],
            link: 'https://github.com/SanchitSharma24/Gamezon'
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (modalOverlay && modalBody) {
        const openModal = (projectId) => {
            const data = projectsData[projectId];
            if (!data) return;

            modalBody.innerHTML = `
                <img src="${data.image}" class="modal-header-img" alt="${data.title}">
                <div class="modal-body">
                    <h3 class="modal-title">${data.title}</h3>
                    <p class="modal-desc">${data.desc}</p>
                    
                    <div class="modal-features">
                        <h4>Key Architecture Features</h4>
                        <ul>
                            ${data.features.map(f => `<li><ion-icon name="checkmark-circle"></ion-icon> ${f}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="tech-stack code-font" style="margin-bottom: 2.5rem;">
                        ${data.stack.map(s => `<span>${s}</span>`).join('')}
                    </div>

                    <div class="modal-actions">
                        <a href="${data.link}" target="_blank" class="btn btn-primary glow-btn"><ion-icon name="logo-github" style="margin-right: 0.5rem;"></ion-icon> View</a>
                    </div>
                </div>
            `;
            
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        };

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
            setTimeout(() => { modalBody.innerHTML = ''; }, 400); 
        };

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                openModal(projectId);
            });
        });

        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // 8. Cert Modal Logic
    const certModalOverlay = document.getElementById('cert-modal');
    const certModalCloseBtn = document.getElementById('cert-modal-close-btn');
    const certMoreBtn = document.getElementById('cert-more-btn');

    if (certModalOverlay && certMoreBtn) {
        const openCertModal = () => {
            certModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeCertModal = () => {
            certModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        certMoreBtn.addEventListener('click', openCertModal);
        if (certModalCloseBtn) certModalCloseBtn.addEventListener('click', closeCertModal);
        
        certModalOverlay.addEventListener('click', (e) => {
            if (e.target === certModalOverlay) closeCertModal();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModalOverlay.classList.contains('active')) {
                closeCertModal();
            }
        });
    }

    // 9. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing) {
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        // Track mouse position
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move dot instantly
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        });

        // Smooth follow for ring
        const renderCursor = () => {
            // Lerp (easing) function
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Hover effect for links and buttons
        const interactables = document.querySelectorAll('a, button');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('expand'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('expand'));
        });

        // Click effect
        window.addEventListener('mousedown', () => {
            cursorRing.classList.add('click');
        });
        window.addEventListener('mouseup', () => {
            cursorRing.classList.remove('click');
        });
    }

});
