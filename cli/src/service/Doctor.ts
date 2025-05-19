import { ChildProcess } from "node:child_process";

export let doctorServerProcess: ChildProcess; // proceso del doctor

export const initDoctorServer = () => {
    doctorServerProcess = {} as ChildProcess;
    // if (targetProcess?.pid) {
    //     try {
    //         doctorServerProcess = fork(
    //             path.join(__dirname, "/server/index.js"),
    //             ["env=production", `pid=${targetProcess.pid}`],
    //             { silent: true }
    //         );

    //         doctorServerProcess.stdout?.on('data', (data) => {
    //             console.log(`stdout: ${data.toString()}`);
    //         });

    //         doctorServerProcess.stderr?.on('data', (data) => {
    //             console.error(`stderr: ${data.toString()}`);
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
}
