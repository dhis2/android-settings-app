import {
    CLEAN,
    dataSetSettingsDefault,
    DEFAULT,
    GLOBAL,
    SPECIFIC,
    SPECIFIC_SETTINGS,
} from '../../constants/data-set-settings'
import { getPeriodDefaultValueByType } from '../../pages/Synchronization/Datasets/helper'
const { periodDSDownload } = dataSetSettingsDefault

export const populateSettingObject = (type, settingsList, periodType) => {
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
                periodDSDownload: getPeriodDefaultValueByType(periodType),
            }
            break
        default:
            break
    }
    return object
}
