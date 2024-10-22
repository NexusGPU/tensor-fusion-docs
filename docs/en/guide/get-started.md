
## Setup

### Setup Giscus Comments

1. Install [Giscus App](https://github.com/apps/giscus) to your **public** doc repo

2. Enable discussion feature for the repo

![](https://filecdn.code2life.top/enable-discussions.png)

3. Replace data-repo and **data-repo** and **data-repo-id** in docs/.vitepress/theme/components/VComments.vue, find the snippets here: https://giscus.app/
![](https://filecdn.code2life.top/giscus-setup.png)

### Setup Auto Translate on PR Comment

1. Modify .github/workflows/auto-translate.yml config based on [this doc](https://g-t.vercel.app/docs/references/supported-model-provider)
2. Enable write permission and add OPENAI_API_KEY based on [this doc](https://g-t.vercel.app/docs/overview/getting-started)
3. Once PR created, comment /gt docs/en/*/*.md docs/zh/*guide*/*.md Chinese

### Setup PostHog Analysis

Goto [PostHog](https://posthog.com), register account and follow the setup steps, then copy the code snippets to replace docs/.vitepress/config.mts line 30

### Setup Sandpack Code Sandbox

[Sandpack](https://sandpack.codesandbox.io/) is a great tool for adding interactive tutorials on documents, especially for frontend tech stack, it's out-of-box for this template site, see [vitepress-plugin-sandpack doc](https://vitepress-sandbox.js-bridge.com/get-started/introduction.html) for more details

## Customize

[Change the default Layout](https://vitepress.dev/guide/extending-default-theme#layout-slots) by editing docs/.vitepress/theme/index.ts