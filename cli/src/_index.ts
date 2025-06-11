import { DEVELOPMENT, NODE_ENV, ENV_DEBUG_MODE, ARGV_FLAG_DEBUG } from "@hexagonal/utils/constant";
import { Command, Configuration, Flag } from "@hexagonal/utils/integration";

import { ENV_BANNER_MODE, ENV_DOCTOR_MODE, ENV_WATCH_MODE } from "./constant/environment";
import path from "node:path";
import { ARGV_COMMAND_HELP, ARGV_COMMAND_PACKAGE, ARGV_COMMAND_RUN, ARGV_FLAG_DOCTOR, ARGV_FLAG_ENV, ARGV_FLAG_MINIFY, ARGV_FLAG_VERSION, ARGV_FLAG_VERSION_SHORT, ARGV_FLAG_WATCH } from "./constant/argv";
import { CommandWithHelp } from "./model/Integration";


const cliConfiguration: Configuration = {
    environment: {
        DEFAULT_VALUES: {
            [NODE_ENV]: DEVELOPMENT,
            [ENV_BANNER_MODE]: 'false',
            [ENV_DOCTOR_MODE]: 'false',
            [ENV_WATCH_MODE]: 'false'
        }
    },
    commands: [
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
            name: 'run',
            path: path.join(__dirname, '../command/Run.ts'),
            description: 'Runs the application with the specified configuration.',
            detail: 'Runs the application with the specified configuration. This command is useful to start the application in development mode or production mode, depending on the environment configuration.',
            flags: [
                {
                    name: ARGV_FLAG_DOCTOR,
                    env: ENV_DOCTOR_MODE,
                    type: 'switch',
                    inherit: false,
                    description: 'Activates the doctor.',
                    detail: 'Activates the doctor. The doctor is a tool that checks the application configuration and environment for potential issues and provides recommendations to fix them.'
                },
                {
                    name: ARGV_FLAG_WATCH,
                    env: ENV_WATCH_MODE,
                    type: 'switch',
                    inherit: false,
                    description: 'Activates the change detection mode.',
                    detail: 'Activates the change detection mode. This mode is useful for development, as it automatically detects changes in the source code and restarts the application to reflect those changes.'
                },
                {
                    name: ARGV_FLAG_DEBUG,
                    env: ENV_DEBUG_MODE,
                    type: 'switch',
                    inherit: false,
                    description: 'Activates debug mode.',
                    detail: 'Activates debug mode. This mode is useful for development, as it provides additional logging and debugging information to help identify issues in the application.'
                },
                {
                    name: ARGV_FLAG_ENV,
                    type: 'file',
                    inherit: false,
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
                    inherit: false,
                    description: 'Activates minification',
                    detail: 'Activates minification. This flag is useful to reduce the size of the generated package by removing unnecessary whitespace and comments from the code.'
                }
            ],
        }
    ]
};

const coreConfiguration: Configuration = {
    commands: [
        {
            name: 'FAKE_COMMAND',
            path: 'FAKE_COMMAND',
            description: 'FAKE_COMMAND',
            detail: 'FAKE_COMMAND',
            flags: '*',
        },
        {
            name: 'run',
            flags: [
                {
                    name: ARGV_FLAG_DEBUG,
                },
                {
                    name: 'ARGV_FAKE',
                    env: 'ENV_FAKE',
                    type: 'value',
                    inherit: true,
                    description: 'FAKE',
                    detail: 'FAKE'
                }
            ],
        }
    ]
};

