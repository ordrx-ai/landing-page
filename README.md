# 🚀 ORDRX Landing Page

Landing page com Jekyll para o ORDRX - Sistema de Automação de Pedidos para Restaurantes.

## 🎨 Design

- **Cores:** Fundo claro moderno com elementos coloridos
- **Inspiração:** Rocketseat, Goomer, design moderno
- **Responsivo:** Mobile-first design
- **Animações:** Smooth scroll, hover effects, counter animations

## 📁 Estrutura

```text
landing-page/
├── _config.yml              # Configuração do Jekyll
├── _includes/               # Componentes reutilizáveis
│   ├── header.html         # Cabeçalho
│   ├── footer.html         # Rodapé
│   ├── head.html           # Meta tags e SEO
│   └── gtm-noscript.html   # Google Tag Manager
├── _layouts/               # Templates
│   ├── default.html        # Layout padrão
│   └── post.html           # Layout de post do blog
├── _posts/                 # Posts do blog (Markdown)
│   └── YYYY-MM-DD-titulo.md
├── _site/                  # Site gerado (não commitar)
├── index.html              # Página principal
├── blog.html               # Página do blog
├── styles.css              # Estilos CSS
├── script.js               # JavaScript
├── images/                 # Imagens
├── Gemfile                 # Dependências Ruby
└── README.md               # Este arquivo
```

## ✨ Funcionalidades

### Landing Page

1. **Hero** - Título impactante com estatísticas
2. **Features** - Funcionalidades principais
3. **Benefits** - Benefícios do ORDRX
4. **Segments** - Tipos de estabelecimentos
5. **FAQ** - Perguntas frequentes (accordion)
6. **About** - Sobre a empresa e equipe
7. **Contact** - Formulário de contato

### Blog Sistema

- Sistema completo de blog com Jekyll
- Posts em Markdown
- SEO otimizado com Jekyll SEO Tag
- Feed RSS automático
- Sitemap XML
- URLs amigáveis

### Formulário de Contato

Coleta:

- Nome completo
- Telefone (com máscara automática)
- Tipo de estabelecimento
- Número de mesas
- Cidade
- Mensagem (opcional)

**Envio:** E-mail para `ordrx.ai@gmail.com` via FormSubmit.co

## 🚀 Como Rodar Localmente

### Pré-requisitos

1. **Ruby** (versão 2.7 ou superior)
2. **Bundler** (gerenciador de gems do Ruby)

### Instalação

```bash
# 1. Instalar dependências
bundle install

# 2. Rodar servidor local
bundle exec jekyll serve

# 3. Acessar no navegador
# http://localhost:4000
```

### Comandos Úteis

```bash
# Rodar com live reload
bundle exec jekyll serve --livereload

# Rodar em modo incremental (build mais rápido)
bundle exec jekyll serve --incremental

# Limpar arquivos gerados
bundle exec jekyll clean

# Build para produção
bundle exec jekyll build
```

### Problemas Comuns

Se tiver erro de permissão ou gems não instaladas:

```bash
# Reinstalar dependências
bundle install --path vendor/bundle

# Atualizar gems
bundle update

# Se tiver erro de webrick (Ruby 3.0+)
bundle add webrick
```

## ✍️ Como Criar um Novo Post

### Método 1: Manual (Recomendado)

1. **Crie um arquivo na pasta `_posts/`** com o formato:

   ```text
   YYYY-MM-DD-titulo-do-post.md
   ```

   Exemplo: `2024-10-15-como-aumentar-vendas-restaurante.md`

2. **Adicione o Front Matter no início do arquivo:**

   ```markdown
   ---
   layout: post
   title: "Como Aumentar as Vendas do seu Restaurante em 40%"
   date: 2024-10-15 10:00:00 -0300
   author: ORDRX Team
   categories: [restaurante, vendas, dicas]
   tags: [vendas, gestão, automação]
   excerpt: "Descubra estratégias comprovadas para aumentar as vendas do seu restaurante usando tecnologia e automação inteligente."
   image: /images/blog/aumentar-vendas.jpg
   ---

   Conteúdo do post aqui em Markdown...

   ## Subtítulo

   Parágrafo com **negrito** e _itálico_.

   - Lista
   - De
   - Itens
   ```

3. **Escreva o conteúdo** usando Markdown

4. **Salve e visualize:**

   ```bash
   bundle exec jekyll serve --livereload
   # Acesse: http://localhost:4000/blog/
   ```

### Campos do Front Matter

- `layout:` - Use `post` para posts do blog
- `title:` - Título do post (obrigatório)
- `date:` - Data e hora da publicação (YYYY-MM-DD HH:MM:SS -0300)
- `author:` - Nome do autor
- `categories:` - Categorias (array)
- `tags:` - Tags para SEO (array)
- `excerpt:` - Resumo/descrição para SEO e preview
- `image:` - Imagem de destaque (opcional)

