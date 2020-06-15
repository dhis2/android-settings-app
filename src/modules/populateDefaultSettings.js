import { programSettingsDefault } from '../constants/program-settings'
import { dataSetSettingsDefault } from '../constants/data-set-settings'

export const DEFAULT_PROGRAM = 'DEFAULT_PROGRAM'
export const DEFAULT_DATASET = 'DEFAULT_DATASET'

export const populateObject = type => {
    let object = {}
    switch (type) {
        case DEFAULT_PROGRAM:
            object = {
                settingDownload: programSettingsDefault.settingDownload,
                teiDownload: programSettingsDefault.teiDownload,
                enrollmentDownload: programSettingsDefault.enrollmentDownload,
                enrollmentDateDownload:
                    programSettingsDefault.enrollmentDateDownload,
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
