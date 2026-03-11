# Comando /review

Revisa uma implementação verificando alinhamento com Spec, qualidade de código, cobertura de testes e padrões do projeto.

## Uso

```bash
/review                              # revisa última implementação no contexto
/review <caminho-da-task>            # revisa task específica
/review <arquivo1> <arquivo2> ...    # revisa arquivos específicos
```

**Exemplos:**
```bash
/review
/review docs/plans/delivery/tasks/task-1-setup-delivery.md
/review backend/src/services/delivery.service.ts frontend/src/app/r/[id]/d/page.tsx
```

## Comportamento

### Passo 1 — Coleta de Contexto

Ler automaticamente:
1. Arquivos implementados (code diff ou arquivos especificados)
2. Task correspondente (para verificar critérios de aceite)
3. Spec correspondente (para verificar contratos de API e schema)
4. Arquivos de referência similares no projeto (para verificar consistência de padrão)

### Passo 2 — Delegação ao code-review

Delegar análise detalhada ao agente `code-review`, que aplicará:
- Checklist de Backend (service, rota, auth, Zod, ESM)
- Checklist de Frontend (TanStack Query, token, Tailwind, estados)
- Classificação: BLOCK | WARN | SUGGEST | PRAISE

### Passo 3 — Verificação Especializada (quando relevante)

| Situação | Agente |
|---------|--------|
| Endpoints públicos ou lógica de auth | `security` |
| Queries MongoDB em hotpath | `performance` |
| Cobertura de testes de services | `quality` |
| Integrações WhatsApp/R2/ViaCEP | `integrations` |

### Passo 4 — Relatório Final

## Estrutura do Relatório

```markdown
## Code Review — [Nome da Feature/Task]

**Data:** YYYY-MM-DD  
**Arquivos revisados:** N  
**Spec analisada:** [sim/não]  

---

### ❌ Bloqueantes (deve corrigir antes de continuar)

- **[arquivo:linha]** Descrição do problema
  ```typescript
  // Problemático
  código atual
  ```
  **Fix:**
  ```typescript
  // Corrigido
  código correto
  ```

---

### ⚠️ Warnings (deveria corrigir)

- **[arquivo:linha]** Descrição + sugestão

---

### 💡 Sugestões (poderia melhorar)

- Observação para melhoria futura

---

### ✅ Destaques (boas práticas identificadas)

- O que está bem feito

---

### 📋 Alinhamento com Spec

| Item da Spec | Implementado | Observação |
|-------------|-------------|-----------|
| Endpoint POST /rota | ✅ | — |
| Campo X na response | ⚠️ | Faltando em alguns casos |
| Índice restauranteId | ✅ | — |
| Validação Zod | ❌ | Body sem parse |

Aderência: XX%

---

### 🧪 Cobertura de Testes

| Service | Métodos Públicos | Testados | % |
|---------|-----------------|----------|---|
| nome.service.ts | 4 | 3 | 75% |

**Gaps críticos:**
- `método()` sem teste de erro

---

### 🔐 Segurança (se relevante)

- [ ] Endpoints com auth correto
- [ ] Zod em todos os bodies
- [ ] ObjectId.isValid() antes de uso
- [ ] Sem dados sensíveis em logs

---

### ⚡ Performance (se relevante)

- [ ] Índices para queries principais
- [ ] Sem N+1 queries
- [ ] Projeção em queries pesadas

---

### 🏁 Veredicto

✅ **Aprovado** — pode prosseguir
⚠️ **Aprovado com Warnings** — corrigir antes do PR
❌ **Bloqueado** — N issues críticos, corrigir antes de continuar

**Próxima ação:** [o que fazer agora]
```

## Categorias de Findings

### BLOCK — Deve corrigir

**Backend:**
- Rota sem authMiddleware quando deveria ter
- Input sem Zod parse (NoSQL injection possível)
- Update de sessão sem version check
- Import sem `.js` (ESM quebrado)
- Eventos modificados (append-only violado)
- Response fora do formato `{ success, data/error }`
- Service sem singleton exportado
- Promise não tratada que pode crashar

**Frontend:**
- Fetch direto sem usar `lib/api.ts`
- Token de outro lugar que não parâmetro explícito
- `useEffect` + fetch em código novo (deve ser TanStack Query)
- `key={index}` em lista que pode reordenar

### WARN — Deveria corrigir

- Função > 50 linhas sem extração
- Componente com > 7-8 props sem composição
- `any` sem necessidade real
- `await` faltando em Promise
- Side effect de integração externa sem try/catch
- Loading/error/empty state faltando

### SUGGEST — Poderia melhorar

- Naming mais expressivo
- Comentário explicando "por quê" em lógica complexa
- Oportunidade de reutilizar componente/hook existente
- Tipagem mais precisa possível

### PRAISE — Destaque positivo

- Padrão seguido corretamente em situação não-óbvia
- Edge case coberto proativamente
- Refatoração que simplificou código existente

### NÃO comentar

- Estilo de código sem impacto (o projeto não tem ESLint/Prettier)
- Preferências pessoais
- Refatorações que não melhoram clareza
- `const` vs `let` quando funciona

## Checklist Rápido

```
Backend — Service:
□ Zod parse antes de usar body
□ ObjectId.isValid() antes de new ObjectId(userInput)
□ Version check + $inc em update de sessão
□ Event append DEPOIS de update
□ SSE broadcast DEPOIS de event
□ Side effects em try/catch
□ Erros em português
□ Response { success, data/error }
□ Imports com .js
□ Teste: sucesso + erro + edge case

Backend — Rota:
□ authMiddleware quando necessário
□ requireRoles com roles corretos
□ requireRestaurantAccess para dados de restaurante
□ Zod parse do body
□ try/catch com error handling
□ Status HTTP correto

Frontend — Componente:
□ 'use client' só se necessário
□ Props tipadas com interface
□ API via lib/api.ts
□ TanStack Query para fetch novo
□ Loading + error + empty states
□ Tailwind (sem CSS inline complexo)

Frontend — Página:
□ Params validados
□ Auth check se necessário
□ Query keys com todas as dependências
□ invalidateQueries após mutations
```

## Referências

- Agente code-review: `.claude/agents/code-review.md`
- Agente security: `.claude/agents/security.md`
- Agente quality: `.claude/agents/quality.md`
- Agente performance: `.claude/agents/performance.md`
- Documentação completa: `docs/REVIEW-COMMAND.md`

