---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tensor Fusion"
  text: Less GPUs<br />More AI Apps
  tagline: Supercharge your AI Infra with TensorFusion, <br />the Real-world GPU Virtualization Framework
  actions:
    - theme: brand
      text: Overview
      link: /guide/overview
    - theme: alt
      text: How-to Guides
      link: /guide/markdown-examples
    - theme: alt
      text: Reference
      link: /reference/cli-params
  image:
    src: /logo.png
    alt: Logo

features:
  - title: GPU Pooling & Virtualization
    icon: 📦
    details: Use Remote GPU pool anywhere like NFS
  - title: Autoscaling
    icon: 🔄
    details: Auto scale-up and scale-down your inference workload, higher throughput with lower costs.
  - title: Intelligent Scheduling
    icon: 📝
    details: Balance different inference requests based on customized or automated rules, maximize GPU utilization, minimize GPU waiting time
  - title: Management & Observability
    icon: 📊
    details: Out-of-box production ready GPU pool management features, monitoring, alerting and more.
  - title: High Performance
    icon: ⚡
    details: With deep optimization, TensorFusion achieved <5% performance overhead for most AI models
  - title: Battery included
    icon: 🔋
    details: Support Kubernetes, bare-metal, Edge cloud.

---
