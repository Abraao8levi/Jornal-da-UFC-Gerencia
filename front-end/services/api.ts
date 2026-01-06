import { supabase } from '../src/services/supabase';

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
  status: 'rascunho' | 'pendente' | 'aprovado' | 'rejeitado';
}

/**
 * Retorna uma lista de todas as categorias de notícias disponíveis.
 * A categoria "Todos" é usada para limpar o filtro.
 */
export const listarCategorias = (): string[] => {
  return ['Todos', 'Eventos', 'Pesquisa', 'Extensão', 'Avisos', 'Institucional'];
};

/**
 * Lista todas as notícias aprovadas (para o público)
 */
export const listarNoticias = async (): Promise<Noticia[]> => {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('status', 'aprovado')
    .order('data', { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Busca uma notícia por ID
 */
export const buscarNoticiaPorId = async (id: number): Promise<Noticia | null> => {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
};

/**
 * Lista todas as notícias (para administração)
 */
export const listarTodasNoticias = async (): Promise<Noticia[]> => {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .order('data', { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Lista notícias por categoria
 */
export const listarNoticiasPorCategoria = async (categoria: string): Promise<Noticia[]> => {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('status', 'aprovado')
    .eq('categoria', categoria)
    .order('data', { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Criar nova notícia
 */
export const criarNoticia = async (noticia: Omit<Noticia, 'id'>): Promise<Noticia> => {
  const { data, error } = await supabase
    .from('noticias')
    .insert([noticia])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Atualizar notícia
 */
export const atualizarNoticia = async (id: number, noticia: Partial<Noticia>): Promise<Noticia> => {
  const { data, error } = await supabase
    .from('noticias')
    .update(noticia)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Deletar notícia
 */
export const deletarNoticia = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('noticias')
    .delete()
    .eq('id', id);

  if (error) throw error;
};