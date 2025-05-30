import { Configuration } from "@hexagonal/utils/lib/model/integration";

export interface Addon {
    name: string;
    version: string;
    path: string;
    configuration?: Configuration
}
