import { Users, Eye, Activity, PlaySquare, MapPin, Briefcase, TrendingUp, Clock, Target, BarChart3 } from 'lucide-react';
import { useYouTubeMetrics } from '../hooks/useYouTubeMetrics';
import { useMetricsConfig } from '../hooks/useMetricsConfig';
import { useLanguage } from '../i18n';

export const MetricsDashboard = () => {
  const { metrics, loading } = useYouTubeMetrics();
  const config = useMetricsConfig();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="py-12 text-center font-mono">
        <span className="text-blue-400">$</span>
        <span className="text-slate-400 ml-2">{t.common.loading}</span>
        <span className="animate-pulse text-blue-400 ml-1">▌</span>
      </div>
    );
  }

  return (
    <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/40 backdrop-blur-lg border border-blue-500/30 rounded-full font-mono text-sm">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          <span className="text-blue-400">$</span>
          <span className="text-slate-200">{t.metrics.sectionBadge}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {t.metrics.sectionTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">{t.metrics.sectionTitleHighlight}</span>
        </h2>
        <p className="text-slate-200 max-w-2xl mx-auto">
          {t.metrics.sectionSubtitle}
        </p>
      </div>

      {/* Primary Metrics - Channel Stats */}
      <div>
        <h3 className="text-sm font-mono text-blue-400 uppercase tracking-wider mb-6 flex items-center gap-3">
          <BarChart3 className="w-4 h-4" />
          {t.metrics.channelMetrics}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            icon={<Users className="w-5 h-5 text-blue-400" />}
            label={t.metrics.subscribers}
            value={metrics.subscriberCount}
            subtext={t.metrics.subscribersSubtext}
            trend={`${config.channel.subscribersTrend} ${t.metrics.last6Months}`}
            trendUp={true}
          />
          <MetricCard 
            icon={<Eye className="w-5 h-5 text-pink-400" />}
            label={t.metrics.views}
            value={metrics.viewCount}
            subtext={t.metrics.viewsSubtext}
            trend={`${config.channel.monthlyViews} ${t.metrics.monthlyLabel}`}
            trendUp={true}
          />
          <MetricCard 
            icon={<Activity className="w-5 h-5 text-blue-400" />}
            label={t.metrics.engagement}
            value={metrics.engagementRate}
            subtext={t.metrics.engagementSubtext}
            trend={t.metrics.engagementTrend}
            trendUp={true}
          />
          <MetricCard 
            icon={<PlaySquare className="w-5 h-5 text-pink-400" />}
            label={t.metrics.videos}
            value={metrics.videoCount}
            subtext={t.metrics.videosSubtext}
            trend={`${config.channel.newVideosPerMonth} ${t.metrics.newPerMonth}`}
            trendUp={true}
          />
        </div>
      </div>

      {/* SECCIÓN CRÍTICA: Métricas B2B - Calidad de Audiencia */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10">
        <h3 className="text-sm font-mono text-pink-400 uppercase tracking-wider mb-8 flex items-center gap-3">
          <Target className="w-4 h-4" />
          {t.metrics.audienceQuality}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Seniority de la Audiencia - CRÍTICO para B2B */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                {t.metrics.seniority}
              </h4>
              <span className="text-xs text-slate-400 font-mono">{t.metrics.senioritySource}</span>
            </div>
            <p className="text-xs text-slate-400">
              <strong className="text-blue-400">{t.metrics.seniorityWhy}</strong> {t.metrics.seniorityExplanation}
            </p>
            <div className="space-y-4">
              <SeniorityBar label={t.seniority.seniorStaff} percentage={config.audience.seniority.seniorStaff} color="blue" />
              <SeniorityBar label={t.seniority.leadArchitect} percentage={config.audience.seniority.leadArchitect} color="pink" />
              <SeniorityBar label={t.seniority.managerDirector} percentage={config.audience.seniority.managerDirector} color="blue" />
              <SeniorityBar label={t.seniority.midLevel} percentage={config.audience.seniority.midLevel} color="slate" />
              <SeniorityBar label={t.seniority.junior} percentage={config.audience.seniority.junior} color="slate" />
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <p className="text-blue-400 text-sm font-mono">
                → <span className="text-white font-bold">{config.audience.seniority.seniorOrAboveTotal}</span> {t.metrics.seniorOrAbove}
              </p>
            </div>
          </div>

          {/* Job Titles / Cargos */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-pink-400" />
                {t.metrics.jobTitles}
              </h4>
              <span className="text-xs text-slate-400 font-mono">{t.metrics.jobTitlesSource}</span>
            </div>
            <p className="text-xs text-slate-500">
              <strong className="text-pink-400">{t.metrics.jobTitlesWhy}</strong> {t.metrics.jobTitlesExplanation}
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
                <div key={i} className="bg-slate-900/40 backdrop-blur border border-white/5 rounded-lg px-4 py-3 flex justify-between items-center">
                  <span className="text-slate-200 text-sm">{job.title}</span>
                  <span className="text-pink-400 font-mono text-xs">{job.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ubicación Geográfica + Retención */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Ubicación Geográfica */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              {t.metrics.geography}
            </h4>
            <span className="text-xs text-slate-400 font-mono">{t.metrics.geographySource}</span>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            <strong className="text-blue-400">{t.metrics.geographyWhy}</strong> {t.metrics.geographyExplanation}
          </p>
          <div className="space-y-4">
            <GeoBar label="🇪🇸 España" percentage={config.audience.geography.spain} color="blue" />
            <GeoBar label="🇲🇽 México" percentage={config.audience.geography.mexico} color="pink" />
            <GeoBar label="🇦🇷 Argentina" percentage={config.audience.geography.argentina} color="blue" />
            <GeoBar label="🇨🇴 Colombia" percentage={config.audience.geography.colombia} color="pink" />
            <GeoBar label="🇨🇱 Chile" percentage={config.audience.geography.chile} color="blue" />
            <GeoBar label={`🌎 ${t.metrics.otherLatam}`} percentage={config.audience.geography.otherLatam} color="slate" />
          </div>
          <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 mt-6">
            <p className="text-slate-400 text-sm">
              <span className="text-white font-semibold">{config.audience.geography.spainTotal}</span> España + <span className="text-white font-semibold">{config.audience.geography.latamTotal}</span> LATAM = {t.metrics.geographyCoverage}
            </p>
          </div>
        </div>

        {/* Retención de Audiencia */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-pink-400" />
              {t.metrics.retention}
            </h4>
            <span className="text-xs text-slate-400 font-mono">{t.metrics.retentionSource}</span>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            <strong className="text-pink-400">{t.metrics.retentionWhy}</strong> {t.metrics.retentionExplanation}
          </p>
          
          {/* Retención Visual */}
          <div className="bg-slate-900/40 backdrop-blur rounded-xl border border-white/5 p-6 mb-6">
            <div className="flex items-end justify-between gap-2 h-32">
              {/* Retention curve bars */}
              {config.audience.retention.retentionCurve.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                  <div className="flex-1 w-full flex items-end">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-pink-400 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{(i+1)*10}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <span className="text-xs text-slate-400 font-mono">{t.metrics.retentionChart}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-400 font-mono">{config.audience.retention.averageRetention}</p>
              <p className="text-xs text-slate-400 mt-1">{t.metrics.avgRetention}</p>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-pink-400 font-mono">{config.audience.retention.averageWatchTime}</p>
              <p className="text-xs text-slate-400 mt-1">{t.metrics.avgWatchTime}</p>
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
  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-800/50 backdrop-blur rounded-lg group-hover:bg-slate-800/70 transition-colors">{icon}</div>
      <div className={`flex items-center gap-1 text-xs font-mono ${trendUp ? 'text-blue-400' : 'text-slate-500'}`}>
        {trendUp && <TrendingUp className="w-3 h-3" />}
        <span className="hidden sm:inline">{trend}</span>
      </div>
    </div>
    
    <div>
      <p className="text-slate-200 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-white mb-2 font-mono">{value}</h3>
      <p className="text-xs text-slate-400">{subtext}</p>
    </div>
    
    {/* Hover glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
  </div>
);

// Component: Seniority Bar
const SeniorityBar = ({ label, percentage, color }: { label: string, percentage: string, color: string }) => {
  const pctValue = parseInt(percentage.replace(/[^\d]/g, '')) || 0;
  const bgColor = color === 'blue' ? 'from-blue-500 to-blue-400' : 
                  color === 'pink' ? 'from-pink-500 to-pink-400' : 'from-slate-600 to-slate-500';
  const textColor = color === 'blue' ? 'text-blue-400' : color === 'pink' ? 'text-pink-400' : 'text-slate-500';
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-200">{label}</span>
        <span className={`font-mono font-semibold ${textColor}`}>{percentage}</span>
      </div>
      <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
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
  const bgColor = color === 'blue' ? 'bg-blue-500' : color === 'pink' ? 'bg-pink-500' : 'bg-slate-600';
  const textColor = color === 'blue' ? 'text-blue-400' : color === 'pink' ? 'text-pink-400' : 'text-slate-500';
  
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-200 w-32">{label}</span>
      <div className="flex-1 h-3 bg-slate-800/50 rounded-full overflow-hidden">
        <div 
          className={`h-full ${bgColor} rounded-full transition-all duration-1000`}
          style={{ width: pctValue > 0 ? `${Math.min(pctValue, 100)}%` : '25%' }}
        ></div>
      </div>
      <span className={`font-mono text-sm font-semibold w-12 text-right ${textColor}`}>{percentage}</span>
    </div>
  );
};


