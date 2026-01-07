import { Download, Mail } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 max-w-7xl mx-auto text-center md:text-left">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
          Pabpereza <span className="text-blue-500">Media Kit</span>
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          Conectando marcas con la próxima generación de ingenieros <span className="text-slate-200 font-medium">DevSecOps</span> y <span className="text-slate-200 font-medium">Cloud Native</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a 
            href="mailto:contacto@pabpereza.com" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Mail className="w-5 h-5" />
            Solicitar Tarifas / Colaborar
          </a>
          <button 
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg border border-slate-700 transition-colors print:hidden"
          >
            <Download className="w-5 h-5" />
            Descargar Reporte PDF
          </button>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -z-10 opacity-20 blur-3xl">
        <div className="w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>
    </section>
  );
};
