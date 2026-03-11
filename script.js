// ========================================
// Scroll Animations - Intersection Observer
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  // Configurar Intersection Observer para animações de scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Opcional: parar de observar depois da animação
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar todos elementos com classes de animação
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 300) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (currentScroll > 400) {
      navbar.classList.add("shadowed");
    } else {
      navbar.classList.remove("shadowed");
    }

    lastScroll = currentScroll;
  });
});

// ========================================
// FAQ Accordion
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Toggle current item
      item.classList.toggle("active");

      // Close other items (optional - remove if you want multiple open)
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
    });
  });
});

// ========================================
// Contact Form Submission (EmailJS)
// ========================================
// Wait for DOM to be ready before accessing form
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  
  if (!contactForm) {
    console.error("Formulário de contato não encontrado");
    return;
  }

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector(".btn-submit");
    if (!submitBtn) {
      console.error("Botão de submit não encontrado");
      return;
    }
    
    const originalBtnText = submitBtn.innerHTML;

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Enviando...</span>";

    // Get form data using getElementById for safer access
    const getName = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : "";
    };
    
    const getSelectValue = (id) => {
      const el = document.getElementById(id);
      return el ? el.value : "";
    };

    const formData = {
      name: getName("name"),
      email: getName("email"),
      phone: getName("phone") || "Não informado",
      restaurant: getName("restaurant") || "Não informado",
      segment: getSelectValue("segment"),
      tables: getSelectValue("tables"),
      city: getName("city"),
      revenue: getSelectValue("revenue") || "Não informado",
    };
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.restaurant || !formData.segment || !formData.tables || !formData.city) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      return;
    }

    // Format email body
    const segmentLabels = {
      "restaurante": "Restaurante",
      "bar": "Bar",
      "cafeteria": "Cafeteria",
      "pizzaria": "Pizzaria",
      "casa-noturna": "Casa Noturna",
      "sorveteria": "Sorveteria",
      "churrascaria": "Churrascaria",
      "lanchonete": "Lanchonete",
      "sushi-bar": "Sushi Bar",
      "outro": "Outro"
    };
    
    const revenueLabels = {
      "ate-30k": "Até R$ 30.000",
      "30k-100k": "R$ 30.000 a R$ 100.000",
      "100k-300k": "R$ 100.000 a R$ 300.000",
      "300k+": "Acima de R$ 300.000",
      "nao-informar": "Prefiro não informar"
    };
    
    const emailBody = `
🚀 NOVA SOLICITAÇÃO DE TESTE GRÁTIS - ORDRX.AI

═══════════════════════════════════════════════════════
📋 DADOS DO CONTATO
═══════════════════════════════════════════════════════

👤 Nome Completo: ${formData.name}
📧 E-mail: ${formData.email}
📱 WhatsApp: ${formData.phone}
📍 Cidade: ${formData.city}

═══════════════════════════════════════════════════════
🏪 INFORMAÇÕES DO ESTABELECIMENTO
═══════════════════════════════════════════════════════

🍽️  Nome do Restaurante: ${formData.restaurant}
🏷️  Tipo de Estabelecimento: ${segmentLabels[formData.segment] || formData.segment}
🪑 Número de Mesas: ${formData.tables}
💰 Faturamento Médio Mensal: ${revenueLabels[formData.revenue] || formData.revenue}

═══════════════════════════════════════════════════════
💰 INFORMAÇÕES DO PLANO
═══════════════════════════════════════════════════════

✨ Período de Teste: 30 dias grátis
💵 Valor Após Teste: R$ 119,90/mês
📅 Data/Hora: ${new Date().toLocaleString("pt-BR", { 
  day: "2-digit", 
  month: "2-digit", 
  year: "numeric", 
  hour: "2-digit", 
  minute: "2-digit" 
})}
🌐 Origem: Landing Page ORDRX.AI
═══════════════════════════════════════════════════════

✨ Próximos Passos:
1. Criar conta no sistema ORDRX.AI
2. Enviar credenciais de acesso por e-mail
3. Fornecer suporte inicial para configuração
4. Informar sobre período de teste de 30 dias

═══════════════════════════════════════════════════════
    `.trim();

    try {
      // Send email using mailto (fallback method for static site)
      // For production, you should use EmailJS or similar service
      const mailtoLink = `mailto:ordrx.ai@gmail.com?subject=${encodeURIComponent(
        "🚀 Nova Solicitação de Teste Grátis - " + formData.name
      )}&body=${encodeURIComponent(emailBody)}`;

      // Alternative: Use FormSubmit.co (no backend needed)
      const response = await fetch(
        "https://formsubmit.co/ajax/ordrx.ai@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            restaurant: formData.restaurant,
            segment: formData.segment,
            tables: formData.tables,
            city: formData.city,
            revenue: formData.revenue,
            _subject: `🚀 Nova Solicitação de Teste Grátis ORDRX.AI - ${formData.restaurant} (${formData.name})`,
            _template: "box",
            _replyto: formData.email,
            _captcha: "false",
          }),
        }
      );

      // Parse response
      let responseData;
      try {
        const responseText = await response.text();
        // Log raw response for debugging
        console.log("FormSubmit Raw Response:", responseText);
        
        // Try to parse as JSON
        if (responseText) {
          responseData = JSON.parse(responseText);
        } else {
          responseData = { success: response.ok };
        }
      } catch (parseError) {
        console.warn("Could not parse response as JSON:", parseError);
        // If response is ok but not JSON, assume success
        responseData = { success: response.ok };
      }
      
      // Log parsed response for debugging
      console.log("FormSubmit Parsed Response:", responseData);

      if (response.ok) {
        // Check if email needs confirmation (first time using this email)
        // FormSubmit returns success: false with message when email needs confirmation
        if (responseData.success === false) {
          // Email needs confirmation
          const message = responseData.message || "É necessário confirmar o e-mail antes de receber os formulários.";
          showEmailConfirmationMessage(form, message);
          // Don't reset form - user might want to resubmit after confirmation
        } else {
          // Success - show success message
          showSuccessMessage(form);
          // Reset form
          form.reset();
        }
      } else {
        // Handle error response
        const errorMessage = responseData.message || responseData.error || "Falha no envio do formulário. Tente novamente.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("FormSubmit Error:", error);

      // Show error message to user
      showErrorMessage(form, error.message || "Erro ao enviar formulário. Tente novamente ou entre em contato diretamente.");

      // Fallback: Offer mailto option
      console.log("Fallback: Using mailto link");
      // Don't auto-open mailto, just show error and let user decide
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
});

