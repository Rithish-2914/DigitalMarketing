# Deployment Guide for Vercel

## Overview
This app is ready to deploy on Vercel with a Node.js backend and React frontend.

## Prerequisites
- Vercel account (free)
- PostgreSQL database (Supabase, Neon, Railway, or other provider)
- Environment variables configured

## Setup for Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the root directory (or leave default)
5. Framework: Vite
6. Build Command: `npm run build`
7. Output Directory: `dist`

### Step 3: Set Environment Variables
In Vercel Project Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret-key-here
VITE_API_BASE_URL=https://your-vercel-domain.vercel.app
```

### Step 4: Database Setup

#### Option A: Using Supabase (Recommended)
1. Create Supabase project
2. Get CONNECTION STRING from Settings → Database
3. Add to `DATABASE_URL` in Vercel
4. Tables auto-create on first deployment

#### Option B: Using Neon
1. Create Neon account
2. Get connection string
3. Add to `DATABASE_URL`

#### Option C: Using Railway
1. Create Railway account
2. Deploy PostgreSQL
3. Get database URL
4. Add to `DATABASE_URL`

### Step 5: Deploy
Push to GitHub and Vercel auto-deploys. Or click "Deploy" in Vercel dashboard.

## Monitoring Deployments
- Check Vercel dashboard for build logs
- View deployment URLs
- Check error logs in Vercel Functions

## Troubleshooting

### Database Connection Fails
- Verify `DATABASE_URL` format
- Check IP whitelisting if required
- Ensure network access is allowed

### API Routes Return 404
- Confirm build succeeds (check Vercel logs)
- Verify `VITE_API_BASE_URL` matches domain
- Check if routes are in `server/routes.ts`

### Session Issues
- Set `SESSION_SECRET` to secure random string
- Ensure PostgreSQL sessions table exists
- Check database connection stability

## Cost Notes
- **Vercel**: Free tier includes generous serverless function limits
- **PostgreSQL**: Free tier options available (Supabase: 500MB, Neon: 3 projects)
- **Total**: Can run entirely on free tier

## Local Testing Before Deploy
```bash
# Set up .env file
cp .env.example .env

# Install dependencies
npm install

# Run database migrations
npm run db:push

# Start dev server
npm run dev

# Visit http://localhost:5000
```

## Production Checklist
- [ ] Database URL configured in Vercel
- [ ] SESSION_SECRET set to strong random value
- [ ] API base URL configured (VITE_API_BASE_URL)
- [ ] Database tables created (auto on first deploy)
- [ ] GitHub repo connected to Vercel
- [ ] Build succeeds in Vercel
- [ ] Test API endpoints after deploy
- [ ] Check browser console for errors
