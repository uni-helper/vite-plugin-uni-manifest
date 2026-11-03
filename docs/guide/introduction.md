# 介绍

`@uni-helper/vite-plugin-uni-manifest` 把 `manifest.config.*` 编译成 uni-app 的 `manifest.json`。配置用 TypeScript 写，字段类型来自 `@uni-helper/uni-manifest-types`，产物是普通的 JSON 文件。

这个仓库发布三个包：

| 包 | 说明 |
| --- | --- |
| `@uni-helper/vite-plugin-uni-manifest` | Vite 插件，从 `manifest.config.*` 生成 `manifest.json` |
| `@uni-helper/uni-manifest-types` | `manifest.json` 的 TypeScript 类型 |
| `@uni-helper/manifest-json-schema` | `manifest.json` 的 JSON Schema，由类型生成 |

## 两种生成方式

插件在 Vite 的 `configResolved` 钩子里工作，按构建是否持续决定走哪条路：

- **会持续的构建**（`vite dev`，以及带 `build.watch` 的 `build`，uni-app 小程序开发就是这种）：监听 `manifest.config.*`，每次改动写回 `manifest.json`。
- **一次性构建**：只加载一次并写入，不创建文件监听器。

两条路共用同一套选项解析、c12 加载配置和 writer，产物完全一样。

## 为什么用配置文件

`manifest.json` 在 uni-app 项目里是必需文件，手写时没有类型提示，也不能拆分和复用。改成 `manifest.config.ts` 之后可以：

- 用 TypeScript 写，字段名写错会直接报错
- 拆成多个模块，或者按环境拼装
- 用 `.env` 里的值（打开 `dotenv`）
- 数组字段整体覆盖默认值（打开 `replaceArrays`）

## 已知的顺序问题

`@dcloudio/vite-plugin-uni` 在 Vite 的 `config` 钩子里就把 `manifest.json` 读走并缓存，本插件在更晚的 `configResolved` 才写入。所以第一次启动时，uni-app 读到的是磁盘上的旧文件。

想彻底解决，用 [prepare()](/api/prepare) 在 Vite 启动前生成，或者按[常见问题](/other/faq#写入配置晚于-uni-app-读取配置)里的其它方案处理。

## 下一步

- [安装](/guide/installation)
- [使用](/guide/usage)
- [插件选项](/api/options)