// ========================================
// Success Message in Form
// ========================================
function showSuccessMessage(form) {
  // Remove any existing messages
  const existingMessage = form.querySelector(".form-success-message, .form-error-message, .form-confirmation-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create success message
  const successMessage = document.createElement("div");
  successMessage.className = "form-success-message";
  successMessage.innerHTML = `
    <div class="success-icon">✓</div>
    <div class="success-content">
      <h3>Cadastro Enviado com Sucesso!</h3>
      <p>📧 Você receberá um e-mail com suas credenciais de acesso em poucos minutos.</p>
      <p>✨ Teste grátis por 30 dias. Depois, apenas R$ 119,90/mês.</p>
      <p><small>💡 <strong>Importante:</strong> Verifique sua caixa de entrada e pasta de spam. Se não receber em alguns minutos, entre em contato conosco.</small></p>
    </div>
  `;

  // Insert before the submit button
  const submitButton = form.querySelector(".btn-submit");
  if (submitButton) {
    form.insertBefore(successMessage, submitButton);
  } else {
    form.appendChild(successMessage);
  }

  // Scroll to message
  successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ========================================
// Email Confirmation Message
// ========================================
function showEmailConfirmationMessage(form, message) {
  // Remove any existing messages
  const existingMessage = form.querySelector(".form-success-message, .form-error-message, .form-confirmation-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create confirmation message
  const confirmationMessage = document.createElement("div");
  confirmationMessage.className = "form-confirmation-message";
  confirmationMessage.innerHTML = `
    <div class="success-icon" style="background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));">📧</div>
    <div class="success-content">
      <h3>Confirmação de E-mail Necessária</h3>
      <p><strong>Primeira vez usando este e-mail?</strong></p>
      <p>O FormSubmit enviou um e-mail de confirmação para <strong>ordrx.ai@gmail.com</strong>.</p>
      <p>📬 <strong>Próximos passos:</strong></p>
      <ol style="text-align: left; margin: 1rem 0; padding-left: 1.5rem;">
        <li>Verifique a caixa de entrada de <strong>ordrx.ai@gmail.com</strong></li>
        <li>Verifique também a pasta de <strong>spam/lixo eletrônico</strong></li>
        <li>Clique no link de confirmação no e-mail</li>
        <li>Após confirmar, os formulários começarão a ser entregues normalmente</li>
      </ol>
      <p><small>💡 <strong>Dica:</strong> Marque o e-mail do FormSubmit como "não é spam" para garantir entregas futuras.</small></p>
      <p><small>Seu formulário foi salvo e será enviado automaticamente após a confirmação.</small></p>
    </div>
  `;

  // Insert before the submit button
  const submitButton = form.querySelector(".btn-submit");
  if (submitButton) {
    form.insertBefore(confirmationMessage, submitButton);
  } else {
    form.appendChild(confirmationMessage);
  }

  // Scroll to message
  confirmationMessage.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ========================================
// Error Message
// ========================================
function showErrorMessage(form, errorText) {
  // Remove any existing messages
  const existingMessage = form.querySelector(".form-success-message, .form-error-message, .form-confirmation-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create error message
  const errorMessage = document.createElement("div");
  errorMessage.className = "form-error-message";
  errorMessage.innerHTML = `
    <div class="success-icon" style="background: linear-gradient(135deg, #dc2626, #991b1b);">⚠️</div>
    <div class="success-content">
      <h3>Erro ao Enviar Formulário</h3>
      <p>${errorText}</p>
      <p><small>💡 <strong>Tente novamente</strong> ou entre em contato diretamente pelo e-mail <a href="mailto:ordrx.ai@gmail.com">ordrx.ai@gmail.com</a></small></p>
    </div>
  `;

  // Insert before the submit button
  const submitButton = form.querySelector(".btn-submit");
  if (submitButton) {
    form.insertBefore(errorMessage, submitButton);
  } else {
    form.appendChild(errorMessage);
  }

  // Scroll to message
  errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ========================================
// Mobile Menu Toggle
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      const navMenu = document.querySelector(".nav-menu");
      const toggle = this;

      if (navMenu) {
        toggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        const isOpen = toggle.classList.contains("active");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
    });
  }
});

// ========================================
// Smooth Scroll with Offset
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80; // navbar height
      const targetPosition = target.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const navMenu = document.querySelector(".nav-menu");
      const toggle = document.getElementById("mobileMenuToggle");
      navMenu.classList.remove("active");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

// ========================================
// Phone Input Mask
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length > 11) {
        value = value.slice(0, 11);
      }

      if (value.length >= 2) {
        value = "(" + value.slice(0, 2) + ") " + value.slice(2);
      }

      if (value.length >= 10) {
        value = value.slice(0, 10) + "-" + value.slice(10);
      }

      e.target.value = value;
    });
  }
});

