import Logger from "@hexagonal/utils/logger";
import { Command, Configuration, Environment, Flag, FlagType, HelpBase } from "@hexagonal/utils/lib/model/integration";

import { LIBRARY_NAME } from "../constant";
import { addons } from "./Addon";
import cliConfiguration from "../integration/configuration";
import { ConfigurationError } from "../exception/ConfigurationError";
import { WriteValueError } from "../model/WriteValueError";
import { CommandWithHelp, FlagWithHelp } from "../model/Integration";


const log = new Logger('Configuration', LIBRARY_NAME);

export const evnDefaultValues = new Map<string, string>();
export const commands: Command[] = [];

const processEnvironment = ({ DEFAULT_VALUES }: Environment) => {
    if (DEFAULT_VALUES) {
        Object.entries(DEFAULT_VALUES).forEach(([key, value]) => {
            if (!evnDefaultValues.has(key)) {
                evnDefaultValues.set(key, String(value));
            } else {
                log.warn(`Environment variable ${key} is already set to ${evnDefaultValues.get(key)}. Skipping update to ${value}.`);
            }
        });
    }
}

// const writeValue = <T>(key: keyof T, currentObj: T, newObject: T, defulatValue?: any): void => {
//     const currentValue = currentObj[key];
//     const newValue = newObject[key];

//     if (!currentValue && newValue) {
//         currentObj[key] = newValue;
//     }
//     else if (!currentValue && !newValue && defulatValue !== undefined) {
//         currentObj[key] = defulatValue;
//     }
//     else if (currentValue && newValue && currentValue !== newValue) {
//         throw {
//             key,
//             newValue,
//             currentValue
//         } as WriteValueError;
//     }
// }
// const processFlag = (command: Command) => {
//     if (Array.isArray(command.flags) && command.flags.length > 0) {
//         const flags: Flag[] = command.flags;
//         flags.forEach((flag: Flag) => {
//             const existingFlag: Flag | undefined = flags.find((f: Flag) => f.name === flag.name);

//             if (existingFlag) {
//                 try {
//                     // es una declaracion de herencia
//                     if (!flag.type && !flag.env) {
//                         existingFlag.inherit = true;
//                     }

//                     writeValue<Flag>('env', existingFlag, flag);
//                     writeValue<Flag>('type', existingFlag, flag);
//                     writeValue<FlagWithHelp>('description', existingFlag as FlagWithHelp, flag as FlagWithHelp);
//                     writeValue<FlagWithHelp>('detail', existingFlag as FlagWithHelp, flag as FlagWithHelp);
//                 } catch (err: any) {
//                     throw new ConfigurationError(err.key, `An attempt is being made to overwrite ${err.currentValue} by ${err.newValue} in key ${err.key} at flag ${flag.name} in command ${command.name}.`)
//                 }
//             } else {
//                 flag.inherit = (flag.inherit === undefined || flag.inherit === null) ? true : flag.inherit;
//                 flags.push(flag);
//             }
//         });
//     } else {
//         command.flags
//     }
// }

const processCommand = (processCommands: Command[]) => {
    // processCommands.forEach((command) => {
    //     const existingCommand: Command | undefined = commands.find(c => c.name === command.name);
    //     if (existingCommand) {
    //         try {
    //             writeValue<Command>('path', existingCommand, command);
    //             writeValue<CommandWithHelp>('description', existingCommand as CommandWithHelp, command as CommandWithHelp);
    //             writeValue<CommandWithHelp>('detail', existingCommand as CommandWithHelp, command as CommandWithHelp);
    //         } catch (err: any) {
    //             throw new ConfigurationError(err.key, `An attempt is being made to overwrite ${err.currentValue} by ${err.newValue} in key ${err.key} at command ${command.name}.`)
    //         }

    //         processFlag(existingCommand);
    //     } else {
    //         commands.push(command);
    //     }
    // });
}

const processConfiguration = (configuration: Configuration) => {
    if (configuration.environment) {
        processEnvironment(configuration.environment);
    }

    if (configuration.commands) {
        processCommand(configuration.commands);
    }
}

export const configure = () => {
    processConfiguration(cliConfiguration);

    addons.forEach((addon) => {
        if (addon.configuration) {
            processConfiguration(addon.configuration);
        }
    });
}

export const getCommand = (name: string): Command | undefined => {
    return commands.find(c => c.name === name);
}

export const getAllFlags = (): Flag[] => {
    const flags: Flag[] = [];

    commands.forEach((command) => {
        if (command.flags && Array.isArray(command.flags)) {
            command.flags.forEach((flag: Flag) => {
                if (flags.find(f => f.name === flag.name)) {
                    flags.push(flag);
                }
            });
        }
    });

    return flags;
}
