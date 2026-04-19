# Portfolio Deployment Guide - vinayakhosur.com (FREE OPTIONS)

## 🆓 Free Hosting Options with Custom Domain Support

### Option 1: Vercel (100% FREE - Recommended)

Vercel offers completely free hosting with custom domain support!

#### Step 1: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel (create free account)
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

#### Step 2: Add Custom Domain (FREE)
1. Go to [vercel.com](https://vercel.com) → Your Project → Settings → Domains
2. Add `vinayakhosur.com` (completely free!)
3. Add `www.vinayakhosur.com` (also free!)

#### Step 3: Configure DNS at Your Domain Registrar
```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

### Option 2: GitHub Pages (100% FREE)

GitHub Pages is completely free and supports custom domains!

#### Step 1: Create GitHub Repository
```bash
# Initialize git repository
git init
git add .
git commit -m "Portfolio website"
git branch -M main

# Create repository on GitHub: vinayakhosur/portfolio
git remote add origin https://github.com/vinayakhosur/portfolio.git
git push -u origin main
```

#### Step 2: Enable GitHub Pages
1. Go to repository → Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Custom domain: `vinayakhosur.com`
5. Enforce HTTPS: ✅

#### Step 3: Configure DNS
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @  
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: vinayakhosur.github.io
```

### Option 3: Firebase Hosting (100% FREE)

Google Firebase offers free hosting with custom domains!

#### Step 1: Setup Firebase
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting
```

#### Step 2: Configure firebase.json
```json
{
  "hosting": {
    "public": "frontend/build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

#### Step 3: Deploy and Add Domain
```bash
# Build and deploy
cd frontend
npm run build
cd ..
firebase deploy

# Add custom domain in Firebase Console
# Go to Hosting → Add custom domain → vinayakhosur.com
```

### Option 4: Surge.sh (100% FREE)

Simple and free static hosting with custom domains!

#### Step 1: Install and Deploy
```bash
# Install Surge
npm install -g surge

# Build project
cd frontend
npm run build

# Deploy with custom domain
surge build vinayakhosur.com
```

## 🎯 RECOMMENDED: Vercel (Easiest Setup)

Vercel is the best free option because:
- ✅ Completely free forever
- ✅ Custom domains included
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Easy setup
- ✅ No payment required

## 📋 Quick Vercel Deployment Steps:

### 1. Deploy to Vercel
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

### 2. Add Your Domain (FREE)
- Go to Vercel Dashboard
- Select your project
- Go to Settings → Domains
- Add `vinayakhosur.com` (no payment needed!)

### 3. Update DNS Settings
At your domain registrar (where you bought vinayakhosur.com):
```
A Record: @ → 76.76.19.61
CNAME: www → cname.vercel-dns.com
```

### 4. Wait for DNS Propagation (24-48 hours)

## 🔧 Alternative: GitHub Pages Setup

If you prefer GitHub Pages:

### 1. Quick Deploy
```bash
# From your project root
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# Deploy to GitHub Pages
cd frontend
npm run deploy
```

### 2. Configure Custom Domain
- Go to GitHub repository → Settings → Pages
- Add custom domain: `vinayakhosur.com`
- Enable "Enforce HTTPS"

## 💡 Why These Are FREE:

- **Vercel**: Free tier includes custom domains
- **GitHub Pages**: Free for public repositories
- **Firebase**: Free tier includes hosting
- **Surge.sh**: Free static hosting

## 🚫 Avoid These (They Charge for Custom Domains):
- Netlify (charges for custom domains on free plan)
- Heroku (discontinued free tier)

## ✅ Final Checklist:

- [ ] Choose Vercel or GitHub Pages
- [ ] Deploy your portfolio
- [ ] Add custom domain in platform settings
- [ ] Configure DNS at domain registrar
- [ ] Wait for DNS propagation
- [ ] Verify HTTPS is working
- [ ] Test all functionality

**Recommendation**: Use Vercel - it's the easiest and completely free with custom domain support!