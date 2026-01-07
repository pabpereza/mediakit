import metricsData from '../data/metrics.json';

export interface MetricsConfig {
  _meta: {
    description: string;
    lastUpdated: string;
    version: string;
  };
  channel: {
    viewCount: string;
    videoCount: string;
    engagementRate: string;
    subscribersTrend: string;
    monthlyViews: string;
    newVideosPerMonth: string;
  };
  audience: {
    seniority: {
      seniorStaff: string;
      leadArchitect: string;
      managerDirector: string;
      midLevel: string;
      junior: string;
      seniorOrAboveTotal: string;
    };
    jobTitles: {
      devopsEngineer: string;
      srePlatform: string;
      securityEngineer: string;
      cloudArchitect: string;
      backendDeveloper: string;
      sysadminItOps: string;
      ctoVpEngineering: string;
      cisoSecManager: string;
    };
    geography: {
      spain: string;
      mexico: string;
      argentina: string;
      colombia: string;
      chile: string;
      otherLatam: string;
      spainTotal: string;
      latamTotal: string;
    };
    retention: {
      averageRetention: string;
      averageWatchTime: string;
      retentionCurve: number[];
    };
    techStack: {
      kubernetes: string;
      docker: string;
      terraform: string;
      cloudProviders: string;
      cicd: string;
      linux: string;
    };
  };
  global: {
    totalProfessionals: string;
    decisionMakersPercentage: string;
  };
  hero: {
    seniorLeadPercentage: string;
  };
  authority: {
    yearsExperience: string;
  };
  sponsorships: {
    linkedinNetwork: string;
  };
}

export const useMetricsConfig = (): MetricsConfig => {
  return metricsData as MetricsConfig;
};

export default useMetricsConfig;
