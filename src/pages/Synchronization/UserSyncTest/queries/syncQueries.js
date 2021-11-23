/**
 * Query to get org units
 * */

export const orgUnitSearchQuery = query => ({
    resource: 'organisationUnits',
    params: {
        filter: `path:like:${query}`,
        paging: false,
    },
})

export const apiFetchOUSearch = async (dataEngine, ou) => {
    try {
        const ouData = await dataEngine.query({
            ou: orgUnitSearchQuery(ou),
        })
        return ouData.ou.organisationUnits
    } catch (error) {
        console.log('Error: ', error)
    }
}

const orgUnitQuery = query => ({
    resource: 'organisationUnits',
    params: {
        fields:
            'id,name,programs[id,name,trackedEntityType[id],programTrackedEntityAttributes[id,trackedEntityAttribute[id,optionSet[id]]]],dataSets[id,name,categoryCombo[id,categories[id,categoryOptions[id]]],indicators[id,indicatorType[id]],dataSetElements[dataElement[id]]]',
        filter: `path:like:${query}`,
        paging: false,
    },
})

export const apiFetchOU = async (dataEngine, ou) => {
    try {
        const ouData = await dataEngine.query({
            ou: orgUnitQuery(ou),
        })
        return ouData.ou.organisationUnits
    } catch (error) {
        console.log('Error: ', error)
    }
}

/**
 * Query to get Program rules based on a program
 * */
const programRuleQuery = query => ({
    resource: 'programRules',
    params: {
        fields: 'id,name',
        filter: `program.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchProgramRulesBasic = async (dataEngine, programRule) => {
    try {
        const programRuleData = await dataEngine.query({
            programRule: programRuleQuery(programRule),
        })
        return programRuleData.programRule.programRules
    } catch (error) {
        console.log('Error: ', error)
    }
}
