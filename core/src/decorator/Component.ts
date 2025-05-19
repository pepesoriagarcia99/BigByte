/**
 * * Decorador
 * 
 * Para registrar una clase como un Componente en el contenedor de dependencias.
 */

import "reflect-metadata";

import { METADATA_COMPONENT_TYPE, METADATA_DECORATOR_NAME } from "@hexagonal/utils/constant";
import Logger from "@hexagonal/utils/logger";

import coreComponentRegistry from '../container/CoreComponentRegistry';
import { DECORATOR_COMPONENT_NAME, DECORATOR_SERVICE_NAME, LIBRARY_NAME } from "../constant";
import { ComponentType, declareDecorator, executeDecorator } from "@hexagonal/utils/registry";

const log = new Logger(DECORATOR_COMPONENT_NAME, LIBRARY_NAME);

export const Component = (): ClassDecorator => {
    declareDecorator(DECORATOR_COMPONENT_NAME);

    return (Target: Function): void => {
        executeDecorator(DECORATOR_COMPONENT_NAME);
        log.dev(`${DECORATOR_COMPONENT_NAME} decorator applied to ${Target.name}`);

        const componentType = ComponentType.COMPONENT;
        Reflect.defineMetadata(METADATA_COMPONENT_TYPE, componentType, Target);
        Reflect.defineMetadata(`${METADATA_DECORATOR_NAME}=${DECORATOR_SERVICE_NAME}`, true, Target);

        const paramTypes = Reflect.getMetadata("design:paramtypes", Target) ?? [];
        coreComponentRegistry.add(Target, paramTypes, { type: componentType });
    }
}