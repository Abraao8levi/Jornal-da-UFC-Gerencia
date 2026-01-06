import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 py-12">
      <div className="relative">
        <h1 className="text-9xl font-black text-gray-100">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl rotate-12 shadow-sm">
            Página não encontrada
          </span>
        </div>
      </div>
      
      <div className="max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Ops! Parece que você se perdeu no campus.</h2>
        <p className="text-gray-500">
          A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
        </p>
      </div>

      <Link 
        to="/" 
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#002B5C] text-white font-bold rounded-xl hover:bg-indigo-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Voltar para o Início
      </Link>
    </div>
  );
};

export default NotFound;