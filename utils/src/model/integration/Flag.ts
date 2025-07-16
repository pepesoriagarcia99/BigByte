import { HelpBase } from "./Help";

/**
 * * Tipo del flag
 * 
 * 'switch' ==> Controla la activacion o no de ese flag
 * 'value' ==> Se debe indicar un valor
 */
export type FlagType = 'switch' | 'value' | 'file';

export interface Flag extends HelpBase {
    /**
     * Nombre del flag, por ejemplo "--doctor"
    */
    name: string;

    /**
     * key del environment donde se replica el valor. Si no existe no se replica
    */
    env?: string;

    type: FlagType;
}
