import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";

// Module-level flag — survives React StrictMode double-invoke but is reset on unmount
let cleanCloudInitialized = false;

const BookNow = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Book Your Laundry Service",
      subtitle: "Convenient, reliable, and professional — schedule a pickup or drop off at a time that suits you.",
      cta: "Start Booking"
    },
    pt: {
      title: "Agende o Seu Serviço de Lavandaria",
      subtitle: "Conveniente, fiável e profissional — agende uma recolha ou entrega no horário que mais lhe convir.",
      cta: "Começar Agendamento"
    }
  };

  const c = content[language] ?? content.en;

  const scrollToBooking = () => {
    wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (cleanCloudInitialized) return;
    cleanCloudInitialized = true;

    const scriptId = "cleancloud-script";
    const linkId = "cleancloud-link";

    // Destroy any existing container so we never get duplicates
    const existing = document.getElementById("myStoreContainer");
    if (existing) existing.remove();

    const wrapper = wrapperRef.current;
    if (!wrapper) {
      cleanCloudInitialized = false;
      return;
    }

    const container = document.createElement("div");
    container.id = "myStoreContainer";
    container.style.width = "100%";
    container.style.minHeight = "700px";
    container.style.background = "#ffffff";
    wrapper.appendChild(container);

    const initApp = () => {
      if (!document.getElementById("myStoreContainer")) return;
      (window as any).CleanCloudWebApp("#myStoreContainer", 27111, {
        width: "auto",
        height: 700,
        welcomeMessage: true,
        theme: {
          auth: {
            logo: `${window.location.origin}/gloat-logo-hd.png`
          }
        }
      });
    };

    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://cleancloudapp.com/webapp/public/webapp/cleancloud.css";
      document.head.appendChild(link);
    }

    if (document.getElementById(scriptId)) {
      initApp();
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cleancloudapp.com/webapp/public/webapp/cleancloud.js";
      script.onload = initApp;
      document.body.appendChild(script);
    }

    // Reset flag on unmount so re-navigation re-initialises the widget correctly
    return () => {
      cleanCloudInitialized = false;
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.04]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
            style={{ fontFamily: "Plus Jakarta Sans" }}>
            {c.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {c.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}>
            <Button
              size="lg"
              onClick={scrollToBooking}
              className="rounded-full px-8 text-base gradient-primary border-0 hover:opacity-90 transition-opacity shadow-md">
              {c.cta}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Booking widget */}
      <div ref={wrapperRef} style={{ width: "100%", background: "#ffffff" }} className="px-4 pb-16 max-w-5xl mx-auto" />
    </>
  );
};

export default BookNow;
