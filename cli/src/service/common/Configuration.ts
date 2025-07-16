import Logger from "@hexagonal/utils/logger";
import { Command, Configuration, Environment, Flag, FlagType } from "@hexagonal/utils/integration";

import cliConfiguration from "../../integration/configuration";

import { LIBRARY_NAME } from "../../constant";
import { addons } from "./Addon";
import { ConfigurationError } from "../../exception/ConfigurationError";


const log = new Logger('Configuration', LIBRARY_NAME);

export const evnDefaultValues = new Map<string, string>();

export const commands: Command[] = [];
const newCommands: Command[] = [];
const commandDeclaration: Command[] = [];


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

const processConfiguration = (configuration: Configuration) => {
    if (configuration.environment) {
        processEnvironment(configuration.environment);
    }

    if (configuration.newCommands) {
        // se comprueba que no se añadan comandos con el mismo nombre
        configuration.newCommands.forEach((newCommand) => {
            const index = newCommands.findIndex(c => c.name === newCommand.name);

            if (index !== -1) {
                throw new ConfigurationError(newCommand.name, `Command with name ${newCommand.name} already exists. Cannot add new command with the same name.`);
            }

            newCommands.push(newCommand);
        });
    }

    if (configuration.commandDeclaration) {
        commandDeclaration.push(...configuration.commandDeclaration);
    }
}

const checkCommandFlags = (command: Command) => {
    // compruebo los flags del comando
    if ('flags' in command) {
        if (Array.isArray(command.flags)) {
            command.flags.forEach((flag) => {
                if (!flag.name || !flag.type) {
                    throw new ConfigurationError(command.name, `Flag in command ${command.name} must have a name and type.`);
                }

                if (!Object.values(FlagType).includes(flag.type)) {
                    throw new ConfigurationError(command.name, `Flag in command ${command.name} has an invalid type: ${flag.type}.`);
                }
            });
        } else if (typeof command.flags === 'string') {
            if (!['-', '*'].includes(command.flags)) {
                throw new ConfigurationError(command.name, `Flag in command ${command.name} must be either '-' or '*' or Flag[].`);
            }
        }
    }
}

const combinedCommands = () => {
    newCommands.forEach((newCommand) => {
        // compruebo los datos del comando
        if ('path' in newCommand && !newCommand.path) {
            throw new ConfigurationError(newCommand.name, `Command with name ${newCommand.name} must have a path to its implementation.`);
        }

        if ('description' in newCommand && !newCommand.description || 'detail' in newCommand && !newCommand.detail) {
            throw new ConfigurationError(newCommand.name, `Command with name ${newCommand.name} must have a description and detail.`);
        }

        checkCommandFlags(newCommand);

        commands.push(newCommand);
    });

    commandDeclaration.forEach((declaredCommand) => {
        const index = commands.findIndex(c => c.name === declaredCommand.name);

        if (index === -1) {
            throw new ConfigurationError(declaredCommand.name, `Command with name ${declaredCommand.name} does not exist. Cannot declare flags for a non-existing command.`);
        }

        // si el comando es string pero la declaracion es un array
        if (Array.isArray(declaredCommand.flags) && typeof commands[index].flags === 'string') {
            throw new ConfigurationError(declaredCommand.name, `Command with name ${declaredCommand.name} already has a flag declared as '-' or '*'. Cannot add new flags.`);
        }

        // si el comando tiene flags pero la declaracion es un string
        if(Array.isArray(commands[index].flags) && typeof declaredCommand.flags === 'string') {
            throw new ConfigurationError(declaredCommand.name, `Command with name ${declaredCommand.name} already has flags declared as an array. Cannot add a string flag.`);
        }

        checkCommandFlags(declaredCommand);

        /**
         * si ambos son array, se combinan
         * 
         * * El caso de que el new sea undefined y se intente declara un flag: string --> no se contempla. EL flag: string SOLO SE DECLARA EN CREACION DE COMANDO
         */
        console.log("🚀 ~ commandDeclaration.forEach ~ declaredCommand.flags:", declaredCommand.flags)
        console.log("🚀 ~ commandDeclaration.forEach ~ commands[index].flags:", commands[index].flags)
        if(Array.isArray(commands[index].flags) && Array.isArray(declaredCommand.flags)) {
            (commands[index].flags as Flag[]).push(...declaredCommand.flags);
            console.log("🚀 ~ commandDeclaration.forEach ~ commands[index]:", commands[index])

        }
    });
};

export const readConfigurations = () => {
    processConfiguration(cliConfiguration);

    addons.forEach((addon) => {
        if (addon.configuration) {
            processConfiguration(addon.configuration);
        }
    });

    combinedCommands();
}

export const getCommand = (name: string): Command | undefined => {
    return commands.find(command => command.name === name);
}
