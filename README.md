# Jornal da UFC

Portal de notícias da Universidade Federal do Ceará (UFC) para publicação, consulta e interação entre alunos, docentes e funcionários.

**Descrição**

O projeto fornece uma plataforma simples e responsiva para criação e leitura de notícias acadêmicas e institucionais. Usuários autorizados podem publicar notícias; todo o conteúdo é apresentado com foco na clareza e na acessibilidade para a comunidade universitária.

**Principais funcionalidades**

- Publicação e edição de notícias (backend).
- Listagem e visualização por categoria (frontend).
- Autenticação e autorização básicas.
- Integração com banco de dados para persistência (Supabase / SQLite).

**Stack tecnológica**

- Backend: Node.js (JavaScript/TypeScript)
- Frontend: React + Vite + Tailwind CSS
- Banco de dados: Supabase (Postgres gerenciado) e SQLite (local/desenvolvimento)
- Deploy recomendado: Vercel (frontend) / provider Node (backend) ou adaptável ao ambiente escolhido

**Estrutura do repositório (resumo)**

- `UFC WEB/back-end/`: API Node.js, rotas, controladores e modelos.
- `UFC WEB/front-end/`: Aplicação React com páginas, componentes e serviços.

**Instalação (resumo rápido)**

1. Clonar o repositório:

	 git clone <url-do-repositorio>

2. Backend:

	 - Entrar em `UFC WEB/back-end/` e instalar dependências:

		 npm install

	 - Configurar variáveis de ambiente (conexão com banco, JWT, etc.).

	 - Executar servidor:

		 npm start

3. Frontend:

	 - Entrar em `UFC WEB/front-end/` e instalar dependências:

		 npm install

	 - Executar em modo de desenvolvimento:

		 npm run dev

**Configuração do banco**

Para desenvolvimento local, o projeto inclui suporte a SQLite. Em produção, recomenda-se usar Supabase/Postgres — configure as credenciais via variáveis de ambiente conforme `UFC WEB/back-end/src/config/database.js`.

**Contribuição**

Contribuições são bem-vindas. Abra uma issue para discutir mudanças maiores e envie pull requests claros com descrições e testes quando aplicável.

**Licença**

Indique aqui a licença do projeto (por exemplo, MIT) ou remova esta seção se não for aplicável.

---

Se quiser, eu posso: gerar um arquivo de configuração `.env.example`, adicionar instruções de deploy detalhadas ou criar um guia de contribuição mais completo.

