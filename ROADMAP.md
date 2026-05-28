# 🗺️ LiveSticky Roadmap

This document outlines planned features, future improvements, and ideas for the **LiveSticky** Reddit bot.

---

## 🚀 Future Feature Ideas

### 1. 🎮 Game-Specific Flairing & Filtering
* **Dynamic Flairs**: Automatically update the live post's flair to reflect the active game/category (e.g., "🔴 Playing: Minecraft" or "🔴 Just Chatting") using Devvit's post flair update APIs.
* **Game Whitelist/Blacklist**: Allow moderators to set a game filter (e.g., only create live sticky posts when streaming specific games, and ignore others).

### 2. 👾 Discord Webhook Integration
* Send a customizable notification message to a configured Discord webhook when the stream goes live, containing the link to the Reddit live thread to coordinate promotion.

### 3. 🎬 Advanced Highlights & Clips Controls
* Allow configuration of the number of compiled clips (e.g., top 3, 5, or 10 clips).
* Add a minimum view count threshold (e.g., only post clips with $\ge 15$ views) to prevent posting low-quality clips.

### 4. 🔴 YouTube Live Status Polling (Multi-Platform)
* Poll the YouTube Live API in addition to Twitch Helix API. If the creator goes live on YouTube, trigger the same automated live-sticky flow.

### 5. 🎨 Subreddit Style Updates (Live Banner/Icon)
* Update a custom image widget or the subreddit's banner to a "LIVE NOW" asset when online, and automatically restore it to default when offline.
