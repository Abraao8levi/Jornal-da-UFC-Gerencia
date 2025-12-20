
import React from 'react';
import { Link } from 'react-router-dom';

interface CardNoticiaProps {
  id: number;
  titulo: string;
  resumo: string;
  categoria: string;
  data: string;
  imagem?: string;
}

const CardNoticia: React.FC<CardNoticiaProps> = ({ id, titulo, resumo, categoria, data, imagem }) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Eventos': return 'bg-purple-100 text-purple-700';
      case 'Pesquisa': return 'bg-blue-100 text-blue-700';
      case 'Avisos': return 'bg-amber-100 text-amber-700';
      case 'Extensão': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full group">
      {imagem && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imagem} 
            alt={titulo} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(categoria)}`}>
            {categoria}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {formatDate(data)}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 leading-snug group-hover:text-indigo-700 transition-colors">
          {titulo}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
          {resumo}
        </p>
        <Link
          to={`/noticias/${id}`}
          className="mt-auto inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group"
        >
          Ler mais
          <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CardNoticia;
