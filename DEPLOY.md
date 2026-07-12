# Deploy Guide - Janor

## Overview

This guide walks you through deploying Janor so you and your partner can use it together with shared data.

**Stack:** Vercel (hosting) + Supabase (PostgreSQL database)
**Cost:** Free tier for both

---

## Step 1: Create Supabase Database (~5 min)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click **"New Project"**
3. Fill in:
   - **Project name:** `janor`
   - **Database password:** Choose a strong password (save it!)
   - **Region:** Choose closest to you (e.g., `West Europe` for Spain)
4. Wait ~2 minutes for the database to be created

### Get the Connection String

1. In your Supabase dashboard, go to **Settings** → **Database**
2. Under **Connection string**, select **URI** tab
3. Copy the **Transaction** connection string (port 6543) — this is the pooled connection, required for serverless
4. It looks like: `postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

### Run Migrations

On your local machine:

```bash
# Install Supabase CLI (optional, or use the SQL editor)
# Or just paste the schema manually:

# In Supabase dashboard → SQL Editor, paste the contents of:
# prisma/schema.prisma (converted to SQL)

# OR run locally with the connection string:
DATABASE_URL="your-supabase-connection-string" npx prisma db push

# Then seed the data:
DATABASE_URL="your-supabase-connection-string" npx prisma db seed
```

---

## Step 2: Push Code to GitHub (~2 min)

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Janor MVP"

# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/janor.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel (~3 min)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your `janor` repository
4. In **Environment Variables**, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Supabase pooled connection string |

5. Click **Deploy**
6. Wait ~2 minutes for the build

---

## Step 4: Share with Your Partner

1. Once deployed, Vercel gives you a URL like `janor.vercel.app`
2. Share this URL with your partner
3. Both of you will see and edit the same data

---

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard → **Settings** → **Domains**
2. Add your custom domain (e.g., `janor.app`)
3. Follow the DNS configuration instructions

---

## Local Development with Production DB

```bash
# Create .env.local
cp .env.example .env.local

# Edit .env.local with your Supabase connection string
nano .env.local

# Run locally
npm run dev
```

---

## Troubleshooting

### "Prisma Client not generated"
```bash
npx prisma generate
```

### "Connection refused" on Supabase
- Make sure you're using the **pooled** connection (port 6543), not direct (port 5432)
- Check that your IP is not blocked in Supabase → Settings → Network

### Build fails on Vercel
- Check the build logs in Vercel dashboard
- Make sure `DATABASE_URL` is set in Vercel environment variables
- The DB must be accessible from Vercel's build servers (Supabase allows all IPs by default)

### Data not syncing between devices
- Both devices must access the **same URL** (the Vercel deployment)
- Check that `DATABASE_URL` points to the same Supabase project

---

## Architecture After Deploy

```
┌─────────────┐     ┌─────────────┐
│  Your Phone │     │ Partner's   │
│  (Browser)  │     │ Phone       │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └────────┬──────────┘
                │
       ┌────────▼────────┐
       │     Vercel      │
       │  (Next.js App)  │
       └────────┬────────┘
                │
       ┌────────▼────────┐
       │    Supabase     │
       │  (PostgreSQL)   │
       └─────────────────┘
```

Both phones → same Vercel URL → same Supabase database → shared data.
