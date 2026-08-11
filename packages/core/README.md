# @uni-helper/vite-plugin-uni-manifest

<a href="https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-manifest"><img src="https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-manifest" alt="NPM version"></a>

使用 TypeScript 编写 `uni-app` 的 `manifest.json`。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/vite-plugin-uni-manifest"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-manifest
```

## 使用

```ts
// vite.config.mts
import Uni from '@uni-helper/plugin-uni'
// 或者
// import dcloudioUni from '@dcloudio/vite-plugin-uni'
// const Uni = dcloudioUni.default || dcloudioUni
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniManifest(), // 需要在 Uni() 之前调用
    Uni(),
  ],
})
```

创建 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)`，然后用 TypeScript 编写你的 `manifest.json`。[👉 manifest.config.ts 示例](../../playground/manifest.config.ts)

```ts
// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  // 属性参考 manifest.json，理论上一比一对齐
  // 如果发现没有对齐，请提交 issue，谢谢 🙏
  // https://uniapp.dcloud.net.cn/collocation/manifest.html
  name: 'my-project',
})
```

## 插件配置

`UniManifest()` 支持以下选项定义行为：

```ts
interface UserOptions {
  /**
   * 是否压缩生成的 manifest.json
   * @default false
   * @since 0.1.3
   */
  minify?: boolean

  /**
   * 是否在 manifest.json 末尾插入换行
   * @default false
   * @since 0.2.9
   */
  insertFinalNewline?: boolean

  /**
   * 生成的 manifest.json 的缩进
   * 接受空格数量或字符串（如 `'\t'`）
   * 当 `minify` 为 `true` 时被忽略
   * @default 2
   * @since 0.5.2
   */
  indent?: number | string

  /**
   * 生成的 manifest.json 的换行符
   * @default '\n'
   * @since 0.5.2
   */
  eol?: '\n' | '\r\n'

  /**
   * 解析配置的工作目录
   * 插件会从该目录查找 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)` 文件
   * 未设置该环境变量时回退到 `process.cwd()`
   * @default process.env.VITE_ROOT_DIR
   * @since 0.2.12
   */
  cwd?: string

  /**
   * 生成 `manifest.json` 的输出目录。
   * 未设置时使用 uni-app 的 `UNI_INPUT_DIR`（或 `cwd/src`）。
   * 相对路径会基于 `process.cwd()` 解析。
   * @default undefined
   * @since 0.5.1
   */
  outDir?: string

  /**
   * 是否启用调试日志
   * 设为 `true` 启用全部类别，指定字符串则只启用单一类别（如 `'writer'`）
   * 可选类别：`options`（选项解析）/ `config`（配置加载与变更检测）/ `writer`（文件写入）
   * 等效于 `DEBUG=vite-plugin-uni-manifest:*` 环境变量
   * @default false
   * @since 0.5.7
   */
  debug?: boolean | DebugType
}
```

## FAQ

### 这个插件写入配置晚于 uni-app 读取配置，导致无法正常运行

`@dcloudio/vite-plugin-uni` 在 Vite 的 `config` 钩子里通过 `parseManifestJsonOnce` 读取 `manifest.json`，而本插件在更晚的 `configResolved` 钩子里才写入。

`config` 早于 `configResolved`，所以即便本插件设置了 `enforce: 'pre'`，也只能在 `configResolved` 内部抢先，无法早于 `config` 钩子。`parseManifestJsonOnce` 结果被 `once` 缓存，首次读取后即固定，后续写入对 uni-app 无效。

核心矛盾是时序：必须在 uni-app 进程启动前把 `manifest.json` 生成好。以下按推荐度排序给出方案。

#### 方案一（推荐）：使用 [@uni-helper/unh](https://uni-helper.cn/unh/auto-generate)

`unh` 在调用 `uni dev/build` 前用 `unconfig` 加载 `manifest.config.ts` 并写盘，再 spawn 子进程，天然解决时序问题。

```jsonc
// package.json
{
  "scripts": {
    "dev": "unh dev",
    "build": "unh build"
  }
}
```

```ts
// unh.config.ts
import { defineConfig } from '@uni-helper/unh'

export default defineConfig({
  autoGenerate: {
    manifest: true, // 在 dev/build 前自动生成 manifest.json
  },
})
```

#### 方案二：自行编写脚本，在 uni 命令前生成

用一个独立脚本加载 `manifest.config.ts`、写入 `src/manifest.json`，再用 `&&` 串联到 `uni` 命令前。脚本在 uni 进程之外运行，与 Vite 钩子时序无关。

```bash
pnpm i -D c12 tsx
```

```ts
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
// scripts/generate-manifest.ts
import { loadConfig } from 'c12'

// 与本插件内部实现保持一致：c12 + defaultConfig 合并
const defaultManifestConfig = defineManifestConfig({
  // ...参考本插件 defaultManifestConfig，或按需精简
})

