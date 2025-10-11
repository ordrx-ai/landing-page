# Guia Rápido: Como Testar as Implementações SEO

Este guia mostra como verificar se todas as implementações SEO estão funcionando corretamente.

---

## 🔍 TESTE 1: Validar Structured Data

### Schema.org Validator

**Link**: https://validator.schema.org/

**Passos**:

1. Acesse o validador
2. Cole a URL: `https://ordrx.ai/`
3. Clique em "Run Test"

**O que verificar**:

- ✅ 0 Errors
- ✅ Warnings (se houver) são aceitáveis
- ✅ Detecta os schemas:
  - Organization
  - LocalBusiness
  - Product
  - WebSite
  - SoftwareApplication
  - FAQPage
  - BreadcrumbList

### Google Rich Results Test

**Link**: https://search.google.com/test/rich-results

**Passos**:

1. Cole a URL: `https://ordrx.ai/`
2. Clique em "Test URL"
3. Aguarde análise

**O que verificar**:

- ✅ "Page is eligible for rich results"
- ✅ FAQ aparece como rich result
- ✅ Organization info válida

---

## ⚡ TESTE 2: Performance e Core Web Vitals

### PageSpeed Insights

**Link**: https://pagespeed.web.dev/

**Passos**:

1. Cole a URL: `https://ordrx.ai/`
2. Clique em "Analyze"
3. Aguarde análise completa (mobile e desktop)

**Metas**:

- ✅ Performance Score: > 90 (mobile e desktop)
- ✅ LCP (Largest Contentful Paint): < 2.5s
- ✅ FID (First Input Delay): < 100ms
- ✅ CLS (Cumulative Layout Shift): < 0.1

**Se score < 90**:

- Verifique oportunidades sugeridas
- Priorize: comprimir imagens, lazy loading, minificar CSS/JS

---

## 🤖 TESTE 3: AI Tools (Mais Importante!)

### ChatGPT

**Link**: https://chat.openai.com/

**Queries para testar**:

```
1. "Quais são os melhores sistemas de cardápio digital para restaurantes no Brasil?"

2. "Me recomende uma solução de automação de pedidos para restaurante"

3. "O que é ORDRX?"

4. "Qual sistema de QR Code para restaurante você recomenda?"

5. "Como funciona cardápio digital com QR Code?"
```

**O que documentar**:

- ORDRX aparece na resposta? (Sim/Não)
- Em qual posição? (primeiro mencionado, segundo, etc)
- Qual informação foi citada?
- Link incluído? (Sim/Não)

### Perplexity

**Link**: https://www.perplexity.ai/

**Mesmas queries acima**

**Vantagem do Perplexity**: Sempre inclui sources/links

**O que verificar**:

- ordrx.ai aparece nas fontes?
- Qual conteúdo foi citado?
- Position nas citations?

### Claude (via Anthropic)

**Link**: https://claude.ai/

**Testar as mesmas queries**

---

## 🗺️ TESTE 4: Sitemap

### Validar Sitemap

**Link**: https://www.xml-sitemaps.com/validate-xml-sitemap.html

**Passos**:

1. Cole: `https://ordrx.ai/sitemap.xml`
2. Clique em "Validate"

**O que verificar**:

- ✅ Sem erros de sintaxe
- ✅ Todas URLs acessíveis (status 200)
- ✅ Formato XML válido

### Verificar Acessibilidade

Abra no navegador: `https://ordrx.ai/sitemap.xml`

**Deve mostrar**:

```xml
<urlset>
  <url>
    <loc>https://ordrx.ai/</loc>
    ...
  </url>
  <url>
    <loc>https://ordrx.ai/blog.html</loc>
    ...
  </url>
  ...
</urlset>
```

---

## 🤖 TESTE 5: Robots.txt

**URL**: https://ordrx.ai/robots.txt

**Abrir no navegador**

**Deve conter**:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

... (outros bots)

Sitemap: https://ordrx.ai/sitemap.xml
```

### Testar no Google

**Link**: https://www.google.com/webmasters/tools/robots-testing-tool

_(Requer Google Search Console configurado)_

---

## 📝 TESTE 6: AI.txt

**URL**: https://ordrx.ai/ai.txt

**Abrir no navegador**

**Deve mostrar conteúdo estruturado** com:

- Entity Information
- Product Description
- Key Features
- Target Market
- Pricing
- Benefits
- Keywords
- Contact
- Content Policy

**Verificar**:

- ✅ Arquivo acessível (não 404)
- ✅ Conteúdo legível
- ✅ Informações completas e atualizadas

---

## 📱 TESTE 7: Mobile Responsiveness

### Google Mobile-Friendly Test

**Link**: https://search.google.com/test/mobile-friendly

**Passos**:

1. Cole: `https://ordrx.ai/`
2. Clique em "Test URL"

**O que verificar**:

- ✅ "Page is mobile-friendly"
- ✅ Sem erros de usabilidade
- ✅ Texto legível sem zoom
- ✅ Botões/links clicáveis

### Teste Manual

