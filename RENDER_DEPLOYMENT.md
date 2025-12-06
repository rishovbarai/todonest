# Render Deployment Guide

This guide explains how to deploy the Todo backend to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. A GitHub repository with the backend code
3. Supabase credentials (URL and ANON KEY)

## Deployment Steps

### 1. Push Code to GitHub

Make sure your backend code is pushed to GitHub:

```bash
cd backend
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create a New Web Service on Render

1. Go to https://dashboard.render.com
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select the repository containing the backend code

### 3. Configure the Service

**Service Settings:**
- **Name**: `todo-backend` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend` (if backend is in a subdirectory)
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`

### 4. Set Environment Variables

In the Render dashboard, go to "Environment" and add:

- `NODE_ENV` = `production`
- `PORT` = `10000` (Render automatically sets this, but good to have)
- `SUPABASE_URL` = Your Supabase project URL
- `SUPABASE_ANON_KEY` = Your Supabase anonymous key
- `ALLOWED_ORIGINS` = Comma-separated list of frontend URLs (e.g., `https://your-frontend.netlify.app,https://your-frontend.vercel.app`)

### 5. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Wait for the deployment to complete (usually 2-5 minutes)

### 6. Get Your Service URL

After deployment, Render will provide a URL like:
`https://todonest-uzhd.onrender.com`

Your API endpoints will be available at:
`https://todonest-uzhd.onrender.com/api/todos`

### 7. Test the Deployment

Test your API endpoints:

```bash
# Get all todos
curl https://todonest-uzhd.onrender.com/api/todos

# Create a todo
curl -X POST https://todonest-uzhd.onrender.com/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task","order":0}'

# Update a todo
curl -X PATCH https://todonest-uzhd.onrender.com/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a todo
curl -X DELETE https://todonest-uzhd.onrender.com/api/todos/1
```

## Using render.yaml (Alternative Method)

If you prefer using `render.yaml`:

1. Make sure `render.yaml` is in your repository root (or backend directory)
2. In Render dashboard, select "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and use `render.yaml`

## Troubleshooting

### Build Fails

- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### Service Won't Start

- Check start logs in Render dashboard
- Verify `PORT` environment variable
- Ensure `start:prod` script exists in `package.json`

### CORS Errors

- Add your frontend URL to `ALLOWED_ORIGINS` environment variable
- Check CORS configuration in `src/main.ts`

### Database Connection Issues

- Verify Supabase credentials are correct
- Check Supabase project is active
- Ensure Row Level Security policies allow access

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (production) | Yes |
| `PORT` | Server port (usually 10000 on Render) | Yes |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `ALLOWED_ORIGINS` | Comma-separated frontend URLs | Optional |

## Updating the Deployment

After making changes:

1. Commit and push to GitHub
2. Render will automatically detect changes and redeploy
3. Monitor the deployment logs in the dashboard

## Free Tier Limitations

Render's free tier:
- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading for production use

