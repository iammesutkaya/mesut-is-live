# 🛠️ Stream Status Notifier: Development Guide

This guide is for developers building, uploading, or modifying the "Mesut is Live" (Stream Status Notifier) bot on the Reddit Developer Platform (Devvit).

---

## 🚀 How to Deploy and Install

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

This app requires permissions for the following external API domains configured in `devvit.json`:
* `id.twitch.tv` — Authenticates the app using Twitch Client Credentials.
* `api.twitch.tv` — Periodically polls the stream status (Helix API) and fetches clips for the highlights post.
