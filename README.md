# Tasks App - Frontend

Frontend React moderno para gerenciamento de tarefas com TypeScript, Vite e Axios.

## Stack Tecnológico

- **Framework**: React 18.x
- **Ferramenta de Build**: Vite 5.x
- **Cliente HTTP**: Axios 1.x
- **Linguagem**: TypeScript 5.x
- **Estilização**: CSS Moderno com Variáveis CSS

## Funcionalidades

✅ Formulário de criação de tarefas com validação em tempo real  
✅ Lista de tarefas com layout responsivo tabela/cards  
✅ Estados de carregamento e tratamento de erros  
✅ Mensagens de sucesso/erro  
✅ Badges de status com código de cores  
✅ Totalmente responsivo (mobile, tablet, desktop)  
✅ Design de UI moderno e limpo  
✅ TypeScript para segurança de tipos

---

## Pré-requisitos

- Node.js 18+ e npm
- Servidor backend rodando em http://localhost:3000
- (Opcional) Docker para deployment containerizado

---

## Instalação e Configuração

### 1. Instalar Dependências

```bash
cd frontend
npm install
```

### 2. Configurar Ambiente

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

O `.env` padrão aponta para o backend local:

```env
VITE_API_URL=http://localhost:3000
```

**Para produção**, atualize para a URL do seu backend:

```env
VITE_API_URL=https://api.seudominio.com
```

### 3. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

O app iniciará em **http://localhost:5173** e abrirá automaticamente no seu navegador.

---

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com hot-reload |
| `npm run build` | Build para produção (saída em `dist/`) |
| `npm run preview` | Pré-visualiza o build de produção localmente |
| `npm run lint` | Executa ESLint para verificações de qualidade do código |

---

## Estrutura do Projeto

```
frontend/
├── public/              # Assets estáticos
├── src/
│   ├── components/
│   │   ├── TaskForm.tsx     # Componente de formulário de criação de tarefas
│   │   └── TaskList.tsx     # Componente de lista/tabela de tarefas
│   ├── services/
│   │   └── api.ts           # Instância Axios e métodos da API
│   ├── styles/
│   │   └── App.css          # Estilos globais e de componentes
│   ├── types/
│   │   └── task.ts          # Definições de tipos TypeScript
│   ├── App.tsx              # Componente principal do app
│   └── main.tsx             # Ponto de entrada da aplicação
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── Dockerfile
```

---

## Documentação dos Componentes

### TaskForm

**Propósito**: Permite que usuários criem novas tarefas.

**Funcionalidades**:
- Inputs controlados com validação
- Título (obrigatório, 1-255 caracteres)
- Descrição (opcional)
- Seleção de status (A Fazer, Fazendo, Concluído)
- Estado de carregamento durante chamada à API
- Mensagens de sucesso/erro
- Reset automático após criação bem-sucedida

**Props**:
- `onTaskCreated: () => void` - Callback acionado após criação bem-sucedida da tarefa

### TaskList

**Propósito**: Exibe todas as tarefas em uma tabela responsiva.

**Funcionalidades**:
- Busca tarefas na montagem e quando refresh é acionado
- Skeleton de carregamento durante busca
- Estado de erro com opção de retry
- Estado vazio quando não há tarefas
- Design responsivo (tabela no desktop, cards no mobile)
- Badges de status com código de cores
- Formatação de data (locale PT-BR)

**Props**:
- `refreshTrigger: number` - Mudanças neste valor acionam uma re-busca

---

## Integração com API

O app comunica-se com o backend através do módulo `/src/services/api.ts`.

### Métodos Disponíveis:

```typescript
// Criar uma nova tarefa
tasksApi.createTask({ title, description, status })
  .then(task => console.log('Criado:', task))
  .catch(error => console.error('Erro:', error));

// Obter todas as tarefas
tasksApi.getAllTasks()
  .then(tasks => console.log('Tarefas:', tasks))
  .catch(error => console.error('Erro:', error));
```

---

## Build para Produção

### Construir o app:

```bash
npm run build
```

Isso cria um build de produção otimizado no diretório `dist/`.

### Pré-visualizar o build:

```bash
npm run preview
```

### Deploy:

Faça upload da pasta `dist/` para qualquer serviço de hospedagem estática (Vercel, Netlify, GitHub Pages, S3, etc.).

---

## Deployment com Docker

### Construir a imagem:

```bash
docker build -t tasks-app-frontend .
```

### Executar o container:

```bash
docker run -p 8080:80 tasks-app-frontend
```

O app estará disponível em **http://localhost:8080**

**Nota**: Atualize a variável de ambiente `VITE_API_URL` durante o build para produção:

```bash
docker build --build-arg VITE_API_URL=https://api.seudominio.com -t tasks-app-frontend .
```

---

## Estilização e Temas

O app usa Variáveis CSS para facilitar a personalização de temas. Edite `/src/styles/App.css` para customizar:

```css
:root {
  --color-primary: #6366f1;        /* Cor primária da marca */
  --color-success: #10b981;        /* Mensagens de sucesso */
  --color-error: #ef4444;          /* Mensagens de erro */
  /* ... mais variáveis */
}
```

### Recursos:
- Breakpoints responsivos (480px, 768px)
- Abordagem mobile-first
- Transições suaves e efeitos de hover
- Spinners de carregamento
- Cores de badges de status
- Layout moderno baseado em cards

---

## Suporte a Navegadores

- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Navegadores mobile (iOS Safari, Chrome Mobile)

---

## Solução de Problemas

**Problema**: Requisições à API falham com erro CORS  
**Solução**: Certifique-se de que o backend está rodando e tem CORS habilitado para `http://localhost:5173`

**Problema**: `VITE_API_URL` não está funcionando  
**Solução**: Variáveis de ambiente Vite devem começar com `VITE_`. Reinicie o servidor dev após alterar `.env`

**Problema**: Build falha  
**Solução**: Execute `npm install` para garantir que todas as dependências estão instaladas

**Problema**: Página em branco após deployment  
**Solução**: Verifique o console do navegador para erros. Certifique-se de que `VITE_API_URL` aponta para a URL correta do backend

---

## Próximos Passos para Produção

- [ ] Adicionar autenticação (tokens JWT)
- [ ] Implementar edição de tarefas (endpoint PATCH)
- [ ] Implementar exclusão de tarefas (endpoint DELETE)
- [ ] Adicionar filtragem e busca de tarefas
- [ ] Adicionar paginação para listas grandes de tarefas
- [ ] Adicionar animações (Framer Motion)
- [ ] Implementar atualizações otimistas de UI
- [ ] Adicionar toggle de modo escuro
- [ ] Configurar testes E2E (Playwright/Cypress)
- [ ] Adicionar suporte PWA (service workers, modo offline)
- [ ] Implementar atualizações em tempo real (WebSockets)

---

## Licença

MIT
