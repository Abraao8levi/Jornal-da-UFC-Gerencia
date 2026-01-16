# DOCUMENTAÇÃO FINAL - Jornal da UFC

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura do Projeto](#arquitetura-do-projeto)
3. [Stack Tecnológica](#stack-tecnológica)
4. [Estrutura de Diretórios](#estrutura-de-diretórios)
5. [Guia de Instalação](#guia-de-instalação)
6. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
7. [API Backend](#api-backend)
8. [Frontend - Interface do Usuário](#frontend---interface-do-usuário)
9. [Autenticação e Autorização](#autenticação-e-autorização)
10. [Funcionalidades Principais](#funcionalidades-principais)
11. [Guia do Usuário](#guia-do-usuário)
12. [Troubleshooting](#troubleshooting)
13. [Contribuição e Desenvolvimento](#contribuição-e-desenvolvimento)

---

## Visão Geral

**Jornal da UFC** é um portal de notícias institucional desenvolvido para a Universidade Federal do Ceará. O sistema permite que diferentes usuários (editores, administradores e público geral) interajam com conteúdo noticioso de forma segura e organizada.

### Objetivos Principais
- ✅ Centralizar informações acadêmicas e institucionais
- ✅ Facilitar a publicação controlada de notícias
- ✅ Implementar sistema de aprovação por editores
- ✅ Prover interface responsiva e intuitiva
- ✅ Garantir segurança através de autenticação

### Público-Alvo
- **Editores**: Criam e enviam notícias para aprovação
- **Administradores**: Aprovam/rejeitam notícias e gerenciam conteúdo
- **Comunidade UFC**: Consulta notícias aprovadas organizadas por categoria

---

## Arquitetura do Projeto

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React/Vite)             │
│  ┌─────────────────────────────────────────────┐   │
│  │  Páginas: Home, Notícias, Login, Admin      │   │
│  │  Componentes: Card, Header, Footer, etc.    │   │
│  │  Serviços: API Client, Supabase             │   │
│  └─────────────────────────────────────────────┘   │
│                        ↓ HTTP                       │
├─────────────────────────────────────────────────────┤
│  Backend (Express.js/Node.js)                       │
│  ┌──────────────────────────────────────────────┐  │
│  │ Rotas: /api/noticias, /api/auth             │  │
│  │ Controladores: AuthController, NotíciaCtrl  │  │
│  │ Middlewares: Autenticação, Validação        │  │
│  │ Modelos: Noticia, Usuário                   │  │
│  └──────────────────────────────────────────────┘  │
│                        ↓ REST API                   │
├─────────────────────────────────────────────────────┤
│               Banco de Dados (Supabase/PostgreSQL)  │
│  ┌──────────────────────────────────────────────┐  │
│  │ Tabelas: noticias, usuários, categorias      │  │
│  │ Autenticação: JWT via Supabase               │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## Stack Tecnológica

### Backend
| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| Node.js | 18+ | Runtime JavaScript |
| Express.js | 4.18.2 | Framework Web |
| Supabase | 2.39.0 | BaaS (Backend as a Service) |
| CORS | 2.8.5 | Controle de origem |
| Dotenv | 17.2.3 | Variáveis de ambiente |
| Nodemon | 3.0.2 | Hot-reload em desenvolvimento |

### Frontend
| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| React | 19.2.3 | Interface de usuário |
| Vite | 6.2.0 | Build tool e dev server |
| TypeScript | 5.8.2 | Tipagem estática |
| React Router | 7.11.0 | Roteamento |
| Supabase | 2.89.0 | Cliente do banco/auth |

### Database
| Componente | Função |
|-----------|--------|
| PostgreSQL | SGBD relacional |
| Supabase | Gerenciamento e autenticação |

---

## Estrutura de Diretórios

```
UFC WEB/
├── back-end/
│   ├── server.js                      # Entrada principal
│   ├── package.json                   # Dependências
│   ├── .env.example                   # Variáveis de exemplo
│   └── src/
│       ├── app.js                     # Aplicação Express
│       ├── config/
│       │   └── database.js            # Configuração Supabase
│       ├── controllers/
│       │   ├── authController.js      # Lógica de autenticação
│       │   └── noticiaController.js   # Lógica de notícias
│       ├── middlewares/
│       │   └── authMiddleware.js      # Proteção de rotas
│       ├── models/
│       │   └── Noticia.js             # Estrutura de dados
│       └── routes/
│           ├── authRoutes.js          # Endpoints de auth
│           └── noticiaRoutes.js       # Endpoints de notícias
│
├── front-end/
│   ├── index.html                     # HTML raiz
│   ├── index.tsx                      # Entrada React
│   ├── App.tsx                        # Componente raiz
│   ├── package.json                   # Dependências
│   ├── vite.config.ts                 # Config do Vite
│   ├── tsconfig.json                  # Config TypeScript
│   ├── assets/                        # Imagens e recursos
│   ├── components/
│   │   ├── CardNoticia.tsx            # Card de notícia
│   │   ├── Header.tsx                 # Cabeçalho
│   │   ├── Footer.tsx                 # Rodapé
│   │   ├── Navbar.tsx                 # Navegação
│   │   ├── Comentario.tsx             # Comentários
│   │   └── ScrollToTop.tsx            # Scroll automático
│   ├── pages/
│   │   ├── Home.tsx                   # Página inicial
│   │   ├── LoginPage.tsx              # Login
│   │   ├── CadastroPage.tsx           # Registro
│   │   ├── Noticia.tsx                # Detalhe notícia
│   │   ├── Categoria.tsx              # Notícias por categoria
│   │   ├── GuiaColaborador.tsx        # Guia para editores
│   │   ├── Sobre.tsx                  # Sobre o portal
│   │   └── NotFound.tsx               # Página 404
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AdminPage.tsx          # Painel administrativo
│   │   │   └── EditorPage.tsx         # Painel do editor
│   │   └── services/
│   │       └── supabase.ts            # Cliente Supabase
│   ├── services/
│   │   └── api.ts                     # Cliente HTTP (Axios)
│   ├── hooks/
│   │   └── useNoticias.ts             # Hook para notícias
│   ├── contexts/                      # Context API (se usado)
│   ├── routes/
│   │   └── AppRoutes.tsx              # Definição de rotas
│   └── styles/
│       ├── globals.css                # Estilos globais
│       └── index.css                  # Estilos da entrada
│
└── supabase_setup.sql                 # Script inicial do BD
```

---

## Guia de Instalação

### Pré-requisitos
- Node.js 18 ou superior
- npm ou yarn
- Conta no [Supabase](https://supabase.com)
- Git

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/Abraao8levi/Jornal-da-UFC-Gerencia.git
cd "Jornal-da-UFC-"
```

### Passo 2: Configurar Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. Copie as credenciais:
   - **Project URL** (SUPABASE_URL)
   - **Service Role Key** (SUPABASE_SERVICE_ROLE_KEY)
3. Navegue até **SQL Editor** no dashboard
4. Execute o conteúdo do arquivo `supabase_setup.sql`

```sql
-- Script SQL para criar tabelas e índices
-- Ver arquivo supabase_setup.sql para detalhes completos
```

### Passo 3: Instalar e Configurar Backend

```bash
cd "UFC WEB/back-end"
npm install
```

Crie arquivo `.env`:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
PORT=3000
NODE_ENV=development
```

Inicie o servidor:
```bash
npm run dev
```

Servidor rodará em: `http://localhost:3000`

### Passo 4: Instalar e Configurar Frontend

```bash
cd "UFC WEB/front-end"
npm install
```

Configure variáveis de ambiente no arquivo `.env`:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

Inicie o desenvolvimento:
```bash
npm run dev
```

Frontend rodará em: `http://localhost:5174`

### Passo 5: Build para Produção

**Backend:**
```bash
cd "UFC WEB/back-end"
npm run start
```

**Frontend:**
```bash
cd "UFC WEB/front-end"
npm run build
# Arquivos em: dist/
```

---

## Configuração do Banco de Dados

### Schema das Tabelas

#### Tabela: `noticias`
```sql
CREATE TABLE noticias (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    resumo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    autor VARCHAR(255) NOT NULL,
    imagem TEXT,
    campus VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'rascunho' 
        CHECK (status IN ('rascunho', 'pendente', 'aprovado', 'rejeitado')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_noticias_status ON noticias(status);
CREATE INDEX idx_noticias_categoria ON noticias(categoria);
CREATE INDEX idx_noticias_data ON noticias(data DESC);
```

#### Campos Principais

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT | Identificador único |
| `titulo` | VARCHAR(255) | Título da notícia |
| `resumo` | TEXT | Resumo/lead da notícia |
| `conteudo` | TEXT | Corpo completo da notícia |
| `categoria` | VARCHAR(100) | Categoria (Ensino, Pesquisa, Extensão, etc.) |
| `data` | DATE | Data de publicação |
| `autor` | VARCHAR(255) | Autor da notícia |
| `imagem` | TEXT | URL da imagem |
| `campus` | VARCHAR(100) | Campus da UFC |
| `status` | VARCHAR(20) | Estado: rascunho, pendente, aprovado, rejeitado |

### Categorias Suportadas
- Ensino
- Pesquisa
- Extensão
- Institucional
- Eventos
- Oportunidades

### Estados de Uma Notícia
1. **Rascunho** - Criada mas não enviada
2. **Pendente** - Aguardando aprovação do editor
3. **Aprovado** - Publicada e visível para todos
4. **Rejeitado** - Recusada pelo editor

---

## API Backend

### Configuração Inicial

```javascript
// src/config/database.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;
```

### Endpoints da API

#### Autenticação

**POST** `/api/auth/registro`
- Cria nova conta de usuário
- Body: `{ email, password, nome, funcao }`
- Retorna: `{ user, session }`

**POST** `/api/auth/login`
- Autentica usuário existente
- Body: `{ email, password }`
- Retorna: `{ user, session, token }`

**POST** `/api/auth/logout`
- Encerra sessão do usuário
- Requer: Bearer token
- Retorna: `{ success: true }`

#### Notícias

**GET** `/api/noticias`
- Lista todas as notícias aprovadas
- Query params: `?categoria=Ensino&limit=10&offset=0`
- Retorna: `[ { id, titulo, resumo, ... }, ... ]`

**GET** `/api/noticias/:id`
- Obtém detalhes completos de uma notícia
- Retorna: `{ id, titulo, resumo, conteudo, ... }`

**GET** `/api/noticias/pendentes` (Requer autenticação)
- Lista notícias aguardando aprovação
- Requer: Bearer token + função Editor/Admin
- Retorna: `[ { id, titulo, status, ... }, ... ]`

**POST** `/api/noticias` (Requer autenticação)
- Cria nova notícia (salva como pendente)
- Body: `{ titulo, resumo, conteudo, categoria, autor, campus, imagem }`
- Retorna: `{ id, ... }`

**PUT** `/api/noticias/:id` (Requer autenticação)
- Atualiza uma notícia
- Body: `{ titulo, resumo, conteudo, ... }`
- Requer: Ser autor ou admin
- Retorna: `{ id, ... }`

**PATCH** `/api/noticias/:id/aprovar` (Requer autenticação + Admin)
- Aprova uma notícia pendente
- Retorna: `{ status: 'aprovado' }`

**PATCH** `/api/noticias/:id/rejeitar` (Requer autenticação + Admin)
- Rejeita uma notícia
- Body: `{ motivo?: string }`
- Retorna: `{ status: 'rejeitado' }`

**DELETE** `/api/noticias/:id` (Requer autenticação + Admin)
- Remove uma notícia
- Retorna: `{ success: true }`

#### Health Check

**GET** `/health`
- Verifica se o backend está funcionando
- Retorna: `{ status: 'OK', message: 'Backend funcionando com Supabase' }`

### Exemplo de Uso (cURL)

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"editor@ufc.br","password":"senha123"}'

# Listar notícias aprovadas
curl http://localhost:3000/api/noticias

# Criar notícia (com token)
curl -X POST http://localhost:3000/api/noticias \
  -H "Authorization: Bearer seu_token_jwt" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo":"Nova Descoberta",
    "resumo":"...",
    "conteudo":"...",
    "categoria":"Pesquisa",
    "autor":"Prof. Silva",
    "campus":"Pici"
  }'

# Aprovar notícia (só admin)
curl -X PATCH http://localhost:3000/api/noticias/5/aprovar \
  -H "Authorization: Bearer seu_token_jwt"
```

### Tratamento de Erros

Respostas de erro seguem este padrão:

```json
{
  "error": "Descricao do erro",
  "code": "ERROR_CODE",
  "status": 400
}
```

Códigos de status comuns:
- `200` - Sucesso
- `400` - Requisição inválida
- `401` - Não autenticado
- `403` - Sem permissão
- `404` - Não encontrado
- `500` - Erro do servidor

---

## Frontend - Interface do Usuário

### Estrutura de Componentes

#### Componentes Principais

**Header.tsx**
- Logo da UFC
- Links de navegação
- Acesso ao painel de admin
- Status de autenticação

**Navbar.tsx**
- Menu de categorias
- Busca de notícias
- Links rápidos

**CardNoticia.tsx**
- Exibição resumida de notícia
- Imagem, título, resumo, data
- Link para leitura completa

**Footer.tsx**
- Informações institucionais
- Links úteis
- Contatos

### Páginas Disponíveis

#### 1. Home (/)
- Hero section com banner UFC
- Últimas 4 notícias
- Call-to-action para ver todas
- Navegação para categorias

#### 2. Notícias (/noticias)
- Lista completa de notícias aprovadas
- Filtro por categoria
- Paginação
- Busca por título/conteúdo

#### 3. Categoria (/categoria/:nome)
- Notícias filtradas por categoria
- Mesmas funcionalidades da página Notícias

#### 4. Detalhes da Notícia (/noticia/:id)
- Conteúdo completo
- Metadados (autor, data, campus)
- Imagem em alta resolução
- Seção de comentários
- Links para notícias relacionadas

#### 5. Login (/login)
- Formulário de autenticação
- Link para criar conta
- Redirecionamento após login para /admin

#### 6. Cadastro (/cadastro)
- Formulário de registro
- Validação de senha
- Seleção de função (Editor/Admin)
- Verificação de email único

#### 7. Painel Admin (/admin)
- Lista de notícias pendentes
- Botões Aprovar/Rejeitar
- Histórico de aprovações
- Gerenciamento de notícias (CRUD)
- Editor visual para criar notícias

#### 8. Painel Editor (/editor)
- Criar nova notícia
- Editar rascunhos
- Ver histórico de submissões
- Status de aprovação

#### 9. Guia do Colaborador (/guia-colaborador)
- Instruções para criar notícias
- Boas práticas de redação
- Checklist pré-publicação
- FAQ

#### 10. Sobre (/sobre)
- Missão da UFC
- Objetivos do jornal
- Equipe
- Contatos

#### 11. Página 404 (/not-found)
- Página de erro amigável
- Links para voltar

### Hooks Personalizados

**useNoticias.ts**
```typescript
interface useNoticiasReturn {
    noticias: Noticia[];
    loading: boolean;
    error: Error | null;
    getRecentes: (limite: number) => Noticia[];
    getPorCategoria: (categoria: string) => Noticia[];
    buscar: (termo: string) => Noticia[];
}
```

Fornece acesso aos dados de notícias com cache automático.

### Roteamento

```typescript
// routes/AppRoutes.tsx
export const routes = [
    { path: '/', component: Home },
    { path: '/noticias', component: '/pages/App' },
    { path: '/noticia/:id', component: Noticia },
    { path: '/categoria/:nome', component: Categoria },
    { path: '/login', component: LoginPage },
    { path: '/cadastro', component: CadastroPage },
    { path: '/admin', component: AdminPage },
    { path: '/editor', component: EditorPage },
    { path: '/guia-colaborador', component: GuiaColaborador },
    { path: '/sobre', component: Sobre },
    { path: '*', component: NotFound },
];
```

### Serviços de API

**services/api.ts**
```typescript
// Cliente HTTP para requisições
const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Interceptadores automáticos de token JWT
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

**src/services/supabase.ts**
```typescript
// Cliente Supabase para autenticação
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### Estilos e Design

- **Framework CSS**: Tailwind CSS (via classes inline)
- **Responsividade**: Mobile-first, breakpoints md/lg
- **Cores da UFC**: Azul (#1B3A74), Laranja (#F4A300), Verde
- **Tipografia**: Fontes system defaults com fallbacks

---

## Autenticação e Autorização

### Fluxo de Autenticação

```
1. Usuário submete email/senha
    ↓
2. Backend valida no Supabase
    ↓
3. Supabase retorna JWT token
    ↓
4. Frontend armazena token em localStorage
    ↓
5. Futuras requisições incluem token no header
    ↓
6. Middleware valida token no backend
```

### Tipos de Usuário

#### 1. Público (Não Autenticado)
- Pode visualizar notícias aprovadas
- Pode filtrar por categoria
- Sem acesso a painel de admin

#### 2. Editor
- Pode criar notícias (salvas como pendente)
- Pode editar suas próprias notícias
- Pode visualizar status de suas submissões
- Acesso ao painel editor

#### 3. Administrador
- Todas as permissões de editor
- Pode aprovar/rejeitar notícias
- Pode editar/deletar qualquer notícia
- Acesso ao painel administrativo
- Pode gerenciar usuários (futuro)

### Middleware de Autenticação

```javascript
// src/middlewares/authMiddleware.js
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }
        
        // Verifica token com Supabase
        const { data, error } = await supabase.auth.getUser(token);
        
        if (error || !data.user) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        
        req.user = data.user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Erro na autenticação' });
    }
};
```

### Armazenamento de Token

```javascript
// Frontend - localStorage
localStorage.setItem('token', jwtToken);
localStorage.setItem('user', JSON.stringify(userData));

// Recuperação
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

// Logout
localStorage.removeItem('token');
localStorage.removeItem('user');
```

### Proteção de Rotas (Frontend)

```typescript
// Hook para proteger rotas
const ProtectedRoute = ({ children, requiredRole }: Props) => {
    const user = useAuth();
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    if (requiredRole && user.funcao !== requiredRole) {
        return <Navigate to="/" />;
    }
    
    return children;
};
```

---

## Funcionalidades Principais

### 1. Sistema de Notícias Completo

#### Criar Notícia
- Apenas usuários autenticados (Editores/Admins)
- Campos obrigatórios: Título, Resumo, Conteúdo, Categoria, Autor, Campus
- Campo opcional: Imagem
- Salva como "Pendente" até aprovação

#### Editar Notícia
- Editores podem editar suas próprias notícias
- Admins podem editar qualquer notícia
- Muda status para "Rascunho" ao editar

#### Aprovar/Rejeitar
- Apenas admins podem aprovar ou rejeitar
- Notícia aprovada fica pública imediatamente
- Notícia rejeitada volta ao status "Rejeitado"

#### Buscar e Filtrar
- Busca por título ou conteúdo
- Filtro por categoria
- Ordenação por data (recente/antigo)
- Paginação de resultados

### 2. Autenticação Segura

- Integração com Supabase Auth
- JWT tokens com expiração
- Senhas criptografadas
- Email verification (pode ser implementado)
- Recuperação de senha (futuro)

### 3. Painel Administrativo

- Dashboard com métricas:
  - Total de notícias
  - Notícias pendentes
  - Notícias aprovadas
  - Notícias rejeitadas

- Gerenciamento de notícias:
  - CRUD completo
  - Mudança de status
  - Deleção em massa

### 4. Interface Responsiva

- Funciona em Desktop, Tablet, Mobile
- Menu hamburger em dispositivos pequenos
- Imagens otimizadas
- Carregamento lazy de conteúdo

### 5. Navegação Intuitiva

- Menu principal com categorias
- Breadcrumbs em páginas de detalhe
- Links internos
- Links relacionados
- Busca global

---

## Guia do Usuário

### Para o Público (Leitura)

#### Acessar a Home
1. Abra `http://localhost:5174`
2. Veja as 4 últimas notícias em destaque
3. Clique em "Ver últimas notícias" para lista completa

#### Buscar Notícia por Categoria
1. Clique no menu "Categorias" no Navbar
2. Selecione a categoria desejada
3. Filtre por data ou busque por termo

#### Ler uma Notícia Completa
1. Clique no card de notícia
2. Leia o conteúdo completo
3. Veja metadados (autor, data, campus)
4. Acesse notícias relacionadas na lateral

### Para Editores (Criação)

#### Criar Conta
1. Acesse `/cadastro`
2. Preencha: Nome, Email, Senha
3. Selecione "Editor" como função
4. Clique em "Registrar"

#### Fazer Login
1. Acesse `/login`
2. Insira email e senha
3. Clique em "Entrar"
4. Será redirecionado para `/editor`

#### Criar Notícia
1. No painel editor, clique "Nova Notícia"
2. Preencha formulário:
   - **Título**: Breve e descritivo
   - **Resumo**: 2-3 linhas
   - **Conteúdo**: Texto completo formatado
   - **Categoria**: Selecione uma
   - **Autor**: Seu nome/departamento
   - **Campus**: Qual campus
   - **Imagem**: (opcional) Upload ou URL

3. Clique "Enviar para Aprovação"
4. Notícia entra em status "Pendente"

#### Editar Rascunho
1. No painel editor, acesse "Meus Rascunhos"
2. Clique no rascunho para editar
3. Atualize campos
4. Clique "Salvar" para rascunho ou "Enviar" para aprovação

#### Acompanhar Status
1. Acesse "Meus Artigos" no painel
2. Veja status de cada notícia:
   - ⏳ Pendente
   - ✅ Aprovado
   - ❌ Rejeitado

### Para Administradores (Aprovação)

#### Acessar Painel Admin
1. Faça login com conta Admin
2. Será redirecionado para `/admin`
3. Ou acesse diretamente o URL

#### Revisar Notícias Pendentes
1. Na seção "Notícias Pendentes", veja lista
2. Clique em uma notícia para ler completa
3. Revise conteúdo, título, imagens

#### Aprovar Notícia
1. Leia a notícia completamente
2. Clique botão **✅ Aprovar**
3. Notícia fica pública imediatamente
4. Verificação está completa

#### Rejeitar Notícia
1. Leia a notícia completamente
2. Clique botão **❌ Rejeitar**
3. (Opcional) Adicione motivo da rejeição
4. Notícia retorna ao editor com feedback

#### Gerenciar Notícias Publicadas
1. Acesse seção "Todas as Notícias"
2. Use filtros para encontrar notíciasdeterminada
3. Edite metadados conforme necessário
4. Remova notícias desatualizadas

#### Fazer Logout
1. Clique em seu nome/avatar no topo
2. Selecione "Sair"
3. Será redirecionado para Home

---

## Troubleshooting

### Backend Não Inicia

**Erro**: `Cannot find module '@supabase/supabase-js'`
```bash
# Solução: Reinstalar dependências
cd "UFC WEB/back-end"
rm -rf node_modules package-lock.json
npm install
```

**Erro**: `SUPABASE_URL not defined`
```bash
# Solução: Verificar arquivo .env
# Certifique-se que as variáveis estão definidas:
# SUPABASE_URL=...
# SUPABASE_SERVICE_ROLE_KEY=...
```

**Erro**: `Port 3000 already in use`
```bash
# Solução 1: Matar processo na porta
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows

# Solução 2: Usar porta diferente
PORT=3001 npm run dev
```

### Frontend Não Carrega

**Erro**: `VITE_SUPABASE_URL is undefined`
```bash
# Solução: Criar arquivo .env na raiz do frontend
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

**Erro**: `Connection refused to http://localhost:3000`
```bash
# Solução: Verificar se backend está rodando
# Terminal 1: Backend
cd "UFC WEB/back-end" && npm run dev

# Terminal 2: Frontend  
cd "UFC WEB/front-end" && npm run dev
```

### Problemas de Autenticação

**Erro**: `Invalid token`
```javascript
// Solução: Limpar localStorage e fazer login novamente
localStorage.clear();
window.location.href = '/login';
```

**Erro**: `Email already registered`
```bash
# Solução: Usar email diferente ou resetar conta no Supabase
# Painel Supabase > Authentication > Users > Deletar usuário
```

### Banco de Dados Não Conecta

**Erro**: `Failed to connect to database`
```bash
# Solução 1: Verificar URL do Supabase
echo $SUPABASE_URL  # Deve retornar a URL

# Solução 2: Resetar chaves de autenticação
# Dashboard Supabase > Project Settings > API Keys > Regenerate

# Solução 3: Verificar firewall/VPN
```

### Notícias Não Aparecem

**Problema**: Notícias não carregam na home
```javascript
// Debug: Abrir Console do navegador (F12)
// Verificar requisição GET /api/noticias
// Response deve ter status 200 com array de notícias

// Se retorna erro 500:
// Backend > Verificar logs do servidor
// Verificar se tabela 'noticias' existe no Supabase
```

### Imagens Não Carregam

**Problema**: Images quebradas no frontend
```javascript
// Solução: Usar URLs de imagem públicas do Supabase
// Storages > Criar bucket público "noticias"
// Upload de imagens > Retorna URL pública
// Usar essa URL no campo 'imagem' da notícia
```

---

## Contribuição e Desenvolvimento

### Configurar Ambiente de Desenvolvimento

```bash
# Clonar e preparar
git clone https://github.com/Abraao8levi/Jornal-da-UFC-Gerencia.git
cd Jornal-da-UFC-
git checkout dev  # Branch de desenvolvimento

# Instalar dependências
cd "UFC WEB/back-end" && npm install
cd "../front-end" && npm install

# Criar branches para features
git checkout -b feature/nova-funcionalidade
```

### Fluxo de Commits

```bash
# Boas práticas de commit
git add arquivo_alterado
git commit -m "tipo: descrição breve

Descrição mais detalhada da mudança se necessário.

Exemplo:
feat: adicionar página de contato
fix: corrigir validação de email
style: formatar código com Prettier
refactor: reorganizar estrutura de pastas
test: adicionar testes para authController
docs: atualizar README
"

# Push e Pull Request
git push origin feature/nova-funcionalidade
# Abrir PR no GitHub
```

### Padrões de Código

#### Backend (JavaScript/Node.js)
```javascript
// Nomes descritivos
const getUserById = async (userId) => {
    // Implementação
};

// Async/Await em vez de callbacks
try {
    const data = await supabase.from('noticias').select();
} catch (error) {
    console.error('Erro:', error);
}

// Validação de entrada
if (!email || !email.includes('@')) {
    throw new Error('Email inválido');
}
```

#### Frontend (TypeScript/React)
```typescript
// Interfaces tipadas
interface Noticia {
    id: number;
    titulo: string;
    conteudo: string;
}

// Componentes funcionais com hooks
const CardNoticia: React.FC<{ noticia: Noticia }> = ({ noticia }) => {
    const [likes, setLikes] = useState(0);
    
    return (
        <div>{noticia.titulo}</div>
    );
};

// Usar const arrow functions
const handleClick = () => {
    // ...
};
```

### Testing

#### Backend (com Jest)
```javascript
// exemplo.test.js
describe('AuthController', () => {
    test('deve registrar novo usuário', async () => {
        // Arrange
        // Act
        // Assert
    });
});

// Executar testes
npm test
```

#### Frontend (com Vitest)
```typescript
// CardNoticia.test.tsx
import { render, screen } from '@testing-library/react';
import CardNoticia from './CardNoticia';

describe('CardNoticia', () => {
    test('deve renderizar título da notícia', () => {
        const noticia = { id: 1, titulo: 'Test' };
        render(<CardNoticia noticia={noticia} />);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});
```

### Performance

#### Frontend
- Lazy load de rotas
- Code splitting com React.lazy
- Memoização de componentes
- Otimização de imagens

#### Backend
- Índices no banco de dados
- Cache com Redis (futuro)
- Paginação de resultados
- Compressão de resposta (gzip)

```javascript
// Exemplo: Paginação
const limit = 10;
const offset = (page - 1) * limit;
const data = await supabase
    .from('noticias')
    .select()
    .range(offset, offset + limit - 1);
```

### Segurança

- ✅ Validação de entrada (backend)
- ✅ SQL Injection prevention (Supabase queries)
- ✅ CORS configurado
- ✅ Autenticação JWT
- ✅ Autorização por role
- ⚠️ HTTPS em produção (implementar)
- ⚠️ Rate limiting (implementar)
- ⚠️ CSRF protection (implementar)

### Deploy

#### Opção 1: Vercel (Frontend)
```bash
# Login na Vercel
npm install -g vercel
vercel login

# Deploy
cd "UFC WEB/front-end"
vercel
```

#### Opção 2: Heroku (Backend)
```bash
# Preparar Procfile
echo "web: npm start" > Procfile

# Deploy
heroku login
heroku create meu-app
git push heroku main
```

#### Opção 3: Docker + VPS

```dockerfile
# Dockerfile (Backend)
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build e push
docker build -t jornal-ufc:latest .
docker tag jornal-ufc:latest seu-registry/jornal-ufc:latest
docker push seu-registry/jornal-ufc:latest
```

---

## Recursos Adicionais

### Documentação Oficial
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Supabase Guide](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/)

### Comunidade
- GitHub Issues: Reporte bugs
- Discussões: Sugira melhorias
- Pull Requests: Contribua com código

### Contatos
- **Repositório**: https://github.com/Abraao8levi/Jornal-da-UFC-Gerencia
- **Issues**: https://github.com/Abraao8levi/Jornal-da-UFC-Gerencia/issues
- **Discussões**: https://github.com/Abraao8levi/Jornal-da-UFC-Gerencia/discussions

---

## Histórico de Versões

| Versão | Data | Mudanças Principais |
|--------|------|-------------------|
| 1.0.0 | Jan 2026 | Release inicial com funcionalidades base |
| - | - | - |

---

## Licença

Este projeto é parte da Universidade Federal do Ceará (UFC) e está sob desenvolvimento.

---

**Documentação Criada**: 16 de janeiro de 2026
**Última Atualização**: 16 de janeiro de 2026
**Status**: Versão Final ✅

---

### Checklist de Conclusão

- ✅ Visão geral do projeto
- ✅ Arquitetura documentada
- ✅ Stack tecnológica listada
- ✅ Estrutura de diretórios explicada
- ✅ Guia de instalação completo
- ✅ Configuração do BD detalhada
- ✅ Endpoints da API documentados
- ✅ Interface Frontend explicada
- ✅ Autenticação e autorização cobertas
- ✅ Funcionalidades principais descritas
- ✅ Guia de usuário para cada tipo
- ✅ Troubleshooting incluído
- ✅ Guia de contribuição fornecido
- ✅ Links para recursos externos
- ✅ Exemplos de código inclusos

**Documentação Final Completa!** 🎉
