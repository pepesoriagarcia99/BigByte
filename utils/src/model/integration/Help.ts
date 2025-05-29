export interface BaseHelp {
    description: string;
    detail: string;
}

export interface Help extends BaseHelp {
    key: string; // puede ser un command o un flag
}
