# Mesut Is Live — Reddit Devvit Bot

An advanced, performant, and zero-maintenance stream notification bot for Reddit.

[![Devvit Platform](https://img.shields.io/badge/Platform-Reddit%20Devvit-FF4500?style=for-the-badge&logo=reddit)](https://developers.reddit.com)
[![Twitch Integration](https://img.shields.io/badge/Integration-Twitch%20Helix-9146FF?style=for-the-badge&logo=twitch)](https://dev.twitch.tv)
[![YouTube Integration](https://img.shields.io/badge/Integration-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://developers.google.com/youtube)
[![Redis Cached](https://img.shields.io/badge/Database-Redis%20Cache-D82C20?style=for-the-badge&logo=redis)](https://redis.io)

This bot automatically monitors a specified Twitch stream, creates and flairs a dedicated live discussion thread when the stream goes live, updates the stats (viewers, uptime, category) in real-time every 2 minutes, auto-pins a customizable moderator comment, and unpins/concludes the thread with VOD archives when the stream goes offline.

---

## ✨ Core Features
---

**🔴 Automatic Live Threads**  
Periodically polls your Twitch stream (every 2 minutes) and posts a beautifully stickied live discussion thread when you go live.

---

**⚡ Real-Time Statistics**  
Keeps the post body up-to-date in real-time with current uptime, game/category, and live viewer count.

---

**🛡️ Flapping & Disconnect Protection (6-Min Grace Period)**  
Prevents duplicate thread spam if your stream crashes briefly, OBS restarts, or Twitch’s API has a hiccup. It buffers the offline status for 6 minutes before concluding the thread.

---

**📺 Dual-Platform Promotion**  
Optionally promotes your YouTube stream alongside Twitch. If configured, links to both platforms are displayed side-by-side in both live and concluding posts.

---

**🏷️ Custom Post Flairing**  
Automatically flairs the live post (e.g., "🔴 Live Now") using your subreddit's custom post flair templates.

---

**📌 Pinned Moderator Comments**  
Auto-posts a distinguished, stickied moderator comment at the top of the discussion section to drive users to your Discord, social media, or list rules.

---

**🏁 Concluding VOD Archives**  
When the stream goes offline for more than 6 minutes, the bot edits the post to a clean "Offline / Thanks for watching!" archive state, highlights VOD links, and unstickies it so comments can continue.

---

**🚀 Efficient Redis Caching**  
Caches Twitch OAuth credentials for 24 hours to ensure high speed and prevent rate-limiting.

---

**🛠️ Unified Admin Reset**  
Includes a single-click moderator action in your subreddit mod tools to reset the scheduler and clear the cached database state instantly.

---

## ⚙️ Configuration Settings
---

Configure these options by going to **Mod Tools** ➔ **Apps** ➔ **mesut-is-live** ➔ **Settings**:

| Setting Name | Type | Description |
| :--- | :--- | :--- |
| **Twitch Channel Name** | `String` | The Twitch username to monitor (e.g. `ninja`). |
| **Twitch Client ID** | `String (Secret)` | Your Twitch Developer Client ID (scoped to App). |
| **Twitch Client Secret** | `String (Secret)` | Your Twitch Developer Client Secret (scoped to App). |
| **YouTube Channel/Live URL (Optional)** | `String` | The full link to your YouTube channel or live stream (e.g. `https://youtube.com/c/mesut/live`). |
| **Live Post Flair Template ID (Optional)** | `String` | The UUID of the flair template to apply to the post (found in Subreddit Mod Tools ➔ Post Flair). |
| **Auto-Pinned Comment Text (Optional)** | `Paragraph` | Custom multiline markdown to pin at the top of the comment section (supports paragraphs, list formatting, and links). |
| **Remove Post from Feed when Offline** | `Boolean` | Moderator action: Hides the post from the main subreddit listing when offline (prevents feed flooding while keeping comments/links active). |
| **Delete Post completely when Offline** | `Boolean` | Completely deletes the post and comments from Reddit when the stream ends. |
| **Enable Sticky Offline Post** | `Boolean` | Recycles a single permanent stickied post when offline (`😴[DisplayName] is OFFLINE! CHECK OUT NEWS & USEFUL LINKS😴`) to prevent new-post notifications, automatically clearing/flushing old comments on each transition so the comment section starts fresh. |
| **Enable Sidebar Widget** | `Boolean` | Creates and automatically updates a "STREAM STATUS" text widget in your subreddit sidebar reflecting the live/offline state, category, viewers, and uptime in real-time. |
| **Offline Post Body (Optional)** | `Paragraph` | Custom markdown for the body of the offline post. If empty, the default template is used. You can use `{channel}` and `{youtube_url}` as dynamic placeholders. |
| **Offline Sidebar Widget Text (Optional)** | `Paragraph` | Custom markdown for the sidebar widget when offline. If empty, the default template is used. You can use `{channel}`, `{display_name}`, and `{youtube_url}` as placeholders. |
| **Live Sidebar Widget Custom Footer (Optional)** | `Paragraph` | Custom markdown to append at the bottom of the sidebar widget when the stream is live. Perfect for adding Discord links, rules, etc. |
---

### 📝 Default Templates for Copy-Pasting

If you need to restore or tweak the default texts, you can copy these markdown templates:

#### 1. Default Offline Post Body:
```markdown
### 😴 STREAM OFFLINE

The stream has ended. Thank you for watching! 

---
### 📺 Channels:
* **Twitch:** [twitch.tv/{channel}](https://twitch.tv/{channel})
* **YouTube:** [Watch VODs on YouTube]({youtube_url})

---
*This live thread has concluded. VODs and highlights may be available on the links above.*
```

#### 2. Default Offline Sidebar Widget Text:
```markdown
# 😴 {display_name} is OFFLINE 😴

The stream is currently offline. Follow the channels below to get notified when we go live!

* [**Twitch Channel**](https://twitch.tv/{channel})
* [**YouTube Channel**]({youtube_url})
```

---

## 🚀 How to Deploy and Install
---

### 1. Build and Upload
Upload the latest build to the Reddit Developer Platform:
```bash
npx devvit upload
```

### 2. Install / Upgrade Subreddit
Select your target subreddit to install the app, or upgrade existing installations:
```bash
npx devvit install
```

### 3. Initialize the Bot
In your subreddit, click the **Mod Tools** menu and you will find two custom moderator actions:
* **"Reset Twitch Stream Bot"**: Resets Redis state, recreates the 2-minute status checker, and initializes the bot state.
* **"Get Default Bot Templates"**: Click this to immediately open a browser page with the copyable default templates for the settings inputs.

---

## 🔒 Fetch Domains
---

This app requires permissions for the following external API domains configured in `devvit.json`:
- `id.twitch.tv` — Authenticates the app using Twitch Client Credentials.
- `api.twitch.tv` — Periodically polls the stream status (Helix API).

---
*Created with ❤️ for the community.*
