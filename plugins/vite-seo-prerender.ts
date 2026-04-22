import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

interface RouteConfig {
  path: string;
  title: string;
  description: string;
  canonical: string;
  hreflangPt: string;
  hreflangEn: string;
  h1: string;
  content: string; // key visible text for crawlers
  jsonLd?: object;
}

const DOMAIN = 'https://gloatlaundry.com';

const SERVICES_FAQ_PT = `
<h2>Perguntas Frequentes</h2>
<h3>Lavam sapatos?</h3><p>Sim. Agende uma recolha ou traga-os à loja. Tratamos do resto.</p>
<h3>A roupa é devolvida em cabides ou dobrada?</h3><p>As peças engomadas são devolvidas em cabides. As peças do serviço lavar e dobrar são devolvidas cuidadosamente dobradas.</p>
<h3>Fazem lavagem à mão para peças delicadas?</h3><p>Sim, a lavagem à mão está disponível para peças delicadas.</p>
<h3>Posso engomar apenas algumas peças?</h3><p>Sim, pode pedir o serviço de engomadoria sem subscrição. Peças individuais a partir de 2,50€ por peça.</p>
<h3>Como funciona a limpeza a seco?</h3><p>Entregue as suas peças na loja ou agende uma recolha. Tratamos com processos especializados de limpeza a seco e devolvemos em 5 dias.</p>`;

const SERVICES_FAQ_EN = `
<h2>Frequently Asked Questions</h2>
<h3>Do you wash shoes?</h3><p>Yes, absolutely. Schedule a pickup or bring them to the store. We handle the rest.</p>
<h3>Is clothing returned on hangers or folded?</h3><p>Ironed items are returned on hangers. Wash &amp; fold items are returned neatly folded.</p>
<h3>Do you hand wash delicate items?</h3><p>Yes, hand washing is available for delicate items.</p>
<h3>Can you iron just a few items (shirts, pants, etc)?</h3><p>Yes, you can order ironing without a subscription. Individual items start from €2.50 per piece.</p>
<h3>How does dry cleaning work?</h3><p>Drop off your items or schedule a pickup. We treat them with specialist dry cleaning processes and return them within 5 days.</p>`;

const HOME_FAQ_PT = `
<h2>Perguntas Frequentes</h2>
<h3>Posso entregar sem agendar?</h3><p>Sim, pode entregar diretamente na nossa loja na Rua de Artilharia 1 em Lisboa durante o horário de funcionamento. Não é necessário agendar para entregas na loja.</p>
<h3>Qual é o horário de funcionamento?</h3><p>A GLOAT está aberta de segunda a sexta das 9h às 18h, e ao sábado das 10h às 13h.</p>
<h3>Só operam em Lisboa?</h3><p>Sim, a GLOAT está localizada em Lisboa, perto do Jardim das Amoreiras. Fazemos recolha e entrega em vários bairros de Lisboa, incluindo Campo de Ourique, Estrela, Chiado e muito mais.</p>
<h3>A GLOAT é uma lavandaria self-service?</h3><p>Não. A GLOAT é uma lavandaria de serviço completo. Entrega na loja ou nós recolhemos, e tratamos de tudo.</p>
<h3>Falam inglês?</h3><p>Sim, a nossa equipa fala Inglês.</p>
<h3>Oferecem serviço expresso?</h3><p>Sim. Para lavagem e engomadoria, oferecemos uma opção expresso em 24 horas mediante um custo adicional.</p>
<h3>Qual é a forma mais rápida de contactar o suporte?</h3><p>Recomendamos que nos ligue ou contacte pelo WhatsApp para uma resposta mais rápida.</p>`;

