import { useLanguage } from '../i18n/LanguageContext';

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 print:hidden" data-pdf-hide>
      <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-lg p-1 font-mono text-sm">
        <button
          onClick={() => setLanguage('es')}
          className={`px-3 py-1.5 rounded-md transition-all ${
            language === 'es'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 rounded-md transition-all ${
            language === 'en'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};