### Exemplo Completo

```markdown
---
layout: post
title: "5 Erros Fatais ao Gerenciar um Restaurante"
date: 2024-10-20 14:30:00 -0300
author: Pablo Ungaro
categories: [gestão, restaurante]
tags: [gestão, erros-comuns, dicas, produtividade]
excerpt: "Evite estes 5 erros que podem comprometer o sucesso do seu restaurante. Aprenda com quem já passou por isso."
image: /images/blog/erros-restaurante.jpg
---

A gestão de um restaurante é desafiadora, e pequenos erros podem custar caro...

## 1. Não Ter Controle de Estoque

O primeiro erro fatal é...

## 2. Ignorar Métricas e KPIs

...
```

### Dicas de Escrita

1. **URLs Amigáveis**: O nome do arquivo vira a URL

   - `2024-10-15-cardapio-digital.md` → `/blog/2024/10/15/cardapio-digital/`

2. **Imagens**: Coloque na pasta `/images/blog/`

   ```markdown
   ![Alt text](/images/blog/minha-imagem.jpg)
   ```

3. **Links Internos**:

   ```markdown
   [Outro post]({% post_url 2024-10-10-cardapio-digital-qr-code-vantagens %})
   ```

4. **Excerpt**: Use `<!--more-->` no post para marcar onde cortar o preview:

   ```markdown
   Intro do post que aparece no preview...

   <!--more-->

   Resto do conteúdo...
   ```

## 🌐 Deploy e Produção

### Deploy Rápido

Use o script automatizado:

```bash
./deploy.sh
```

Este script vai:

- Verificar arquivos modificados
- Fazer commit e push
- Orientar sobre próximos passos

### Deploy Manual

```bash
# 1. Fazer commit
git add .
git commit -m "Update landing page"

# 2. Push para GitHub
git push origin main

# 3. GitHub Pages vai fazer o deploy automaticamente
# Aguarde 2-5 minutos
```

### GitHub Pages (Configurado ✅)

O site está configurado para deploy automático via GitHub Pages:

- **Source:** `main` branch, `/ (root)`
- **Domínio:** `ordrx.ai` (via arquivo CNAME)
- **HTTPS:** Habilitado
- **Build:** Jekyll (automático)

### Domínio Customizado (ordrx.ai)

✅ **Já configurado!** Mas se precisar reconfigurar:

1. **DNS GoDaddy:** Veja [DNS-GODADDY-ORDRX-AI.txt](./DNS-GODADDY-ORDRX-AI.txt)
2. **Arquivo CNAME:** Já existe com `ordrx.ai`
3. **Propagação:** 10-30 minutos
4. **HTTPS:** Ativado automaticamente

📚 **Guia completo:** [CONFIGURACAO-DOMINIO.md](./CONFIGURACAO-DOMINIO.md)

## 📝 Customização

### Configuração do Site (\_config.yml)

Edite as configurações principais em `_config.yml`:

```yaml
title: ORDRX
url: https://ordrx.ai
description: Sistema completo de cardápio digital...
timezone: America/Sao_Paulo
lang: pt-BR
```

### Cores e Estilos

Edite as variáveis CSS em `styles.css`:

```css
:root {
  --primary-color: #6c5ce7;
  --secondary-color: #ff6b9d;
  /* ... personalize aqui */
}
```

### Conteúdo da Landing Page

Edite diretamente em `index.html`:

- Seções Hero, Features, Benefits
- FAQ, About, Contact

### Cabeçalho e Rodapé

Edite os componentes reutilizáveis:

- `_includes/header.html` - Menu de navegação
- `_includes/footer.html` - Rodapé com links
- `_includes/head.html` - Meta tags e SEO

### E-mail de Contato

Altere o destino do formulário em `script.js`:

```javascript
const response = await fetch('https://formsubmit.co/ajax/SEU-EMAIL@example.com', {
```

### SEO e Meta Tags

Configure em `_includes/head.html`:

- Open Graph tags
- Twitter Cards
- Google Analytics / Tag Manager
- Structured Data (Schema.org)

## 🎯 SEO e Analytics

### SEO Otimizado

✅ **Já configurado:**

- Jekyll SEO Tag (meta tags automáticas)
- Sitemap XML (`/sitemap.xml`)
- Feed RSS (`/feed.xml`)
- Robots.txt
- Schema.org structured data
- Open Graph e Twitter Cards

### Google Analytics & Tag Manager

Configurado em `_includes/head.html` e `_includes/gtm-noscript.html`:

- Google Tag Manager (GTM)
- Google Analytics 4
- Conversion tracking

### Performance

- Jekyll build otimizado
- CSS minificado
- Lazy loading de imagens
- Compressão de assets

## 🔧 Tecnologias

### Frontend

