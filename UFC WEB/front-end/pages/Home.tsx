
import React from 'react';
import { Link } from 'react-router-dom';
import bannerUFC from '../assets/colorido-vertical-ufc.png';
import CardNoticia from '../components/CardNoticia';
import { useNoticias } from '../hooks/useNoticias';

const Home: React.FC = () => {
  const { getRecentes, loading } = useNoticias();
  const ultimasNoticias = getRecentes(4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-orange-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-emerald-900/50 to-amber-900/70"></div>
        
        <div className="relative container mx-auto px-6 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-white space-y-6 flex-1">
            <p className="text-amber-400 font-bold tracking-widest uppercase text-sm">
              Ensino • Pesquisa • Extensão
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight drop-shadow-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Fique por dentro do que acontece na UFC
            </h2>
            <p className="text-lg text-blue-100 font-light drop-shadow-md">
              Acompanhe as últimas descobertas científicas, eventos culturais e informes administrativos em um só lugar.
            </p>
            <div className="pt-4">
              <Link
                to="/noticias"
                className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:from-amber-300 hover:to-orange-400 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl border-2 border-white/20"
              >
                Ver últimas notícias
              </Link>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center md:justify-end">
            <img 
              src={bannerUFC} 
              alt="Universidade Federal do Ceará" 
              className="max-h-[400px] w-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Seção Últimas Notícias */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 border-l-8 border-indigo-600 pl-4">
            Destaques Recentes
          </h2>
          <Link to="/noticias" className="text-indigo-600 font-medium hover:underline hidden sm:block">
            Ver todas as notícias →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-gray-200 animate-pulse h-80 rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ultimasNoticias.map((noticia) => (
              <CardNoticia key={noticia.id} {...noticia} />
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="max-w-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quer colaborar com o portal?</h3>
          <p className="text-gray-600 italic">"A comunicação acadêmica é o combustível da ciência pública."</p>
          <p className="text-gray-500 mt-4 text-sm">Alunos, professores e técnicos podem enviar sugestões de pauta e artigos de opinião para a nossa redação central.</p>
        </div>
        <Link to="/sobre" className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-200 transition-colors">
          Saiba como publicar
        </Link>
      </section>
    </div>
  );
};

export default Home;
