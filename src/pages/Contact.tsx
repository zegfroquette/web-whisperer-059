import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const isPt = t('contact', 'name') === 'Nome';

    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
    });

    setLoading(false);
    if (error) {
      toast.error(isPt ? 'Erro ao enviar mensagem. Tente novamente.' : 'Failed to send message. Please try again.');
    } else {
      toast.success(isPt ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!');
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t('contact', 'title')} subtitle={t('contact', 'subtitle')} />

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
                  <h4 className="font-semibold text-sm mb-1">{t('contact', 'address')}</h4>
                  <p className="text-sm text-muted-foreground">Rua Artilharia 1, Nº 1<br />1250-036 Lisboa, Portugal</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{t('contact', 'phone')}</h4>
                  <p className="text-sm text-muted-foreground">(+351) 935 479 900</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{t('contact', 'hours')}</h4>
                  <p className="text-sm text-muted-foreground">{t('contact', 'hoursDetail')}</p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm">
              <h4 className="font-semibold text-sm p-4 pb-0">{t('contact', 'findUs')}</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.5!2d-9.1572!3d38.7224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933a3e4bbf7c3%3A0x0!2sRua+Artilharia+Um+N%C2%BA+1%2C+1250-036+Lisboa!5e0!3m2!1spt-PT!2spt!4v1690000000001"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GLOAT Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
