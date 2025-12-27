
import React, { useState } from 'react';
import CardNoticia from '../components/CardNoticia';
import { useNoticias } from '../hooks/useNoticias';
import { listarCategorias } from '../services/api';

const Categoria: React.FC = () => {
  const { filtrarNoticias, loading } = useNoticias();
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [itensVisiveis, setItensVisiveis] = useState(9);

  const categorias = listarCategorias();
  const noticiasFiltradas = filtrarNoticias(categoriaAtiva, busca);
  const noticiasExibidas = noticiasFiltradas.slice(0, itensVisiveis);

  return (
    <main className="container mx-auto px-6 py-8 space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-gray-900">Todas as Notícias</h2>
        <p className="text-gray-500 max-w-xl mx-auto">Explore os acontecimentos da nossa universidade filtrando por categoria ou pesquisando termos específicos.</p>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-none rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Pesquisar por título, assunto ou palavra-chave..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                categoriaAtiva === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-gray-200 animate-pulse h-80 rounded-xl"></div>
          ))}
        </div>
      ) : (
        <>
          {noticiasExibidas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticiasExibidas.map((noticia) => (
                <CardNoticia key={noticia.id} {...noticia} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="text-gray-300 mb-4">
                <svg className="mx-auto w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-500">Nenhuma notícia encontrada</h3>
              <p className="text-gray-400">Tente ajustar seus filtros ou termos de pesquisa.</p>
            </div>
          )}

          {noticiasFiltradas.length > itensVisiveis && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setItensVisiveis((prev) => prev + 9)}
                className="px-8 py-3 bg-white border border-indigo-200 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm"
              >
                Carregar mais notícias
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Categoria;
