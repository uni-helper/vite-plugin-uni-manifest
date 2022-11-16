import fs from "fs";
import { resolve } from "path";
import { normalizePath, Plugin } from "vite";
import { ManifestConfig } from "./config/types";
import { ResolvedOptions, UserOptions } from "./types";
import { loadConfig } from "unconfig";
import { getManifestConfigSourcePaths, logger } from "./utils";

export * from "./config";

const resolveOptions = (userOptions: UserOptions): ResolvedOptions => {
  return {
    outDir: "src",
    ...userOptions,
  };
};

const loadUserManifestConfig = async (_options: ResolvedOptions) => {
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
    process.exit(-1);
  }
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
  await createOrUpdateManifest(options);
  return {
    name: "vite-plugin-uni-manifest",
    enforce: "pre",
    async configureServer({ watcher }) {
      const manifestConfigSourcePaths = await getManifestConfigSourcePaths();
      watcher.add(manifestConfigSourcePaths);
      logger.debug("Added watcher", manifestConfigSourcePaths);
      watcher.on("change", async (path) => {
        if (manifestConfigSourcePaths.includes(normalizePath(path))) {
          await createOrUpdateManifest(options);
          logger.info(`Manifest config has changed, restarting...`);
        }
      });
    },
  };
};

export default VitePluginUniManifest;
