import { ROOT_PATH } from "@hexagonal/utils/constant";
import { TRACE_LOG_FILE, TRACE_LOG_FILE_MODE, TRACE_LOG_FILE_SIZE_INTERVAL, TRACE_LOG_FILE_TIME_INTERVAL } from "../constant";

export default {
    DEFAULT_ENV_VALUES: {
        [TRACE_LOG_FILE_MODE]: 'false',
        [TRACE_LOG_FILE]: `${ROOT_PATH}/log/trace.log`,
        [TRACE_LOG_FILE_TIME_INTERVAL]: undefined,
        [TRACE_LOG_FILE_SIZE_INTERVAL]: undefined,
    },
    INHERITED_ARGV: [
        
    ]
}