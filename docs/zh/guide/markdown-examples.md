---
outline: deep
---

# Markdown扩展示例

## Syntax Highlighting

VitePress自带了基于[Shiki](https://github.com/shikijs/shiki)的语法高亮:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code --]
      msg: 'Changed!' // [!code ++]
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 更多示例

更多示例请查看Vitepress的[完整文档](https://vitepress.dev/guide/markdown).
