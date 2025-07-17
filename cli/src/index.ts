#!/usr/bin/env node

import { Command, FlagData } from "@hexagonal/utils/lib/model/integration";
import { BIN_NAME } from "./constant";
import { MissingArgumentError } from "./exception";
import { Addon } from "./model/Addon";
import { Dependency } from "./model/Dependency";
import { readAddons } from "./service/common/Addon"
import { getMainFile, readArguments } from "./service/common/Arguments";
import { getCommand, getEnvDefaultValue, readConfigurations } from "./service/common/Configuration";
import { readEnvironments } from "./service/common/Environment";
import { launch } from "./service/common/Launcher";
import { getDependencies } from "./service/common/Package";

const dependencies: Dependency[] = getDependencies();
const addons: Addon[] = readAddons(dependencies);
readConfigurations(addons);

const argv = process.argv.slice(2);

if (argv.length === 0) {
    throw new MissingArgumentError(`${BIN_NAME} [COMMAND]`, `At least one parameter is required, use "${BIN_NAME} help" for instructions.`);
}

const action: string = argv[0];
const command: Command | undefined = getCommand(action);

if (!command) {
    throw new MissingArgumentError('command', `The command "${action}" is not valid. Use "${BIN_NAME} help" for instructions.`);
}

argv.shift(); // Remove the action from argv

const mainFile = getMainFile(argv);

console.log(argv);
console.log(command);
console.log(mainFile);

const flagsData: FlagData[] = readArguments(command, argv);
const envDefaultValues: Map<string, string> = getEnvDefaultValue();

const environmentValues: Map<string, string> = readEnvironments(envDefaultValues);

launch(command, flagsData, environmentValues);
