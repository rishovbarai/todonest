# Quick Deploy Guide - Render (Minimal Git Setup)

Since Render requires Git, here's the **fastest way** to deploy:

## Quick Steps (5 minutes)

### 1. Initialize Git (30 seconds)

```bash
cd backend
git init
git add .
git commit -m "Deploy to Render"
```

### 2. Create GitHub Repo (1 minute)

1. Go to https://github.com/new
2. Name: `todo-backend-render`
3. Choose **Private**
4. **Don't** check any boxes (no README, no .gitignore)
5. Click "Create repository"

### 3. Push Code (30 seconds)

```bash
git remote add origin https://github.com/YOUR_USERNAME/todo-backend-render.git
git branch -M main
git push -u origin main
```

### 4. Deploy on Render (2 minutes)

1. Go to https://render.com
2. Sign up/login
3. Click "New +" → "Web Service"
4. Connect GitHub → Select `todo-backend-render`
5. Render auto-detects settings ✅
6. Add environment variables:
   - `SUPABASE_URL` = `https://aguclrbhipjpeudzwjdr.supabase.co`
   - `SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndWNscmJoaXBqcGV1ZHp3amRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU3OTEsImV4cCI6MjA4MDUxMTc5MX0.8VmP3IDXYOWVWvwUrc4eh5mtqEmX8WHu9AFf__9FJYA`
   - `NODE_ENV` = `production`
7. Click "Create Web Service"
8. Wait 5-10 minutes for deployment ✅

### 5. Get Your Backend URL

After deployment, Render gives you a URL like:
`https://todo-backend.onrender.com`

Your API will be at: `https://todo-backend.onrender.com/api`

## That's it! 🎉

Your backend is now live. Update your frontend's `API_BASE_URL` to point to your Render URL.

## Future Updates

To update your backend:
```bash
cd backend
git add .
git commit -m "Update backend"
git push
```

Render will automatically redeploy! 🚀

