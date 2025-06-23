// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticleBackground();
    initSessionTimer();
    initFellowshipTimer();
    initFaq();
    initCompanyLogos();
    initStatsAnimation();
    initImpactStats();
    initScrollAnimations();
    initSmoothScrolling();
    initEnrollmentNotification();
});

// ===== COMPONENT FUNCTIONS =====

// Modify particle initialization
function initParticleBackground() {
    // Add this at the beginning
    if (window.innerWidth < 768) return; // Disable on mobile
    
    // ... rest of the code ...
}
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full size of hero section
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Particle system configuration
    const particles = [];
    const particleCount = Math.floor(canvas.width / 10);
    const colors = ['rgba(0, 85, 255, 0.5)', 'rgba(0, 200, 150, 0.5)', 'rgba(255, 255, 255, 0.3)'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
        });
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Reset particles that go off screen
            if (particle.x < 0 || particle.x > canvas.width || 
                particle.y < 0 || particle.y > canvas.height) {
                particle.x = Math.random() * canvas.width;
                particle.y = Math.random() * canvas.height;
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
    
    animateParticles();
}

// Session Countdown Timer (for today at 11:59 PM)
function initSessionTimer() {
    const hoursEl = document.getElementById('session-hours');
    const minEl = document.getElementById('session-min');
    const secEl = document.getElementById('session-sec');
    
    if (!hoursEl || !minEl || !secEl) return;
    
    function updateSessionTimer() {
        const now = new Date();
        const today1159PM = new Date();
        
        // Set target time to 11:59 PM today
        today1159PM.setHours(23, 59, 0, 0);
        
        // If it's already past 11:59 PM, set to tomorrow
        if (now > today1159PM) {
            today1159PM.setDate(today1159PM.getDate() + 1);
        }
        
        const diff = today1159PM - now;
        
        // If countdown has expired
        if (diff <= 0) {
            document.querySelector('.session-countdown').remove();
            document.querySelector('.session-banner-text').innerHTML = 
                '<i class="fas fa-calendar-alt"></i> Enrollment for this batch has closed!';
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minEl.textContent = minutes.toString().padStart(2, '0');
        secEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateSessionTimer, 1000);
    updateSessionTimer();
}

// Fellowship Countdown Timer (59 minutes)
function initFellowshipTimer() {
    const minEl = document.getElementById('fellowship-min');
    const secEl = document.getElementById('fellowship-sec');
    
    if (!minEl || !secEl) return;
    
    let fellowshipMinutes = 59;
    let fellowshipSeconds = 0;
    
    function updateFellowshipTimer() {
        minEl.textContent = fellowshipMinutes.toString().padStart(2, '0');
        secEl.textContent = fellowshipSeconds.toString().padStart(2, '0');
        
        if (fellowshipSeconds === 0) {
            if (fellowshipMinutes === 0) {
                // Timer ended, reset to 59 minutes
                fellowshipMinutes = 59;
                fellowshipSeconds = 0;
            } else {
                fellowshipMinutes--;
                fellowshipSeconds = 59;
            }
        } else {
            fellowshipSeconds--;
        }
    }
    
    setInterval(updateFellowshipTimer, 1000);
}

// FAQ Initialization
function initFaq() {
    const faqData = [
        {
            question: "Why is the fellowship priced at ₹349?",
            answer: "We've kept the price low to make it accessible to every student. All proceeds go toward onboarding quality mentors and reinvesting into better resources, sessions, and support for participants."
        },
        {
            question: "Is this just for undergraduates?",
            answer: "No, the fellowship is open to anyone, regardless of degree or background. Whether you're an undergraduate, a postgraduate, on a gap year, or a CA, the skills, strategies, and proof-of-work you'll build apply universally across roles and industries."
        },
        {
            question: "How much time will I need to commit each week?",
            answer: "Expect to spend around 6–8 hours per week, spread across short daily tasks, project work, and live/recorded mentor sessions. It's built to be flexible and async-first."
        },
        {
            question: "Do I get a certificate after completing the cohort?",
            answer: "Yes. Everyone who completes the fellowship project receives a Proofr-certified fellowship certificate. Top performers also get referrals, endorsements, and LinkedIn shoutouts from mentors."
        },
        {
            question: "What kind of mentors will I get access to?",
            answer: "Mentors include professionals and recent grads from Bain, Avendus, Nomura, PwC, Deloitte, Meesho and more across consulting, finance, product, and marketing."
        },
        {
            question: "What if I miss a live session?",
            answer: "All sessions are recorded and uploaded. Since the cohort is async-friendly, you can access everything later — without missing key content or losing pace."
        },
        {
            question: "Can I do this alongside college or an internship?",
            answer: "Absolutely. The structure is designed to fit around your schedule. Tasks are broken down into manageable chunks, and most sessions can be accessed anytime."
        },
        {
            question: "What if I haven't decided which domain I want to pursue yet?",
            answer: "That's completely okay. Week 1 of the cohort is designed to give you clarity on different roles across consulting, finance, marketing, product so you can choose a domain and build proof-of-work accordingly."
        },
        {
            question: "Is this only useful for final placements, or will it help with internships and off-campus roles too?",
            answer: "The cohort is designed for both internships and full-time placements, including off-campus roles. Whether you're in 2nd year applying for summer internships or a final-year student preparing for full-time jobs, the resume formats, outreach playbooks, and project-based proof-of-work apply across stages and industries."
        }
    ];

    const faqContainer = document.querySelector('.faq-container');
    if (!faqContainer) return;
    
    faqData.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'faq-question';
        questionDiv.innerHTML = `
            ${faq.question}
            <i class="fas fa-chevron-down"></i>
        `;
        
        const answerDiv = document.createElement('div');
        answerDiv.className = 'faq-answer';
        answerDiv.innerHTML = `<p>${faq.answer}</p>`;
        
        faqItem.appendChild(questionDiv);
        faqItem.appendChild(answerDiv);
        faqContainer.appendChild(faqItem);
        
        // Add click event to toggle answer
        questionDiv.addEventListener('click', () => {
            const isActive = answerDiv.classList.contains('active');
            
            // Toggle current FAQ answer
            if (!isActive) {
                answerDiv.classList.add('active');
                faqItem.classList.add('active');
            } else {
                answerDiv.classList.remove('active');
                faqItem.classList.remove('active');
            }
        });
    });
}

