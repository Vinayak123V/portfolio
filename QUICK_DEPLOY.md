# 🚀 Quick Deploy to vinayakhosur.com (FREE)

## Option 1: Vercel (RECOMMENDED - 100% FREE)

### Step 1: Install and Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend folder
cd frontend
vercel login
vercel --prod
```

### Step 2: Add Custom Domain (FREE!)
1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to Settings → Domains
4. Add `vinayakhosur.com` (no payment required!)

### Step 3: Configure DNS
At your domain registrar, add these DNS records:
```
A Record: @ → 76.76.19.61
CNAME: www → cname.vercel-dns.com
```

**Done! Your site will be live at vinayakhosur.com in 24-48 hours.**

---

## Option 2: GitHub Pages (100% FREE)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository → Settings → Pages
2. Source: Deploy from a branch → main
3. Custom domain: `vinayakhosur.com`
4. Enforce HTTPS: ✅

### Step 3: Configure DNS
```
A Record: @ → 185.199.108.153
A Record: @ → 185.199.109.153  
A Record: @ → 185.199.110.153
A Record: @ → 185.199.111.153
CNAME: www → YOUR_USERNAME.github.io
```

**Done! Your site will be live at vinayakhosur.com in 24-48 hours.**

---

## 💡 Why These Are FREE:
- **Vercel**: Free tier includes custom domains forever
- **GitHub Pages**: Free for public repositories with custom domains

## ⚡ Fastest Option: Vercel
Just run these 3 commands:
```bash
npm install -g vercel
cd frontend  
vercel --prod
```
Then add your domain in the Vercel dashboard!

## 🔧 Need Help?
If you get stuck, just run:
```bash
vercel --help
```

Your portfolio will be live at **vinayakhosur.com** for FREE! 🎉