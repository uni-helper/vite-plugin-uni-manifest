# 插件选项

`UniManifest(options)` 接收一个可选的配置对象，所有字段都是可选的。

```ts
UniManifest({
  minify: true,
  dotenv: true,
  outDir: 'dist/manifest',
})
```

## 基础选项

| 选项 | 类型 | 默认值 | 起始 | 说明 |
| --- | --- | --- | --- | --- |
| `minify` | `boolean` | `false` | v0.1.3 | 压缩生成的 `manifest.json` |
| `insertFinalNewline` | `boolean` | `false` | v0.2.9 | 在文件末尾插入一个换行 |
| `indent` | `number \| string` | `2` | v0.5.2 | 缩进，接受空格数或字符串（如 `'\t'`）。`minify` 为 `true` 时忽略 |
| `eol` | `'\n' \| '\r\n'` | `'\n'` | v0.5.2 | 换行符 |

## 路径选项

| 选项 | 类型 | 默认值 | 起始 | 说明 |
| --- | --- | --- | --- | --- |
| `cwd` | `string` | `process.env.VITE_ROOT_DIR`，没有时 `process.cwd()` | v0.2.12 | 从这里查找 `manifest.config.*` |
| `outDir` | `string` | `UNI_INPUT_DIR`，没有时 `cwd/src` | v0.5.1 | `manifest.json` 的输出目录。相对路径以 `cwd` 为基准，目录不存在会自动创建 |

`cwd` 和 `outDir` 一起解决 monorepo 的路径问题：

```ts
UniManifest({
  cwd: 'packages/app',
  outDir: 'src',
})
```

## 调试

```ts
UniManifest({
  debug: true, // 打开全部类别
})
```

| 值 | 说明 |
| --- | --- |
| `false` | 默认，不输出日志 |
| `true` | 打开 `options`、`config`、`writer` 三个类别 |
| `'options' \| 'config' \| 'writer'` | 只打开一个类别 |

等效于设置 `DEBUG=vite-plugin-uni-manifest:*` 环境变量。插件打开日志后不会改动你自己的 `process.env.DEBUG` 值。

## dotenv

`dotenv: true` 让 `manifest.config.ts` 能读到 `.env` 系列文件。

```ts
UniManifest({ dotenv: true })
```

读取的文件和 Vite 一致：

| 文件 | 说明 |
| --- | --- |
| `.env` | 所有模式共用 |
| `.env.local` | 本地覆盖，通常不提交 |
| `.env.{mode}` | 当前 mode 专用 |
| `.env.{mode}.local` | 当前 mode 的本地覆盖 |

后读的覆盖先读的。解析交给 Vite 的 `loadEnv`，用空前缀，变量名不受 `VITE_` 限制。`process.env` 里已有的值优先于文件。

`mode` 是 Vite 的 mode，`vite` 命令下是 `development`，`build` 下是 `production`，`--mode` 可以改。文件只在启动时读一次，改完 `.env` 要重启。

## replaceArrays

`replaceArrays: true` 让数组字段整体替换默认配置。

```ts
UniManifest({ replaceArrays: true })
```

默认关闭时，c12 用 `defu` 合并，数组会拼接：默认配置里的数组在前，你写的接在后面。打开后，你写的数组直接替换默认配置里的同名数组。

对其它类型没有影响：对象照常深合并，标量以你写的为准。

## 选项从哪来

选项先经过一次解析补齐默认值，再折成 writer 需要的 `OutputSpec`（目录、缩进、换行符、末尾换行）。`minify` 在这一步变成 `indent: 0`，所以 writer 不需要知道 `minify`。类型定义见[编程接口](/api/programmatic#类型)。
