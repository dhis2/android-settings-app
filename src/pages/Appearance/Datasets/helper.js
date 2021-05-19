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

export const datasetHasCategoryCombo = (datasetId, datasetList) => {
    const dataset = datasetList.find(option => option.id === datasetId)
    return dataset.categoryCombo.name !== 'default'
}
