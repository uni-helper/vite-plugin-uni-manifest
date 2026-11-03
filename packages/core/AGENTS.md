# @uni-helper/vite-plugin-uni-manifest

本包是仓库的 Vite 插件本体：导出 `VitePluginUniManifest`（同时是默认导出），在 `manifest.config.*` 变化时生成 `manifest.json`。

## 构建

```bash
pnpm -C packages/core build     # tsdown → dist/index.mjs + dist/index.d.mts
pnpm -C packages/core dev       # tsdown --watch
```

- 入口只有 `src/index.ts`，`exports` 只有 `.` 一项，ESM only。
- 依赖：`@uni-helper/uni-manifest-types`（`workspace:*`）、`c12`、`obug`；peer 依赖 `vite ^5.0.0`。
- 类型定义在 `src/types.ts`（`Options` / `UserOptions` / `ResolvedOptions` / `DebugType`），用户可见的选项要同时更新本包 README 的选项表。

## 模块与不变量

| 文件 | 职责 |
| --- | --- |
| `index.ts` | 插件工厂：`enforce: 'pre'` → `configResolved` 启动 watcher，一次性构建（`command === 'build'` 且无 `build.watch`）只调 `generateManifest`；没有 `buildEnd`，因为它在每次重建后都触发，关掉监听会断掉 watch 期间的同步 |
| `watcher.ts` | 深模块 `createManifestWatcher`，对外只暴露 `{ options, unwatch }`；另有 `generateManifest`（c12 `loadConfig`，不建 watcher）；c12 选项由 `getConfigOptions` 统一生成 |
| `writer.ts` | `resolveOutputSpec` + `writeManifestJson(config, spec)`：目录优先级、格式化、幂等写入 |
| `defaults.ts` | `defaultManifestConfig` |
| `config.ts` | `defineManifestConfig` + re-export types 包 |
| `logger.ts` | `obug` 分类日志；仅内部使用，不从入口导出（入口只导出 `DebugType`） |
| `types.ts` | 选项类型 |

- **无导入时副作用**：文件读写只发生在插件生命周期内，模块可以单独 import 测试。
- **幂等写入**：`writeManifestJson` 先比对文件内容，相同则跳过写入（避免触发下游重编译），比较对象是最终字符串（含缩进、`eol`、末尾换行）；`outDir` 不存在时用 `mkdirSync` 建出来。
- **没有配置文件就不写**：`loadConfig` / `watchConfig` 返回的 `_configFile` 为空时跳过写入（初次写入与 `onUpdate` 都要判断），否则会把用户手写的 `manifest.json` 换成默认值。
- **输出规格与路径**：`resolveOutputSpec(options)` 是唯一的格式来源（`minify` 折成 `indent: 0`），writer 只照 spec 写；目录优先级 `outDir` → `UNI_INPUT_DIR` → `cwd/src` 在 writer 内部，相对路径以 `cwd`（`VITE_ROOT_DIR`，未设置时 `process.cwd()`）为基准，环境变量每次写入重新读，并用 Vite 的 `normalizePath` 归一化成 POSIX 风格（Windows 上返回 `D:/…`）。
- **c12 配置源**：`watchConfig({ name: 'manifest', rcFile: false, packageJson: false, defaultConfig: defaultManifestConfig })`，所以只认 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)`，不读 `.manifestrc`、不读 `package.json` 字段。
- **首次写入时机**：配置加载成功后才写（配置语法错误不会留下空 `manifest.json`）。
- **debug 类别**（`obug` 命名空间）：`options`（选项解析）、`config`（配置加载与变更）、`writer`（写入）；选项为 `true` 时全部开启，字符串只开一类，等效 `DEBUG=vite-plugin-uni-manifest:*`。
- **`.env` 与数组合并**：`dotenv` 开启时用 Vite 的 `loadEnv(mode, cwd, '')` 读 `.env`、`.env.local`、`.env.{mode}`、`.env.{mode}.local`，再 `Object.assign` 进 `process.env`（`loadEnv` 只返回值，且默认按 `VITE_` 过滤）；`mode` 由插件传入的 Vite `config.mode` 决定，直接调 `createManifestWatcher` 时默认取 `process.env.NODE_ENV`。`replaceArrays` 开启时给 c12 传自定义 `merger`（`createDefu`，数组整体替换）。两个选项默认关闭，默认产物不变。

## 已知时序限制

`@dcloudio/vite-plugin-uni` 在 Vite 的 `config` 钩子里读取 `manifest.json`，早于本插件的 `configResolved`，所以首次启动时插件写出的文件对它无效（`enforce: 'pre'` 也无法提前到 `config` 之前）。替代方案见本包 README 的 FAQ，不要把这条当成可以靠插件修的问题。

## 测试

测试在仓库根 `test/`（不在包内），`watcher.test.ts` mock 了 `c12`、`paths`、`defaults`、`writer`，`plugin.test.ts` mock 了 `watcher`，`load-config.test.ts` 用真实 c12 + 临时目录验证 `.env` 加载。改动本包时同时跑根目录的 `pnpm test` 与 `pnpm typecheck`。

## 约定

本包源码 JSDoc 用英文；`packages/types` 的中文 JSDoc 不适用于本包。
