// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../services/supabase';

// interface Noticia {
//     id: number;
//     titulo: string;
//     resumo: string;
//     conteudo: string;
//     categoria: string;
//     data: string;
//     autor: string;
//     campus?: string;
//     status: string;
//     imagem?: string;
// }

// const EditorPage: React.FC = () => {
//     const [todasNoticias, setTodasNoticias] = useState<Noticia[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [user, setUser] = useState<any>(null);
//     const [showForm, setShowForm] = useState(false);
//     const [editingNoticia, setEditingNoticia] = useState<Noticia | null>(null);
//     const [formData, setFormData] = useState({
//         titulo: '',
//         resumo: '',
//         conteudo: '',
//         categoria: '',
//         campus: '',
//         imagem: '',
//         status: 'pendente'
//     });
//     const navigate = useNavigate();

//     const getStatusDisplay = (status: string) => {
//         switch (status) {
//             case 'aprovado':
//                 return 'Aprovado';
//             case 'rejeitado':
//                 return 'Recusado';
//             case 'pendente':
//                 return 'Pendente';
//             default:
//                 return status;
//         }
//     };

//     useEffect(() => {
//         checkAuthAndLoadData();
//     }, []);

//     const checkAuthAndLoadData = async () => {
//         try {
//             // Verificar autenticação
//             const { data: { user }, error } = await supabase.auth.getUser();

//             if (error || !user) {
//                 navigate('/login');
//                 return;
//             }

//             // Verificar se é editor (não admin)
//             if (user.email?.includes('admin')) {
//                 navigate('/admin');
//                 return;
//             }

//             setUser(user);
//             await carregarTodasNoticias();
//         } catch (error) {
//             console.error('Erro de autenticação:', error);
//             navigate('/login');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const carregarTodasNoticias = async () => {
//         try {
//             const { data, error } = await supabase
//                 .from('noticias')
//                 .select('*')
//                 .eq('autor', user.email)
//                 .order('data', { ascending: false });

//             if (error) throw error;
//             setTodasNoticias(data || []);
//         } catch (error) {
//             console.error('Erro ao carregar todas as notícias:', error);
//         }
//     };

//     const handleCreate = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const { data, error } = await supabase
//                 .from('noticias')
//                 .insert([{
//                     titulo: formData.titulo,
//                     resumo: formData.resumo,
//                     conteudo: formData.conteudo,
//                     categoria: formData.categoria,
//                     autor: user.email,
//                     campus: formData.campus,
//                     imagem: formData.imagem,
//                     status: 'pendente',
//                     data: new Date().toISOString().split('T')[0]
//                 }])
//                 .select();

//             if (error) throw error;

//             setTodasNoticias([data[0], ...todasNoticias]);
//             setShowForm(false);
//             setFormData({
//                 titulo: '',
//                 resumo: '',
//                 conteudo: '',
//                 categoria: '',
//                 autor: '',
//                 campus: '',
//                 imagem: '',
//                 status: 'pendente'
//             });
//             alert('Notícia criada com sucesso e enviada para aprovação!');
//         } catch (error) {
//             console.error('Erro ao criar notícia:', error);
//             alert('Erro ao criar notícia');
//         }
//     };

//     const handleEdit = (noticia: Noticia) => {
//         setEditingNoticia(noticia);
//         setFormData({
//             titulo: noticia.titulo,
//             resumo: noticia.resumo,
//             conteudo: noticia.conteudo,
//             categoria: noticia.categoria,
//             autor: noticia.autor,
//             campus: noticia.campus || '',
//             imagem: noticia.imagem || '',
//             status: noticia.status
//         });
//         setShowForm(true);
//     };

//     const handleUpdate = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!editingNoticia) return;

//         try {
//             const { error } = await supabase
//                 .from('noticias')
//                 .update(formData)
//                 .eq('id', editingNoticia.id);

//             if (error) throw error;

//             setTodasNoticias(todasNoticias.map(n =>
//                 n.id === editingNoticia.id ? { ...n, ...formData } : n
//             ));
//             setShowForm(false);
//             setEditingNoticia(null);
//             setFormData({
//                 titulo: '',
//                 resumo: '',
//                 conteudo: '',
//                 categoria: '',
//                 autor: '',
//                 campus: '',
//                 imagem: '',
//                 status: 'pendente'
//             });
//             alert('Notícia atualizada com sucesso!');
//         } catch (error) {
//             console.error('Erro ao atualizar notícia:', error);
//             alert('Erro ao atualizar notícia');
//         }
//     };

//     const handleDelete = async (id: number) => {
//         if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;

//         try {
//             const { error } = await supabase
//                 .from('noticias')
//                 .delete()
//                 .eq('id', id);

//             if (error) throw error;

//             setTodasNoticias(todasNoticias.filter(n => n.id !== id));
//             alert('Notícia excluída com sucesso!');
//         } catch (error) {
//             console.error('Erro ao excluir notícia:', error);
//             alert('Erro ao excluir notícia');
//         }
//     };

