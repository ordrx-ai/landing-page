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
      city: getName("city"),
    };
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.restaurant || !formData.segment || !formData.city) {
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
      "sorveteria": "Sorveteria",
      "churrascaria": "Churrascaria",
      "lanchonete": "Lanchonete",
      "sushi-bar": "Sushi Bar",
      "outro": "Outro"
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
            city: formData.city,
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
// System Showcase Carousel - Multi Instance Support
// ========================================
function initializeCarousel(carouselElement) {
  const track = carouselElement.querySelector(".carousel-track");
  const dotsWrap = carouselElement.querySelector(".carousel-dots");
  const activeContent = carouselElement.querySelector(".carousel-active-content");
  const activeTitle = activeContent?.querySelector(".section-sub-title");
  const activeSubtitle = activeContent?.querySelector(".section-subtitle");

  if (!track || !dotsWrap) {
    return;
  }

  const slides = Array.from(track.querySelectorAll(".carousel-slide"));
  const prevBtn = carouselElement.querySelector(".carousel-btn.prev");
  const nextBtn = carouselElement.querySelector(".carousel-btn.next");

  if (!slides.length || !prevBtn || !nextBtn) {
    return;
  }

  // Build dots dynamically based on the number of slides.
  dotsWrap.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = index === 0 ? "carousel-dot active" : "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para slide ${index + 1}`);
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll(".carousel-dot"));

  let currentIndex = 0;
  let autoPlayId = null;
  let isPointerDown = false;
  let startX = 0;
  let startY = 0;
  let dragDeltaX = 0;
  let dragAxis = null;
  let hasSwiped = false;
  let lastMoveX = 0;
  let lastMoveTime = 0;
  let velocityX = 0;
  let isHoveringCarousel = false;

  const isTwoImagesSlide = (slide) => {
    return !!slide?.classList.contains("two-images-slide");
  };

  const getTwoImages = (slide) => {
    if (!slide) {
      return [];
    }

    const classBasedImages = slide.querySelectorAll("img.first-image-slide, img.second-image-slide");
    if (classBasedImages.length >= 2) {
      return Array.from(classBasedImages);
    }

    return Array.from(slide.querySelectorAll("img")).slice(0, 2);
  };

  const showImageByIndex = (slide, indexToShow) => {
    const images = getTwoImages(slide);
    if (images.length < 2) {
      return false;
    }

    images.forEach((image, index) => {
      image.hidden = index !== indexToShow;
    });

    slide.dataset.activeImageIndex = String(indexToShow);
    return true;
  };

  const resetTwoImageSlide = (slide) => {
    if (!isTwoImagesSlide(slide)) {
      return;
    }

    showImageByIndex(slide, 0);
  };

  const toggleTwoImageSlide = (slide) => {
    if (!isTwoImagesSlide(slide)) {
      return false;
    }

    const images = getTwoImages(slide);
    if (images.length < 2) {
      return false;
    }

    const currentIndex = Number(slide.dataset.activeImageIndex || "0");
    const nextIndex = currentIndex === 0 ? 1 : 0;
    return showImageByIndex(slide, nextIndex);
  };

  const getRelativePosition = (slideIndex, activeIndex, total) => {
    let diff = slideIndex - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const updateActiveContent = () => {
    if (!activeTitle || !activeSubtitle) {
      return;
    }

    const activeSlide = slides[currentIndex];
    if (!activeSlide) {
      return;
    }

    const title = activeSlide.querySelector("figcaption:not(.carousel-slide-info)");
    const subtitle = activeSlide.querySelector(".carousel-slide-info");

    activeTitle.textContent = title ? title.textContent.trim() : "";
    activeSubtitle.textContent = subtitle ? subtitle.textContent.trim() : "";
    activeSubtitle.hidden = !subtitle || !subtitle.textContent.trim();
  };

  const goToSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      resetTwoImageSlide(slide);

      slide.style.removeProperty("transform");
      slide.style.removeProperty("transition");
      slide.classList.remove(
        "active",
        "is-active",
        "is-prev",
        "is-next",
        "is-prev-2",
        "is-next-2"
      );

      const pos = getRelativePosition(i, currentIndex, slides.length);

      if (pos === 0) {
        slide.classList.add("active", "is-active");
        slide.removeAttribute("aria-hidden");
      } else if (pos === -1) {
        slide.classList.add("is-prev");
        slide.setAttribute("aria-hidden", "true");
      } else if (pos === 1) {
        slide.classList.add("is-next");
        slide.setAttribute("aria-hidden", "true");
      } else if (pos === -2) {
        slide.classList.add("is-prev-2");
        slide.setAttribute("aria-hidden", "true");
      } else if (pos === 2) {
        slide.classList.add("is-next-2");
        slide.setAttribute("aria-hidden", "true");
      } else {
        slide.setAttribute("aria-hidden", "true");
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    updateActiveContent();
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  const getActiveSlide = () => slides[currentIndex] || null;

  const applyDragVisual = (deltaX) => {
    const activeSlide = getActiveSlide();
    if (!activeSlide) {
      return;
    }

    const clamped = Math.max(-140, Math.min(140, deltaX));
    const tilt = clamped * -0.04;

    activeSlide.style.transition = "none";
    activeSlide.style.transform = `translateX(calc(-50% + ${clamped}px)) scale(1) rotateY(${tilt}deg) translateZ(0)`;
  };

  const resetDragVisual = () => {
    const activeSlide = getActiveSlide();
    if (!activeSlide) {
      return;
    }

    activeSlide.style.removeProperty("transition");
    activeSlide.style.removeProperty("transform");
  };

  const startAutoPlay = () => {
    if (slides.length <= 1 || isHoveringCarousel) {
      return;
    }
    stopAutoPlay();
    autoPlayId = window.setInterval(() => {
      if (!isHoveringCarousel) {
        const activeSlide = getActiveSlide();
        if (toggleTwoImageSlide(activeSlide)) {
          return;
        }
        nextSlide();
      }
    }, 10000);
  };

  const stopAutoPlay = () => {
    if (autoPlayId) {
      window.clearInterval(autoPlayId);
      autoPlayId = null;
    }
  };

  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoPlay();
  });

  if (slides.length <= 1) {
    prevBtn.setAttribute("disabled", "true");
    nextBtn.setAttribute("disabled", "true");
    dotsWrap.style.display = "none";
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      startAutoPlay();
    });
  });

  carouselElement.addEventListener("mouseenter", () => {
    isHoveringCarousel = true;
    stopAutoPlay();
  });

  carouselElement.addEventListener("mouseleave", () => {
    isHoveringCarousel = false;
    startAutoPlay();
  });

  const SWIPE_THRESHOLD = 45;

  const beginDrag = (x, y) => {
    isPointerDown = true;
    hasSwiped = false;
    dragAxis = null;
    startX = x;
    startY = y;
    dragDeltaX = 0;
    velocityX = 0;
    lastMoveX = x;
    lastMoveTime = performance.now();
    carouselElement.style.cursor = "grabbing";
    carouselElement.style.userSelect = "none";
  };

  const handleDragMove = (x, y, event) => {
    if (!isPointerDown || hasSwiped || slides.length <= 1) {
      return;
    }

    const deltaX = x - startX;
    const deltaY = y - startY;
    dragDeltaX = deltaX;

    const now = performance.now();
    const dt = Math.max(1, now - lastMoveTime);
    const dx = x - lastMoveX;
    const instantV = dx / dt;
    velocityX = velocityX * 0.65 + instantV * 0.35;
    lastMoveX = x;
    lastMoveTime = now;

    if (!dragAxis && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
      dragAxis = Math.abs(deltaX) >= Math.abs(deltaY) ? "x" : "y";
    }

    if (dragAxis !== "x") {
      return;
    }

    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }

    applyDragVisual(deltaX);

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      hasSwiped = true;
      startAutoPlay();
    }
  };

  carouselElement.addEventListener("pointerdown", (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest(".carousel-controls")
    ) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    beginDrag(event.clientX, event.clientY);
    if (carouselElement.setPointerCapture) {
      carouselElement.setPointerCapture(event.pointerId);
    }
  });

  carouselElement.addEventListener("pointermove", (event) => {
    handleDragMove(event.clientX, event.clientY, event);
  });

  const endPointerDrag = (event) => {
    if (isPointerDown && !hasSwiped) {
      const MOMENTUM_VELOCITY_THRESHOLD = 0.38;
      const hasMomentum = Math.abs(velocityX) >= MOMENTUM_VELOCITY_THRESHOLD;

      if (dragAxis === "x" && (Math.abs(dragDeltaX) >= SWIPE_THRESHOLD || hasMomentum)) {
        if (hasMomentum ? velocityX < 0 : dragDeltaX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startAutoPlay();
      } else {
        resetDragVisual();
      }
    }

    isPointerDown = false;
    hasSwiped = false;
    dragDeltaX = 0;
    dragAxis = null;
    velocityX = 0;
    carouselElement.style.cursor = "";
    carouselElement.style.userSelect = "";

    if (event && carouselElement.releasePointerCapture) {
      try {
        carouselElement.releasePointerCapture(event.pointerId);
      } catch (error) {
        // Ignore release errors when no pointer is captured.
      }
    }
  };

  carouselElement.addEventListener("pointerup", endPointerDrag);
  carouselElement.addEventListener("pointercancel", endPointerDrag);
  carouselElement.addEventListener("pointerleave", endPointerDrag);

  carouselElement.addEventListener(
    "touchstart",
    (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest(".carousel-controls")
      ) {
        return;
      }

      if (!event.touches || event.touches.length !== 1) {
        return;
      }
      const touch = event.touches[0];
      beginDrag(touch.clientX, touch.clientY);
    },
    { passive: true }
  );

  carouselElement.addEventListener(
    "touchmove",
    (event) => {
      if (!event.touches || event.touches.length !== 1) {
        return;
      }
      const touch = event.touches[0];
      handleDragMove(touch.clientX, touch.clientY, event);
    },
    { passive: false }
  );

  carouselElement.addEventListener("touchend", endPointerDrag);
  carouselElement.addEventListener("touchcancel", endPointerDrag);

  slides.forEach((slide) => {
    resetTwoImageSlide(slide);
  });

  goToSlide(0);
  startAutoPlay();
}

