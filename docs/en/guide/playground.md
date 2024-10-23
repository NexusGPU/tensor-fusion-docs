---
layout: page
---

## Sandpack Sandbox

::: sandbox {deps="vue3-toastify: latest, animate.css: ~4.1.1"}
```vue /src/App.vue
<script setup>
import "./style.css"
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const notify = () => {
  toast.success(
    "Success Notification!",
    {
      position: toast.POSITION.BOTTOM_CENTER,
    },
  );
};
</script>

<template>
  <div>
    <button @click="notify">Notify !</button>
  </div>
</template>
```
```css /src/style.css{prefix=#readOnly/src/}
body {
  background-color: black;
}
```
:::
