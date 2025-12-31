# 📝 Guia do Sistema de Blog Jekyll

## 🎉 O Que Foi Implementado

Seu blog agora usa o sistema de posts do Jekyll com arquivos **Markdown**! Isso significa que você escreve artigos em texto simples e o Jekyll transforma automaticamente em HTML bonito.

---

## 📁 Estrutura do Blog

```
landing-page/
├── _posts/                                          ← Artigos do blog (Markdown)
│   └── 2025-10-10-cardapio-digital-qr-code-vantagens.md
├── _layouts/
│   ├── default.html                                 ← Layout base
│   └── post.html                                    ← Layout para artigos
├── blog.html                                        ← Página listagem (atualizado!)
```

---

## ✨ Vantagens do Sistema de Posts

### **ANTES** (HTML puro):

- ❌ Criar arquivo HTML de 500+ linhas
- ❌ Copiar/colar todo header e footer
- ❌ Configurar structured data manualmente
- ❌ Atualizar blog.html manualmente com novo link
- ❌ Difícil de manter e atualizar

### **AGORA** (Markdown + Jekyll):

- ✅ Escrever em Markdown (super simples!)
- ✅ Header e footer automáticos
- ✅ Structured data gerado automaticamente
- ✅ Blog lista posts automaticamente
- ✅ URLs amigáveis geradas automaticamente

---

## 🚀 Como Criar um Novo Post

### 1. Crie o arquivo

Nome do arquivo: `_posts/YYYY-MM-DD-titulo-do-post.md`

Exemplo: `_posts/2025-10-15-como-aumentar-vendas-restaurante.md`

⚠️ **IMPORTANTE**: O nome deve seguir esse padrão exato!

### 2. Adicione o Front Matter (cabeçalho)

No topo do arquivo, adicione:

```yaml
---
layout: post
title: "Como Aumentar Vendas no Seu Restaurante em 30 Dias"
description: "Descubra 5 estratégias comprovadas para aumentar as vendas do seu restaurante em apenas 30 dias."
date: 2025-10-15
category: "Gestão"
author: "ORDRX"
read_time: 8
tags: [vendas, gestão, estratégias, restaurantes]
image: "https://ordrx.ai/images/mascote2.png"
---
```

### 3. Escreva o conteúdo em Markdown

Após o `---`, escreva seu artigo em Markdown:

```markdown
O **crescimento de vendas** é o objetivo de todo restaurante. Neste artigo, vamos mostrar 5 estratégias práticas que você pode implementar hoje mesmo.

## 1. Otimize Seu Cardápio

Um cardápio bem estruturado pode aumentar vendas em até 30%. Veja como:

- Use fotos de alta qualidade
- Destaque pratos com maior margem
- Crie combos atrativos

> **Dica:** Pratos com fotos vendem 2x mais!

## 2. Implemente Upselling

Treine sua equipe para sugerir:

1. Entradas
2. Acompanhamentos
3. Sobremesas

**Resultado**: Aumento de 25% no ticket médio.

[Link para saber mais](/)

...continue escrevendo...
```

### 4. Salve o arquivo

Pronto! Jekyll vai automaticamente:

- Gerar a página do artigo em `/blog/2025/10/15/como-aumentar-vendas-restaurante/`
- Adicionar na listagem do blog
- Criar structured data para SEO
- Adicionar navegação (próximo/anterior)

---

## 📝 Sintaxe Markdown

### Títulos

```markdown
# Título H1

## Título H2

### Título H3
```

### Texto

```markdown
**Negrito**
_Itálico_
[Link](https://ordrx.ai)
```

### Listas

```markdown
- Item 1
- Item 2
- Item 3

1. Primeiro
2. Segundo
3. Terceiro
```

### Citações

```markdown
> Esta é uma citação importante.
```

### Imagens

```markdown
![Texto alternativo](/images/foto.jpg)
```

---

## 🎨 Customização do Front Matter

### Campos disponíveis:

