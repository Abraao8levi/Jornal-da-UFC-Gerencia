
import { useState, useEffect, useCallback } from 'react';
import { listarNoticias, Noticia } from '../services/api';

export const useNoticias = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await listarNoticias();
      setNoticias(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const getNoticiaById = useCallback((id: number) => {
    return noticias.find(n => n.id === id);
  }, [noticias]);

  const filtrarNoticias = useCallback((categoria: string, busca: string) => {
    return noticias.filter(n => {
      const matchesCategoria = categoria === "Todos" || n.categoria === categoria;
      const matchesBusca = n.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                           n.resumo.toLowerCase().includes(busca.toLowerCase());
      return matchesCategoria && matchesBusca;
    });
  }, [noticias]);

  const getRecentes = useCallback((quantidade: number = 4) => {
    // Sort by date descending and take top N
    return [...noticias]
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
      .slice(0, quantidade);
  }, [noticias]);

  return {
    noticias,
    loading,
    getNoticiaById,
    filtrarNoticias,
    getRecentes
  };
};
