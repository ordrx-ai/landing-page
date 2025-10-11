# 🎉 Migração para Jekyll Concluída!

## O que foi feito?

Seu site foi migrado para Jekyll, permitindo que você use **templates reutilizáveis**. Agora você pode adicionar o GTM, GA4 e outros scripts em **um único lugar** e todas as páginas herdarão automaticamente!

---

## 📁 Nova Estrutura

```
landing-page/
├── _config.yml                    ← Configurações Jekyll
├── _layouts/
│   └── default.html               ← Template base (header + footer + scripts)
├── _includes/
│   ├── head.html                  ← <head> com GTM/GA4 (EDITE AQUI!)
│   ├── gtm-noscript.html          ← GTM noscript
│   ├── header.html                ← Navegação
│   └── footer.html                ← Rodapé
├── index.html                     ← Agora usa o layout Jekyll
├── blog.html                      ← (ainda não convertido)
├── blog/
│   └── cardapio-digital-qr-code-vantagens.html  ← (ainda não convertido)
├── Gemfile                        ← Dependências Jekyll
├── .gitignore                     ← Atualizado para Jekyll
└── index.html.backup              ← Backup do arquivo original
```

---

## ✨ Vantagens

### 1. **GTM/GA4 em um só lugar!**

Antes você precisava adicionar o código do GTM em:

- ✗ index.html
- ✗ blog.html
- ✗ cada artigo do blog
- ✗ todas as páginas futuras

**Agora:** Edite apenas `_includes/head.html` e **TODAS as páginas** herdam automaticamente! 🎯

### 2. **Header e Footer reutilizáveis**

Se precisar mudar o menu, rodapé ou adicionar um link:

- Edite `_includes/header.html` ou `_includes/footer.html`
- **Todas as páginas** atualizam automaticamente

### 3. **GitHub Pages nativo**

- ✅ Zero configuração extra
- ✅ Deploy automático no push
- ✅ Funciona do mesmo jeito que antes

---

## 🎯 Como usar

### Para adicionar GTM/GA4:

1. Abra `_includes/head.html`
2. Encontre a seção `<!-- Google Tag Manager -->`
3. Substitua `GTM-K5DNVRQQ` pelo seu ID real
4. Substitua `G-5PQJWWZ7RZ` pelo seu ID real do GA4
5. Salve e faça push

**Pronto!** Todas as páginas (index, blog, artigos) terão o GTM/GA4 automaticamente.

### Para criar uma nova página:

Crie um arquivo `nova-pagina.html` com:

```html
---
layout: default
title: Título da Página
description: Descrição para SEO
---

<section>
  <!-- Seu conteúdo aqui -->
  <h1>Minha Nova Página</h1>
  <p>Conteúdo...</p>
</section>
```

**Automático:** Header, footer, GTM, GA4, tudo incluído!

---

## 🚀 Próximos Passos

### 1. Instalar Jekyll localmente (opcional, para testar)

```bash
# Instalar Ruby (se não tiver)
# No Mac, já vem instalado

# Navegar para a pasta
cd landing-page

# Instalar dependências
bundle install

# Rodar localmente
bundle exec jekyll serve

# Acessar: http://localhost:4000
```

### 2. Adicionar seu ID do GTM e GA4

Edite `_includes/head.html` e substitua os IDs de exemplo pelos reais.

### 3. Fazer push

```bash
git add .
git commit -m "Migração para Jekyll - templates reutilizáveis"
git push
```

**GitHub Pages vai detectar Jekyll automaticamente e gerar o site!**

---

## ⚠️ Importante

### Arquivos ainda não convertidos:

- `blog.html` - ainda HTML puro
- `blog/cardapio-digital-qr-code-vantagens.html` - ainda HTML puro

Esses arquivos precisam ser convertidos para usar o layout Jekyll. Quando converter:

**De:**

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- todo o head aqui -->
  </head>
  <body>
    <!-- conteúdo -->
  </body>
</html>
```

**Para:**

```html
---
layout: default
title: Título da Página
---

<!-- apenas o conteúdo -->
```

---

## 🔧 Como funciona?

### O arquivo `index.html`:

```html
---
layout: default
title: ORDRX - Automação Inteligente para Restaurantes
---

<section class="hero">
  <!-- Conteúdo -->
</section>
```

### Jekyll transforma em:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <!-- Conteúdo de _includes/head.html (com GTM/GA4) -->
  </head>
  <body>
    <!-- Conteúdo de _includes/gtm-noscript.html -->
    <!-- Conteúdo de _includes/header.html -->

    <!-- SEU CONTEÚDO AQUI (da section.hero) -->

    <!-- Conteúdo de _includes/footer.html -->
    <script src="/script.js"></script>
  </body>
</html>
```

**Mágico, né?** 🪄

---

## 📝 Front Matter (cabeçalho YAML)

O bloco entre `---` no topo dos arquivos é chamado "Front Matter":

```yaml
---
layout: default # Qual layout usar
title: Título da Página # Título (usado no <title>)
description: Descrição SEO # Meta description
keywords: palavra, chave # Meta keywords
canonical: https://... # URL canônica
structured_data: | # Schema.org (structured data)
  <script type="application/ld+json">
  { ... }
  </script>
---
```

Jekyll usa essas variáveis para preencher os templates automaticamente!

---

## 🆘 Troubleshooting

### Site não está carregando no GitHub Pages?

1. Verifique se `_config.yml` existe
2. Aguarde 2-3 minutos após o push
3. Veja o status no GitHub: Settings → Pages

### Jekyll não encontra arquivos CSS/JS?

Use caminhos absolutos: `/styles.css` (com barra inicial)

### Quer voltar ao HTML puro?

```bash
cp index.html.backup index.html
git add index.html
git commit -m "Reverter para HTML puro"
git push
```

---

## 🎓 Documentação

- **Jekyll**: https://jekyllrb.com/docs/
- **GitHub Pages + Jekyll**: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll
- **Liquid (template engine)**: https://shopify.github.io/liquid/

---

## ✅ Checklist

- [x] Estrutura Jekyll criada (\_layouts, \_includes)
- [x] Template base (\_layouts/default.html)
- [x] Head com GTM/GA4 (\_includes/head.html)
- [x] Header e Footer extraídos
- [x] index.html convertido
- [x] \_config.yml configurado
- [x] Gemfile criado
- [x] .gitignore atualizado
- [ ] blog.html converter
- [ ] Artigos do blog converter
- [ ] Adicionar IDs reais do GTM/GA4
- [ ] Testar localmente
- [ ] Fazer deploy

---

**Dúvidas?** Consulte este guia ou a documentação do Jekyll!

**Versão:** 1.0  
**Data:** 11/10/2025  
**Autor:** Migração automatizada via IA

