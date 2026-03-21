# Quick Start Guide - Portfolio Blog

## 🎯 5-Minute Setup

### Step 1: Create GitHub Repository
```bash
# Create a new public repo on GitHub named: blog-connect
# Add one file: posts.json with content: []
```

### Step 2: Generate GitHub Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Portfolio"
4. Select scope: `repo`
5. Copy token (save it!)

### Step 3: Deploy to Netlify
1. Go to: https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub → Select this repo
4. Deploy (leave build settings default)

### Step 4: Add GitHub Connection
1. In Netlify dashboard, go to **Site settings**
2. Navigate to **Build & Deploy** → **Environment**
3. Click "Edit variables"
4. Add:
   - Key: `GITHUB_TOKEN` → Value: your token from Step 2
   - Key: `GITHUB_REPO` → Value: `your-username/blog-connect`
5. Click "Save" and redeploy

### Step 5: Test It
- Visit: `https://your-site.netlify.app/admin.html`
- Login with: `robo123`
- Create a test post
- Check: `https://your-site.netlify.app/blog.html`

## ✅ Checklist
- [ ] GitHub account and token created
- [ ] `blog-connect` repository created (public)
- [ ] Site deployed on Netlify
- [ ] Environment variables set in Netlify
- [ ] Site redeployed after adding variables
- [ ] Admin panel accessible and working
- [ ] Test post created successfully
- [ ] Post appears on blog page

## 🚨 Common Issues

### Blog shows "No posts yet"
- Wait 2-3 minutes after redeployment
- Clear browser cache (Ctrl+Shift+Delete)
- Check console (F12) for errors

### Can't login to admin
- Correct password is: `robo123`
- Try in incognito/private mode
- Clear localStorage in DevTools

### Images won't upload
- File must be less than 5MB
- Check environment variables in Netlify
- Check network tab in DevTools for errors

### GitHub error messages
- Verify GITHUB_TOKEN is correct (not expired)
- Verify GITHUB_REPO format: `username/repo-name`
- Ensure blog repository is **public**

## 🔒 Security
- Change password in `admin.html` BEFORE going live
- Never share your GITHUB_TOKEN
- Keep token safe in Netlify env only

## 📚 Full Guide
See `DEPLOYMENT.md` for complete documentation
