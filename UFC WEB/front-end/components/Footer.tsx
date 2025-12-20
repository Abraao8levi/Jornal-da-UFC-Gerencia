
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001D3D] text-gray-300 py-16 border-t-8 border-[#C89214]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Coluna 1: Institucional */}
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-6 border-l-4 border-[#C89214] pl-3">Institucional</h4>
            <p className="text-sm text-blue-200 leading-relaxed">
              O Jornal da UFC é o canal oficial de comunicação da Universidade Federal do Ceará, divulgando ensino, pesquisa e extensão para toda a sociedade.
            </p>
          </div>

          {/* Coluna 2: Links */}
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-6 border-l-4 border-[#C89214] pl-3">Acesso Rápido</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://www.ufc.br" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#C89214] transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-[#C89214] transition-colors"></span>
                  Portal da UFC
                </a>
              </li>
              <li>
                <a href="https://si3.ufc.br/sigaa/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#C89214] transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-[#C89214] transition-colors"></span>
                  SIGAA
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-[#C89214] transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-[#C89214] transition-colors"></span>
                  Diretrizes Editoriais
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-[#C89214] transition-colors group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-[#C89214] transition-colors"></span>
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Endereço */}
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-6 border-l-4 border-[#C89214] pl-3">Unidades</h4>
            <div className="space-y-5 text-sm">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-[#C89214] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p className="leading-relaxed">
                  <span className="text-white font-bold block mb-1 uppercase text-[11px]">Reitoria - Campus Benfica</span>
                  Av. da Universidade, 2853, Fortaleza-CE<br/>CEP 60020-181
                </p>
              </div>
              <p className="text-[11px] text-blue-300 font-bold uppercase tracking-wider">Demais Campi:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Sobral', url: 'https://sobral.ufc.br' },
                  { name: 'Quixadá', url: 'https://www.quixada.ufc.br' },
                  { name: 'Russas', url: 'https://www.campusrussas.ufc.br' },
                  { name: 'Crateús', url: 'https://crateus.ufc.br' },
                  { name: 'Itapajé', url: 'https://itapaje.ufc.br' },
                ].map((campus) => (
                  <a key={campus.name} href={campus.url} target="_blank" rel="noopener noreferrer" className="bg-blue-900/40 border border-blue-800 px-2.5 py-1 rounded text-[10px] text-blue-200 hover:bg-blue-800 hover:text-white hover:border-blue-600 transition-colors">
                    {campus.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 4: Contatos */}
          <div>
            <h4 className="text-white text-sm font-black uppercase tracking-[0.2em] mb-6 border-l-4 border-[#C89214] pl-3">Atendimento</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-[#C89214]/10 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-[#C89214]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase mb-1">Telefones</p>
                  <p className="text-sm">(85) 3366-7300</p>
                  <p className="text-sm">(85) 3366-7339 (Ouvidoria)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-[#C89214]/10 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-[#C89214]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase mb-1">E-mail</p>
                  <p className="text-sm hover:text-[#C89214] transition-colors cursor-pointer">comunicacao@ufc.br</p>
                  <p className="text-sm hover:text-[#C89214] transition-colors cursor-pointer">ouvidoria@ufc.br</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-blue-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 text-center md:text-left">
            © {new Date().getFullYear()} Universidade Federal do Ceará — Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-black uppercase text-[#C89214] italic">Virtus Unita Fortior</span>
            <div className="h-4 w-px bg-blue-900"></div>
            <p className="text-[10px] text-gray-500 font-medium">Desenvolvido pela Coordenadoria de Comunicação</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
