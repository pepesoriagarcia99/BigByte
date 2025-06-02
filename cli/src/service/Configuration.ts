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

const writeValue = <T>(key: keyof T, currentFlag: T, newFlag: T, defulatValue?: any): void => {
    const currentValue = currentFlag[key];
    const newValue = newFlag[key];

    if (!currentValue && newValue) {
        currentFlag[key] = newValue;
    }
    else if (!currentValue && !newValue && defulatValue !== undefined) {
        currentFlag[key] = defulatValue;
    }
    else if (currentValue && newValue && currentValue !== newValue) {
        throw {
            key,
            newValue,
            currentValue
        } as WriteValueError;
    }
}

const processCommand = (inputCommands: Command[]) => {
    inputCommands.forEach((command) => {
        const existingCommand: Command | undefined = commands.find(c => c.name === command.name);
        if (existingCommand) {
            try {
                writeValue<Command>('path', existingCommand, command);
                writeValue<CommandWithHelp>('description', existingCommand as CommandWithHelp, command as CommandWithHelp);
                writeValue<CommandWithHelp>('detail', existingCommand as CommandWithHelp, command as CommandWithHelp);
            } catch (err: any) {
                throw new ConfigurationError(err.key, `An attempt is being made to overwrite ${err.currentValue} by ${err.newValue} in key ${err.key} at command ${command.name}.`)
            }

            existingCommand.flags?.forEach((flag: Flag) => {
                const existingFlag: Flag | undefined = existingCommand.flags?.find((f: Flag) => f.name === flag.name);

                if (existingFlag) {
                    try {
                        writeValue<Flag>('inherit', existingFlag, flag, true);
                        writeValue<Flag>('env', existingFlag, flag);
                        writeValue<Flag>('type', existingFlag, flag);

                        writeValue<FlagWithHelp>('description', existingFlag as FlagWithHelp, flag as FlagWithHelp);
                        writeValue<FlagWithHelp>('detail', existingFlag as FlagWithHelp, flag as FlagWithHelp);
                    } catch (err: any) {
                        throw new ConfigurationError(err.key, `An attempt is being made to overwrite ${err.currentValue} by ${err.newValue} in key ${err.key} at flag ${flag.name} in command ${command.name}.`)
                    }
                } else {
                    flag.inherit = (flag.inherit === undefined || flag.inherit === null) ? true : flag.inherit;

                    existingCommand.flags?.push(flag);
                }
            });
        } else {
            commands.push(command);
        }
    });
}

const processConfiguration = (configuration: Configuration) => {
    if (configuration.environment) {
        processEnvironment(configuration.environment);
    }

    if (configuration.commands) {
        processCommand(configuration.commands);
    }
}

const checkCommands = () => {
    // commands.some((command) => {
    //     // todos los comandos tienen que tener path, description y detail
    //     if (!command.path || !command.description || !command.detail) {
    //         // log.error(`Command ${command.name} is missing required properties: path, description, or detail.`);
    //         // throw new Error(`Command ${command.name} is missing required properties: path, description, or detail.`);



    //         return true && flags; // Stop processing if a command is invalid
    //     }
    // });

    //     // todos los flags de cada comando tienen que tener name, type, inherit, description y detail
    // const flags = command.flags?.some((flag) => {
    //     if (!flag.name || !flag.type || flag.inherit === undefined || !flag.description || !flag.detail) {
    //         log.error(`Flag ${flag.name} in command ${command.name} is missing required properties: name, type, inherit, description, or detail.`);
    //         return true; // Stop processing if a flag is invalid
    //     }
    // });
}

export const configure = () => {
    processConfiguration(cliConfiguration);

    addons.forEach((addon) => {
        if (addon.configuration) {
            processConfiguration(addon.configuration);
        }
    });

    checkCommands();
}

export const getCommand = (name: string): Command | undefined => {
    return commands.find(c => c.name === name);
}

export const getAllFlags = (): Flag[] => {
    const flags: Flag[] = [];

    // TODO: Necesito que el objeto del flag siempre sea la declaracion, nunca la herencia.
    // commands.forEach((command) => {
    //     if (command.flags) {
    //         command.flags.forEach((flag) => {
    //             if (flags.find(f => f.name === flag.name)) {
    //                 flags.push(flag);
    //             }
    //         });
    //     }
    // });

    return flags;
}
