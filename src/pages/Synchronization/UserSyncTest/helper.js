import isEmpty from 'lodash/isEmpty'
import unionBy from 'lodash/unionBy'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import without from 'lodash/without'
import { getDataSize } from './getData'
import { getMetadataSize } from './getMetadata'
import {
    apiFetchOU,
    apiFetchOUSearch,
    apiFetchProgramRulesBasic,
} from './queries/syncQueries'

export const createInitialValues = initialValues => ({
    organisationUnitsNumber: initialValues.organisationUnitsNumber || 0,
    organisationUnitSearchNumber:
        initialValues.organisationUnitSearchNumber || 0,
    datasetNumber: initialValues.datasetNumber || 0,
    programNumber: initialValues.programNumber || 0,
    programRuleNumber: initialValues.programRuleNumber || 0,
    reservedValueNumber: initialValues.reservedValueNumber || 0,
    metadataSize: initialValues.metadataSize || 0,
    dataSize: initialValues.dataSize || 0,
})

/**
 * run user test
 * get elements and metadata and data download size
 * */
export const runUserTest = async ({
    user,
    dataEngine,
    reservedValues,
    globalSettings,
    specificSettings,
}) => {
    const {
        orgUnitSearch,
        orgUnit,
        program,
        dataSet,
        programRule,
    } = await getTestElements(user, dataEngine)

    const metadataSize = await getMetadataSize({
        dataEngine,
        orgUnitList: orgUnit.idList,
        programList: program.idList,
        trackedEntityTypeList: program.trackedEntityTypeList,
        teaList: program.trackedEntityAttribute,
        optionSetList: program.optionSet,
        dataSetList: dataSet.idList,
        dataElementList: dataSet.dataElement,
        categoryComboList: dataSet.categoryCombo,
        categoryList: dataSet.category,
        indicatorList: dataSet.indicator,
    })

    const dataSize = await getDataSize({
        dataEngine,
        orgUnit: orgUnit.idList,
        program: specificSettings,
        globalLimit: globalSettings,
    })

    return {
        organisationUnitsNumber: orgUnit.total,
        organisationUnitSearchNumber: orgUnitSearch,
        datasetNumber: dataSet.total,
        programNumber: program.total,
        programRuleNumber: programRule.total,
        reservedValueNumber: reservedValues,
        metadataSize,
        dataSize,
    }
}

const getSearchOrgUnit = async (orgUnits, dataEngine) => {
    const orgUnitSearch = []
    const orgUnitPromises = orgUnits.map(orgUnit =>
        apiFetchOUSearch(dataEngine, orgUnit.id)
    )
    const ouLists = await Promise.all(orgUnitPromises)
    ouLists.forEach(ouList =>
        ouList.forEach(ou => {
            orgUnitSearch.push(ou)
        })
    )

    return uniqBy(orgUnitSearch, 'id').length
}

const parseUniqList = list => uniq(without(list, undefined))

export const getPrograms = orgUnitList => {
    const programList = []
    const trackedEntityTypeId = []
    const trackedEntityAttributeId = []
    const optionSetId = []

    orgUnitList.forEach(({ programs }) =>
        programs.forEach(
            ({ id, trackedEntityType, programTrackedEntityAttributes }) => {
                programList.push(id)
                if (!isEmpty(trackedEntityType)) {
                    trackedEntityTypeId.push(trackedEntityType.id)
                }
                if (!isEmpty(programTrackedEntityAttributes)) {
                    programTrackedEntityAttributes.forEach(tea => {
                        trackedEntityAttributeId.push(tea.id)
                        if (!isEmpty(tea.trackedEntityAttribute.optionSet)) {
                            optionSetId.push(
                                tea.trackedEntityAttribute.optionSet.id
                            )
                        }
                    })
                }
            }
        )
    )

    return {
        total: uniq(programList).length,
        idList: uniq(programList),
        trackedEntityType: parseUniqList(trackedEntityTypeId),
        trackedEntityAttribute: parseUniqList(trackedEntityAttributeId),
        optionSet: parseUniqList(optionSetId),
    }
}

