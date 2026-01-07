import { useState, useEffect } from 'react';

export interface YouTubeMetrics {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  engagementRate: string;
}

const FALLBACK_DATA: YouTubeMetrics = {
  subscriberCount: "20.3K",
  viewCount: "759K",
  videoCount: "196+",
  engagementRate: "4.8%"
};

export const useYouTubeMetrics = () => {
  const [metrics, setMetrics] = useState<YouTubeMetrics>(FALLBACK_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API Key and Channel ID
        // const CHANNEL_ID = 'UC_ID';
        // const API_KEY = 'YOUR_API_KEY';
        // const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`);
        
        // if (!response.ok) {
        //   throw new Error('Failed to fetch metrics');
        // }

        // const data = await response.json();
        // const stats = data.items[0].statistics;
        
        // setMetrics({
        //   subscriberCount: formatNumber(stats.subscriberCount),
        //   viewCount: formatNumber(stats.viewCount),
        //   videoCount: stats.videoCount,
        //   engagementRate: "4.8%" // Calculated or mocked
        // });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setMetrics(FALLBACK_DATA);

      } catch (err) {
        console.error("Error fetching YouTube metrics:", err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setMetrics(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
};

// Helper to format numbers if needed (e.g. 20300 -> 20.3K)
// const formatNumber = (num: string) => {
//   const n = parseInt(num);
//   if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
//   if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
//   return num;
// };
