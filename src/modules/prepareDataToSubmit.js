import { populateSettingObject } from './dataset/populateSettingObject'
import { DATA_SET, GLOBAL } from '../constants/data-set-settings'
import {
    GLOBAL_SPECIAL,
    PER_ORG_UNIT,
    PROGRAM,
} from '../constants/program-settings'
import { populateProgramObject } from './programs/populateProgramObject'

/**
 * Prepare data (global and specific settings) to be save
 * */
export const prepareDataToSubmit = ({
    settingType,
    states,
    globalSettingsObject,
    specificSettings,
}) => {
    let globalSettings

    if (settingType === DATA_SET) {
        globalSettings = populateSettingObject(GLOBAL, states)
    } else if (settingType === PROGRAM) {
        if (
            states.settingDownload === GLOBAL ||
            states.settingDownload === PER_ORG_UNIT
        ) {
            globalSettings = populateProgramObject(GLOBAL_SPECIAL, states)
        } else {
            globalSettings = populateProgramObject(GLOBAL, states)
        }
    }

    globalSettingsObject = {
        ...globalSettings,
        lastUpdated: new Date().toJSON(),
    }

    const settingsToSubmit = {
        globalSettings: {
            ...globalSettingsObject,
        },
    }

    if (specificSettings) {
        settingsToSubmit.specificSettings = {
            ...specificSettings,
        }
    }

    return {
        globalSettingsObject,
        settingsToSubmit,
    }
}
