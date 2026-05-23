# Comando /tasks

Gera tasks de implementação a partir de PRD e Spec existentes, organizadas como slices verticais com valor entregável.

## Uso

```bash
/tasks <caminho-do-diretório-do-épico>
```

**Exemplo:**
```bash
/tasks docs/plans/delivery
```

## Comportamento

### Passo 1 — Leitura Obrigatória

1. Encontrar `*-prd.md` no diretório especificado
2. Encontrar `*-spec.md` no diretório especificado
3. Ler `CLAUDE.md` para confirmar padrões do projeto
4. Se faltarem PRD ou Spec → informar o usuário e parar

### Passo 2 — Análise

1. **Extrair do PRD**: User Stories, regras de negócio, critérios de aceite
2. **Extrair da Spec**: Endpoints, collections, componentes, ordem de dependência
3. **Mapear**: endpoint ↔ página/componente (para garantir slices verticais)

### Passo 3 — Geração de Tasks

## Princípios das Tasks

### 1. Slices Verticais
Cada task toca backend E frontend, entregando funcionalidade completa de ponta a ponta.

```
❌ HORIZONTAL (ERRADO)        ✅ VERTICAL (CORRETO)
Task 1: Todos os tipos         Task 1: CRUD completo de X
Task 2: Todos os services          Backend: tipos + service + routes
Task 3: Todas as rotas             Frontend: tipos + api + página
Task 4: Todo o frontend        Task 2: Feature Y completa
                                   Backend: alterações + testes
                                   Frontend: componente + integração
```

### 2. Valor Entregável
Cada task entrega algo que o usuário pode testar:

```
❌ SEM VALOR               ✅ COM VALOR
"Adicionar tipos"          "Gerente pode criar e listar pedidos delivery"
"Criar endpoint POST"      "Cliente pode fazer pedido com endereço"
"Adicionar botão"          "Kanban mostra pedidos e permite arrastar"
```

### 3. Tamanho Equilibrado
- **Arquivos:** 5-10 por task
- **Estimativa de implementação:** 30-90 minutos
- **Estimativa de leitura:** 5-10 minutos

### 4. Compilação Funcional
Ao final de CADA task:
- `cd backend && npx tsc --noEmit` deve passar
- `cd frontend && npx tsc --noEmit` deve passar
- Algo deve ser testável manualmente

### 5. Ordem de Dependência
- Task 1 sempre: setup base (schema + tipos + CRUD simples)
- Tasks intermediárias: features incrementais
- Última task: integrações complexas + edge cases

## Estrutura de Cada Task

```markdown
# Task N: [Entregável — o que o usuário pode fazer ao final]

## Metadados
- **ID:** N
- **Prioridade:** Alta | Média | Baixa
- **Dependência:** Task X (ou "Nenhuma")
- **Estimativa:** 30-90 min implementação, 5-10 min leitura
- **Entregável:** Frase clara no formato "Persona pode ação"

## Objetivo
Parágrafo de 3-5 linhas explicando o que é implementado e por quê.

## Arquivos a Criar/Modificar

### Backend (N arquivos)
1. `backend/src/services/nome.service.ts` — criar serviço com métodos X, Y
2. `backend/src/routes/nome.routes.ts` — endpoints POST /rota, GET /rota
3. `backend/src/tests/nome.service.test.ts` — testes unitários (100% cobertura)
4. `backend/src/db/collections.ts` — adicionar collection (se nova)

### Frontend (N arquivos)
1. `frontend/src/app/rota/page.tsx` — página principal
2. `frontend/src/components/NomeComponente.tsx` — componente
3. `frontend/src/lib/api.ts` — adicionar nomeApi

## Especificação Técnica

### Backend

#### Tipos (TypeScript)
```typescript
// Interface exata conforme spec
```

#### Service
```typescript
// Assinatura dos métodos com descrição
export class NomeService {
  async criarX(data: CreateXData): Promise<X> { ... }
  async listarX(restauranteId: string): Promise<X[]> { ... }
}
export const nomeService = new NomeService();
```

#### Rotas
```typescript
// POST /rota/acao — auth: [authMiddleware, requireRoles('GERENTE')]
// GET /rota — auth: [authMiddleware, requireRoles('GERENTE', 'GARCOM')]
```

#### Testes
```typescript
describe('NomeService', () => {
  describe('criarX', () => {
    it('deve criar X com dados válidos')
    it('deve lançar erro quando [condição]')
  });
});
```

### Frontend

#### Componente
```typescript
// Props interface e estrutura JSX
```

#### Query/Mutation
```typescript
// useQuery ou useMutation com queryKey e invalidação
```

## Critérios de Aceite
- [ ] Backend compila sem erros (`cd backend && npx tsc --noEmit`)
- [ ] Frontend compila sem erros (`cd frontend && npx tsc --noEmit`)
- [ ] Testes passam (`cd backend && npm test`)
- [ ] [Critério de negócio 1]
- [ ] [Critério de negócio 2]

## Testes Manuais

### Pré-requisitos
- Backend e frontend rodando (`docker-compose up`)
- Usuário logado como [GERENTE/GARCOM/etc]
- Restaurante ID: [restauranteId de seed]

### Cenário 1: [Nome]
1. Acessar [URL]
2. Fazer [ação]
3. **Esperado:** [resultado concreto]

### Cenário 2: [Nome]
1. ...

## Próxima Task
**Task N+1:** [descrição breve do que vem a seguir]
```

## TASKS-INDEX.md — Formato

```markdown
# Tasks: [Nome do Épico]

**Data:** YYYY-MM-DD  
**PRD:** [link]  
**Spec:** [link]  

---

## Filosofia
Slices verticais — backend + frontend em cada task, algo testável ao final.

---

## Índice

| Task | Entregável | Arquivos | Estimativa | Dependência | Status |
|------|-----------|----------|------------|-------------|--------|
| [1](./tasks/task-1-nome.md) | Descrição | ~N | 60 min | — | ⬜ Pendente |
| [2](./tasks/task-2-nome.md) | Descrição | ~N | 45 min | Task 1 | ⬜ Pendente |

Status: ⬜ Pendente | 🔄 Em progresso | ✅ Concluída | ❌ Bloqueada

---

## Fluxo de Dependências

```
Task 1 (Setup Base)
  └── Task 2 (Feature A)
        └── Task 3 (Feature B)
  └── Task 4 (Feature C) ← paralela com Task 2
Task 5 (Integração) ← depende de 2, 3, 4
```

---

## Progresso

| Total | Concluídas | Em Progresso | % |
|-------|------------|--------------|---|
| N | 0 | 0 | 0% |
```

## Output

**Cria:**
- `docs/plans/{épico}/TASKS-INDEX.md`
- `docs/plans/{épico}/tasks/task-1-{nome}.md`
- `docs/plans/{épico}/tasks/task-2-{nome}.md`
- etc.

## Anti-Patterns

```
❌ Tasks só de backend sem frontend
❌ Tasks só de tipos (sem funcionalidade)
❌ Task com 15+ arquivos (dividir)
❌ Task sem critérios de aceite verificáveis
❌ Task que não compila ao final (código "morto" esperando próxima)
❌ Ordem incorreta de dependências
```

## Referências

- Padrões de backend: `.claude/agents/backend.md`
- Padrões de frontend: `.claude/agents/frontend.md`
- Spec: use `/spec` antes de `/tasks`
- Documentação completa: `AGENT-TASKS.md`

