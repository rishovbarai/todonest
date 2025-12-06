# Deployment Checklist for Render

## Pre-Deployment Checklist

- [x] Backend code is pushed to GitHub
- [x] `render.yaml` is configured correctly
- [x] CORS is configured for production
- [x] Environment variables are documented
- [x] Test script is created (`test-render-api.sh`)

## Render Dashboard Configuration

### 1. Create Web Service
- [ ] Go to https://dashboard.render.com
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository: `rishovbarai/todonest`
- [ ] Select branch: `main`
- [ ] Root Directory: `backend` (if backend is in subdirectory)

### 2. Build & Start Commands
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm run start:prod`

### 3. Environment Variables
Set these in Render dashboard:

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `10000` (Render sets this automatically, but good to have)
- [ ] `SUPABASE_URL` = `https://aguclrbhipjpeudzwjdr.supabase.co`
- [ ] `SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndWNscmJoaXBqcGV1ZHp3amRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU3OTEsImV4cCI6MjA4MDUxMTc5MX0.8VmP3IDXYOWVWvwUrc4eh5mtqEmX8WHu9AFf__9FJYA`
- [ ] `ALLOWED_ORIGINS` = Your frontend URLs (comma-separated, e.g., `https://your-frontend.netlify.app`)

### 4. Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check build logs for errors

## Post-Deployment Testing

After deployment, test the API:

```bash
# Run the test script
cd backend
./test-render-api.sh

# Or test manually:
curl https://todonest-uzhd.onrender.com/api/todos
```

### Expected Results
- [ ] GET /api/todos returns 200 OK
- [ ] POST /api/todos creates a new todo
- [ ] PATCH /api/todos/:id updates a todo
- [ ] DELETE /api/todos/:id deletes a todo
- [ ] POST /api/todos/reorder reorders todos

## Frontend Configuration

After backend is deployed:

- [x] Update `nuxt.config.ts` with Render URL
- [ ] Deploy frontend to Netlify
- [ ] Add frontend URL to `ALLOWED_ORIGINS` in Render

## Troubleshooting

### Build Fails
- Check Node version (should be 18+)
- Verify all dependencies in `package.json`
- Check build logs in Render dashboard

### Service Won't Start
- Verify `PORT` environment variable
- Check start logs in Render dashboard
- Ensure `start:prod` script exists

### CORS Errors
- Add frontend URL to `ALLOWED_ORIGINS`
- Check CORS configuration in `src/main.ts`
- Verify environment variables are set correctly

### Database Connection Issues
- Verify Supabase credentials
- Check Supabase project is active
- Ensure RLS policies allow access

## Service URL

Your API will be available at:
- **Base URL**: `https://todonest-uzhd.onrender.com`
- **API Endpoint**: `https://todonest-uzhd.onrender.com/api`

## Notes

- Render free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading for production use

