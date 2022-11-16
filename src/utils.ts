import consola from "consola";
import fg from "fast-glob";

export const logger = consola.create({
  defaults: {
    tag: "vite-plugin-uni-manifest",
  },
});

export const getManifestConfigSourcePaths = async () => {
  return await fg("manifest.config.(ts|mts|cts|js|cjs|mjs|json)", {
    deep: 0,
    onlyFiles: true,
    absolute: true,
  });
};
