import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

import ScrollToTop from '../components/ScrollToTop';
import CadastroPage from './CadastroPage';
import Categoria from './Categoria';
import GuiaColaborador from './GuiaColaborador';
import Home from './Home';
import LoginPage from './LoginPage';
import NotFound from './NotFound';
import Noticia from './Noticia';
import Sobre from './Sobre';

// Supondo que você tenha componentes de Layout, como Header e Footer
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Header />
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/noticias" element={<Categoria />} />
            {/* Página de categorias: Não implementada separadamente. Filtros estão na própria lista de notícias. */}
            <Route path="/categorias" element={<Categoria />} />
            {/* Bug corrigido: a rota deve ser /noticias/:id para corresponder ao CardNoticia.tsx */}
            <Route path="/noticias/:id" element={<Noticia />} />
            <Route path="/guia-colaborador" element={<GuiaColaborador />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            {/* Rota de catch-all para páginas não encontradas (404) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;