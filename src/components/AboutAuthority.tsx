import { ShieldCheck, Award, Terminal, Briefcase, CheckCircle2 } from 'lucide-react';
import { useMetricsConfig } from '../hooks/useMetricsConfig';
import { useLanguage } from '../i18n';

export const AboutAuthority = () => {
  const config = useMetricsConfig();
  const { t } = useLanguage();
  
  return (
    <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header - Terminal style */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-blue-400 font-mono text-sm">$</span>
        <h2 className="text-sm font-mono text-blue-400 uppercase tracking-wider">{t.about.command}</h2>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Host Profile - La Autoridad */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white font-mono">{t.about.title}</h2>
          </div>
          
          <div className="prose prose-invert text-slate-200">
            <p className="text-lg leading-relaxed">
              {t.about.intro} <strong className="text-white">Pablo Pérez-Aradros</strong>, 
              <span className="text-blue-400 font-semibold"> {t.about.role}</span> con{' '}
              <span className="text-white font-semibold">{config.authority.yearsExperience}+ {t.about.experience}</span> {t.about.experienceText}
            </p>
            <p className="text-slate-200 mt-4">
              {t.about.description}
            </p>
          </div>

          {/* Por qué esto importa al patrocinador */}
          <div className="bg-slate-950/30 backdrop-blur border border-white/5 rounded-xl p-6 mt-6">
            <h4 className="text-blue-400 font-mono text-sm mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {t.about.whatIOffer}
            </h4>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">{t.about.technicalPerspective}</strong> {t.about.technicalPerspectiveDesc}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">{t.about.durableContent}</strong> {t.about.durableContentDesc}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">{t.about.honestFeedback}</strong> {t.about.honestFeedbackDesc}</span>
              </li>
            </ul>
          </div>

          {/* Certifications - Badges técnicos */}
          <div className="pt-6">
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-4">{t.about.certifications}</p>
            
            {/* Top Tier - Reconocimientos de Liderazgo */}
            <div className="mb-4">
              <p className="text-xs text-blue-400/70 font-mono mb-2">{t.about.leadershipRecognition}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Docker Captain', color: 'pink' },
                  { name: 'Kubestronaut', color: 'blue' }
                ].map((cert) => (
                  <span 
                    key={cert.name} 
                    className={`px-4 py-2 bg-slate-950/50 backdrop-blur border rounded-lg text-xs font-mono flex items-center gap-2 ${
                      cert.color === 'blue' 
                        ? 'border-blue-500/50 text-blue-400 shadow-sm shadow-blue-500/20' 
                        : 'border-pink-500/50 text-pink-400 shadow-sm shadow-pink-500/20'
                    }`}
                  >
                    <Award className="w-3 h-3" />
                    {cert.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Ciberseguridad Ofensiva */}
            <div className="mb-4">
              <p className="text-xs text-pink-400/70 font-mono mb-2">{t.about.cybersecurity}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'OSCP', color: 'pink' },
                  { name: 'ISO 27001 Auditor', color: 'blue' },
                  { name: 'CISO SecDevOps', color: 'pink' }
                ].map((cert) => (
                  <span 
                    key={cert.name} 
                    className={`px-3 py-1.5 bg-slate-950/50 backdrop-blur border rounded-lg text-xs font-mono flex items-center gap-2 ${
                      cert.color === 'blue' 
                        ? 'border-blue-500/30 text-blue-400' 
                        : 'border-pink-500/30 text-pink-400'
                    }`}
                  >
                    <Award className="w-3 h-3" />
                    {cert.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Kubernetes & Cloud Native */}
            <div>
              <p className="text-xs text-blue-400/70 font-mono mb-2">{t.about.kubernetes}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'CKS', color: 'blue' },
                  { name: 'CKA', color: 'pink' },
                  { name: 'CKAD', color: 'blue' },
                  { name: 'KCSA', color: 'pink' },
                  { name: 'KCNA', color: 'blue' }
                ].map((cert) => (
                  <span 
                    key={cert.name} 
                    className={`px-3 py-1.5 bg-slate-950/50 backdrop-blur border rounded-lg text-xs font-mono flex items-center gap-2 ${
                      cert.color === 'blue' 
                        ? 'border-blue-500/30 text-blue-400' 
                        : 'border-pink-500/30 text-pink-400'
                    }`}
                  >
                    <Award className="w-3 h-3" />
                    {cert.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Audience Profile - Perfil de Audiencia B2B */}
        <div className="flex-1 bg-slate-950/30 backdrop-blur rounded-xl p-8 border border-white/5 w-full">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-6 h-6 text-pink-400" />
            <h3 className="text-xl font-bold text-white font-mono">{t.about.audienceProfile}</h3>
          </div>
          
          <p className="text-slate-200 mb-8">
            {t.about.audienceIntro} <span className="text-white">{t.about.audienceNotStudents}</span>. {t.about.audienceDesc}
          </p>

          {/* Stack Tecnológico de la Audiencia */}
          <div className="mb-8">
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-4">{t.about.techStack}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Kubernetes', pct: config.audience.techStack.kubernetes },
                { name: 'Docker', pct: config.audience.techStack.docker },
                { name: 'Terraform', pct: config.audience.techStack.terraform },
                { name: 'AWS/GCP', pct: config.audience.techStack.cloudProviders },
                { name: 'CI/CD', pct: config.audience.techStack.cicd },
                { name: 'Linux', pct: config.audience.techStack.linux }
              ].map((tech) => (
                <div key={tech.name} className="flex items-center justify-between gap-2 text-sm bg-slate-900/40 backdrop-blur px-3 py-2 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 text-slate-200">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full"></div>
                    {tech.name}
                  </div>
                  <span className="text-blue-400 font-mono text-xs">{tech.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tipo de Empresas */}
          <div>
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-4">{t.about.employers}</p>
            <div className="flex flex-wrap gap-2">
              {[t.employers.startups, t.employers.consultants, t.employers.banking, t.employers.ecommerce, t.employers.government].map((type) => (
                <span 
                  key={type} 
                  className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs text-slate-400"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
