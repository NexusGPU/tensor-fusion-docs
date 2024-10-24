---
outline: deep
---

## Video.js

This template is integrated with [Video.js](https://github.com/videojs/video.js), you could add video player with simple Vue component with src and poster properties.

```html
<video-player 
  src="https://files.testfile.org/Video%20MP4%2FLake%20-%20testfile.org.mp4" 
  poster="https://vitepress.dev/vitepress-logo-large.webp" 
/>
```

<video-player src="https://files.testfile.org/Video%20MP4%2FLake%20-%20testfile.org.mp4" poster="https://vitepress.dev/vitepress-logo-large.webp" />


## Image Viewer

This template is integrated with [Viewer.js](https://github.com/fengyuanchen/viewerjs), no additional settings required, just use markdown image syntax "![](image url)".

Try to click the image and then zoom in/out.

![](https://vitepress.dev/vitepress-logo-large.webp)

## PostHog Analysis

PostHog is a great platform that covers [Google Analytics](https://developers.google.com/analytics), [Microsoft Clarity](https://clarity.microsoft.com/) and more customer behavior analysis features.

Register a free account and change config.mts file, you will see the readers' real-time activities in seconds.

![](https://filecdn.code2life.top/posthog-demo.png)

## Mermaid Examples

Most mermaid diagram types work in this template, try to learn mermaid in [Mermaid Playground](https://mermaid.live/).

```mermaid
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
```

```mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
```

```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }
    class Fish{
      -int sizeInFeet
      -canEat()
    }
    class Zebra{
      +bool is_wild
      +run()
    }
```

```mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]

```
