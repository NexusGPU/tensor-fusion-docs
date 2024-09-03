export const Guide = (lang: string) => [
  {
    text: 'Introduction',
    collapsed: false,
    base: '/quickstart',
    items: [
      {
        text: match(lang, {
          en: 'What is VitePress?',
          zh: '什么是Vitepress'
        }),
        link: 'what-is-vitepress'
      },
    ]
  }
]
export const Reference = (lang: string) => [
  {
    text: 'Introduction',
    collapsed: false,
    items: [
      {
        text: match(lang, {
          en: 'What is VitePress?',
          zh: '什么是Vitepress'
        }),
        link: 'what-is-vitepress'
      },
    ]
  }
]

function match(lang: string, dict: Record<string, string>) {
  return dict[lang] ?? dict['en']
}