const HOME_FAQ_EN = `
<h2>Frequently Asked Questions</h2>
<h3>Can I drop off without booking?</h3><p>Yes, you can drop off directly at our store on Rua de Artilharia 1 in Lisboa during opening hours. No booking needed for drop-offs.</p>
<h3>What are your opening hours?</h3><p>GLOAT is opened Monday through Friday from 9am to 6pm, and on Saturday from 10am to 1pm.</p>
<h3>Are you only in Lisbon?</h3><p>Yes, GLOAT is based in Lisbon, near Jardim das Amoreiras. We offer pickup and delivery across several Lisbon neighbourhoods including Campo de Ourique, Estrela, Chiado and much more.</p>
<h3>Is GLOAT a self-service laundromat?</h3><p>No. GLOAT is a full-service laundry. You drop off or we collect, and we take care of everything.</p>
<h3>Do you speak English?</h3><p>Yes, we&rsquo;re fully bilingual in Portuguese and English.</p>
<h3>Do you offer express service?</h3><p>Yes. For washing and ironing, we offer a 24-hour express option for an additional fee.</p>
<h3>What is the fastest way to reach support?</h3><p>We recommend calling us or contacting us on WhatsApp for the quickest response.</p>`;

const PRICING_FAQ_PT = `
<h2>Perguntas Frequentes</h2>
<h3>Posso cancelar a minha subscrição?</h3><p>Sim, claro. Não existe compromisso mínimo nos nossos planos mensais.</p>
<h3>Os preços variam consoante o tamanho ou peso?</h3><p>Alguns artigos têm preço por dimensão, como tapetes (por m²) e cortinados (por m). A maioria das peças tem preço fixo.</p>
<h3>A entrega está sempre incluída?</h3><p>A entrega está incluída em todos os planos mensais. Para pedidos pontuais sem subscrição, a recolha e entrega não está incluída. Consulte os preços de entrega na nossa página de Agendamento.</p>
<h3>Posso adicionar peças extra ao meu plano?</h3><p>Sim. Os subscritores podem adicionar peças extra a preços reduzidos.</p>`;

const PRICING_FAQ_EN = `
<h2>Frequently Asked Questions</h2>
<h3>Can I pause or cancel my subscription?</h3><p>Yes, of course. There is no minimum commitment for our monthly subscriptions.</p>
<h3>Do prices vary by item size or weight?</h3><p>Some items are priced by size or dimension, such as rugs (per m²) and curtains (per m). Most garments have fixed prices.</p>
<h3>Is delivery always included?</h3><p>Delivery is included in all monthly plans. For one-off orders without a subscription, pickup and delivery is not included. Check the delivery prices on our Booking page.</p>
<h3>Can I add extra items outside my plan?</h3><p>Yes. Subscribers can add extra items at reduced subscriber prices.</p>`;

const BOOKING_FAQ_PT = `
<h2>Perguntas Frequentes</h2>
<h3>Com quanto tempo de antecedência devo agendar?</h3><p>Pode agendar uma recolha pelo nosso site com pelo menos 24 horas de antecedência. Se precisar com urgência, contacte a nossa equipa pelo WhatsApp ou por telefone.</p>
<h3>Posso alterar ou cancelar um agendamento?</h3><p>Sim, se precisar de alterar ou cancelar um agendamento contacte-nos por telefone ou WhatsApp.</p>
<h3>Posso escolher um horário específico para a recolha?</h3><p>Sim, pode escolher o horário disponível que melhor se adapta a si.</p>
<h3>Onde fazem recolha e entrega?</h3><p>Fazemos recolha e entrega em Lisboa e arredores: Belém, Ajuda, Alcântara, Estrela, Campo de Ourique, Santo António, Misericórdia, Santa Maria Maior, São Vicente, Penha de França, Arroios, Beato, Parque das Nações, Areeiro, Alvalade, Avenidas Novas, Campolide, Benfica e São Domingos de Benfica.</p>`;

const BOOKING_FAQ_EN = `
<h2>Frequently Asked Questions</h2>
<h3>How far in advance do I need to book?</h3><p>You can book a pickup through our website at least 24 hours in advance. If you need it urgently please contact our team through WhatsApp or call and we&rsquo;ll be happy to help.</p>
<h3>Can I change or cancel a booking?</h3><p>Yes, if you need to change or cancel a booking please call us or contact us on WhatsApp.</p>
<h3>Can I request a specific pickup time?</h3><p>Yes, you can choose whichever time slot available best suits you.</p>
<h3>Where do you pickup and deliver?</h3><p>We do pickup and delivery in Lisbon and surrounding areas: Belém, Ajuda, Alcântara, Estrela, Campo de Ourique, Santo António, Misericórdia, Santa Maria Maior, São Vicente, Penha de França, Arroios, Beato, Parque das Nações, Areeiro, Alvalade, Avenidas Novas, Campolide, Benfica, São Domingos de Benfica.</p>`;

