import {
    PERIOD_DS_DB_TRIMMING,
    PERIOD_DS_DOWNLOAD,
} from '../../constants/data-set-settings'

export const parseValueBySettingType = (name, value) => {
    switch (name) {
        case PERIOD_DS_DOWNLOAD:
        case PERIOD_DS_DB_TRIMMING:
            return isNaN(parseInt(value)) ? 0 : Math.max(0, parseInt(value))
        default:
            return value
    }
}
