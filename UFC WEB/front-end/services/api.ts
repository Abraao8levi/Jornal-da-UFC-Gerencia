export interface Noticia {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  data: string; // AAAA-MM-DD
  autor: string;
  imagem?: string;
  campus?: string;
}

/**
 * Retorna uma lista de todas as categorias de notícias disponíveis.
 * A categoria "Todos" é usada para limpar o filtro.
 */
export const listarCategorias = (): string[] => {
  return ['Todos', 'Eventos', 'Pesquisa', 'Extensão', 'Avisos', 'Institucional'];
};