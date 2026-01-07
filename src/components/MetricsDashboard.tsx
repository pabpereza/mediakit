import { Users, Eye, Activity, PlaySquare, MapPin, Briefcase, TrendingUp, Clock, Target, BarChart3 } from 'lucide-react';
import { useYouTubeMetrics } from '../hooks/useYouTubeMetrics';
import { useMetricsConfig } from '../hooks/useMetricsConfig';

export const MetricsDashboard = () => {
  const { metrics, loading } = useYouTubeMetrics();
  const config = useMetricsConfig();

  if (loading) {
    return (
      <div className="py-12 text-center font-mono">
        <span className="text-emerald-400">$</span>
        <span className="text-slate-500 ml-2">fetching real-time metrics...</span>
        <span className="animate-pulse text-emerald-400 ml-1">▌</span>
      </div>
    );
  }

  return (
    <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-emerald-500/30 rounded-full font-mono text-sm">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="text-emerald-400">$</span>
          <span className="text-slate-400">analytics --mode=business</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Datos <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Transparentes</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Métricas reales del canal para que puedas tomar una decisión informada.
        </p>
      </div>

      {/* Primary Metrics - Channel Stats */}
      <div>
        <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider mb-6 flex items-center gap-3">
          <BarChart3 className="w-4 h-4" />
          Métricas de Canal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            icon={<Users className="w-5 h-5 text-emerald-400" />}
            label="Suscriptores Activos"
            value={metrics.subscriberCount}
            subtext="Profesionales IT verificados"
            trend={`${config.channel.subscribersTrend} últimos 6 meses`}
            trendUp={true}
          />
          <MetricCard 
            icon={<Eye className="w-5 h-5 text-cyan-400" />}
            label="Visualizaciones Totales"
            value={metrics.viewCount}
            subtext="Contenido evergreen"
            trend={`${config.channel.monthlyViews} mensuales`}
            trendUp={true}
          />
          <MetricCard 
            icon={<Activity className="w-5 h-5 text-emerald-400" />}
            label="Engagement Rate"
            value={metrics.engagementRate}
            subtext="vs 2-3% promedio del sector"
            trend="Top 10% en nicho tech"
            trendUp={true}
          />
          <MetricCard 
            icon={<PlaySquare className="w-5 h-5 text-cyan-400" />}
            label="Biblioteca de Vídeos"
            value={metrics.videoCount}
            subtext="Deep dives técnicos"
            trend={`${config.channel.newVideosPerMonth} nuevos/mes`}
            trendUp={true}
          />
        </div>
      </div>

      {/* SECCIÓN CRÍTICA: Métricas B2B - Calidad de Audiencia */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10">
        <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-8 flex items-center gap-3">
          <Target className="w-4 h-4" />
          Calidad de Audiencia — Por qué esto NO es marketing de consumo
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Seniority de la Audiencia - CRÍTICO para B2B */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                Seniority de la Audiencia
              </h4>
              <span className="text-xs text-slate-500 font-mono">// Fuente: encuesta canal 2025</span>
            </div>
            <p className="text-xs text-slate-500">
              <strong className="text-emerald-400">Por qué importa:</strong> Los seniors y leads tienen capacidad de decisión de compra directa. Un junior puede recomendar, pero un senior firma el contrato.
            </p>
            <div className="space-y-4">
              <SeniorityBar label="Senior / Staff Engineer" percentage={config.audience.seniority.seniorStaff} color="emerald" />
              <SeniorityBar label="Lead / Tech Lead / Architect" percentage={config.audience.seniority.leadArchitect} color="cyan" />
              <SeniorityBar label="Manager / Director / CTO / CISO" percentage={config.audience.seniority.managerDirector} color="emerald" />
              <SeniorityBar label="Mid-Level Engineer" percentage={config.audience.seniority.midLevel} color="slate" />
              <SeniorityBar label="Junior / Trainee" percentage={config.audience.seniority.junior} color="slate" />
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-4">
              <p className="text-emerald-400 text-sm font-mono">
                → <span className="text-white font-bold">{config.audience.seniority.seniorOrAboveTotal}</span> de la audiencia tiene nivel Senior o superior
              </p>
            </div>
          </div>

          {/* Job Titles / Cargos */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                Cargos Principales (Job Titles)
              </h4>
              <span className="text-xs text-slate-500 font-mono">// Top 10 roles</span>
            </div>
            <p className="text-xs text-slate-500">
              <strong className="text-cyan-400">Por qué importa:</strong> Estos son los perfiles que evalúan, prueban y adquieren herramientas enterprise.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'DevOps Engineer', pct: config.audience.jobTitles.devopsEngineer },
                { title: 'SRE / Platform Eng.', pct: config.audience.jobTitles.srePlatform },
                { title: 'Security Engineer', pct: config.audience.jobTitles.securityEngineer },
                { title: 'Cloud Architect', pct: config.audience.jobTitles.cloudArchitect },
                { title: 'Backend Developer', pct: config.audience.jobTitles.backendDeveloper },
                { title: 'SysAdmin / IT Ops', pct: config.audience.jobTitles.sysadminItOps },
                { title: 'CTO / VP Engineering', pct: config.audience.jobTitles.ctoVpEngineering },
                { title: 'CISO / Sec. Manager', pct: config.audience.jobTitles.cisoSecManager }
              ].map((job, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 flex justify-between items-center">
                  <span className="text-slate-300 text-sm">{job.title}</span>
                  <span className="text-cyan-400 font-mono text-xs">{job.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ubicación Geográfica + Retención */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Ubicación Geográfica */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Distribución Geográfica
            </h4>
            <span className="text-xs text-slate-500 font-mono">// YouTube Analytics</span>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            <strong className="text-emerald-400">Por qué importa:</strong> Cobertura del mercado hispanohablante tech completo. Ideal para empresas con presencia en España + LATAM.
          </p>
          <div className="space-y-4">
            <GeoBar label="🇪🇸 España" percentage={config.audience.geography.spain} color="emerald" />
            <GeoBar label="🇲🇽 México" percentage={config.audience.geography.mexico} color="cyan" />
            <GeoBar label="🇦🇷 Argentina" percentage={config.audience.geography.argentina} color="emerald" />
            <GeoBar label="🇨🇴 Colombia" percentage={config.audience.geography.colombia} color="cyan" />
            <GeoBar label="🇨🇱 Chile" percentage={config.audience.geography.chile} color="emerald" />
            <GeoBar label="🌎 Otros LATAM" percentage={config.audience.geography.otherLatam} color="slate" />
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 mt-6">
            <p className="text-slate-400 text-sm">
              <span className="text-white font-semibold">{config.audience.geography.spainTotal}</span> España + <span className="text-white font-semibold">{config.audience.geography.latamTotal}</span> LATAM = Cobertura total mercado hispano enterprise
            </p>
          </div>
        </div>

        {/* Retención de Audiencia */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Retención de Audiencia
            </h4>
            <span className="text-xs text-slate-500 font-mono">// Promedio 30 días</span>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            <strong className="text-cyan-400">Por qué importa:</strong> Alta retención = tu mensaje se ve COMPLETO. No hay skip del patrocinio porque el contenido mantiene enganchada a la audiencia.
          </p>
          
          {/* Retención Visual */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-6">
            <div className="flex items-end justify-between gap-2 h-32">
              {/* Retention curve bars */}
              {config.audience.retention.retentionCurve.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                  <div className="flex-1 w-full flex items-end">
                    <div 
                      className="w-full bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{(i+1)*10}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-500 font-mono">// Retención por duración del vídeo</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400 font-mono">{config.audience.retention.averageRetention}</p>
              <p className="text-xs text-slate-400 mt-1">Retención promedio</p>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-cyan-400 font-mono">{config.audience.retention.averageWatchTime}</p>
              <p className="text-xs text-slate-400 mt-1">Tiempo medio vista</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component: Metric Card
const MetricCard = ({ 
  icon, 
  label, 
  value, 
  subtext, 
  trend, 
  trendUp 
}: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  subtext: string,
  trend: string,
  trendUp: boolean
}) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-slate-800 transition-colors">{icon}</div>
      <div className={`flex items-center gap-1 text-xs font-mono ${trendUp ? 'text-emerald-400' : 'text-slate-500'}`}>
        {trendUp && <TrendingUp className="w-3 h-3" />}
        <span className="hidden sm:inline">{trend}</span>
      </div>
    </div>
    
    <div>
      <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-white mb-2 font-mono">{value}</h3>
      <p className="text-xs text-slate-500">{subtext}</p>
    </div>
    
    {/* Hover glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
  </div>
);

// Component: Seniority Bar
const SeniorityBar = ({ label, percentage, color }: { label: string, percentage: string, color: string }) => {
  const pctValue = parseInt(percentage.replace(/[^\d]/g, '')) || 0;
  const bgColor = color === 'emerald' ? 'from-emerald-500 to-emerald-400' : 
                  color === 'cyan' ? 'from-cyan-500 to-cyan-400' : 'from-slate-600 to-slate-500';
  const textColor = color === 'emerald' ? 'text-emerald-400' : color === 'cyan' ? 'text-cyan-400' : 'text-slate-500';
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className={`font-mono font-semibold ${textColor}`}>{percentage}</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${bgColor} rounded-full transition-all duration-1000`}
          style={{ width: pctValue > 0 ? `${Math.min(pctValue, 100)}%` : '30%' }}
        ></div>
      </div>
    </div>
  );
};

// Component: Geographic Bar
const GeoBar = ({ label, percentage, color }: { label: string, percentage: string, color: string }) => {
  const pctValue = parseInt(percentage.replace(/[^\d]/g, '')) || 0;
  const bgColor = color === 'emerald' ? 'bg-emerald-500' : color === 'cyan' ? 'bg-cyan-500' : 'bg-slate-600';
  const textColor = color === 'emerald' ? 'text-emerald-400' : color === 'cyan' ? 'text-cyan-400' : 'text-slate-500';
  
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-300 w-32">{label}</span>
      <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${bgColor} rounded-full transition-all duration-1000`}
          style={{ width: pctValue > 0 ? `${Math.min(pctValue, 100)}%` : '25%' }}
        ></div>
      </div>
      <span className={`font-mono text-sm font-semibold w-12 text-right ${textColor}`}>{percentage}</span>
    </div>
  );
};


