import {
    EVENTS_DB_TRIMMING,
    EVENTS_DOWNLOAD,
    maxValues,
    TEI_DB_TRIMMING,
    TEI_DOWNLOAD,
} from '../../constants/program-settings'

export const parseValueByType = (name, value) => {
    switch (name) {
        case TEI_DOWNLOAD:
            value = value ? Math.min(maxValues.teiDownload, parseInt(value)) : 0
            break
        case TEI_DB_TRIMMING:
            value = value
                ? Math.min(maxValues.teiDBTrimming, parseInt(value))
                : 0
            break
        case EVENTS_DOWNLOAD:
            value = value
                ? Math.min(maxValues.eventsDownload, parseInt(value))
                : 0
            break
        case EVENTS_DB_TRIMMING:
            value = value
                ? Math.min(maxValues.eventsDBTrimming, parseInt(value))
                : 0
            break
        default:
            break
    }
    return value
}
