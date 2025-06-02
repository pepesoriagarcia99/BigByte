import { Command, Flag, FlagType, HelpBase } from "@hexagonal/utils/lib/model/integration";

export type FlagWithHelp = Flag & HelpBase & {
    type: FlagType;
    inherit: boolean;
};

export type CommandWithHelp = Command & HelpBase & {
    path: string;
}