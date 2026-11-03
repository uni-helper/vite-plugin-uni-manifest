---
layout: home

hero:
  name: Vite Plugin Uni Manifest
  tagline: 在 Vite 驱动的 uni-app 里，用 TypeScript 写 manifest.json。
  actions:
    - theme: brand
      text: 起步
      link: /guide/installation
    - theme: alt
      text: 介绍
      link: /guide/introduction
  image:
    src: /logo.svg
    alt: Vite Plugin Uni Manifest

features:
  - title: TypeScript 配置
    details: 用 manifest.config.ts 写配置，字段提示来自 @uni-helper/uni-manifest-types，和官方文档对齐。
  - title: 跟随开发
    details: 开发期间监听 manifest.config.ts，改完自动写回 manifest.json；一次性构建只读一次，不建监听器。
  - title: .env 支持
    details: 打开 dotenv 后，manifest.config.ts 能读到 .env、.env.local、.env.{mode} 和 .env.{mode}.local。
  - title: 数组整体覆盖
    details: 打开 replaceArrays 后，你写的数组替换默认配置里的同名数组，而不是被拼在后面。
  - title: 提前生成
    details: prepare() 在 Vite 启动前写好 manifest.json，解决 uni-app 先读后写导致的时序问题。
  - title: 可编排
    details: 生成的路径、格式、幂等写入都在一个 writer 里，也可以直接调用导出函数生成文件。
---
