import { defineConfig } from 'vitepress'

/**
 * 侧边栏版本徽标。VPSidebarItem 用 v-html 渲染 item.text，这里的 HTML
 * 会按 Badge 组件的样式显示；样式调整在 theme/custom.css。
 */
function versionBadge(version: string): string {
  return `<span class="VPBadge tip">${version}</span>`
}

const guideSidebar = [
  {
    text: '指南',
    items: [
      { text: '介绍', link: '/guide/introduction' },
      { text: '安装', link: '/guide/installation' },
      { text: '使用', link: '/guide/usage' },
    ],
  },
  {
    text: 'API',
    items: [
      { text: '插件选项', link: '/api/options' },
      { text: `prepare() ${versionBadge('v0.7.0')}`, link: '/api/prepare' },
      { text: '编程接口', link: '/api/programmatic' },
    ],
  },
  {
    text: '其它',
    items: [
      { text: '常见问题', link: '/other/faq' },
      { text: '迁移指南', link: '/other/migration' },
    ],
  },
]

const blogSidebar = [
  {
    text: '博客',
    items: [
      { text: '全部文章', link: '/blog/' },
      {
        text: 'vite-plugin-uni-manifest 更新了什么',
        link: '/blog/2026-09-01-vite-plugin-uni-manifest-0-5-0-6',
      },
    ],
  },
]

export default defineConfig({
  title: 'Vite Plugin Uni Manifest',
  description: '用 TypeScript 编写 uni-app 的 manifest.json。',
  lang: 'zh-CN',
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
    ],
    [
      'meta',
      { name: 'og:type', content: 'website' },
    ],
    [
      'meta',
      { name: 'og:locale', content: 'zh_cn' },
    ],
    [
      'meta',
      { name: 'og:site_name', content: 'Vite Plugin Uni Manifest' },
    ],
  ],
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    nav: [
      { text: '指南', link: '/guide/introduction', activeMatch: '/(guide|api|other)/' },
      { text: '博客', link: '/blog/', activeMatch: '/blog/' },
      {
        text: '更新日志',
        link: 'https://github.com/uni-helper/vite-plugin-uni-manifest/releases',
      },
    ],
    sidebar: {
      '/': guideSidebar,
      '/blog/': blogSidebar,
    },
    editLink: {
      pattern: 'https://github.com/uni-helper/vite-plugin-uni-manifest/edit/main/docs/:path',
    },
    lastUpdated: {},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/uni-helper/vite-plugin-uni-manifest' },
    ],
    search: {
      provider: 'local',
    },
  },
})
