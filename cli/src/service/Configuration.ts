import Logger from "@hexagonal/utils/logger";
import { Command, Configuration, Environment, Flag } from "@hexagonal/utils/lib/model/integration";

import { LIBRARY_NAME } from "../constant";
import { addons } from "./Addon";
import cliConfiguration from "../integration/configuration";


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

const processCommand = (inputCommands: Command[]) => {
    inputCommands.forEach((command) => {
        const existingCommand = commands.find(c => c.name === command.name);
        if (existingCommand) {
            existingCommand.flags?.forEach((flag: Flag) => {
                const existingFlag = existingCommand.flags?.find((f: Flag) => f.name === flag.name);

                if(existingFlag) {
                    // ver que parametros se actualizan o no                    
                } else {
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
