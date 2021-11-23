import isEmpty from 'lodash/isEmpty'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import without from 'lodash/without'
import {
    apiFetchOU,
    apiFetchOUSearch,
    apiFetchProgramRulesBasic,
} from './queries/syncQueries'
import { getMetadataSize } from './getMetadata'
import { getDataSize } from './getData'

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
    let orgUnitSearch = 0
    let orgUnit = {}
    let programs = {}
    let dataSets = {}
    let programRules = {}
    let metadataSize = 0
    let dataSize = 0

    await getTestElements(user, dataEngine).then(result => {
        orgUnitSearch = result.orgUnitSearch
        orgUnit = result.orgUnit
        programs = result.program
        dataSets = result.dataSet
        programRules = result.programRule
    })

    await getMetadataSize({
        dataEngine,
        orgUnitList: orgUnit.idList,
        programList: programs.idList,
        trackedEntityTypeList: programs.trackedEntityTypeList,
        teaList: programs.trackedEntityAttribute,
        optionSetList: programs.optionSet,
        dataSetList: dataSets.idList,
        dataElementList: dataSets.dataElement,
        categoryComboList: dataSets.categoryCombo,
        categoryList: dataSets.category,
        indicatorList: dataSets.indicator,
    }).then(result => (metadataSize = result))

    await getDataSize({
        dataEngine,
        orgUnit: orgUnit.idList,
        program: specificSettings,
        globalLimit: globalSettings,
    }).then(result => (dataSize = result))

    return {
        organisationUnitsNumber: orgUnit.total,
        organisationUnitSearchNumber: orgUnitSearch,
        datasetNumber: dataSets.total,
        programNumber: programs.total,
        programRuleNumber: programRules.total,
        reservedValueNumber: reservedValues,
        metadataSize,
        dataSize,
    }
}

const getSearchOrgUnit = (orgUnits, dataEngine) => {
    const orgUnitPromises = []
    const orgUnitSearch = []
    orgUnits.map(orgUnit =>
        orgUnitPromises.push(apiFetchOUSearch(dataEngine, orgUnit.id))
    )

    return Promise.all(orgUnitPromises).then(result => {
        result.map(ouList => ouList.map(ou => orgUnitSearch.push(ou)))
        return uniqBy(orgUnitSearch, 'id').length
    })
}

const parseUniqList = list => uniq(without(list, undefined))

/**
 * get programs, dataset and other elements from org unit
 *
 * program: optionSet, trackedEntityType, trackedEntityAttribute
 * dataSet: dataElement, categoryCombo, categories, indicators
 *
 * */
const getOrgUnit = (orgUnits, dataEngine) => {
    const orgUnitPromises = []
    const orgUnitCapture = []
    orgUnits.map(orgUnit =>
        orgUnitPromises.push(apiFetchOU(dataEngine, orgUnit.id))
    )

    return Promise.all(orgUnitPromises).then(result => {
        result.map(ouList => ouList.map(ou => orgUnitCapture.push(ou)))
        const uniqOrgUnit = uniqBy(orgUnitCapture, 'id')
        const orgUnitId = []
        const optionSetId = []
        const trackedEntityTypeId = []
        const trackedEntityAttributeId = []
        const dataElementId = []
        const categoryComboId = []
        const categoriesId = []
        const indicatorsId = []
        uniqOrgUnit.map(ou => orgUnitId.push(ou.id))

        const programList = []
        uniqOrgUnit.map(ou =>
            ou.programs.map(
                ({ id, trackedEntityType, programTrackedEntityAttributes }) => {
                    programList.push(id)
                    !isEmpty(trackedEntityType) &&
                        trackedEntityTypeId.push(trackedEntityType.id)
                    if (!isEmpty(programTrackedEntityAttributes)) {
                        programTrackedEntityAttributes.map(tea => {
                            trackedEntityAttributeId.push(tea.id)
                            !isEmpty(tea.trackedEntityAttribute.optionSet) &&
                                optionSetId.push(
                                    tea.trackedEntityAttribute.optionSet.id
                                )
                        })
                    }
                }
            )
        )

        const dataSetList = []
        uniqOrgUnit.map(ou =>
            ou.dataSets.map(
                ({ id, dataSetElements, indicators, categoryCombo }) => {
                    dataSetList.push(id)
                    !isEmpty(dataSetElements.dataElement) &&
                        dataElementId.push(dataSetElements.dataElement.id)

                    if (!isEmpty(indicators)) {
                        indicators.map(indicator =>
                            indicatorsId.push(indicator.id)
                        )
                    }
                    if (!isEmpty(categoryCombo)) {
                        categoryComboId.push(categoryCombo.id)
                        categoryCombo.categories.map(categories => {
                            categoriesId.push(categories.id)
                        })
                    }
                }
            )
        )

        return {
            orgUnit: {
                total: uniqOrgUnit.length,
                idList: orgUnitId,
            },
            program: {
                total: uniq(programList).length,
                idList: uniq(programList),
                trackedEntityType: parseUniqList(trackedEntityTypeId),
                trackedEntityAttribute: parseUniqList(trackedEntityAttributeId),
                optionSet: parseUniqList(optionSetId),
            },
            dataSet: {
                total: uniq(dataSetList).length,
                idList: uniq(dataSetList),
                dataElement: parseUniqList(dataElementId),
                categoryCombo: parseUniqList(categoryComboId),
                category: parseUniqList(categoriesId),
                indicator: parseUniqList(indicatorsId),
            },
        }
    })
}

const getProgramRules = (programs, dataEngine) => {
    const programRulesPromises = []
    const programRules = []
    programs.map(program =>
        programRulesPromises.push(
            apiFetchProgramRulesBasic(dataEngine, program)
        )
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

    let totalSearch = 0
    let orgUnit = {}
    let program = {}
    let dataSet = {}
    let programRule = {}

    await getSearchOrgUnit(orgUnitsSearch, dataEngine).then(result => {
        totalSearch = result
    })

    await getOrgUnit(orgUnits, dataEngine).then(result => {
        orgUnit = { ...result.orgUnit }
        program = { ...result.program }
        dataSet = { ...result.dataSet }
    })

    await getProgramRules(program.idList, dataEngine).then(programRules => {
        programRule = {
            total: programRules.length,
            idList: programRules,
        }
    })

    return {
        orgUnitSearch: totalSearch,
        orgUnit,
        program,
        programRule,
        dataSet,
    }
}
