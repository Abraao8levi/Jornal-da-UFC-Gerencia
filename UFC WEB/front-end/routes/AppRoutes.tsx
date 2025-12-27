
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CadastroPage from '../pages/CadastroPage';
import Categoria from '../pages/Categoria';
import GuiaColaborador from '../pages/GuiaColaborador';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import Noticia from '../pages/Noticia';
import Sobre from '../pages/Sobre';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/noticias" element={<Categoria />} />
      {/* Página de categorias: Não implementada separadamente. Filtros estão na própria lista de notícias. */}
      <Route path="/categorias" element={<Categoria />} />
      <Route path="/noticias/:id" element={<Noticia />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/guia-colaborador" element={<GuiaColaborador />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
    </Routes>
  ); 
};

export default AppRoutes;