const SERVICES_PT = `
<h2>Lavar &amp; Dobrar</h2>
<p>Roupa lavada com produtos profissionais e cuidadosamente dobrada, pronta a guardar. Entregue em 48 horas.</p>
<h2>Engomadoria</h2>
<p>Engomadoria profissional para camisas, fatos, lençóis e muito mais. Entregue em 48 horas.</p>
<h2>Limpeza a Seco</h2>
<p>Tratamento especializado de limpeza a seco, para tecidos delicados e peças especiais.</p>
<h2>Artigos Especiais</h2>
<p>Tapetes, cortinados, sofás e artigos em pele, edredons, cobertores, e muito mais.</p>
<h2>Serviço Expresso</h2>
<p>Precisa com urgência? Entregamos em 24 horas. Disponível por WhatsApp ou na loja.</p>
<h2>Recolha e Entrega</h2>
<p>Serviço de recolha e entrega ao domicílio em Lisboa e arredores.</p>
${SERVICES_FAQ_PT}`;

const SERVICES_EN = `
<h2>Wash &amp; Fold</h2>
<p>Clothes washed with professional products and carefully folded, ready to store. Delivered within 48 hours.</p>
<h2>Ironing</h2>
<p>Professional ironing for shirts, suits, bed sheets and much more. Delivered within 48 hours.</p>
<h2>Dry Cleaning</h2>
<p>Specialized dry cleaning treatment for delicate fabrics and special garments.</p>
<h2>Special Items</h2>
<p>Rugs, curtains, sofas and leather items, duvets, blankets, and much more.</p>
<h2>Express Service</h2>
<p>Need it urgently? We deliver within 24 hours. Available via WhatsApp or in-store.</p>
<h2>Pickup &amp; Delivery</h2>
<p>Home pickup and delivery service in Lisbon and surrounding areas.</p>
${SERVICES_FAQ_EN}`;

const PRICING_PT = `
<p>Preços transparentes sem surpresas. Planos mensais e preços por peça para lavar, engomar, limpeza a seco e artigos de casa em Lisboa.</p>

<h2>Planos Mensais</h2>
<h3>Plano Lite — 65,00€ / 4 semanas</h3>
<p>4 bolsas STANDARD (aprox. 5kg) por mês, 1 recolha e entrega semanal, lavagem profissional, roupa dobrada e pronta a guardar, entrega em 48h.</p>
<h3>Plano Max — 85,00€ / 4 semanas</h3>
<p>4 bolsas GRANDE (aprox. 10kg) por mês, 1 recolha e entrega semanal, lavagem profissional, roupa dobrada e pronta a guardar, entrega em 48h.</p>
<h3>Plano Engomadoria — 60,00€ / 4 semanas</h3>
<p>24 peças apenas engomadas por mês, 1 recolha e entrega semanal, engomadoria profissional, entregue em cabides, entregue em 48 horas.</p>
<h3>Plano Lavar e Engomar — 80,00€ / 4 semanas</h3>
<p>24 peças lavadas e engomadas por mês, 1 recolha e entrega semanal, lavagem + engomadoria, serviço completo, entregue em cabides, entregue em 48 horas.</p>

<h2>Lavar &amp; Dobrar</h2>
<p>Bolsa STANDARD (aprox. 5kg) — com plano: 15,00€ | sem plano: 19,00€. Bolsa GRANDE (aprox. 10kg) — com plano: 20,00€ | sem plano: 26,00€.</p>

<h2>Lavar &amp; Engomar</h2>
<p>1 peça com plano: 2,90€ | 1 peça sem plano: 3,90€ | 1 peça lavagem à mão: 8,50€ | Pack 5 camisas (de uma vez): 16,00€.</p>

<h2>Engomar Apenas</h2>
<p>Pack 50 peças (1 mês): 80,00€ | 5 camisas (de uma vez): 10,50€ | 12 peças (de uma vez): 28,00€ | 1 peça com plano: 2,00€ | 1 peça sem plano: 2,50€ | Capa edredon casal: 5,90€ | Capa edredon solteiro: 4,80€.</p>

<h2>Limpeza a Seco</h2>
<p>Camisa/Blusa: 7,90€ | Camisa/Blusa de Seda: 8,90€ | Gravata: 7,90€ | Calças/Saia: 11,00€ | Camisola/Pullover: 11,60€ | Blazer: 16,00€ | Blusão: 17,90€ | Casaco/Sobretudo: 21,90€ | Fato (2 peças): 20,90€ | Vestido Simples: 14,40€ | Vestido Seda/Linho Curto: 20,30€ | Vestido de Festa: 22,40€ | Ténis de Tecido ou Sintético: 23,00€.</p>

<h2>Artigos de Casa</h2>
<p>Edredon Solteiro: 22,40€ | Edredon Solteiro de Penas: 28,00€ | Edredon Casal: 28,60€ | Edredon Casal de Penas: 33,60€ | Capa Edredon Solteiro: 11,40€ | Capa Edredon Casal: 12,60€ | Colcha Simples Solteiro: 15,90€ | Resguardo Simples Solteiro: 10,30€ | Almofada/Travesseiro Sintético: 12,90€ | Cortina: 17,90€/m | Tapete: 17,90€/m² | Toalha de Mesa: 13,90€/m².</p>

${PRICING_FAQ_PT}`;

