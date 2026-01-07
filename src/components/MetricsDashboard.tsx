import { Users, Eye, Activity, PlaySquare } from 'lucide-react';
import { useYouTubeMetrics } from '../hooks/useYouTubeMetrics';

export const MetricsDashboard = () => {
  const { metrics, loading } = useYouTubeMetrics();

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Cargando métricas en tiempo real...</div>;
  }

  return (
    <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
        <h2 className="text-sm font-mono text-green-500 uppercase tracking-wider">Real-Time Audience Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={<Users className="w-5 h-5 text-blue-400" />}
          label="Subscribers"
          value={metrics.subscriberCount}
          trend="+12% vs last month"
        />
        <MetricCard 
          icon={<Eye className="w-5 h-5 text-purple-400" />}
          label="Lifetime Views"
          value={metrics.viewCount}
          trend="Consistent Growth"
        />
        <MetricCard 
          icon={<Activity className="w-5 h-5 text-emerald-400" />}
          label="Engagement Rate"
          value={metrics.engagementRate}
          trend="High Interaction"
        />
        <MetricCard 
          icon={<PlaySquare className="w-5 h-5 text-rose-400" />}
          label="Video Library"
          value={metrics.videoCount}
          trend="Technical Deep Dives"
        />
      </div>
    </section>
  );
};

const MetricCard = ({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-slate-700 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-800/50 rounded-lg">{icon}</div>
      {/* Mock Sparkline */}
      <svg className="w-20 h-10 text-slate-700 opacity-50" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M0 40 Q 25 45, 50 25 T 100 10" />
      </svg>
    </div>
    
    <div>
      <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
      <p className="text-xs text-slate-500 font-mono">{trend}</p>
    </div>
  </div>
);
