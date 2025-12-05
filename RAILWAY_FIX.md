# Railway Deployment Fix

## Current Status
✅ Backend deployed to: `https://todo-backend-production-8ea7.up.railway.app`
⚠️ Getting 502 error - needs configuration fix

## Fixes Applied

1. **Updated `src/main.ts`** to listen on `0.0.0.0` instead of `localhost`
   - Railway requires binding to `0.0.0.0` to accept external connections

## Railway Configuration Checklist

### 1. Environment Variables
In Railway dashboard → Your service → Variables, ensure these are set:

```
SUPABASE_URL=https://aguclrbhipjpeudzwjdr.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndWNscmJoaXBqcGV1ZHp3amRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU3OTEsImV4cCI6MjA4MDUxMTc5MX0.8VmP3IDXYOWVWvwUrc4eh5mtqEmX8WHu9AFf__9FJYA
NODE_ENV=production
PORT=3001
```

**Note**: Railway automatically sets PORT, but you can set it explicitly.

### 2. Build & Start Commands
Railway should auto-detect from `package.json`, but verify:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`

### 3. Root Directory
If deploying from monorepo root:
- Set **Root Directory** to `backend`

### 4. Redeploy After Fix

After updating `src/main.ts`, push to GitHub:

```bash
cd backend
git add src/main.ts
git commit -m "Fix Railway deployment - bind to 0.0.0.0"
git push
```

Railway will automatically redeploy!

## Verify Deployment

After redeploy, test:
```bash
curl https://todo-backend-production-8ea7.up.railway.app/api/todos
```

Should return: `[]` (empty array) or your todos.

## Common Issues

### 502 Bad Gateway
- ✅ Fixed: Updated to listen on `0.0.0.0`
- Check Railway logs for errors
- Verify environment variables are set
- Ensure Supabase table exists

### Connection Timeout
- Railway free tier spins down after inactivity
- First request may take 30-60 seconds
- Consider upgrading for always-on service

### CORS Errors
- Add your frontend URL to `ALLOWED_ORIGINS` in Railway variables
- Format: `https://your-app.netlify.app,http://localhost:3000`

## Next Steps

1. Push the fix to GitHub
2. Wait for Railway to redeploy (2-5 minutes)
3. Test the API endpoint
4. Update frontend to use Railway URL
5. Deploy frontend to Netlify

