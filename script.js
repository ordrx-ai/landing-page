// ========================================
// FAQ Accordion
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle current item
            item.classList.toggle('active');
            
            // Close other items (optional - remove if you want multiple open)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});

// ========================================
// Contact Form Submission (EmailJS)
// ========================================
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Enviando...</span>';
    
    // Get form data
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value || 'Não informado',
        segment: form.segment.value,
        tables: form.tables.value,
        city: form.city.value,
        message: form.message.value || 'Nenhuma mensagem adicional'
    };
    
    // Format email body
    const emailBody = `
Nova Solicitação de Demonstração - ORDRX

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DADOS DO CONTATO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nome: ${formData.name}
E-mail: ${formData.email}
Telefone: ${formData.phone}
Cidade: ${formData.city}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMAÇÕES DO ESTABELECIMENTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tipo: ${formData.segment}
Número de Mesas: ${formData.tables}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MENSAGEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Data: ${new Date().toLocaleString('pt-BR')}
Origem: Landing Page ORDRX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
    
    try {
        // Send email using mailto (fallback method for static site)
        // For production, you should use EmailJS or similar service
        const mailtoLink = `mailto:ungaro.pablo@gmail.com?subject=${encodeURIComponent('Nova Solicitação ORDRX - ' + formData.name)}&body=${encodeURIComponent(emailBody)}`;
        
        // Alternative: Use FormSubmit.co (no backend needed)
        const response = await fetch('https://formsubmit.co/ajax/ungaro.pablo@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                segment: formData.segment,
                tables: formData.tables,
                city: formData.city,
                message: formData.message,
                _subject: `Nova Solicitação ORDRX - ${formData.name} (${formData.email})`,
                _template: 'box',
                _replyto: formData.email
            })
        });
        
        if (response.ok) {
            // Show success modal
            showSuccessModal();
            
            // Reset form
            form.reset();
        } else {
            throw new Error('Falha no envio');
        }
    } catch (error) {
        console.error('Error:', error);
        
        // Fallback: Open mailto link
        window.location.href = `mailto:ungaro.pablo@gmail.com?subject=${encodeURIComponent('Nova Solicitação ORDRX - ' + formData.name)}&body=${encodeURIComponent(emailBody)}`;
        
        // Show success modal anyway
        setTimeout(() => {
            showSuccessModal();
            form.reset();
        }, 1000);
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// ========================================
// Success Modal
// ========================================
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
}

// Close modal when clicking close button
document.querySelector('.btn-close-modal').addEventListener('click', () => {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
});

// Close modal when clicking outside
document.getElementById('successModal').addEventListener('click', (e) => {
    if (e.target.id === 'successModal') {
        e.target.classList.remove('active');
    }
});

// ========================================
// Mobile Menu Toggle
// ========================================
document.getElementById('mobileMenuToggle').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = this;
    
    toggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ========================================
// Smooth Scroll with Offset
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // navbar height
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const toggle = document.getElementById('mobileMenuToggle');
            navMenu.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
});

// ========================================
// Phone Input Mask
// ========================================
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    
    if (value.length >= 2) {
        value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
    }
    
    if (value.length >= 10) {
        value = value.slice(0, 10) + '-' + value.slice(10);
    }
    
    e.target.value = value;
});

// ========================================
// Scroll Animations
// ========================================
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

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-card, .segment-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// Active Navigation Link
// ========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Counter Animation (Stats)
// ========================================
function animateCounter(element, target, suffix = '') {
    let count = 0;
    const increment = target / 60; // 60 frames
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(count) + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value, .about-stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                if (number) {
                    animateCounter(stat, number, suffix);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    const aboutStats = document.querySelector('.about-stats');
    
    if (heroStats) statsObserver.observe(heroStats);
    if (aboutStats) statsObserver.observe(aboutStats);
});

// ========================================
// Form Validation
// ========================================
const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input[required], select[required]');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.style.borderColor = 'rgba(255, 0, 0, 0.5)';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });
    
    input.addEventListener('input', function() {
        this.style.borderColor = 'rgba(0, 240, 255, 0.5)';
    });
});

// ========================================
// Performance: Lazy Load Images
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Console Easter Egg
// ========================================
console.log('%c🚀 ORDRX - Revolucionando Restaurantes', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #00F0FF, #FF00E5); color: white; padding: 10px 20px; border-radius: 8px;');
console.log('%cInteressado em trabalhar conosco? Envie seu currículo para: jobs@ordrx.com.br', 'font-size: 14px; color: #00F0FF;');

