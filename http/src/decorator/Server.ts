
// import { MissingCoreInstanceRegistryError } from '@hexagonal/utils/registry';

import "reflect-metadata";
import { setCoreRegistry } from '../service/Registry';

export const Server = (): ClassDecorator => {
    return (target: Function) => {
        // const registry = Reflect.getMetadata(METADATA_CORE_COMPONENT_REGISTRY, target);

        // if (!registry) {
        //     throw new MissingCoreInstanceRegistryError();
        // }

        // setCoreRegistry(registry);
    }
}
