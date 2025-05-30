import { ARGV_FLAG_DEBUG } from "@hexagonal/utils/constant";
import { Command, Configuration } from "@hexagonal/utils/integration";


const commands: Command[] = [
    {
        name: 'run',
        flags: [
            {
                name: ARGV_FLAG_DEBUG,
            }
        ],
    }
]

export default {
    commands
} as Configuration;
