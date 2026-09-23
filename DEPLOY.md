# Deploy Kaizen Project Hub on Vercel
1. Push this folder to a GitHub repository.
2. Create a Postgres database (Vercel Marketplace > Neon, or Supabase). Copy its connection string.
3. On your computer: `npm install`, then create `.env.local` (copy `.env.example`) and set `DATABASE_URL`.
4. Run `npm run db:push` (creates the tables) and `npm run db:seed` (loads the 7 projects).
5. In Vercel: New Project > import the repository > add these environment variables:
   `DATABASE_URL`, `ADMIN_PASSWORD` (a long passphrase), `AUTH_SECRET` (`openssl rand -hex 32`), `NEXT_PUBLIC_SITE_URL` (your https address).
6. Deploy. Sign in at `/admin/login` to add, edit or delete projects (visitors cannot).
7. Add your domain in Vercel, then add it to Google Search Console and submit `/sitemap.xml`.