// ========================================
// Scroll Animations
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .benefit-card, .segment-card, .faq-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// ========================================
// Active Navigation Link
// ========================================
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ========================================
// Navbar Scroll Effect
// ========================================
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.5)";
  } else {
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// ========================================
// Counter Animation (Stats)
// ========================================
function animateCounter(element, target, suffix = "") {
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
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statValues = entry.target.querySelectorAll(
          ".stat-value, .about-stat-value"
        );
        statValues.forEach((stat) => {
          const text = stat.textContent;
          const number = parseInt(text.replace(/\D/g, ""));
          const suffix = text.replace(/[0-9]/g, "");

          if (number) {
            animateCounter(stat, number, suffix);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.addEventListener("DOMContentLoaded", () => {
  const heroStats = document.querySelector(".hero-stats");
  const aboutStats = document.querySelector(".about-stats");

  if (heroStats) statsObserver.observe(heroStats);
  if (aboutStats) statsObserver.observe(aboutStats);
});

// ========================================
// Form Validation
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  
  if (form) {
    const inputs = form.querySelectorAll("input[required], select[required]");

    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        if (!this.value.trim()) {
          this.style.borderColor = "rgba(255, 0, 0, 0.5)";
        } else {
          this.style.borderColor = "rgba(255, 255, 255, 0.1)";
        }
      });

      input.addEventListener("input", function () {
        this.style.borderColor = "rgba(168, 85, 247, 0.5)";
      });
    });
  }
});

// ========================================
// Performance: Lazy Load Images
// ========================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ========================================
// Feature Focus Parallax (subtle)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || window.innerWidth < 768) {
    return;
  }

  const layers = Array.from(document.querySelectorAll(".focus-parallax[data-parallax-speed]"));
  if (!layers.length) return;

  let ticking = false;

  const applyParallax = () => {
    const viewportCenter = window.scrollY + window.innerHeight * 0.5;

    layers.forEach((layer) => {
      const speed = Number(layer.getAttribute("data-parallax-speed")) || 0.08;
      const section = layer.closest(".feature-focus-section");
      if (!section) return;

      const sectionCenter = section.offsetTop + section.offsetHeight * 0.5;
      const distance = viewportCenter - sectionCenter;
      layer.style.transform = `translate3d(0, ${distance * speed}px, 0)`;
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(applyParallax);
      ticking = true;
    }
  };

  applyParallax();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
});

// ========================================
// Console Easter Egg
// ========================================
console.log(
  "%c🚀 ORDRX - Revolucionando Restaurantes",
  "font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #00F0FF, #FF00E5); color: white; padding: 10px 20px; border-radius: 8px;"
);
console.log(
  "%cInteressado em trabalhar conosco? Envie seu currículo para: jobs@ordrx.com.br",
  "font-size: 14px; color: #00F0FF;"
);
