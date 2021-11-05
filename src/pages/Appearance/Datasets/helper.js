import i18n from '@dhis2/d2-i18n'
import map from 'lodash/map'
import toArray from 'lodash/toArray'
import { formatList } from '../../../utils/utils'

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

export const datasetHasCategoryCombo = (datasetId, datasetList) => {
    const dataset = datasetList.find(option => option.id === datasetId)
    return dataset.categoryCombo.name !== 'default'
}

export const prepareSpecificSettingsList = (settings, apiDatasetList) => {
    const specificSettingsRows = []
    for (const key in settings) {
        const result = apiDatasetList.find(dataset => dataset.id === key)
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

const getFilters = settings => {
    const filterList = []
    map(
        settings,
        (element, key) =>
            element.filter === true &&
            filterList.push(convertFilterKeyToValue(key))
    )
    return formatList(filterList)
}

const convertFilterKeyToValue = filter => {
    switch (filter) {
        case 'categoryCombo':
            return i18n.t('Category Combo')
        case 'period':
            return i18n.t('Period')
        case 'organisationUnit':
            return i18n.t('Organisation Unit')
        case 'syncStatus':
            return i18n.t('Sync Status')
    }
}
