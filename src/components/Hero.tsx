import { Download, Mail, Target, TrendingUp } from 'lucide-react';
import { useMetricsConfig } from '../hooks/useMetricsConfig';
import { usePdfExport } from '../hooks/usePdfExport';
import { useLanguage } from '../i18n';

export const Hero = () => {
  const config = useMetricsConfig();
  const { exportToPdf } = usePdfExport();
  const { t } = useLanguage();
  
  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-center md:text-left overflow-hidden">
      {/* Terminal-style header badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/40 backdrop-blur-lg border border-blue-500/30 rounded-full mb-8 font-mono text-sm">
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
        <span className="text-blue-400">$</span>
        <span className="text-slate-200">{t.hero.badge}</span>
        <span className="text-slate-400">2026.01</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* H1: Beneficio para la MARCA, no para el youtuber */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          {t.hero.title}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
            {t.hero.titleHighlight}
          </span>
        </h1>
        
        {/* Subheadline: Lenguaje de negocio, no influencer */}
        <p className="text-xl md:text-2xl text-slate-200 leading-relaxed max-w-3xl">
          {t.hero.subtitle} <span className="text-white font-semibold">{config.global.totalProfessionals}+ {t.hero.subtitleProfessionals}</span> {t.hero.subtitleEnd}{' '}
          <span className="text-blue-400 font-mono">{t.hero.audienceTech}</span> y{' '}
          <span className="text-pink-400 font-mono">{t.hero.qualityContent}</span>.
        </p>

        {/* Value props rápidas */}
        <div className="flex flex-wrap gap-6 text-sm text-slate-200 font-mono">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span><span className="text-white">{config.hero.seniorLeadPercentage}</span> {t.hero.seniorLeadLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-pink-400" />
            <span><span className="text-white">{config.global.decisionMakersPercentage}</span> {t.hero.decisionMakersLabel}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <a 
            href="mailto:contact@pabpereza.dev" 
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-400 hover:to-pink-400 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            <Mail className="w-5 h-5" />
            {t.hero.ctaEmail}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <button 
            onClick={exportToPdf}
            data-pdf-button
            data-pdf-hide
            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-900/40 backdrop-blur-lg hover:bg-slate-800/70 text-slate-200 font-medium rounded-lg border border-white/10 hover:border-blue-500/30 transition-all print:hidden font-mono"
          >
            <Download className="w-5 h-5" />
            {t.hero.ctaDownload}
          </button>
        </div>
      </div>
      
      {/* Grid overlay for terminal aesthetic */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] pointer-events-none" 
           style={{backgroundImage: 'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
    </section>
  );
};