//     const handleLogout = async () => {
//         await supabase.auth.signOut();
//         localStorage.removeItem('user');
//         navigate('/login');
//     };

//     if (loading) {
//         return <div className="container mx-auto px-4 py-8">Carregando...</div>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="flex justify-between items-center mb-8">
//                 <div>
//                     <h1 className="text-3xl font-bold">Painel do Editor</h1>
//                     <p className="text-gray-600">Bem-vindo, {user?.email}</p>
//                 </div>
//                 <button
//                     onClick={handleLogout}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
//                 >
//                     Sair
//                 </button>
//             </div>

//             <div className="mb-8">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-2xl font-semibold">Gerenciar Notícias</h2>
//                     <button
//                         onClick={() => {
//                             setShowForm(!showForm);
//                             setEditingNoticia(null);
//                             if (!showForm) {
//                                 setFormData({
//                                     titulo: '',
//                                     resumo: '',
//                                     conteudo: '',
//                                     categoria: '',
//                                     autor: '',
//                                     campus: '',
//                                     imagem: '',
//                                     status: 'pendente'
//                                 });
//                             }
//                         }}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
//                     >
//                         {showForm ? 'Cancelar' : '+ Nova Notícia'}
//                     </button>
//                 </div>

//                 {showForm && (
//                     <form onSubmit={editingNoticia ? handleUpdate : handleCreate} className="bg-white rounded-lg shadow-md p-6 mb-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
//                                 <input
//                                     type="text"
//                                     value={formData.titulo}
//                                     onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
//                                 <select
//                                     value={formData.categoria}
//                                     onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 >
//                                     <option value="">Selecione uma categoria</option>
//                                     <option value="Eventos">Eventos</option>
//                                     <option value="Pesquisa">Pesquisa</option>
//                                     <option value="Extensão">Extensão</option>
//                                     <option value="Avisos">Avisos</option>
//                                     <option value="Institucional">Institucional</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
//                                 <input
//                                     type="text"
//                                     value={formData.campus}
//                                     onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
//                                 <input
//                                     type="url"
//                                     value={formData.imagem}
//                                     onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     placeholder="https://exemplo.com/imagem.jpg"
//                                 />
//                             </div>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Resumo</label>
//                             <textarea
//                                 value={formData.resumo}
//                                 onChange={(e) => setFormData({ ...formData, resumo: e.target.value })}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 rows={3}
//                                 required
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
//                             <textarea
//                                 value={formData.conteudo}
//                                 onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 rows={10}
//                                 required
//                             />
//                         </div>
//                         {formData.imagem && (
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Prévia da Imagem</label>
//                                 <img
//                                     src={formData.imagem}
//                                     alt="Prévia"
//                                     className="max-w-xs h-auto rounded-md border"
//                                     onError={(e) => {
//                                         e.currentTarget.style.display = 'none';
//                                     }}
//                                 />
//                             </div>
//                         )}
//                         <button
//                             type="submit"
//                             className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors"
//                         >
//                             {editingNoticia ? 'Atualizar Notícia' : 'Criar Notícia'}
//                         </button>
//                     </form>
//                 )}

//                 <div className="space-y-4">
//                     {todasNoticias.map((noticia) => (
//                         <div key={noticia.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-300">
//                             <div className="flex justify-between items-start mb-4">
//                                 <div className="flex-1">
//                                     <h2 className="text-xl font-semibold mb-2">{noticia.titulo}</h2>
//                                     <p className="text-gray-600 mb-2">{noticia.resumo}</p>
//                                     <div className="text-sm text-gray-500">
//                                         <span>Autor: {noticia.autor}</span> |
//                                         <span> Categoria: {noticia.categoria}</span> |
//                                         <span> Status: <span className={`font-semibold ${noticia.status === 'aprovado' ? 'text-green-600' :
//                                             noticia.status === 'rejeitado' ? 'text-red-600' : 'text-gray-600'
//                                             }`}>{getStatusDisplay(noticia.status)}</span></span> |
//                                         <span> Data: {new Date(noticia.data).toLocaleDateString('pt-BR')}</span>
//                                         {noticia.campus && <span> | Campus: {noticia.campus}</span>}
//                                     </div>
//                                 </div>
//                                 {noticia.imagem && (
//                                     <img
//                                         src={noticia.imagem}
//                                         alt={noticia.titulo}
//                                         className="w-20 h-20 object-cover rounded-md ml-4"
//                                     />
//                                 )}
//                                 <div className="flex space-x-2 ml-4">
//                                     <button
//                                         onClick={() => handleEdit(noticia)}
//                                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition-colors text-sm"
//                                     >
//                                         ✏️ Editar
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(noticia.id)}
//                                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors text-sm"
//                                     >
//                                         🗑️ Excluir
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditorPage;


