# Mesut Is Live - Reddit Bot

A Reddit Devvit bot that automatically monitors a specified Twitch channel and creates a pinned (sticky) post on the subreddit when the stream goes live. When the stream goes offline, the bot automatically unpins and removes the post.

## Fetch Domains
The following domains are requested for this app:
- `id.twitch.tv` - Used to fetch an OAuth token via client credentials to authenticate with the Twitch API.
- `api.twitch.tv` - Used to periodically query the Twitch Helix API to check the stream status (live/offline) and retrieve stream metadata like the title.

Both domains are publicly documented APIs from Twitch and are strictly required to verify the user's stream status. No user data is sent or stored.
