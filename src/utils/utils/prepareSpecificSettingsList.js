import toArray from 'lodash/toArray'

/**
 * Specific settings, object to array:
 * Add name and id property
 * */

export const prepareSpecificSettingsList = (settings, apiDatasetList) => {
    const specificSettingsRows = []
    for (const key in settings) {
        const result = apiDatasetList.find(a => a.id === key)
        if (result) {
            settings[key].name = result.name
            settings[key].id = key
            specificSettingsRows.push(settings[key])
        }
    }
    return toArray(specificSettingsRows)
}
