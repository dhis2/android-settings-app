import {
    apiFetchCategories,
    apiFetchCategoryCombos,
    apiFetchCategoryOptions,
    apiFetchConstants,
    apiFetchDataElements,
    apiFetchDataSet,
    apiFetchEventFilters,
    apiFetchIndicators,
    apiFetchMe,
    apiFetchOptionGroup,
    apiFetchOptions,
    apiFetchOptionSet,
    apiFetchOrgUnit,
    apiFetchOULevel,
    apiFetchProgram,
    apiFetchProgramRule,
    apiFetchProgramStage,
    apiFetchRelationshipTypes,
    apiFetchSystemSettings,
    apiFetchTrackedEntityAttributes,
    apiFetchTrackedEntityInstanceFilter,
    apiFetchTrackedEntityType,
    apiFetchUserSettings,
} from './queries/metadataQueries'
import { formatByteSize, getByteLength } from '../../../utils/getByteLength'

export const getMetadataSize = async ({
    dataEngine,
    orgUnitList,
    programList,
    trackedEntityTypeList,
    teaList,
    optionSetList,
    dataSetList,
    dataElementList,
    categoryComboList,
    categoryList,
    indicatorList,
}) => {
    let metadataSize = 0

    await Promise.all([
        getOrgUnit(dataEngine, orgUnitList),
        apiFetchOULevel(dataEngine),
        apiFetchProgram(dataEngine, programList),
        apiFetchProgramStage(dataEngine, programList),
        apiFetchTrackedEntityType(dataEngine, trackedEntityTypeList),
        apiFetchTrackedEntityAttributes(dataEngine, teaList),
        apiFetchProgramRule(dataEngine, programList),
        apiFetchTrackedEntityInstanceFilter(dataEngine, programList),
        apiFetchEventFilters(dataEngine, programList),
        apiFetchRelationshipTypes(dataEngine),
        apiFetchOptionSet(dataEngine, optionSetList),
        apiFetchOptions(dataEngine, optionSetList),
        apiFetchOptionGroup(dataEngine, optionSetList),
        apiFetchDataSet(dataEngine, dataSetList),
        apiFetchDataElements(dataEngine, dataElementList),
        apiFetchCategoryCombos(dataEngine, categoryComboList),
        apiFetchCategories(dataEngine, categoryList),
        apiFetchCategoryOptions(dataEngine, categoryList),
        apiFetchIndicators(dataEngine, indicatorList),
        apiFetchUserSettings(dataEngine),
        apiFetchSystemSettings(dataEngine),
        apiFetchConstants(dataEngine),
        apiFetchMe(dataEngine),
    ]).then(result => result.map(data => (metadataSize += getByteLength(data))))

    return formatByteSize(metadataSize)
}

const getOrgUnit = (dataEngine, orgUnitList) => {
    const orgUnitPromises = []
    orgUnitList.map(ou => orgUnitPromises.push(apiFetchOrgUnit(dataEngine, ou)))

    return Promise.all(orgUnitPromises)
}
