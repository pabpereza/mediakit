import { Hero } from './components/Hero';
import { MetricsDashboard } from './components/MetricsDashboard';
import { AboutAuthority } from './components/AboutAuthority';
import { Sponsorships } from './components/Sponsorships';
import { Footer } from './components/Footer';

function App() {
  return (
    <div id="mediakit-content" className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      <main className="space-y-12 md:space-y-24 pb-20">
        <Hero />
        <MetricsDashboard />
        <AboutAuthority />
        <Sponsorships />
      </main>
      <Footer />
    </div>
  );
}

export default App;
