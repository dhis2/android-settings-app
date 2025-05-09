import i18n from '@dhis2/d2-i18n'
import defaults from 'lodash/defaults'
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import toArray from 'lodash/toArray'
import {
    formatList,
    removePropertiesFromObject,
    removeSummaryFromSettings,
} from '../../../utils/utils'
import { isValidValue } from '../../../utils/validators'

const filterSortingDefault = {
    filter: true,
    sort: true,
}

export const createInitialValues = (prevDetails) => ({
    assignedToMe: prevDetails.assignedToMe || filterSortingDefault,
    enrollmentDate: prevDetails.enrollmentDate || filterSortingDefault,
    enrollmentStatus: prevDetails.enrollmentStatus || filterSortingDefault,
    eventDate: prevDetails.eventDate || filterSortingDefault,
    eventStatus: prevDetails.eventStatus || filterSortingDefault,
    organisationUnit: prevDetails.organisationUnit || filterSortingDefault,
    syncStatus: prevDetails.syncStatus || filterSortingDefault,
    followUp: prevDetails.followUp || filterSortingDefault,
})

export const createInitialSpinnerValue = (prevDetails) => {
    defaults(prevDetails, {
        completionSpinner: true,
        optionalSearch: false,
        disableReferrals: false,
        disableCollapsibleSections: false,
        programIndicator: '',
        disableManualLocation: false,
        minimumLocationAccuracy: null,
        quickActions: [],
    })

    return {
        completionSpinner: prevDetails.completionSpinner,
        optionalSearch: prevDetails.optionalSearch,
        disableReferrals: prevDetails.disableReferrals,
        disableCollapsibleSections: prevDetails.disableCollapsibleSections,
        programIndicator:
            prevDetails.programIndicator ||
            prevDetails?.itemHeader?.programIndicator,
        disableManualLocation: prevDetails.disableManualLocation,
        minimumLocationAccuracy: prevDetails.minimumLocationAccuracy,
        quickActions: prevDetails?.quickActions || [],
    }
}

