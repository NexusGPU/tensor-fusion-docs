---
outline: deep
---

# Deployment

Cloudflare Pages is a great way to host websites. This doc mainly introduce how to host your doc site with Cloudflare Pages in 3 minutes.

## Deploy to Cloudflare Pages

### Prerequisites

Register a [Cloudflare account](https://www.cloudflare.com/plans/), free plan is enough for most cases. 

Then goto [Cloudflare Dashboard](https://dash.cloudflare.com), you could also buy domains to host your websites in Cloudflare.

### Create App

Goto Workers & Pages menu, select Create application > Pages > Connect to Git.

![](https://filecdn.code2life.top/create-pages-cloudflare.png)

Follow the wizard and configure the build/deploy pipeline, just need to change a few fields like following.

![](https://filecdn.code2life.top/connect-git-and-build.png)

Refer [this doc](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/) for more details

### Setup Custom Domain

Configure custom domain if you've bought or onboarded domain into cloudflare, input your domain and it will work automatically after 1 minute, HTTPS certificate will also be auto issued and auto rotated.

![](https://filecdn.code2life.top/custom-domain.png)

## Deploy to your own servers

If you wanna self-host the website rather than using Cloudflare, you need to configure CI/CD pipelines by your own.

Firstly run build command to generate dist folder.

```bash
# build the dist folder which contains all site static assets
npm run build
```

Then copy the docs/.vitepress/dist folder to web servers like Nginx.

Finally configure domains, TLS certificates, web server ports and configs for the vendor you've chosen.
