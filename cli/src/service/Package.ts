import { PackageModel, PackageModelLock, PackageModelLockDependency } from '@hexagonal/utils/cli';
import { ROOT_PATH } from "@hexagonal/utils/constant";

import { MissingConfigurationError } from "../exception";
import { readJsonFile } from "../util/File";

export let packageJson: PackageModel;
export let packageJsonLock: PackageModelLock;

export const getInstalledVersion = (packageName: string): PackageModelLockDependency | undefined => {
    if (!packageJsonLock.packages) {
        throw new MissingConfigurationError('package-lock.json', 'packages')
    }

    const dependencyName: string | undefined = Object.keys(packageJsonLock.packages).find((dependency: string) => dependency.includes(packageName));

    if (!dependencyName) {
        return undefined;
    }

    const dependency: PackageModelLockDependency = packageJsonLock.packages[dependencyName];

    return dependency;
}

export const readTargetPackageJson = (): void => {
    packageJson = readJsonFile<PackageModel>(ROOT_PATH, 'package.json');
    packageJsonLock = readJsonFile<PackageModelLock>(ROOT_PATH, 'package-lock.json');
}