const { config } = await loadConfig({
  cwd: process.cwd(),
  name: 'manifest',
  defaultConfig: defaultManifestConfig,
  rcFile: false,
  packageJson: false,
})

// UNI_INPUT_DIR 由 vite-plugin-uni 注入，独立脚本中不可用，这里硬编码默认输入目录
// monorepo 或自定义 input dir 时改为对应路径
const outPath = resolve(process.cwd(), 'src/manifest.json')
writeFileSync(outPath, JSON.stringify(config, null, 2))
```

```jsonc
// package.json
{
  "scripts": {
    "dev:h5": "tsx scripts/generate-manifest.ts && uni",
    "build:mp-weixin": "tsx scripts/generate-manifest.ts && uni build -p mp-weixin"
  }
}
```

> 说明：`manifest.config.ts` 中的热更新监听在本方案下不生效。脚本只生成一次。开发期间修改 `manifest.config.ts` 需重新执行脚本（或重启 dev server）。本插件仍可作为 Vite 插件保留，用于处理 `manifest.config.ts` 的运行时变更；首次启动的正确性由本脚本兜底。

#### 方案三：用 npm `predev`/`prebuild` 钩子

```jsonc
// package.json
{
  "scripts": {
    "predev": "tsx scripts/generate-manifest.ts",
    "prebuild": "tsx scripts/generate-manifest.ts",
    "dev": "uni",
    "build": "uni build"
  }
}
```

> 说明：npm 会在执行 `dev`/`build` 前自动运行同名 `pre*` 脚本。pnpm 10 同样会运行用户自定义的 `predev`/`prebuild`（注意 `enable-pre-post-scripts` 只影响 install 阶段的生命周期脚本，不影响 `run` 时的 `pre*`/`post*`）。比方案二的 `&&` 串联更隐式，开发者可能意识不到 `predev` 被自动触发，排查问题时需额外留意，故排序靠后。

### 修改 `manifest.config.ts` 后，需要重启 dev server 才能生效

Vite 只会因 `vite.config`、`.env` 文件变更而自动重启服务；而 `manifest.json` 不在 Vite 的模块图中（uni-app 直接从磁盘读取它），变更既不会触发 HMR，也不会触发整页刷新。更关键的是，uni-app 只在启动时读取一次 `manifest.json` 并做进程级缓存（见上一节），即便是 `vite build --watch` 触发的重建，使用的仍是旧配置。因此修改配置后请重启 dev server（或重新构建）。

如需自动化，可以用文件监听工具监视生成的 `manifest.json`，在变化时自动重启或重新构建 uni 进程。新进程会重新读取 manifest，不存在缓存问题。

#### 使用 nodemon 自动重启 dev server

```bash
pnpm i -D nodemon
```

```jsonc
// package.json
{
  "scripts": {
    // 只监视生成的 manifest.json，变化时重启 uni dev 进程
    "dev:h5": "nodemon -e json --watch src/manifest.json --exec \"uni\"",
    "dev:mp-weixin": "nodemon -e json --watch src/manifest.json --exec \"uni -p mp-weixin\""
  }
}
```

> 说明：`--watch` 限定只监视 `manifest.json`，其他源码变更仍走 Vite 自身 HMR，不会被 nodemon 重启；`-e json` 确保 `.json` 后缀被 nodemon 识别。若重启过于频繁，可加 `--delay 1` 防抖。nodemon 重启前会先终止旧进程，适合常驻的 dev server。

#### 使用 chokidar-cli 监视重新构建

```bash
pnpm i -D chokidar-cli
```

```jsonc
// package.json
{
  "scripts": {
    // 启动时先构建一次（--initial），之后 manifest.json 每次变化都重新构建
    "build:mp-weixin:watch": "chokidar \"src/manifest.json\" --initial -c \"uni build -p mp-weixin\""
  }
}
```

> 说明：chokidar-cli 的 `-c` 只会在每次事件时执行命令、不会终止之前的进程，因此适合有限的构建命令（每次构建都是新进程，天然规避缓存问题）；常驻 dev server 请用 nodemon。若你的输入目录不是 `src`，请相应调整监视路径；需要防抖时可加 `-d 100`（毫秒）。

### 支持 monorepo 吗？

支持。在 monorepo 场景下，uni-app 应用通常位于某个子包目录（如 `packages/app`）中，而命令可能从仓库根目录执行。此时可以通过两个选项调整本插件的路径解析：

- `cwd`：指定插件查找 `manifest.config.*` 的目录。默认为 `process.env.VITE_ROOT_DIR`（由 `@dcloudio/vite-plugin-uni` 注入），该环境变量不存在时回退到 `process.cwd()`。若配置文件不在默认目录，显式指向应用所在目录即可。
- `outDir`：指定 `manifest.json` 的输出目录。默认写入 uni-app 的输入目录（`UNI_INPUT_DIR`，通常是应用的 `src/`）。相对路径基于 `process.cwd()` 解析。

```ts
// vite.config.mts
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniManifest({
      cwd: resolve(__dirname, 'packages/app'), // 从该目录查找 manifest.config.ts
      // 如需把 manifest.json 输出到其他位置，再配置 outDir
      // outDir: resolve(__dirname, 'packages/app/src'),
    }),
  ],
})
```

> 注意：uni-app 在运行时会从其默认输入目录读取 `manifest.json`，自定义 `outDir` 后请确保后续流程能正确读取到该文件，否则可能导致 uni-app 无法解析 manifest。

## 开发

### 前置条件

- [Node.js](https://nodejs.org/) 24
- [pnpm](https://pnpm.io/) 10.34.5

### 常用命令

```bash
# 安装依赖（在 monorepo 根目录执行）
pnpm install