const httpConfiguration: Configuration = {
    environment: {
        DEFAULT_VALUES: {
            ['ENV_PROTOCOL']: 'http',
            ['ENV_IP']: '0.0.0.0',
            ['ENV_PORT']: 8080,
            ['ENV_API_ROOT']: '/api',
            ['ENV_ACCESS_LOG_FILE']: undefined,
            ['ENV_ACCESS_LOG_FILE_TIME_INTERVAL']: undefined,
            ['ENV_ACCESS_LOG_FILE_SIZE_INTERVAL']: undefined,
        }
    },
    commands: [
        {
            name: 'run',
            flags: [
                {
                    name: 'ARGV_PROTOCOL',
                    env: 'ENV_PROTOCOL',
                    type: 'value',
                    inherit: true,
                    description: 'Protocol to use for the server. Default is "http".',
                    detail: 'The protocol defines how the server will communicate with clients. It can be "http" or "https". If "https" is used, the server will require SSL certificates to be configured.'
                },
                {
                    name: 'ARGV_IP',
                    env: 'ENV_IP',
                    type: 'value',
                    inherit: true,
                    description: 'IP address to bind the server. Default is "0.0.0.0".',
                    detail: 'The IP address defines which network interface the server will listen on.'
                },
                {
                    name: 'ARGV_PORT',
                    env: 'ENV_PORT',
                    type: 'value',
                    inherit: true,
                    description: 'Port to bind the server. Default is 8080.',
                    detail: 'The port defines the network port on which the server will listen for incoming requests. It must be an integer between 0 and 65535.'
                },
                {
                    name: 'ARGV_API_ROOT',
                    env: 'ENV_API_ROOT',
                    type: 'value',
                    inherit: true,
                    description: 'Root path for the API. Default is "/api".',
                    detail: 'The API root path is the base URL for all API endpoints. For example, if the API root is "/api" and the endpoint is "/users", the full URL will be "/api/users".'
                },
                {
                    name: 'ARGV_ACCESS_LOG_FILE',
                    env: 'ARGV_ACCESS_LOG_FILE',
                    type: 'value',
                    inherit: true,
                    description: 'Path to the access log file. If not specified, no access log will be created.',
                    detail: 'The access log file is used to store information about incoming requests to the server, such as the request method, URL, status code, and response time. This can be useful for monitoring and debugging purposes.'
                },
                {
                    name: 'ARGV_ACCESS_LOG_FILE_TIME_INTERVAL',
                    env: 'ENV_ACCESS_LOG_FILE_TIME_INTERVAL',
                    type: 'value',
                    inherit: true,
                    description: 'Time interval in milliseconds to rotate the access log file. If not specified, the access log file will not be rotated based on time.',
                    detail: 'The access log file can be rotated based on time to prevent it from growing indefinitely. This is useful for long-running applications where you want to keep the log files manageable. For example, if set to 86400000 (24 hours), a new log file will be created every day.'
                },
                {
                    name: 'ARGV_ACCESS_LOG_FILE_SIZE_INTERVAL',
                    env: 'ENV_ACCESS_LOG_FILE_SIZE_INTERVAL',
                    type: 'value',
                    inherit: true,
                    description: 'Size interval in bytes to rotate the access log file. If not specified, the access log file will not be rotated based on size.',
                    detail: 'The access log file can be rotated based on size to prevent it from growing indefinitely. This is useful for applications that generate a lot of log data and you want to keep the log files manageable. For example, if set to 10485760 (10 MB), a new log file will be created when the current log file reaches 10 MB in size.'
                }
            ],
        }
    ]
};


let commands: Command[] = []

const processCommand = (processCommands: Command[]) => {
    processCommands.forEach((newCommand: Command) => {
        const existingCommand: Command | undefined = commands.find(c => c.name === newCommand.name);
        if (existingCommand) {
            // existingCommand.flags = newCommand.flags;


            // existingCommand.env = newCommand.env;
            // existingCommand.path = newCommand.path;
            // existingCommand.description = newCommand.description;
            // existingCommand.detail = newCommand.detail;
            // existingCommand.flags = newCommand.flags;

            if (newCommand.flags) {
                // si los tipos de flags son diferentes, se debe lanzar un error
                if(typeof newCommand.flags !== typeof existingCommand.flags) {
                    throw new Error('Flags are not the same type');
                }

                if(Array.isArray(newCommand.flags) && Array.isArray(existingCommand.flags)) {
                    newCommand.flags.forEach((flag) => {
                        const existingFlag: Flag | undefined = (existingCommand.flags as Flag[]).find(f => f.name === flag.name);
                        if (existingFlag) {
                            existingFlag.env = flag.env;
                        }
                    });
                } else {
                    existingCommand.flags = newCommand.flags;
                }
            }
        } else {
            commands.push(newCommand);
        }
    });
}

const processConfiguration = (configuration: Configuration) => {
    // if (configuration.environment) {
    //     processEnvironment(configuration.environment);
    // }

    if (configuration.commands) {
        processCommand(configuration.commands);
    }
}

export const configure = () => {

    const configurations = [cliConfiguration, coreConfiguration, httpConfiguration];
    configurations.forEach((c) => processConfiguration(c));

    console.log(commands);
}
