# Jornal da UFC - Sistema de Gerenciamento de Notícias

## Como fazer login como Editor/Admin

### 1. Acesse a página de login
- Vá para: `http://localhost:5174/login`

### 2. Criar uma conta (primeiro acesso)
- Clique em "Criar nova conta" ou vá para `/cadastro`
- Preencha os dados:
  - Nome completo
  - Email (ex: editor@ufc.br)
  - Função (Editor ou Administrador)
  - Senha (mínimo 6 caracteres)
  - Confirme a senha

### 3. Fazer login
- Use as credenciais criadas
- Ou use contas de teste criadas no Supabase

### 4. Página de Administração
Após o login, você será redirecionado para `/admin` onde poderá:

- **Visualizar notícias pendentes**: Lista todas as notícias aguardando aprovação
- **Aprovar notícias**: Clique no botão ✅ Aprovar
- **Rejeitar notícias**: Clique no botão ❌ Rejeitar
- **Sair**: Clique no botão "Sair" no topo da página

## Funcionalidades do Sistema

### Para Editores:
- Visualizar lista de notícias pendentes
- Aprovar ou rejeitar notícias
- Acesso restrito ao painel administrativo

### Para Administradores:
- Todas as permissões de editor
- Possibilidade de gerenciar usuários (futuro)

### Para o Público:
- Visualizar apenas notícias aprovadas
- Navegar por categorias
- Ler notícias completas

## Configuração do Supabase

### 1. Criar conta no Supabase
- Acesse: https://supabase.com
- Crie um novo projeto

### 2. Configurar Autenticação
- No painel do Supabase, vá para Authentication > Settings
- Configure as opções desejadas

### 3. Criar tabela de notícias
Execute este SQL no SQL Editor do Supabase:

```sql
CREATE TABLE IF NOT EXISTS noticias (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  resumo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  data DATE NOT NULL,
  autor TEXT NOT NULL,
  imagem TEXT,
  campus TEXT,
  status TEXT NOT NULL DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'pendente', 'aprovado', 'rejeitado'))
);
```

### 4. Inserir dados de exemplo
```sql
-- Notícias aprovadas
INSERT INTO noticias (titulo, resumo, conteudo, categoria, data, autor, campus, status) VALUES
('UFC é destaque em ranking internacional de sustentabilidade', 'A UFC alcançou posição de destaque no UI GreenMetric.', 'Conteúdo completo...', 'Institucional', '2025-10-22', 'Coordenadoria de Comunicação', 'Pici', 'aprovado');

-- Notícias pendentes
INSERT INTO noticias (titulo, resumo, conteudo, categoria, data, autor, campus, status) VALUES
('Novo curso de IA é lançado', 'A UFC oferece novo mestrado em Inteligência Artificial.', 'Conteúdo completo...', 'Pesquisa', '2025-12-10', 'Prof. João Silva', 'Pici', 'pendente');
```

## Executar o Projeto

### Backend:
```bash
cd "UFC WEB/back-end"
npm install
npm run dev
```

### Frontend:
```bash
cd "UFC WEB/front-end"
npm install
npm run dev
```

## URLs Importantes

- **Frontend**: http://localhost:5174
- **Página de Login**: http://localhost:5174/login
- **Cadastro**: http://localhost:5174/cadastro
- **Admin**: http://localhost:5174/admin (requer login)
- **Backend API**: http://localhost:3002

## Resolução de Problemas

### Erro de autenticação:
- Verifique se o usuário confirmou o email
- Certifique-se de que as chaves do Supabase estão corretas

### Notícias não aparecem:
- Verifique se a tabela foi criada corretamente
- Confirme que há notícias com status 'aprovado' para o público
- Para admin, verifique se há notícias com status 'pendente'

### Erro de CORS:
- O backend está configurado para aceitar requisições do frontend
- Verifique se as portas estão corretas (5174 para frontend, 3002 para backend)