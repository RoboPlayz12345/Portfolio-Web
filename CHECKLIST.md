# Pre-Deployment Verification Checklist

Use this checklist to ensure everything is properly set up before deploying.

## 📋 Repository Setup

- [ ] Created GitHub repository named `blog-connect` (public)
- [ ] Repository has a `posts.json` file with content: `[]`
- [ ] Repository is accessible at: `github.com/YOUR-USERNAME/blog-connect`

## 🔑 GitHub Token

- [ ] Generated personal access token at github.com/settings/tokens
- [ ] Token has `repo` scope
- [ ] Token is stored securely (save somewhere, you'll need it in Netlify)
- [ ] Token hasn't expired

## 🌐 Netlify Setup

- [ ] Site deployed on Netlify
- [ ] Site has Build & Deploy settings configured
- [ ] Environment variables added in Netlify:
  - [ ] `GITHUB_TOKEN` = your personal access token
  - [ ] `GITHUB_REPO` = `YOUR-USERNAME/blog-connect`
- [ ] Site redeployed after adding environment variables

## 📁 Local Files

- [ ] `netlify.toml` exists in root
- [ ] `netlify/functions/update-posts.js` exists
- [ ] `netlify/functions/upload-image.js` exists
- [ ] `.gitignore` includes `.env` and sensitive files
- [ ] No `.env` files committed to Git

## 🎨 Portfolio Content

- [ ] `index.html` updated with your personal info
- [ ] `style.css` colors customized (if desired)
- [ ] `script.js` functions working correctly
- [ ] All images/assets properly referenced

## 🔐 Security

- [ ] Admin password changed from `robo123` in `admin.html`
- [ ] No tokens or sensitive data in HTML/CSS/JS files
- [ ] GitHub token only in Netlify environment variables

## ✅ Testing

### Local Testing
- [ ] Portfolio page loads (index.html)
- [ ] Blog page accessible (blog.html)
- [ ] Links working (navigation, external links)
- [ ] Images loading properly
- [ ] Mobile view responsive

### Admin Dashboard
- [ ] Admin page loads (admin.html)
- [ ] Can login with new password
- [ ] Can create a test post
- [ ] Image upload works (< 5MB)
- [ ] Can delete posts
- [ ] Logout works properly

### Blog Functionality (Post Deploy)
- [ ] Created test post appears on blog page
- [ ] Search functionality works
- [ ] Images display correctly
- [ ] Responsive on mobile
- [ ] Posts saved to GitHub repository

### Error Handling
- [ ] Try uploading image > 5MB (should fail gracefully)
- [ ] Try with wrong admin password (should reject)
- [ ] Check browser console for JavaScript errors (F12)
- [ ] Check network requests in DevTools
- [ ] Verify Netlify function logs show no errors

## 🚀 Deployment Readiness

- [ ] All files committed to Git (except .env)
- [ ] Repository pushed to GitHub
- [ ] Netlify build successful
- [ ] No build errors in Netlify logs
- [ ] Site preview working: https://your-site.netlify.app
- [ ] Custom domain configured (if applicable)

## 📊 Performance Check

- [ ] Page load time < 2 seconds
- [ ] Images optimized and loading fast
- [ ] No console errors when opening blog
- [ ] Search works smoothly
- [ ] Mobile performance acceptable

## 🔗 Live Site Verification

After deployment:

1. Visit portfolio: `https://your-domain.netlify.app`
2. Visit blog: `https://your-domain.netlify.app/blog.html`
3. Visit admin: `https://your-domain.netlify.app/admin.html`
4. Login to admin with your new password
5. Create a test post with an image
6. Verify post appears on blog page within 10 seconds
7. Check GitHub repository for updated `posts.json`
8. Verify image uploaded to GitHub at `/images/` folder
9. Test search functionality
10. Test mobile view (press F12 in browser)

## 🐛 Troubleshooting

If something doesn't work:

1. Check **Netlify function logs**:
   - Go to Netlify dashboard → Functions tab
   - Look for errors in `update-posts` or `upload-image`

2. Check **browser console** (press F12):
   - Look for JavaScript errors
   - Check network tab for failed requests

3. Verify **environment variables**:
   - Go to Netlify → Site Settings → Build & Deploy → Environment
   - Confirm `GITHUB_TOKEN` and `GITHUB_REPO` are set
   - Try redeploying after adding variables

4. Test **GitHub token**:
   - Go to https://api.github.com/user
   - Add header: `Authorization: token YOUR-TOKEN`
   - Should return your GitHub user info

5. Verify **blog repository**:
   - Make sure it's **public** (not private)
   - Check URL: `github.com/USERNAME/blog-connect`
   - Verify `posts.json` exists

## 📞 Getting Help

See `DEPLOYMENT.md` for:
- Detailed feature explanations
- Security best practices
- Customization guide
- Advanced troubleshooting

## ✨ Final Checklist

Before considering deployment complete:

- [ ] Portfolio looks good
- [ ] Blog loads and displays posts
- [ ] Admin panel works
- [ ] Posts sync to GitHub
- [ ] Images upload and display
- [ ] Mobile view works
- [ ] No console errors
- [ ] Performance acceptable
- [ ] All environment variables set
- [ ] Admin password changed

**Congratulations! 🎉 Your portfolio is ready to go live!**
