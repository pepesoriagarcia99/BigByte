import Logger from "@hexagonal/utils/logger";
import { LIBRARY_NAME } from "@hexagonal/utils/constant";
import { declareDecorator, executeDecorator } from "@hexagonal/utils/registry";

import { DECORATOR_CONTROLLER_NAME } from "../constant";


const log = new Logger(DECORATOR_CONTROLLER_NAME, LIBRARY_NAME);

let controllers = []
export let currentController: { /** datos del modelo */ } | undefined;

export const Controller = (): ClassDecorator => {
    declareDecorator(DECORATOR_CONTROLLER_NAME);

    return (Target: Function): void => {
        // log.dev(`${DECORATOR_GET_NAME} decorator applied to ${Target.name}`);

        /**
         * TODO: Comprobar que se esta usando en un metodo, solo si con el tipo no es suficiente
         */

        controllers.push(currentController)
        currentController = undefined;

        executeDecorator(DECORATOR_CONTROLLER_NAME);
    }
}
