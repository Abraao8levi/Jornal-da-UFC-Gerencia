import { useEffect, useState } from 'react';
import { Noticia, listarNoticias } from '../services/api';

export const useNoticias = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const data = await listarNoticias();
        setNoticias(data);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const filtrarNoticias = (categoria: string, busca: string): Noticia[] => {
    let noticiasFiltradas = noticias;

    if (categoria !== 'Todos') {
      noticiasFiltradas = noticiasFiltradas.filter(n => n.categoria === categoria);
    }

    if (busca) {
      const termoBusca = busca.toLowerCase();
      noticiasFiltradas = noticiasFiltradas.filter(n =>
        n.titulo.toLowerCase().includes(termoBusca) ||
        n.resumo.toLowerCase().includes(termoBusca) ||
        n.conteudo.toLowerCase().includes(termoBusca)
      );
    }

    return noticiasFiltradas;
  };

  const getRecentes = (quantidade: number): Noticia[] => {
    return noticias.slice(0, quantidade);
  };

  return { noticias, loading, filtrarNoticias, getRecentes };
};