import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Categoria from './Categoria';
import GuiaColaborador from './GuiaColaborador';
import Home from './Home';
import Noticia from './Noticia';
import Sobre from './Sobre';
import ScrollToTop from '../components/ScrollToTop';

// Supondo que você tenha componentes de Layout, como Header e Footer
// import Header from './components/Header';
// import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      {/* <Header /> */}
      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/noticias" element={<Categoria />} />
          <Route path="/noticia/:id" element={<Noticia />} />
          <Route path="/guia-colaborador" element={<GuiaColaborador />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;