// Company Logos Marquee
function initCompanyLogos() {
    const companyLogos = [
        {name: "Accenture", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/320px-Accenture.svg.png"},
        {name: "Bain", url: "https://cdn.brandfetch.io/idd01EA1ZR/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"},
        {name: "Deloitte", url: "https://cdn.brandfetch.io/idIu-Ji9Le/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"},
        {name: "McKinsey", url: "https://cdn.brandfetch.io/iddTc-lesG/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"},
        {name: "PwC", url: "https://cdn.brandfetch.io/idGJDqQ72Q/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"},
        {name: "Nomura", url: "https://cdn.brandfetch.io/idXrk_5-TO/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"},
        {name: "BCG", url: "https://media-publications.bcg.com/BCG_MONOGRAM.png"},
        {name: "Goldman Sachs", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/320px-Goldman_Sachs.svg.png"},
        {name: "JP Morgan", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/JPMorgan_Chase_%282018%29.svg/320px-JPMorgan_Chase_%282018%29.svg.png"},
        {name: "Morgan Stanley", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Morgan_Stanley_Logo.svg/320px-Morgan_Stanley_Logo.svg.png"},
    ];

    const marquee = document.querySelector('.marquee');
    if (!marquee) return;
    
    // Add double the logos for continuous scrolling effect
    companyLogos.forEach(logo => {
        const companyItem = document.createElement('div');
        companyItem.className = 'company-item';
        companyItem.innerHTML = `<img src="${logo.url}" alt="${logo.name}" class="company-logo">`;
        marquee.appendChild(companyItem);
    });
    
    // Add them again for the seamless loop
    companyLogos.forEach(logo => {
        const companyItem = document.createElement('div');
        companyItem.className = 'company-item';
        companyItem.innerHTML = `<img src="${logo.url}" alt="${logo.name}" class="company-logo">`;
        marquee.appendChild(companyItem);
    });
}

// Stats Animation
function initStatsAnimation() {
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.innerHTML = value.toLocaleString() + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Animate all stats
    setTimeout(() => {
        animateValue("students-count", 0, 10000, 2000);
        animateValue("linkedin-count", 0, 40000, 2000);
        animateValue("resources-count", 0, 100, 2000);
        animateValue("opportunities-count", 0, 50, 2000);
    }, 500);
}

// Fixed Impact Stats Animation
function initImpactStats() {
    const statElements = document.querySelectorAll('.impact-stat .stat-number');
    if (!statElements.length) return;
    
    const duration = 2000; // 2 seconds for counting animation
    const repeatInterval = 10000; // 10 seconds between repeats
    
    // Easing function for smooth animation
    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function animateCount(element, target) {
        let start = 0;
        const startTime = performance.now();
        
        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuad(progress);
            const currentValue = Math.floor(easedProgress * target);
            
            element.textContent = currentValue.toLocaleString() + (target >= 1000 ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };
        
        requestAnimationFrame(updateCount);
    }

    // Initialize all counters
    function startAnimations() {
        statElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            animateCount(element, target);
        });
    }

    // Start first animation
    startAnimations();

    // Set up repeating animation
    let animationInterval = setInterval(() => {
        statElements.forEach(element => {
            element.textContent = '0' + (parseInt(element.getAttribute('data-target')) >= 1000 ? '+' : '');
        });
        setTimeout(startAnimations, 100);
    }, repeatInterval);

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(animationInterval);
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    if (!fadeElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}
// College Marquee Data
const colleges = [
    { name: "SRCC, University of Delhi", logo: "coll" },
    { name: "St. Stephen's College", logo: "colle" },
    { name: "Lady Shri Ram College", logo: "images/college-logos/IITD.PNG" },
    { name: "Hindu College", logo: "coll/hindu-logo.png" },
    { name: "IIM Ahmedabad", logo: "images/iim-logo.png" },
    { name: "IIM Bangalore", logo: "images/iimb-logo.png" },
    { name: "IIM Calcutta", logo: "images/iimc-logo.png" },
    { name: "FMS Delhi", logo: "images/fms-logo.png" },
    { name: "XLRI Jamshedpur", logo: "/" },
    { name: "SSCBS, Delhi University", logo: "images/sscbs-logo.png" },
    { name: "Hansraj College", logo: "images/hansraj-logo.png" },
    { name: "Miranda House", logo: "images/miranda-logo.png" }
];

// Initialize College Marquee
function initCollegeMarquee() {
    const marqueeTrack = document.querySelector('.marquee-track');
    
    // Add two sets of colleges for seamless looping
    for (let i = 0; i < 2; i++) {
        colleges.forEach(college => {
            const marqueeItem = document.createElement('div');
            marqueeItem.className = 'marquee-item';
            marqueeItem.innerHTML = `
                <img src="${college.logo}" alt="${college.name}" class="college-logo">
                <div class="college-name">${college.name}</div>
            `;
            marqueeTrack.appendChild(marqueeItem);
        });
    }
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', initCollegeMarquee);
function initCollegeMarquee() {
    const colleges = [
        { name: "SRCC", logo: "The_Official_Logo_of_Shri_Ram_College_of_Commerce(SRCC).png" },
        { name: "IIT Delhi", logo: "IITD.png" },
        // Add all other colleges here
    ];
    
    const marqueeTrack = document.querySelector('.marquee-track');
    if (!marqueeTrack) return;
    
    // Clear existing content
    marqueeTrack.innerHTML = '';
    
    // Add two sets for seamless looping
    for (let i = 0; i < 2; i++) {
        colleges.forEach(college => {
            const item = document.createElement('div');
            item.className = 'marquee-item';
            item.innerHTML = `
                <div class="logo-container">
                    <img src="college logos/${college.logo}" alt="${college.name}" class="college-logo">
                </div>
                <div class="college-name">${college.name}</div>
            `;
            marqueeTrack.appendChild(item);
        });
    }
}

// Call in DOMContentLoaded
initCollegeMarquee();