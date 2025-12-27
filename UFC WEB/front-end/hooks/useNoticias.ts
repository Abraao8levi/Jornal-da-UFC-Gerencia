import { useEffect, useState } from 'react';
import { Noticia } from '../services/api';

const mockNoticias: Noticia[] = [
  {
    id: 1,
    titulo: "UFC é destaque em ranking internacional de sustentabilidade",
    resumo: "A Universidade Federal do Ceará (UFC) alcançou uma posição de destaque no UI GreenMetric World University Ranking 2024, que avalia as práticas de sustentabilidade em instituições de ensino superior em todo o mundo.",
    conteudo: "A Universidade Federal do Ceará (UFC) alcançou uma posição de destaque no UI GreenMetric World University Ranking 2024, que avalia as práticas de sustentabilidade em instituições de ensino superior em todo o mundo. A UFC ficou entre as 5 melhores universidades brasileiras e a primeira do Nordeste, refletindo os esforços contínuos em gestão ambiental, educação para a sustentabilidade e infraestrutura verde. A avaliação considera indicadores como 'Setting and Infrastructure', 'Energy and Climate Change', 'Waste', 'Water', 'Transportation' e 'Education and Research'. O resultado é fruto de um trabalho coletivo envolvendo a administração superior, servidores, estudantes e a comunidade em geral, que têm se engajado em projetos como a coleta seletiva, o uso de energias renováveis e a promoção de eventos sobre consciência ambiental.",
    categoria: "Institucional",
    data: "2025-10-22",
    autor: "Coordenadoria de Comunicação",
    imagem: "/assets/imagem2.png",
    campus: "Pici"
  },
  {
    id: 2,
    titulo: "Nova pesquisa sobre Zika Vírus é desenvolvida no Campus do Porangabuçu",
    resumo: "Pesquisadores da Faculdade de Medicina (FAMED) da UFC publicaram um novo estudo na revista Nature sobre os efeitos neurológicos do Zika Vírus em adultos, uma área até então pouco explorada.",
    conteudo: "Uma equipe de pesquisadores da Faculdade de Medicina (FAMED) da UFC, localizada no Campus do Porangabuçu, publicou um estudo inovador na prestigiada revista Nature. A pesquisa foca nos efeitos neurológicos do Zika Vírus em adultos, revelando que a infecção pode causar complicações a longo prazo, como a síndrome de Guillain-Barré e outras neuropatias, de forma mais frequente do que se imaginava. O estudo acompanhou 200 pacientes adultos que contraíram o vírus durante o surto de 2015 e 2016, utilizando ressonância magnética e análises do líquido cefalorraquidiano para mapear as alterações no sistema nervoso. As descobertas reforçam a necessidade de acompanhamento médico contínuo para pacientes que tiveram a doença.",
    categoria: "Pesquisa",
    data: "2025-11-05",
    autor: "Mariana Costa",
    imagem: "https://www.ufc.br/images/_images/noticias/2023/img_7015_730x487.jpg",
    campus: "Porangabuçu"
  },
  {
    id: 3,
    titulo: "Festival de Cultura e Arte acontece no Campus do Benfica",
    resumo: "O tradicional Festival de Cultura e Arte da UFC tomará conta do Campus do Benfica entre os dias 10 e 15 de novembro, com uma programação gratuita e aberta ao público.",
    conteudo: "Entre os dias 10 e 15 de novembro, o Campus do Benfica será palco do tradicional Festival de Cultura e Arte da UFC. O evento, que chega à sua 20ª edição, contará com uma vasta programação gratuita, incluindo shows musicais, peças de teatro, exposições de artes visuais, oficinas e debates. A abertura oficial acontecerá na Concha Acústica da Reitoria, com a apresentação da Orquestra Sinfônica da UFC. Nomes como Luedji Luna e Zeca Baleiro estão confirmados na programação musical. O festival busca promover a integração entre a comunidade acadêmica e a sociedade, celebrando a diversidade cultural e o talento dos artistas locais e nacionais.",
    categoria: "Eventos",
    data: "2025-11-01",
    autor: "Lucas Martins",
    imagem: "https://www.ufc.br/images/_images/noticias/2023/foto_noticia_semana_benfica.jpg",
    campus: "Benfica"
  },
  {
    id: 4,
    titulo: "Campus de Russas abre inscrições para especialização em Engenharia de Software",
    resumo: "A especialização é gratuita e voltada para profissionais que desejam aprofundar seus conhecimentos em desenvolvimento de software e novas tecnologias.",
    conteudo: "O Campus da UFC em Russas está com inscrições abertas para a nova turma de sua especialização em Engenharia de Software. O curso é gratuito e tem como público-alvo graduados em Ciência da Computação, Engenharia de Computação, Sistemas de Informação e áreas afins. Com duração de 18 meses, a pós-graduação abordará temas como arquitetura de software, inteligência artificial, desenvolvimento ágil e segurança da informação. As aulas serão ministradas por professores doutores do campus e por profissionais renomados do mercado. As inscrições podem ser feitas on-line até o dia 30 de novembro.",
    categoria: "Avisos",
    data: "2025-10-28",
    autor: "Secretaria Acadêmica de Russas",
    imagem: "https://www.ufc.br/images/_images/noticias/2023/campus_russas_ufc.jpg",
    campus: "Russas"
  },
  {
    id: 5,
    titulo: "Projeto de extensão em Quixadá leva robótica para escolas públicas",
    resumo: "Alunos do curso de Engenharia de Computação do Campus da UFC em Quixadá estão promovendo oficinas de robótica para estudantes do ensino fundamental da região.",
    conteudo: "Um projeto de extensão coordenado por professores e executado por alunos do curso de Engenharia de Computação do Campus da UFC em Quixadá está transformando a realidade de escolas públicas no sertão central cearense. O projeto 'Robótica para Todos' oferece oficinas semanais de programação e montagem de robôs para estudantes do 6º ao 9º ano. Utilizando kits de baixo custo e software livre, a iniciativa busca despertar o interesse dos jovens pela ciência e tecnologia, além de desenvolver o raciocínio lógico e o trabalho em equipe. O projeto já atendeu mais de 100 alunos e planeja expandir para outras cidades da região no próximo ano.",
    categoria: "Extensão",
    data: "2025-09-15",
    autor: "Ana Clara Souza",
    imagem: "https://www.ufc.br/images/_images/noticias/2023/campus_quixada.jpg",
    campus: "Quixadá"
  },
  {
    id: 6,
    titulo: "UFC Crateús inaugura novo bloco de laboratórios de química e física",
    resumo: "A nova estrutura beneficiará os cursos de graduação em Ciência da Computação e Sistemas de Informação, além de projetos de pesquisa.",
    conteudo: "O Campus da UFC em Crateús inaugurou nesta semana um novo bloco de laboratórios didáticos. A estrutura conta com modernos laboratórios de Química e Física, equipados com instrumentos de última geração para aulas práticas e desenvolvimento de pesquisas. O investimento, de cerca de R$ 2 milhões, visa aprimorar a formação dos estudantes dos cursos de Ciência da Computação e Sistemas de Informação, que possuem disciplinas básicas nessas áreas. A Reitora da UFC, presente na cerimônia, destacou a importância do investimento para a consolidação do campus e para o desenvolvimento científico e tecnológico da região.",
    categoria: "Institucional",
    data: "2025-08-20",
    autor: "UFC Informa",
    imagem: "https://www.ufc.br/images/_images/noticias/2023/campus_crateus.jpg",
    campus: "Crateús"
  },
  {
    id: 7,
    titulo: "UFC lança nova versão do Guia de Fontes para imprensa",
    resumo: "Ferramenta on-line visa auxiliar profissionais de imprensa na busca por fontes qualificadas na universidade.",
    conteudo: "A Coordenadoria de Comunicação e Marketing (UFC Informa) da Universidade Federal do Ceará lançou, nesta quinta-feira (8), a nova versão do Guia de Fontes. Trata-se de uma ferramenta on-line cujo objetivo é auxiliar profissionais de imprensa na busca por fontes qualificadas de informação...",
    categoria: "Institucional",
    data: "2025-12-08",
    autor: "UFC Informa",
    imagem: "/assets/guia-fontes.jpg",
    campus: "Benfica"
  }
];

export const useNoticias = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento de dados da API
    setTimeout(() => {
      // Ordena as notícias pela data, da mais recente para a mais antiga
      const noticiasOrdenadas = mockNoticias.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      setNoticias(noticiasOrdenadas);
      setLoading(false);
    }, 500); // Simula um pequeno delay de rede
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