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
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/40 backdrop-blur-lg border border-blue-500/30 rounded-full font-mono text-sm">
          <span className="text-blue-400">$</span>
          <span className="text-slate-200">{t.sponsorships.command}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {t.sponsorships.sectionTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">{t.sponsorships.sectionTitleHighlight}</span>
        </h2>
        <p className="text-slate-200 max-w-2xl mx-auto">
          {t.sponsorships.sectionSubtitle}
        </p>
      </div>
      
      {/* Main Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <PackageCard 
          icon={<Video className="w-8 h-8" />}
          iconBg="blue"
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
          iconBg="pink"
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
          iconBg="blue"
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
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-mono">{t.sponsorships.whyItWorks}</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ROIPoint 
            icon={<Shield className="w-5 h-5 text-blue-400" />}
            title={t.sponsorships.technicalAudience}
            description={t.sponsorships.technicalAudienceDesc}
          />
          <ROIPoint 
            icon={<Video className="w-5 h-5 text-pink-400" />}
            title={t.sponsorships.durableContentTitle}
            description={t.sponsorships.durableContentDesc}
          />
          <ROIPoint 
            icon={<Zap className="w-5 h-5 text-blue-400" />}
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
  iconBg: 'blue' | 'pink',
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
  <div className={`relative bg-slate-900/40 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300 ${
    highlight 
      ? 'border-pink-500/50 shadow-lg shadow-pink-500/10 scale-[1.02]' 
      : 'border-white/10 hover:border-blue-500/30'
  }`}>
    {highlight && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-xs font-bold rounded-full">
          {mostPopularLabel}
        </span>
      </div>
    )}
    
    <div className={`inline-block p-4 rounded-xl mb-6 ${
      iconBg === 'blue' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'
    }`}>
      {icon}
    </div>
    
    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
    <p className="text-sm text-slate-400 mb-4 font-mono">{subtitle}</p>
    
    <div className="mb-6">
      <span className="text-3xl font-bold text-white">{price}</span>
      <span className="text-slate-400 text-sm ml-2">{priceNote}</span>
    </div>
    
    <p className="text-slate-200 mb-6 text-sm leading-relaxed">
      {description}
    </p>
    
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
          <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
    
    <div className="pt-4 border-t border-white/10">
      <p className={`text-xs font-mono ${iconBg === 'pink' ? 'text-pink-400' : 'text-blue-400'}`}>
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
    <p className="text-slate-200 text-sm leading-relaxed">{description}</p>
  </div>
);
