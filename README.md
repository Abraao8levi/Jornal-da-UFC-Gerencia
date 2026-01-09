# Jornal da UFC

Portal de notícias da Universidade Federal do Ceará (UFC) para publicação, consulta e interação entre alunos, docentes e funcionários.

## Descrição

O projeto fornece uma plataforma simples e responsiva para criação e leitura de notícias acadêmicas e institucionais. Usuários autorizados podem publicar notícias; todo o conteúdo é apresentado com foco na clareza e na acessibilidade para a comunidade universitária.

## Principais Funcionalidades

- Publicação e edição de notícias (backend).
- Listagem e visualização por categoria (frontend).
- Sistema de aprovação de notícias para editores.
- Autenticação e autorização básicas.
- Integração com banco de dados para persistência (Supabase).

## Stack Tecnológica

- **Backend**: Node.js + Express + Supabase
- **Frontend**: React + Vite + TypeScript
- **Banco de dados**: Supabase (Postgres gerenciado)

## Estrutura do Repositório

- `UFC WEB/back-end/`: API Node.js, rotas, controladores e modelos.
- `UFC WEB/front-end/`: Aplicação React com páginas, componentes e serviços.

## Instalação

1. **Clonar o repositório**:
   ```
   git clone <url-do-repositorio>
   ```

2. **Configurar Supabase**:
   - Crie um projeto no [Supabase](https://supabase.com).
   - Execute o script SQL em `UFC WEB/supabase_setup.sql` no SQL Editor do Supabase para criar a tabela e inserir dados de exemplo.

3. **Backend**:
   - Entrar em `UFC WEB/back-end/` e instalar dependências:
     ```
     npm install
     ```
   - Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais do Supabase:
     ```
     SUPABASE_URL=your_supabase_project_url
     SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
     PORT=3000
     ```
   - Executar servidor:
     ```
     npm run dev
     ```

4. **Frontend**:
   - Entrar em `UFC WEB/front-end/` e instalar dependências:
     ```
     npm install
     ```
   - Executar em modo de desenvolvimento:
     ```
     npm run dev
     ```

## Configuração do Banco

Para desenvolvimento local, o projeto inclui suporte a SQLite. Em produção, recomenda-se usar Supabase/Postgres — configure as credenciais via variáveis de ambiente conforme `UFC WEB/back-end/src/config/database.js`.

## Contribuição

Contribuições são bem-vindas. Abra uma issue para discutir mudanças maiores e envie pull requests claros com descrições e testes quando aplicável.
