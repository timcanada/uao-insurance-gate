# Universal Asset Owners — mobile app

Native iOS and Android app for [universalassetowners.com](https://www.universalassetowners.com). Hard-core readers get the same daily intelligence as the website: morning brief, Probability Desk, research, charts, video and podcasts.

## What it loads

The app talks to the public Ghost Content API that already powers the site.

| Desk / format | Ghost filter | Website equivalent |
| --- | --- | --- |
| The Universal Owner | `tag:hash-daily-brief` | Daily brief / Read |
| The Probability Desk | `tag:hash-probability-desk` | Afternoon scenario desk |
| UAO Research | `tag:hash-research` | Research library |
| Charts | `tag:hash-chart` | Chart of the Day |
| Watch | `tag:hash-video-briefing` | Watch |
| Listen | `tag:hash-podcast` | Apple / Spotify / Podbean |
| People & themes | public tag slugs | People hub and theme pages |

Subscribe uses the same Ghost member portal as the website (`/#/portal/signup`). Command Center is the live site view.

## Run it

```bash
cd mobile
npm install
npm start          # Expo dev server — scan for iOS/Android
npm run ios
npm run android
npm run web
```

## Verify

```bash
npm test
npm run verify:live
```

`verify:live` hits the production Ghost API and asserts each desk still returns public posts from universalassetowners.com.
