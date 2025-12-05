# Railway CORS Configuration

## Setting up CORS for Netlify Frontend

To allow your Netlify frontend to access the Railway backend, you need to set the `ALLOWED_ORIGINS` environment variable in Railway.

### Steps:

1. Go to your Railway project dashboard
2. Select your backend service (`todo-backend`)
3. Go to the **Variables** tab
4. Add a new environment variable:
   - **Key**: `ALLOWED_ORIGINS`
   - **Value**: `https://fastidious-unicorn-4a9055.netlify.app,http://localhost:3000`
   - (Replace `fastidious-unicorn-4a9055.netlify.app` with your actual Netlify domain)

5. Also ensure these variables are set:
   - `NODE_ENV`: `production`
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `PORT`: `3001` (or Railway's assigned port)

6. Redeploy the service after adding the environment variable

### Multiple Origins

To allow multiple origins, separate them with commas:
```
https://your-app.netlify.app,https://your-custom-domain.com,http://localhost:3000
```

### Testing

After setting up CORS, test the API from your Netlify frontend. The CORS error should be resolved.