export const createInitialSpecificValues = (prevDetails) => ({
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

export const createInitialGlobalSpinner = (prevDetails) => ({
    completionSpinner: !isNil(prevDetails.completionSpinner)
        ? prevDetails.completionSpinner
        : false,
    disableReferrals: !isNil(prevDetails.disableReferrals)
        ? prevDetails.disableReferrals
        : false,
    disableCollapsibleSections: !isNil(prevDetails.disableCollapsibleSections)
        ? prevDetails.disableCollapsibleSections
        : false,
})

export const createInitialGlobalSpinnerPrevious = (prevDetails) => {
    defaults(prevDetails, {
        completionSpinner: true,
    })
    return { visible: prevDetails.completionSpinner }
}

export const prepareSpinnerPreviousSpinner = (settings) => {
    const spinnerSettings = mapValues(settings, (element) => ({
        ...element,
        visible: element.completionSpinner,
    }))
    return removePropertiesFromObject(
        prepareSettingsSaveDataStore(spinnerSettings),
        [
            'optionalSearch',
            'completionSpinner',
            'disableReferrals',
            'disableCollapsibleSections',
            'programIndicator',
            'disableManualLocation',
            'minimumLocationAccuracy',
            'quickActions',
        ]
    )
}

export const prepareSettingsSaveDataStore = (settings) =>
    removeSummaryFromSettings(settings)

/**
 * Add Follow up default value
 * */
export const assignSpecificValue = (values) => ({
    ...values,
    followUp: values.followUp || filterSortingDefault,
})

export const createSpecificValues = (specificValues) =>
    mapValues(specificValues, (element) => assignSpecificValue(element))

export const getProgramName = (program, programList) => {
    const programFilter = programList.filter((option) => option.id === program)
    return programFilter[0].name
}

export const findElementById = (list, elementID) =>
    list.find((setting) => setting.id === elementID)

export const programHasCategoryCombo = (programId, programList) => {
    const program = findElementById(programList, programId)
    return program.categoryCombo.name !== 'default'
}

export const isTrackerProgram = (programId, programList) => {
    const program = findElementById(programList, programId)
    return program.programType === 'WITH_REGISTRATION'
}

export const prepareSpecificSettingsList = (settings, apiProgramList) => {
    const specificSettingsRows = []
    for (const key in settings) {
        const result = findElementById(apiProgramList, key)
        if (result) {
            const filterList = getFilters(settings[key])
            settings[key].name = result.name
            settings[key].id = key
            settings[key].summarySettings = filterList
                ? i18n.t('Filters: {{filterList}}', {
                      nsSeparator: '---',
                      filterList,
                  })
                : i18n.t('No Filters')
            specificSettingsRows.push(settings[key])
        }
    }
    return toArray(specificSettingsRows)
}

export const prepareProgramConfigurationList = (settings, apiProgramList) => {
    const settingsRows = []
    for (const key in settings) {
        const result = findElementById(apiProgramList, key)
        if (result) {
            settings[key] = {
                ...createInitialSpinnerValue(settings[key]),
                name: result.name,
                id: key,
            }
            settingsRows.push(settings[key])
        }
    }
    return toArray(settingsRows)
}

const getFilters = (settings) => {
    const filterList = []
    map(
        settings,
        (element, key) =>
            element.filter === true &&
            filterList.push(convertFilterKeyToValue(key))
    )
    return formatList(filterList)
}

const convertFilterKeyToValue = (filter) => {
    switch (filter) {
        case 'assignedToMe':
            return i18n.t('Assigned to me')
        case 'enrollmentDate':
            return i18n.t('Enrollment Date')
        case 'enrollmentStatus':
            return i18n.t('Enrollment Status')
        case 'eventDate':
            return i18n.t('Event Date')
        case 'eventStatus':
            return i18n.t('Event Status')
        case 'categoryCombo':
            return i18n.t('Category Combo')
        case 'organisationUnit':
            return i18n.t('Organisation Unit')
        case 'syncStatus':
            return i18n.t('Sync Status')
        case 'followUp':
            return i18n.t('Follow up')
    }
}

export const isProgramConfiguration = (configurationType) =>
    [
        'completionSpinner',
        'optionalSearch',
        'disableReferrals',
        'disableCollapsibleSections',
        'programIndicator',
        'disableManualLocation',
        'minimumLocationAccuracy',
        'quickActions',
    ].includes(configurationType)

export const removeAttributes = (itemList) =>
    removePropertiesFromObject(itemList, ['summarySettings', 'id', 'name'])

export const prepareSpinnerSettingsDataStore = (settings) => {
    const settingsToSave = mapValues(settings, (setting) =>
        createItemHeader(setting)
    )

    return removePropertiesFromObject(settingsToSave, [
        'summarySettings',
        'id',
        'name',
        'programIndicator',
    ])
}

const createItemHeader = (settings) => {
    const programIndicator = !isNil(settings.programIndicator) && {
        itemHeader: {
            programIndicator: settings.programIndicator,
        },
    }

    return {
        ...settings,
        minimumLocationAccuracy: parseMinimumLocation(
            settings.minimumLocationAccuracy,
            'save'
        ),
        ...programIndicator,
    }
}

const parseMinimumLocation = (value, type) => {
    if (isNil(value) || !isValidValue(value)) {
        return null
    }
    return type === 'save' ? parseInt(value) : value.toString()
}

export const createSettings = (settings) => ({
    completionSpinner: settings.completionSpinner,
    optionalSearch: settings.optionalSearch,
    disableReferrals: settings.disableReferrals,
    disableCollapsibleSections: settings.disableCollapsibleSections,
    programIndicator:
        settings.programIndicator || settings?.itemHeader?.programIndicator,
    disableManualLocation: settings.disableManualLocation,
    minimumLocationAccuracy: parseMinimumLocation(
        settings.minimumLocationAccuracy,
        'edit'
    ),
    quickActions: settings.quickActions || [],
})
