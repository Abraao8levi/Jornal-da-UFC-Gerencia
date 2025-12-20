
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNoticias } from '../hooks/useNoticias';
import { Noticia as NoticiaType } from '../services/api';
import CardNoticia from '../components/CardNoticia';

const Noticia: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { noticias, loading, getRecentes } = useNoticias();
  const [noticia, setNoticia] = useState<NoticiaType | null>(null);

  useEffect(() => {
    if (!loading) {
      const found = noticias.find(n => n.id === Number(id));
      if (found) {
        setNoticia(found);
        window.scrollTo(0, 0);
      } else {
        navigate('/noticias');
      }
    }
  }, [id, noticias, loading, navigate]);

  if (loading || !noticia) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-8">
        <div className="h-10 bg-gray-200 animate-pulse rounded w-1/4"></div>
        <div className="h-20 bg-gray-200 animate-pulse rounded w-full"></div>
        <div className="h-[400px] bg-gray-200 animate-pulse rounded-2xl w-full"></div>
      </div>
    );
  }

  const outrasNoticias = getRecentes(3).filter(n => n.id !== noticia.id);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center space-x-2">
        <Link to="/" className="hover:text-indigo-600">Início</Link>
        <span>/</span>
        <Link to="/noticias" className="hover:text-indigo-600">Notícias</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{noticia.titulo}</span>
      </nav>

      {/* Post Content */}
      <article className="space-y-8">
        <header className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
              {noticia.categoria}
            </span>
            <span className="text-gray-400 text-sm">
              {new Date(noticia.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {noticia.titulo}
          </h1>
          <div className="flex items-center space-x-4 border-y border-gray-100 py-4">
             <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
               {noticia.autor.charAt(0)}
             </div>
             <div>
               <p className="text-sm font-bold text-gray-900">{noticia.autor}</p>
               <p className="text-xs text-gray-500">Repórter do Jornal da UFC</p>
             </div>
          </div>
        </header>

        <div className="rounded-3xl overflow-hidden shadow-lg aspect-video">
          <img 
            src={noticia.imagem} 
            alt={noticia.titulo} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-indigo prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 whitespace-pre-wrap">
          {noticia.conteudo}
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
           <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Tags:</span>
           <span className="text-sm text-indigo-600 hover:underline cursor-pointer">#UFC</span>
           <span className="text-sm text-indigo-600 hover:underline cursor-pointer">#{noticia.categoria}</span>
           <span className="text-sm text-indigo-600 hover:underline cursor-pointer">#Educação</span>
        </div>
      </article>

      {/* Sugestões */}
      <section className="pt-12 border-t-2 border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Outras Notícias</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {outrasNoticias.map((item) => (
            <CardNoticia key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Noticia;
