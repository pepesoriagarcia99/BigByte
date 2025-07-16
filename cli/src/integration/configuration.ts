import path from "node:path";

import { DEVELOPMENT, NODE_ENV, ENV_DEBUG_MODE, ARGV_FLAG_DEBUG } from "@hexagonal/utils/constant";
import { Configuration } from "@hexagonal/utils/integration";

import { ENV_BANNER_MODE, ENV_DOCTOR_MODE, ENV_WATCH_MODE } from "../constant/environment";
import { ARGV_COMMAND_HELP, ARGV_COMMAND_PACKAGE, ARGV_COMMAND_RUN, ARGV_FLAG_DOCTOR, ARGV_FLAG_ENV, ARGV_FLAG_MINIFY, ARGV_FLAG_VERSION, ARGV_FLAG_VERSION_SHORT, ARGV_FLAG_WATCH } from "../constant/argv";


/**
 * 
 * TODO: test de ejemplo, a esperar de integrar completamente
 * ISSUE: integrar argv en env para que puedan ser usados luego en value store
 */
/**
* TODO: comprabar si las addons estan declarando flags repetidos. lo tienen que hacer el servicio de addons
*/
export default {
    environment: {
        DEFAULT_VALUES: {
            [NODE_ENV]: DEVELOPMENT,
            [ENV_BANNER_MODE]: 'false',
            [ENV_DOCTOR_MODE]: 'false',
            [ENV_WATCH_MODE]: 'false'
        }
    },
    newCommands: [
        {
            name: ARGV_FLAG_VERSION,
            path: path.join(__dirname, '../command/Version.ts'),
            description: 'Displays the current version of the CLI.',
            detail: 'Displays the current version of the CLI. This command is useful to check if you are using the latest version of the CLI or to report issues with a specific version.',
            flags: '-',
        },
        {
            name: ARGV_FLAG_VERSION_SHORT,
            path: path.join(__dirname, '../command/Version.ts'),
            description: 'Displays the current version of the CLI.',
            detail: 'Displays the current version of the CLI. This command is useful to check if you are using the latest version of the CLI or to report issues with a specific version.',
            flags: '-',
        },
        {
            name: ARGV_COMMAND_HELP,
            path: path.join(__dirname, '../command/Help.ts'),
            description: 'Displays the help information for the CLI commands.',
            detail: 'Displays the help information for the CLI commands. This command is useful to understand how to use the CLI and its available commands and flags.',
            flags: '*',
        },
        {
            name: ARGV_COMMAND_RUN,
            path: path.join(__dirname, '../command/Run.ts'),
            description: 'Runs the application with the specified configuration.',
            detail: 'Runs the application with the specified configuration. This command is useful to start the application in development mode or production mode, depending on the environment configuration.',
            flags: [
                {
                    name: ARGV_FLAG_DOCTOR,
                    env: ENV_DOCTOR_MODE,
                    type: 'switch',
                    description: 'Activates the doctor.',
                    detail: 'Activates the doctor. The doctor is a tool that checks the application configuration and environment for potential issues and provides recommendations to fix them.'
                },
                {
                    name: ARGV_FLAG_WATCH,
                    env: ENV_WATCH_MODE,
                    type: 'switch',
                    description: 'Activates the change detection mode.',
                    detail: 'Activates the change detection mode. This mode is useful for development, as it automatically detects changes in the source code and restarts the application to reflect those changes.'
                },
                {
                    name: ARGV_FLAG_DEBUG,
                    env: ENV_DEBUG_MODE,
                    type: 'switch',
                    description: 'Activates debug mode.',
                    detail: 'Activates debug mode. This mode is useful for development, as it provides additional logging and debugging information to help identify issues in the application.'
                },
                {
                    name: ARGV_FLAG_ENV,
                    type: 'file',
                    description: 'Configures the environment file.',
                    detail: 'Configures the environment file. If not declared, use the .env located in the project root. If not declared, use the .env located in the project root.'
                }
            ],
        },
        {
            name: ARGV_COMMAND_PACKAGE,
            path: path.join(__dirname, '../command/Package.ts'),
            description: 'Generates a package of the application.',
            detail: 'Generates a package of the application. This command is useful to create a distributable version of the application, which can be deployed to production or shared with others.',
            flags: [
                {
                    name: ARGV_FLAG_MINIFY,
                    type: 'switch',
                    description: 'Activates minification',
                    detail: 'Activates minification. This flag is useful to reduce the size of the generated package by removing unnecessary whitespace and comments from the code.'
                }
            ],
        }
    ]
} as Configuration;