| Campo              | Obrigatório    | Descrição                  | Exemplo            |
| ------------------ | -------------- | -------------------------- | ------------------ |
| `layout`           | ✅ Sim         | Sempre `post`              | `post`             |
| `title`            | ✅ Sim         | Título do artigo           | `"10 Dicas..."`    |
| `description`      | ✅ Sim         | Meta description (SEO)     | `"Descubra as..."` |
| `date`             | ✅ Sim         | Data de publicação         | `2025-10-15`       |
| `category`         | ⚠️ Recomendado | Categoria do post          | `"Tecnologia"`     |
| `author`           | ⚠️ Recomendado | Autor                      | `"ORDRX"`          |
| `read_time`        | ⚠️ Recomendado | Tempo de leitura (minutos) | `10`               |
| `tags`             | ⚠️ Recomendado | Tags (array)               | `[tag1, tag2]`     |
| `image`            | ❌ Opcional    | URL da imagem OG           | `"https://..."`    |
| `last_modified_at` | ❌ Opcional    | Data de modificação        | `2025-10-16`       |

---

## 🔗 URLs Geradas

### Padrão configurado:

```
/blog/:year/:month/:day/:title/
```

### Exemplos:

| Nome do arquivo                  | URL gerada                           |
| -------------------------------- | ------------------------------------ |
| `2025-10-10-cardapio-digital.md` | `/blog/2025/10/10/cardapio-digital/` |
| `2025-11-15-gestao-estoque.md`   | `/blog/2025/11/15/gestao-estoque/`   |

---

## 📋 Checklist para Novo Post

- [ ] Criar arquivo `_posts/YYYY-MM-DD-titulo.md`
- [ ] Adicionar front matter completo
- [ ] Escrever conteúdo em Markdown
- [ ] Adicionar categoria relevante
- [ ] Definir tags (3-5 tags)
- [ ] Especificar tempo de leitura
- [ ] Revisar ortografia
- [ ] Fazer commit e push
- [ ] Aguardar 2-3 minutos (build do GitHub Pages)
- [ ] Verificar post no site

---

## 🎯 Exemplo Completo

### Arquivo: `_posts/2025-10-20-reducao-custos-restaurante.md`

```markdown
---
layout: post
title: "5 Formas de Reduzir Custos no Restaurante Sem Perder Qualidade"
description: "Aprenda 5 estratégias práticas para reduzir custos operacionais do seu restaurante mantendo a qualidade dos pratos e do atendimento."
date: 2025-10-20
category: "Gestão"
author: "ORDRX"
read_time: 12
tags: [custos, gestão, eficiência, lucratividade, economia]
image: "https://ordrx.ai/images/mascote2.png"
---

Reduzir custos sem comprometer a qualidade é o desafio de todo gestor de restaurante. Neste guia, vamos explorar **5 estratégias comprovadas** que podem reduzir seus custos em até 40%.

## 1. Automatize Processos Manuais

A automação é a forma mais eficaz de reduzir custos operacionais:

- **Cardápio digital**: Elimina impressão e anotação manual
- **Gestão de estoque**: Reduz desperdício em 30%
- **Pedidos online**: Menos erros e retrabalho

> **Resultado**: Economia de R$ 8.000 a R$ 15.000/mês

## 2. Negocie com Fornecedores

Dicas para conseguir melhores preços:

1. Compre em maior volume
2. Pague à vista quando possível
3. Compare 3+ fornecedores
4. Estabeleça parcerias de longo prazo

### Tabela de Economia Potencial

| Ação              | Economia |
| ----------------- | -------- |
| Compra volume     | 15-20%   |
| Pagamento à vista | 5-10%    |
| Troca fornecedor  | 10-15%   |

## 3. Otimize o Cardápio

**Menu engineering** pode aumentar lucratividade significativamente:

- Destaque pratos de alta margem
- Remova itens de baixo giro
- Crie combos lucrativos
- Ajuste porções baseado em dados

[Saiba mais sobre cardápio digital](/blog/2025/10/10/cardapio-digital-qr-code-vantagens/)

## 4. Controle de Desperdício

O desperdício pode representar até 10% dos custos:

- Monitore sobras diariamente
- Implemente FIFO (First In, First Out)
- Treine equipe sobre porcionamento
- Use sistema de controle de estoque

## 5. Eficiência Energética

Pequenas mudanças geram grande economia:

- LED em toda iluminação
- Equipamentos de alta eficiência
- Manutenção preventiva regular
- Conscientização da equipe

## Conclusão

Implementando essas 5 estratégias, você pode reduzir custos em até **40% sem comprometer a qualidade**. O segredo está em trabalhar com inteligência, não apenas com força.

**Quer automatizar seu restaurante?** Conheça o [ORDRX](/) e descubra como a tecnologia pode reduzir seus custos drasticamente.
```

