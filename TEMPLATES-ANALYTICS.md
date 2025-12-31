# Templates para Google Analytics e Ferramentas de Monitoramento

Este arquivo contém código pronto para adicionar ao site após configurar as ferramentas externas.

---

## 📊 GOOGLE ANALYTICS 4

### Passo 1: Criar Propriedade GA4

1. Acesse: https://analytics.google.com/
2. Criar Propriedade
3. Nome: "ORDRX Website"
4. Fuso horário: America/Sao_Paulo
5. Moeda: BRL (Real Brasileiro)
6. Criar Stream de Dados → Web
7. URL: https://ordrx.ai
8. Nome do Stream: "ORDRX Main Site"

**Você receberá um ID no formato**: `G-XXXXXXXXXX`

---

### Passo 2: Instalar o Código

Adicione este código no `<head>` de **TODAS as páginas** (index.html, blog.html, artigos, etc.):

```html
<!-- Google Analytics 4 -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX", {
    send_page_view: true,
    cookie_flags: "SameSite=None;Secure",
  });
</script>
```

**⚠️ IMPORTANTE**: Substitua `G-XXXXXXXXXX` pelo seu ID real!

---

### Passo 3: Eventos Personalizados

Adicione ao **final do script.js** (antes do último `}`):

```javascript
// Google Analytics Events
function trackEvent(eventName, eventParams = {}) {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, eventParams);
  }
}

// Track CTA Clicks
document
  .querySelectorAll(".btn-primary, .btn-gradient, .btn-large")
  .forEach((button) => {
    button.addEventListener("click", function (e) {
      const buttonText = this.textContent.trim();
      trackEvent("cta_click", {
        button_text: buttonText,
        button_location: this.closest("section")?.id || "unknown",
      });
    });
  });

// Track Form Submission
document
  .getElementById("contactForm")
  ?.addEventListener("submit", function (e) {
    trackEvent("form_submit", {
      form_name: "beta_founders_application",
    });
  });

// Track Scroll Depth
let scrollDepth50 = false;
let scrollDepth90 = false;

window.addEventListener("scroll", function () {
  const scrollPercent =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

  if (scrollPercent >= 50 && !scrollDepth50) {
    scrollDepth50 = true;
    trackEvent("scroll", { depth: "50%" });
  }

  if (scrollPercent >= 90 && !scrollDepth90) {
    scrollDepth90 = true;
    trackEvent("scroll", { depth: "90%" });
  }
});

// Track Outbound Links
document
  .querySelectorAll('a[href^="http"]:not([href*="ordrx.ai"])')
  .forEach((link) => {
    link.addEventListener("click", function (e) {
      trackEvent("outbound_click", {
        url: this.href,
        text: this.textContent.trim(),
      });
    });
  });

// Track Blog Article Read
if (document.querySelector(".article-content")) {
  const articleTitle =
    document.querySelector(".article-title")?.textContent || "unknown";

  // Track article view
  trackEvent("article_view", {
    article_title: articleTitle,
  });

  // Track reading time (assumed 90% scroll = read)
  window.addEventListener("scroll", function () {
    const scrollPercent =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    if (scrollPercent >= 90) {
      trackEvent("article_read", {
        article_title: articleTitle,
      });
    }
  });
}
```

---

## 🏷️ GOOGLE TAG MANAGER (Alternativa Recomendada)

GTM permite gerenciar todas as tags sem editar código. Mais flexível que GA4 direto.

### Passo 1: Criar Conta GTM

1. Acesse: https://tagmanager.google.com/
2. Criar Conta
3. Nome: "ORDRX"
4. País: Brasil
5. Criar Container
6. Nome do Container: "ORDRX Website"
7. Platform: Web

**Você receberá um ID**: `GTM-XXXXXXX`

---

### Passo 2: Instalar GTM

#### Parte 1: No `<head>` (logo após a tag `<head>`)

```html
<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-XXXXXXX");
</script>
<!-- End Google Tag Manager -->
```

#### Parte 2: No `<body>` (logo após a tag `<body>`)

```html
<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe
></noscript>
<!-- End Google Tag Manager (noscript) -->
```

**⚠️ IMPORTANTE**: Substitua `GTM-XXXXXXX` pelo seu ID real!

---

### Passo 3: Configurar Tags no GTM

Após instalar o código, configure no painel do GTM:

#### Tag 1: Google Analytics 4

1. Tags → New → Google Analytics: GA4 Configuration
2. Measurement ID: `G-XXXXXXXXXX` (seu ID do GA4)
3. Trigger: All Pages
4. Save & Publish

#### Tag 2: CTA Clicks

1. Tags → New → Google Analytics: GA4 Event
2. Event Name: `cta_click`
3. Configuration Tag: (selecione o GA4 Config criado)
4. Trigger: New Trigger
   - Type: Click - All Elements
   - This trigger fires on: Some Clicks
   - Click Classes contains: `btn-primary` OR `btn-gradient` OR `btn-large`
5. Save & Publish

#### Tag 3: Form Submission

1. Tags → New → Google Analytics: GA4 Event
2. Event Name: `form_submit`
3. Trigger: New Trigger
   - Type: Form Submission
   - This trigger fires on: All Forms
4. Save & Publish

---

## 🔍 GOOGLE SEARCH CONSOLE

### Passo 1: Adicionar Propriedade

1. Acesse: https://search.google.com/search-console
2. Add Property
3. Type: URL prefix
4. URL: `https://ordrx.ai`

---

### Passo 2: Verificar Propriedade

**Método 1: HTML File** (Mais fácil)

