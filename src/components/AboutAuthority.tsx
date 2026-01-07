import { ShieldCheck, Award, Terminal } from 'lucide-react';

export const AboutAuthority = () => {
  return (
    <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-start">
        
        {/* Host Profile */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-white">Host Authority</h2>
          </div>
          
          <div className="prose prose-invert text-slate-300">
            <p className="text-lg leading-relaxed">
              Detrás del canal está <strong className="text-white">Pablo Pérez-Aradros</strong>, CISO en Santander Group. 
              El contenido no es generalista; es formación técnica de nicho impartida por un 
              <strong className="text-blue-400"> CNCF Kubeastronaut</strong>.
            </p>
          </div>

          {/* Certifications Badges (Simulated Logos) */}
          <div className="flex flex-wrap gap-3 pt-4">
            {['KCNA', 'CKA', 'CKS', 'Kubeastronaut', 'CISO'].map((cert) => (
              <span key={cert} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-400 flex items-center gap-2">
                <Award className="w-3 h-3" />
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Audience Profile */}
        <div className="flex-1 bg-slate-950/50 rounded-xl p-8 border border-slate-800/50 w-full">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-bold text-white">Audience Profile</h3>
          </div>
          
          <p className="text-slate-400 mb-6">
            Mi audiencia está compuesta por profesionales que buscan dominar tecnologías Cloud Native de vanguardia.
            No son principiantes; son ingenieros buscando especialización.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {['Docker', 'Kubernetes', 'Terraform', 'DevSecOps'].map((tech) => (
              <div key={tech} className="flex items-center gap-2 text-slate-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {tech}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
