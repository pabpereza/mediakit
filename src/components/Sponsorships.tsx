import { Video, Mic2, Share2 } from 'lucide-react';

export const Sponsorships = () => {
  return (
    <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">Sponsorship Opportunities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard 
          icon={<Video className="w-8 h-8 text-blue-500" />}
          title="Video Dedicado"
          description="Deep dive técnico en tu producto o herramienta. Un tutorial completo de 10-15 minutos mostrando casos de uso reales."
        />
        <ServiceCard 
          icon={<Mic2 className="w-8 h-8 text-purple-500" />}
          title="Integración / Mención"
          description="Shout-out de 60-90 segundos integrado orgánicamente en tutoriales evergreen. Ideal para brand awareness."
        />
        <ServiceCard 
          icon={<Share2 className="w-8 h-8 text-emerald-500" />}
          title="Social Blast"
          description="Amplificación estratégica en LinkedIn (+Red profesional) y Twitter para maximizar el alcance de tu campaña."
        />
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl hover:bg-slate-800/50 transition-colors text-center md:text-left">
    <div className="mb-6 inline-block p-4 bg-slate-950 rounded-full border border-slate-800">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">
      {description}
    </p>
  </div>
);
