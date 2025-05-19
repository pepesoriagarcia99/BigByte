import { CoreRegistry } from '@hexagonal/utils/registry';

let registry: CoreRegistry;

/**
 * Setea el CoreRegistry llegado desde el core a traves la metadata de reflect-metadata
 */
export const setCoreRegistry = (coreRegistry: CoreRegistry) => {
    registry = coreRegistry;
}

export default registry;
