# @uni-helper/vite-plugin-uni-manifest

本包是仓库的 Vite 插件本体：导出 `VitePluginUniManifest`（同时是默认导出），在 `manifest.config.*` 变化时生成 `manifest.json`。

## 构建

```bash
pnpm -C packages/core build     # tsdown → dist/index.mjs + dist/index.d.mts
pnpm -C packages/core dev       # tsdown --watch
```

- 入口只有 `src/index.ts`，`exports` 只有 `.` 一项，ESM only。
- 依赖：`@uni-helper/uni-manifest-types`（`workspace:*`）、`c12`、`debug`；peer 依赖 `vite ^5.0.0`。
- 类型定义在 `src/types.ts`（`Options` / `UserOptions` / `ResolvedOptions` / `DebugType`），用户可见的选项要同时更新本包 README 的选项表。

## 模块与不变量

| 文件 | 职责 |
| --- | --- |
| `index.ts` | 插件工厂：`enforce: 'pre'` → `configResolved` 启动 watcher → `buildEnd` 调 `unwatch` |
| `watcher.ts` | 深模块 `createManifestWatcher`，对外只暴露 `{ options, unwatch }` |
| `writer.ts` | `writeManifestJson` / `ensureManifestJsonExists` |
| `paths.ts` | `resolveManifestJsonPath` |
| `defaults.ts` | `defaultManifestConfig` |
| `config.ts` | `defineManifestConfig` + re-export types 包 |
| `logger.ts` | `debug` 分类日志 |
| `types.ts` | 选项类型 |

- **无导入时副作用**：文件读写只发生在插件生命周期内，模块可以单独 import 测试。
- **幂等写入**：`writeManifestJson` 先比对文件内容，相同则跳过写入（避免触发下游重编译），比较对象是最终字符串（含缩进、`eol`、末尾换行）。
- **路径不缓存**：`resolveManifestJsonPath` 每次重新读 `process.env.UNI_INPUT_DIR`，并用 Vite 的 `normalizePath` 归一化成 POSIX 风格（Windows 上返回 `D:/…`）。
- **c12 配置源**：`watchConfig({ name: 'manifest', rcFile: false, packageJson: false, defaultConfig: defaultManifestConfig })`，所以只认 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)`，不读 `.manifestrc`、不读 `package.json` 字段。
- **首次写入时机**：配置加载成功后才写（配置语法错误不会留下空 `manifest.json`）。
- **debug 类别**：`options`（选项解析）、`config`（配置加载与变更）、`writer`（写入）；选项为 `true` 时全部开启，字符串只开一类，等效 `DEBUG=vite-plugin-uni-manifest:*`。
- **`ManifestContext` 已废弃**：保留仅为兼容，新代码用 `createManifestWatcher`。

## 已知时序限制

`@dcloudio/vite-plugin-uni` 在 Vite 的 `config` 钩子里读取 `manifest.json`，早于本插件的 `configResolved`，所以首次启动时插件写出的文件对它无效（`enforce: 'pre'` 也无法提前到 `config` 之前）。替代方案见本包 README 的 FAQ，不要把这条当成可以靠插件修的问题。

## 测试

测试在仓库根 `test/`（不在包内），`watcher.test.ts` mock 了 `c12`、`paths`、`defaults`、`writer`，`plugin.test.ts` mock 了 `watcher`。改动本包时同时跑根目录的 `pnpm test` 与 `pnpm typecheck`。

## 约定

本包源码 JSDoc 用英文；`packages/types` 的中文 JSDoc 不适用于本包。
