import { NODE_ENV, DEVELOPMENT } from '@hexagonal/utils/constant';

export const BIN_NAME = 'hexa';
export const LIBRARY_NAME = 'cli';

/** Path */
export const CLI_PACKAGE_PATH = `${__dirname}/../..`;
export const DEFAULT_BANNER_PATH = `${__dirname}/banner.txt`;

export const INTEGRATION_CONFIGURATION_PATH = '/lib/integration/configuration.js';

export const DEFAULT_ENV_FILE_PATH = '.env';

/** ARGV */

/** * Comando run */
export const ARGV_COMMAND_RUN = 'run';

export const ARGV_FLAG_DOCTOR = '--doctor'; // Activa el doctor, "--doctor"
export const ARGV_FLAG_WATCH = '--watch'; // Activa el modo de deteccion de cambios, "--watch"

export const ARGV_FLAG_DEBUG = '--debug'; // Activa el modo debug, "--debug". Muestra los log.debug en consola y archivo de log
export const ARGV_FLAG_ENV = '--env'; // Configura el archivo de entorno "--env=<file>"

/** comando package */
export const ARGV_COMMAND_PACKAGE = 'package';

export const ARGV_FLAG_MINIFY = '--minify'; // activa el minificado, "--minify"

/** Flag --help */

export const ARGV_COMMAND_HELP = 'help';

/** Flag version */

export const ARGV_FLAG_VERSION = '--version';
export const ARGV_FLAG_VERSION_SHORT = '-v';

/** 
 * Flags que aplican a cada comando o accion 
 * 
 * * Los argumentos heredados de otros ADDONS son validos siempre
 * 
 * ['*'] ==> Significa que GUARDA en el valor flags de Arguments.ts todos los flags que se encuentran en process.argv.
 * ['-'] ==> Significa que IGNORA ningun flag en el valor flags de Arguments.ts.
 * TODO: ['N'] ==> Significa que solo envia los N flags del principio del arra de process.argv.
 */
export const ARGV_ACTIONS_FLAGS: { [key: string]: string[]  } = {
    [ARGV_COMMAND_HELP]: ['*'],
    [ARGV_FLAG_VERSION]: ['-'],
    [ARGV_FLAG_VERSION_SHORT]: ['-'],
    [ARGV_COMMAND_RUN]: [ARGV_FLAG_DOCTOR, ARGV_FLAG_WATCH, ARGV_FLAG_DEBUG, ARGV_FLAG_ENV],
    [ARGV_COMMAND_PACKAGE]: [ARGV_FLAG_MINIFY]
}

/**
 * Argumentos heredados del cli al TargetApp
 */
export const INHERITED_ARGV = [
    ARGV_FLAG_DEBUG
]

/** Environment */
export const BANNER_MODE = 'BANNER_MODE'; // estado del banner, values: [true, false]

/** Environment values */
export const DEFAULT_ENV_VALUES = {
    [NODE_ENV]: DEVELOPMENT,
    [BANNER_MODE]: 'false',
}
