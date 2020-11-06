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
            value =
                isNaN(parseInt(value)) || Math.max(0, parseInt(value)) <= 0
                    ? 0
                    : Math.min(maxValues.teiDownload, parseInt(value))
            break
        case TEI_DB_TRIMMING:
            value =
                isNaN(parseInt(value)) || Math.max(0, parseInt(value)) <= 0
                    ? 0
                    : Math.min(maxValues.teiDBTrimming, parseInt(value))
            break
        case EVENTS_DOWNLOAD:
            value =
                isNaN(parseInt(value)) || Math.max(0, parseInt(value)) <= 0
                    ? 0
                    : Math.min(maxValues.eventsDownload, parseInt(value))
            break
        case EVENTS_DB_TRIMMING:
            value =
                isNaN(parseInt(value)) || Math.max(0, parseInt(value)) <= 0
                    ? 0
                    : Math.min(maxValues.eventsDBTrimming, parseInt(value))
            break
        default:
            break
    }
    return value
}
