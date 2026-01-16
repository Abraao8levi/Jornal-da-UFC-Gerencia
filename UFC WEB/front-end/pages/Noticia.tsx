
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CardNoticia from '../components/CardNoticia';
import Comentario, { ComentarioType } from '../components/Comentario';
import { useNoticias } from '../hooks/useNoticias';
import { Comentario as ComentarioAPI, criarComentario, curtirComentario, listarComentarios, Noticia as NoticiaType } from '../services/api';
import { supabase } from '../src/services/supabase';

const Noticia: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { noticias, loading, getRecentes } = useNoticias();
  const [noticia, setNoticia] = useState<NoticiaType | null>(null);
  const [user, setUser] = useState<any>(null);

  const [comentario, setComentario] = useState('');
  const [ordenacao, setOrdenacao] = useState<'recentes' | 'antigos'>('antigos');
  const MAX_CARACTERES = 600;
  const [listaComentarios, setListaComentarios] = useState<ComentarioType[]>([]);
  const [loadingComentarios, setLoadingComentarios] = useState(false);
  const [tempComentario, setTempComentario] = useState<ComentarioType | null>(null);

  const formatarDataComentario = (dataISO?: string): string => {
    const data = dataISO ? new Date(dataISO) : new Date();
    
    if (isNaN(data.getTime())) return 'Data desconhecida';

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  };

  const converterComentarioAPI = (apiComentario: ComentarioAPI): ComentarioType => ({
    id: apiComentario.id,
    autor: apiComentario.autor,
    data: formatarDataComentario(apiComentario.data),
    conteudo: apiComentario.conteudo,
    avatar: apiComentario.avatar,
    likes: apiComentario.likes,
    parent_id: (apiComentario as any).parent_id ?? null,
  });

  const fetchComentarios = async (noticiaId: number) => {
    setLoadingComentarios(true);
    try {
      const comentariosAPI = await listarComentarios(noticiaId);
      const comentariosFormatados = comentariosAPI.map(converterComentarioAPI);
      setListaComentarios(comentariosFormatados);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    } finally {
      setLoadingComentarios(false);
    }
  };

  const [replyTo, setReplyTo] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleComentarioSubmit = async () => {
    if (!comentario.trim() || !noticia) return;

    try {
      const payload = {
        noticia_id: noticia.id,
        autor: user?.user_metadata?.name || user?.email || 'Usuário Anônimo',
        conteudo: comentario.trim(),
        avatar: user?.user_metadata?.avatar_url || null,
        likes: 0,
        parent_id: replyTo || null
      };

      const novoComentarioAPI = await criarComentario(payload);
      const novoComentario = converterComentarioAPI(novoComentarioAPI);
      setListaComentarios(prev => [novoComentario, ...prev]);
      setComentario('');
      setTempComentario(null);
      setReplyTo(null);
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
  };

  const handleLike = async (comentarioId: number) => {
    try {
      const comentarioAtualizadoAPI = await curtirComentario(comentarioId);
      const comentarioAtualizado = converterComentarioAPI(comentarioAtualizadoAPI);
      setListaComentarios(prev =>
        prev.map(c => c.id === comentarioAtualizado.id ? comentarioAtualizado : c)
      );
    } catch (error) {
      console.error('Erro ao curtir comentário:', error);
    }
  };

  const handleReply = (comentarioId: number, autor?: string) => {
    setReplyTo(comentarioId);
    const prefix = autor ? `@${autor} ` : '';
    setComentario(prefix);
    // Focus
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  useEffect(() => {
    if (noticia) {
      fetchComentarios(noticia.id);

      // Subscribe to real-time updates
      const subscription = supabase
        .channel(`comentarios-${noticia.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'comentarios',
            filter: `noticia_id=eq.${noticia.id}`,
          },
          (payload) => {
            const novoComentarioAPI = payload.new as ComentarioAPI;
            const novoComentario = converterComentarioAPI(novoComentarioAPI);
            
            setListaComentarios(prev => {
              // Evita duplicatas verificando se o ID já existe na lista
              if (prev.some(c => c.id === novoComentario.id)) return prev;
              return [novoComentario, ...prev];
            });
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'comentarios',
            filter: `noticia_id=eq.${noticia.id}`,
          },
          (payload) => {
            const comentarioAtualizadoAPI = payload.new as ComentarioAPI;
            const comentarioAtualizado = converterComentarioAPI(comentarioAtualizadoAPI);
            setListaComentarios(prev =>
              prev.map(c => c.id === comentarioAtualizado.id ? comentarioAtualizado : c)
            );
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [noticia]);

  const handleComentarioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const texto = e.target.value;
    if (texto.length <= MAX_CARACTERES) {
      setComentario(texto);
      // Atualiza comentário temporário para UI otimista enquanto o usuário digita
      setTempComentario({
        id: -1,
        autor: user?.user_metadata?.name || user?.email || 'Você',
        data: formatarDataComentario(new Date().toISOString()),
        conteudo: texto,
        avatar: null,
        likes: 0,
        parent_id: replyTo ?? null,
        pending: true,
      });
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      const found = noticias.find(n => n.id === Number(id));
      if (found) {
        setNoticia(found);
        window.scrollTo(0, 0);
      } else {
        navigate('/noticias');
      }
    }
  }, [id, noticias, loading, navigate]);

  if (loading || !noticia) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-8">
        <div className="h-10 bg-gray-200 animate-pulse rounded w-1/4"></div>
        <div className="h-20 bg-gray-200 animate-pulse rounded w-full"></div>
        <div className="h-[400px] bg-gray-200 animate-pulse rounded-2xl w-full"></div>
      </div>
    );
  }

  const outrasNoticias = getRecentes(3).filter(n => n.id !== noticia.id);

  // Ordenar comentários baseado na seleção
  let comentariosOrdenados = ordenacao === 'recentes'
    ? listaComentarios
    : [...listaComentarios].reverse();

  // Se houver um comentário temporário (UI otimista), exibi-lo no topo quando ordenação for "recentes"
  if (tempComentario && ordenacao === 'recentes') {
    comentariosOrdenados = [tempComentario, ...comentariosOrdenados];
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center space-x-2">
        <Link to="/" className="hover:text-indigo-600">Início</Link>
        <span>/</span>
        <Link to="/noticias" className="hover:text-indigo-600">Notícias</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{noticia.titulo}</span>
      </nav>

      {/* Post Content */}
      <article className="space-y-8">
        <header className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
              {noticia.categoria}
            </span>
            <span className="text-gray-400 text-sm">
              {new Date(noticia.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {noticia.titulo}
          </h1>
          <div className="flex items-center space-x-4 border-y border-gray-100 py-4">
             <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
               {noticia.autor.charAt(0)}
             </div>
             <div>
               <p className="text-sm font-bold text-gray-900">{noticia.autor}</p>
               <p className="text-xs text-gray-500">Repórter do Jornal da UFC</p>
             </div>
          </div>
        </header>

        <div className="rounded-3xl overflow-hidden shadow-lg aspect-video">
          <img 
            src={noticia.imagem} 
            alt={noticia.titulo} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-indigo prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 whitespace-pre-wrap">
          {noticia.conteudo}
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
           <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Tags:</span>
           <span className="text-sm text-indigo-600 hover:underline cursor-pointer">#UFC</span>
           <span className="text-sm text-indigo-600 hover:underline cursor-pointer">#{noticia.categoria}</span>
           <span className="text-sm text-indigo-600 hover:underline cursor-pointer">#Educação</span>
        </div>
      </article>

      {/* Seção de Comentários */}
      <section className="pt-12 border-t border-gray-200 space-y-8">
        {/* Cabeçalho dos Comentários */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Comentários</h3>
          <p className="text-gray-600 text-sm mb-6">
            Os comentários são de responsabilidade exclusiva de seus autores e não representam a opinião deste site. Se achar algo que viole os termos de uso, denuncie. Leia as perguntas mais frequentes para saber o que é impróprio ou ilegal.
          </p>
        </div>

        {/* Área de Participação */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Participe da conversa</h4>
          
          {/* Campo de Texto */}
          <div className="mb-4">
            {replyTo && (
              <div className="mb-2 text-sm text-gray-600 flex items-center justify-between">
                <span>Respondendo ao comentário #{replyTo}</span>
                <button className="text-xs text-indigo-600" onClick={() => { setReplyTo(null); setComentario(''); }}>Cancelar</button>
              </div>
            )}
            <textarea 
              ref={textareaRef}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Digite seu comentário..."
              value={comentario}
              onChange={handleComentarioChange}
              maxLength={MAX_CARACTERES}
            />
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span className="text-xs text-gray-400">
                {MAX_CARACTERES - comentario.length} caracteres restantes
              </span>
            </div>
          </div>

          {/* Botão Enviar */}
          <div className="flex justify-end">
            <button
              onClick={handleComentarioSubmit}
              disabled={!comentario.trim()}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Enviar
            </button>
          </div>
        </div>

        {/* Seção de Comentários Existentes */}
        <div>
          {/* Barra de Ordenação de Comentários */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 p-1 rounded-full bg-gray-100">
              <button
                onClick={() => setOrdenacao('recentes')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${
                  ordenacao === 'recentes'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-200/50'
                }`}
              >
                Mais Recentes
              </button>
              <button
                onClick={() => setOrdenacao('antigos')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${
                  ordenacao === 'antigos'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-200/50'
                }`}
              >
                Mais Antigos
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm font-medium">{listaComentarios.length} comentários</span>
            </div>
          </div>

          {/* Lista de Comentários */}
          {comentariosOrdenados.length > 0 ? (
            <div className="space-y-6">
              {/* Render top-level comments and pass replies */}
              {comentariosOrdenados
                .filter(c => !c.parent_id)
                .map((c) => {
                  const replies = comentariosOrdenados.filter(r => r.parent_id === c.id);
                  return (
                    <Comentario
                      key={c.id}
                      {...c}
                      replies={replies}
                      onLike={c.id > 0 ? handleLike : undefined}
                      onReply={handleReply}
                    />
                  );
                })}
            </div>
          ) : (
            /* Placeholder - Sem Comentários */
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h6 className="text-lg font-medium text-gray-900 mb-2">Seja o primeiro a comentar</h6>
              <p className="text-gray-500 max-w-md mx-auto">
                Esta discussão ainda não tem comentários. Compartilhe sua perspectiva e inicie o debate.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Sugestões */}
      <section className="pt-12 border-t-2 border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Outras Notícias</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {outrasNoticias.map((item) => (
            <CardNoticia key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Noticia;