const PRICING_EN = `
<p>Transparent pricing with no surprises. Monthly plans and per-item pricing for washing, ironing, dry cleaning and household items in Lisbon.</p>

<h2>Monthly Plans</h2>
<h3>Lite Plan — €65.00 / 4 weeks</h3>
<p>4 STANDARD bags (approx. 5kg) per month, 1 weekly pickup and delivery, professional wash, neatly folded &amp; ready to store, delivery in 48h.</p>
<h3>Max Plan — €85.00 / 4 weeks</h3>
<p>4 MAX bags (approx. 10kg) per month, 1 weekly pickup and delivery, professional wash, neatly folded &amp; ready to store, delivery in 48h.</p>
<h3>Ironing Plan — €60.00 / 4 weeks</h3>
<p>24 pieces ironed only per month, 1 weekly pickup and delivery, professional ironing, delivered on hangers, delivered in 48 hours.</p>
<h3>Wash &amp; Iron Plan — €80.00 / 4 weeks</h3>
<p>24 pieces washed and ironed per month, 1 weekly pickup and delivery, wash + ironing, full service, delivered on hangers, delivered in 48 hours.</p>

<h2>Wash &amp; Fold</h2>
<p>STANDARD bag (approx. 5kg) — with plan: €15.00 | without plan: €19.00. MAX bag (approx. 10kg) — with plan: €20.00 | without plan: €26.00.</p>

<h2>Wash &amp; Iron</h2>
<p>1 item with plan: €2.90 | 1 item without plan: €3.90 | 1 item hand wash: €8.50 | Pack 5 shirts (at once): €16.00.</p>

<h2>Iron Only</h2>
<p>Pack 50 items (1 month): €80.00 | 5 shirts (at once): €10.50 | 12 items (at once): €28.00 | 1 item with plan: €2.00 | 1 item without plan: €2.50 | Double duvet cover: €5.90 | Single duvet cover: €4.80.</p>

<h2>Dry Cleaning</h2>
<p>Shirt/Blouse: €7.90 | Silk Shirt/Blouse: €8.90 | Tie: €7.90 | Pants/Skirt: €11.00 | Sweater/Pullover: €11.60 | Blazer: €16.00 | Jacket: €17.90 | Coat/Overcoat: €21.90 | Suit (2 pieces): €20.90 | Simple Dress: €14.40 | Short Silk/Linen Dress: €20.30 | Long Silk/Linen Evening Dress: €22.40 | Fabric or Synthetic Sneakers: €23.00.</p>

<h2>Household Items</h2>
<p>Single Duvet: €22.40 | Feather/Quilted Single Duvet: €28.00 | Double Duvet: €28.60 | Feather/Quilted Double Duvet: €33.60 | Single Duvet Cover: €11.40 | Double Duvet Cover: €12.60 | Simple Single Bedspread: €15.90 | Simple Single Mattress Protector: €10.30 | Synthetic Pillow: €12.90 | Curtain: €17.90/m | Rug: €17.90/m² | Tablecloth: €13.90/m².</p>

${PRICING_FAQ_EN}`;

