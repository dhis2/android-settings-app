import {
    EVENTS_DB_TRIMMING,
    EVENTS_DOWNLOAD,
    TEI_DB_TRIMMING,
    TEI_DOWNLOAD,
} from '../../../constants/program-settings'

const convertToPositiveInteger = value => {
    return Math.max(0, isNaN(parseInt(value)) ? 0 : parseInt(value))
}

export const parseValueByType = (name, value) => {
    switch (name) {
        case TEI_DOWNLOAD:
        case TEI_DB_TRIMMING:
        case EVENTS_DOWNLOAD:
        case EVENTS_DB_TRIMMING:
            value = convertToPositiveInteger(value)
            break
        default:
            break
    }
    return value
}
