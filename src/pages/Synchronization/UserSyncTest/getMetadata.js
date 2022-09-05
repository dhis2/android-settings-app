import {
    apiFetchApps,
    apiFetchAuthorization,
    apiFetchCategories,
    apiFetchCategoryCombos,
    apiFetchCategoryOptions,
    apiFetchConstants,
    apiFetchDataElements,
    apiFetchDataSet,
    apiFetchEventFilters,
    apiFetchIndicators,
    apiFetchLegendSet,
    apiFetchIndicatorType,
    apiFetchMe,
    apiFetchOptionGroup,
    apiFetchOptions,
    apiFetchOptionSet,
    apiFetchOrgUnit,
    apiFetchOULevel,
    apiFetchProgram,
    apiFetchProgramIndicators,
    apiFetchProgramRule,
    apiFetchProgramStage,
    apiFetchRelationshipTypes,
    apiFetchSystemInfo,
    apiFetchSystemSettings,
    apiFetchTrackedEntityAttributes,
    apiFetchTrackedEntityInstanceFilter,
    apiFetchTrackedEntityType,
    apiFetchUserSettings,
} from './queries/metadataQueries'
import { formatByteSize, getByteLength } from '../../../utils/getByteLength'
import { joinElementsById, joinObjectsById } from './helper'

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
    const indicators = await apiFetchIndicators(dataEngine, indicatorList)
    const indicatorTypesList = []
    const legendSetsList = []
    for (const indicator of indicators) {
        indicatorTypesList.push(indicator.indicatorType)
        legendSetsList.push(indicator.legendSets)
    }

    await Promise.all([
        fetchOrgUnits(dataEngine, orgUnitList),
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
        apiFetchSystemInfo(dataEngine),
        apiFetchAuthorization(dataEngine),
        apiFetchApps(dataEngine),
        apiFetchIndicatorType(dataEngine, joinElementsById(indicatorTypesList)),
        apiFetchProgramIndicators(dataEngine, programList),
        apiFetchLegendSet(dataEngine, joinObjectsById(legendSetsList)),
    ]).then(result => result.map(data => (metadataSize += getByteLength(data))))

    return formatByteSize(metadataSize)
}

const fetchOrgUnits = (dataEngine, orgUnitList) => {
    const orgUnitPromises = []
    orgUnitList.map(ou => orgUnitPromises.push(apiFetchOrgUnit(dataEngine, ou)))

    return Promise.all(orgUnitPromises)
}
