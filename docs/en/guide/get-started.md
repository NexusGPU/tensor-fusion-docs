---
outline: deep
---

# Quick Start

### 1. Replace Domain

Goto **config.mts** file, change 'sitemap' & 'socialLinks' parts to your own domains.

```js
{
    sitemap: {
        hostname: "https://docs.code2life.top", // [!code --]
        hostname: "https://docs.awesome.com", // [!code ++]
    },

    socialLinks: [
        {
            icon: "github",
            link: "https://github.com/code2life/vitepress-diataxis-template", // [!code --]
            link: "https://github.com/your-org/your-project", // [!code ++]
        },
    ]
}
```

### 2. Setup Giscus Comments

1. Install [Giscus App](https://github.com/apps/giscus) to your **public** doc repo

2. Enable discussion feature for the repo

![](https://filecdn.code2life.top/enable-discussions.png)

3. Replace data-repo and **data-repo** and **data-repo-id** in docs/.vitepress/theme/components/VComments.vue, find the snippets here: https://giscus.app/
![](https://filecdn.code2life.top/giscus-setup.png)

### 3. Setup Auto Translate

This template repo is integrated [GPT translate](https://github.com/3ru/gpt-translate), you can start using it in 3 steps.

1. Modify .github/workflows/auto-translate.yml config based on [this doc](https://g-t.vercel.app/docs/references/supported-model-provider)
2. Enable write permission and add OPENAI_API_KEY based on [this doc](https://g-t.vercel.app/docs/overview/getting-started)
3. Once PR created, comment /gt docs/en/*/*.md docs/zh/*guide*/*.md Chinese

### 4. Setup PostHog Analysis

PostHog is an amazing SaaS product that covers almost all customer behavior analysis requirements.

Goto [PostHog](https://posthog.com), register account and follow the setup steps, then copy the code snippets to replace docs/.vitepress/config.mts head part.

```js
head: [
    ["meta", { name: "color-scheme", content: "dark" }],
    ...
    [
        "script",
        {},
        // copy your own script from PostHog onboarding page
        `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=...{api_host:'https://us.i.posthog.com'...`,  // [!code focus]
    ],
],
```

### 5. Setup Sandpack Code Sandbox

[Sandpack](https://sandpack.codesandbox.io/) is a great tool for adding interactive tutorials on documents, especially for frontend tech stack, it's out-of-box for this template site, see 

See [example page](/guide/playground) and check [vitepress-plugin-sandpack doc](https://vitepress-sandbox.js-bridge.com/get-started/introduction.html) for more details.

### 6. Add Auto-generated API Docs

This template integrates with [Stoplightio Elements](https://stoplight-site.webflow.io/open-source/elements) for auto generating API docs based on OpenAPI schema, using separate page without any layout is recommended.

Use the WebComponent with just one line of doc, see [this demo](/reference/api).

```html{2,5}
---
layout: false
---

<elements-api apiDescriptionUrl="https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml" router="hash" layout="sidebar"></elements-api>
```

If you need to customize API doc page, check the [Stoplight Elements Options](https://github.com/stoplightio/elements/blob/main/docs/getting-started/elements/elements-options.md).

## 7. Customization

Read VitePress official docs to find customization ways, here are some common customization entrypoints.

- docs/.vitepress/sidebar.mts is for changing the menu of guide/reference, **remember to update it upon new markdown added**.
- docs/.vitepress/en.mts and docs/.vitepress/zh.mts are the entrypoints to configure whole page menus and links, go through and change on-demand
- You can [change the default layout](https://vitepress.dev/guide/extending-default-theme#layout-slots) by editing docs/.vitepress/theme/index.ts
- You can [custom other layouts](https://vitepress.dev/reference/default-theme-layout#custom-layout) by adding new components and use it in front-formatter

## Known Issues

1. Mermaid pie chart, ZenUML are not working, need to fix this in vitepress-plugin-mermaid lib
2. Index page layout is not optimized for multiple products scenario
