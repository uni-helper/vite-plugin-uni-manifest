import fs from "fs";
import { resolve } from "path";
import { normalizePath, Plugin, ResolvedConfig } from "vite";
import { ManifestConfig, UserManifestConfig } from "./config/types";
import { ResolvedOptions, UserOptions } from "./types";
import { loadConfig } from "unconfig";
import { logger } from "./utils";
import { blue, red } from "colorette";

export * from "./config";

const resolveOptions = (userOptions: UserOptions): ResolvedOptions => {
  return {
    entry: "manifest.config",
    outDir: "src",
    extension: "ts",
    ...userOptions,
  };
};

const loadUserManifestConfig = async (options: ResolvedOptions) => {
  const { config } = await loadConfig({
    sources: [
      {
        files: options.entry,
        extensions: [options.extension],
      },
    ],
    merge: false,
  });
  return config as ManifestConfig;
};

const createOrUpdateManifest = async (options: ResolvedOptions) => {
  const config = await loadUserManifestConfig(options);
  const outputName = "manifest.json";

  const resolvedOutput = normalizePath(
    resolve(process.cwd(), options.outDir, outputName)
  );
  fs.writeFileSync(resolvedOutput, JSON.stringify(config), {
    encoding: "utf-8",
  });
};

export const VitePluginUniManifest = async (
  userOptions: UserOptions = {}
): Promise<Plugin> => {
  const options = resolveOptions(userOptions);
  logger.debug("Resolved options", options);

  const manifestConfigSource = normalizePath(
    resolve(process.cwd(), `${options.entry}.${options.extension}`)
  );
  if (fs.existsSync(manifestConfigSource)) {
    await createOrUpdateManifest(options);
  } else {
    logger.error(
      `Cant't find ${red(options.entry + "." + options.extension)} in ${red(
        process.cwd()
      )}, ignore`
    );
    return {
      name: "vite-plugin-uni-manifest",
      enforce: "pre",
    };
  }
  return {
    name: "vite-plugin-uni-manifest",
    enforce: "pre",
    configureServer({ watcher, restart }) {
      watcher.add(manifestConfigSource);
      logger.debug("Added watcher", manifestConfigSource);
      watcher.on("change", (path) => {
        if (normalizePath(path) === manifestConfigSource) {
          restart();
          logger.info(`Manifest config has changed, restarting...`);
        }
      });
    },
  };
};

export default VitePluginUniManifest;
