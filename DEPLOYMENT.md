# Portfolio-Web - Deployment Guide

## 🚀 Overview
This is a modern portfolio website with an integrated blog feature that syncs with GitHub. The blog automatically saves posts and images to GitHub, with a local fallback if GitHub is unavailable.

## ✨ Features
- **Responsive Portfolio**: Dark-themed personal portfolio website
- **Blog System**: Create, edit, and publish blog posts
- **GitHub Integration**: Automatic backup of blog posts to GitHub  
- **Image Hosting**: Images are uploaded and stored on GitHub
- **Admin Panel**: Password-protected blog management dashboard
- **Mobile Friendly**: Fully responsive design

## 📁 Project Structure
```
portfolioredesinged/
├── index.html              # Main portfolio page
├── blog.html               # Blog listing page
├── admin.html              # Blog admin dashboard
├── style.css               # Global styles
├── script.js               # Main JavaScript
├── netlify.toml            # Netlify deployment config
├── netlify/functions/
│   ├── update-posts.js     # Saves posts to GitHub
│   └── upload-image.js     # Uploads images to GitHub
└── README.md               # This file
```

## 🔧 Setup Instructions

### 1. Create GitHub Repository for Blog Data
1. Go to GitHub and create a new public repository named `blog-connect`
2. Create an empty `posts.json` file in the repo with: `[]`
3. Make sure the repository is public so images can be fetched

### 2. Generate GitHub Personal Access Token
1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio Blog"
4. Select these scopes:
   - `repo` (Full control of private repositories)
5. Copy the token and save it somewhere safe (you'll only see it once)

### 3. Deploy to Netlify

#### Option A: Using Git (Recommended)
1. Push this repo to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git" → Connect GitHub → Select your repo
4. Build settings:
   - Build command: Leave empty
   - Publish directory: `.` (root)
5. Click Deploy
6. After deployment, go to **Site settings → Build & Deploy → Environment**
7. Add environment variables:
   - `GITHUB_TOKEN`: Paste your token from step 2
   - `GITHUB_REPO`: `YourUsername/blog-connect`

#### Option B: Direct Upload (Netlify Drag & Drop)
1. Deploy all files via Netlify drag & drop
2. After deployment, add environment variables (see above)

### 4. Access Your Blog
- **Portfolio**: `https://your-site.netlify.app`
- **Blog**: `https://your-site.netlify.app/blog.html`
- **Admin**: `https://your-site.netlify.app/admin.html`
  - Password: `robo123` (⚠️ Change this in `admin.html` before production!)

## 📝 Blog Management

### Adding a Post
1. Go to `/admin.html` and login with the password
2. Fill in post details:
   - **Title**: Post title
   - **Category**: Post category (e.g., "Technology", "Python", "Web Dev")
   - **Date**: Publication date
   - **Content**: Post content (supports line breaks)
   - **Image**: Optional image (max 5MB)
3. Click "Add Post to GitHub"
4. Post appears immediately on `/blog.html`

### Edit/Delete Posts
- Posts can only be deleted via the admin panel
- To edit, delete and recreate the post
- Images are stored on GitHub, so they persist even locally

### How Posts Are Saved
- **GitHub Sync**: Posts and images sync to your blog-connect repo
- **LocalStorage Fallback**: If GitHub is down, posts save locally
- **This Device Only**: Local posts only appear on that device

## 🔐 Security Notes

### Change Admin Password
1. Open `admin.html`
2. Find: `const ADMIN_PASSWORD = "robo123";`
3. Change to a strong password
4. Redeploy

### GitHub Token Security
- Never commit your GitHub token to the repo
- Only set it in Netlify environment variables
- Anyone with the token can modify your blog repo
- Delete and regenerate the token if compromised

## 🐛 Troubleshooting

### Blog Shows "No posts yet"
**Solution**: 
1. Check GitHub RRCONFIGURATION
2. Make sure `blog-connect` repo exists and is public
3. Check Netlify environment variables are set correctly
4. Check browser console for errors (press F12)

### Images Not Showing
**Solution**:
1. Check `GITHUB_TOKEN` is set in Netlify
2. Image file size must be > 5MB
3. Images are stored in `/images/` folder in your blog repo
4. Check network tab in DevTools for 404 errors

### "GitHub token not configured" Error
**Solution**:
1. Go to Netlify Site Settings
2. Build & Deploy → Environment
3. Add `GITHUB_TOKEN` and `GITHUB_REPO` variables
4. Redeploy the site (or wait for next deployment)

### Admin Login Not Working
- Ensure you typed the correct password (case-sensitive)
- Clear browser localStorage: Open DevTools → Storage → LocalStorage → Delete `adminLoggedIn`
- Try in a private/incognito window

## 📦 Deployment Checklist

Before going live, ensure:
- [ ] `netlify.toml` exists in root
- [ ] `GITHUB_TOKEN` is set in Netlify environment variables
- [ ] `GITHUB_REPO` environment variable points to your repo
- [ ] Blog repository (`blog-connect`) is public
- [ ] Admin password changed from `robo123`
- [ ] `.git` folder is in `.gitignore` before deploying
- [ ] Test blog creation and image upload in production

## 🔗 Useful Links
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Web Deploy Troubleshooting](https://github.com/RoboPlayz12345/blog-connect)

## 📄 Environment Variables Reference

| Variable | Value | Where |
|----------|-------|-------|
| `GITHUB_TOKEN` | Your personal access token | Netlify Site Settings |
| `GITHUB_REPO` | `username/blog-connect` | Netlify Site Settings |

## 🎨 Customization

### Change Blog Colors
1. Edit `style.css` CSS variables in `:root`:
   ```css
   :root {
       --primary: #0f172a;
       --accent: #3c83f6;
       --text: #f1f5f9;
   }
   ```

### Change Portfolio Content
Edit `index.html` sections:
- Hero section
- About
- Skills
- Experience
- Education
- Contact

## 💡 Tips
- Use Markdown formatting in blog posts (manual line breaks)
- Create categories to organize posts
- Posts are sorted by newest first
- Search functionality available on blog page
- Test locally before deploying changes

## 🆘 Need Help?
- Check browser console for JavaScript errors (F12)
- Check Netlify function logs
- Verify GitHub repository access
- Ensure environment variables are set correctly
