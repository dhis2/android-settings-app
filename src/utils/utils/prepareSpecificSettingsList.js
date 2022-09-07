import toArray from 'lodash/toArray'

/**
 * Specific settings, object to array:
 * Add name and id property
 * */

export const prepareSpecificSettingsList = (settings, apiElementList) => {
    const specificSettingsRows = []
    for (const key in settings) {
        const result = apiElementList.find((element) => element.id === key)
        if (result) {
            settings[key].name = result.name
            settings[key].id = key
            specificSettingsRows.push(settings[key])
        }
    }
    return toArray(specificSettingsRows)
}
