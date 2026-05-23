# Comando /implement

Implementa uma task específica seguindo PRD, Spec e padrões do projeto.

## Uso

```bash
/implement <caminho-do-arquivo-da-task>
```

**Exemplo:**
```bash
/implement docs/plans/delivery/tasks/task-1-setup-delivery.md
```

## Comportamento

### Passo 1 — Leitura Obrigatória (ANTES de qualquer código)

1. Ler o arquivo de task especificado
2. Ler o PRD do mesmo diretório (`*-prd.md`)
3. Ler a Spec do mesmo diretório (`*-spec.md`)
4. Ler `CLAUDE.md` para reconfirmar padrões
5. Ler arquivos de referência relevantes no projeto:
   - Service similar existente (copiar padrão)
   - Route similar existente (copiar padrão)
   - Componente similar existente (copiar padrão)

### Passo 2 — Delegação por Tipo de Arquivo

Ao implementar, usar o agente especializado correto:

| Tipo de Arquivo | Agente |
|----------------|--------|
| `backend/src/services/*.service.ts` | `backend` |
| `backend/src/routes/*.routes.ts` | `backend` |
| `backend/src/tests/*.test.ts` | `quality` |
| `backend/src/db/collections.ts` | `backend` |
| `backend/migrations/` | `backend` |
| `frontend/src/app/**/*.tsx` | `frontend` |
| `frontend/src/components/**/*.tsx` | `frontend` |
| `frontend/src/lib/api.ts` | `frontend` |
| `frontend/src/hooks/*.ts` | `frontend` |
| Integração WhatsApp/R2/ViaCEP | `integrations` |
| Endpoints públicos (sem auth) | `security` (revisar) |

### Passo 3 — Implementação

#### Backend (padrões obrigatórios)

```typescript
// 1. Service como classe + singleton
export class NomeService {
  async metodo(params): Promise<Result> {
    // Validação primeiro
    // findOneAndUpdate com version check (se sessão)
    // eventService.append() (se sessão)
    // sseService.broadcast() (se sessão)
    // side effects em try/catch (WhatsApp, estoque)
  }
}
export const nomeService = new NomeService();

// 2. Imports ESM obrigatórios com .js
import { nomeService } from '../services/nome.service.js';

// 3. Response format
reply.status(201).send({ success: true, data: { id: '...', ... } });
reply.status(400).send({ success: false, error: 'Mensagem em português' });

// 4. Auth stack
preHandler: [authMiddleware, requireRoles('GERENTE'), requireRestaurantAccess(...)]

// 5. Zod para validar body
const body = bodySchema.parse(request.body);
```

#### Frontend (padrões obrigatórios)

```typescript
// 1. 'use client' apenas se necessário
// 2. TanStack Query para fetch (não useEffect+fetch em código novo)
// 3. Token passado como parâmetro (não de context)
// 4. Tailwind com template literals (sem cn/clsx)
// 5. Estado com useState (sem Zustand/Redux)
// 6. Formulários controlados com useState
// 7. Sem fetch direto — sempre via lib/api.ts
```

### Passo 4 — Testes (OBRIGATÓRIO para Services)

Para cada service criado ou modificado, criar/atualizar `backend/src/tests/nome.service.test.ts`:

```typescript
// Padrão exato:
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../db/collections.js', () => ({ ... }));
vi.mock('../services/sse.service.js', () => ({ sseService: { ... } }));

import { getMeuCollection } from '../db/collections.js';
import { meuService } from '../services/meu.service.js';

describe('MeuService', () => {
  const mockCollection = {
    insertOne: vi.fn(),
    findOne: vi.fn(),
    find: vi.fn(() => ({ toArray: vi.fn().mockResolvedValue([]) })),
    findOneAndUpdate: vi.fn(),
    updateOne: vi.fn(),
    aggregate: vi.fn(() => ({ toArray: vi.fn().mockResolvedValue([]) })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getMeuCollection).mockReturnValue(mockCollection as any);
  });

  describe('metodo', () => {
    it('deve [comportamento] quando [condição]', async () => {
      // Arrange
      mockCollection.findOne.mockResolvedValue(null);
      // Act
      const result = await meuService.metodo(params);
      // Assert
      expect(result).toBeDefined();
    });

    it('deve lançar erro quando [condição de erro]', async () => {
      await expect(meuService.metodo(params)).rejects.toThrow('mensagem exata');
    });
  });
});
```

### Passo 5 — Validação

```bash
# 1. TypeScript sem erros
cd backend && npx tsc --noEmit
cd frontend && npx tsc --noEmit

# 2. Testes passando
cd backend && npm test

# 3. Critérios de aceite da task verificados
```

### Passo 6 — Incertezas

**PARAR e perguntar quando:**
- Ambiguidade na spec que impacta arquitetura (ex: "deve usar collection separada ou embedded?")
- Conflito entre padrão existente e spec (ex: spec diz usar Zustand, projeto não usa)
- Dependência não implementada que bloqueia a task
- Decisão de segurança não óbvia (ex: endpoint deve ser público?)

**NÃO parar para:**
- Nomes de variáveis
- Estrutura de loops
- Padrões já estabelecidos no projeto
- Boas práticas universais (validação, tratamento de erros)

## Template de Resposta Após Implementação

```markdown
## ✅ Task N Implementada

### Arquivos Criados/Modificados
- `path/arquivo.ts` — descrição
- `path/arquivo.tsx` — descrição

### Decisões Técnicas
- [Se houver decisões não óbvias]

### Validação
```bash
cd backend && npx tsc --noEmit  # ✅ ou ❌ + erro
cd frontend && npx tsc --noEmit # ✅ ou ❌ + erro  
cd backend && npm test          # ✅ N testes passando
```

### Testes Manuais

#### Pré-requisitos
- `docker-compose up`
- Logado como [GERENTE/GARCOM/etc]

#### Cenário 1: [Nome]
1. [Passo]
2. [Passo]
**Esperado:** [resultado]

### Próxima Task
[Link para próxima task]
```

## Checklist Pré-Entrega

```
Código:
□ Sem any desnecessário
□ Sem console.log de debug
□ Sem código comentado
□ Funções < 50 linhas
□ Nomes descritivos em português (domínio) ou inglês (técnico)

Backend:
□ Imports com .js
□ Zod parse em todos os endpoints com body
□ ObjectId.isValid() antes de new ObjectId(userInput)
□ Version check em updates de sessão
□ Side effects em try/catch separado
□ Response { success, data/error } sempre

Frontend:
□ 'use client' apenas onde necessário
□ TanStack Query para fetch novo (não useEffect+fetch)
□ Token como parâmetro (não de context global)
□ Loading + error + empty states
□ Tailwind (sem style inline complexo)
□ invalidateQueries após mutation

Testes (OBRIGATÓRIO para services):
□ Arquivo de teste para cada service novo/modificado
□ Todos os métodos públicos têm testes
□ Cenário de sucesso + cenário de erro
□ Testes existentes continuam passando
```

## Referências

- Padrões backend: `.claude/agents/backend.md`
- Padrões frontend: `.claude/agents/frontend.md`
- Padrões de testes: `.claude/agents/quality.md`
- Padrões de integrações: `.claude/agents/integrations.md`
- Documentação completa: `AGENT-IMPLEMENT.md`

