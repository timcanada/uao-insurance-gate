# Universal Asset Owners — mobile app

Native iOS and Android app for [universalassetowners.com](https://www.universalassetowners.com). Hard-core readers get the same daily intelligence as the website: morning brief, Probability Desk, research, charts, video, podcasts, YouTube live, and a popup when the daily brief drops.

## What it loads

The app talks to the public Ghost Content API that already powers the site, plus the same YouTube live probe the homepage uses.

| Desk / format | Source | Website equivalent |
| --- | --- | --- |
| The Universal Owner | Ghost `tag:hash-daily-brief` | Daily brief / Read |
| The Probability Desk | Ghost `tag:hash-probability-desk` | Afternoon scenario desk |
| UAO Research | Ghost `tag:hash-research` | Research library |
| Charts | Ghost `tag:hash-chart` | Chart of the Day |
| Watch | Ghost `tag:hash-video-briefing` | Watch |
| Listen | Ghost `tag:hash-podcast` | Apple / Spotify / Podbean |
| YouTube live | `https://uao-live-production.up.railway.app/` | Homepage live dock (ADR-0671) |
| Daily-brief popup | newest `hash-daily-brief` id | Email / site drop |
| People & themes | public tag slugs | People hub and theme pages |

When the Railway endpoint returns `{ "live": true, "videoId": "…" }` the app embeds the same player as the website:

`https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`

A gold **LIVE** badge replaces **STANDBY**, a docked player starts, and a “We are live on YouTube” card appears once per video id. Hide uses the same `uao-live-dismissed-v1` session key as the site.

The first daily brief the app sees is stored silently. The next new Ghost id pops **This morning’s brief is out** with a jump to the story.

Subscribe uses the same Ghost member portal as the website (`/#/portal/signup`). Command Center is the live site view.

To preview the brief popup without waiting for the next send, open the terminal with `?demo=brief`.

## See it in a browser

```bash
cd mobile
npm run preview
```

Then open `http://localhost:8080/app.html` (phone preview) or `http://localhost:8080/` (Expo web build). Both load the live Ghost desk.

## Run it

```bash
cd mobile
npm install
npm start          # Expo dev server — scan for iOS/Android
npm run ios
npm run android
npm run web
```

## App Store and Play Store

See [STORE.md](./STORE.md). Short version: Apple Developer ($99/yr) + Google Play Console ($25) + `eas build` / `eas submit` from this folder. Bundle id is already `com.universalassetowners.app`. In-app live play and brief popups work without store accounts. Lock-screen push when the phone is locked needs an Expo push worker after the first native build.

## Verify

```bash
npm test
npm run typecheck
npm run verify:live
```

`verify:live` hits the production Ghost API and asserts each desk still returns public posts from universalassetowners.com.
