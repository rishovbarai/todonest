# Railway Deployment Troubleshooting

## Current Issue: 502 Bad Gateway

The API is returning 502 errors, which means the application isn't starting properly on Railway.

## Possible Causes & Solutions

### 1. Application Not Started Yet
- **Check**: Railway dashboard → Deployments → Check latest deployment status
- **Wait**: First deployment can take 5-10 minutes
- **Solution**: Wait for deployment to complete

### 2. Environment Variables Missing
- **Check**: Railway dashboard → Variables tab
- **Required Variables**:
  ```
  SUPABASE_URL=https://aguclrbhipjpeudzwjdr.supabase.co
  SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndWNscmJoaXBqcGV1ZHp3amRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU3OTEsImV4cCI6MjA4MDUxMTc5MX0.8VmP3IDXYOWVWvwUrc4eh5mtqEmX8WHu9AFf__9FJYA
  NODE_ENV=production
  ```
- **Solution**: Add missing variables in Railway dashboard

### 3. Check Railway Logs
- **Go to**: Railway dashboard → Your service → Logs
- **Look for**: Error messages, stack traces, connection failures
- **Common errors**:
  - Supabase connection errors
  - Missing environment variables
  - Port binding issues
  - Build failures

### 4. Verify Build Success
- **Check**: Railway dashboard → Deployments → Latest deployment
- **Look for**: Build logs showing successful compilation
- **Should see**: "Build succeeded" or similar

### 5. Verify Start Command
- **Check**: Railway dashboard → Settings → Start Command
- **Should be**: `npm run start:prod`
- **Verify**: `package.json` has `start:prod` script

### 6. Supabase Table Not Created
- **Check**: Supabase dashboard → Table Editor
- **Verify**: `todos` table exists
- **If missing**: Run SQL from `supabase-schema.sql` in Supabase SQL Editor

## Quick Diagnostic Steps

1. **Check Railway Logs**:
   ```
   Railway Dashboard → Service → Logs
   ```

2. **Verify Environment Variables**:
   ```
   Railway Dashboard → Service → Variables
   ```

3. **Check Deployment Status**:
   ```
   Railway Dashboard → Service → Deployments
   ```

4. **Test Supabase Connection**:
   - Go to Supabase dashboard
   - Check if project is active
   - Verify API key is correct

5. **Redeploy**:
   - Railway Dashboard → Service → Settings → Redeploy
   - Or push a new commit to trigger redeploy

## Testing Locally First

Before troubleshooting Railway, test locally:

```bash
cd backend
npm run build
npm run start:prod
```

Then test:
```bash
curl http://localhost:3001/api/todos
```

If local works but Railway doesn't, it's likely an environment or configuration issue.

## Common Fixes

### Fix 1: Add Missing Environment Variables
Railway dashboard → Variables → Add:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `NODE_ENV=production`

### Fix 2: Verify Port Configuration
Railway automatically sets PORT, but verify:
- Railway dashboard → Settings → Check PORT is set
- Or add `PORT=3001` to variables

### Fix 3: Check Build Output
- Railway dashboard → Deployments → Click latest → View logs
- Look for build errors or warnings

### Fix 4: Verify Root Directory
If deploying from monorepo:
- Railway dashboard → Settings → Root Directory
- Set to: `backend` (if code is in backend folder)

## Next Steps

1. Check Railway logs for specific error messages
2. Verify all environment variables are set
3. Ensure Supabase table exists
4. Wait for deployment to complete (can take 5-10 minutes)
5. Try redeploying if issues persist

