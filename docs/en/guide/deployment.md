---
outline: deep
---

# Deployment

## Deploy to Cloudflare Pages

Cloudflare Pages is a great way to host the doc site.

Firstly register a Cloudflare account, then goto [Cloudflare Dashboard](https://dash.cloudflare.com).

In Account Home, select Workers & Pages > Create application > Pages > Connect to Git.

Refer [this doc](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/) for more details

## Deploy to your own servers

If you wanna self-host the website, you need to configure CI/CD pipelines with your preferred toolchain.

The key commands are

```bash
# build the dist folder which contains all site static assets
npm run build
```

