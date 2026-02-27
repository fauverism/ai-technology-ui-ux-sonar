Vercel deployment

Steps to deploy this Vite + static site to Vercel:

1. Ensure dependencies are installed:

```bash
npm install
```

2. Locally build to verify:

```bash
npm run build
npm run preview
```

3. Deploy with Vercel CLI or the Vercel dashboard.

- Using Vercel CLI:

```bash
npm i -g vercel
vercel --prod
```

- Using Vercel Dashboard: set **Build Command** to `npm run build` and **Output Directory** to `dist`, then trigger a deploy.

Configuration file `vercel.json` is included to ensure Vercel runs the static build and routes to `index.html` for SPA behavior.

Automatic GitHub deploys (GitHub Actions)

1. Add these repository secrets in GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
   - Create a token in the Vercel Dashboard: Settings → Tokens → Create Token.
   - Find **Org ID** and **Project ID** on your Vercel project Settings → General.

2. A workflow has been added at `.github/workflows/vercel-deploy.yml`. On push to `main` it will:
   - install dependencies, build with `npm run build`, and deploy to Vercel using the supplied secrets.

3. Push your branch to GitHub to trigger the workflow. Monitor the run in the GitHub Actions tab and the deployment in Vercel.

If you prefer native Git integration, connect the GitHub repo to Vercel in the Vercel Dashboard instead of using the Action.