// Initialize all carousels
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".system-carousel");
  carousels.forEach((carousel) => {
    initializeCarousel(carousel);
  });
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
// Global Image Lightbox (Accessible + Swipe)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const allImages = Array.from(document.querySelectorAll("img"));
  if (!allImages.length) return;

  const modal = document.createElement("div");
  modal.className = "image-lightbox";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Visualização ampliada da imagem");
  modal.hidden = true;

  modal.innerHTML = `
    <div class="image-lightbox-backdrop" data-lightbox-close="true"></div>
    <div class="image-lightbox-dialog" role="document">
      <button type="button" class="image-lightbox-close" aria-label="Fechar imagem">×</button>
      <button type="button" class="image-lightbox-nav image-lightbox-prev" aria-label="Imagem anterior" hidden>&#8249;</button>
      <button type="button" class="image-lightbox-nav image-lightbox-next" aria-label="Próxima imagem" hidden>&#8250;</button>
      <figure class="image-lightbox-figure">
        <img class="image-lightbox-media" alt="" />
        <figcaption class="image-lightbox-caption" hidden></figcaption>
      </figure>
    </div>
  `;

  document.body.appendChild(modal);

  const lightboxImage = modal.querySelector(".image-lightbox-media");
  const lightboxCaption = modal.querySelector(".image-lightbox-caption");
  const closeButton = modal.querySelector(".image-lightbox-close");
  const prevButton = modal.querySelector(".image-lightbox-prev");
  const nextButton = modal.querySelector(".image-lightbox-next");

  let lastFocusedElement = null;
  let gallery = [];
  let galleryIndex = 0;

  // Returns true only for images that should NOT open a lightbox (e.g. wrapped in a real link/button)
  const isNativelyInteractive = (image) => {
    return !!image.closest("button, a[href]");
  };

  // Used ONLY during initial setup — before role="button" is added
  const isLightboxEligible = (image) => {
    if (!(image instanceof HTMLImageElement)) return false;
    if (image.closest(".image-lightbox")) return false;
    if (isNativelyInteractive(image)) return false;
    return true;
  };

  const focusablesInModal = () => {
    return Array.from(
      modal.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      )
    ).filter((el) => !el.hasAttribute("disabled") && !el.hidden);
  };

  const getGalleryFor = (image) => {
    const carousel = image.closest(".system-showcase");
    if (!carousel) return [image];
    const carouselImages = Array.from(carousel.querySelectorAll("img.carousel-image"));
    // If no carousel-image class used in this section, collect all eligible imgs in carousel tracks
    const pool = carouselImages.length
      ? carouselImages
      : Array.from(carousel.querySelectorAll(".carousel-track img"));
    return pool.filter((img) => !img.closest(".image-lightbox") && !isNativelyInteractive(img));
  };

  const showImageAtIndex = (index) => {
    const img = gallery[index];
    if (!img) return;
    galleryIndex = index;

    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || "Imagem ampliada";

    const captionText = (img.alt || img.getAttribute("title") || "").trim();
    if (captionText) {
      lightboxCaption.textContent = captionText;
      lightboxCaption.hidden = false;
    } else {
      lightboxCaption.textContent = "";
      lightboxCaption.hidden = true;
    }

    const hasMultiple = gallery.length > 1;
    prevButton.hidden = !hasMultiple;
    nextButton.hidden = !hasMultiple;

    prevButton.setAttribute("aria-disabled", galleryIndex === 0 ? "true" : "false");
    nextButton.setAttribute("aria-disabled", galleryIndex === gallery.length - 1 ? "true" : "false");
  };

  const openLightbox = (image) => {
    if (!(image instanceof HTMLImageElement)) return;
    if (!(image.currentSrc || image.src)) return;

    lastFocusedElement = document.activeElement;
    gallery = getGalleryFor(image);
    galleryIndex = gallery.indexOf(image);
    if (galleryIndex === -1) galleryIndex = 0;

    showImageAtIndex(galleryIndex);
    modal.hidden = false;
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  const closeLightbox = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
    gallery = [];
    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  const navigatePrev = () => {
    if (galleryIndex > 0) showImageAtIndex(galleryIndex - 1);
  };

  const navigateNext = () => {
    if (galleryIndex < gallery.length - 1) showImageAtIndex(galleryIndex + 1);
  };

  // Bind images
  allImages.forEach((image) => {
    if (!isLightboxEligible(image)) return;

    image.setAttribute("role", "button");
    if (!image.hasAttribute("tabindex")) image.setAttribute("tabindex", "0");
    image.setAttribute("aria-label", image.alt ? `Ampliar imagem: ${image.alt}` : "Ampliar imagem");
    image.classList.add("lightbox-enabled-image");

    image.addEventListener("click", () => openLightbox(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  // Close / nav buttons
  prevButton.addEventListener("click", navigatePrev);
  nextButton.addEventListener("click", navigateNext);

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("[data-lightbox-close='true'], .image-lightbox-close")) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;

    if (event.key === "Escape") { closeLightbox(); return; }
    if (event.key === "ArrowLeft") { event.preventDefault(); navigatePrev(); return; }
    if (event.key === "ArrowRight") { event.preventDefault(); navigateNext(); return; }

    if (event.key === "Tab") {
      const focusables = focusablesInModal();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });

  // Touch swipe
  let touchStartX = 0;
  let touchStartY = 0;

  modal.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }, { passive: true });

  modal.addEventListener("touchend", (event) => {
    if (modal.hidden || gallery.length <= 1) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    // Only horizontal swipes (ratio > 1.5)
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) navigateNext();
    else navigatePrev();
  }, { passive: true });
});

