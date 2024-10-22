// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue'
import imageViewer from 'vitepress-plugin-image-viewer'
import { Sandbox } from 'vitepress-plugin-sandpack'
import 'vitepress-plugin-sandpack/dist/style.css'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useRoute } from 'vitepress';
import VComments from './components/VComments.vue'
import VDocTypeSwitch from './components/VDocTypeSwitch.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-after': () => h(VComments),
      'sidebar-nav-before': () => h(VDocTypeSwitch)
    })
  },
  enhanceApp({ app, router, siteData }) {
    DefaultTheme.enhanceApp({ app, router, siteData })
    app.component('Sandbox', Sandbox)
    app.component('vImageViewer', vImageViewer);
  },
  setup() {
    const route = useRoute();
    imageViewer(route);
}
} satisfies Theme
