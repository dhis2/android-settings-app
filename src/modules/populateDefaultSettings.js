import { programSettingsDefault } from '../constants/program-settings'
import { dataSetSettingsDefault } from '../constants/data-set-settings'
import { androidSettingsDefault } from '../constants/android-settings'
import { defaultShareScreen } from '../components/field'

export const DEFAULT_PROGRAM = 'DEFAULT_PROGRAM'
export const DEFAULT_DATASET = 'DEFAULT_DATASET'
export const DEFAULT_GENERAL = 'DEFAULT_GENERAL'
export const DEFAULT_GLOBAL = 'DEFAULT_GLOBAL'

export const populateObject = type => {
    let object = {}
    switch (type) {
        case DEFAULT_GENERAL:
            object = {
                reservedValues: androidSettingsDefault.reservedValues,
                encryptDB: androidSettingsDefault.encryptDB,
                allowScreenCapture: defaultShareScreen,
            }
            break
        case DEFAULT_GLOBAL:
            object = {
                metadataSync: androidSettingsDefault.metadataSync,
                dataSync: androidSettingsDefault.dataSync,
                newTrackerImporter: false,
            }
            break
        case DEFAULT_PROGRAM:
            object = {
                settingDownload: programSettingsDefault.settingDownload,
                teiDownload: programSettingsDefault.teiDownload,
                updateDownload: programSettingsDefault.updateDownload,
                eventsDownload: programSettingsDefault.eventsDownload,
                eventDateDownload: programSettingsDefault.eventDateDownload,
            }
            break
        case DEFAULT_DATASET:
            object = {
                periodDSDownload: dataSetSettingsDefault.periodDSDownload,
            }
            break
        default:
            break
    }
    return object
}