const HOME_PT = `
<p>Poupe tempo e confie na GLOAT. Lavandaria profissional em Lisboa com recolha e entrega em casa em 48 horas.</p>
<h2>Como Funciona a Nossa Lavandaria</h2>
<p><strong>Entrega a roupa</strong> — Traga a sua roupa à nossa loja ou agende uma recolha ao domicílio.</p>
<p><strong>Lavamos e tratamos</strong> — Tratamos a sua roupa com produtos profissionais e todo o cuidado.</p>
<p><strong>Roupa impecável e pronta</strong> — A sua roupa fica pronta, engomada ou só dobrada, conforme escolhido.</p>
<h2>Porquê escolher a GLOAT em Lisboa?</h2>
<p><strong>Rapidez</strong> — Entrega rápida, normalmente em 48 horas. Serviço express (24 horas) disponível por WhatsApp ou na loja.</p>
<p><strong>Qualidade Profissional</strong> — Tratamento especializado com processos e produtos profissionais. Detergente antialérgico disponível.</p>
<p><strong>Preços Claros</strong> — Sem surpresas. Sabe sempre quanto vai pagar.</p>
<p><strong>Serviço Fiável</strong> — Mais de 170 reviews com 4.7/5 estrelas. Conte connosco semana após semana, sempre com a mesma qualidade.</p>
${SERVICES_PT}
${HOME_FAQ_PT}`;

const HOME_EN = `
<p>Save time and trust GLOAT. Professional laundry in Lisbon with pickup and delivery to your door in 48 hours.</p>
<h2>How Our Laundry Service Works</h2>
<p><strong>Drop off your laundry</strong> — Bring your laundry to our store or schedule a home pickup.</p>
<p><strong>We wash &amp; care</strong> — We handle your clothes with professional products and the utmost care.</p>
<p><strong>Flawless &amp; ready</strong> — Your laundry is ready, ironed or just folded, as you choose.</p>
<h2>Why Choose GLOAT in Lisbon?</h2>
<p><strong>Speed</strong> — Fast turnaround, usually within 48 hours. Express service (24 hours) available via WhatsApp or in-store.</p>
<p><strong>Professional Quality</strong> — Specialized garment care with professional processes and products. Antiallergic detergent available.</p>
<p><strong>Clear Pricing</strong> — No surprises. You always know what you'll pay.</p>
<p><strong>Reliable Service</strong> — Over 170 reviews, 4.7/5 stars. Count on us week after week, always with the same quality.</p>
${SERVICES_EN}
${HOME_FAQ_EN}`;

const CONTACT_PT = `
<p>Envie-nos uma mensagem, ligue ou visite a nossa loja em Lisboa. Estamos aqui para ajudar.</p>
<h2>Morada</h2><p>Rua Artilharia 1, Nº 1, 1250-036 Lisboa, Portugal</p>
<h2>Telefone</h2><p>(+351) 935 479 900</p>
<h2>Horário</h2><p>Segunda a Sexta: 09:00–18:00 | Sábado: 10:00–13:00 | Domingo: Encerrado</p>
<h2>WhatsApp</h2><p>Contacte-nos pelo WhatsApp para uma resposta rápida.</p>`;

const CONTACT_EN = `
<p>Send us a message, call or visit our store in Lisbon. We're here to help.</p>
<h2>Address</h2><p>Rua Artilharia 1, Nº 1, 1250-036 Lisbon, Portugal</p>
<h2>Phone</h2><p>(+351) 935 479 900</p>
<h2>Hours</h2><p>Monday to Friday: 09:00–18:00 | Saturday: 10:00–13:00 | Sunday: Closed</p>
<h2>WhatsApp</h2><p>Contact us via WhatsApp for a quick response.</p>`;

