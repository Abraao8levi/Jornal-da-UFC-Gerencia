
import React from 'react';
import { Link } from 'react-router-dom';
import brasaoUFC from '../assets/colorido-vertical-ufc.png';

const Sobre: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      {/* Hero Section da Página */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-[#002B5C] py-16 px-8 md:px-16 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#C89214] rounded-full blur-[150px] opacity-20"></div>
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Nossa <span className="text-[#C89214]">História</span> & Missão
          </h1>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl font-light">
            O Jornal da UFC é a voz da Universidade Federal do Ceará, conectando a excelência acadêmica à sociedade cearense há gerações.
          </p>
        </div>
      </section>

      {/* Grid Principal: O Que É + Logotipo */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-4 bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#002B5C] via-[#C89214] to-[#002B5C]"></div>
          
          <div className="relative p-6 mb-2 transition-transform duration-500 group-hover:-translate-y-1">
            <img 
              src={brasaoUFC} 
              alt="Brasão da Universidade Federal do Ceará" 
              className="relative z-10 max-h-60 w-auto object-contain drop-shadow-lg"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/300x400?text=Brasão+UFC";
              }}
            />
          </div>
          
          <div className="space-y-4 w-full pt-4 border-t border-gray-50">
            <h3 className="text-gray-800 font-bold text-lg leading-snug"> Universidade Federal do Ceará</h3>
            <div className="space-y-1">
              <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">Identidade Institucional</span>
              <p className="font-serif text-2xl text-[#002B5C] italic">"Virtus Unita Fortior"</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-2 bg-[#C89214] rounded-full"></div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">O que é o Jornal?</h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            O Jornal da UFC funciona como o principal canal de comunicação da Universidade Federal do Ceará. 
            Nosso foco é a <strong>divulgação científica</strong>, projetos de extensão e a vibrante vida universitária. 
            Trabalhamos para traduzir a complexidade da produção acadêmica em formatos acessíveis e impactantes, 
            garantindo que o conhecimento transborde os muros dos campi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-indigo-50 rounded-2xl border-l-4 border-[#002B5C]">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm text-[#002B5C]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-black text-[#002B5C] uppercase tracking-wider text-sm mb-2">Missão</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Difundir o conhecimento produzido na UFC, fortalecendo o diálogo democrático entre a universidade e a sociedade.
              </p>
            </div>
            <div className="p-6 bg-amber-50 rounded-2xl border-l-4 border-[#C89214]">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm text-[#C89214]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="font-black text-amber-800 uppercase tracking-wider text-sm mb-2">Visão</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ser a referência absoluta em jornalismo acadêmico regional, pautada pela inovação e precisão técnica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Quem pode publicar */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-3xl font-black text-gray-900">Quem pode publicar?</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Nossa redação está aberta para <strong>professores, estudantes e servidores</strong> da UFC. 
            Acreditamos na pluralidade de vozes. Todos os materiais submetidos passam por uma rigorosa curadoria editorial 
            para assegurar a ética, a precisão dos dados e a conformidade com as diretrizes institucionais.
          </p>

          <div className="bg-amber-100/50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-left">
            <div className="bg-amber-400 p-2 rounded-full text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-amber-900 text-sm font-medium leading-snug">
              <strong>Observação Editorial:</strong> A curadoria preserva a qualidade e a reputação da universidade. Reservamo-nos o direito de sugerir edições para clareza e concisão.
            </p>
          </div>

          <div className="pt-8 flex flex-col items-center space-y-6">
            <div className="bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
               <span className="text-gray-500 text-sm">Contato Oficial:</span>
               <a href="mailto:comunicacao@ufc.br" className="ml-2 text-[#002B5C] font-black hover:underline transition-all">comunicacao@ufc.br</a>
            </div>
            
            <Link
              to="/guia-colaborador"
              aria-label="Ver Guia do Colaborador"
              className="group relative inline-flex items-center justify-center px-10 py-4 font-black text-white bg-[#002B5C] rounded-2xl overflow-hidden transition-all hover:bg-indigo-900 shadow-xl"
            >
              <span className="relative flex items-center gap-2">
                Ver Guia do Colaborador
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="pt-8 text-center">
        <div className="inline-block h-1 w-20 bg-gray-200 rounded-full mb-4"></div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Universidade Federal do Ceará — Produção e Comunicação Institucional
        </p>
      </footer>
    </div>
  );
};

export default Sobre;