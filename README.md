# 🚀 ORDRX Landing Page

Landing page estática para o ORDRX - Sistema de Automação de Pedidos para Restaurantes.

## 🎨 Design

- **Cores:** Fundo escuro (#0A0A0F) com elementos neon (cyan, pink, purple, green)
- **Inspiração:** Rocketseat, Goomer, Abrahão
- **Responsivo:** Mobile-first design
- **Animações:** Smooth scroll, hover effects, counter animations

## 📁 Estrutura

```
landing-page/
├── index.html      # HTML principal
├── styles.css      # Estilos (design neon)
├── script.js       # Interatividade e formulário
└── README.md       # Este arquivo
```

## ✨ Funcionalidades

### Seções

1. **Hero** - Título impactante com stats
2. **Features** - 6 funcionalidades principais
3. **Benefits** - 6 benefícios do ORDRX
4. **Segments** - 9 tipos de estabelecimentos
5. **FAQ** - 8 perguntas frequentes (accordion)
6. **About** - Sobre a empresa
7. **Contact** - Formulário de contato

### Formulário de Contato

Coleta:
- Nome completo
- Telefone (com máscara automática)
- Tipo de estabelecimento
- Número de mesas
- Cidade
- Mensagem (opcional)

**Envio:** E-mail para `ungaro.pablo@gmail.com` via FormSubmit.co

## 🚀 Como Usar

### Local

1. Abra `index.html` em qualquer navegador moderno
2. Todos os estilos e scripts estão inline/local
3. Não precisa de servidor web

### GitHub Pages

1. Fazer commit dos arquivos
2. Push para o repositório
3. Configurar GitHub Pages:
   - Settings → Pages
   - Source: `main` branch
   - Folder: `/ (root)`
4. Acessar: `https://seu-usuario.github.io/landing-page/`

### Domínio Customizado (GoDaddy)

Para usar seu próprio domínio (`ordrx.ai`):

1. **Leia o guia completo:** [CONFIGURACAO-DOMINIO.md](./CONFIGURACAO-DOMINIO.md)
2. Configure DNS na GoDaddy (registros A/CNAME)
3. ✅ Arquivo `CNAME` já configurado com `ordrx.ai`
4. Adicione o domínio em Settings → Pages no GitHub
5. Aguarde propagação DNS (10-30 min)
6. Ative HTTPS

**Domínio configurado:** `ordrx.ai` ✅

## 📝 Customização

### Cores

Edite as variáveis CSS em `styles.css`:

```css
:root {
    --neon-cyan: #00F0FF;
    --neon-pink: #FF00E5;
    --neon-purple: #8B00FF;
    --neon-green: #00FF88;
    /* ... */
}
```

### Conteúdo

Todo o conteúdo está em `index.html` e pode ser editado diretamente.

### E-mail de Contato

Altere em `script.js` linha 52:

```javascript
const response = await fetch('https://formsubmit.co/ajax/SEU-EMAIL@example.com', {
```

## 🎯 SEO

- Meta tags configuradas
- Semântica HTML5
- Performance otimizada
- Lazy loading de imagens

## 🔧 Tecnologias

- HTML5 (semântico)
- CSS3 (Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
- FormSubmit.co (formulário)
- Google Fonts (Inter)

## 📱 Responsividade

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## ⚡ Performance

- CSS e JS minificados
- Imagens otimizadas
- Lazy loading
- Animações GPU-accelerated
- Sem dependências externas pesadas

## 🎨 Logo

Logo SVG inline com gradiente neon (cyan → pink).

**Slogan:** "Revolucione seu Restaurante com Automação Inteligente"

## 📞 Contato

- **E-mail:** ungaro.pablo@gmail.com
- **Site:** https://ordrx.ai

---

**Desenvolvido por:** ORDRX Team  
**Data:** Outubro 2025  
**Versão:** 1.0

