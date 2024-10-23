export const Guide = (lang: string) => [
  {
    text: 'Overview',
    collapsed: false,
    base: '/guide',
    items: [
      {
        text: match(lang, {
          en: 'Overview Sample',
          zh: 'Overview Sample'
        }),
        link: '/overview'
      },
    ]
  }, 
  {
    text: 'Getting Started',
    collapsed: false,
    base: '/guide',
    items: [
      {
        text: match(lang, {
          en: 'Quick Start',
          zh: '快速开始'
        }),
        link: '/get-started'
      },
    ]
  },
  {
    text: 'Recipes',
    collapsed: false,
    base: '/guide',
    items: [
      {
        text: match(lang, {
          en: 'Use Markdown',
          zh: '使用Markdown'
        }),
        link: '/markdown-examples'
      },
      {
        text: match(lang, {
          en: 'Add Playground',
          zh: '添加互动教程'
        }),
        link: '/playground'
      },
      {
        text: match(lang, {
          en: 'Built-in Extensions',
          zh: '扩展能力'
        }),
        link: '/plugin-examples'
      },
      {
        text: match(lang, {
          en: 'Deploy Site',
          zh: '部署站点'
        }),
        link: '/deployment'
      },
    ]
  }
]
export const Reference = (lang: string) => [
  {
    text: 'API',
    collapsed: false,
    items: [
      {
        text: match(lang, {
          en: 'API Reference',
          zh: 'API 参考'
        }),
        link: '/reference/api'
      },
    ]
  }
]

function match(lang: string, dict: Record<string, string>): string {
  console.log(dict[lang])
  return dict[lang] ?? dict.en ?? 'wording not set'
}