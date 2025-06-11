
import path from "node:path";
import { existsSync } from "node:fs";

import Logger from "@hexagonal/utils/logger";
import { ROOT_PATH, LIBRARY_ORGANIZATION_NAME } from "@hexagonal/utils/constant";

import { INTEGRATION_CONFIGURATION_PATH, LIBRARY_NAME } from "../../constant";
import { getInstalledVersion, packageJson } from "./Package";
import { MissingConfigurationError } from "../../exception";

import { Addon } from "../../model/Addon";
import { Configuration } from "@hexagonal/utils/lib/model/integration";


const log = new Logger('AddonService', LIBRARY_NAME);

export let addons: Addon[] = [];

export const readAddons = (): void => {
    if (!packageJson.dependencies) {
        throw new MissingConfigurationError('package.json', 'dependencies')
    }

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
                const configuration: Configuration = require(integrationConfigPath);
                if (configuration) {
                    addon.configuration = configuration;
                }
            } else {
                log.dev(`File ${integrationConfigPath} does not exist in addon ${name}.`)
            }

            addons.push(addon);
        }
    });
}
