import {
    CLEAN,
    dataSetSettingsDefault,
    DEFAULT,
    GLOBAL,
    periodTypeConstants,
    SPECIFIC,
    SPECIFIC_SETTINGS,
} from '../../constants/data-set-settings'
const { periodDSDownload } = dataSetSettingsDefault

export const populateSettingObject = (type, settingsList) => {
    let object
    switch (type) {
        case GLOBAL:
            object = {
                periodDSDownload: settingsList.periodDSDownload,
            }
            break
        case SPECIFIC:
            object = {
                periodDSDownload: settingsList.periodDSDownload,
            }
            break
        case DEFAULT:
            object = {
                periodDSDownload,
            }
            break
        case CLEAN:
            object = {
                periodDSDownload: '',
            }
            break
        case SPECIFIC_SETTINGS:
            object = {
                periodDSDownload:
                    periodTypeConstants[settingsList[0].periodType].default,
            }
            break
        default:
            break
    }
    return object
}
