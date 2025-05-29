import { Flag } from "./Arguments";

export interface Command {
    name: string; // nombre del comando existente o nuevo
    path?: string; // ruta del comando, solo para los nuevos

    /** 
     * Flags que aplican a cada comando o accion 
     * 
     * * Los argumentos heredados de otros ADDONS son validos siempre
     * 
     * ['*'] ==> Significa que GUARDA en el valor flags de Arguments.ts todos los flags que se encuentran en process.argv.
     * ['-'] ==> Significa que IGNORA ningun flag en el valor flags de Arguments.ts.
     * TODO: ['N'] ==> Significa que solo envia los N flags del principio del array de process.argv.
     */
    flags?: Flag[];
}