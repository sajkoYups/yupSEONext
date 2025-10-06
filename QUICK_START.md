# ⚡ Quick Start Guide

## 🏠 Local Development (5 minutes)

### 1. Set up environment variable

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:5001" > .env.local
```

### 2. Start your backend

Make sure your Node.js backend is running on port 5001 (local) or at https://yupseonode.onrender.com

### 3. Start the frontend

```bash
npm install
npm run dev
```

### 4. Open in browser

Visit: http://localhost:3000

✅ **Done!** The app will use your local backend at `http://localhost:5001`

---

## 🚀 Production Deployment (10 minutes)

### Option A: Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add shareable links feature"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

3. **Add Environment Variable**
   - Go to Project Settings → Environment Variables
   - Add:
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://yupseonode.onrender.com`

4. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your app is live! 🎉

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://yupseonode.onrender.com

# Deploy to production
vercel --prod
```

---

## 🔧 How Environment Variables Work

### In Development (`npm run dev`)
- Reads from `.env.local`
- Falls back to `http://localhost:5001` if not set
- Perfect for local testing

### In Production (Vercel/Netlify/etc.)
- Reads from platform environment variables
- Uses `https://yupseonode.onrender.com`
- No code changes needed!

---

## ✅ Testing Checklist

### Local Development
- [ ] Created `.env.local` file
- [ ] Backend is running on port 5001
- [ ] Frontend runs on `npm run dev`
- [ ] Can create SEO audit
- [ ] Can create share link
- [ ] Share link shows: `http://localhost:3000/shared/[shareId]`
- [ ] Share link opens and displays results

### Production
- [ ] Environment variable set on hosting platform
- [ ] Deployed successfully
- [ ] Can access the app
- [ ] Can create SEO audit
- [ ] Can create share link
- [ ] Share link shows: `https://your-app.vercel.app/shared/[shareId]`
- [ ] Share link opens and displays results
- [ ] Backend API is accessible (https://yupseonode.onrender.com)

---

## 🐛 Common Issues & Solutions

### Issue: "Failed to fetch" error
**Cause**: Backend not accessible  
**Solution**: 
- Local: Make sure backend is running on port 5001
- Production: Verify https://yupseonode.onrender.com is online

### Issue: Share link shows backend URL
**Cause**: Using old version  
**Solution**: Pull latest code and rebuild

### Issue: Environment variable not working
**Cause**: Missing `NEXT_PUBLIC_` prefix  
**Solution**: Variable must be named exactly `NEXT_PUBLIC_API_URL`

### Issue: Changes not showing after deployment
**Cause**: Build cache  
**Solution**: 
- Clear browser cache
- Redeploy on Vercel
- Hard refresh (Ctrl+Shift+R)

---

## 📝 Environment Variable Examples

### Local Development (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### Staging/Testing
```bash
NEXT_PUBLIC_API_URL=https://yupseonode-staging.onrender.com
```

### Production
```bash
NEXT_PUBLIC_API_URL=https://yupseonode.onrender.com
```

---

## 🔗 Important URLs

| Environment | Frontend | Backend |
|-------------|----------|---------|
| **Local** | http://localhost:3000 | http://localhost:5001 |
| **Production** | (Your Vercel URL) | https://yupseonode.onrender.com |

---

## 💡 Pro Tips

1. **Test with production backend locally**:
   ```bash
   echo "NEXT_PUBLIC_API_URL=https://yupseonode.onrender.com" > .env.local
   npm run dev
   ```

2. **Check environment variable is loaded**:
   - Add console.log in `src/lib/config.ts`:
   ```typescript
   export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
   console.log("Using API URL:", API_URL);
   ```

3. **Keep .env.local in .gitignore** (already done!)
   - Never commit API keys or secrets
   - Each developer has their own `.env.local`

---

## 📚 More Documentation

- **Detailed Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Share Feature**: See [SHARE_FEATURE.md](./SHARE_FEATURE.md)
- **Full README**: See [README.md](./README.md)

---

**Need Help?** 
- Check console for errors (F12 in browser)
- Verify backend is accessible
- Ensure environment variable is set correctly
- Restart dev server after changing `.env.local`

