# Tot Tracker

Family app for logging a toddler's sleep, food, milk and diapers. Next.js (hosted on Vercel) + Supabase (login and database). Both free tiers are enough.

Each family member signs in with their own account. Every entry shows who logged it ("by Mum", "edited by Grandpa"), and changes appear on everyone's phone live.

## Features
- **Today**: big Sleep / Food / Diaper tiles. One tap for "Fell asleep" / "Woke up" (live timer) and Wet / Poo / Wet + poo. Every quick log shows an **Undo** bar; poo logs offer "Add details". Double taps are ignored.
- **Easy time entry**: Now / 15 min ago / 30 min ago / 1 hr ago buttons; a date-time picker only when "Other time" is chosen.
- **Food**: tap tiles for foods (most-eaten first), add a detail per food (e.g. egg white only), how much was eaten, add new foods.
- **Milk**: "Milk" button on the Food tile. Packet milk, formula, fresh milk or other, with the amount in ml (−/+ buttons and 90 to 250 ml presets). It remembers the last type and amount. Milk can also be added to a meal. The Food tile shows today's total against a guide of about 500 ml a day.
- **Poo details**: texture buttons and real colour swatches, with a gentle flag for red, black or white.
- **History**: week strip with dots on days that have entries, daily totals and timeline. Tap any entry to edit; delete has a confirm step and Undo.
- **Trends**: last 7 days of sleep hours, meals, milk (ml) and poos.
- **Tips**: age-based development and parenting tips, milestones to look for, a birthday countdown and a tip of the day on the Today screen. Uses the birth date under Family. Sources: CDC, WHO, MOH Singapore, HealthHub.
- **Family**: English / 中文 and Normal / Large text (per phone), names, child details, password.
- Every entry shows who logged or edited it; other phones update live.

## Setup (about 15 minutes)

### 1. Supabase
1. Create a project at supabase.com (pick the Singapore region).
2. **SQL Editor** → New query → paste `supabase/schema.sql` → Run.
3. **Authentication → Sign In / Providers**: turn **off** "Allow new users to sign up". This is what keeps the app private: any signed-in user can see all data.
4. **Authentication → Users → Add user → Create new user** for each family member (email + password, tick "Auto confirm"). They can set their name (and English or 中文) under the Family tab after first sign-in.
5. **Authentication → URL Configuration**: set Site URL to your Vercel URL (after step 2), so password-reset emails link back correctly.
6. **Project Settings → API**: copy the Project URL and the `anon` public key.

### 2. Vercel
1. Push this folder to a GitHub repo (private is fine).
2. On vercel.com: Add New → Project → import the repo.
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. On first sign-in you'll be asked for your child's name.

### 3. On each phone
Open the site in Safari → Share → **Add to Home Screen**. It opens full-screen like an app.

## Run locally
```
cp .env.example .env.local   # fill in the two values
npm install
npm run dev
```

## Notes
- Updating an existing setup: milk and tips need no database change. Upload the changed files to GitHub and Vercel redeploys automatically.
- Times use each phone's local time zone.
- The `anon` key is safe to expose in the browser; access is controlled by Row Level Security plus disabled sign-ups.
- Free Supabase projects pause after 7 days with no activity. Daily logging keeps it awake; if paused, restore it from the dashboard (data is kept).
- Not migrated: your old app's history. If it can export CSV, the data can be imported into the `entries` table.