---

## 🔧 Comandos Úteis

### Testar localmente (opcional):

```bash
cd landing-page
bundle exec jekyll serve
# Acesse: http://localhost:4000/blog.html
```

### Ver lista de posts:

```bash
ls -la _posts/
```

### Deploy (GitHub Pages):

```bash
git add _posts/
git commit -m "Add new blog post: [título]"
git push
```

---

## 🎨 Categorias Sugeridas

Use categorias consistentes:

- **Tecnologia**: Cardápios digitais, automação, apps
- **Gestão**: Custos, estoque, financeiro
- **Marketing**: Vendas, promoções, redes sociais
- **Operações**: Processos, equipe, atendimento
- **Tendências**: Novidades do setor gastronômico

---

## 🏷️ Tags Recomendadas

Tags ajudam na organização e SEO:

- cardápio digital
- QR Code
- automação
- gestão
- vendas
- custos
- tecnologia
- restaurantes
- bares
- delivery
- estoque
- lucratividade

---

## ✅ Boas Práticas

### ✅ FAÇA:

- Títulos descritivos e atrativos (até 60 caracteres)
- Descriptions entre 120-155 caracteres
- Use H2 e H3 para estruturar
- Adicione listas e bullet points
- Inclua citações importantes
- Use negritos para destacar
- Adicione links internos e externos
- Escreva parágrafos curtos (3-4 linhas)
- Inclua CTA (Call-to-Action) no final

### ❌ NÃO FAÇA:

- Títulos muito longos
- Parágrafos enormes sem quebra
- Excesso de tags (máximo 7)
- Esquecer o front matter
- Nome de arquivo sem data
- Usar espaços no nome do arquivo (use hífen)

---

## 🆘 Troubleshooting

### Post não aparece no blog:

1. Verifique o nome do arquivo: `YYYY-MM-DD-titulo.md`
2. Confirme que está na pasta `_posts/`
3. Verifique se o front matter está correto
4. Aguarde 2-3 minutos após push (build do GitHub)

### Formatação errada:

1. Valide sintaxe Markdown: https://dillinger.io/
2. Verifique se o front matter está entre `---`
3. Confira indentação (YAML é sensível a espaços)

### URL quebrada:

1. Use apenas letras minúsculas no título do arquivo
2. Substitua espaços por hífens
3. Remova caracteres especiais (acentos, pontuação)

---

## 📚 Recursos

- **Markdown Guide**: https://www.markdownguide.org/
- **Jekyll Docs**: https://jekyllrb.com/docs/posts/
- **Front Matter**: https://jekyllrb.com/docs/front-matter/
- **Liquid Syntax**: https://shopify.github.io/liquid/

---

## 🎓 Próximos Passos

1. **Criar 2-3 posts por semana** para SEO
2. **Categorizar posts** de forma consistente
3. **Adicionar imagens** personalizadas nos posts
4. **Compartilhar** nas redes sociais
5. **Monitorar** performance no Google Analytics

---

**Versão**: 1.0  
**Data**: 11/10/2025  
**Pronto para criar conteúdo incrível!** 🚀
