import { ChildProcess, fork } from "node:child_process";
import path from "node:path";

import { ROOT_PATH } from "@hexagonal/utils/constant";
import { PackageModel } from '@hexagonal/utils/cli';
import Logger from "@hexagonal/utils/logger";

// import { BANNER_MODE, CLI_PACKAGE_PATH, INHERITED_ARGV, LIBRARY_NAME } from "../constant";
import { readJsonFile } from "../util/File";

// import { envFileData } from "./Environment";
import { displayBanner } from "./Banner";
import { buildOutDir, buildRootDir } from "./TypeScriptCompiler";
import { targetAppPath } from "./Arguments";
// import { argvInheritedAddons } from "./Addon";
import { initIpc } from "./Ipc";


// const log = new Logger('Launcher', LIBRARY_NAME);
export let rootProcess: ChildProcess | undefined;

export const relaunch = () => {
    if (rootProcess) {
        killProcess();
    }

    launch(true);
}

/**
 * TODO: mostrar el PID del proceso lanzado por el logger
 */
export const launch = (reload: boolean = false) => {
    let appPath = path.join(ROOT_PATH, buildOutDir);
    const mainPath = targetAppPath.replace('.ts', '.js');
    mainPath.split('/').forEach((item) => {
        if (item !== '.' && !buildRootDir.includes(item)) {
            appPath = path.join(appPath, item);
        }
    });

    // Los ARGV heredados del cli al TargetApp
    // const rootProcessExecArgv: string[] = [];
    // const argvInherited: string[] = [
    //     ...INHERITED_ARGV, // argumentos heredados declarados en el cli
    //     ...argvInheritedAddons
    // ];

    // argvInherited.forEach((argv: string) => {
    //     const exitsArgv = process.argv.find((a) => a.includes(argv));
    //     if (exitsArgv) {
    //         rootProcessExecArgv.push(exitsArgv);
    //     }
    // });

    // lanzamiento
    // try {
    //     log.dev(`Target app path: ${appPath}`);
    //     log.dev(`inherited arguments: ${argvInherited}`);

    //     rootProcess = fork(appPath, rootProcessExecArgv, {
    //         env: { ...Object.fromEntries(envFileData) }
    //     });

    //     initIpc(rootProcess);

    //     rootProcess.stderr?.on("data", (data) => {
    //         console.log("🚀 ~ rootProcess.on ~ data:", data.toString())
    //         //   if (!data.toString().includes("DeprecationWarning")) {
    //         //     event.reply("server-log", "Error al iniciar el servidor");
    //         //     event.reply("server-status", "error");
    //         //   }
    //     });
    // } catch (error) {
    //     console.error(error);
    // }

    // if (Boolean(envFileData.get(BANNER_MODE)) && !reload) {
    //     const packageJson = readJsonFile(CLI_PACKAGE_PATH, 'package.json') as PackageModel;

    //     displayBanner([
    //         { key: 'App Name', value: packageJson.name },
    //         { key: 'Version', value: packageJson.version },
    //         { key: 'Cli Version', value: packageJson.version },
    //     ]);
    // }
}

export const killProcess = () => {
    if (rootProcess) {
        rootProcess.kill();
        rootProcess = undefined;
    }
}
