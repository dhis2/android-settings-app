import {
    DEFAULT,
    FULL_SPECIFIC,
    GLOBAL,
    GLOBAL_SPECIAL,
    programSettingsDefault,
    WITH_REGISTRATION,
    WITHOUT_REGISTRATION,
} from '../../constants/program-settings'

const {
    settingDownload,
    teiDownload,
    enrollmentDownload,
    enrollmentDateDownload,
    updateDownload,
    eventsDownload,
    eventDateDownload,
} = programSettingsDefault

export const populateProgramObject = (programType, settingsList) => {
    let object
    switch (programType) {
        case WITH_REGISTRATION:
            object = {
                settingDownload: settingsList.settingDownload,
                teiDownload: settingsList.teiDownload,
                enrollmentDownload: settingsList.enrollmentDownload,
                enrollmentDateDownload: settingsList.enrollmentDateDownload,
                updateDownload: settingsList.updateDownload,
            }
            break
        case WITHOUT_REGISTRATION:
            object = {
                settingDownload: settingsList.settingDownload,
                eventsDownload: settingsList.eventsDownload,
                eventDateDownload: settingsList.eventDateDownload,
            }
            break
        case GLOBAL:
            object = {
                settingDownload: settingsList.settingDownload,
                teiDownload: settingsList.teiDownload,
                enrollmentDownload: settingsList.enrollmentDownload,
                enrollmentDateDownload: settingsList.enrollmentDateDownload,
                updateDownload: settingsList.updateDownload,
                eventsDownload: settingsList.eventsDownload,
                eventDateDownload: settingsList.eventDateDownload,
            }
            break
        case GLOBAL_SPECIAL:
            object = {
                settingDownload: settingsList.settingDownload,
                teiDownload: settingsList.teiDownload,
                updateDownload: settingsList.updateDownload,
                eventsDownload: settingsList.eventsDownload,
                eventDateDownload: settingsList.eventDateDownload,
            }
            break
        case DEFAULT:
            object = {
                settingDownload,
                teiDownload,
                enrollmentDownload,
                enrollmentDateDownload,
                updateDownload,
                eventsDownload,
                eventDateDownload,
            }
            break
        case FULL_SPECIFIC:
            object = {
                settingDownload: settingsList.settingDownload,
                teiDownload: settingsList.teiDownload,
                enrollmentDownload: settingsList.enrollmentDownload,
                enrollmentDateDownload: settingsList.enrollmentDateDownload,
                updateDownload: settingsList.updateDownload,
                eventsDownload: settingsList.eventsDownload,
                eventDateDownload: settingsList.eventDateDownload,
            }
            break
        default:
            break
    }
    return object
}
