import { Plugin } from "vite";
import { UserOptions } from "./types";
import { ManifestContext } from "./context";

export * from "./config";

ManifestContext.CheckManifestJsonFile();

export const VitePluginUniManifest = async (
  userOptions: UserOptions = {}
): Promise<Plugin> => {
  const ctx = new ManifestContext(userOptions);
  ctx.setup();
  return {
    name: "vite-plugin-uni-manifest",
    enforce: "pre",
    buildEnd: () => ctx.unwatch(),
  };
};

export default VitePluginUniManifest;
