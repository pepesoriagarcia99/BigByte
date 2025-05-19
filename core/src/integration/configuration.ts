import { DEVELOPMENT, NODE_ENV } from "@hexagonal/utils/constant";

export default {
    environment: {
        DEFAULT_VALUES:{

        }
    },
    arguments: {
        DECLARED: [
            {
                name: '--doctor',
                env: 'DOCTOR',
            }
        ],
        INHERITED: [
            '--debug',
        ],
        REQUIRED: [
            '--env',
        ]
    }
    // ---------------------------------
    // DEFAULT_ENV_VALUES: {
    //     [NODE_ENV]: DEVELOPMENT,
    // },
    // INHERITED_ARGV: [
        
    // ],
    // ---------------------------------
    /**
     * TODO: Posible declaracion de los decoradores que exporta el addon para validarlos al uso
     * * No se me ocurre la forma de validarlos
     */
    // DECORATORS: {
    //     [DECORATOR_APP]: []
    // }
}