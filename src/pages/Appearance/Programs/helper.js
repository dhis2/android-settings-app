import toArray from 'lodash/toArray'

const filterSortingDefault = {
    filter: true,
    sort: true,
}

export const createInitialValues = prevDetails => ({
    assignedToMe: prevDetails.assignedToMe || filterSortingDefault,
    enrollmentDate: prevDetails.enrollmentDate || filterSortingDefault,
    enrollmentStatus: prevDetails.enrollmentStatus || filterSortingDefault,
    eventDate: prevDetails.eventDate || filterSortingDefault,
    eventStatus: prevDetails.eventStatus || filterSortingDefault,
    organisationUnit: prevDetails.organisationUnit || filterSortingDefault,
    syncStatus: prevDetails.syncStatus || filterSortingDefault,
})

export const createInitialSpinnerValue = prevDetails => ({
    visible: prevDetails.visible || true,
})

export const createInitialSpecificValues = prevDetails => ({
    name: '',
    categoryCombo: prevDetails.categoryCombo || filterSortingDefault,
    assignedToMe: prevDetails.assignedToMe || filterSortingDefault,
    enrollmentDate: prevDetails.enrollmentDate || filterSortingDefault,
    enrollmentStatus: prevDetails.enrollmentStatus || filterSortingDefault,
    eventDate: prevDetails.eventDate || filterSortingDefault,
    eventStatus: prevDetails.eventStatus || filterSortingDefault,
    organisationUnit: prevDetails.organisationUnit || filterSortingDefault,
    syncStatus: prevDetails.syncStatus || filterSortingDefault,
})

export const getProgramName = (program, programList) => {
    const programFilter = programList.filter(option => option.id === program)
    return programFilter[0].name
}

export const filterUnusedElements = (apiElementList, settingList) => {
    const list = []
    apiElementList.map(program => {
        if (!settingList.some(settings => settings.name === program.name)) {
            list.push(program)
        }
    })
    return list
}

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

export const programHasCategoryCombo = (programId, datasetList) => {
    const program = datasetList.find(option => option.id === programId)
    return program.categoryCombo.name !== 'default'
}

export const removeSettingsFromList = (setting, settingList) => {
    return settingList.filter(program => program.id !== setting.id)
}

export const updateSettingsList = (settings, settingsList) => {
    const updatedList = settingsList.filter(
        program => program.id !== settings.id
    )
    updatedList.push(settings)
    return updatedList
}
