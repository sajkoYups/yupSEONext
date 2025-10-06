# 🚀 Deployment Guide

## Environment Configuration

Your backend is deployed at: **https://yupseonode.onrender.com**

The app automatically switches between local and production backends based on environment variables.

---

## 🔧 Local Development Setup

1. **Create `.env.local` file** in the project root:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5001
```

2. **Start your local backend** on port 5001

3. **Run Next.js dev server**:
```bash
npm run dev
```

✅ The app will use your local backend at `http://localhost:5001`

---

## 🌐 Production Deployment

### Option 1: Vercel (Recommended for Next.js)

1. **Push your code to GitHub**

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variable**:
   - Go to Project Settings → Environment Variables
   - Add variable:
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://yupseonode.onrender.com`
   - Apply to: Production, Preview, Development

4. **Deploy**:
   - Click "Deploy"
   - Done! ✨

**Vercel CLI Deployment**:
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

### Option 2: Netlify

1. **Push code to GitHub**

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - New site from Git → Select your repo

3. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Add Environment Variable**:
   - Site settings → Environment variables
   - Add:
     - **Key**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://yupseonode.onrender.com`

5. **Deploy**

---

### Option 3: Render (Same as your backend)

1. **Create `render.yaml`** in project root:

```yaml
services:
  - type: web
    name: yupseo-frontend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NEXT_PUBLIC_API_URL
        value: https://yupseonode.onrender.com
      - key: NODE_ENV
        value: production
```

2. **Connect to Render**:
   - Dashboard → New → Web Service
   - Connect your GitHub repo
   - Render will use the `render.yaml` config

3. **Deploy** ✅

---

### Option 4: Manual Deployment (Any Platform)

**Set this environment variable on your hosting platform**:
```
NEXT_PUBLIC_API_URL=https://yupseonode.onrender.com
```

**Build commands**:
```bash
npm install
npm run build
npm start
```

---

## 🔍 How It Works

The app uses `/src/lib/config.ts`:

```typescript
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
```

**Automatic switching**:
- **Local dev** (no env var set) → Uses `http://localhost:5001`
- **Local dev** (with `.env.local`) → Uses value from `.env.local`
- **Production** (env var set on platform) → Uses `https://yupseonode.onrender.com`

---

## 🧪 Testing Production API Locally

To test with production backend locally:

1. Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://yupseonode.onrender.com
```

2. Restart dev server:
```bash
npm run dev
```

✅ Now uses production backend while developing

---

## 📝 Environment Variables to Set

### Required
| Variable | Development | Production |
|----------|-------------|------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5001` | `https://yupseonode.onrender.com` |

### Optional
Add these if needed in the future:
- `NEXT_PUBLIC_ANALYTICS_ID` - Google Analytics ID
- `NEXT_PUBLIC_SENTRY_DSN` - Error tracking
- `NEXT_PUBLIC_APP_URL` - Your frontend URL

---

## 🚨 Important Notes

1. **`NEXT_PUBLIC_` prefix is required** for client-side environment variables in Next.js

2. **Restart dev server** after changing `.env.local`

3. **Never commit `.env.local`** - it's already in `.gitignore`

4. **Create `.env.local` manually** when setting up locally:
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:5001" > .env.local
   ```

---

## ✅ Quick Setup Checklist

### Local Development
- [ ] Create `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:5001`
- [ ] Start local backend on port 5001
- [ ] Run `npm run dev`
- [ ] Test on `http://localhost:3000`

### Production Deployment (Vercel)
- [ ] Push code to GitHub
- [ ] Connect repo to Vercel
- [ ] Add environment variable `NEXT_PUBLIC_API_URL=https://yupseonode.onrender.com`
- [ ] Deploy
- [ ] Test share link feature

---

## 🔗 URLs

- **Local Frontend**: `http://localhost:3000`
- **Local Backend**: `http://localhost:5001`
- **Production Backend**: `https://yupseonode.onrender.com`
- **Production Frontend**: (Your Vercel/Netlify URL after deployment)

---

## 🐛 Troubleshooting

### Issue: API calls fail in production
**Solution**: Verify environment variable is set correctly on hosting platform

### Issue: Still using localhost in production
**Solution**: 
1. Check environment variable name has `NEXT_PUBLIC_` prefix
2. Rebuild and redeploy the app
3. Clear browser cache

### Issue: CORS errors
**Solution**: Make sure your backend (yupseonode.onrender.com) allows requests from your frontend domain

### Issue: Share links show backend URL instead of frontend URL
**Solution**: This is already handled! The ShareModal generates frontend URLs using `window.location.origin`

---

## 📚 Additional Resources

- [Next.js Environment Variables Docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Render Environment Variables](https://render.com/docs/environment-variables)

---

**Need help?** Check that:
1. Environment variable is named exactly `NEXT_PUBLIC_API_URL`
2. Backend URL is `https://yupseonode.onrender.com` (no trailing slash)
3. You've rebuilt the app after adding environment variables

