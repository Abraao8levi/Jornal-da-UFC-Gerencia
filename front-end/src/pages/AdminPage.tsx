import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

interface Noticia {
    id: number;
    titulo: string;
    resumo: string;
    conteudo: string;
    categoria: string;
    data: string;
    autor: string;
    campus?: string;
    status: string;
    imagem?: string;
}

const AdminPage: React.FC = () => {
    const [noticiasPendentes, setNoticiasPendentes] = useState<Noticia[]>([]);
    const [todasNoticias, setTodasNoticias] = useState<Noticia[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingNoticia, setEditingNoticia] = useState<Noticia | null>(null);
    const [formData, setFormData] = useState({
        titulo: '',
        resumo: '',
        conteudo: '',
        categoria: '',
        autor: '',
        campus: '',
        imagem: '',
        status: 'rascunho'
    });
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthAndLoadData();
    }, []);

    const checkAuthAndLoadData = async () => {
        try {
            // Verificar autenticação
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                navigate('/login');
                return;
            }

            setUser(user);
            await Promise.all([carregarNoticiasPendentes(), carregarTodasNoticias()]);
        } catch (error) {
            console.error('Erro de autenticação:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const carregarTodasNoticias = async () => {
        try {
            const { data, error } = await supabase
                .from('noticias')
                .select('*')
                .order('data', { ascending: false });

            if (error) throw error;
            setTodasNoticias(data || []);
        } catch (error) {
            console.error('Erro ao carregar todas as notícias:', error);
        }
    };

    const carregarNoticiasPendentes = async () => {
        try {
            const { data, error } = await supabase
                .from('noticias')
                .select('*')
                .eq('status', 'pendente')
                .order('data', { ascending: false });

            if (error) throw error;
            setNoticiasPendentes(data || []);
        } catch (error) {
            console.error('Erro ao carregar notícias pendentes:', error);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('noticias')
                .insert([{
                    ...formData,
                    data: new Date().toISOString().split('T')[0]
                }])
                .select();

            if (error) throw error;

            setTodasNoticias([data[0], ...todasNoticias]);
            setShowForm(false);
            setFormData({
                titulo: '',
                resumo: '',
                conteudo: '',
                categoria: '',
                autor: '',
                campus: '',
                imagem: '',
                status: 'rascunho'
            });
            alert('Notícia criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar notícia:', error);
            alert('Erro ao criar notícia');
        }
    };

    const handleEdit = (noticia: Noticia) => {
        setEditingNoticia(noticia);
        setFormData({
            titulo: noticia.titulo,
            resumo: noticia.resumo,
            conteudo: noticia.conteudo,
            categoria: noticia.categoria,
            autor: noticia.autor,
            campus: noticia.campus || '',
            imagem: noticia.imagem || '',
            status: noticia.status
        });
        setShowForm(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingNoticia) return;

        try {
            const { error } = await supabase
                .from('noticias')
                .update(formData)
                .eq('id', editingNoticia.id);

            if (error) throw error;

            setTodasNoticias(todasNoticias.map(n =>
                n.id === editingNoticia.id ? { ...n, ...formData } : n
            ));
            setShowForm(false);
            setEditingNoticia(null);
            setFormData({
                titulo: '',
                resumo: '',
                conteudo: '',
                categoria: '',
                autor: '',
                campus: '',
                imagem: '',
                status: 'rascunho'
            });
            alert('Notícia atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar notícia:', error);
            alert('Erro ao atualizar notícia');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;

        try {
            const { error } = await supabase
                .from('noticias')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setTodasNoticias(todasNoticias.filter(n => n.id !== id));
            setNoticiasPendentes(noticiasPendentes.filter(n => n.id !== id));
            alert('Notícia excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir notícia:', error);
            alert('Erro ao excluir notícia');
        }
    };

    const handleAprovar = async (id: number) => {
        try {
            const { error } = await supabase
                .from('noticias')
                .update({ status: 'aprovado' })
                .eq('id', id);

            if (error) throw error;

            setNoticiasPendentes(noticiasPendentes.filter(n => n.id !== id));
            setTodasNoticias(todasNoticias.map(n =>
                n.id === id ? { ...n, status: 'aprovado' } : n
            ));
            alert('Notícia aprovada com sucesso!');
        } catch (error) {
            console.error('Erro ao aprovar notícia:', error);
            alert('Erro ao aprovar notícia');
        }
    };

    const handleRejeitar = async (id: number) => {
        try {
            const { error } = await supabase
                .from('noticias')
                .update({ status: 'rejeitado' })
                .eq('id', id);

            if (error) throw error;

            setNoticiasPendentes(noticiasPendentes.filter(n => n.id !== id));
            setTodasNoticias(todasNoticias.map(n =>
                n.id === id ? { ...n, status: 'rejeitado' } : n
            ));
            alert('Notícia rejeitada!');
        } catch (error) {
            console.error('Erro ao rejeitar notícia:', error);
            alert('Erro ao rejeitar notícia');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8">Carregando...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Painel de Administração</h1>
                    <p className="text-gray-600">Bem-vindo, {user?.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                    Sair
                </button>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Notícias Pendentes de Aprovação</h2>

                {noticiasPendentes.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Nenhuma notícia pendente de aprovação.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {noticiasPendentes.map((noticia) => (
                            <div key={noticia.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-400">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">{noticia.titulo}</h2>
                                        <p className="text-gray-600 mb-2">{noticia.resumo}</p>
                                        <div className="text-sm text-gray-500">
                                            <span>Autor: {noticia.autor}</span> |
                                            <span> Categoria: {noticia.categoria}</span> |
                                            <span> Data: {new Date(noticia.data).toLocaleDateString('pt-BR')}</span>
                                            {noticia.campus && <span> | Campus: {noticia.campus}</span>}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleAprovar(noticia.id)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                                        >
                                            ✅ Aprovar
                                        </button>
                                        <button
                                            onClick={() => handleRejeitar(noticia.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                                        >
                                            ❌ Rejeitar
                                        </button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700">
                                    <strong>Conteúdo:</strong>
                                    <p className="mt-2 line-clamp-3">{noticia.conteudo}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Gerenciar Todas as Notícias</h2>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingNoticia(null);
                            if (!showForm) {
                                setFormData({
                                    titulo: '',
                                    resumo: '',
                                    conteudo: '',
                                    categoria: '',
                                    autor: '',
                                    campus: '',
                                    imagem: '',
                                    status: 'rascunho'
                                });
                            }
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        {showForm ? 'Cancelar' : '+ Nova Notícia'}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={editingNoticia ? handleUpdate : handleCreate} className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                                <input
                                    type="text"
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                                <input
                                    type="text"
                                    value={formData.autor}
                                    onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                <select
                                    value={formData.categoria}
                                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="Eventos">Eventos</option>
                                    <option value="Pesquisa">Pesquisa</option>
                                    <option value="Extensão">Extensão</option>
                                    <option value="Avisos">Avisos</option>
                                    <option value="Institucional">Institucional</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                                <input
                                    type="text"
                                    value={formData.campus}
                                    onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                                <input
                                    type="url"
                                    value={formData.imagem}
                                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://exemplo.com/imagem.jpg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="rascunho">Rascunho</option>
                                    <option value="pendente">Pendente</option>
                                    <option value="aprovado">Aprovado</option>
                                    <option value="rejeitado">Rejeitado</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Resumo</label>
                            <textarea
                                value={formData.resumo}
                                onChange={(e) => setFormData({ ...formData, resumo: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
                            <textarea
                                value={formData.conteudo}
                                onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={10}
                                required
                            />
                        </div>
                        {formData.imagem && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prévia da Imagem</label>
                                <img
                                    src={formData.imagem}
                                    alt="Prévia"
                                    className="max-w-xs h-auto rounded-md border"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors"
                        >
                            {editingNoticia ? 'Atualizar Notícia' : 'Criar Notícia'}
                        </button>
                    </form>
                )}

                <div className="space-y-4">
                    {todasNoticias.map((noticia) => (
                        <div key={noticia.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-300">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold mb-2">{noticia.titulo}</h2>
                                    <p className="text-gray-600 mb-2">{noticia.resumo}</p>
                                    <div className="text-sm text-gray-500">
                                        <span>Autor: {noticia.autor}</span> |
                                        <span> Categoria: {noticia.categoria}</span> |
                                        <span> Status: <span className={`font-semibold ${noticia.status === 'aprovado' ? 'text-green-600' :
                                                noticia.status === 'pendente' ? 'text-yellow-600' :
                                                    noticia.status === 'rejeitado' ? 'text-red-600' : 'text-gray-600'
                                            }`}>{noticia.status}</span></span> |
                                        <span> Data: {new Date(noticia.data).toLocaleDateString('pt-BR')}</span>
                                        {noticia.campus && <span> | Campus: {noticia.campus}</span>}
                                    </div>
                                </div>
                                {noticia.imagem && (
                                    <img
                                        src={noticia.imagem}
                                        alt={noticia.titulo}
                                        className="w-20 h-20 object-cover rounded-md ml-4"
                                    />
                                )}
                                <div className="flex space-x-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(noticia)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition-colors text-sm"
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(noticia.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors text-sm"
                                    >
                                        🗑️ Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;