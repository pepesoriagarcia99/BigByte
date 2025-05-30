import { HelpBase } from "./Help";

/**
 * * Tipo del flag
 * 
 * 'switch' ==> Controla la activacion o no de ese flag
 * 'value' ==> Se debe indicar un valor
 */
export type FlagType = 'switch' | 'value';

interface FlagBase {
    name: string; // nombre del flag "--doctor"
    env?: string; // key del environment donde se replica el valor | si no existe no se replica
}

/**
 * Si le pone un tipo significa que esta creando un nuevo flag, no heredandolo
 */
export type Flag =
    | (FlagBase & { type: FlagType } & HelpBase)
    | (FlagBase & { type?: undefined })   
