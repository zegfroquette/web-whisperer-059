import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/SectionHeader';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import serviceAreaGeoJson from '@/data/serviceAreaGeoJson';
import 'leaflet/dist/leaflet.css';

const ServiceAreaMap = () => {
  const { language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const title = language === 'pt' ? 'Onde recolhemos e entregamos' : 'Where we pick up & deliver';
  const subtitle = language === 'pt'
    ? 'Cobrimos toda a zona do concelho de Lisboa. Confirme se a sua morada está dentro da nossa área de serviço.'
    : 'We cover the entire municipality of Lisbon. Check if your address is within our service area.';

  const greenLabel = language === 'pt' ? 'Recolha e entrega — 9 €' : 'Pickup & delivery — €9';
  const yellowLabel = language === 'pt' ? 'Preço sob consulta' : 'Price on request';

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false,
    }).setView([38.735, -9.19], 12);

    const el = mapRef.current;
    const onClick = () => {
      map.whenReady(() => map.scrollWheelZoom.enable());
    };
    const onClickOutside = (e: MouseEvent) => {
      if (el && !el.contains(e.target as Node)) {
        map.whenReady(() => map.scrollWheelZoom.disable());
      }
    };
    el.addEventListener('click', onClick);
    document.addEventListener('click', onClickOutside);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    const yellowFeature = serviceAreaGeoJson.features.find(f => f.properties.fill === '#FFED00');
    const greenFeature = serviceAreaGeoJson.features.find(f => f.properties.fill === '#31D431');

    if (yellowFeature) {
      L.geoJSON(yellowFeature as any, {
        style: {
          color: '#FFED00',
          weight: 1,
          fillColor: '#FFED00',
          fillOpacity: 0.25,
        },
      }).addTo(map);
    }

    if (greenFeature) {
      L.geoJSON(greenFeature as any, {
        style: {
          color: '#31D431',
          weight: 2,
          fillColor: '#31D431',
          fillOpacity: 0.3,
        },
      }).addTo(map);
    }

    const gloatIcon = L.divIcon({
      className: '',
      html: `<div style="
        background: hsl(205, 65%, 65%);
        width: 32px; height: 32px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 2px solid white;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    L.marker([38.72297442758789, -9.154405574845985], { icon: gloatIcon })
      .addTo(map)
      .bindPopup('<strong>GLOAT</strong><br/>The Greatest Laundry');

    mapInstanceRef.current = map;

    setTimeout(() => map.invalidateSize(), 200);

    return () => {
      el.removeEventListener('click', onClick);
      document.removeEventListener('click', onClickOutside);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-20 mb-8"
    >
      <SectionHeader title={title} subtitle={subtitle} />

      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#31D431', opacity: 0.6 }} />
            <span className="text-sm text-muted-foreground">{greenLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#FFED00', opacity: 0.6 }} />
            <span className="text-sm text-muted-foreground">{yellowLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <MapPin className="w-2.5 h-2.5 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">GLOAT</span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm relative" style={{ zIndex: 0 }}>
          <div ref={mapRef} className="w-full h-[400px] sm:h-[500px]" />
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceAreaMap;