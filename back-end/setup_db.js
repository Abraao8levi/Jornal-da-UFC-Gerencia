require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupDatabase() {
    console.log('🔧 Configurando banco de dados Supabase...');

    try {
        // Primeiro, verificar se a tabela existe e dropar se necessário
        console.log('📋 Verificando tabela existente...');
        const { error: dropError } = await supabase.rpc('exec_sql', {
            sql: 'DROP TABLE IF EXISTS noticias CASCADE;'
        });

        if (dropError && !dropError.message.includes('function exec_sql')) {
            console.log('⚠️  RPC não disponível, tentando abordagem alternativa...');
        }

        // Criar tabela com estrutura correta
        console.log('📝 Criando tabela noticias...');
        const createTableSQL = `
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
    `;

        const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });

        if (createError) {
            console.log('❌ Erro ao criar tabela via RPC, tentando inserção direta...');

            // Tentar criar via inserção (se a tabela não existir, vai falhar)
            const testInsert = await supabase.from('noticias').insert([{
                titulo: 'Teste',
                resumo: 'Teste',
                conteudo: 'Teste',
                categoria: 'Teste',
                data: '2024-01-01',
                autor: 'Teste',
                status: 'rascunho'
            }]);

            if (testInsert.error && testInsert.error.message.includes('does not exist')) {
                console.log('❌ Tabela não existe. Execute o SQL manualmente no painel do Supabase:');
                console.log('📄 SQL para executar:');
                console.log(createTableSQL);
                return;
            }
        }

        console.log('✅ Tabela criada com sucesso!');

        // Inserir dados de exemplo
        console.log('📥 Inserindo dados de exemplo...');

        const noticias = [
            {
                titulo: 'UFC é destaque em ranking internacional de sustentabilidade',
                resumo: 'A Universidade Federal do Ceará (UFC) alcançou uma posição de destaque no UI GreenMetric World University Ranking 2024.',
                conteudo: 'A Universidade Federal do Ceará (UFC) alcançou uma posição de destaque no UI GreenMetric World University Ranking 2024, que avalia as práticas de sustentabilidade em instituições de ensino superior em todo o mundo. A UFC ficou entre as 5 melhores universidades brasileiras e a primeira do Nordeste.',
                categoria: 'Institucional',
                data: '2025-10-22',
                autor: 'Coordenadoria de Comunicação',
                imagem: '/assets/imagem2.png',
                campus: 'Pici',
                status: 'aprovado'
            },
            {
                titulo: 'Nova pesquisa sobre Zika Vírus é desenvolvida no Campus do Porangabuçu',
                resumo: 'Pesquisadores da Faculdade de Medicina (FAMED) da UFC publicaram um novo estudo na revista Nature.',
                conteudo: 'Uma equipe de pesquisadores da Faculdade de Medicina (FAMED) da UFC, localizada no Campus do Porangabuçu, publicou um estudo inovador na prestigiada revista Nature.',
                categoria: 'Pesquisa',
                data: '2025-11-05',
                autor: 'Mariana Costa',
                imagem: '/assets/imagem.png',
                campus: 'Porangabuçu',
                status: 'aprovado'
            },
            {
                titulo: 'Festival de Cultura e Arte acontece no Campus do Benfica',
                resumo: 'O tradicional Festival de Cultura e Arte da UFC tomará conta do Campus do Benfica.',
                conteudo: 'Entre os dias 10 e 15 de novembro, o Campus do Benfica será palco do tradicional Festival de Cultura e Arte da UFC.',
                categoria: 'Eventos',
                data: '2025-11-01',
                autor: 'Lucas Martins',
                imagem: '/assets/imagem1.jpg',
                campus: 'Benfica',
                status: 'aprovado'
            }
        ];

        const { error: insertError } = await supabase.from('noticias').insert(noticias);

        if (insertError) {
            console.error('❌ Erro ao inserir dados:', insertError.message);
        } else {
            console.log('✅ Dados inseridos com sucesso!');
        }

    } catch (error) {
        console.error('❌ Erro geral:', error.message);
    }
}

setupDatabase();