import { Youtube, Linkedin, Globe, Mail, ArrowRight, Terminal } from 'lucide-react';
import { useMetricsConfig } from '../hooks/useMetricsConfig';

export const Footer = () => {
  const config = useMetricsConfig();
  
  return (
    <footer className="border-t border-slate-900 bg-slate-950 mt-12 print:hidden">
      
      {/* CTA Section - Agresivo pero profesional */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          
          {/* Background grid effect */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{backgroundImage: 'linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
          
          {/* Terminal-style header */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950/80 border border-emerald-500/30 rounded-full mb-8 font-mono text-sm">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400">$</span>
            <span className="text-slate-400">./start-partnership.sh</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative">
            ¿Te interesa <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              colaborar?
            </span>
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            Escríbeme y hablamos sobre cómo podemos trabajar juntos para dar visibilidad a tu producto entre 
            <span className="text-white font-semibold"> {config.global.totalProfessionals} profesionales IT</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="mailto:contact@pabpereza.dev?subject=Propuesta%20de%20Patrocinio%20-%20[Nombre%20Empresa]" 
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-lg rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
            >
              <Mail className="w-6 h-6" />
              Hablemos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <p className="text-slate-500 text-sm font-mono">
            // Respuesta garantizada en menos de 48h laborables
          </p>
          
          {/* Quick stats reminder */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 pt-8 border-t border-slate-800/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400 font-mono">{config.global.totalProfessionals}+</p>
              <p className="text-xs text-slate-500">Profesionales IT</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400 font-mono">{config.global.decisionMakersPercentage}</p>
              <p className="text-xs text-slate-500">Decision Makers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400 font-mono">{config.audience.retention.averageRetention}</p>
              <p className="text-xs text-slate-500">Retención Media</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold text-white font-mono">
              <span className="text-emerald-400">$</span> pabpereza
            </h4>
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Media Kit. Built for B2B tech brands.</p>
          </div>

          <div className="flex gap-6">
            <SocialLink href="https://youtube.com/@pabpereza" icon={<Youtube className="w-5 h-5" />} label="YouTube" />
            <SocialLink href="https://linkedin.com/in/pabpereza" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
            <SocialLink href="https://pabpereza.dev" icon={<Globe className="w-5 h-5" />} label="Website" />
            <SocialLink href="mailto:contact@pabpereza.dev" icon={<Mail className="w-5 h-5" />} label="Email" />
          </div>

        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-slate-400 hover:text-emerald-400 transition-colors p-2 hover:bg-slate-900 rounded-lg"
    aria-label={label}
  >
    {icon}
  </a>
);
