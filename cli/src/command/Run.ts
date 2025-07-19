import Logger from "@hexagonal/utils/logger";

// import { ARGV_FLAG_DEBUG, ARGV_FLAG_DOCTOR, ARGV_FLAG_WATCH, LIBRARY_NAME } from "../constant";

import { initChangeDetector, watcherProcess } from "../service/run/Watcher";
// import { getActiveFlag } from "../service/Arguments";
// import { compileTypeScript, readTsConfig } from "../service/TypeScriptCompiler";
// import { readEnvironment, setDefaultEnvironmentValues } from "../service/Environment";
import { launch } from "../service/run/RunLauncher";
// import { readTargetPackageJson } from "../service/common/Package";
import { doctorServerProcess, initDoctorServer } from "../service/run/Doctor";
import { CompilationError, CompilationErrorData } from "../exception/CompilationError";
import { ARGV_COMMAND_RUN } from "../constant/argv";
import { MainFile } from "../model/MainFile";
import { Command, FlagData } from "@hexagonal/utils/lib/model/integration";

// const log = new Logger(ARGV_COMMAND_RUN, LIBRARY_NAME);

export default async (mainFile: MainFile | undefined, command: Command, flagsData: FlagData[], environmentValues: Map<string, string>) => {
    const init = performance.now();
    console.log("🚀 ~ Run command started");

    // const debugIsActive = getActiveFlag(ARGV_FLAG_DEBUG) !== -1;
    // const watchIsActive = getActiveFlag(ARGV_FLAG_WATCH) !== -1;
    // const doctorIsActive = getActiveFlag(ARGV_FLAG_DOCTOR) !== -1;

    // readTsConfig();
    // readTargetPackageJson();
    // // readEnvironment();

    // // setDefaultEnvironmentValues(); // requiere cargar las addons para añadir sus valores por defecto

    // try {
    //     await compileTypeScript();
    // } catch (error) {
    //     throw new CompilationError(error as CompilationErrorData)
    // }

    // if (watchIsActive && !watcherProcess) {
    //     initChangeDetector();
    // }

    // if (doctorIsActive && !doctorServerProcess) {
    //     initDoctorServer();
    // }

    // launch(); // requiere cargar las addons para heredar los argv de los addons

    // const end = performance.now();

    // console.log();
    // log.info(`compilation completed successfully. Time: ${((end - init) / 1000).toFixed(2)} s`);

    // if (debugIsActive) {
    //     log.info(`Debug mode Active`);
    // }
    // if (watchIsActive) {
    //     log.info(`Watch mode Active`);
    // }
    // if (doctorIsActive) {
    //     log.info(`Doctor mode Active`);
    // }
}