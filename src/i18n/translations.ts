export type Language = 'pt' | 'en';

export const translations = {
  nav: {
    home: { pt: 'Início', en: 'Home' },
    plans: { pt: 'Planos', en: 'Plans' },
    services: { pt: 'Serviços', en: 'Services' },
    pricing: { pt: 'Preços', en: 'Pricing' },
    contact: { pt: 'Contacto', en: 'Contact' },
    bookNow: { pt: 'Agendar Recolha', en: 'Schedule Pickup' },
  },
  home: {
    heroTitleLine1: {
      pt: 'TRATAMOS DE TODA',
      en: 'WE TAKE CARE OF',
    },
    heroTitleLine2: {
      pt: 'A SUA ROUPA!',
      en: 'ALL YOUR LAUNDRY!',
    },
    heroSubtitle: {
      pt: 'Poupe tempo e confie na GLOAT. Lavamos, engomamos e entregamos — Com cuidado profissional e preços justos.',
      en: 'Save time and trust GLOAT. We wash, iron and deliver — With professional care at fair prices.',
    },
    viewPlans: { pt: 'Ver Planos', en: 'View Plans' },
    viewServices: { pt: 'Ver Serviços', en: 'View Services' },
    howItWorks: { pt: 'Como Funciona', en: 'How It Works' },
    step1Title: { pt: 'Entrega a roupa', en: 'Drop off your laundry' },
    step1Desc: {
      pt: 'Traga a sua roupa à nossa loja ou agende uma recolha ao domicílio.',
      en: 'Bring your laundry to our store or schedule a home pickup.',
    },
    step2Title: { pt: 'Lavamos e tratamos', en: 'We wash & care' },
    step2Desc: {
      pt: 'Tratamos a sua roupa com produtos profissionais e todo o cuidado.',
      en: 'We handle your clothes with professional products and the utmost care.',
    },
    step3Title: { pt: 'Roupa impecável e pronta.', en: 'Flawless & ready.' },
    step3Desc: {
      pt: 'A sua roupa fica pronta, engomada ou só dobrada conforme escolhido.',
      en: 'Your laundry is ready, ironed or just folded as you choose.',
    },
    whyChoose: { pt: 'Porquê a GLOAT?', en: 'Why Choose GLOAT?' },
    speed: { pt: 'Rapidez', en: 'Speed' },
    speedDesc: {
      pt: 'Entrega rápida, normalmente em 48 horas.',
      en: 'Fast turnaround, usually within 48 hours.',
    },
    quality: { pt: 'Qualidade Profissional', en: 'Professional Quality' },
    qualityDesc: {
      pt: 'Equipamento industrial e produtos de alta qualidade.',
      en: 'Industrial equipment and high-quality products.',
    },
    clearPricing: { pt: 'Preços Claros', en: 'Clear Pricing' },
    clearPricingDesc: {
      pt: 'Sem surpresas. Sabe sempre quanto vai pagar.',
      en: "No surprises. You always know what you'll pay.",
    },
    reliable: { pt: 'Serviço Fiável', en: 'Reliable Service' },
    reliableDesc: {
      pt: 'Conte connosco semana após semana, sempre com a mesma qualidade.',
      en: 'Count on us week after week, always with the same quality.',
    },
    testimonials: { pt: 'O que dizem os nossos clientes', en: 'What our customers say' },
    ctaTitle: {
      pt: 'Pronto para experimentar a GLOAT?',
      en: 'Ready to try GLOAT?',
    },
    ctaSubtitle: {
      pt: 'Descubra os nossos planos mensais ou entre em contacto connosco.',
      en: 'Discover our monthly plans or get in touch with us.',
    },
    contactUs: { pt: 'Contacte-nos', en: 'Contact Us' },
  },
  plans: {
    title: { pt: 'Planos Mensais', en: 'Monthly Plans' },
    subtitle: {
      pt: 'Escolha o plano que melhor se adapta ao seu dia-a-dia e poupe todos os meses. Items adicionais ao plano a preços reduzidos. Delivery incluído.',
      en: 'Choose the plan that best fits your routine and save every month. Additional items at reduced prices. Delivery included.',
    },
    choosePlan: { pt: 'Escolher Plano', en: 'Choose Plan' },
    bestValue: { pt: 'Melhor Valor', en: 'Best Value' },
    comparison: { pt: 'Comparação de Planos', en: 'Plan Comparison' },
    feature: { pt: 'Característica', en: 'Feature' },
    bags: { pt: 'bolsas', en: 'bags' },
    pieces: { pt: 'peças', en: 'pieces' },
    washed: { pt: 'Lavada e dobrada', en: 'Washed & folded' },
    ironed: { pt: 'Engomada', en: 'Ironed' },
    washedIroned: { pt: 'Lavada e engomada', en: 'Washed & ironed' },
    standardBag: { pt: '4 Bolsas STANDARD (aprox. 5kg) por mês', en: '4 STANDARD bags (approx. 5kg) per month' },
    largeBag: { pt: '4 Bolsas GRANDE (aprox. 10kg) por mês', en: '4 MAX bags (approx. 10kg) per month' },
    itemCount: { pt: 'Quantidade', en: 'Item count' },
    serviceType: { pt: 'Tipo de serviço', en: 'Service type' },
    monthlyPrice: { pt: 'Preço mensal', en: 'Monthly price' },
    customerStories: { pt: 'O que dizem os nossos clientes', en: 'What our plan holders say' },
  },
  services: {
    title: { pt: 'Os Nossos Serviços', en: 'Our Services' },
    subtitle: {
      pt: 'Oferecemos uma gama completa de serviços de lavandaria e engomadoria para todas as necessidades.',
      en: 'We offer a full range of laundry and ironing services for all needs.',
    },
    washFold: { pt: 'Lavar & Dobrar', en: 'Wash & Fold' },
    washFoldDesc: {
      pt: 'Roupa lavada com produtos profissionais e cuidadosamente dobrada, pronta a guardar.',
      en: 'Clothes washed with professional products and carefully folded, ready to store.',
    },
    ironing: { pt: 'Engomadoria', en: 'Ironing' },
    ironingDesc: {
      pt: 'Engomadoria profissional para camisas, fatos, lençóis e muito mais.',
      en: 'Professional ironing for shirts, suits, bed sheets and much more.',
    },
    dryCleaning: { pt: 'Limpeza a Seco', en: 'Dry Cleaning' },
    dryCleaningDesc: {
      pt: 'Tratamento especializado para tecidos delicados e peças especiais.',
      en: 'Specialized treatment for delicate fabrics and special garments.',
    },
    specialItems: { pt: 'Artigos Especiais', en: 'Special Items' },
    specialItemsDesc: {
      pt: 'Tapetes, cortinados, sofás e artigos em pele, edredons, cobertores, e muito mais.',
      en: 'Rugs, curtains, sofas and leather items, duvets, blankets, and much more.',
    },
    expressService: { pt: 'Serviço Expresso', en: 'Express Service' },
    expressServiceDesc: {
      pt: 'Precisa com urgência? Entregamos no dia seguinte.',
      en: 'Need it urgently? We deliver next-day.',
    },
    delivery: { pt: 'Recolha e Entrega', en: 'Pickup & Delivery' },
    deliveryDesc: {
      pt: 'Serviço de recolha e entrega ao domicílio para sua conveniência.',
      en: 'Home pickup and delivery service for your convenience.',
    },
  },
  pricing: {
    title: { pt: 'Preços', en: 'Pricing' },
    subtitle: {
      pt: 'Preços transparentes sem surpresas. Consulte os nossos preços abaixo.',
      en: 'Transparent pricing with no surprises. Check our prices below.',
    },
    service: { pt: 'Serviço', en: 'Service' },
    price: { pt: 'Preço', en: 'Price' },
    faq: { pt: 'Perguntas Frequentes', en: 'Frequently Asked Questions' },
    faqDeliveryQ: { pt: 'Qual é o tempo de entrega?', en: 'What is the delivery time?' },
    faqDeliveryA: {
      pt: 'Normalmente entre 24 a 48 horas. O serviço expresso pode ser feito no mesmo dia.',
      en: 'Usually between 24 to 48 hours. Express service can be done same-day.',
    },
    faqBagQ: { pt: 'Qual é a capacidade das bolsas?', en: 'What is the bag capacity?' },
    faqBagA: {
      pt: 'A bolsa STANDARD comporta cerca de 5-6 kg de roupa. A bolsa GRANDE cerca de 8-10 kg.',
      en: 'The STANDARD bag holds about 5-6 kg of laundry. The LARGE bag about 8-10 kg.',
    },
    faqPaymentQ: { pt: 'Quais são os métodos de pagamento?', en: 'What payment methods do you accept?' },
    faqPaymentA: {
      pt: 'Aceitamos dinheiro, cartão multibanco, MB Way e transferência bancária.',
      en: 'We accept cash, debit card, MB Way and bank transfer.',
    },
    faqHoursQ: { pt: 'Qual é o horário de funcionamento?', en: 'What are the opening hours?' },
    faqHoursA: {
      pt: 'Segunda a Sexta: 9h-18h. Sábado: 10h-13h. Domingo: Encerrado.',
      en: 'Monday to Friday: 9am-6pm. Saturday: 10am-1pm. Sunday: Closed.',
    },
  },
  contact: {
    title: { pt: 'Contacto', en: 'Contact' },
    subtitle: {
      pt: 'Entre em contacto connosco. Estamos aqui para ajudar!',
      en: 'Get in touch with us. We\'re here to help!',
    },
    name: { pt: 'Nome', en: 'Name' },
    email: { pt: 'Email', en: 'Email' },
    phone: { pt: 'Telefone', en: 'Phone' },
    message: { pt: 'Mensagem', en: 'Message' },
    send: { pt: 'Enviar Mensagem', en: 'Send Message' },
    address: { pt: 'Morada', en: 'Address' },
    hours: { pt: 'Horário', en: 'Opening Hours' },
    hoursDetail: {
      pt: 'Seg-Sex: 9h-18h | Sáb: 10h-13h | Dom: Encerrado',
      en: 'Mon-Fri: 9am-6pm | Sat: 10am-1pm | Sun: Closed',
    },
    whatsapp: { pt: 'Enviar mensagem no WhatsApp', en: 'Message us on WhatsApp' },
    findUs: { pt: 'Onde nos encontrar', en: 'Find us' },
  },
  footer: {
    rights: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
    tagline: { pt: 'The Greatest Laundry', en: 'The Greatest Laundry' },
    privacyPolicy: { pt: 'Política de Privacidade', en: 'Privacy Policy' },
    termsConditions: { pt: 'Termos e Condições', en: 'Terms & Conditions' },
  },
} as const;

export type TranslationKey = keyof typeof translations;
