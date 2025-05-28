import { DEVELOPMENT, NODE_ENV } from "@hexagonal/utils/constant";
import { ARGV_FLAG_DOCTOR, ARGV_FLAG_WATCH, BANNER_MODE } from ".";

/**
 * TODO: test de ejemplo, a esperar de integrar completamente
 * ISSUE: integrar argv en env para que puedan ser usados luego en value store
 */
export default {
    environment: {
        DEFAULT_VALUES: {
            [NODE_ENV]: DEVELOPMENT,
            [BANNER_MODE]: 'false',
        }
    },
    arguments: {
        flags: [
            {
                name: ARGV_FLAG_DOCTOR,
                env: 'DOCTOR',
                editable: false, // significa que es un valor de solo lectura, pues aplica en fase cli (pre_launch)
                description: '', // descripcion para el comando help
                detail: '' // detalle para el comando help
            },
            {
                name: ARGV_FLAG_WATCH,
                env: 'WATCH',
                description: '', // descripcion para el comando help
                detail: '' // detalle para el comando help
            }
        ],
    }
}