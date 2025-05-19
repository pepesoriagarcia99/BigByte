#!/usr/bin/env node

import { ARGV_COMMAND_HELP, ARGV_COMMAND_PACKAGE, ARGV_COMMAND_RUN, ARGV_FLAG_VERSION, ARGV_FLAG_VERSION_SHORT } from "./constant";

import { readArguments, action } from "./service/Arguments";

import helpExec from "./command/Help";
import versionExec from "./command/Version";
import runExec from "./command/Run";
import packageExec from "./command/Package";
import { readAddons } from "./service/Addons";

readAddons();
readArguments();

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
