# How this app gets on phones and into the stores

Images, listing copy, and the App ID bundle are ready. Submit waits on two logins
Tim already said he can find: Apple Developer and a free Expo account.

## Ready in this repo

| Asset | Where |
| --- | --- |
| App icon 1024×1024 (navy / gold UAO) | `mobile/assets/images/icon.png` |
| Android adaptive / splash / favicon | `mobile/assets/images/` |
| Play feature graphic 1024×500 | `mobile/store/android/feature-graphic-1024x500.png` |
| App Store screenshots (6.7", 6.5", iPad 13") | `mobile/store/ios/` |
| Play screenshots | `mobile/store/android/` |
| Listing copy, keywords, review notes | `mobile/store/listing.md` |
| Bundle id | `com.universalassetowners.app` in `app.json` |

Privacy policy already on the site: https://www.universalassetowners.com/privacy-policy/

## What is already wired in the app

1. **YouTube live, same as the website.** Polls `https://uao-live-production.up.railway.app/`. When `live` is true the app embeds the same `youtube-nocookie` player as the homepage.
2. **Daily brief popup.** Watches Ghost `tag:hash-daily-brief`. A new id pops **This morning’s brief is out**.
3. **In-app alerts work without store accounts.** Lock-screen push is a later worker.

## Logins to bring when we submit (do not paste passwords here)

Apple’s 2FA will fail if a password is pasted into this chat. Bring these instead:

1. **Apple Developer Program** (you have this) — the email on the team, plus the **Team ID** (10 characters, top-right on https://developer.apple.com/account).
2. **App Store Connect API key** — https://appstoreconnect.apple.com/access/integrations/api
   - Role: **App Manager**
   - Download the `.p8` once
   - Note **Issuer ID** and **Key ID**
   - That key *is* the App ID / upload login. EAS uses it to create `com.universalassetowners.app` and submit.
3. **Expo account** — free at https://expo.dev/signup (any email). After you are in, run `eas login` on your Mac, or create an access token at https://expo.dev/accounts/[you]/settings/access-tokens and we use `EXPO_TOKEN`.
4. **Google Play** (optional, second) — Play Console invite. Can wait.

## Commands we run once those are in (from `mobile/`)

```bash
npx eas-cli init
npx eas-cli build --platform ios --profile production
npx eas-cli submit --platform ios --profile production
```

The first iOS build creates the App ID `com.universalassetowners.app` on your Apple team, the distribution certificate, and the provisioning profile. Then we upload screenshots and paste `store/listing.md` into App Store Connect (or do it in the same session).

Android is the same pair of commands with `--platform android` after Play Console exists.

## Review

Tell Apple it is a news reader for universalassetowners.com, public Ghost feed, YouTube embed when live. No Bloomberg affiliation. Contact `info@universalassetowners.com`.
