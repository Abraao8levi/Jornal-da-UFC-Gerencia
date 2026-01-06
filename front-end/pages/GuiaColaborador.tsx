import React from 'react';

const GuiaColaborador: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 md:px-12 space-y-16 bg-gray-50/50">
      
      {/* Header */}
      <header className="text-center space-y-6">
        <div className="inline-block p-3 rounded-2xl bg-blue-100 text-[#002B5C] mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-[#002B5C] tracking-tight">
          Guia do <span className="text-[#C89214]">Colaborador</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Ajude a construir o Jornal da UFC. Sua contribuição é fundamental para mantermos a comunidade informada.
        </p>
      </header>

      {/* Intro & Code of Conduct */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">👋 Bem-vindo!</h2>
            <p className="text-gray-600 leading-relaxed">
                Este é um portal acadêmico de notícias da Universidade Federal do Ceará (UFC). 
                Este guia tem como objetivo orientar você sobre como pode participar e colaborar com o desenvolvimento do projeto.
            </p>
        </div>
        <div className="bg-[#002B5C] p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4 text-[#C89214]">🤝 Código de Conduta</h2>
                <p className="text-blue-100 leading-relaxed mb-6">
                    Para garantir que a nossa comunidade seja acolhedora e inclusiva para todos, esperamos que os colaboradores sigam nossas diretrizes de respeito e colaboração.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-white hover:text-[#C89214] transition-colors cursor-pointer">
                    Ler código completo &rarr;
                </span>
            </div>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#C89214] rounded-full opacity-20 blur-2xl"></div>
        </div>
      </section>

      {/* How to Contribute */}
      <section>
        <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-2 bg-[#C89214] rounded-full"></div>
            <h2 className="text-3xl font-black text-gray-900">Como Contribuir</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { title: "Notícias", icon: "📰", desc: "Mantenha o portal atualizado com conteúdo relevante." },
                { title: "Bugs", icon: "🐛", desc: "Reporte problemas e comportamentos inesperados." },
                { title: "Melhorias", icon: "💡", desc: "Sugira novas funcionalidades e ideias." },
                { title: "Código", icon: "💻", desc: "Desenvolva novas features e correções." }
            ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-bold text-lg text-[#002B5C] mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Adding Content */}
      <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-black text-[#002B5C] mb-4">Adicionando Notícias</h2>
                <p className="text-gray-600">
                    Para adicionar uma nova notícia, você deve editar o arquivo <code className="bg-gray-100 px-2 py-1 rounded text-[#C89214] font-mono text-sm">services/api.ts</code>.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-gray-900">1. Estrutura do Objeto</h3>
                <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto shadow-inner">
                    <pre className="text-sm font-mono text-blue-300">
{`export interface Noticia {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  data: string; // AAAA-MM-DD
  autor: string;
  imagem: string;
  campus?: string;
}`}
                    </pre>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-gray-900">2. Exemplo Prático</h3>
                <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto shadow-inner">
                    <pre className="text-sm font-mono text-green-300">
{`{
  id: 7,
  titulo: "UFC lança nova versão do Guia de Fontes para imprensa",
  resumo: "Ferramenta on-line visa auxiliar profissionais de imprensa na busca por fontes qualificadas na universidade.",
  conteudo: "A Coordenadoria de Comunicação e Marketing (UFC Informa) da Universidade Federal do Ceará lançou, nesta quinta-feira (8), a nova versão do Guia de Fontes. Trata-se de uma ferramenta on-line cujo objetivo é auxiliar profissionais de imprensa na busca por fontes qualificadas de informação...",
  categoria: "Institucional",
  data: "2025-12-08",
  autor: "UFC Informa",
  imagem: "/assets/guia-fontes.jpg",
  campus: "Benfica"
}`}
                    </pre>
                </div>
            </div>
        </div>
      </section>

      {/* Setup & Process */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#002B5C]">🛠️ Configuração</h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#002B5C] rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                        <h4 className="font-bold text-gray-900">Clone o Repositório</h4>
                        <code className="block mt-2 bg-gray-50 p-3 rounded-lg text-xs font-mono text-gray-600 break-all">
                            git clone https://github.com/SEU-USER/Jornal-da-UFC-.git
                        </code>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#002B5C] rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                        <h4 className="font-bold text-gray-900">Instale & Execute</h4>
                        <code className="block mt-2 bg-gray-50 p-3 rounded-lg text-xs font-mono text-gray-600">
                            npm install && npm run dev
                        </code>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#002B5C]">🚀 Pull Request</h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
                <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-gray-600 text-sm">Crie uma branch: <code className="text-[#C89214]">feature/nova-noticia</code></span>
                    </li>
                    <li className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-gray-600 text-sm">Faça seus commits com mensagens claras.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-gray-600 text-sm">Abra um PR no repositório principal.</span>
                    </li>
                </ul>
            </div>
        </div>
      </section>

    </div>
  );
};

export default GuiaColaborador;