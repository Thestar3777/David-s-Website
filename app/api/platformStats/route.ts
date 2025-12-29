import { NextResponse } from 'next/server';

interface PlatformStats {
  youtube: {
    subscribers: number;
    totalViews: number;
  };
  instagram: {
    followers: number;
  };
}

export async function GET() {
  try {
    // YouTube Data API v3
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;

    // Instagram Basic Display API or Graph API
    const instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const instagramUserId = process.env.INSTAGRAM_USER_ID;

    const stats: PlatformStats = {
      youtube: {
        subscribers: 0,
        totalViews: 0,
      },
      instagram: {
        followers: 0,
      },
    };

    // Fetch YouTube stats
    if (youtubeApiKey && youtubeChannelId) {
      try {
        const youtubeRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeChannelId}&key=${youtubeApiKey}`
        );

        if (youtubeRes.ok) {
          const youtubeData = await youtubeRes.json();
          if (youtubeData.items && youtubeData.items.length > 0) {
            const statistics = youtubeData.items[0].statistics;
            stats.youtube.subscribers = parseInt(statistics.subscriberCount || '0');
            stats.youtube.totalViews = parseInt(statistics.viewCount || '0');
          }
        }
      } catch (error) {
        console.error('Error fetching YouTube stats:', error);
      }
    }

    // Fetch Instagram stats
    if (instagramAccessToken && instagramUserId) {
      try {
        const instagramRes = await fetch(
          `https://graph.instagram.com/${instagramUserId}?fields=followers_count&access_token=${instagramAccessToken}`
        );

        if (instagramRes.ok) {
          const instagramData = await instagramRes.json();
          stats.instagram.followers = instagramData.followers_count || 0;
        }
      } catch (error) {
        console.error('Error fetching Instagram stats:', error);
      }
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching platform stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch platform stats' },
      { status: 500 }
    );
  }
}
