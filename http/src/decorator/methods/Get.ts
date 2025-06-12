import { declareDecorator, executeDecorator } from "@hexagonal/utils/registry";
import Logger from "@hexagonal/utils/logger";
import { DECORATOR_GET_NAME } from "../../constant";

const log = new Logger(DECORATOR_GET_NAME, LIBRARY_NAME);

export const Get = (): MethodDecorator => {
    declareDecorator(DECORATOR_GET_NAME);

    return (target: Function, propertyKey: string, descriptor: PropertyDescriptor): void => {
        // log.dev(`${DECORATOR_GET_NAME} decorator applied to ${Target.name}`);

        /**
         * TODO: Comprobar que se esta usando en un metodo, solo si con el tipo no es suficiente
         */

        executeDecorator(DECORATOR_GET_NAME);
    }
}