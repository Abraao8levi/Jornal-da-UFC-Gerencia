
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-indigo-900 text-white py-8 border-b-4 border-indigo-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
              Jornal da UFC
            </h1>
            <p className="mt-2 text-indigo-200 text-sm md:text-base font-light">
              Portal acadêmico de notícias da Universidade Federal do Ceará
            </p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-col items-end gap-2">
             <div className="px-4 py-2 border border-indigo-400 rounded-full text-xs font-medium uppercase tracking-widest text-indigo-200">
                Ensino • Pesquisa • Extensão
             </div>
             <div className="flex items-center gap-3 text-xs font-bold tracking-wider pr-1">
                <Link to="/login" className="text-indigo-300 hover:text-amber-400 transition-colors uppercase">Login</Link>
                <span className="text-indigo-600">|</span>
                <Link to="/cadastro" className="text-indigo-300 hover:text-amber-400 transition-colors uppercase">Cadastre-se</Link>
             </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden" id="mobile-menu">
            <div className="px-2 pt-4 pb-3 space-y-1 sm:px-3 border-t border-indigo-700 mt-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-indigo-200 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-center">Login</Link>
              <Link to="/cadastro" onClick={() => setIsMenuOpen(false)} className="text-indigo-200 hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-center">Cadastre-se</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
