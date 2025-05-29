import { BaseHelp } from "./Help";

/**
 * * Tipo del flag
 * 
 * 'switch' ==> Controla la activacion o no de ese flag
 * 'value' ==> Se debe indicar un valor
 */
export type FlagType = 'switch' | 'value';

export interface Flag extends BaseHelp {
    name: string; // nombre del flag "--doctor"
    type: FlagType;
    env?: string; // key del environment donde se replica el valor | si no existe no se replica
}