1. Download arquivo HTML fornecido
2. Upload para pasta `landing-page/`
3. Verifique se acessível: `https://ordrx.ai/google########.html`
4. Clique "Verify"

**Método 2: HTML Tag**

Adicione no `<head>` do index.html:

```html
<meta name="google-site-verification" content="XXXXXXXXXXXXXXXXXXXXXX" />
```

**Método 3: DNS** (Se tiver acesso ao DNS)

Adicione TXT record fornecido pelo Google

---

### Passo 3: Enviar Sitemap

1. No Search Console, vá em: Sitemaps
2. Add new sitemap
3. URL: `sitemap.xml`
4. Submit

---

## 📈 MICROSOFT CLARITY (Recomendado - Heatmaps Gratuitos)

Clarity oferece gravações de sessão e heatmaps grátis. Complementa GA4.

### Passo 1: Criar Projeto

1. Acesse: https://clarity.microsoft.com/
2. Add new project
3. Name: "ORDRX Website"
4. URL: https://ordrx.ai

**Você receberá um código**

---

### Passo 2: Instalar

Adicione no `<head>` antes do fechamento `</head>`:

```html
<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "XXXXXXXXX");
</script>
```

**Benefícios**:

- Ver onde usuários clicam
- Gravações de sessão
- Heatmaps
- 100% gratuito
- Sem limite de visitas

---

## 📞 FACEBOOK PIXEL (Se usar Facebook Ads no futuro)

### Instalação

Adicione no `<head>`:

```html
<!-- Facebook Pixel -->
<script>
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  fbq("init", "YOUR_PIXEL_ID");
  fbq("track", "PageView");
</script>
<noscript
  ><img
    height="1"
    width="1"
    style="display:none"
    src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel -->
```

**Eventos importantes**:

```javascript
// Track Form Submit
fbq("track", "Lead");

// Track CTA Click
fbq("trackCustom", "CTAClick");
```

---

## 🎯 HOTJAR (Alternativa ao Clarity - Trial Gratuito)

### Instalação

```html
<!-- Hotjar Tracking Code -->
<script>
  (function (h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function () {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: XXXXXXX, hjsv: 6 };
    a = o.getElementsByTagName("head")[0];
    r = o.createElement("script");
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
</script>
```

---

## 📊 ESTRUTURA FINAL DO <head> COM TUDO

Ordem recomendada para adicionar scripts:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Basic Meta Tags -->
    <meta name="description" content="..." />
    <meta name="keywords" content="..." />
    <!-- ... outras meta tags ... -->

    <!-- Preload/DNS Prefetch -->
    <link rel="preload" as="image" href="images/mascote.png" />
    <link rel="preload" as="style" href="styles.css" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

    <!-- CSS -->
    <link rel="stylesheet" href="styles.css" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter..."
      rel="stylesheet"
    />

    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
      { ... }
    </script>

    <!-- Google Tag Manager (PRIMEIRO - mais importante) -->
    <script>
      (function(w,d,s,l,i){...})
    </script>

    <!-- OU Google Analytics 4 direto (se não usar GTM) -->
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-XXXXXXXXXX");
    </script>

    <!-- Microsoft Clarity -->
    <script type="text/javascript">
      (function(c,l,a,r,i,t,y){...})(window, document, "clarity", "script", "XXXXXXXXX");
    </script>

    <!-- Facebook Pixel (se usar) -->
    <script>
      !function(f,b,e,v,n,t,s){...}(window, document,'script',...);
    </script>

    <!-- Hotjar (se usar) -->
    <script>
      (function(h,o,t,j,a,r){...})(window,document,...);
    </script>
  </head>
  <body>
    <!-- GTM noscript (logo após <body>) -->
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe
    ></noscript>

    <!-- Resto do conteúdo -->
    ...
  </body>
</html>
```

---

## ⚙️ CONFIGURAÇÕES RECOMENDADAS NO GA4

### Eventos Personalizados a Criar

1. **cta_click**
   - Parâmetros: button_text, button_location
2. **form_submit**
   - Parâmetros: form_name
3. **scroll**
   - Parâmetros: depth
4. **article_view**
   - Parâmetros: article_title
5. **article_read**
   - Parâmetros: article_title

### Conversões a Marcar

No GA4, marque como "Conversões":

- `form_submit`
- `article_read`
- Qualquer evento que indique interesse real

---

## 📱 TESTE DEPOIS DE INSTALAR

### Google Analytics

1. Acesse: https://analytics.google.com/
2. Real-Time → Overview
3. Abra o site em outra aba
4. Você deve ver "1 active user"

### Google Tag Manager

1. Acesse GTM
2. Preview Mode
3. Abre o site
4. Verifica se tags disparam

### Clarity

1. Acesse dashboard Clarity
2. Aguarde 2-3 horas
3. Verifica se tem gravações

---

## 🚨 PROBLEMAS COMUNS

### GA4 não rastreia

**Soluções**:

- Verificar ID correto
- Desabilitar AdBlockers ao testar
- Aguardar 24-48h para dados aparecerem
- Verificar Console do navegador por erros

### GTM não dispara

**Soluções**:

- Verificar código instalado corretamente
- Usar Preview Mode para debug
- Verificar triggers configurados

### Scripts deixam site lento

**Soluções**:

- Usar GTM (carrega async)
- Adicionar `async` ou `defer` aos scripts
- Priorizar scripts críticos

---

## 📞 SUPORTE

Dúvidas sobre implementação?

- WhatsApp: +5521993813062
- Email: contato@ordrx.ai

---

**Versão**: 1.0  
**Última atualização**: 10/10/2025