const BOOKING_PT = `
<p>Agende uma recolha de roupa ao domicílio em Lisboa. Recolhemos, lavamos e entregamos a sua roupa profissionalmente, normalmente em 48 horas.</p>
<h2>Como Agendar</h2>
<p>Preencha o formulário com a sua morada, escolha o serviço e o horário de recolha. Confirmamos rapidamente por email ou WhatsApp.</p>
<h2>Área de Cobertura</h2>
<p>Servimos Lisboa e arredores. Recolhas e entregas entre as 9h00 e as 15h00.</p>
<h2>Serviços Disponíveis</h2>
<p>Lavar &amp; Dobrar, Lavar &amp; Engomar, Apenas Engomar, Limpeza a Seco e Artigos de Casa.</p>
${BOOKING_FAQ_PT}`;

const BOOKING_EN = `
<p>Schedule a home laundry pickup in Lisbon. We collect, wash and deliver your laundry professionally, usually within 48 hours.</p>
<h2>How to Book</h2>
<p>Fill in the form with your address, choose your service and pickup time slot. We confirm quickly via email or WhatsApp.</p>
<h2>Service Area</h2>
<p>We serve Lisbon and surrounding areas. Pickups and deliveries between 9:00 AM and 3:00 PM.</p>
<h2>Available Services</h2>
<p>Wash &amp; Fold, Wash &amp; Iron, Iron Only, Dry Cleaning and Household Items.</p>
${BOOKING_FAQ_EN}`;

