
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Categoria from '../pages/Categoria';
import Noticia from '../pages/Noticia';
import Sobre from '../pages/Sobre';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/noticias" element={<Categoria />} />
      <Route path="/noticias/:id" element={<Noticia />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  );
};

export default AppRoutes;
