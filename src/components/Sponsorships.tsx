import { Video, Rocket, CheckCircle2, Zap, Shield, BarChart3 } from 'lucide-react';
import { useMetricsConfig } from '../hooks/useMetricsConfig';

export const Sponsorships = () => {
  const config = useMetricsConfig();
  
  return (
    <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-full font-mono text-sm">
          <span className="text-cyan-400">$</span>
          <span className="text-slate-400">cat ./sponsorship-packages.yml</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Formatos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Colaboración</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Diferentes opciones para adaptarnos a tus objetivos y presupuesto.
        </p>
      </div>
      
      {/* Main Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <PackageCard 
          icon={<Video className="w-8 h-8" />}
          iconBg="emerald"
          title="Deep Dive Técnico"
          subtitle="Video Dedicado 100%"
          price="Consultar"
          priceNote="Inversión personalizada"
          description="Tutorial completo de 15-25 min explorando tu producto en profundidad. Demo real, casos de uso enterprise y troubleshooting."
          features={[
            "Producción premium (4K, edición profesional)",
            "Guión co-creado con tu equipo de producto",
            "SEO optimizado para long-tail técnico",
            "Promoción cruzada en LinkedIn + Twitter",
            "Contenido evergreen (leads durante +2 años)"
          ]}
          highlight={false}
          cta="Ideal para lanzamientos y productos flagship"
        />
        
        <PackageCard 
          icon={<Zap className="w-8 h-8" />}
          iconBg="cyan"
          title="Integración Nativa"
          subtitle="Mención en Tutorial Evergreen"
          price="Consultar"
          priceNote="Mejor ratio calidad/precio"
          description="Segmento de 60-120 segundos integrado orgánicamente en tutoriales técnicos de alto tráfico. Sin sensación de publicidad."
          features={[
            "Integración natural en el flujo del tutorial",
            "Posicionamiento en vídeos de alta retención",
            "Asociación con contenido educativo valorado",
            "Múltiples menciones disponibles (pack)",
            "Ideal para brand awareness continuo"
          ]}
          highlight={true}
          cta="⚡ Más solicitado por SaaS y Cloud Providers"
        />
        
        <PackageCard 
          icon={<Rocket className="w-8 h-8" />}
          iconBg="emerald"
          title="Campaña Full-Stack"
          subtitle="Paquete Multi-Plataforma"
          price="Consultar"
          priceNote="Máximo impacto"
          description="Estrategia completa: Video dedicado + integraciones + amplificación social. Para campañas de lanzamiento o Q4 push."
          features={[
            "1 Video dedicado + 3 integraciones",
            "Amplificación LinkedIn (red +" + config.sponsorships.linkedinNetwork + "K profesionales)",
            "Thread técnico en Twitter/X",
            "Mención en newsletter (si aplica)",
            "Reporting de métricas post-campaña"
          ]}
          highlight={false}
          cta="Para campañas de lanzamiento o proyectos grandes"
        />
      </div>

      {/* Why This Works - ROI Section */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-mono">// Por qué funciona este tipo de contenido</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ROIPoint 
            icon={<Shield className="w-5 h-5 text-emerald-400" />}
            title="Audiencia Técnica"
            description="Mi audiencia está formada por profesionales IT que buscan herramientas para resolver problemas reales en su trabajo."
          />
          <ROIPoint 
            icon={<Video className="w-5 h-5 text-cyan-400" />}
            title="Contenido Duradero"
            description="Los tutoriales técnicos siguen siendo útiles y relevantes mucho tiempo después de su publicación."
          />
          <ROIPoint 
            icon={<Zap className="w-5 h-5 text-emerald-400" />}
            title="Contexto Real"
            description="Las menciones se integran de forma natural en contenido educativo, no como anuncios intrusivos."
          />
        </div>
      </div>
    </section>
  );
};

// Component: Package Card
const PackageCard = ({ 
  icon, 
  iconBg,
  title, 
  subtitle,
  price,
  priceNote,
  description,
  features,
  highlight,
  cta
}: { 
  icon: React.ReactNode, 
  iconBg: 'emerald' | 'cyan',
  title: string, 
  subtitle: string,
  price: string,
  priceNote: string,
  description: string,
  features: string[],
  highlight: boolean,
  cta: string
}) => (
  <div className={`relative bg-slate-900 border rounded-2xl p-8 transition-all duration-300 ${
    highlight 
      ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10 scale-[1.02]' 
      : 'border-slate-800 hover:border-slate-700'
  }`}>
    {highlight && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="px-4 py-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-xs font-bold rounded-full">
          MÁS POPULAR
        </span>
      </div>
    )}
    
    <div className={`inline-block p-4 rounded-xl mb-6 ${
      iconBg === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'
    }`}>
      {icon}
    </div>
    
    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
    <p className="text-sm text-slate-500 mb-4 font-mono">{subtitle}</p>
    
    <div className="mb-6">
      <span className="text-3xl font-bold text-white">{price}</span>
      <span className="text-slate-500 text-sm ml-2">{priceNote}</span>
    </div>
    
    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
      {description}
    </p>
    
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    
    <div className="pt-4 border-t border-slate-800">
      <p className={`text-xs font-mono ${iconBg === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'}`}>
        {cta}
      </p>
    </div>
  </div>
);

// Component: ROI Point
const ROIPoint = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      {icon}
      <h4 className="text-white font-semibold">{title}</h4>
    </div>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);
