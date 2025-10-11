# 🔄 REINICIE O JEKYLL AGORA!

## ✅ Correções Aplicadas

1. ✅ Data do post corrigida: `2025-10-10` → `2024-10-10`
2. ✅ Arquivo renomeado: `2024-10-10-cardapio-digital-qr-code-vantagens.md`
3. ✅ Estrutura pronta para listar posts

---

## 🚀 AÇÃO NECESSÁRIA

### **1. Pare o Jekyll**

No terminal onde o Jekyll está rodando, pressione:

```
Ctrl + C
```

### **2. Reinicie o Jekyll**

Execute:

```bash
cd /Users/pabloungaro/dev/prj/ordrx-prj/landing-page
bundle exec jekyll serve --livereload
```

### **3. Aguarde o build**

Você deve ver algo como:

```
Configuration file: /Users/.../landing-page/_config.yml
            Source: /Users/.../landing-page
       Destination: /Users/.../landing-page/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in 0.6 seconds.
 Auto-regeneration: enabled for '/Users/.../landing-page'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```

---

## ✅ O Que Deve Funcionar Agora

### **1. Blog lista o post**

Acesse: `http://127.0.0.1:4000/blog/`

**Deve mostrar:**

- 📝 Card com o post
- 🏷️ Categoria "Tecnologia"
- 📅 Data "10/10/2024"
- ⏱️ "10 min de leitura"
- 🏷️ Tags: cardápio digital, QR Code, automação, restaurantes, tecnologia

### **2. Post abre corretamente**

Clique no card ou acesse: `http://127.0.0.1:4000/blog/2024/10/10/cardapio-digital-qr-code-vantagens/`

**Deve mostrar:**

- ✅ Artigo completo formatado
- ✅ Header e footer
- ✅ Navegação (próximo/anterior) - aparecerá quando houver mais posts
- ✅ CTA "Candidate-se ao Beta"
- ✅ Link "Voltar para o Blog"

### **3. Feed RSS funciona**

Acesse: `http://127.0.0.1:4000/feed.xml`

**Deve conter:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  ...
  <entry>
    <title>10 Vantagens do Cardápio Digital com QR Code para Restaurantes</title>
    <link href="http://localhost:4000/blog/2024/10/10/cardapio-digital-qr-code-vantagens/"/>
    <published>2024-10-10T00:00:00-03:00</published>
    ...
  </entry>
</feed>
```

---

## 🔍 Verificação Passo a Passo

Execute estes testes:

- [ ] **1. Blog lista posts**

  - URL: `http://127.0.0.1:4000/blog/`
  - Esperado: Ver 1 card com o post

- [ ] **2. Post abre**

  - Clique no card do post
  - Esperado: Ver artigo completo

- [ ] **3. Feed tem post**

  - URL: `http://127.0.0.1:4000/feed.xml`
  - Esperado: Ver `<entry>` com o post

- [ ] **4. Structured data**
  - Inspecione o HTML do post (F12)
  - Esperado: Ver `<script type="application/ld+json">` com Article

---

## 🐛 Se Não Funcionar

### **Cenário A: Post ainda não aparece**

1. Limpe o cache do Jekyll:

   ```bash
   bundle exec jekyll clean
   bundle exec jekyll serve
   ```

2. Verifique o arquivo:
   ```bash
   cat _posts/2024-10-10-cardapio-digital-qr-code-vantagens.md | head -10
   ```
   Deve mostrar:
   ```yaml
   ---
   layout: post
   title: "10 Vantagens..."
   date: 2024-10-10
   ---
   ```

### **Cenário B: Erro ao buildar**

Se aparecer erro no terminal:

1. Verifique o front matter (deve ter `---` no início e fim)
2. Verifique sintaxe YAML (indentação correta)
3. Olhe a mensagem de erro específica

### **Cenário C: Feed vazio**

1. Aguarde o build completo
2. Recarregue a página (F5)
3. Limpe cache do navegador (Ctrl + Shift + R)

---

## 📝 Console do Jekyll

**Sucesso:**

```
Generating...
       Jekyll Feed: Generating feed for posts
                    done in 0.6 seconds.
```

**Falha:**

```
Error: ...
```

Se ver erro, copie e cole a mensagem para debug.

---

## 🎯 Depois de Funcionar

### **1. Criar mais posts:**

```bash
# Exemplo
echo "---
layout: post
title: 'Como Reduzir Custos em Restaurantes'
description: 'Estratégias práticas...'
date: 2024-10-11
category: 'Gestão'
tags: [gestão, custos, economia]
---

Conteúdo aqui..." > _posts/2024-10-11-como-reduzir-custos.md
```

### **2. Fazer commit:**

```bash
git add _posts/
git commit -m "Fix: Update post date to 2024-10-10 to make it visible"
git push
```

### **3. Verificar no GitHub Pages:**

Após 2-3 minutos:

- `https://ordrx.ai/blog/`
- `https://ordrx.ai/feed.xml`

---

## 💡 Dica

Use `--future` para ver posts futuros durante desenvolvimento:

```bash
bundle exec jekyll serve --livereload --future
```

Mas lembre-se: **no GitHub Pages, posts futuros não são publicados!**

---

**Status:** ✅ Pronto para reiniciar  
**Próxima ação:** Ctrl + C → bundle exec jekyll serve

**REINICIE AGORA!** 🚀
