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

const writeValue = <T>(key: keyof T, currentObj: T, newObject: T, defulatValue?: any): void => {
    console.log("🚀 ~ key:", key)
    const currentValue = currentObj[key];
    console.log("🚀 ~ currentValue:", currentValue)
    const newValue = newObject[key];
    console.log("🚀 ~ newValue:", newValue)

    if (!currentValue && newValue) {
        currentObj[key] = newValue;
    }
    else if (!currentValue && !newValue && defulatValue !== undefined) {
        currentObj[key] = defulatValue;
    }
    else if (currentValue && newValue && currentValue !== newValue) {
        throw {
            key,
            newValue,
            currentValue
        } as WriteValueError;
    }
}
const processFlag = (command: Command) => {
    command.flags?.forEach((flag: Flag) => {
        const existingFlag: Flag | undefined = command.flags?.find((f: Flag) => f.name === flag.name);

        if (existingFlag) {
            try {
                // es una declaracion de herencia
                if (!flag.type && !flag.env) {
                    existingFlag.inherit = true;
                }

                writeValue<Flag>('env', existingFlag, flag);
                writeValue<Flag>('type', existingFlag, flag);
                writeValue<FlagWithHelp>('description', existingFlag as FlagWithHelp, flag as FlagWithHelp);
                writeValue<FlagWithHelp>('detail', existingFlag as FlagWithHelp, flag as FlagWithHelp);
            } catch (err: any) {
                throw new ConfigurationError(err.key, `An attempt is being made to overwrite ${err.currentValue} by ${err.newValue} in key ${err.key} at flag ${flag.name} in command ${command.name}.`)
            }
        } else {
            flag.inherit = (flag.inherit === undefined || flag.inherit === null) ? true : flag.inherit;
            command.flags?.push(flag);
        }
    });
}

const processCommand = (processCommands: Command[]) => {
    processCommands.forEach((command) => {
        const existingCommand: Command | undefined = commands.find(c => c.name === command.name);
        console.log("🚀 ~ processCommands.forEach ~ existingCommand:", existingCommand)
        if (existingCommand) {
            try {
                writeValue<Command>('path', existingCommand, command);
                writeValue<CommandWithHelp>('description', existingCommand as CommandWithHelp, command as CommandWithHelp);
                writeValue<CommandWithHelp>('detail', existingCommand as CommandWithHelp, command as CommandWithHelp);
            } catch (err: any) {
                throw new ConfigurationError(err.key, `An attempt is being made to overwrite ${err.currentValue} by ${err.newValue} in key ${err.key} at command ${command.name}.`)
            }

            processFlag(existingCommand);
        } else {
            console.log("🚀 ~ processCommands.forEach ~ command:", command)
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
    const missingKeys = (keys: string[], obj: any) =>  keys.filter(key => !(key in obj));

    const checkCommandKeys = (command: Command): boolean => {
        if('name' in command && 'path' in command && 'description' in command && 'detail' in command) {
            return true;
        } else {
            const missing = missingKeys(['name', 'path', 'description', 'detail'], command);
            throw new ConfigurationError('Command', `The command ${command.name} is missing required keys: ${missing.join(', ')}.`);
        }
    };

    const checkFlagKeys = (flag: Flag): boolean => {
        if('name' in flag && 'type' in flag && 'inherit' in flag && 'description' in flag && 'detail' in flag) {
            return true;
        } else {
            throw new ConfigurationError('Flag', `The flag ${flag.name} is missing required keys.`);
        }
    };

    commands.every((command: Command, index: number) => {
        if (Boolean(command.flags) && Array.isArray(command.flags) && command.flags.length > 0) {
            return checkCommandKeys(command) && command.flags.every((flag: Flag, index: number) => checkFlagKeys(flag));
        } else {
            return checkCommandKeys(command);
        }
    });
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

    commands.forEach((command) => {
        if (command.flags) {
            command.flags.forEach((flag) => {
                if (flags.find(f => f.name === flag.name)) {
                    flags.push(flag);
                }
            });
        }
    });

    return flags;
}