const routes: RouteConfig[] = [
  {
    path: '/',
    title: 'GLOAT — The Greatest Laundry | Lavandaria em Lisboa',
    description: 'GLOAT — Lavandaria profissional em Lisboa. Lavar, dobrar, engomar e limpeza a seco. Recolha e entrega em casa em 48 horas. Planos mensais a partir de 60€.',
    canonical: DOMAIN,
    hreflangPt: DOMAIN,
    hreflangEn: `${DOMAIN}/home`,
    h1: 'TRATAMOS DE TODA A SUA ROUPA!',
    content: HOME_PT,
  },
  {
    path: '/home',
    title: 'GLOAT — The Greatest Laundry | Laundry Service in Lisbon',
    description: 'GLOAT — Professional laundry service in Lisbon. Wash, fold, iron and dry cleaning. Home pickup and delivery within 48 hours. Monthly plans from €60.',
    canonical: `${DOMAIN}/home`,
    hreflangPt: DOMAIN,
    hreflangEn: `${DOMAIN}/home`,
    h1: 'WE TAKE CARE OF ALL YOUR LAUNDRY!',
    content: HOME_EN,
  },
  {
    path: '/servicos',
    title: 'Serviços | GLOAT Laundry Lisboa',
    description: 'Serviços de lavandaria GLOAT em Lisboa: lavar e dobrar, engomar, limpeza a seco, serviço expresso 24h e recolha e entrega ao domicílio.',
    canonical: `${DOMAIN}/servicos`,
    hreflangPt: `${DOMAIN}/servicos`,
    hreflangEn: `${DOMAIN}/services`,
    h1: 'Os nossos serviços de lavandaria',
    content: `<p>Oferecemos uma gama completa de serviços de lavandaria, engomadoria e limpeza a seco para todas as necessidades.</p>${SERVICES_PT}`,
  },
  {
    path: '/services',
    title: 'Services | GLOAT Laundry Lisbon',
    description: 'GLOAT laundry services in Lisbon: wash & fold, ironing, dry cleaning, 24h express service and home pickup & delivery.',
    canonical: `${DOMAIN}/services`,
    hreflangPt: `${DOMAIN}/servicos`,
    hreflangEn: `${DOMAIN}/services`,
    h1: 'Our Laundry Services',
    content: `<p>We offer a full range of laundry, ironing and dry cleaning services for all needs.</p>${SERVICES_EN}`,
  },
  {
    path: '/precos',
    title: 'Preços e Planos | GLOAT Laundry Lisboa',
    description: 'Preços e planos mensais GLOAT em Lisboa. Planos a partir de 60€ por 4 semanas. Preços por peça para lavar, engomar e limpeza a seco.',
    canonical: `${DOMAIN}/precos`,
    hreflangPt: `${DOMAIN}/precos`,
    hreflangEn: `${DOMAIN}/pricing`,
    h1: 'Preços e Planos',
    content: PRICING_PT,
  },
  {
    path: '/pricing',
    title: 'Pricing & Plans | GLOAT Laundry Lisbon',
    description: 'GLOAT pricing and monthly plans in Lisbon. Plans from €60 per 4 weeks. Per-item pricing for washing, ironing and dry cleaning.',
    canonical: `${DOMAIN}/pricing`,
    hreflangPt: `${DOMAIN}/precos`,
    hreflangEn: `${DOMAIN}/pricing`,
    h1: 'Pricing & Plans',
    content: PRICING_EN,
  },
  {
    path: '/planos',
    title: 'Planos Mensais | GLOAT Laundry Lisboa',
    description: 'Planos mensais GLOAT com recolha e entrega em Lisboa. Lite 65€, Max 85€, Engomadoria 60€, Lavar e Engomar 80€ por 4 semanas.',
    canonical: `${DOMAIN}/precos`,
    hreflangPt: `${DOMAIN}/precos`,
    hreflangEn: `${DOMAIN}/pricing`,
    h1: 'Planos Mensais',
    content: PRICING_PT,
  },
  {
    path: '/contacto',
    title: 'Contacto | GLOAT Laundry Lisboa',
    description: 'Contacte a GLOAT em Lisboa. Rua Artilharia 1, Nº 1, 1250-036 Lisboa. Telefone (+351) 935 479 900. Seg-Sex 9h-18h, Sáb 10h-13h.',
    canonical: `${DOMAIN}/contacto`,
    hreflangPt: `${DOMAIN}/contacto`,
    hreflangEn: `${DOMAIN}/contact`,
    h1: 'Contacte a GLOAT',
    content: CONTACT_PT,
  },
  {
    path: '/contact',
    title: 'Contact | GLOAT Laundry Lisbon',
    description: 'Contact GLOAT in Lisbon. Rua Artilharia 1, Nº 1, 1250-036 Lisbon. Phone (+351) 935 479 900. Mon-Fri 9am-6pm, Sat 10am-1pm.',
    canonical: `${DOMAIN}/contact`,
    hreflangPt: `${DOMAIN}/contacto`,
    hreflangEn: `${DOMAIN}/contact`,
    h1: 'Contact GLOAT',
    content: CONTACT_EN,
  },
  {
    path: '/reserva',
    title: 'Agendar Recolha | GLOAT Laundry Lisboa',
    description: 'Agende uma recolha de roupa ao domicílio em Lisboa com a GLOAT. Recolhemos, lavamos e entregamos em 48 horas. Cobertura em Lisboa e arredores.',
    canonical: `${DOMAIN}/reserva`,
    hreflangPt: `${DOMAIN}/reserva`,
    hreflangEn: `${DOMAIN}/booking`,
    h1: 'Agendar Recolha',
    content: BOOKING_PT,
  },
  {
    path: '/booking',
    title: 'Book a Pickup | GLOAT Laundry Lisbon',
    description: 'Schedule a home laundry pickup in Lisbon with GLOAT. We collect, wash and deliver within 48 hours. Coverage in Lisbon and surrounding areas.',
    canonical: `${DOMAIN}/booking`,
    hreflangPt: `${DOMAIN}/reserva`,
    hreflangEn: `${DOMAIN}/booking`,
    h1: 'Book a Pickup',
    content: BOOKING_EN,
  },
  {
    path: '/politica-de-privacidade',
    title: 'Política de Privacidade | GLOAT Laundry',
    description: 'Política de privacidade da GLOAT Laundry. Como tratamos os seus dados pessoais em conformidade com o RGPD.',
    canonical: `${DOMAIN}/politica-de-privacidade`,
    hreflangPt: `${DOMAIN}/politica-de-privacidade`,
    hreflangEn: `${DOMAIN}/privacy-policy`,
    h1: 'Política de Privacidade',
    content: `<p>Como a GLOAT trata os seus dados pessoais em conformidade com o Regulamento Geral de Proteção de Dados (RGPD).</p>`,
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | GLOAT Laundry',
    description: 'GLOAT Laundry privacy policy. How we handle your personal data in compliance with GDPR.',
    canonical: `${DOMAIN}/privacy-policy`,
    hreflangPt: `${DOMAIN}/politica-de-privacidade`,
    hreflangEn: `${DOMAIN}/privacy-policy`,
    h1: 'Privacy Policy',
    content: `<p>How GLOAT handles your personal data in compliance with the General Data Protection Regulation (GDPR).</p>`,
  },
  {
    path: '/termos-e-condicoes',
    title: 'Termos e Condições | GLOAT Laundry',
    description: 'Termos e condições de utilização dos serviços da GLOAT Laundry em Lisboa.',
    canonical: `${DOMAIN}/termos-e-condicoes`,
    hreflangPt: `${DOMAIN}/termos-e-condicoes`,
    hreflangEn: `${DOMAIN}/terms-and-conditions`,
    h1: 'Termos e Condições',
    content: `<p>Termos e condições de utilização dos serviços da GLOAT Laundry em Lisboa.</p>`,
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms & Conditions | GLOAT Laundry',
    description: 'Terms and conditions for GLOAT Laundry services in Lisbon.',
    canonical: `${DOMAIN}/terms-and-conditions`,
    hreflangPt: `${DOMAIN}/termos-e-condicoes`,
    hreflangEn: `${DOMAIN}/terms-and-conditions`,
    h1: 'Terms & Conditions',
    content: `<p>Terms and conditions for GLOAT Laundry services in Lisbon.</p>`,
  },
];


