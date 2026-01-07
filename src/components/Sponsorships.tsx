import { Video, Rocket, CheckCircle2, Zap, Shield, BarChart3 } from 'lucide-react';
import { useMetricsConfig } from '../hooks/useMetricsConfig';
import { useLanguage } from '../i18n';

export const Sponsorships = () => {
  const config = useMetricsConfig();
  const { t } = useLanguage();
  
  return (
    <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-full font-mono text-sm">
          <span className="text-cyan-400">$</span>
          <span className="text-slate-400">{t.sponsorships.command}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {t.sponsorships.sectionTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{t.sponsorships.sectionTitleHighlight}</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          {t.sponsorships.sectionSubtitle}
        </p>
      </div>
      
      {/* Main Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <PackageCard 
          icon={<Video className="w-8 h-8" />}
          iconBg="emerald"
          title={t.sponsorships.deepDive}
          subtitle={t.sponsorships.deepDiveSubtitle}
          price={t.sponsorships.deepDivePrice}
          priceNote={t.sponsorships.deepDivePriceNote}
          description={t.sponsorships.deepDiveDesc}
          features={t.sponsorships.features.deepDive as unknown as string[]}
          highlight={false}
          cta={t.sponsorships.deepDiveCta}
          mostPopularLabel={t.sponsorships.mostPopular}
        />
        
        <PackageCard 
          icon={<Zap className="w-8 h-8" />}
          iconBg="cyan"
          title={t.sponsorships.integration}
          subtitle={t.sponsorships.integrationSubtitle}
          price={t.sponsorships.integrationPrice}
          priceNote={t.sponsorships.integrationPriceNote}
          description={t.sponsorships.integrationDesc}
          features={t.sponsorships.features.integration as unknown as string[]}
          highlight={true}
          cta={t.sponsorships.integrationCta}
          mostPopularLabel={t.sponsorships.mostPopular}
        />
        
        <PackageCard 
          icon={<Rocket className="w-8 h-8" />}
          iconBg="emerald"
          title={t.sponsorships.campaign}
          subtitle={t.sponsorships.campaignSubtitle}
          price={t.sponsorships.campaignPrice}
          priceNote={t.sponsorships.campaignPriceNote}
          description={t.sponsorships.campaignDesc}
          features={(t.sponsorships.features.campaign as unknown as string[]).map(f => 
            f.replace('{linkedinNetwork}', config.sponsorships.linkedinNetwork)
          )}
          highlight={false}
          cta={t.sponsorships.campaignCta}
          mostPopularLabel={t.sponsorships.mostPopular}
        />
      </div>

      {/* Why This Works - ROI Section */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-mono">{t.sponsorships.whyItWorks}</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ROIPoint 
            icon={<Shield className="w-5 h-5 text-emerald-400" />}
            title={t.sponsorships.technicalAudience}
            description={t.sponsorships.technicalAudienceDesc}
          />
          <ROIPoint 
            icon={<Video className="w-5 h-5 text-cyan-400" />}
            title={t.sponsorships.durableContentTitle}
            description={t.sponsorships.durableContentDesc}
          />
          <ROIPoint 
            icon={<Zap className="w-5 h-5 text-emerald-400" />}
            title={t.sponsorships.realContext}
            description={t.sponsorships.realContextDesc}
          />
        </div>
      </div>
    </section>
  );
};

// Component: Package Card
const PackageCard = ({ 
  icon, 
  iconBg,
  title, 
  subtitle,
  price,
  priceNote,
  description,
  features,
  highlight,
  cta,
  mostPopularLabel
}: { 
  icon: React.ReactNode, 
  iconBg: 'emerald' | 'cyan',
  title: string, 
  subtitle: string,
  price: string,
  priceNote: string,
  description: string,
  features: string[],
  highlight: boolean,
  cta: string,
  mostPopularLabel: string
}) => (
  <div className={`relative bg-slate-900 border rounded-2xl p-8 transition-all duration-300 ${
    highlight 
      ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10 scale-[1.02]' 
      : 'border-slate-800 hover:border-slate-700'
  }`}>
    {highlight && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="px-4 py-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-xs font-bold rounded-full">
          {mostPopularLabel}
        </span>
      </div>
    )}
    
    <div className={`inline-block p-4 rounded-xl mb-6 ${
      iconBg === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'
    }`}>
      {icon}
    </div>
    
    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
    <p className="text-sm text-slate-500 mb-4 font-mono">{subtitle}</p>
    
    <div className="mb-6">
      <span className="text-3xl font-bold text-white">{price}</span>
      <span className="text-slate-500 text-sm ml-2">{priceNote}</span>
    </div>
    
    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
      {description}
    </p>
    
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    
    <div className="pt-4 border-t border-slate-800">
      <p className={`text-xs font-mono ${iconBg === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'}`}>
        {cta}
      </p>
    </div>
  </div>
);

// Component: ROI Point
const ROIPoint = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      {icon}
      <h4 className="text-white font-semibold">{title}</h4>
    </div>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);
