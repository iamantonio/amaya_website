# NFC Player Card Guide

How to create the physical tap-to-open cards for Amaya's profile (`https://amayavargas.com`).
Companion to `card-print.html` (the printable card design) and the idea doc's validation plan.

## What to buy

| Item | Spec | Why | ~Cost |
|---|---|---|---|
| NFC cards | **NTAG215** (or NTAG216), white PVC, CR80 size, 504+ bytes | NTAG21x is read natively by all modern iPhones (iPhone XS and later read in the background — no app) and Android phones. 504 bytes is far more than a URL needs. | $10–15 for 10 on Amazon |
| Alternative: NFC stickers | NTAG215 25mm round stickers | Can be stuck to the back of professionally printed cards | $8–12 for 20 |
| Writing app | **NFC Tools** (free, iOS + Android) | De-facto standard for writing NDEF records | Free |

Avoid: MIFARE Classic cards (iPhones can't read them without an app) and "RFID" 125kHz cards (phones can't read them at all — the idea doc's note that this is **NFC, not standard RFID** is exactly right).

## Making the cards look like player cards (blank white PVC + stickers)

The Amazon NTAG215 cards (85.5 × 54 mm) arrive blank white. The DIY route that looks professional:

1. Buy **full-sheet adhesive label paper** (e.g., Avery 8165 white full-sheet labels, or printable glossy sticker paper).
2. Print `assets/card/print-ready/sticker-sheet-letter.png` at **100% scale** (no "fit to page") — each sheet has 3 fronts + 3 backs, sized 84.5 × 53.2 mm (a hair inside the card edge so nothing overhangs or peels).
3. Cut **just inside the gray guide**; round the corners with scissors or a corner punch (the guide shows the radius).
4. Stick the front label on the side of the card *without* affecting the chip (either side is fine — the antenna is internal), smooth from center outward.
5. Optional but recommended: a strip of clear packing tape or self-adhesive laminate over each face makes them rain/pocket-proof.
6. THEN program and lock (below) — program before or after stickering, but always **verify a tap through the sticker** before locking.

## Writing the URL to a card

1. Install **NFC Tools** on any phone.
2. Open **Write** → **Add a record** → **URL/URI**.
3. Enter exactly: `https://amayavargas.com` (full URL with `https://` — this becomes a standard NDEF URI record, which is what iOS background reading requires).
4. Tap **Write / 47 bytes** and hold the card flat against the back of the phone until it confirms.
5. Verify: lock the phone, wake the screen, hold the card to the phone — a notification banner should appear; tapping it opens the site.
6. **Lock the tag** (NFC Tools → Other → Lock tag) *after* verifying. This makes the card read-only so nobody can rewrite your cards to point elsewhere. ⚠️ Locking is permanent.

Repeat for 3–5 cards per the validation plan.

## Test checklist (do this before the tryout)

- [ ] iPhone (recent): wake screen, hold card near the **top** of the phone → banner appears → opens site
- [ ] Android: unlock phone, hold card near the **middle/back** → opens site (Android NFC requires the screen to be on and unlocked)
- [ ] QR code on printed card scans with iPhone Camera app
- [ ] QR code scans with Android camera
- [ ] Site loads fast on cellular (not just Wi-Fi) — this is how coaches will see it
- [ ] Highlight reel plays from the hero "Watch Highlights" button on a phone

## Tap etiquette notes (from the research pass)

- Not every tap works on the first try (phone model, case thickness, screen state, user unfamiliarity). **The QR code on the card back is the fallback** — between the two, anyone with a smartphone can open the profile.
- The printed URL is the fallback's fallback — someone can just type it.
- Hand the card over like a business card; "tap it or scan it" is all the explanation needed. Avoid gimmick language — it's a player credential, not a gadget.

## Validation signals to track at the tryout (from the idea doc)

- Did coaches/staff actually tap or scan it?
- Did they understand it instantly?
- Did they comment on professionalism or usefulness?
- Did they revisit the page later? (server access logs at `/var/log/caddy/amayavargas.access.log` on the VPS, or form submissions, are the signal for v1)
- Did other parents ask about it? → ask 3–5 if they'd want one for their kid
- Ask 1–2 coaches what info was useful vs. unnecessary
