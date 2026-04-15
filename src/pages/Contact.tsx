import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const GLOAT_COORDS: [number, number] = [38.722981, -9.154393];

const ContactMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false,
    }).setView(GLOAT_COORDS, 15);

    const el = mapRef.current;
    const onClick = () => map.whenReady(() => map.scrollWheelZoom.enable());
    const onClickOutside = (e: MouseEvent) => {
      if (el && !el.contains(e.target as Node)) map.whenReady(() => map.scrollWheelZoom.disable());
    };
    el.addEventListener('click', onClick);
    document.addEventListener('click', onClickOutside);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    const pinIcon = L.divIcon({
      className: '',
      html: `<div style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#77C1DD;box-shadow:0 2px 8px rgba(0,0,0,.25);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });

    L.marker(GLOAT_COORDS, { icon: pinIcon })
      .addTo(map)
      .bindPopup('<strong>GLOAT</strong><br/>The Greatest Laundry of All Time');

    mapInstanceRef.current = map;

    return () => {
      el.removeEventListener('click', onClick);
      document.removeEventListener('click', onClickOutside);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return <div ref={mapRef} className="w-full h-[300px]" />;
};

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const isPt = t('contact', 'name') === 'Nome';

    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
    };

    const { error } = await supabase.from('contact_submissions').insert(trimmed);

    // Fire-and-forget email notification
    supabase.functions.invoke('send-contact-email', { body: trimmed }).catch(console.error);

    setLoading(false);
    if (error) {
      toast.error(isPt ? 'Erro ao enviar mensagem. Tente novamente.' : 'Failed to send message. Please try again.');
    } else {
      toast.success(isPt ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contacto | GLOAT Laundry Lisboa</title>
        <meta name="description" content="Contacte a GLOAT — lavandaria em Lisboa. Envie-nos uma mensagem, ligue ou visite-nos na Rua Artilharia 1." />
        <link rel="canonical" href="https://gloatlaundry.com/contacto" />
        <link rel="alternate" hrefLang="pt" href="https://gloatlaundry.com/contacto" />
        <link rel="alternate" hrefLang="en" href="https://gloatlaundry.com/contact" />
        <link rel="alternate" hrefLang="x-default" href="https://gloatlaundry.com/contacto" />
        <meta property="og:title" content="Contacto | GLOAT Laundry Lisboa" />
        <meta property="og:description" content="Contacte a GLOAT — lavandaria em Lisboa. Envie-nos uma mensagem, ligue ou visite-nos." />
        <meta property="og:url" content="https://gloatlaundry.com/contacto" />
      </Helmet>
      <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader as="h1" title={t('contact', 'title')} subtitle={t('contact', 'subtitle')} />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('contact', 'name')}</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="rounded-xl"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('contact', 'email')}</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="rounded-xl"
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('contact', 'phone')}</label>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-xl"
                  maxLength={20}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('contact', 'message')}</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="rounded-xl"
                  maxLength={1000}
                />
              </div>
              <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full gradient-primary border-0 text-white hover:opacity-90">
                {loading ? (t('contact', 'name') === 'Nome' ? 'A enviar...' : 'Sending...') : t('contact', 'send')}
              </Button>
            </form>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/351935479900"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-full border border-accent text-accent hover:bg-accent/10 transition-colors font-medium text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              {t('contact', 'whatsapp')}
            </a>
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{t('contact', 'address')}</h3>
                  <p className="text-sm text-muted-foreground">Rua Artilharia 1, Nº 1<br />1250-036 Lisboa, Portugal</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{t('contact', 'phone')}</h3>
                  <p className="text-sm text-muted-foreground">(+351) 935 479 900</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{t('contact', 'hours')}</h3>
                  <p className="text-sm text-muted-foreground">{t('contact', 'hoursDetail')}</p>
                </div>
              </div>
            </div>

            {/* Leaflet Map */}
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm">
              <h3 className="font-semibold text-sm p-4 pb-0">{t('contact', 'findUs')}</h3>
              <ContactMap />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;
