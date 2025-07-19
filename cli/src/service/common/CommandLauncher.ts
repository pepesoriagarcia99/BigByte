import { Command, FlagData } from "@hexagonal/utils/lib/model/integration";
import { MainFile } from "../../model/MainFile";
import { ConfigurationError } from "../../exception/ConfigurationError";
import { Addon } from "../../model/Addon";

export const launch = (mainFile: MainFile | undefined, command: Command, flagsData: FlagData[], environmentValues: Map<string, string>, addons: Addon[]) => {
    if('path' in command) {
        const commandDependency = require(command.path.replace('.ts', '.js'));

        if(!commandDependency.default || typeof commandDependency.default !== 'function') {
            throw new ConfigurationError('command', `The command at path ${command.path} does not export a default function.`);
        }

        commandDependency.default(mainFile, command, flagsData, environmentValues, addons);
    }
    
}