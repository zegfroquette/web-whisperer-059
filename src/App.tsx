import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/services" element={<Services />} />
              <Route path="/precos" element={<Pricing />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/planos" element={<Pricing />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reserva" element={<Booking />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/book" element={<Navigate to="/reserva" replace />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/termos-e-condicoes" element={<TermsConditions />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
