import React from 'react';

export interface ComentarioType {
  id: number;
  autor: string;
  data: string;
  conteudo: string;
  avatar?: string | null;
  curtidas?: number;
}

const Comentario: React.FC<ComentarioType> = ({ autor, data, conteudo, avatar, curtidas = 0 }) => {
  const inicial = autor.charAt(0).toUpperCase();

  return (
    <div className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex-shrink-0">
        {avatar ? (
          <img src={avatar} alt={autor} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-50" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            {inicial}
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-gray-900">{autor}</h5>
          <span className="text-xs font-medium text-gray-400">{data}</span>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm">{conteudo}</p>
        
        <div className="flex items-center gap-6 pt-2">
            <button className="group flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-indigo-600 transition-colors">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                <span>{curtidas > 0 ? curtidas : 'Curtir'}</span>
            </button>
            <button className="text-xs font-medium text-gray-400 hover:text-indigo-600 transition-colors">
                Responder
            </button>
        </div>
      </div>
    </div>
  );
};

export default Comentario;