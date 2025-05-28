
import path from "node:path";
import { ROOT_PATH, LIBRARY_ORGANIZATION_NAME } from "@hexagonal/utils/constant";
import { INTEGRATION_CONFIGURATION_PATH } from "../constant";

import { getInstalledVersion, packageJson } from "./Package";
import { MissingConfigurationError } from "../exception";
import { existsSync } from "node:fs";
import { Addon } from "../model/Addon";


export let addons: Addon[] = [];
export let argvInheritedAddons: string[] = [];

export const readAddons = () => {
    if (!packageJson.dependencies) {
        throw new MissingConfigurationError('package.json', 'dependencies')
    }

    const setArgvInheritedAddons: Set<string> = new Set<string>();

    Object.keys(packageJson.dependencies).forEach((dependency: string) => {
        if (dependency.startsWith(LIBRARY_ORGANIZATION_NAME)) {
            const name = dependency.replace(`${LIBRARY_ORGANIZATION_NAME}/`, '');
            const instaledDependency = getInstalledVersion(dependency);

            const addon: Addon = {
                name: name,
                version: instaledDependency?.version ?? '0.0.0',
                path: path.join(ROOT_PATH, "node_modules", LIBRARY_ORGANIZATION_NAME, name),
            };

            const integrationConfigPath = path.join(addon.path, INTEGRATION_CONFIGURATION_PATH);
            if (existsSync(integrationConfigPath)) {
                const configuration = require(integrationConfigPath);

                // if (configuration?.INHERITED_ARGV) {
                //     addon.INHERITED_ARGV = configuration.INHERITED_ARGV;
                //     configuration.INHERITED_ARGV.forEach((inheritedArgv: string) => setArgvInheritedAddons.add(inheritedArgv));
                // }

                // if (configuration?.DEFAULT_ENV_VALUES) {
                //     addon.DEFAULT_ENV_VALUES = configuration.DEFAULT_ENV_VALUES;
                // }
            }
            addons.push(addon);
        }
    });
    
    argvInheritedAddons = Array.from(setArgvInheritedAddons);
}
