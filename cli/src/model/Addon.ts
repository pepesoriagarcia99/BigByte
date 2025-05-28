export interface Addon {
    name: string;
    version: string;
    path: string;

    // DEFAULT_ENV_VALUES?: string[]; // Valores en environment por defecto del addon
    // INHERITED_ARGV?: string[]; // Argumentos heredados del cli al addon
}
