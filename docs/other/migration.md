# 迁移指南

## 从 0.6 升级到 0.7

`pnpm up @uni-helper/vite-plugin-uni-manifest` 即可。这一版把 Node 下限抬到 `^22.22.2`、`^24.15.0` 或 `>=26.0.0`，还在 Node 20 上的项目要先升级运行时。选项新增了两个，默认关闭，普通用法不需要改代码。下面是会影响已有代码的改动。

### 新增 prepare()

uni-app 先读、插件后写的问题有了内置方案：

```ts
export default defineConfig(async () => ({
  plugins: [
    await UniManifest().prepare(),
    Uni(),
  ],
}))
```

没有这个需求时可以不用，行为与之前一致。

### 新增 dotenv 与 replaceArrays

```ts
UniManifest({
  dotenv: true,
  replaceArrays: true,
})
```

两个都默认关闭。打开 `dotenv` 后 `.env` 系列变量会写进 `process.env`，打开 `replaceArrays` 后数组字段整体替换默认值。

### writeManifestJson 的第二个参数变了

0.6 接收用户选项，0.7 接收已经解析好的输出规格。`minify` 在这一步折成 `indent: 0`。

0.6 的写法：

```ts
import { writeManifestJson } from '@uni-helper/vite-plugin-uni-manifest'

writeManifestJson(config, { minify: true, indent: 2, eol: '\n' })
```

0.7 的写法：

```ts
import { resolveOutputSpec, writeManifestJson } from '@uni-helper/vite-plugin-uni-manifest'

const spec = resolveOutputSpec({
  cwd: process.cwd(),
  minify: true,
  indent: 2,
  eol: '\n',
  insertFinalNewline: false,
})
writeManifestJson(config, spec)
```

只在直接用这个函数时需要改，插件调用不受影响。

### 相对 outDir 以 cwd 为基准

0.6 里相对路径基于 `process.cwd()`，0.7 改成基于 `cwd`（默认 `VITE_ROOT_DIR`）。单包项目两者相同，monorepo 里从仓库根执行命令时会写到应用目录下。

```ts
UniManifest({ cwd: 'packages/app', outDir: 'src' }) // 写入 packages/app/src
```

### 找不到配置文件时不再写文件

0.6 会用内置默认配置写一份 `manifest.json`，覆盖项目里手写的内容。0.7 找不到 `manifest.config.*` 时跳过写入。

### 输出目录会自动创建

`outDir` 指向不存在的目录时，0.6 抛 `ENOENT`，0.7 先建目录再写。

### 非对象配置会抛错

配置导出的内容不是对象（比如数组）时，0.7 抛 `TypeError` 并保留原文件。0.6 会把它直接写进 `manifest.json`。

### 移除的导出

| 移除 | 替代 |
| --- | --- |
| `ensureManifestJsonExists()` | 无。它没有调用方，且会写出空 `manifest.json` |
| `ManifestContext` | `createManifestWatcher()` |
| `debug`（入口导出） | 无。日志对象改为内部使用，`DebugType` 仍然导出 |

### 路径模块移除

`src/paths.ts` 的 `resolveManifestJsonPath` 并入 writer，成为内部函数。它本来就没有从入口导出，用到的项目很少。
