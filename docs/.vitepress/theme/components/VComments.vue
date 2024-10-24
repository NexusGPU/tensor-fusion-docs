<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter, title } = useData()
</script>

<template>
  <!--
    The `class="giscus"` ensures that the comment section is inserted in the right place,
    so that `v-if` can unload the comment section precisely.
  -->
  <div v-if="frontmatter.comments !== false" :key="title" class="giscus">
    <!--
      It doesn't make sense to use `v-if` to unmount `script` here,
      what needs to be uninstalled is the giscus comment section that has been inserted into the DOM.
    -->
    <component
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="code2life/vitepress-diataxis-template"
      data-repo-id="R_kgDOMsQCjQ"  
      data-category="General"
      data-category-id="DIC_kwDOMKHxx84Cgnyh"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      data-lang="en"
      data-theme="dark"
      data-loading="lazy"
      async
    />
  </div>
</template>
