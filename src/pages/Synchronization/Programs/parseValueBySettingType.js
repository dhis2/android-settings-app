import {
    EVENTS_DB_TRIMMING,
    EVENTS_DOWNLOAD,
    maxValues,
    TEI_DB_TRIMMING,
    TEI_DOWNLOAD,
} from '../../../constants/program-settings'

const convertToPositiveInteger = (value, maxValue) => {
    return Math.min(
        maxValue,
        Math.max(0, isNaN(parseInt(value)) ? 0 : parseInt(value))
    )
}

export const parseValueByType = (name, value) => {
    switch (name) {
        case TEI_DOWNLOAD:
            value = convertToPositiveInteger(value, maxValues.teiDownload)
            break
        case TEI_DB_TRIMMING:
            value = convertToPositiveInteger(value, maxValues.teiDBTrimming)
            break
        case EVENTS_DOWNLOAD:
            value = convertToPositiveInteger(value, maxValues.eventsDownload)
            break
        case EVENTS_DB_TRIMMING:
            value = convertToPositiveInteger(value, maxValues.eventsDBTrimming)
            break
        default:
            break
    }
    return value
}
