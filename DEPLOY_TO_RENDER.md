# Deploy Backend to Render - Step by Step

Your GitHub repository is ready: https://github.com/rishovbarai/todonest.git

## Step 1: Push Code to GitHub

You need to authenticate with GitHub first. Choose one method:

### Option A: Using GitHub CLI (Easiest)

```bash
cd backend
gh auth login
git push -u origin main
```

### Option B: Using Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use token as password when pushing:

```bash
cd backend
git push -u origin main
# Username: rishovbarai
# Password: <paste-your-token>
```

### Option C: Using SSH (Recommended for future)

```bash
cd backend
git remote set-url origin git@github.com:rishovbarai/todonest.git
git push -u origin main
```

## Step 2: Deploy to Render

Once code is pushed to GitHub:

1. **Go to Render Dashboard**
   - Visit https://render.com
   - Sign up or log in

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"

3. **Connect Repository**
   - Click "Connect account" if not already connected
   - Authorize Render to access GitHub
   - Select repository: `rishovbarai/todonest`

4. **Configure Service**
   - **Name**: `todo-backend` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `backend` if deploying from root)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build` (auto-detected from render.yaml)
   - **Start Command**: `npm run start:prod` (auto-detected from render.yaml)

5. **Set Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   SUPABASE_URL=https://aguclrbhipjpeudzwjdr.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndWNscmJoaXBqcGV1ZHp3amRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU3OTEsImV4cCI6MjA4MDUxMTc5MX0.8VmP3IDXYOWVWvwUrc4eh5mtqEmX8WHu9AFf__9FJYA
   NODE_ENV=production
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deployment
   - Render will show build logs in real-time

## Step 3: Get Your Backend URL

After successful deployment, Render will provide a URL like:
```
https://todo-backend.onrender.com
```

Your API endpoints will be at:
```
https://todo-backend.onrender.com/api/todos
```

## Step 4: Update Frontend

Update your frontend's environment variable in Netlify:
- Go to Netlify → Site settings → Environment variables
- Add/Update: `API_BASE_URL` = `https://todo-backend.onrender.com/api`

## Troubleshooting

### If push fails:
- Make sure you're authenticated with GitHub
- Check that the repository exists and you have write access
- Try using SSH instead of HTTPS

### If Render deployment fails:
- Check build logs in Render dashboard
- Verify all dependencies are in `package.json`
- Ensure environment variables are set correctly
- Check that `render.yaml` is in the repository root

### If API doesn't work:
- Verify Supabase table is created (run SQL from `supabase-schema.sql`)
- Check CORS settings in `src/main.ts`
- Verify environment variables in Render dashboard

## Quick Commands

```bash
# Push updates to GitHub
cd backend
git add .
git commit -m "Your commit message"
git push

# Render will automatically redeploy on push! 🚀
```

