# How this app gets on phones and into the stores

You already have a working terminal in the browser. Native App Store / Play Store
builds are a separate publishing step — they need Apple and Google developer
accounts, not more product code.

## What is already wired in the app

1. **YouTube live, same as the website.** The site polls
   `https://uao-live-production.up.railway.app/`. When `live` is true the app
   embeds `youtube-nocookie.com/embed/{videoId}` with the same autoplay / mute /
   playsinline flags as ADR-0671. A gold **LIVE** badge appears in the masthead
   and a docked player starts at the bottom. A toast lets people jump to the
   player (or open YouTube if they dismissed the dock).
2. **Daily brief popup.** The app watches Ghost `tag:hash-daily-brief`. The first
   brief it sees is stored silently. The next new brief pops a **Daily brief just
   dropped** card with Open brief / Later.
3. **In-app alerts work without Apple/Google.** Anyone using the live preview or
   a PWA sees popups while the tab is open. Lock-screen push when the phone is
   locked needs the extra worker below.

## Path to the App Store and Play Store

1. **Apple Developer Program** — $99/year at https://developer.apple.com  
   Create the org (Universal Asset Owners), then an App ID with bundle
   `com.universalassetowners.app` (already in `app.json`).
2. **Google Play Console** — $25 one-time at https://play.google.com/console  
   Create the app listing. Package is the same bundle id.
3. **App Store Connect + Play listings**  
   Icon (1024²), screenshots on a real iPhone and Android, privacy policy URL
   (you already have one on the site), support URL, age rating, YouTube embed
   disclosure.
4. **EAS Build** (from `mobile/` after `npm i -g eas-cli` and `eas login`):

   ```bash
   eas build --platform ios --profile production
   eas build --platform android --profile production
   eas submit --platform ios
   eas submit --platform android
   ```

   Apple will ask for a distribution certificate and provisioning profile the
   first time. Google needs a Play upload key (EAS can generate it).
5. **Review.** Apple typically takes 1–3 business days. Call out that the app is
   a news reader that embeds your public Ghost feed and YouTube live player.
   Do not claim Bloomberg affiliation.

## Lock-screen push (optional, after the first store build)

In-app toasts already fire. True push needs:

1. Enable the `expo-notifications` plugin in `app.json`.
2. Collect Expo push tokens on launch (ask permission once).
3. A tiny worker (Railway, next to `uao-live-production`) that:
   - polls the same live endpoint every 30–60s
   - polls Ghost `tag:hash-daily-brief` every few minutes
   - sends `https://exp.host/--/api/v2/push/send` when `live` flips true or a
     new brief id appears
4. Apple APNs key + Google FCM in the Expo dashboard.

Until that worker exists, people who leave the app will not get a lock-screen
banner. People who have the terminal open will.

## Internal testers before the public store

- iOS: TestFlight via `eas submit` (up to 10,000 testers).
- Android: Play internal testing track (`eas.json` already points there).
- Anyone else: the public terminal URL (Cloudflare tunnel or a page on
  universalassetowners.com).
