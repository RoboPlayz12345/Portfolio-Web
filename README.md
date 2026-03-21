"# Portfolio-Web 🚀

A modern, responsive portfolio website with an integrated blog system that syncs with GitHub. Built with vanilla HTML, CSS, and JavaScript - no dependencies needed!

## ✨ Features

- **Personal Portfolio**: Showcase your projects, skills, and experience
- **Blog System**: Create and publish blog posts with images
- **GitHub Integration**: Automatic backup of posts and images to GitHub
- **Admin Dashboard**: Password-protected content management
- **Responsive Design**: Beautiful on desktop, tablet, and mobile
- **Dark Theme**: Modern dark-themed UI with smooth animations
- **Search**: Find blog posts by title or category
- **Offline Fallback**: Posts load from local storage if GitHub is down

## 📖 Quick Links

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Deployment Guide](DEPLOYMENT.md)** - Full setup and troubleshooting
- **[Website](https://aaravchauhan.netlify.app/)** - See it live!

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Netlify Functions (Node.js)
- **Storage**: GitHub (posts + images)
- **Hosting**: Netlify
- **No dependencies** - Zero npm packages!

## 📦 What's Included

```
portfolioredesinged/
├── index.html                 # Main portfolio page
├── blog.html                  # Blog listing
├── admin.html                 # Admin dashboard
├── style.css                  # All styles (responsive design)
├── script.js                  # Portfolio interactions
├── netlify.toml               # Deployment config
├── netlify/functions/
│   ├── update-posts.js        # GitHub sync function
│   └── upload-image.js        # Image upload handler
├── DEPLOYMENT.md              # Full setup guide
├── QUICKSTART.md              # 5-minute setup
└── README.md                  # This file
```

## 🚀 Deployment

### The Easiest Way (3 steps)

1. **Create a GitHub repo** for blog data
2. **Generate a GitHub token** for access
3. **Deploy to Netlify** and add env variables

See [QUICKSTART.md](QUICKSTART.md) for detailed steps.

## 📝 Blog Features

### Create Posts
- Add title, category, date, and content
- Optional image upload (stored on GitHub)
- Auto-save to GitHub with fallback to local storage

### Manage Posts
- View all posts in admin dashboard
- Delete posts with one click
- Search blog by title or category
- Posts sorted by newest first

### Image Hosting
- Images upload directly to GitHub
- Max file size: 5MB
- Automatically optimized URLs
- Works even when GitHub is temporarily down

## 🔐 Security

- Admin panel protected by password
- GitHub token never exposed to frontend
- All sensitive data in Netlify environment variables
- HTTPS by default on Netlify

## 📱 Responsive Design

- Mobile first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Fast load times

## 🎨 Customization

Edit `style.css` to change:
- Colors (CSS variables at top)
- Fonts and sizes
- Spacing and layout
- Dark theme settings

Edit `index.html` to update:
- Your name and bio
- Skills and experience
- Education details
- Contact information

## 💻 Local Development

No build step needed! Just:

```bash
# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
```

Then visit: `http://localhost:8000`

## 🆘 Need Help?

### Admin won't sync to GitHub
1. Check Netlify environment variables are set
2. Verify GitHub token is valid
3. Ensure blog repository is public
4. Check browser console for errors (F12)

### Images not uploading
1. File size must be under 5MB
2. Check GITHUB_TOKEN in Netlify settings
3. Check network requests in DevTools

### Blog page shows no posts
1. Wait 2-3 minutes after initial deploy
2. Clear cache (Ctrl+Shift+Delete)
3. Check if posts.json exists in your repository
4. Look at browser console for error messages

**For more help, see [DEPLOYMENT.md](DEPLOYMENT.md)**

## 📊 Performance

- Zero JavaScript dependencies
- Minimal bundle size < 50KB
- Instant page loads
- Smooth animations and transitions
- Optimized images

## 🔄 Update Checklist

Before deploying updates:
- [ ] Test blog creation locally
- [ ] Test image upload
- [ ] Verify responsive design
- [ ] Check console for errors
- [ ] Test on mobile device

## 📜 License

Feel free to use this template for your own portfolio!

## 🙌 Credits

Built with ❤️ for modern web development.

---

**Version 2.0** - GitHub integration, image hosting, and complete rewrite
" 
