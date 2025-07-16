import { Configuration } from "@hexagonal/utils/integration";

export interface Addon {
    name: string;
    version: string;
    path: string;
    configuration?: Configuration
}
