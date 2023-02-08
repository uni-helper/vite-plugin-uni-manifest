import { Plugin } from "vite";
import { UserOptions } from "./types";
import { ManifestContext } from "./context";

export * from "./config";

ManifestContext.CheckManifestJsonFile();

export const VitePluginUniManifest = async (
  userOptions: UserOptions = {}
): Promise<Plugin> => {
  let ctx = new ManifestContext(userOptions);
  await ctx.updateManifestJSON();
  return {
    name: "vite-plugin-uni-manifest",
    enforce: "pre",
    async configResolved() {
      ctx.setupWatcher();
    },
  };
};

export default VitePluginUniManifest;