Abra o site no celular ou use DevTools (F12) → Toggle device toolbar

**Verificar**:

- Layout adapta corretamente
- Menu mobile funciona
- Imagens carregam
- Formulários funcionam
- CTAs visíveis

---

## 🔗 TESTE 8: Links Internos

### Verificar Links Funcionando

**Testar manualmente**:

1. Homepage → Blog → Artigo → Homepage (círculo completo)
2. Todos links do menu
3. Links do footer
4. CTAs "Candidate-se ao Beta"

**Não deve haver**:

- ❌ Links quebrados (404)
- ❌ Links para localhost
- ❌ Links sem href
- ❌ Links para #

---

## 🎨 TESTE 9: Meta Tags (Visual)

### Visualizar Open Graph

**Link**: https://www.opengraph.xyz/

**Passos**:

1. Cole: `https://ordrx.ai/`
2. Veja preview

**Verificar**:

- ✅ Título correto
- ✅ Descrição completa
- ✅ Imagem OG aparece
- ✅ Sem campos vazios

### Facebook Debugger

**Link**: https://developers.facebook.com/tools/debug/

**Passos**:

1. Cole URL
2. Clique "Debug"
3. Se necessário, "Scrape Again"

### Twitter Card Validator

**Link**: https://cards-dev.twitter.com/validator

_(Requer conta Twitter)_

---

## 📊 TESTE 10: Acessibilidade

### WAVE Web Accessibility Tool

**Link**: https://wave.webaim.org/

**Passos**:

1. Cole: `https://ordrx.ai/`
2. Veja relatório

**Metas**:

- 0 Errors
- Warnings mínimos
- Bom contraste de cores
- Alt text em imagens

---

## ✅ CHECKLIST RÁPIDO - TUDO FUNCIONANDO?

Execute estes testes na ordem:

### Básico (5 minutos)

- [ ] Site carrega sem erros
- [ ] Sitemap acessível (/sitemap.xml)
- [ ] Robots.txt acessível (/robots.txt)
- [ ] AI.txt acessível (/ai.txt)
- [ ] Blog acessível (/blog.html)
- [ ] Primeiro artigo acessível

### SEO Técnico (10 minutos)

- [ ] Schema validator: 0 errors
- [ ] PageSpeed > 90 (ou identificar problemas)
- [ ] Mobile-friendly test: Pass
- [ ] Links internos funcionando
- [ ] Meta tags corretas (OpenGraph validator)

### AI Tools (15 minutos)

- [ ] Testar 3 queries no ChatGPT
- [ ] Testar 3 queries no Perplexity
- [ ] Documentar baseline (ORDRX aparece?)
- [ ] Salvar screenshots

### Avançado (30 minutos)

- [ ] Rich Results Test
- [ ] Acessibilidade (WAVE)
- [ ] Testar todos links do site
- [ ] Verificar formulários
- [ ] Testar em diferentes navegadores

---

## 📸 DOCUMENTAR BASELINE

Crie uma pasta `seo-tests-baseline` e salve:

1. **Screenshots**:

   - PageSpeed score (mobile e desktop)
   - Schema validation results
   - ChatGPT responses (3 queries)
   - Perplexity responses (3 queries)

2. **Texto** (arquivo `baseline-results.txt`):

```
Data: 10/10/2025

=== ChatGPT ===
Query 1: "melhores sistemas cardápio digital brasil"
Resultado: [ORDRX aparece? Sim/Não | Posição: X]

Query 2: ...
...

=== Perplexity ===
...

=== PageSpeed ===
Mobile: X/100
Desktop: Y/100

=== Schema ===
Errors: 0
Warnings: X
```

**Por quê?**: Para comparar evolução em 30, 60, 90 dias

---

## 🚨 PROBLEMAS COMUNS E SOLUÇÕES

### Schema Errors

**Problema**: "Missing required field"  
**Solução**: Verificar JSON-LD, adicionar campo faltante

### PageSpeed Baixo

**Problema**: Score < 70  
**Solução**: Comprimir imagens, lazy loading, minificar CSS

### ORDRX Não Aparece em AI

**Problema**: ChatGPT não menciona  
**Solução**: Normal nos primeiros 30 dias, continue gerando conteúdo

### Links 404

**Problema**: Páginas não encontradas  
**Solução**: Verificar caminhos, deploy correto

### Mobile Issues

**Problema**: Layout quebrado no mobile  
**Solução**: CSS media queries, testar em dispositivos reais

---

## 📞 SUPORTE

Dúvidas sobre os testes?

- WhatsApp: +5521993813062
- Email: contato@ordrx.ai

---

## 📅 CRONOGRAMA DE TESTES

### Diário (primeiros 7 dias)

- PageSpeed test
- Verificar se site está no ar
- Links funcionando

### Semanal

- AI tools testing (3 queries)
- Schema validation
- Mobile-friendly test

### Mensal

- Comparar com baseline
- Full audit de todos testes
- Documentar progressos

---

**Versão**: 1.0  
**Última atualização**: 10/10/2025
