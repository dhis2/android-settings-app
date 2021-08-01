import map from 'lodash/map'
import toArray from 'lodash/toArray'
import mapValues from 'lodash/mapValues'

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
    followUp: prevDetails.followUp || filterSortingDefault,
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
    followUp: prevDetails.followUp || filterSortingDefault,
})

/**
 * Add Follow up default value
 * */
export const assignSpecificValue = values => ({
    ...values,
    followUp: values.followUp || filterSortingDefault,
})

export const createSpecificValues = specificValues =>
    mapValues(specificValues, element => assignSpecificValue(element))

export const getProgramName = (program, programList) => {
    const programFilter = programList.filter(option => option.id === program)
    return programFilter[0].name
}

export const programHasCategoryCombo = (programId, datasetList) => {
    const program = datasetList.find(option => option.id === programId)
    return program.categoryCombo.name !== 'default'
}

export const prepareSpecificSettingsList = (settings, apiProgramList) => {
    const specificSettingsRows = []
    for (const key in settings) {
        const result = apiProgramList.find(program => program.id === key)
        if (result) {
            const filterList = getFilters(settings[key])
            settings[key].name = result.name
            settings[key].id = key
            settings[key].summarySettings = filterList
                ? `Filters: ${filterList}`
                : 'No Filters'
            specificSettingsRows.push(settings[key])
        }
    }
    return toArray(specificSettingsRows)
}

const getFilters = settings => {
    const filterList = []
    map(
        settings,
        (element, key) =>
            element.filter === true &&
            filterList.push(convertFilterKeyToValue(key))
    )
    return filterList.join(', ')
}

const convertFilterKeyToValue = filter => {
    switch (filter) {
        case 'assignedToMe':
            return 'Assigned to me'
        case 'enrollmentDate':
            return 'Enrollment Date'
        case 'enrollmentStatus':
            return 'Enrollment Status'
        case 'eventDate':
            return 'Event Date'
        case 'eventStatus':
            return 'Event Status'
        case 'categoryCombo':
            return 'Category Combo'
        case 'organisationUnit':
            return 'Organisation Unit'
        case 'syncStatus':
            return 'Sync Status'
        case 'followUp':
            return 'Follow up'
    }
}
