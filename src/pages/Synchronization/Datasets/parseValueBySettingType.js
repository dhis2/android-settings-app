const PERIOD_DS_DOWNLOAD = 'periodDSDownload'
const PERIOD_DS_DB_TRIMMING = 'periodDSDBTrimming'

export const parseValueBySettingType = (name, value) => {
    switch (name) {
        case PERIOD_DS_DOWNLOAD:
        case PERIOD_DS_DB_TRIMMING:
            return isNaN(parseInt(value)) ? 0 : Math.max(0, parseInt(value))
        default:
            return value
    }
}
