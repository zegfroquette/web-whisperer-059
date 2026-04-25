'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const services = [
  {
    enTitle: 'Wash & Fold',
    ptTitle: 'Lavagem e Dobra',
    enText:
      'The most popular service we offer. You drop off your clothes or we pick them up, we wash and dry everything at the right temperature, fold it neatly, and have it back to you within 48 hours. No sorting, no waiting around, no hanging things to dry in your kitchen. Just clean clothes, ready to put away.',
    ptText:
      'O serviço mais pedido na GLOAT. Deixa a roupa ou nós vamos buscá-la, lavamos e secamos tudo à temperatura certa, dobramos com cuidado e devolvemos em 48 horas. Sem separar, sem esperar, sem roupa pendurada na cozinha. Só roupa limpa, pronta a arrumar.',
    enSlug: 'wash-fold-lisboa',
    ptSlug: 'lavagem-dobra-lisboa',
  },
  {
    enTitle: 'Duvet & Comforter Cleaning',
    ptTitle: 'Limpeza de Edredões',
    enText:
      "Duvets are one of those things people forget to clean — until they remember. Lisbon winters are mild but damp, and a duvet that hasn't been properly cleaned holds more than just warmth. We clean duvets and comforters of all sizes and materials, removing deep-seated dirt and odours, and returning them fresh and ready for use.",
    ptText:
      'Os edredões são das peças que as pessoas mais adiam limpar — até um dia lembrarem. Os invernos em Lisboa são amenos mas húmidos, e um edredão que nunca foi lavado a fundo guarda mais do que calor. Limpamos edredões de todos os tamanhos e materiais, removendo sujidade acumulada e odores, e devolvemo-los frescos e prontos.',
    enSlug: 'duvet-cleaning-lisboa',
    ptSlug: 'limpeza-edredoes-lisboa',
  },
  {
    enTitle: 'Bedding & Linen Washing',
    ptTitle: 'Lavagem de Roupa de Cama',
    enText:
      'Sheets and pillowcases need regular washing at the right temperature to stay truly clean. We take care of all bedroom linens, washing them properly and returning them soft and fresh. If you want them ironed, we do that too.',
    ptText:
      'Os lençóis e fronhas precisam de ser lavados regularmente à temperatura certa para ficarem verdadeiramente limpos. Tratamos de toda a roupa de cama, lavando como deve ser e devolvendo-a suave e fresca. Se quiser passada a ferro, também fazemos.',
    enSlug: 'bedding-linen-lisboa',
    ptSlug: 'roupa-cama-lisboa',
  },
  {
    enTitle: 'Curtain Washing',
    ptTitle: 'Lavagem de Cortinas',
    enText:
      "Curtains collect dust quietly. Most people only notice when they take them down. We clean curtains of all sizes, fabrics, and styles — lightweight sheers to heavy lined curtains — carefully, without shrinking or distorting the fabric.",
    ptText:
      'As cortinas acumulam pó em silêncio. A maioria das pessoas só se apercebe quando as tira. Lavamos cortinas de todos os tamanhos, tecidos e estilos — de voile a cortinas forradas pesadas — com cuidado, sem encolher nem deformar o tecido.',
    enSlug: 'curtain-washing-lisboa',
    ptSlug: 'lavagem-cortinas-lisboa',
  },
  {
    enTitle: 'Baby Clothes Washing',
    ptTitle: 'Lavagem de Roupa de Bebé',
    enText:
      'Baby clothes need gentler care than regular laundry. We use safe, effective washing methods that remove stains and bacteria while keeping delicate fabrics soft against sensitive skin.',
    ptText:
      'A roupa de bebé precisa de cuidados mais delicados do que a roupa comum. Usamos métodos de lavagem seguros e eficazes que removem manchas e bactérias, mantendo os tecidos delicados suaves contra a pele sensível dos bebés.',
    enSlug: 'baby-clothes-lisboa',
    ptSlug: 'roupa-bebe-lisboa',
  },
  {
    enTitle: 'Sports Clothing Washing',
    ptTitle: 'Lavagem de Roupa Desportiva',
    enText:
      'Sportswear takes a beating — sweat, odour, and hard stains build up fast, especially in Lisbon summers. We wash all types of sports clothing while preserving the technical properties of the fabric so your kit stays in good shape.',
    ptText:
      'O vestuário desportivo sofre muito — suor, odores e manchas acumulam-se rapidamente, especialmente nos verões de Lisboa. Lavamos todo o tipo de roupa desportiva preservando as propriedades técnicas do tecido para que o seu equipamento se mantenha em bom estado.',
    enSlug: 'sports-clothing-lisboa',
    ptSlug: 'roupa-desportiva-lisboa',
  },
  {
    enTitle: 'Delicate Fabrics Washing',
    ptTitle: 'Lavagem de Tecidos Delicados',
    enText:
      'Silk, lace, wool, and other delicate garments need a different approach. We handle them with specialist care, cleaning thoroughly without compromising their texture, shape, or colour.',
    ptText:
      'Seda, renda, lã e outros tecidos delicados precisam de uma abordagem diferente. Tratamo-los com cuidados especializados, limpando a fundo sem comprometer a textura, a forma ou a cor.',
    enSlug: 'delicate-fabrics-lisboa',
    ptSlug: 'tecidos-delicados-lisboa',
  },
  {
    enTitle: 'Shirt Laundry Service',
    ptTitle: 'Lavagem de Camisas',
    enText:
      'Shirts need more than a regular wash if you want them looking sharp. We wash and finish shirts to a professional standard — stains removed, collars crisp, ready to wear.',
    ptText:
      'As camisas precisam de mais do que uma lavagem normal para ficarem impecáveis. Lavamos e acabamos camisas com rigor profissional — manchas removidas, colarinhos firmes, prontas a usar.',
    enSlug: 'shirt-laundry-lisboa',
    ptSlug: 'lavagem-camisas-lisboa',
  },
  {
    enTitle: 'Ironing Service',
    ptTitle: 'Serviço de Engomadoria',
    enText:
      'We iron shirts, trousers, dresses, and anything else in your wardrobe to a clean, sharp finish. Drop off a pile and collect it looking like it just came back from a tailor.',
    ptText:
      'Passamos camisas, calças, vestidos e o que mais precisar, com um acabamento limpo e rigoroso. Deixe uma pilha e venha buscar a sua roupa como se acabasse de sair de uma alfaiataria.',
    enSlug: 'ironing-service-lisboa',
    ptSlug: 'engomadoria-lisboa',
  },
  {
    enTitle: 'Area Rug Cleaning',
    ptTitle: 'Limpeza de Tapetes de Área',
    enText:
      'Lisboa apartments are full of beautiful rugs. From traditional hand-woven pieces to modern area rugs, they collect everything — dirt, dust, food, spills — and a regular vacuum only gets so far. We deep clean rugs of all sizes, materials, and styles, removing embedded dirt and stains and restoring the colour and texture of your rug. Drop it off at our store near Amoreiras or let us handle the pickup.',
    ptText:
      'Os apartamentos de Lisboa estão cheios de tapetes bonitos. De peças tradicionais tecidas à mão a tapetes modernos, acumulam tudo — pó, sujidade, comida, derrames — e um aspirador normal só chega até certo ponto. Fazemos limpeza profunda de tapetes de todos os tamanhos, materiais e estilos, removendo sujidade acumulada e manchas e restaurando a cor e a textura do seu tapete. Traga à nossa loja junto às Amoreiras ou deixe-nos tratar da recolha.',
    enSlug: 'area-rug-cleaning-lisboa',
    ptSlug: 'limpeza-tapetes-area-lisboa',
  },
  {
    enTitle: 'Express Laundry Service',
    ptTitle: 'Serviço de Lavandaria Expresso',
    enText:
      'Need it back fast? Our express service gets your laundry washed, dried, and ready within 24 hours. Available via WhatsApp or in-store.',
    ptText:
      'Precisa da roupa de volta a tempo? O nosso serviço expresso devolve-lhe a roupa lavada, seca e pronta em 24 horas. Disponível por WhatsApp ou na loja.',
    enSlug: 'express-laundry-lisboa',
    ptSlug: 'lavandaria-expresso-lisboa',
  },
  {
    enTitle: 'Laundry Pickup & Delivery',
    ptTitle: 'Recolha e Entrega de Roupa',
    enText:
      'We collect from your door across Lisboa — Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa, and more. Everything comes back clean and folded. No trips to the store needed.',
    ptText:
      'Recolhemos na sua porta em toda a Lisboa — Campo de Ourique, Estrela, Chiado, Lapa, Marquês de Pombal, Saldanha, Areeiro, Alvalade, Restelo, Bairro Alto, Baixa e mais. Tudo volta limpo e dobrado. Sem deslocações à loja.',
    enSlug: 'laundry-pickup-delivery-lisboa',
    ptSlug: 'recolha-entrega-lisboa',
  },
];

