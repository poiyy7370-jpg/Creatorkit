# CreatorKit – Phase 1
Setup: `npm install && cp .env.example .env.local && npm run dev` (http://localhost:3000)
Check: `npm run build && npm start`
Deploy: push to GitHub, import the repo at vercel.com/new, set NEXT_PUBLIC_SITE_URL, then add your domain under Project > Settings > Domains and follow the DNS records shown.
Ads: `components/AdSlot.tsx` renders nothing until NEXT_PUBLIC_ADS_ENABLED=true.
