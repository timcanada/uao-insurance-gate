# MailAdx × Ghost — official support recipe (26 August 2026)

Source: MailAdx support to `info@universalassetowners.com`, 26 Aug 2026 11:28 UTC, thread `UAO / Ghost — tags in, every unit no-fill (pub c1a281f3)`. Publisher id **`c1a281f3-6e78-4e49-89ff-853c2c360d05`**.

Do not invent a second recipe. Do not email support again until the wallet is funded and a single-recipient test has been run.

## 1. Ghost `eh=` (hashing)

MailAdx now hashes on arrival. Put the **raw email** in `eh=`. You do not need a Ghost SHA-256 merge tag.

```html
<img src="https://tag.mailadx.com/i?pub=c1a281f3-6e78-4e49-89ff-853c2c360d05&eh=%%{email}%%"
width="300" height="250" style="display:block;" alt="">
```

Ghost-specific rules from support:

- Use an **HTML card**, not an Email card. Email cards cannot hold raw HTML. Always use the long form with literal percent signs: `%%{email}%%`.
- Turn **off** all three Web visibility toggles (Public visitors, Free members, Paid members) on that card, or the unresolved placeholder ships as literal text on the public post.
- A pre-computed 64-char SHA-256 of a lowercase email still works if you ever build an intermediary.
- Plus-addressed test addresses (`you+mailadx@yourdomain.com`) are handled.

Run a **single-recipient test** before the next full-list send. It should fill or cleanly no-bid — not reject as `invalid emailhash`.

## 2. House / Direct-Sold fill requires a funded publisher wallet

Support’s sentence: Direct-Sold **and** House delivery both require a funded **publisher** wallet. The `$0.00 — ads paused` alert is why `daily-brief/top`, `mid-1`, `mid-2`, `footer` and the matching web placements return the 43-byte GIF89a no-fill.

Fund https://mailadx.com/app/wallet. Razorpay **$118** failed three times on 24 Aug 2026. That is the commercial blocker, not another support ticket.

## 3. Line-item API

`PATCH /dsp/line-items/{id}` is **not a route**. That is why it 500s. Use:

- **`PUT /dsp/line-items/{id}`** — full update / retarget
- **`PATCH /dsp/line-items/{id}/status`** — status only

Support said they will make a bad path return 404 instead of 500.

## 4. What this agent cannot do from this repo

The daily-brief HTML cards live in **Ghost**, not in `uao-insurance-gate`. Once the wallet is funded, a human (or this agent with `GHOST_ADMIN_API_KEY`) must paste the `%%{email}%%` recipe into the four newsletter HTML cards and confirm web visibility is off.
