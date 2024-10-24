---
outline: deep
---

## Video.js

<video-player src="https://files.testfile.org/Video%20MP4%2FLake%20-%20testfile.org.mp4" poster="https://vitepress.dev/vitepress-logo-large.webp" />

```html
<video-player src="https://files.testfile.org/Video%20MP4%2FLake%20-%20testfile.org.mp4" poster="https://vitepress.dev/vitepress-logo-large.webp" />
```

## Image Viewer

Click the image to zoom in and zoom out, no additional settings, just use markdown image syntax "![](image url)"

![](https://vitepress.dev/vitepress-logo-large.webp)

## Mermaid Examples

Most mermaid diagram types work in this template, see [Mermaid Playground](https://mermaid.live/)

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