export function seoPrerender(): Plugin {
  return {
    name: 'vite-seo-prerender',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

      let generated = 0;
      for (const route of routes) {
        // Always start from the pristine template so per-route replacements
        // don't accumulate across iterations.
        const enhanced = injectSeoContent(indexHtml, route);

        if (route.path === '/') {
          fs.writeFileSync(path.join(distDir, 'index.html'), enhanced, 'utf-8');
        } else {
          // Support nested paths like /foo/bar — create the full directory tree.
          const routeDir = path.join(distDir, ...route.path.split('/').filter(Boolean));
          fs.mkdirSync(routeDir, { recursive: true });
          fs.writeFileSync(path.join(routeDir, 'index.html'), enhanced, 'utf-8');
        }
        generated++;
      }

      console.log(`[seo-prerender] Generated static HTML for ${generated} routes`);
    },
  };
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function injectSeoContent(template: string, route: RouteConfig): string {
  // Defensive: explicitly create a fresh string copy per call so no caller
  // can ever share or mutate this working buffer across routes.
  let html = String(template);
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);
  const canonical = escapeAttr(route.canonical);

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);

  // <meta name="description" ...>
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${description}">`
  );

  // <link rel="canonical" ...>
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}" />`
  );

  // OG / Twitter tags — flexible matching, replace if present otherwise inject before </head>
  const replaceOrInject = (regex: RegExp, replacement: string) => {
    if (regex.test(html)) {
      html = html.replace(regex, replacement);
    } else {
      html = html.replace('</head>', `    ${replacement}\n  </head>`);
    }
  };

  replaceOrInject(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${description}">`
  );
  replaceOrInject(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${title}">`
  );
  replaceOrInject(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${description}">`
  );
  replaceOrInject(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${escapeAttr(title)}">`
  );
  replaceOrInject(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${escapeAttr(route.canonical)}">`
  );

  // hreflang tags before </head>
  const hreflangTags = `    <link rel="alternate" hreflang="pt" href="${escapeAttr(route.hreflangPt)}" />
    <link rel="alternate" hreflang="en" href="${escapeAttr(route.hreflangEn)}" />
    <link rel="alternate" hreflang="x-default" href="${escapeAttr(route.hreflangPt)}" />`;
  html = html.replace('</head>', `${hreflangTags}\n  </head>`);

  // Inject visible SEO content inside <div id="root"> so crawlers see it.
  // React will replace this on hydration.
  const seoBlock = `<div id="root"><div id="seo-prerender"><h1>${route.h1}</h1>${route.content}</div>`;
  html = html.replace('<div id="root"></div>', `${seoBlock}</div>`);

  return html;
}
