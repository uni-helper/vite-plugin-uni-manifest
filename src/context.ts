import { existsSync, writeFileSync } from "node:fs";
import { resolveOptions } from "./options";
import { ResolvedOptions, UserOptions } from "./types";
import { defaultManifestConfig, manifestJsonPath } from "./constant";
import { watchConfig } from "c12";
import { UserManifestConfig } from "./config";

export class ManifestContext {
  options: ResolvedOptions;
  unwatch!: () => Promise<void>;
  constructor(options: UserOptions) {
    this.options = resolveOptions(options);
  }

  async setup() {
    const { config, unwatch } = await watchConfig<UserManifestConfig>({
      name: "manifest",
      defaults: defaultManifestConfig,
      onUpdate: (config) => {
        ManifestContext.WriteManifestJSON(config, this.options.minify);
      },
    });
    ManifestContext.WriteManifestJSON(config, this.options.minify);

    this.unwatch = unwatch;
  }

  static WriteManifestJSON(config: any = {}, minify: boolean = false) {
    writeFileSync(
      manifestJsonPath,
      JSON.stringify(config, null, minify ? 0 : 2)
    );
  }

  static CheckManifestJsonFile() {
    if (!existsSync(manifestJsonPath)) {
      ManifestContext.WriteManifestJSON();
    }
  }
}
