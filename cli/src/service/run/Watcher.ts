import path from "path";
import chokidar, { FSWatcher } from 'chokidar';
import { ROOT_PATH } from "@hexagonal/utils/constant";
import Logger from "@hexagonal/utils/logger";

import { LIBRARY_NAME } from "../../constant";

import { readAddons } from "../common/Addon";
import { relaunch } from "./RunLauncher";
// import { envFileName, envFilePath } from "../common/Arguments";
import { buildRootDir } from "../common/TypeScriptCompiler";
// import { readEnvironment, setDefaultEnvironmentValues } from "./Environment";


/**
 * TODO: Meter el watcher en un worker para que no bloquee el hilo principal, (pensarlo bien)
 * TODO: Mostrar el PID del watcher en el log
 */


const log = new Logger('Watcher', LIBRARY_NAME);
export let watcherProcess: FSWatcher;

export const initChangeDetector = () => {
  const watchPaths: string[] = [
    path.join(ROOT_PATH, buildRootDir, '**', '*.{ts,js}'),
    path.join(ROOT_PATH, 'package.json')
  ];

  // if (envFilePath) {
  //   watchPaths.push(envFilePath);
  // }

  /** 
   * TODO: revisar como de interesante es monitorizar los paquetes instalados o desinstalados 
  */
  // const watcherNodeModulesPath = path.join(rootPath, 'node_modules', '**', '*.{ts,js}');

  watcherProcess = chokidar.watch(watchPaths, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100
    }
  });

  const refresh = async (filePath: string) => {
    const relativePath = path.relative(ROOT_PATH, filePath);
    log.debug(`[${new Date().toLocaleTimeString()}] Modification: ${relativePath}`);

    // if (filePath.includes('package.json')) {
    //   // si hay nuevas dependencias, se vuelven a cargar las addons
    //   // y se recargan los valores por defecto de las variables de entorno
    //   readAddons();

    //   readEnvironment();
    //   setDefaultEnvironmentValues();
    // }
    // else if (filePath.includes(envFileName)) {
    //   // si hay nuevas dependencias, se vuelven a cargar las addons
    //   // y se recargan los valores por defecto de las variables de entorno
    //   readAddons();

    //   readEnvironment();
    //   setDefaultEnvironmentValues();
    // }
    // else {
    //   try {
    //     await compileTypeScript(filePath);
    //   } catch (error: any) {
    //     log.error('Modification error: ', error);
    //   }
    // }

    relaunch();
  }

  watcherProcess.on('change', refresh);
  watcherProcess.on('add', refresh);
  watcherProcess.on('unlink', refresh);
  watcherProcess.on('error', error => {
    log.error(`Monitoring error: ${error}`);
  });
}
