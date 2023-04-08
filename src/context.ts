import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import { loadConfig } from "unconfig";
import { normalizePath } from "vite";
import { ManifestConfig } from "./config";
import { resolveOptions } from "./options";
import { UserOptions, ResolvedOptions } from "./types";
import { getManifestConfigSourcePaths, logger } from "./utils";
import chokidar from "chokidar";

export class ManifestContext {
  static resolvedOutput = normalizePath(
    resolve(process.env.UNI_INPUT_DIR as string, "manifest.json")
  );
  rawOptions: UserOptions;
  options: ResolvedOptions;
  watcher?: chokidar.FSWatcher;
  constructor(userOptions: UserOptions) {
    this.rawOptions = userOptions;
    this.options = resolveOptions(userOptions);
    logger.debug("create context", this);
  }

  async loadUserManifestConfig(_options: ResolvedOptions) {
    logger.debug("load user configure");
    const { config } = await loadConfig({
      sources: [
        {
          files: "manifest.config",
        },
      ],
      merge: false,
    });
    if (!config) {
      logger.error(
        "Can't found manifest.config, please create manifest.config.(ts|mts|cts|js|cjs|mjs|json)"
      );
    }
    logger.debug("Loaded user config", config);
    return config as ManifestConfig | undefined;
  }

  async updateManifestJSON() {
    logger.debug("Update manifest.json");
    const config = await this.loadUserManifestConfig(this.options);
    if (!config) return;
    writeFileSync(
      ManifestContext.resolvedOutput,
      JSON.stringify(config, null, this.options.minify ? 0 : 2),
      {
        encoding: "utf-8",
      }
    );
    logger.debug("Writed manifest.json", config);
  }

  async createWatcherConfig() {
    logger.debug("Crete watcher configure");
    const paths = await getManifestConfigSourcePaths();
    return {
      paths,
      handler: async (path: string) => {
        if (paths.includes(normalizePath(path))) {
          await this.updateManifestJSON();
        }
      },
    };
  }

  static CheckManifestJsonFile() {
    logger.debug("Check if the manifest.json exists");
    if (!existsSync(ManifestContext.resolvedOutput)) {
      logger.debug("Does not exist, create it");
      writeFileSync(ManifestContext.resolvedOutput, "{}");
    }
  }

  async setupWatcher() {
    const { paths, handler } = await this.createWatcherConfig();
    logger.debug("Setup watcher", paths);
    this.watcher = chokidar.watch(paths);
    this.watcher.on("change", handler);
  }

  async closeWatcher() {
    this.watcher?.close();
  }
}
