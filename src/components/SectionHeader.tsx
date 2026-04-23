'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export const SectionHeader = ({ title, subtitle, className = '', as: Tag = 'h2' }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`text-center max-w-2xl mx-auto mb-12 ${className}`}
  >
    <Tag className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
      {title}
    </Tag>
    {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
  </motion.div>
);