export default function LaundryServiceContent() {
  const { language } = useLanguage();
  const pt = language === 'pt';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          {...fadeUp}
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {pt ? 'Lavandaria em Lisboa' : 'Laundry Service in Lisboa'}
        </motion.h1>

        <motion.div {...fadeUp} className="mb-10 space-y-4">
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Lisboa é uma cidade que não para. Entre o trabalho, a família e tudo o que a cidade oferece, a roupa acumula mais depressa do que gostaríamos de admitir. A maioria das casas em Lisboa não tem secador — e no inverno, quando a chuva teima em não passar, pilhas de roupa húmida espalhadas pelo apartamento não são a imagem que ninguém quer de casa. É aqui que entramos.'
              : "Lisbon moves fast. Between work, family, and the city itself pulling you in every direction, laundry piles up faster than anyone wants to admit. Most people in Lisboa don't own a dryer — and in winter, when the rain doesn't stop for days, a pile of wet clothes hanging around the apartment is nobody's idea of home. That's where we come in."}
          </p>
          <p className="text-muted-foreground text-lg">
            {pt
              ? 'Na GLOAT, tratamos da sua roupa do início ao fim. Traga-a à nossa loja junto às Amoreiras, ou agende uma recolha e vamos buscar a sua porta. Tudo volta lavado, seco e pronto — dobrado ou passado a ferro, exatamente como pediu.'
              : "At GLOAT, we handle your laundry from start to finish. Drop it off at our store near Amoreiras, or schedule a pickup and we'll collect it from your door. Everything comes back washed, dried, and ready — folded or ironed, exactly how you asked."}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {pt ? s.ptTitle : s.enTitle}
              </h2>
              <p className="text-muted-foreground text-lg mb-4">{pt ? s.ptText : s.enText}</p>
              <Link
                href={`/${language}/${pt ? s.ptSlug : s.enSlug}`}
                className="text-primary font-semibold hover:underline"
              >
                {pt ? 'Saber mais →' : 'Learn more →'}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href={`/${language}/booking`}>
              {pt ? 'Reservar Recolha' : 'Book a Pickup'}
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
