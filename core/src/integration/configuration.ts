import { ARGV_FLAG_DEBUG } from "@hexagonal/utils/constant";
import { Configuration } from "@hexagonal/utils/integration";

export default {
    commands: [
        {
            name: 'run',
            flags: [
                {
                    name: ARGV_FLAG_DEBUG,
                }
            ],
        }
    ]
} as Configuration;
