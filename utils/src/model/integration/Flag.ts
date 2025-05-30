import { HelpBase } from "./Help";

/**
 * * Tipo del flag
 * 
 * 'switch' ==> Controla la activacion o no de ese flag
 * 'value' ==> Se debe indicar un valor
 */
export type FlagType = 'switch' | 'value';

interface FlagBase {
    /**
     * Nombre del flag, por ejemplo "--doctor"
     * 
     * * Cuando se declara solo el flag es para heredarlo
     */
    name: string;

    /**
     * key del environment donde se replica el valor | si no existe no se replica
     */
    env?: string;
}

/**
 * Al añadir un type al flag, esta creandolo y heredandolo
 * * Para no 
 */
export type Flag =
    | (
        FlagBase
        & HelpBase
        & {
            type: FlagType,

            /**
             * Indica si se hereda el flag al lanzador
             * * Este parametro solo se declara en la creacion de un flag
             */
            inherit: boolean;
        })
    | (FlagBase & { type?: undefined, inherit?: undefined })   
