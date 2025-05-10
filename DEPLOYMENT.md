# Deployment Guide for Restaurant Management Dashboard

This guide will help you deploy your Restaurant Management Dashboard to GitHub and Vercel.

## GitHub Deployment

### 1. Initialize Git (if not already done)
```bash
git init
```

### 2. Add all files to git
```bash
git add .
```

### 3. Commit the changes
```bash
git commit -m "Initial commit with Restaurant Management Dashboard"
```

### 4. Create a new repository on GitHub
- Go to [GitHub](https://github.com)
- Click on the "+" icon in the top right corner and select "New repository"
- Name your repository (e.g., "restaurant-management-dashboard")
- Keep it private or public as needed
- Click "Create repository"

### 5. Connect your local repository to GitHub
```bash
git remote add origin https://github.com/yourusername/restaurant-management-dashboard.git
```

### 6. Push to GitHub
```bash
git push -u origin main
```

## Vercel Deployment

### 1. Create a Vercel Account
- Go to [Vercel](https://vercel.com)
- Sign up or login with your GitHub account

### 2. Import your GitHub Repository
- Click "Add New..." → "Project"
- Select your "restaurant-management-dashboard" repository
- Vercel will automatically detect it as a Next.js project

### 3. Configure Environment Variables
- Add the following environment variables:
  - `NEXTAUTH_SECRET`: A random string for NextAuth.js (keep it secure)
  - `NEXTAUTH_URL`: The URL of your deployed app (e.g., https://your-app.vercel.app)

### 4. Deploy
- Click "Deploy"
- Vercel will build and deploy your application

### 5. Update vercel.json
After deployment, update the `vercel.json` file with your actual app URL:
```json
{
  "env": {
    "NEXTAUTH_URL": "https://your-actual-url.vercel.app"
  }
}
```

## Continuous Deployment

Once set up, any changes pushed to your GitHub repository will automatically trigger a new deployment on Vercel.

## Troubleshooting

### Logo Not Displaying
- Make sure `public/logo.png` exists and is properly referenced
- Check the domains list in `next.config.js` includes all image sources

### Authentication Issues
- Verify your `.env.local` and Vercel environment variables are set correctly
- Make sure `NEXTAUTH_URL` matches your deployment URL
- Check for any middleware errors in the Vercel logs 