import Logger from "@hexagonal/utils/logger";
import { CommandData } from "@hexagonal/utils/integration";

import { ARGV_COMMAND_RUN } from "../constant/argv";
import { LIBRARY_NAME } from "../constant";

const log = new Logger(ARGV_COMMAND_RUN, LIBRARY_NAME);

export default async (commandData: CommandData) => {
    const init = performance.now();
    console.log("🚀 ~ Run command started: ", commandData);

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