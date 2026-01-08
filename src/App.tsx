import { Hero } from './components/Hero';
import { MetricsDashboard } from './components/MetricsDashboard';
import { AboutAuthority } from './components/AboutAuthority';
import { Sponsorships } from './components/Sponsorships';
import { Footer } from './components/Footer';
import { LanguageSelector } from './components/LanguageSelector';
import { LanguageProvider } from './i18n';

function App() {
  return (
    <LanguageProvider>
      <div id="mediakit-content" className="min-h-screen bg-transparent text-slate-50 selection:bg-blue-500/30">
        <LanguageSelector />
        <main className="space-y-12 md:space-y-24 pb-20">
          <Hero />
          <MetricsDashboard />
          <AboutAuthority />
          <Sponsorships />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