- HTML5 (semântico)
- CSS3 (Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
- Google Fonts (Inter)

### Gerador Estático

- Jekyll 3.9+
- Liquid templates
- Markdown para posts
- GitHub Pages

### Plugins Jekyll

- jekyll-seo-tag (SEO automático)
- jekyll-feed (RSS feed)
- jekyll-sitemap (sitemap XML)

### Serviços Externos

- FormSubmit.co (formulário)
- Google Tag Manager (analytics)
- GoDaddy (DNS e domínio)

## 📱 Responsividade

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

Teste em múltiplos dispositivos antes de fazer deploy.

## 📚 Documentação Adicional

### Guias de Setup

- **[COMECE-AQUI.md](./COMECE-AQUI.md)** - Deploy rápido em 3 passos
- **[INICIO-RAPIDO.md](./INICIO-RAPIDO.md)** - Guia de 30 minutos
- **[CONFIGURACAO-DOMINIO.md](./CONFIGURACAO-DOMINIO.md)** - Setup completo de domínio

### Guias Técnicos

- **[JEKYLL-MIGRATION-GUIDE.md](./JEKYLL-MIGRATION-GUIDE.md)** - Migração para Jekyll
- **[BLOG-SYSTEM-GUIDE.md](./BLOG-SYSTEM-GUIDE.md)** - Sistema de blog completo
- **[REINICIAR-JEKYLL.md](./REINICIAR-JEKYLL.md)** - Troubleshooting Jekyll

### SEO e Marketing

- **[ACOES-EXTERNAS-SEO.md](./ACOES-EXTERNAS-SEO.md)** - Ações de SEO externo
- **[README-SEO.md](./README-SEO.md)** - Guia de SEO
- **[TEMPLATES-ANALYTICS.md](./TEMPLATES-ANALYTICS.md)** - Analytics e tracking

### Resumos Executivos

- **[RESUMO-DEPLOY.md](./RESUMO-DEPLOY.md)** - Resumo de deploy
- **[MIGRATION-SUMMARY.txt](./MIGRATION-SUMMARY.txt)** - Sumário da migração
- **[DNS-GODADDY-ORDRX-AI.txt](./DNS-GODADDY-ORDRX-AI.txt)** - Registros DNS

## 🎨 Branding

### Logo

- 3 variações SVG disponíveis em `/images/`
  - `mascote.png` - Logo principal (mascote)
  - `logo-b.svg` - Alternativo
  - `logo-c.svg` - Simplificado
- Favicon em `logo.png` (mesma imagem do logo)

### Slogan

> **"Revolucione seu Restaurante com Automação Inteligente"**

### Imagens

- Open Graph: `/images/mascote2.png`
- Equipe: `/images/team/*.jpg`

## 🔍 Estrutura de URLs

```text
Landing Page:
https://ordrx.ai/                    # Home

Blog:
https://ordrx.ai/blog/               # Lista de posts
https://ordrx.ai/blog/YYYY/MM/DD/titulo/  # Post individual

Feeds:
https://ordrx.ai/sitemap.xml         # Sitemap
https://ordrx.ai/feed.xml            # RSS Feed
https://ordrx.ai/robots.txt          # Robots
```

## 🐛 Troubleshooting

### Jekyll não inicia

```bash
bundle install
bundle exec jekyll clean
bundle exec jekyll serve
```

### Erro "cannot load such file -- webrick"

```bash
bundle add webrick
```

### Changes not appearing

```bash
# Hard refresh no navegador
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Ou limpe o cache do Jekyll
bundle exec jekyll clean
bundle exec jekyll serve --livereload
```

### Post não aparece no blog

Verifique:

1. Nome do arquivo: `YYYY-MM-DD-titulo.md` ✅
2. Front matter correto com `layout: post` ✅
3. Data não está no futuro ✅
4. Arquivo está em `_posts/` ✅

### Deploy no GitHub Pages não funciona

1. Verifique em Settings → Pages se está ativo
2. Veja Actions tab para erros de build
3. Aguarde 2-5 minutos após push
4. Verifique arquivo `_config.yml`

## 📞 Contato e Suporte

- **E-mail:** <ordrx.ai@gmail.com>
- **Site:** <https://ordrx.ai>
- **Documentação:** Veja seção "Documentação Adicional" acima

## 🎯 Quick Start

```bash
# Clone e instale
git clone [repo-url]
cd landing-page
bundle install

# Rode localmente
bundle exec jekyll serve --livereload

# Crie um post
# 1. Crie arquivo em _posts/2024-10-15-meu-post.md
# 2. Adicione front matter (veja seção "Como Criar um Novo Post")
# 3. Escreva em Markdown
# 4. Salve e veja em http://localhost:4000/blog/

# Deploy
./deploy.sh
```

---

**Desenvolvido por:** ORDRX Team  
**Site:** <https://ordrx.ai>  
**Data:** Outubro 2025  
**Versão:** 2.0 (Jekyll + Blog)
