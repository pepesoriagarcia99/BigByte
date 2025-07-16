#!/usr/bin/env node

import { readAddons } from "./service/common/Addon"
import { readArguments } from "./service/common/Arguments";
import { readConfigurations } from "./service/common/Configuration";
import { readTargetPackageJson } from "./service/common/Package";

readTargetPackageJson();
readAddons();
readConfigurations();

readArguments();
// configEnvironment();

/**
 * Pensando:
 * 
 * ejemplo, se tienen que declarar sobre los nuevo flags de los addons un detalle o instrucciones para el comando help
 * 
 * HACER:
 * los addons no podran crear nuevos comandos (por ahora)
 * los nuevos flags que declaren los addons simplemente guardaran los valores en los env. Es decir todo lo declarado sera post ejecucion de cli
 */

// if(action === ARGV_COMMAND_HELP) {
//     helpExec();
// }
// else if(action === ARGV_FLAG_VERSION || action === ARGV_FLAG_VERSION_SHORT) {
//     versionExec();
// }
// else if(action === ARGV_COMMAND_RUN) {
//     runExec();
// }
// else if(action === ARGV_COMMAND_PACKAGE) {
//     packageExec();
// }
// else {
//     console.error(`Unknown action: ${action}`);
// }