///////testes




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

const EditorPage: React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingNoticia, setEditingNoticia] = useState<Noticia | null>(null);

    const [formData, setFormData] = useState({
        titulo: '',
        resumo: '',
        conteudo: '',
        categoria: '',
        campus: '',
        imagem: ''
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            navigate('/login');
            return;
        }

        if (user.email?.includes('admin')) {
            navigate('/admin');
            return;
        }

        setUser(user);
        await carregarNoticias(user.email);
        setLoading(false);
    };

    const carregarNoticias = async (email: string) => {
        const { data, error } = await supabase
            .from('noticias')
            .select('*')
            .eq('autor', email)
            .order('data', { ascending: false });

        if (!error) setNoticias(data || []);
    };

    const resetForm = () => {
        setFormData({
            titulo: '',
            resumo: '',
            conteudo: '',
            categoria: '',
            campus: '',
            imagem: ''
        });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('noticias')
            .insert([{
                ...formData,
                autor: user.email,
                status: 'pendente',
                data: new Date().toISOString().split('T')[0]
            }])
            .select();

        if (error) {
            alert('Erro ao criar notícia');
            return;
        }

        setNoticias([data![0], ...noticias]);
        resetForm();
        setShowForm(false);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingNoticia) return;

        const { error } = await supabase
            .from('noticias')
            .update({
                ...formData,
                status: 'pendente'
            })
            .eq('id', editingNoticia.id);

        if (error) {
            alert('Erro ao atualizar notícia');
            return;
        }

        setNoticias(noticias.map(n =>
            n.id === editingNoticia.id
                ? { ...n, ...formData, status: 'pendente' }
                : n
        ));

        resetForm();
        setEditingNoticia(null);
        setShowForm(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (loading) {
        return <div className="p-8">Carregando...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Painel do Editor</h1>
                    <p className="text-gray-600">Bem-vindo, {user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Sair
                </button>
            </div>

            {/* BOTÃO NOVA */}
            <button
                onClick={() => {
                    setShowForm(!showForm);
                    setEditingNoticia(null);
                    if (!showForm) resetForm();
                }}
                className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
                {showForm ? 'Cancelar' : '+ Nova Notícia'}
            </button>

            {/* FORM */}
            {showForm && (
                <form
                    onSubmit={editingNoticia ? handleUpdate : handleCreate}
                    className="bg-white rounded shadow p-6 mb-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Título"
                            value={formData.titulo}
                            onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Campus"
                            value={formData.campus}
                            onChange={e => setFormData({ ...formData, campus: e.target.value })}
                            className="border p-2 rounded"
                        />
                        <select
                            value={formData.categoria}
                            onChange={e => setFormData({ ...formData, categoria: e.target.value })}
                            className="border p-2 rounded"
                            required
                        >
                            <option value="">Categoria</option>
                            <option value="Eventos">Eventos</option>
                            <option value="Pesquisa">Pesquisa</option>
                            <option value="Extensão">Extensão</option>
                            <option value="Avisos">Avisos</option>
                            <option value="Institucional">Institucional</option>
                        </select>
                        <input
                            type="url"
                            placeholder="URL da imagem"
                            value={formData.imagem}
                            onChange={e => setFormData({ ...formData, imagem: e.target.value })}
                            className="border p-2 rounded"
                        />
                    </div>

                    <textarea
                        placeholder="Resumo"
                        value={formData.resumo}
                        onChange={e => setFormData({ ...formData, resumo: e.target.value })}
                        className="border p-2 rounded w-full mb-4"
                        rows={3}
                        required
                    />

                    <textarea
                        placeholder="Conteúdo"
                        value={formData.conteudo}
                        onChange={e => setFormData({ ...formData, conteudo: e.target.value })}
                        className="border p-2 rounded w-full mb-4"
                        rows={8}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                    >
                        {editingNoticia ? 'Atualizar Notícia' : 'Criar Notícia'}
                    </button>
                </form>
            )}

            {/* LISTAGEM */}
            <div className="space-y-4">
                {noticias.map(n => (
                    <div key={n.id} className="bg-white p-6 rounded shadow border-l-4 border-green-500">
                        <h2 className="text-xl font-bold">{n.titulo}</h2>
                        <p className="text-gray-600 mb-2">{n.resumo}</p>

                        <div className="text-sm text-gray-500 mb-2">
                            Status: <span className="font-semibold">{n.status}</span>
                        </div>

                        <button
                            onClick={() => {
                                setEditingNoticia(n);
                                setFormData({
                                    titulo: n.titulo,
                                    resumo: n.resumo,
                                    conteudo: n.conteudo,
                                    categoria: n.categoria,
                                    campus: n.campus || '',
                                    imagem: n.imagem || ''
                                });
                                setShowForm(true);
                            }}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                            ✏️ Editar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditorPage;

