import { useLanguage } from '@/i18n/LanguageContext';

const content = {
  pt: {
    title: 'Política de Privacidade',
    lastUpdated: 'Última atualização: Março de 2026',
    sections: [
      {
        heading: '1. Responsável pelo Tratamento de Dados',
        body: `O responsável pelo tratamento dos seus dados pessoais é:\n\n**Filipa Roquette Unipessoal Limitada**\nNIF: 515700622\nMorada: Rua Rodrigo da Fonseca, Nº 135, 1070-240 Lisboa, Portugal\nEmail: gloatlaundry@gmail.com\nTelefone: (+351) 935 479 900`,
      },
      {
        heading: '2. Dados Pessoais Recolhidos',
        body: `Recolhemos apenas os dados pessoais que nos fornece voluntariamente através do formulário de contacto do nosso website:\n\n- Nome\n- Endereço de email\n- Número de telefone (opcional)\n- Conteúdo da mensagem\n\nNão recolhemos dados pessoais de forma automática, nem utilizamos cookies de rastreamento, ferramentas de analítica ou pixels de publicidade.`,
      },
      {
        heading: '3. Finalidade e Base Legal do Tratamento',
        body: `Os seus dados pessoais são tratados para as seguintes finalidades:\n\n- **Responder ao seu contacto** — base legal: consentimento (artigo 6.º, n.º 1, alínea a) do RGPD) e execução de diligências pré-contratuais (artigo 6.º, n.º 1, alínea b) do RGPD).\n- **Gestão de pedidos e reclamações** — base legal: interesse legítimo (artigo 6.º, n.º 1, alínea f) do RGPD).\n\nPode retirar o seu consentimento a qualquer momento, sem que isso comprometa a licitude do tratamento efetuado antes da retirada.`,
      },
      {
        heading: '4. Cookies e Tecnologias de Rastreamento',
        body: `Este website não utiliza cookies de rastreamento, analítica ou publicidade. Apenas são utilizados cookies estritamente necessários ao funcionamento da plataforma de alojamento, os quais não recolhem dados pessoais identificáveis.`,
      },
      {
        heading: '5. Partilha de Dados com Terceiros',
        body: `Não vendemos, partilhamos ou cedemos os seus dados pessoais a terceiros. Os dados são armazenados apenas nos servidores do nosso fornecedor de alojamento web, dentro do Espaço Económico Europeu (EEE).`,
      },
      {
        heading: '6. Transferências Internacionais de Dados',
        body: `Não efetuamos transferências de dados pessoais para países fora do Espaço Económico Europeu (EEE).`,
      },
      {
        heading: '7. Prazo de Conservação dos Dados',
        body: `Os dados recolhidos através do formulário de contacto são conservados pelo prazo máximo de 12 meses após a última interação, salvo se existir uma relação contratual ou obrigação legal que justifique um prazo superior.`,
      },
      {
        heading: '8. Os Seus Direitos',
        body: `Nos termos do RGPD e da Lei n.º 58/2019, tem os seguintes direitos:\n\n- **Direito de acesso** — obter confirmação e informação sobre o tratamento dos seus dados.\n- **Direito de retificação** — corrigir dados inexatos ou incompletos.\n- **Direito ao apagamento** ("direito a ser esquecido") — solicitar a eliminação dos seus dados.\n- **Direito à limitação do tratamento** — restringir o tratamento em determinadas circunstâncias.\n- **Direito à portabilidade dos dados** — receber os seus dados num formato estruturado e de uso corrente.\n- **Direito de oposição** — opor-se ao tratamento dos seus dados com base em interesse legítimo.\n\nPara exercer qualquer destes direitos, contacte-nos através de: **gloatlaundry@gmail.com**`,
      },
      {
        heading: '9. Direito de Reclamação',
        body: `Tem o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD):\n\nComissão Nacional de Proteção de Dados\nRua de São Bento, 148, 3.º\n1200-821 Lisboa\nTelefone: (+351) 213 928 400\nWebsite: www.cnpd.pt`,
      },
      {
        heading: '10. Segurança dos Dados',
        body: `Adotamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais contra o acesso não autorizado, a perda, a destruição ou a alteração.`,
      },
      {
        heading: '11. Alterações a esta Política',
        body: `Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com a data de atualização revista. Recomendamos que consulte esta página regularmente.`,
      },
      {
        heading: '12. Contacto',
        body: `Para questões relacionadas com a proteção de dados ou com esta política, contacte-nos:\n\nEmail: gloatlaundry@gmail.com\nTelefone: (+351) 935 479 900\nMorada: Rua Rodrigo da Fonseca, Nº 135, 1070-240 Lisboa, Portugal`,
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: March 2026',
    sections: [
      {
        heading: '1. Data Controller',
        body: `The data controller responsible for your personal data is:\n\n**Filipa Roquette Unipessoal Limitada**\nTax ID (NIF): 515700622\nAddress: Rua Rodrigo da Fonseca, Nº 135, 1070-240 Lisbon, Portugal\nEmail: gloatlaundry@gmail.com\nPhone: (+351) 935 479 900`,
      },
      {
        heading: '2. Personal Data We Collect',
        body: `We only collect personal data that you voluntarily provide through our website's contact form:\n\n- Name\n- Email address\n- Phone number (optional)\n- Message content\n\nWe do not automatically collect personal data, nor do we use tracking cookies, analytics tools, or advertising pixels.`,
      },
      {
        heading: '3. Purpose and Legal Basis for Processing',
        body: `Your personal data is processed for the following purposes:\n\n- **Responding to your enquiry** — legal basis: consent (Article 6(1)(a) GDPR) and pre-contractual measures (Article 6(1)(b) GDPR).\n- **Managing requests and complaints** — legal basis: legitimate interest (Article 6(1)(f) GDPR).\n\nYou may withdraw your consent at any time without affecting the lawfulness of processing carried out before the withdrawal.`,
      },
      {
        heading: '4. Cookies and Tracking Technologies',
        body: `This website does not use tracking, analytics, or advertising cookies. Only strictly necessary cookies required for the hosting platform's operation are used, which do not collect identifiable personal data.`,
      },
      {
        heading: '5. Data Sharing with Third Parties',
        body: `We do not sell, share, or transfer your personal data to third parties. Data is stored solely on our web hosting provider's servers within the European Economic Area (EEA).`,
      },
      {
        heading: '6. International Data Transfers',
        body: `We do not transfer personal data to countries outside the European Economic Area (EEA).`,
      },
      {
        heading: '7. Data Retention Period',
        body: `Data collected through the contact form is retained for a maximum of 12 months after the last interaction, unless a contractual relationship or legal obligation justifies a longer period.`,
      },
      {
        heading: '8. Your Rights',
        body: `Under the GDPR and Portuguese Law No. 58/2019, you have the following rights:\n\n- **Right of access** — obtain confirmation and information about the processing of your data.\n- **Right to rectification** — correct inaccurate or incomplete data.\n- **Right to erasure** ("right to be forgotten") — request the deletion of your data.\n- **Right to restriction of processing** — restrict processing in certain circumstances.\n- **Right to data portability** — receive your data in a structured, commonly used format.\n- **Right to object** — object to processing based on legitimate interest.\n\nTo exercise any of these rights, contact us at: **gloatlaundry@gmail.com**`,
      },
      {
        heading: '9. Right to Lodge a Complaint',
        body: `You have the right to lodge a complaint with the Portuguese Data Protection Authority (CNPD):\n\nComissão Nacional de Proteção de Dados\nRua de São Bento, 148, 3rd floor\n1200-821 Lisbon\nPhone: (+351) 213 928 400\nWebsite: www.cnpd.pt`,
      },
      {
        heading: '10. Data Security',
        body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, destruction, or alteration.`,
      },
      {
        heading: '11. Changes to This Policy',
        body: `We may update this Privacy Policy periodically. Any changes will be published on this page with a revised update date. We recommend checking this page regularly.`,
      },
      {
        heading: '12. Contact',
        body: `For questions regarding data protection or this policy, contact us:\n\nEmail: gloatlaundry@gmail.com\nPhone: (+351) 935 479 900\nAddress: Rua Rodrigo da Fonseca, Nº 135, 1070-240 Lisbon, Portugal`,
      },
    ],
  },
};

const renderMarkdown = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-2">{c.title}</h1>
      <p className="text-sm text-muted-foreground mb-10">{c.lastUpdated}</p>
      {c.sections.map((section, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-lg font-semibold mb-3">{section.heading}</h2>
          <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {renderMarkdown(section.body)}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
