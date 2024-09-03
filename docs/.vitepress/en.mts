import { Guide, Reference } from './sidebar.mts'
import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'The full-fledged tech doc template with best practices built-in',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide/': { base: '/guide/', items: Guide('en') },
      '/reference/': { base: '/reference/', items: Reference('en') },
    },

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Joey Yang'
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Guide',
      link: '/guide/api-examples',
      activeMatch: '/guide/'
    },
    {
      text: 'Reference',
      link: '/reference/site-config',
      activeMatch: '/reference/'
    },
    {
      text: "Resources",
      items: [{
        text: "Contributing",
        link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
      }]
    }
  ]
}