export const getDatasets = orgUnitList => {
    const dataSetList = []
    const dataElementId = []
    const categoryComboId = []
    const categoriesId = []
    const indicatorsId = []

    orgUnitList.forEach(({ dataSets }) =>
        dataSets.forEach(
            ({ id, dataSetElements, indicators, categoryCombo }) => {
                dataSetList.push(id)
                if (!isEmpty(dataSetElements)) {
                    dataSetElements.forEach((dataSetElement) => {
                        dataElementId.push(dataSetElement.dataElement.id)
                    })
                }

                if (!isEmpty(indicators)) {
                    indicatorsId.push(
                        ...indicators.map(indicator => indicator.id)
                    )
                }

                if (!isEmpty(categoryCombo)) {
                    categoryComboId.push(categoryCombo.id)
                    categoriesId.push(
                        ...categoryCombo.categories.map(
                            categories => categories.id
                        )
                    )
                }
            }
        )
    )

    return {
        total: uniq(dataSetList).length,
        idList: uniq(dataSetList),
        dataElement: parseUniqList(dataElementId),
        categoryCombo: parseUniqList(categoryComboId),
        category: parseUniqList(categoriesId),
        indicator: parseUniqList(indicatorsId),
    }
}

/**
 * get programs, dataset and other elements from org unit
 *
 * program: optionSet, trackedEntityType, trackedEntityAttribute
 * dataSet: dataElement, categoryCombo, categories, indicators
 *
 * */
const getOrgUnit = (orgUnits, dataEngine) => {
    const orgUnitCapture = []
    const orgUnitPromises = orgUnits.map(orgUnit =>
        apiFetchOU(dataEngine, orgUnit.id)
    )

    return Promise.all(orgUnitPromises).then(result => {
        result.map(ouList => ouList.map(ou => orgUnitCapture.push(ou)))
        const uniqOrgUnit = uniqBy(orgUnitCapture, 'id')
        const orgUnitId = uniqOrgUnit.map(ou => ou.id)
        const program = getPrograms(uniqOrgUnit)
        const dataSet = getDatasets(uniqOrgUnit)

        return {
            orgUnit: {
                total: uniqOrgUnit.length,
                idList: orgUnitId,
            },
            program,
            dataSet,
        }
    })
}

const getProgramRules = (programs, dataEngine) => {
    const programRules = []

    const programRulesPromises = programs.map(program =>
        apiFetchProgramRulesBasic(dataEngine, program.id)
    )

    return Promise.all(programRulesPromises).then(result => {
        result.map(programRuleList =>
            programRuleList.map(programRule =>
                programRules.push(programRule.id)
            )
        )
        return uniq(programRules)
    })
}

/**
 * get all test elements except data and metadata download size
 * */
const getTestElements = async (user, dataEngine) => {
    const orgUnits = user.organisationUnits
    const orgUnitsSearch = user.teiSearchOrganisationUnits
    const totalSearch = await getSearchOrgUnit(orgUnitsSearch, dataEngine)
    const { orgUnit, program, dataSet } = await getOrgUnit(orgUnits, dataEngine)
    const programRule = await getProgramRules(program.idList, dataEngine)

    return {
        orgUnitSearch: totalSearch,
        orgUnit,
        program,
        programRule: {
            idList: programRule,
            total: programRule.length,
        },
        dataSet,
    }
}

export const joinObjectsById = array => {
    const joinedArray = []

    array
        .reduce((array1, array2) => unionBy(array1, array2, 'id'))
        .map(e => joinedArray.push(e.id))

    return parseUniqList(joinedArray)
}

export const joinElementsById = array => {
    return parseUniqList(array.map(e => e.id))
}