// ========================================
// Calculadora de Recuperação de Lucro
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("calculator");
  if (!section) return;

  const input = document.getElementById("calc-faturamento");
  const btn = document.getElementById("calc-btn");
  const inputWrap = section.querySelector(".calc-input-wrap");
  const costs = section.querySelectorAll(".pain-cost[data-min]");
  const totalEl = section.querySelector(".pain-total-result");
  if (!input || !btn) return;

  const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

  // Mantém apenas dígitos e formata com separador de milhar (pt-BR)
  function formatarInput() {
    const digitos = input.value.replace(/\D/g, "");
    if (!digitos) {
      input.value = "";
      return;
    }
    input.value = Number(digitos).toLocaleString("pt-BR");
  }

  function lerFaturamento() {
    const digitos = input.value.replace(/\D/g, "");
    return digitos ? Number(digitos) : 0;
  }

  function faixaReais(faturamento, min, max) {
    const valorMin = Math.round((faturamento * min) / 100);
    const valorMax = Math.round((faturamento * max) / 100);
    if (valorMin === valorMax) return moeda.format(valorMax);
    return `${moeda.format(valorMin)} a ${moeda.format(valorMax)}`;
  }

  function calcular() {
    const faturamento = lerFaturamento();

    if (faturamento <= 0) {
      if (inputWrap) inputWrap.classList.add("calc-error");
      input.focus();
      return;
    }
    if (inputWrap) inputWrap.classList.remove("calc-error");

    // Substitui o texto da % de cada card pelo valor em R$ correspondente
    costs.forEach((cost) => {
      const min = parseFloat(cost.dataset.min);
      const max = parseFloat(cost.dataset.max);
      cost.innerHTML = `${faixaReais(faturamento, min, max)}<span class="pain-cost-sub">de prejuízo por mês</span>`;
      cost.classList.add("pain-cost--calc");
    });

    if (totalEl) {
      const max = parseFloat(totalEl.dataset.max) || 25;
      const recMax = Math.round((faturamento * max) / 100);
      totalEl.innerHTML = `Com a ORDRX você pode recuperar até <strong>${moeda.format(
        recMax
      )}</strong> por mês.`;
    }

    section.classList.add("calc-done");
  }

  input.addEventListener("input", () => {
    formatarInput();
    if (inputWrap) inputWrap.classList.remove("calc-error");
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calcular();
    }
  });

  btn.addEventListener("click", calcular);
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
