import path from "node:path";
import { ROOT_PATH } from "@hexagonal/utils/constant";

import { Command, Configuration, Environment, Flag } from "@hexagonal/utils/lib/model/integration";

import { MissingArgumentError } from "../../exception/MissingArgumentError";

import { BIN_NAME, DEFAULT_ENV_FILE_PATH } from "../../constant";
import { existsSync } from "node:fs";
import { MissingFileError } from "../../exception/MissingFileError";
import { MalformedArgumentError } from "../../exception";
// import { argvInheritedAddons } from "./Addons";
import { getCommand } from "./Configuration";

/** argv data */
export let action: string;
export let flags: string[] = [];
export let targetAppPath: string;
export let targetAppFileName: string;

/** Environment */
export let envFilePath: string;
export let envFileName: string;

/**
 * COnfigura y valida el path de las variables de entorno
 */
// const configureEnvironment = (argv: string[]) => {
//     // validacion del argumento --env=<file>
//     const argvEnvIndex = getActiveFlag(ARGV_FLAG_ENV);

//     // archivo enviroment por defecto
//     if (argvEnvIndex === -1) {
//         const envPath = path.join(ROOT_PATH, DEFAULT_ENV_FILE_PATH);

//         if (existsSync(envPath)) {
//             envFilePath = envPath;
//             envFileName = path.basename(envPath);
//         }
//     }
//     // archivo enviroment custom por parametros
//     else {
//         const argvEnvFilePath = argv[argvEnvIndex].split('=')[1];

//         if (!argvEnvFilePath) {
//             throw new MissingArgumentError(ARGV_FLAG_ENV, 'The --env argument requires a target path "--env=<file>"');
//         }

//         const envPath = path.join(ROOT_PATH, argvEnvFilePath);

//         if (!existsSync(envPath)) {
//             throw new MissingFileError(argvEnvFilePath, envPath);
//         }

//         envFilePath = envPath;
//         envFileName = path.basename(envPath);
//     }
// }

/**
 * Configura y valida el path del archivo a ejecutar
 */
const configureTargetApp = (argv: string[]) => {
    targetAppPath = argv[argv.length - 1];
    targetAppFileName = path.basename(targetAppPath);

    if (!targetAppFileName || !targetAppFileName.includes('.ts')) {
        throw new MissingArgumentError('[MAIN_FILE]', 'The path of the application to be executed has not been provided.');
    }
}

// export const getActiveFlag = (flag: string): number => {
//     return flags.findIndex(f => f === flag);
// }

// export const readArguments = () => {
//     const argv = process.argv.slice(2);

//     if (argv.length === 0) {
//         throw new MissingArgumentError(`${BIN_NAME} [ACTION] [APP_PATH]`, 'No action has been provided to execute.');
//     }

//     const validActions = Object.keys(ARGV_ACTIONS_FLAGS);
//     action = argv[0];

//     if (!validActions.includes(action)) {
//         throw new MissingArgumentError('action', `The action "${action}" is not valid. Valid actions are: ${validActions.join(', ')}`);
//     }

//     const validActionFlags: string[] = ARGV_ACTIONS_FLAGS[action];

//     // el comando aplica a todos los flags, USADO POR COMANDO HELP
//     if (validActionFlags.length === 1 && validActionFlags[0] === '*') {
//         flags = argv.slice(1).filter(arg => arg.startsWith('--'));
//     }
//     else if (validActionFlags.length === 1 && validActionFlags[0] === '-') {
//         // ignora todos los flags, USADO POR COMANDO VERSION
//     } else {
//         flags = argv.filter(arg => arg.startsWith('--'));

//         const processFlags = argv.slice(1).filter(arg => arg.startsWith('--'));
//         processFlags.concat(argvInheritedAddons);

//         const invalidFlags = flags.filter(flag => !validActionFlags.includes(flag));

//         if (invalidFlags.length > 0) {
//             throw new MalformedArgumentError('flags', `The flags "${invalidFlags.join(', ')}" are not valid for the action "${action}". Valid flags are: ${validActionFlags.join(', ')}`);
//         }

//         // Los flags son validos para la accion
//         flags = processFlags;

//         configureTargetApp(argv);
//         configureEnvironment(argv);
//     }
// }

export const readArguments = () => {
    const argv = process.argv.slice(2);

    if (argv.length === 0) {
        throw new MissingArgumentError(`${BIN_NAME} [COMMAND]`, `At least one parameter is required, use "${BIN_NAME} help" for instructions.`);
    }

    const command: Command | undefined = getCommand(argv[0]);

    if (!command) {
        throw new MissingArgumentError('command', `The command "${command}" is not valid. Use "${BIN_NAME} help" for instructions.`);
    }

    configureTargetApp(argv);
    // argv.pop();

    // no se pueden añadir flags repetidos
    // comprobar si el tipo del flag es correcto [value, file]
    // comprobar los tipos especiales [*, -]
    // if(command.flags) {
    //     if() {
            
    //     }
    // }

    
}

