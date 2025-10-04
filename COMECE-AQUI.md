# 🚀 COMECE AQUI - Deploy ORDRX.AI

> **Seu domínio `ordrx.ai` já está configurado!** ✅  
> Siga apenas 3 passos para colocar online.

---

## 📋 O QUE VOCÊ PRECISA

- [ ] Acesso ao painel GoDaddy (domínio ordrx.ai)
- [ ] Conta GitHub (seu username)
- [ ] 30 minutos de tempo

---

## 🎯 3 PASSOS RÁPIDOS

### 1. Configure DNS (5 minutos)

📄 **Abra o arquivo:** `DNS-GODADDY-ORDRX-AI.txt`  
📝 **Copie os registros** e adicione na GoDaddy

**Resumo:**
- 4 registros tipo A
- 1 registro tipo CNAME (www)

**Link direto GoDaddy:**  
https://dcc.godaddy.com

---

### 2. Faça Deploy (1 minuto)

Execute no terminal:

```bash
./deploy.sh
```

✅ Pronto! Arquivos enviados para o GitHub.

---

### 3. Configure GitHub Pages (2 minutos)

1. Vá em: `Settings → Pages` no seu repositório
2. **Source:** `main` branch, `/ (root)`
3. **Custom domain:** `ordrx.ai`
4. Salve e aguarde verificação ✅
5. Marque **"Enforce HTTPS"**

---

## ⏱️ Aguarde 15-30 minutos

☕ **Relaxe!** DNS está propagando...

Teste a propagação:
```bash
dig ordrx.ai +short
```

---

## 🎉 PRONTO!

Seu site estará em:
- **https://ordrx.ai** ✅

---

## 📚 Precisa de Ajuda?

| Situação | Leia este arquivo |
|----------|-------------------|
| Guia detalhado passo a passo | `CONFIGURACAO-DOMINIO.md` |
| Versão resumida (30 min) | `INICIO-RAPIDO.md` |
| Apenas IPs e registros DNS | `DNS-GODADDY-ORDRX-AI.txt` |
| Resumo executivo | `RESUMO-DEPLOY.md` |

---

## ✅ Tudo Certo?

Seu site deve:
- ✅ Carregar rápido (< 2 segundos)
- ✅ Ter HTTPS (cadeado verde)
- ✅ Ser responsivo (funcionar no mobile)
- ✅ Formulário enviando e-mails

---

**🚀 Vamos lá! Execute `./deploy.sh` agora!**

---

*Desenvolvido por ORDRX Team | Outubro 2025*

