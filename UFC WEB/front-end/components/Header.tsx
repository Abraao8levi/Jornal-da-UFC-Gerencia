
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-900 text-white py-8 border-b-4 border-indigo-500 shadow-lg">
      <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Jornal da <span className="text-indigo-300">UFC</span>
          </h1>
          <p className="mt-2 text-indigo-100 text-sm md:text-base font-light">
            Portal acadêmico de notícias da Universidade Federal do Ceará
          </p>
        </div>
        <div className="hidden lg:block">
           <div className="px-4 py-2 border border-indigo-400 rounded-full text-xs font-medium uppercase tracking-widest text-indigo-200">
              Ensino • Pesquisa • Extensão
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
