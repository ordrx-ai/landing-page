# ✅ Correção Aplicada: Post Agora Visível!

## 🔧 O Que Foi Corrigido

### **Problema Identificado:**

O post não aparecia no blog porque a data estava no futuro (`2025-10-10`). O Jekyll, por padrão, **não publica posts com datas futuras** em modo local.

### **Solução Aplicada:**

1. ✅ **Data do post corrigida**: `2025-10-10` → `2024-10-10`
2. ✅ **Arquivo renomeado**:
   - De: `2025-10-10-cardapio-digital-qr-code-vantagens.md`
   - Para: `2024-10-10-cardapio-digital-qr-code-vantagens.md`

---

## 🚀 Como Ver o Post Agora

### **1. Pare o Jekyll** (se ainda estiver rodando):

```bash
# Pressione Ctrl + C no terminal onde está rodando
```

### **2. Reinicie o Jekyll**:

```bash
cd /Users/pabloungaro/dev/prj/ordrx-prj/landing-page
bundle exec jekyll serve --livereload
```

### **3. Acesse no navegador**:

✅ **Lista de posts (blog):**

```
http://127.0.0.1:4000/blog/
```

✅ **Post específico:**

```
http://127.0.0.1:4000/blog/2024/10/10/cardapio-digital-qr-code-vantagens/
```

✅ **Feed RSS (com o post):**

```
http://127.0.0.1:4000/feed.xml
```

---

## 📝 O Que Você Deve Ver

### **No Blog (`/blog/`):**

Deve aparecer um card com:

- 📝 Ícone do post
- 🏷️ Categoria: "Tecnologia"
- 📅 Data: "10/10/2024"
- ⏱️ Tempo de leitura: "10 min"
- 📰 Título: "10 Vantagens do Cardápio Digital com QR Code para Restaurantes"
- 📝 Descrição
- 🏷️ Tags

### **No Feed (`/feed.xml`):**

O XML deve conter:

```xml
<entry>
  <title>10 Vantagens do Cardápio Digital com QR Code para Restaurantes</title>
  <link href="http://localhost:4000/blog/2024/10/10/cardapio-digital-qr-code-vantagens/"/>
  <published>2024-10-10T00:00:00-03:00</published>
  ...
</entry>
```

---

## 🎯 Sobre Datas Futuras

### **Comportamento do Jekyll:**

| Ambiente                    | Datas Futuras             |
| --------------------------- | ------------------------- |
| **Local** (`jekyll serve`)  | ❌ Não publica por padrão |
| **Produção** (GitHub Pages) | ❌ Não publica            |

### **Para publicar posts com datas futuras localmente:**

Use a flag `--future`:

```bash
bundle exec jekyll serve --future
```

Mas **não recomendado** para produção, pois pode confundir leitores.

---

## 📅 Convenção de Datas Recomendada

### **Para Posts Novos:**

Use a **data atual** ou **data passada**:

```markdown
---
date: 2024-10-11 # Hoje
---
```

ou

```markdown
---
date: 2024-10-10 # Ontem
---
```

### **Formato do Nome do Arquivo:**

Sempre use: `YYYY-MM-DD-titulo-do-post.md`

**Exemplos:**

- ✅ `2024-10-11-novo-post.md`
- ✅ `2024-10-10-outro-post.md`
- ❌ `2025-10-10-futuro.md` (não vai aparecer!)

---

## ✅ Checklist de Verificação

Após reiniciar o Jekyll:

- [ ] Blog lista o post em `/blog/`
- [ ] Post abre corretamente ao clicar
- [ ] URL do post: `/blog/2024/10/10/cardapio-digital-qr-code-vantagens/`
- [ ] Feed.xml contém o post
- [ ] Navegação (próximo/anterior) funciona
- [ ] Tags aparecem no post
- [ ] Categoria aparece no post
- [ ] CTA "Candidate-se ao Beta" funciona

---

## 🔄 Próximos Passos

### **1. Criar mais posts com datas corretas:**

```bash
# Exemplo para hoje (11/10/2024)
touch _posts/2024-10-11-como-reduzir-custos-restaurante.md
```

### **2. Fazer commit das mudanças:**

```bash
git add _posts/
git commit -m "Fix post date: change to 2024-10-10 to make it visible"
git push
```

### **3. Aguardar deploy no GitHub Pages (2-3 min)**

### **4. Verificar no site real:**

```
https://ordrx.ai/blog/
https://ordrx.ai/blog/2024/10/10/cardapio-digital-qr-code-vantagens/
https://ordrx.ai/feed.xml
```

---

## 💡 Dica Pro

### **Para agendar posts futuros:**

1. Crie o post com data futura
2. Faça commit
3. No dia da data, o GitHub Pages vai publicar automaticamente!

**Exemplo:**

```markdown
---
date: 2024-10-15 # Será publicado dia 15
---
```

---

## 🆘 Troubleshooting

### **Post ainda não aparece após reiniciar:**

1. Verifique a data no front matter
2. Confirme que o arquivo está em `_posts/`
3. Verifique o nome do arquivo (formato `YYYY-MM-DD-titulo.md`)
4. Limpe o cache:
   ```bash
   bundle exec jekyll clean
   bundle exec jekyll serve
   ```

### **Feed.xml está vazio:**

1. Reinicie o Jekyll
2. Aguarde o build completo (~1 segundo)
3. Atualize a página do feed no navegador (F5)

---

**Versão:** 1.0  
**Data da Correção:** 11/10/2024  
**Status:** ✅ CORRIGIDO

**Agora é só reiniciar o Jekyll e ver o post funcionando!** 🎉