# 构建所有包
pnpm build

# 仅构建 core 包
pnpm -C packages/core build

# 运行测试（在 monorepo 根目录执行）
pnpm test

# 测试覆盖率
pnpm coverage

# 代码检查
pnpm lint

# 类型检查
pnpm type-check

# 启动 playground 调试
pnpm play:mp-weixin
pnpm play:h5
```

### 测试

测试文件位于 monorepo 根目录的 `test/` 目录下，使用 [Vitest](https://vitest.dev/) 运行：

```shell
test/
├── watcher.test.ts     createManifestWatcher 深模块（选项解析 + 监听 + 写入 + debug 日志开关）
├── plugin.test.ts      插件工厂形状 + 生命周期
├── writer.test.ts      writeManifestJson 格式化 + 幂等写入 + ensureManifestJsonExists
├── paths.test.ts       resolveManifestJsonPath 路径解析
├── defaults.test.ts    默认配置结构
└── config.test.ts      defineManifestConfig 类型断言
```

`watcher.test.ts` 和 `plugin.test.ts` 使用 `vi.mock` 隔离 `c12` 和文件系统，确保测试不依赖真实环境。

### 项目结构

```shell
vite-plugin-uni-manifest/
├── packages/
│   ├── core/           插件核心逻辑
│   ├── types/          manifest.json TypeScript 类型定义
│   └── schema/         JSON Schema（从 types 自动生成）
├── test/               测试文件
├── playground/         示例 uni-app 项目
└── pnpm-workspace.yaml
```

## 架构

插件围绕一个深模块（`watcher.ts`）构建，对外暴露极简 interface，内部吸收所有编排逻辑：

```
index.ts          Vite 插件入口，调用 createManifestWatcher
watcher.ts        深模块 — 选项解析 + c12 配置监听 + 文件写入
writer.ts         文件 I/O — writeManifestJson / ensureManifestJsonExists
paths.ts          路径解析 — resolveManifestJsonPath
defaults.ts       静态数据 — 默认 manifest 配置
config.ts         defineManifestConfig 辅助函数 + 类型重导出
logger.ts         分类调试日志（debug 包）
types.ts          公共类型定义（Options / UserOptions / ResolvedOptions / DebugType）
```

### 模块依赖关系

```shell
index.ts
  └─ watcher.ts（深模块）
       ├─ writer.ts ── paths.ts
       ├─ defaults.ts
       └─ logger.ts（writer.ts 同样使用）
```

### 插件生命周期

插件通过 Vite 的生命周期钩子驱动，顺序如下：

1. **`configResolved`**（异步）— 调用 `createManifestWatcher(userOptions)`：启动 c12 监听 → 执行首次写入（`manifest.json` 不存在时在此创建，配置加载失败则不会写入占位文件）
2. **运行时** — c12 检测到 `manifest.config.ts` 变更 → `onUpdate` 回调 → `writeManifestJson()` 写入文件
3. **`buildEnd`** — 调用 `watcher.unwatch()` 停止 c12 监听

### 关键设计决策

- **深模块设计**：`createManifestWatcher()` 是唯一的核心 interface，选项解析、配置监听、文件写入全部作为 implementation 细节隐藏其后。测试直接通过这一个 interface 验证端到端行为。
- **无导入时副作用**：所有文件系统操作（路径解析、文件写入）都在插件生命周期内执行，而非模块导入时。这使得模块可独立测试。
- **路径解析为函数**：`resolveManifestJsonPath()` 每次调用重新计算路径，依赖 `process.env.UNI_INPUT_DIR`（由 `@dcloudio/vite-plugin-uni` 注入），不缓存。
- **c12 配置加载**：通过 `c12` 的 `watchConfig` 实现 `manifest.config.ts` 的监听和热更新，支持 `.ts`、`.mts`、`.js`、`.json` 等格式。
- **幂等写入**：`writeManifestJson` 在内容未变化时跳过写入，避免触发下游不必要的重编译。
- **分类调试日志**：通过 `debug` 选项或 `DEBUG=vite-plugin-uni-manifest:*` 环境变量按类别（`options`/`config`/`writer`）输出日志，默认关闭，不影响正常输出。
