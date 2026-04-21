import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { format, isWeekend, isBefore, startOfDay, addDays } from 'date-fns';

const ServiceAreaMap = lazy(() => import('@/components/ServiceAreaMap'));
import {
  CalendarIcon, ChevronLeft, ChevronRight, Check, Plus, Minus,
  Phone, Mail, MapPin, Clock, Package, Settings2, FileText, ShieldCheck, PartyPopper, Pencil, AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TIME_SLOTS = [
  '09:00 – 10:00',
  '10:00 – 11:00',
  '11:00 – 12:00',
  '12:00 – 13:00',
  '13:00 – 14:00',
  '14:00 – 15:00',
];

type ServiceQuantities = {
  standardBags: number;
  maxBags: number;
  pieces: number;
};

type CountryCode = {
  code: string;
  name: string;
  dial: string;
  flag: string;
};

const COUNTRY_CODES: CountryCode[] = [
  { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgium', dial: '+32', flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹' },
  { code: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪' },
  { code: 'PL', name: 'Poland', dial: '+48', flag: '🇵🇱' },
  { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dial: '+47', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', dial: '+45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', dial: '+358', flag: '🇫🇮' },
  { code: 'GR', name: 'Greece', dial: '+30', flag: '🇬🇷' },
  { code: 'CZ', name: 'Czech Republic', dial: '+420', flag: '🇨🇿' },
  { code: 'RO', name: 'Romania', dial: '+40', flag: '🇷🇴' },
  { code: 'HU', name: 'Hungary', dial: '+36', flag: '🇭🇺' },
  { code: 'SK', name: 'Slovakia', dial: '+421', flag: '🇸🇰' },
  { code: 'BG', name: 'Bulgaria', dial: '+359', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', dial: '+385', flag: '🇭🇷' },
  { code: 'SI', name: 'Slovenia', dial: '+386', flag: '🇸🇮' },
  { code: 'LT', name: 'Lithuania', dial: '+370', flag: '🇱🇹' },
  { code: 'LV', name: 'Latvia', dial: '+371', flag: '🇱🇻' },
  { code: 'EE', name: 'Estonia', dial: '+372', flag: '🇪🇪' },
  { code: 'LU', name: 'Luxembourg', dial: '+352', flag: '🇱🇺' },
  { code: 'MT', name: 'Malta', dial: '+356', flag: '🇲🇹' },
  { code: 'CY', name: 'Cyprus', dial: '+357', flag: '🇨🇾' },
  { code: 'RU', name: 'Russia', dial: '+7', flag: '🇷🇺' },
  { code: 'UA', name: 'Ukraine', dial: '+380', flag: '🇺🇦' },
  { code: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴' },
  { code: 'PE', name: 'Peru', dial: '+51', flag: '🇵🇪' },
  { code: 'VE', name: 'Venezuela', dial: '+58', flag: '🇻🇪' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
  { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
  { code: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'TH', name: 'Thailand', dial: '+66', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', dial: '+84', flag: '🇻🇳' },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
  { code: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱' },
  { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪' },
  { code: 'MA', name: 'Morocco', dial: '+212', flag: '🇲🇦' },
  { code: 'AO', name: 'Angola', dial: '+244', flag: '🇦🇴' },
  { code: 'MZ', name: 'Mozambique', dial: '+258', flag: '🇲🇿' },
  { code: 'CV', name: 'Cape Verde', dial: '+238', flag: '🇨🇻' },
  { code: 'IS', name: 'Iceland', dial: '+354', flag: '🇮🇸' },
  { code: 'RS', name: 'Serbia', dial: '+381', flag: '🇷🇸' },
  { code: 'AL', name: 'Albania', dial: '+355', flag: '🇦🇱' },
  { code: 'MK', name: 'North Macedonia', dial: '+389', flag: '🇲🇰' },
  { code: 'BA', name: 'Bosnia and Herzegovina', dial: '+387', flag: '🇧🇦' },
  { code: 'ME', name: 'Montenegro', dial: '+382', flag: '🇲🇪' },
  { code: 'XK', name: 'Kosovo', dial: '+383', flag: '🇽🇰' },
  { code: 'MD', name: 'Moldova', dial: '+373', flag: '🇲🇩' },
  { code: 'BY', name: 'Belarus', dial: '+375', flag: '🇧🇾' },
  { code: 'GE', name: 'Georgia', dial: '+995', flag: '🇬🇪' },
  { code: 'AM', name: 'Armenia', dial: '+374', flag: '🇦🇲' },
  { code: 'AZ', name: 'Azerbaijan', dial: '+994', flag: '🇦🇿' },
  { code: 'KZ', name: 'Kazakhstan', dial: '+7', flag: '🇰🇿' },
  { code: 'UZ', name: 'Uzbekistan', dial: '+998', flag: '🇺🇿' },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '🇱🇰' },
  { code: 'NP', name: 'Nepal', dial: '+977', flag: '🇳🇵' },
  { code: 'HK', name: 'Hong Kong', dial: '+852', flag: '🇭🇰' },
  { code: 'TW', name: 'Taiwan', dial: '+886', flag: '🇹🇼' },
  { code: 'MO', name: 'Macau', dial: '+853', flag: '🇲🇴' },
];

type FormData = {
  returningCustomer: boolean | null;
  firstName: string;
  lastName: string;
  countryCode: string;
  phone: string;
  email: string;
  nif: string;
  preferredContact: 'call' | 'whatsapp' | '';
  pickupAddress: string;
  pickupPostcode: string;
  pickupFloor: string;
  pickupInstructions: string;
  pickupDate: Date | undefined;
  pickupSlot: string;
  sameDeliveryAddress: boolean;
  deliveryAddress: string;
  deliveryPostcode: string;
  deliveryFloor: string;
  deliveryInstructions: string;
  deliveryDate: Date | undefined;
  deliverySlot: string;
  washFold: ServiceQuantities;
  washIron: { pieces: number };
  ironingOnly: { pieces: number };
  dryCleaning: { pieces: number };
  othersText: string;
  serviceNotes: string;
  antiAllergic: boolean;
  contactBeforeProceed: boolean;
  notes: string;
  consent: boolean;
};

const initial: FormData = {
  returningCustomer: null,
  firstName: '', lastName: '', countryCode: '+351', phone: '', email: '', nif: '',
  preferredContact: '',
  pickupAddress: '', pickupPostcode: '', pickupFloor: '', pickupInstructions: '',
  pickupDate: undefined, pickupSlot: '',
  sameDeliveryAddress: true,
  deliveryAddress: '', deliveryPostcode: '', deliveryFloor: '', deliveryInstructions: '',
  deliveryDate: undefined, deliverySlot: '',
  washFold: { standardBags: 0, maxBags: 0, pieces: 0 },
  washIron: { pieces: 0 },
  ironingOnly: { pieces: 0 },
  dryCleaning: { pieces: 0 },
  othersText: '',
  serviceNotes: '',
  antiAllergic: false,
  contactBeforeProceed: false,
  notes: '',
  consent: false,
};

const TOTAL_STEPS = 9;

function QuantityControl({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-6 text-center font-semibold text-sm">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="h-8 w-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function OptionButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 px-6 py-4 rounded-xl border-2 text-sm font-medium transition-all',
        selected
          ? 'border-primary bg-primary/10 text-primary shadow-sm'
          : 'border-border bg-card text-muted-foreground hover:border-primary/30'
      )}
    >
      {children}
    </button>
  );
}

function StepIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-4">
      <Icon className="w-5 h-5 text-primary-foreground" />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1">{message}</p>;
}

function addBusinessDays(date: Date, days: number): Date {
  let result = new Date(date);
  let added = 0;
  while (added < days) {
    result = addDays(result, 1);
    if (!isWeekend(result)) added++;
  }
  return result;
}

const Booking = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...initial });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);
  const formTopRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (hasInteracted.current) {
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    hasInteracted.current = true;
  }, [step]);

  const b = (key: string) => {
    const map: Record<string, { pt: string; en: string }> = {
      stepReturning: { pt: 'Cliente Habitual?', en: 'Returning Customer?' },
      stepContact: { pt: 'Os Seus Dados', en: 'Your Details' },
      stepServices: { pt: 'Serviços', en: 'Services' },
      stepPreferences: { pt: 'Preferências', en: 'Preferences' },
      stepPickup: { pt: 'Detalhes da Recolha', en: 'Pickup Details' },
      stepDelivery: { pt: 'Detalhes da Entrega', en: 'Delivery Details' },
      stepNotes: { pt: 'Notas', en: 'Notes' },
      stepReview: { pt: 'Revisão e Consentimento', en: 'Review & Consent' },
      stepConfirmation: { pt: 'Confirmação', en: 'Confirmation' },
      returningQ: { pt: 'Já é cliente GLOAT?', en: 'Are you already a GLOAT customer?' },
      yes: { pt: 'Sim', en: 'Yes' },
      no: { pt: 'Não', en: 'No' },
      firstName: { pt: 'Primeiro Nome', en: 'First Name' },
      lastName: { pt: 'Apelido', en: 'Last Name' },
      phone: { pt: 'Telefone', en: 'Phone' },
      email: { pt: 'Email', en: 'Email' },
      nif: { pt: 'NIF', en: 'Tax ID (NIF)' },
      nifOptional: { pt: 'Opcional — para faturação', en: 'Optional — for invoicing' },
      preferredContact: { pt: 'Método de contacto preferido', en: 'Preferred contact method' },
      call: { pt: 'Chamada', en: 'Call' },
      whatsapp: { pt: 'WhatsApp', en: 'WhatsApp' },
      address: { pt: 'Morada', en: 'Address' },
      postcode: { pt: 'Código Postal', en: 'Postcode' },
      floor: { pt: 'Andar / Apartamento / Campainha', en: 'Floor / Apartment / Bell' },
      instructions: { pt: 'Instruções de acesso', en: 'Address instructions' },
      date: { pt: 'Data', en: 'Date' },
      timeSlot: { pt: 'Horário', en: 'Time Slot' },
      pickDate: { pt: 'Escolher data', en: 'Pick a date' },
      selectSlot: { pt: 'Selecionar horário', en: 'Select time slot' },
      sameAddress: { pt: 'A morada de entrega é a mesma da recolha?', en: 'Is the delivery address the same as the pickup address?' },
      deliveryDate: { pt: 'Data de Entrega', en: 'Delivery Date' },
      deliverySlot: { pt: 'Horário de Entrega', en: 'Delivery Time Slot' },
      washFold: { pt: 'Lavar e Dobrar', en: 'Wash & Fold' },
      washIron: { pt: 'Lavar e Engomar', en: 'Wash & Iron' },
      ironingOnly: { pt: 'Só Engomar', en: 'Ironing Only' },
      dryCleaning: { pt: 'Limpeza a Seco', en: 'Dry Cleaning' },
      others: { pt: 'Outros (especificar)', en: 'Others (specify)' },
      standardBag: { pt: 'Bolsa STANDARD (aprox. 5kg)', en: 'STANDARD Bag (approx. 5kg)' },
      maxBag: { pt: 'Bolsa MAX (aprox. 10kg)', en: 'MAX Bag (approx. 10kg)' },
      standardBagShort: { pt: 'Bolsa STANDARD', en: 'STANDARD Bag' },
      maxBagShort: { pt: 'Bolsa MAX', en: 'MAX Bag' },
      pieces: { pt: 'Peças', en: 'Pieces' },
      antiAllergic: { pt: 'Detergente anti-alérgico (+4,90\u202F€)', en: 'Anti-allergic detergent (+€4.90)' },
      contactPrice: { pt: 'Deseja ser contactado com o preço final antes de prosseguirmos?', en: 'Would you like to be contacted with the final price before we proceed?' },
      notesPlaceholder: { pt: 'Instruções especiais, detalhes de peças, artigos delicados, notas de acesso...', en: 'Special instructions, item details, delicate items, access notes...' },
      edit: { pt: 'Editar', en: 'Edit' },
      consentText: {
        pt: 'Compreendo que a recolha e entrega estão disponíveis no concelho de Lisboa, sujeitas à capacidade, e que o preço final pode depender dos artigos recebidos. O pagamento é feito por cartão ou dinheiro na entrega.',
        en: 'I understand that pickup and delivery are available within municipal Lisbon, subject to item capacity, and that final pricing may depend on the items received. Payment is made by card or cash at delivery.',
      },
      thankYou: { pt: 'Obrigado!', en: 'Thank you!' },
      confirmationMsg: { pt: 'Recebemos a sua reserva e o nosso motorista passará dia', en: 'We received your booking and our driver will come by on' },
      between: { pt: 'entre as', en: 'between' },
      confirmationNote: { pt: 'Caso seja necessário esclarecer algum detalhe, entraremos em contacto consigo.', en: 'If we need to clarify any details, we\'ll get in touch with you.' },
      back: { pt: 'Voltar', en: 'Back' },
      next: { pt: 'Seguinte', en: 'Next' },
      submit: { pt: 'Confirmar Reserva', en: 'Confirm Booking' },
      bookAnother: { pt: 'Fazer outra reserva', en: 'Book another pickup' },
      stepOf: { pt: 'de', en: 'of' },
      required: { pt: 'Campo obrigatório', en: 'Required' },
      invalidEmail: { pt: 'Email inválido', en: 'Invalid email' },
      selectService: { pt: 'Selecione pelo menos um serviço', en: 'Please select at least one service' },
      acceptConsent: { pt: 'Deve aceitar para continuar', en: 'You must accept to continue' },
      pageTitle: { pt: 'Agendar Recolha e Entrega', en: 'Book a Pickup & Delivery' },
      pageSubtitle: { pt: 'Rápido e simples. Preencha o formulário abaixo e tratamos de tudo.', en: 'Quick and simple. Fill in the form below and we\'ll handle the rest.' },
      paymentInfo: { pt: 'O pagamento é feito por cartão ou dinheiro no momento da entrega. O nosso motorista leva sempre terminal de pagamento.', en: 'Payment is made by card or cash at delivery. Our driver always carries a card machine.' },
      dryCleaningNote: { pt: 'Como o seu pedido inclui limpeza a seco, o prazo de entrega passa de 2 para 5 dias úteis.', en: 'Since your order includes dry cleaning, delivery time changes from 2 to 5 business days.' },
    };
    return map[key]?.[language] ?? key;
  };

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm(prev => {
      const next = { ...prev, [k]: v };
      if (k === 'pickupDate' && v && next.deliveryDate) {
        const minDays = hasDryCleaning(next) ? 5 : 2;
        const minDelivery = addBusinessDays(v as Date, minDays);
        if (isBefore(next.deliveryDate, startOfDay(minDelivery))) {
          next.deliveryDate = undefined;
          next.deliverySlot = '';
        }
      }
      return next;
    });
  const clearError = (k: string) => setErrors(prev => { const n = { ...prev }; delete n[k]; return n; });

  const hasDryCleaning = (f: FormData = form) => f.dryCleaning.pieces > 0;

  const hasWashServices = () => {
    return (
      form.washFold.standardBags + form.washFold.maxBags + form.washFold.pieces +
      form.washIron.pieces
    ) > 0;
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    const req = b('required');

    if (step === 0) {
      if (form.returningCustomer === null) e.returningCustomer = req;
    }
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = req;
      if (!form.lastName.trim()) e.lastName = req;
      if (!form.phone.trim()) e.phone = req;
      if (!form.email.trim()) e.email = req;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = b('invalidEmail');
      if (!form.preferredContact) e.preferredContact = req;
    }
    if (step === 2) {
      const has =
        form.washFold.standardBags + form.washFold.maxBags + form.washFold.pieces +
        form.washIron.pieces +
        form.ironingOnly.pieces + form.dryCleaning.pieces +
        (form.othersText.trim() ? 1 : 0);
      if (has === 0) e.services = b('selectService');
    }
    if (step === 4) {
      if (!form.pickupAddress.trim()) e.pickupAddress = req;
      if (!form.pickupPostcode.trim()) e.pickupPostcode = req;
      if (!form.pickupDate) e.pickupDate = req;
      if (!form.pickupSlot) e.pickupSlot = req;
    }
    if (step === 5) {
      if (!form.sameDeliveryAddress) {
        if (!form.deliveryAddress.trim()) e.deliveryAddress = req;
        if (!form.deliveryPostcode.trim()) e.deliveryPostcode = req;
      }
      if (!form.deliveryDate) e.deliveryDate = req;
      if (!form.deliverySlot) e.deliverySlot = req;
    }
    if (step === 7) {
      if (!form.consent) e.consent = b('acceptConsent');
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validate()) return;
    setDirection(1);
    setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 0));
  };

  const goTo = (s: number) => {
    setDirection(s > step ? 1 : -1);
    setStep(s);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const servicesPayload = {
        washFold: form.washFold,
        washIron: form.washIron,
        ironingOnly: form.ironingOnly,
        dryCleaning: form.dryCleaning,
        othersText: form.othersText,
        serviceNotes: form.serviceNotes,
      };

      const { error } = await supabase.from('bookings').insert({
        returning_customer: form.returningCustomer!,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        phone: `${form.countryCode} ${form.phone.trim()}`,
        email: form.email.trim(),
        preferred_contact: form.preferredContact,
        pickup_address: form.pickupAddress.trim(),
        pickup_postcode: form.pickupPostcode.trim(),
        pickup_floor: form.pickupFloor.trim() || null,
        pickup_instructions: form.pickupInstructions.trim() || null,
        pickup_date: format(form.pickupDate!, 'yyyy-MM-dd'),
        pickup_slot: form.pickupSlot,
        same_delivery_address: form.sameDeliveryAddress,
        delivery_address: form.sameDeliveryAddress ? form.pickupAddress.trim() : form.deliveryAddress.trim(),
        delivery_postcode: form.sameDeliveryAddress ? form.pickupPostcode.trim() : form.deliveryPostcode.trim(),
        delivery_floor: form.sameDeliveryAddress ? form.pickupFloor.trim() || null : form.deliveryFloor.trim() || null,
        delivery_instructions: form.sameDeliveryAddress ? form.pickupInstructions.trim() || null : form.deliveryInstructions.trim() || null,
        delivery_date: format(form.deliveryDate!, 'yyyy-MM-dd'),
        delivery_slot: form.deliverySlot,
        services: servicesPayload as any,
        anti_allergic: form.antiAllergic,
        contact_before_proceed: form.contactBeforeProceed,
        notes: form.notes.trim() || null,
        consent_accepted: form.consent,
      });

      if (error) throw error;

      // === EMAIL NOTIFICATION (TEST MODE – jogfroquette@gmail.com only) ===
      try {
        await supabase.functions.invoke('send-booking-notification', {
          body: {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            phone: `${form.countryCode} ${form.phone.trim()}`,
            preferredContact: form.preferredContact,
            returningCustomer: form.returningCustomer,
            pickupAddress: form.pickupAddress.trim(),
            pickupPostcode: form.pickupPostcode.trim(),
            pickupFloor: form.pickupFloor.trim() || undefined,
            pickupDate: format(form.pickupDate!, 'yyyy-MM-dd'),
            pickupSlot: form.pickupSlot,
            sameDeliveryAddress: form.sameDeliveryAddress,
            deliveryAddress: form.sameDeliveryAddress ? form.pickupAddress.trim() : form.deliveryAddress.trim(),
            deliveryPostcode: form.sameDeliveryAddress ? form.pickupPostcode.trim() : form.deliveryPostcode.trim(),
            deliveryFloor: form.sameDeliveryAddress ? (form.pickupFloor.trim() || undefined) : (form.deliveryFloor.trim() || undefined),
            deliveryDate: format(form.deliveryDate!, 'yyyy-MM-dd'),
            deliverySlot: form.deliverySlot,
            services: servicesPayload,
            antiAllergic: form.antiAllergic,
            contactBeforeProceed: form.contactBeforeProceed,
            pickupInstructions: form.pickupInstructions.trim() || undefined,
            deliveryInstructions: form.sameDeliveryAddress ? (form.pickupInstructions.trim() || undefined) : (form.deliveryInstructions.trim() || undefined),
            notes: form.notes.trim() || undefined,
            nif: form.nif?.trim() || undefined,
          },
        });
      } catch (emailErr) {
        console.warn('Booking notification email failed (non-blocking):', emailErr);
      }
      // === END EMAIL NOTIFICATION ===

      setDirection(1);
      setStep(8);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const tomorrow = addDays(startOfDay(new Date()), 1);
  const disabledDays = (date: Date) => isWeekend(date) || isBefore(date, tomorrow);
  const disabledDeliveryDays = (date: Date) => {
    if (isWeekend(date) || isBefore(date, tomorrow)) return true;
    if (form.pickupDate) {
      const minDays = hasDryCleaning() ? 5 : 2;
      const minDelivery = addBusinessDays(form.pickupDate, minDays);
      if (isBefore(date, startOfDay(minDelivery))) return true;
    }
    return false;
  };

  const serviceLines = () => {
    const lines: string[] = [];
    const { washFold, washIron, ironingOnly, dryCleaning, othersText } = form;
    if (washFold.standardBags) lines.push(`${b('washFold')}: ${washFold.standardBags} ${b('standardBagShort')}`);
    if (washFold.maxBags) lines.push(`${b('washFold')}: ${washFold.maxBags} ${b('maxBagShort')}`);
    if (washFold.pieces) lines.push(`${b('washFold')}: ${washFold.pieces} ${b('pieces')}`);
    if (washIron.pieces) lines.push(`${b('washIron')}: ${washIron.pieces} ${b('pieces')}`);
    if (ironingOnly.pieces) lines.push(`${b('ironingOnly')}: ${ironingOnly.pieces} ${b('pieces')}`);
    if (dryCleaning.pieces) lines.push(`${b('dryCleaning')}: ${dryCleaning.pieces} ${b('pieces')}`);
    if (othersText.trim()) lines.push(`${b('others')}: ${othersText}`);
    return lines;
  };

  const stepIcons = [Check, Phone, Package, Settings2, MapPin, MapPin, FileText, ShieldCheck, PartyPopper];

  const stepTitles = [
    language === 'pt' ? 'Início' : 'Start',
    language === 'pt' ? 'Dados' : 'Details',
    language === 'pt' ? 'Serviços' : 'Services',
    language === 'pt' ? 'Preferências' : 'Preferences',
    language === 'pt' ? 'Recolha' : 'Pickup',
    language === 'pt' ? 'Entrega' : 'Delivery',
    language === 'pt' ? 'Notas' : 'Notes',
    language === 'pt' ? 'Revisão' : 'Review',
    b('stepConfirmation'),
  ];

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <StepIcon icon={stepIcons[0]} />
            <h2 className="text-xl font-semibold">{b('stepReturning')}</h2>
            <p className="text-muted-foreground text-sm">{b('returningQ')}</p>
            <div className="flex gap-3">
              <OptionButton selected={form.returningCustomer === true} onClick={() => { set('returningCustomer', true); clearError('returningCustomer'); setTimeout(() => { setDirection(1); setStep(1); }, 350); }}>
                {b('yes')}
              </OptionButton>
              <OptionButton selected={form.returningCustomer === false} onClick={() => { set('returningCustomer', false); clearError('returningCustomer'); setTimeout(() => { setDirection(1); setStep(1); }, 350); }}>
                {b('no')}
              </OptionButton>
            </div>
            <FieldError message={errors.returningCustomer} />
          </div>
        );

      case 1:
        return (
          <div className="space-y-5">
            <StepIcon icon={stepIcons[1]} />
            <h2 className="text-xl font-semibold">{b('stepContact')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>{b('firstName')} *</Label>
                <Input value={form.firstName} onChange={e => { set('firstName', e.target.value); clearError('firstName'); }} />
                <FieldError message={errors.firstName} />
              </div>
              <div>
                <Label>{b('lastName')} *</Label>
                <Input value={form.lastName} onChange={e => { set('lastName', e.target.value); clearError('lastName'); }} />
                <FieldError message={errors.lastName} />
              </div>
            </div>
            <div>
              <Label>{b('phone')} *</Label>
              <div className="flex gap-2">
                <Select value={form.countryCode} onValueChange={v => set('countryCode', v)}>
                  <SelectTrigger className="w-[110px] shrink-0">
                    <SelectValue>
                      {COUNTRY_CODES.find(c => c.dial === form.countryCode)?.flag} {form.countryCode}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-[280px]">
                    {COUNTRY_CODES.map(c => (
                      <SelectItem key={c.code} value={c.dial}>
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.dial}</span>
                          <span className="text-muted-foreground text-xs">{c.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input 
                  type="tel" 
                  value={form.phone} 
                  onChange={e => { set('phone', e.target.value); clearError('phone'); }} 
                  className="flex-1"
                  placeholder="912 345 678"
                />
              </div>
              <FieldError message={errors.phone} />
            </div>
            <div>
              <Label>{b('email')} *</Label>
              <Input type="email" value={form.email} onChange={e => { set('email', e.target.value); clearError('email'); }} />
              <FieldError message={errors.email} />
            </div>
            <div>
              <Label>{b('nif')}</Label>
              <Input value={form.nif} onChange={e => set('nif', e.target.value)} placeholder={b('nifOptional')} />
            </div>
            <div>
              <Label>{b('preferredContact')} *</Label>
              <div className="flex gap-3 mt-2">
                <OptionButton selected={form.preferredContact === 'call'} onClick={() => { set('preferredContact', 'call'); clearError('preferredContact'); }}>
                  {b('call')}
                </OptionButton>
                <OptionButton selected={form.preferredContact === 'whatsapp'} onClick={() => { set('preferredContact', 'whatsapp'); clearError('preferredContact'); }}>
                  {b('whatsapp')}
                </OptionButton>
              </div>
              <FieldError message={errors.preferredContact} />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <StepIcon icon={stepIcons[2]} />
            <h2 className="text-xl font-semibold">{b('stepServices')}</h2>
            <FieldError message={errors.services} />

            <div className="rounded-xl border border-border/50 bg-card p-4 space-y-1">
              <h3 className="font-semibold text-sm">{b('washFold')}</h3>
              <QuantityControl label={b('standardBag')} value={form.washFold.standardBags} onChange={v => set('washFold', { ...form.washFold, standardBags: v })} />
              <QuantityControl label={b('maxBag')} value={form.washFold.maxBags} onChange={v => set('washFold', { ...form.washFold, maxBags: v })} />
              <QuantityControl label={b('pieces')} value={form.washFold.pieces} onChange={v => set('washFold', { ...form.washFold, pieces: v })} />
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-4 space-y-1">
              <h3 className="font-semibold text-sm">{b('washIron')}</h3>
              <QuantityControl label={b('pieces')} value={form.washIron.pieces} onChange={v => set('washIron', { ...form.washIron, pieces: v })} />
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-4 space-y-1">
              <h3 className="font-semibold text-sm">{b('ironingOnly')}</h3>
              <QuantityControl label={b('pieces')} value={form.ironingOnly.pieces} onChange={v => set('ironingOnly', { ...form.ironingOnly, pieces: v })} />
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-4 space-y-1">
              <h3 className="font-semibold text-sm">{b('dryCleaning')}</h3>
              <QuantityControl label={b('pieces')} value={form.dryCleaning.pieces} onChange={v => set('dryCleaning', { ...form.dryCleaning, pieces: v })} />
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-4 space-y-2">
              <h3 className="font-semibold text-sm">{b('others')}</h3>
              <Textarea value={form.othersText} onChange={e => set('othersText', e.target.value)} placeholder={language === 'pt' ? 'Descreva o que precisa...' : 'Describe what you need...'} className="min-h-[80px]" />
            </div>

            <div className="rounded-xl border border-border/50 bg-card p-4 space-y-2">
              <h3 className="font-semibold text-sm">{language === 'pt' ? 'Notas sobre os serviços' : 'Service notes'}</h3>
              <Textarea
                value={form.serviceNotes}
                onChange={e => set('serviceNotes', e.target.value)}
                placeholder={language === 'pt' ? 'ex: as peças para engomar são as camisas e t-shirts dentro da Bolsa Max' : 'e.g. the items for ironing are the shirts and t-shirts inside the Max Bag'}
                className="min-h-[80px]"
              />
            </div>
          </div>
        );

      case 3: {
        const showAntiAllergic = hasWashServices();
        if (!showAntiAllergic && form.antiAllergic) {
          set('antiAllergic', false);
        }
        return (
          <div className="space-y-6">
            <StepIcon icon={stepIcons[3]} />
            <h2 className="text-xl font-semibold">{b('stepPreferences')}</h2>
            <div className="space-y-4">
              {showAntiAllergic && (
                <div>
                  <Label>{b('antiAllergic')}</Label>
                  <div className="flex gap-3 mt-2">
                    <OptionButton selected={form.antiAllergic} onClick={() => set('antiAllergic', true)}>{b('yes')}</OptionButton>
                    <OptionButton selected={!form.antiAllergic} onClick={() => set('antiAllergic', false)}>{b('no')}</OptionButton>
                  </div>
                </div>
              )}
              <div>
                <Label>{b('contactPrice')}</Label>
                <div className="flex gap-3 mt-2">
                  <OptionButton selected={form.contactBeforeProceed} onClick={() => set('contactBeforeProceed', true)}>{b('yes')}</OptionButton>
                  <OptionButton selected={!form.contactBeforeProceed} onClick={() => set('contactBeforeProceed', false)}>{b('no')}</OptionButton>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 4:
        return (
          <div className="space-y-5">
            <StepIcon icon={stepIcons[4]} />
            <h2 className="text-xl font-semibold">{b('stepPickup')}</h2>
            <div>
              <Label>{b('address')} *</Label>
              <Input value={form.pickupAddress} onChange={e => { set('pickupAddress', e.target.value); clearError('pickupAddress'); }} />
              <FieldError message={errors.pickupAddress} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>{b('postcode')} *</Label>
                <Input value={form.pickupPostcode} onChange={e => { set('pickupPostcode', e.target.value); clearError('pickupPostcode'); }} />
                <FieldError message={errors.pickupPostcode} />
              </div>
              <div>
                <Label>{b('floor')}</Label>
                <Input value={form.pickupFloor} onChange={e => set('pickupFloor', e.target.value)} />
              </div>
            </div>
            <div>
              <Label>{b('instructions')}</Label>
              <Input value={form.pickupInstructions} onChange={e => set('pickupInstructions', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>{b('date')} *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !form.pickupDate && 'text-muted-foreground')}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.pickupDate ? format(form.pickupDate, 'PPP') : b('pickDate')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={form.pickupDate} onSelect={d => { set('pickupDate', d); clearError('pickupDate'); }} disabled={disabledDays} className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
                <FieldError message={errors.pickupDate} />
              </div>
              <div>
                <Label>{b('timeSlot')} *</Label>
                <Select value={form.pickupSlot} onValueChange={v => { set('pickupSlot', v); clearError('pickupSlot'); }}>
                  <SelectTrigger><SelectValue placeholder={b('selectSlot')} /></SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FieldError message={errors.pickupSlot} />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-5">
            <StepIcon icon={stepIcons[5]} />
            <h2 className="text-xl font-semibold">{b('stepDelivery')}</h2>

            {hasDryCleaning() && (
              <div className="inline-flex items-center gap-2 rounded-lg bg-muted/60 border border-border/50 px-4 py-2.5 text-xs text-muted-foreground">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>{b('dryCleaningNote')}</span>
              </div>
            )}

            <div>
              <Label>{b('sameAddress')}</Label>
              <div className="flex gap-3 mt-2">
                <OptionButton selected={form.sameDeliveryAddress} onClick={() => set('sameDeliveryAddress', true)}>
                  {b('yes')}
                </OptionButton>
                <OptionButton selected={!form.sameDeliveryAddress} onClick={() => set('sameDeliveryAddress', false)}>
                  {b('no')}
                </OptionButton>
              </div>
            </div>
            {!form.sameDeliveryAddress && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-4 overflow-hidden">
                <div>
                  <Label>{b('address')} *</Label>
                  <Input value={form.deliveryAddress} onChange={e => { set('deliveryAddress', e.target.value); clearError('deliveryAddress'); }} />
                  <FieldError message={errors.deliveryAddress} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>{b('postcode')} *</Label>
                    <Input value={form.deliveryPostcode} onChange={e => { set('deliveryPostcode', e.target.value); clearError('deliveryPostcode'); }} />
                    <FieldError message={errors.deliveryPostcode} />
                  </div>
                  <div>
                    <Label>{b('floor')}</Label>
                    <Input value={form.deliveryFloor} onChange={e => set('deliveryFloor', e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>{b('instructions')}</Label>
                  <Input value={form.deliveryInstructions} onChange={e => set('deliveryInstructions', e.target.value)} />
                </div>
              </motion.div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>{b('deliveryDate')} *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !form.deliveryDate && 'text-muted-foreground')}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.deliveryDate ? format(form.deliveryDate, 'PPP') : b('pickDate')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={form.deliveryDate} onSelect={d => { set('deliveryDate', d); clearError('deliveryDate'); }} disabled={disabledDeliveryDays} className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
                <FieldError message={errors.deliveryDate} />
              </div>
              <div>
                <Label>{b('deliverySlot')} *</Label>
                <Select value={form.deliverySlot} onValueChange={v => { set('deliverySlot', v); clearError('deliverySlot'); }}>
                  <SelectTrigger><SelectValue placeholder={b('selectSlot')} /></SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FieldError message={errors.deliverySlot} />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-5">
            <StepIcon icon={stepIcons[6]} />
            <h2 className="text-xl font-semibold">{b('stepNotes')}</h2>
            <Textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder={b('notesPlaceholder')}
              className="min-h-[140px]"
            />
          </div>
        );

      case 7: {
        const Section = ({ title, stepIdx, children }: { title: string; stepIdx: number; children: React.ReactNode }) => (
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">{title}</h3>
              <button type="button" onClick={() => goTo(stepIdx)} className="text-xs text-primary flex items-center gap-1 hover:underline">
                <Pencil className="w-3 h-3" /> {b('edit')}
              </button>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">{children}</div>
          </div>
        );

        return (
          <div className="space-y-4">
            <StepIcon icon={stepIcons[7]} />
            <h2 className="text-xl font-semibold">{b('stepReview')}</h2>

            <Section title={b('stepContact')} stepIdx={1}>
              <p>{form.firstName} {form.lastName}</p>
              <p>{form.phone} · {form.email}</p>
              <p>{b('preferredContact')}: {form.preferredContact === 'call' ? b('call') : b('whatsapp')}</p>
              {form.nif && <p>NIF: {form.nif}</p>}
            </Section>

            <Section title={b('stepServices')} stepIdx={2}>
              {serviceLines().map((l, i) => <p key={i}>{l}</p>)}
              {form.serviceNotes && <p className="text-muted-foreground text-sm mt-1">📝 {form.serviceNotes}</p>}
            </Section>

            <Section title={b('stepPreferences')} stepIdx={3}>
              {hasWashServices() && <p>{b('antiAllergic')}: {form.antiAllergic ? b('yes') : b('no')}</p>}
              <p>{b('contactPrice')}: {form.contactBeforeProceed ? b('yes') : b('no')}</p>
            </Section>

            <Section title={b('stepPickup')} stepIdx={4}>
              <p>{form.pickupAddress}, {form.pickupPostcode}</p>
              {form.pickupFloor && <p>{form.pickupFloor}</p>}
              <p>{form.pickupDate ? format(form.pickupDate, 'PPP') : ''} · {form.pickupSlot}</p>
            </Section>

            <Section title={b('stepDelivery')} stepIdx={5}>
              {form.sameDeliveryAddress ? (
                <p>{language === 'pt' ? 'Mesmo endereço da recolha' : 'Same as pickup address'}</p>
              ) : (
                <>
                  <p>{form.deliveryAddress}, {form.deliveryPostcode}</p>
                  {form.deliveryFloor && <p>{form.deliveryFloor}</p>}
                </>
              )}
              <p>{form.deliveryDate ? format(form.deliveryDate, 'PPP') : ''} · {form.deliverySlot}</p>
            </Section>

            {form.notes.trim() && (
              <Section title={b('stepNotes')} stepIdx={6}>
                <p>{form.notes}</p>
              </Section>
            )}

            <div className="pt-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={form.consent}
                  onCheckedChange={v => { set('consent', v as boolean); clearError('consent'); }}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  {b('consentText')}
                </label>
              </div>
              <FieldError message={errors.consent} />
            </div>
          </div>
        );
      }

      case 8:
        return (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto">
              <PartyPopper className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">{b('thankYou')}</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {b('confirmationMsg')}{' '}<strong>{form.pickupDate ? (language === 'pt' ? form.pickupDate.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }) : format(form.pickupDate, 'PPP')) : ''}</strong> {b('between')} <strong>{form.pickupSlot}</strong>.
            </p>
            <p className="text-sm text-muted-foreground">{b('confirmationNote')}</p>
            <Button onClick={() => { setForm({ ...initial }); setStep(0); }} variant="outline" className="mt-4">
              {b('bookAnother')}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPercent = step === 8 ? 100 : ((step + 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="min-h-[80vh] py-12 px-4">
      <Helmet>
        <title>Agendar Recolha de Roupa em Lisboa | GLOAT</title>
        <meta name="description" content="Agende uma recolha de roupa ao domicílio em Lisboa com a GLOAT. Recolhemos, lavamos e entregamos em 48 horas. Cobertura em Lisboa e arredores." />
        <link rel="canonical" href={`https://gloatlaundry.com${location.pathname}`} />
        <link rel="alternate" hrefLang="pt" href="https://gloatlaundry.com/reserva" />
        <link rel="alternate" hrefLang="en" href="https://gloatlaundry.com/booking" />
        <link rel="alternate" hrefLang="x-default" href="https://gloatlaundry.com/reserva" />
        <meta property="og:title" content="Agendar Recolha | GLOAT Laundry Lisboa" />
        <meta property="og:description" content="Agende uma recolha de roupa ao domicílio em Lisboa com a GLOAT. Recolhemos, lavamos e entregamos em 48 horas. Cobertura em Lisboa e arredores." />
        <meta property="og:url" content="https://gloatlaundry.com/reserva" />
      </Helmet>
      <div className="max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {b('pageTitle')}
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">{b('pageSubtitle')}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-muted/60 border border-border/50 px-4 py-2.5 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>{b('paymentInfo')}</span>
          </div>
        </motion.div>

        <div ref={formTopRef} className="scroll-mt-24" />
        {step < 8 && (
          <div className="mb-8">
            {/* Step indicator - all 8 steps */}
            <div className="flex items-center w-full">
              {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => {
                const isCompleted = i < step;
                const isCurrent = i === step;
                const Icon = stepIcons[i];
                return (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <div className={cn(
                        'flex-1 h-0.5 transition-colors duration-300',
                        isCompleted ? 'bg-primary' : 'bg-border'
                      )} />
                    )}
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border-2',
                        isCompleted && 'bg-primary border-primary text-primary-foreground',
                        isCurrent && 'border-primary bg-primary/10 text-primary shadow-md shadow-primary/20',
                        !isCompleted && !isCurrent && 'border-border bg-muted/50 text-muted-foreground',
                      )}>
                        {isCompleted ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </div>
                      <span className={cn(
                        'text-[10px] sm:text-xs text-center leading-tight mt-1.5 hidden sm:block',
                        isCurrent ? 'text-primary font-semibold' : isCompleted ? 'text-foreground/70' : 'text-muted-foreground'
                      )}>
                        {stepTitles[i]}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            {/* Mobile: current step label */}
            <p className="text-center text-xs text-primary font-medium mt-3 sm:hidden">
              {step + 1}/{TOTAL_STEPS - 1} — {stepTitles[step]}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.25 }}
            className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {step < 8 && (
          <div className="flex items-center justify-between mt-6">
            {step > 0 ? (
              <Button variant="ghost" onClick={goBack} className="gap-1">
                <ChevronLeft className="w-4 h-4" /> {b('back')}
              </Button>
            ) : <div />}

            {step < 7 ? (
              <Button onClick={goNext} className="gradient-primary text-primary-foreground gap-1 px-6">
                {b('next')} <ChevronRight className="w-4 h-4" />
              </Button>
            ) : step === 7 ? (
              <Button onClick={handleSubmit} disabled={submitting} className="gradient-primary text-primary-foreground px-8">
                {submitting ? '...' : b('submit')}
              </Button>
            ) : null}
          </div>
        )}
      </div>

      <Suspense fallback={<div className="h-96" />}>
        <ServiceAreaMap />
      </Suspense>

      {/* ── FAQs ── */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {language === 'pt' ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
          </h2>
          <Accordion type="multiple" defaultValue={["faq-0","faq-1","faq-2","faq-3"]} className="space-y-3">
            {(language === 'pt' ? [
              { q: 'Com quanto tempo de antecedência devo agendar?', a: 'Pode agendar uma recolha pelo nosso site com pelo menos 24 horas de antecedência. Se precisar com urgência, contacte a nossa equipa pelo WhatsApp ou por telefone.' },
              { q: 'Posso alterar ou cancelar um agendamento?', a: 'Sim, se precisar de alterar ou cancelar um agendamento contacte-nos por telefone ou WhatsApp.' },
              { q: 'Posso escolher um horário específico para a recolha?', a: 'Sim, pode escolher o horário disponível que melhor se adapta a si.' },
              { q: 'Onde fazem recolha e entrega?', a: 'Fazemos recolha e entrega em Lisboa e arredores: Belém, Ajuda, Alcântara, Estrela, Campo de Ourique, Santo António, Misericórdia, Santa Maria Maior, São Vicente, Penha de França, Arroios, Beato, Parque das Nações, Areeiro, Alvalade, Avenidas Novas, Campolide, Benfica e São Domingos de Benfica.' },
            ] : [
              { q: 'How far in advance do I need to book?', a: 'You can book a pickup through our website at least 24 hours in advance. If you need it urgently please contact our team through WhatsApp or call and we\u2019ll be happy to help.' },
              { q: 'Can I change or cancel a booking?', a: 'Yes, if you need to change or cancel a booking please call us or contact us on WhatsApp.' },
              { q: 'Can I request a specific pickup time?', a: 'Yes, you can choose whichever time slot available best suits you.' },
              { q: 'Where do you pickup and deliver?', a: 'We do pickup and delivery in Lisbon and surrounding areas: Belém, Ajuda, Alcântara, Estrela, Campo de Ourique, Santo António, Misericórdia, Santa Maria Maior, São Vicente, Penha de França, Arroios, Beato, Parque das Nações, Areeiro, Alvalade, Avenidas Novas, Campolide, Benfica, São Domingos de Benfica.' },
            ]).map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border/50 px-6"
              >
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Booking;