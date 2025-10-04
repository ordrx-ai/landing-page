#!/bin/bash

# 🚀 Script de Deploy para GitHub Pages
# Uso: ./deploy.sh

echo "🚀 ORDRX Landing Page - Deploy Script"
echo "======================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verifica se está no diretório correto
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Erro: index.html não encontrado!${NC}"
    echo "Execute este script na raiz do projeto."
    exit 1
fi

# Verifica se o arquivo CNAME existe
if [ ! -f "CNAME" ]; then
    echo -e "${YELLOW}⚠️  Arquivo CNAME não encontrado!${NC}"
    read -p "Digite seu domínio (ex: ordrx.com.br) ou pressione ENTER para pular: " domain
    if [ ! -z "$domain" ]; then
        echo "$domain" > CNAME
        echo -e "${GREEN}✅ Arquivo CNAME criado com: $domain${NC}"
    fi
fi

# Mostra status do git
echo -e "${YELLOW}📋 Status do repositório:${NC}"
git status --short
echo ""

# Pergunta se deseja continuar
read -p "Deseja fazer commit e push? (s/n): " confirm
if [ "$confirm" != "s" ] && [ "$confirm" != "S" ]; then
    echo -e "${RED}❌ Deploy cancelado.${NC}"
    exit 0
fi

# Adiciona todos os arquivos
echo -e "${YELLOW}📦 Adicionando arquivos...${NC}"
git add .

# Pede mensagem de commit
read -p "Mensagem do commit (ou ENTER para usar padrão): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update landing page - $(date '+%Y-%m-%d %H:%M')"
fi

# Faz commit
echo -e "${YELLOW}💾 Fazendo commit...${NC}"
git commit -m "$commit_msg"

# Verifica se há mudanças para commitar
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Nenhuma mudança para commitar.${NC}"
    read -p "Deseja fazer push mesmo assim? (s/n): " force_push
    if [ "$force_push" != "s" ] && [ "$force_push" != "S" ]; then
        echo -e "${RED}❌ Deploy cancelado.${NC}"
        exit 0
    fi
fi

# Faz push
echo -e "${YELLOW}🚀 Enviando para GitHub...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Deploy realizado com sucesso!${NC}"
    echo ""
    echo "📍 Próximos passos:"
    echo ""
    echo "1️⃣  Acesse: https://github.com/SEU-USUARIO/SEU-REPO/settings/pages"
    echo "2️⃣  Verifique se o GitHub Pages está ativo"
    echo "3️⃣  Configure seu domínio customizado (se houver)"
    echo "4️⃣  Aguarde 2-5 minutos para o deploy completar"
    echo ""
    
    # Verifica se tem CNAME configurado
    if [ -f "CNAME" ]; then
        domain=$(cat CNAME)
        echo -e "${GREEN}🌐 Domínio configurado: $domain${NC}"
        echo ""
        echo "📋 Lembre-se de configurar o DNS na GoDaddy:"
        echo "   - Leia: CONFIGURACAO-DOMINIO.md"
        echo "   - Configure registros A/CNAME"
        echo "   - Aguarde propagação (10-30 min)"
        echo ""
    fi
    
    echo -e "${GREEN}🎉 Tudo pronto!${NC}"
else
    echo -e "${RED}❌ Erro ao fazer push!${NC}"
    echo "Verifique suas credenciais e conexão com o GitHub."
    exit 1
fi

