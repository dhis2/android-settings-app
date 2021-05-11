import toArray from 'lodash/toArray'

const filterSortingDefault = {
    filter: true,
    sort: true,
}

export const createInitialValues = prevDetails => ({
    period: prevDetails.period || filterSortingDefault,
    organisationUnit: prevDetails.organisationUnit || filterSortingDefault,
    syncStatus: prevDetails.syncStatus || filterSortingDefault,
})

export const createInitialSpecificValues = prevDetails => ({
    name: '',
    categoryCombo: prevDetails.categoryCombo || filterSortingDefault,
    period: prevDetails.period || filterSortingDefault,
    organisationUnit: prevDetails.organisationUnit || filterSortingDefault,
    syncStatus: prevDetails.syncStatus || filterSortingDefault,
})

/**
 * Specific settings, object to array:
 * Add name and id property
 * */
export const prepareSpecificSettingsList = (settings, apiDatasetList) => {
    for (const key in settings) {
        const result = apiDatasetList.find(a => a.id === key)
        if (result) {
            settings[key].name = result.name
            settings[key].id = key
        }
    }
    return toArray(settings)
}

export const datasetHasCategoryCombo = (dataset, datasetList) => {
    const datasetFilter = datasetList.filter(option => option.id === dataset)
    return datasetFilter[0].categoryCombo.name !== 'default'
}

export const updateSettingsList = (settings, settingsList) => {
    const updatedList = settingsList.filter(
        program => program.id !== settings.id
    )
    updatedList.push(settings)
    return updatedList
}

export const removeSettingsFromList = (setting, settingList) => {
    return settingList.filter(program => program.id !== setting.id)
}
