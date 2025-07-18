import { Command, FlagData } from "@hexagonal/utils/lib/model/integration";
import { MainFile } from "../../model/MainFile";

export const launch = (mainFile: MainFile | undefined, command: Command, flagsData: FlagData[], environmentValues: Map<string, string>) => {
    console.log("🚀 ~ launch ~ command:", command)
    if('path' in command) {
        const fn = require(command.path).default;
        fn();
    }
    
}