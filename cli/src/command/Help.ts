export default () => {
    console.log('This is the help for using the CLI');
    


    // const detailFlag = flags[0];
    // if(detailFlag) {
    //     const detailDescription = detail[detailFlag as keyof typeof detail];

    //     if(detailDescription) {
    //         console.log(detailDescription);
    //     } else {
    //         console.log(`
    //             The flag or command "${detailFlag}" does not exist.
    //             Use the command [help] to see all available commands and flags.
    //         `)
    //     }
    // } else {
    //     console.log(`
    //     This is the help for using the ${LIBRARY_ORGANIZATION_NAME} library cli

    //     run command:
    //         * Runs a .ts file using the tsconfig.json file located at the root of the project as the compilation file.

    //         Flags:
    //             --doctor: Activates the doctor, "--doctor"
    //             --watch: Activates the change detection mode
    //             --debug: Activates debug mode
    //             --env=<file>: Configures the environment file. If not declared, use the .env located in the project root. If not declared, use the .env located in the project root.

    //         Example: hexa run --watch --debug <file.ts>

    //     package command
    //         * Packages the application into a single file using the tsconfig.json file located at the root of the project as the compilation file.

    //         Flags:
    //             --minify: Activates minification

    //         Example: hexa package --minify <file.ts>

    //     help command:
    //         * Help displays a summary of all available commands and flags

    //             If a specific flag or command is added, it shows the help of that flag or command in more detail.

    //             Example: hexa help --minify

    //     Version:
    //         * Displays the version of the library and the ${LIBRARY_ORGANIZATION_NAME}/${LIBRARY_NAME} used.

    //             Two variants to invoke it --version | -v
    //     `)
    // }
}
