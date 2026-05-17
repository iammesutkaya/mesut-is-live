import { Devvit, SettingScope } from '@devvit/public-api';

// Enable Reddit, Redis, and HTTP plugins
Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
});

// Define the configuration settings for the subreddit
Devvit.addSettings([
  {
    type: 'string',
    name: 'twitchChannel',
    label: 'Twitch Channel Name',
    helpText: 'The name of the Twitch channel to monitor (e.g., ninja)',
  },
  {
    type: 'string',
    name: 'twitchClientId',
    label: 'Twitch Client ID',
    isSecret: true,
    scope: SettingScope.App,
  },
  {
    type: 'string',
    name: 'twitchClientSecret',
    label: 'Twitch Client Secret',
    isSecret: true,
    scope: SettingScope.App,
  }
]);

// Define the scheduled job
Devvit.addSchedulerJob({
  name: 'check-twitch-status',
  onRun: async (_, context) => {
    // 1. Get settings
    const channel = await context.settings.get('twitchChannel');
    const clientId = await context.settings.get('twitchClientId');
    const secret = await context.settings.get('twitchClientSecret');
    
    if (!channel || !clientId || !secret) {
      console.log(`Missing Twitch configuration - Channel: ${!!channel}, ClientID: ${!!clientId}, Secret: ${!!secret}`);
      return;
    }

    // 2. Fetch Twitch Token (In production, you should cache this in Redis!)
    const tokenRes = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secret}&grant_type=client_credentials`, {
      method: 'POST'
    });
    
    if (!tokenRes.ok) {
      console.error('Failed to get Twitch Token');
      return;
    }
    
    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;

    // 3. Check Stream Status
    const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channel}`, {
      headers: {
        'Client-ID': clientId as string,
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!streamRes.ok) {
      console.error('Failed to fetch Twitch stream status');
      return;
    }

    const streamData = await streamRes.json();
    const isLive = streamData.data && streamData.data.length > 0;
    
    // 4. Update Reddit State
    const isCurrentlyPinned = await context.redis.get('is_live_pinned');
    
    if (isLive && !isCurrentlyPinned) {
      console.log('Stream went live! Posting and pinning...');
      const subreddit = await context.reddit.getCurrentSubreddit();
      
      const post = await context.reddit.submitPost({
        title: `🔴 LIVE NOW: ${streamData.data[0].title}`,
        subredditName: subreddit.name,
        text: `Come watch the stream: https://twitch.tv/${channel}`,
      });
      await post.sticky();
      
      // Save state to redis
      await context.redis.set('is_live_pinned', 'true');
      await context.redis.set('live_post_id', post.id);
      
    } else if (!isLive && isCurrentlyPinned) {
      console.log('Stream went offline! Unpinning...');
      const postId = await context.redis.get('live_post_id');
      if (postId) {
        const post = await context.reddit.getPostById(postId);
        await post.unsticky();
      }
      
      // Clear state from redis
      await context.redis.del('is_live_pinned');
      await context.redis.del('live_post_id');
    }
  }
});

// Trigger the job to start running when the app is installed
Devvit.addTrigger({
  event: 'AppInstall',
  onEvent: async (_, context) => {
    console.log('App installed! Scheduling Twitch check to run every 2 minutes...');
    try {
      await context.scheduler.runJob({
        name: 'check-twitch-status',
        cron: '*/2 * * * *' // Run every 2 minutes
      });
    } catch (e) {
      console.error('Failed to schedule job', e);
    }
  }
});

export default Devvit;
