
export interface Noticia {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  data: string;
  autor: string;
  imagem: string;
}

const noticiasMock: Noticia[] = [
  {
    id: 1,
    titulo: "UFC anuncia novos investimentos em laboratórios de IA",
    resumo: "A reitoria confirmou a liberação de recursos para modernização de três grandes polos tecnológicos.",
    conteudo: "A Universidade Federal do Ceará (UFC) anunciou nesta manhã um aporte significativo de 5 milhões de reais para a renovação tecnológica de laboratórios dedicados à Inteligência Artificial. Os recursos serão distribuídos entre os campi de Fortaleza e Quixadá, visando fortalecer as pesquisas em deep learning e robótica colaborativa. Segundo o reitor, essa iniciativa coloca a UFC no radar global da inovação tecnológica.",
    categoria: "Pesquisa",
    data: "2025-06-20",
    autor: "João Silva",
    imagem: "/assets/imagem3.png"
  },
  {
    id: 2,
    titulo: "Semana Universitária 2026 abre inscrições para voluntários",
    resumo: "O maior evento acadêmico do estado busca alunos interessados em apoiar a organização das mostras.",
    conteudo: "Estão abertas as inscrições para o programa de voluntariado da Semana Universitária 2026. O evento, que ocorrerá em outubro, reúne milhares de estudantes em apresentações de trabalhos, oficinas e atividades culturais. Alunos de todos os cursos podem participar e receberão certificação de horas complementares.",
    categoria: "Eventos",
    data: "2025-10-18",
    autor: "Maria Oliveira",
    imagem: "/assets/imagem6.png"
  },
  {
    id: 3,
    titulo: "Novo prazo para solicitação de auxílio moradia",
    resumo: "Estudantes em situação de vulnerabilidade devem ficar atentos às novas datas do edital PRAE.",
    conteudo: "A Pró-Reitoria de Assuntos Estudantis (PRAE) publicou um aditivo ao edital de auxílio moradia, estendendo o prazo de envio de documentação por mais 10 dias úteis. A medida visa garantir que alunos do interior tenham tempo hábil para organizar os comprovantes necessários. Recomenda-se a leitura atenta do manual do candidato disponível no portal do aluno.",
    categoria: "Avisos",
    data: "2025-11-15",
    autor: "Carlos Mendes",
    imagem: "/assets/imagem1.png" 
  },
  {
    id: 4,
    titulo: "Projeto de Extensão leva odontologia a comunidades rurais",
    resumo: "Estudantes da Faculdade de Farmácia, Odontologia e Enfermagem realizam mutirões no interior.",
    conteudo: "O projeto 'Sorriso no Sertão' concluiu sua terceira etapa em comunidades rurais do Ceará. Coordenado por professores da FFOE, o grupo realizou mais de 500 atendimentos preventivos e educativos. Além dos procedimentos clínicos, o projeto distribuiu kits de higiene bucal e realizou palestras sobre saúde preventiva.",
    categoria: "Extensão",
    data: "2025-05-10",
    autor: "Ana Costa",
    imagem: "/assets/imagem5.png"
  },
  {
    id: 5,
    titulo: "UFC vence prêmio nacional de sustentabilidade",
    resumo: "Ações de gestão de resíduos e eficiência energética renderam o primeiro lugar na categoria Educação.",
    conteudo: "Em cerimônia realizada em Brasília, a UFC foi laureada com o prêmio 'EcoUniversidade'. O destaque foi o programa de logística reversa implementado nos campi do Pici e Benfica, que reduziu em 40% o envio de rejeitos para aterros sanitários no último ano.",
    categoria: "Pesquisa",
    data: "2025-11-05",
    autor: "Ricardo Lima",
    imagem: "/assets/imagem2.png"
  },
  {
    id: 6,
    titulo: "Concerto da Orquestra Sinfônica da UFC no Theatro José de Alencar",
    resumo: "Apresentação gratuita celebra os 70 anos da instituição com repertório de compositores cearenses.",
    conteudo: "A Orquestra Sinfônica da UFC convida toda a comunidade para uma noite memorável no Theatro José de Alencar. O concerto apresentará peças inéditas de compositores locais, sob a regência do maestro convidado. A entrada é franca, mediante a doação de 1kg de alimento não perecível.",
    categoria: "Eventos",
    data: "2025-11-01",
    autor: "Bia Santos",
    imagem: "/assets/imagem4.png"
  }
];

export const listarNoticias = async (): Promise<Noticia[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(noticiasMock), 300);
  });
};

export const obterNoticiaPorId = async (id: number): Promise<Noticia | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(noticiasMock.find(n => n.id === id)), 200);
  });
};

export const listarCategorias = (): string[] => {
  return ["Todos", "Eventos", "Avisos", "Pesquisa", "Extensão"];
};
