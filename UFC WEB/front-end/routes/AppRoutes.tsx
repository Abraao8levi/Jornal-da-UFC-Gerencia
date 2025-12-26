
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Categoria from '../pages/Categoria';
import GuiaColaborador from '../pages/GuiaColaborador';
import Home from '../pages/Home';
import Noticia from '../pages/Noticia';
import Sobre from '../pages/Sobre';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/noticias" element={<Categoria />} />
      <Route path="/noticias/:id" element={<Noticia />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/guia-colaborador" element={<GuiaColaborador />} />
    </Routes>
  ); 
};

export default AppRoutes;
