const orgUnitLevelQuery = () => ({
    resource: 'organisationUnitLevels',
    params: {
        fields: 'id,code,name,displayName,created,lastUpdated,deleted,level',
        paging: false,
    },
})

export const apiFetchOULevel = async dataEngine => {
    try {
        const ouData = await dataEngine.query({
            ou: orgUnitLevelQuery(),
        })
        return ouData.ou.organisationUnitLevels
    } catch (error) {
        console.log('Error: ', error)
    }
}

const orgUnitQuery = query => ({
    resource: 'organisationUnits',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,path,openingDate,closedDate,level,featureType,parent[id],programs[id],dataSets[id],ancestors[id,displayName],organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]',
        filter: `path:like:${query}`,
        order: 'id:asc',
        paging: false,
    },
})

export const apiFetchOrgUnit = async (dataEngine, ou) => {
    try {
        const ouData = await dataEngine.query({
            ou: orgUnitQuery(ou),
        })
        return ouData.ou.organisationUnits
    } catch (error) {
        console.log('Error: ', error)
    }
}

const programQuery = query => ({
    resource: 'programs',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,version,onlyEnrollOnce,enrollmentDateLabel,displayIncidentDate,incidentDateLabel,registration,selectEnrollmentDatesInFuture,dataEntryMethod,ignoreOverdueEvents,selectIncidentDatesInFuture,captureCoordinates,useFirstStageDuringRegistration,displayFrontPageList,programType,programTrackedEntityAttributes[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,mandatory,program[id],allowFutureDate,displayInList,sortOrder,searchable,trackedEntityAttribute[id],renderType],relatedProgram[id],trackedEntityType[id],categoryCombo[id],access[data[write]],programIndicators[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,displayInForm,expression,dimensionItem,filter,decimals,aggregationType,program[id],analyticsType,analyticsPeriodBoundaries[boundaryTarget,analyticsPeriodBoundaryType,offsetPeriods,offsetPeriodType],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]]],programRuleVariables[id,code,name,displayName,created,lastUpdated,deleted,useCodeForOptionSet,program[id],programStage[id],dataElement[id],trackedEntityAttribute[id],programRuleVariableSourceType],style[color,icon],expiryDays,completeEventsExpiryDays,expiryPeriodType,minAttributesRequiredToSearch,maxTeiCountToReturn,featureType,accessLevel,programSections[id,code,name,displayName,created,lastUpdated,deleted,description,program[id],programTrackedEntityAttribute[id],trackedEntityAttributes[id],sortOrder,style[color,icon],formName],attributeValues[value,attribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,unique,mandatory,indicatorAttribute,indicatorGroupAttribute,userGroupAttribute,dataElementAttribute,constantAttribute,categoryOptionAttribute,optionSetAttribute,sqlViewAttribute,legendSetAttribute,trackedEntityAttributeAttribute,organisationUnitAttribute,dataSetAttribute,documentAttribute,validationRuleGroupAttribute,dataElementGroupAttribute,sectionAttribute,trackedEntityTypeAttribute,userAttribute,categoryOptionGroupAttribute,programStageAttribute,programAttribute,categoryAttribute,categoryOptionComboAttribute,categoryOptionGroupSetAttribute,validationRuleAttribute,programIndicatorAttribute,organisationUnitGroupAttribute,dataElementGroupSetAttribute,organisationUnitGroupSetAttribute,optionAttribute]]',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchProgram = async (dataEngine, program) => {
    try {
        const programData = await dataEngine.query({
            program: programQuery(program),
        })
        return programData.program.programs
    } catch (error) {
        console.log('Error: ', error)
    }
}

const programStageQuery = query => ({
    resource: 'programStages',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,description,displayDescription,executionDateLabel,dueDateLabel,allowGenerateNextVisit,validCompleteOnly,reportDateToUse,openAfterEnrollment,repeatable,captureCoordinates,featureType,formType,displayGenerateEventBox,generatedByEnrollmentDate,autoGenerateEvent,sortOrder,hideDueDate,blockEntryForm,minDaysFromStart,standardInterval,programStageSections[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,programIndicators[id],dataElements[id],renderType],programStageDataElements[id,code,name,displayName,created,lastUpdated,deleted,displayInReports,dataElement[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],fieldMask,style[color,icon],access[read],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]],attributeValues[value,attribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,unique,mandatory,indicatorAttribute,indicatorGroupAttribute,userGroupAttribute,dataElementAttribute,constantAttribute,categoryOptionAttribute,optionSetAttribute,sqlViewAttribute,legendSetAttribute,trackedEntityAttributeAttribute,organisationUnitAttribute,dataSetAttribute,documentAttribute,validationRuleGroupAttribute,dataElementGroupAttribute,sectionAttribute,trackedEntityTypeAttribute,userAttribute,categoryOptionGroupAttribute,programStageAttribute,programAttribute,categoryAttribute,categoryOptionComboAttribute,categoryOptionGroupSetAttribute,validationRuleAttribute,programIndicatorAttribute,organisationUnitGroupAttribute,dataElementGroupSetAttribute,organisationUnitGroupSetAttribute,optionAttribute]]],compulsory,allowProvidedElsewhere,sortOrder,allowFutureDate,renderType,programStage[id]],style[color,icon],periodType,program,access[data[write]],remindCompleted,enableUserAssignment,attributeValues[value,attribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,unique,mandatory,indicatorAttribute,indicatorGroupAttribute,userGroupAttribute,dataElementAttribute,constantAttribute,categoryOptionAttribute,optionSetAttribute,sqlViewAttribute,legendSetAttribute,trackedEntityAttributeAttribute,organisationUnitAttribute,dataSetAttribute,documentAttribute,validationRuleGroupAttribute,dataElementGroupAttribute,sectionAttribute,trackedEntityTypeAttribute,userAttribute,categoryOptionGroupAttribute,programStageAttribute,programAttribute,categoryAttribute,categoryOptionComboAttribute,categoryOptionGroupSetAttribute,validationRuleAttribute,programIndicatorAttribute,organisationUnitGroupAttribute,dataElementGroupSetAttribute,organisationUnitGroupSetAttribute,optionAttribute]]',
        filter: `program.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchProgramStage = async (dataEngine, program) => {
    try {
        const programData = await dataEngine.query({
            programStage: programStageQuery(program),
        })
        return programData.programStage.programStages
    } catch (error) {
        console.log('Error: ', error)
    }
}

const trackedEntityTypeQuery = query => ({
    resource: 'trackedEntityTypes',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,trackedEntityTypeAttributes[trackedEntityType[id],trackedEntityAttribute[id],displayInList,mandatory,searchable],style[color,icon],featureType,access[data[read,write]]',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchTrackedEntityType = async (dataEngine, trackedEntity) => {
    try {
        const trackedEntityTypeData = await dataEngine.query({
            trackedEntityType: trackedEntityTypeQuery(trackedEntity),
        })
        return trackedEntityTypeData.trackedEntityType.trackedEntityTypes
    } catch (error) {
        console.log('Error: ', error)
    }
}

const trackedEntityAttributesQuery = query => ({
    resource: 'trackedEntityAttributes',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,pattern,sortOrderInListNoProgram,valueType,expression,programScope,displayInListNoProgram,generated,displayOnVisitSchedule,orgunitScope,unique,inherit,fieldMask,optionSet[id],style[color,icon],access[read],formName,displayFormName',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchTrackedEntityAttributes = async (dataEngine, tea) => {
    try {
        const teaData = await dataEngine.query({
            tea: trackedEntityAttributesQuery(tea),
        })
        return teaData.tea.trackedEntityAttributes
    } catch (error) {
        console.log('Error: ', error)
    }
}

const programRuleQuery = query => ({
    resource: 'programRules',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,priority,condition,program[id],programStage[id],programRuleActions[id,code,name,displayName,created,lastUpdated,deleted,data,content,location,trackedEntityAttribute[id],programIndicator[id],programStageSection[id],programRuleActionType,programStage[id],dataElement[id],option[id],optionGroup[id]]',
        filter: `program.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchProgramRule = async (dataEngine, program) => {
    try {
        const programData = await dataEngine.query({
            programRule: programRuleQuery(program),
        })
        return programData.programRule.programRules
    } catch (error) {
        console.log('Error: ', error)
    }
}

const trackedEntityInstanceFilterQuery = query => ({
    resource: 'trackedEntityInstanceFilters',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,program[id],description,sortOrder,enrollmentStatus,followup,enrollmentCreatedPeriod,eventFilters[programStage,eventStatus,eventCreatedPeriod,assignedUserMode]',
        filter: `program.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchTrackedEntityInstanceFilter = async (
    dataEngine,
    program
) => {
    try {
        const trackedEntityData = await dataEngine.query({
            trackedEntity: trackedEntityInstanceFilterQuery(program),
        })
        return trackedEntityData.trackedEntity.trackedEntityInstanceFilters
    } catch (error) {
        console.log('Error: ', error)
    }
}

const eventFilterQuery = query => ({
    resource: 'eventFilters',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,program,programStage,description,eventQueryCriteria[followUp,organisationUnit,ouMode,assignedUserMode,order,displayColumnOrder,dataFilters[dataItem,le,ge,gt,lt,eq,in,like,dateFilter],events,eventStatus,eventDate[startBuffer,endBuffer,startDate,endDate,period,type],dueDate[startBuffer,endBuffer,startDate,endDate,period,type],lastUpdatedDate[startBuffer,endBuffer,startDate,endDate,period,type],completedDate[startBuffer,endBuffer,startDate,endDate,period,type]]',
        filter: `program:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchEventFilters = async (dataEngine, program) => {
    try {
        const eventFilterData = await dataEngine.query({
            eventFilter: eventFilterQuery(program),
        })
        return eventFilterData.eventFilter.eventFilters
    } catch (error) {
        console.log('Error: ', error)
    }
}

const relationshipTypeQuery = () => ({
    resource: 'relationshipTypes',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,bIsToA,aIsToB,fromToName,toFromName,bidirectional,fromConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],toConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],access[data[read,write]]',
        paging: false,
    },
})

export const apiFetchRelationshipTypes = async dataEngine => {
    try {
        const relationshipTypeData = await dataEngine.query({
            relationshipType: relationshipTypeQuery(),
        })
        return relationshipTypeData.relationshipType.relationshipTypes
    } catch (error) {
        console.log('Error: ', error)
    }
}

const optionSetQuery = query => ({
    resource: 'optionSets',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,version,valueType',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchOptionSet = async (dataEngine, optionSet) => {
    try {
        const optionSetData = await dataEngine.query({
            optionSet: optionSetQuery(optionSet),
        })
        return optionSetData.optionSet.optionSets
    } catch (error) {
        console.log('Error: ', error)
    }
}

const optionsQuery = query => ({
    resource: 'options',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,sortOrder,optionSet[id],style[color,icon]',
        filter: `optionSet.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchOptions = async (dataEngine, optionSet) => {
    try {
        const optionsData = await dataEngine.query({
            option: optionsQuery(optionSet),
        })
        return optionsData.option.options
    } catch (error) {
        console.log('Error: ', error)
    }
}

const optionGroupQuery = query => ({
    resource: 'optionGroups',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,optionSet[id],options[id]',
        filter: `optionSet.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchOptionGroup = async (dataEngine, optionSet) => {
    try {
        const optionGroupData = await dataEngine.query({
            optionGroup: optionGroupQuery(optionSet),
        })
        return optionGroupData.optionGroup.optionGroups
    } catch (error) {
        console.log('Error: ', error)
    }
}

const dataSetQuery = query => ({
    resource: 'dataSets',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,periodType,categoryCombo[id],mobile,version,expiryDays,timelyDays,notifyCompletingUser,openFuturePeriods,fieldCombinationRequired,validCompleteOnly,noValueRequiresComment,skipOffline,dataElementDecoration,renderAsTabs,renderHorizontally,workflow[id],dataSetElements[dataSet[id],dataElement[id],categoryCombo[id]],indicators[id],sections[id,code,name,displayName,created,lastUpdated,deleted,description,sortOrder,dataSet[id],showRowTotals,showColumnTotals,dataElements[id],indicators[id],greyedFields[id,deleted,dataElement[id],categoryOptionCombo[id]]],compulsoryDataElementOperands[id,deleted,dataElement[id],categoryOptionCombo[id]],dataInputPeriods[period,openingDate,closingDate],access[data[write]],style[color,icon]',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchDataSet = async (dataEngine, dataSet) => {
    try {
        const dataSetData = await dataEngine.query({
            dataSet: dataSetQuery(dataSet),
        })
        return dataSetData.dataSet.dataSets
    } catch (error) {
        console.log('Error: ', error)
    }
}

const dataElementQuery = query => ({
    resource: 'dataElements',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],fieldMask,style[color,icon],access[read],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]],attributeValues[value,attribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,unique,mandatory,indicatorAttribute,indicatorGroupAttribute,userGroupAttribute,dataElementAttribute,constantAttribute,categoryOptionAttribute,optionSetAttribute,sqlViewAttribute,legendSetAttribute,trackedEntityAttributeAttribute,organisationUnitAttribute,dataSetAttribute,documentAttribute,validationRuleGroupAttribute,dataElementGroupAttribute,sectionAttribute,trackedEntityTypeAttribute,userAttribute,categoryOptionGroupAttribute,programStageAttribute,programAttribute,categoryAttribute,categoryOptionComboAttribute,categoryOptionGroupSetAttribute,validationRuleAttribute,programIndicatorAttribute,organisationUnitGroupAttribute,dataElementGroupSetAttribute,organisationUnitGroupSetAttribute,optionAttribute]]',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchDataElements = async (dataEngine, dataElement) => {
    try {
        const dataElementData = await dataEngine.query({
            dataElement: dataElementQuery(dataElement),
        })
        return dataElementData.dataElement.dataElements
    } catch (error) {
        console.log('Error: ', error)
    }
}

const validationRulesQuery = query => ({
    resource: 'validationRules',
    params: {
        filter: `dataSet=[${query}]`,
        paging: false,
    },
})

export const apiFetchValidationRules = async (dataEngine, dataSet) => {
    try {
        const validationRulesData = await dataEngine.query({
            validationRule: validationRulesQuery(dataSet),
        })
        return validationRulesData.validationRule.validationRules
    } catch (error) {
        console.log('Error: ', error)
    }
}

const categoryCombosQuery = query => ({
    resource: 'categoryCombos',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,isDefault,categories[id],categoryOptionCombos[id,code,name,displayName,created,lastUpdated,deleted,categoryOptions[id]]',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchCategoryCombos = async (dataEngine, categoryCombos) => {
    try {
        const categoryComboData = await dataEngine.query({
            categoryCombo: categoryCombosQuery(categoryCombos),
        })
        return categoryComboData.categoryCombo.categoryCombos
    } catch (error) {
        console.log('Error: ', error)
    }
}

const categoriesQuery = query => ({
    resource: 'categories',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,categoryOptions[id],dataDimensionType',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchCategories = async (dataEngine, categories) => {
    try {
        const categoriesData = await dataEngine.query({
            categories: categoriesQuery(categories),
        })
        return categoriesData.categories.categories
    } catch (error) {
        console.log('Error: ', error)
    }
}

const categoryOptionsQuery = query => ({
    resource: 'categoryOptions',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,startDate,endDate,access[data[read,write]]',
        filter: `categories.id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchCategoryOptions = async (dataEngine, categories) => {
    try {
        const categoryOptionData = await dataEngine.query({
            categoryOption: categoryOptionsQuery(categories),
        })
        return categoryOptionData.categoryOption.categoryOptions
    } catch (error) {
        console.log('Error: ', error)
    }
}

const indicatorsQuery = query => ({
    resource: 'categoryOptions',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,annualized,indicatorType[id],numerator,numeratorDescription,denominator,denominatorDescription,url,decimals',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchIndicators = async (dataEngine, indicators) => {
    try {
        const indicatorData = await dataEngine.query({
            indicators: indicatorsQuery(indicators),
        })
        return indicatorData.indicators.indicators
    } catch (error) {
        console.log('Error: ', error)
    }
}

const userSettingsQuery = () => ({
    resource: 'userSettings',
    params: {
        key: 'keyUiLocale,keyDbLocale',
        paging: false,
    },
})

export const apiFetchUserSettings = async dataEngine => {
    try {
        const userData = await dataEngine.query({
            user: userSettingsQuery(),
        })
        return userData.user.userSettings
    } catch (error) {
        console.log('Error: ', error)
    }
}

const systemSettingsQuery = () => ({
    resource: 'systemSettings',
    params: {
        fields: 'keyFlag,keyStyle',
        paging: false,
    },
})

export const apiFetchSystemSettings = async dataEngine => {
    try {
        const systemData = await dataEngine.query({
            settings: systemSettingsQuery(),
        })
        return systemData.settings.systemSettings
    } catch (error) {
        console.log('Error: ', error)
    }
}

const constantsQuery = () => ({
    resource: 'constants',
    params: {
        fields: 'id,code,name,displayName,created,lastUpdated,deleted,value',
        paging: false,
    },
})

export const apiFetchConstants = async dataEngine => {
    try {
        const constantsData = await dataEngine.query({
            constants: constantsQuery(),
        })
        return constantsData.constants.constants
    } catch (error) {
        console.log('Error: ', error)
    }
}

const meQuery = () => ({
    resource: 'me',
    params: {
        fields:
            'id,code,name,displayName,created,lastUpdated,birthday,education,gender,jobTitle,surname,firstName,introduction,employer,interests,languages,email,phoneNumber,nationality,deleted,userCredentials[id,code,name,displayName,created,lastUpdated,deleted,username,userRoles[id,code,name,displayName,created,lastUpdated,deleted]],organisationUnits[id,path],teiSearchOrganisationUnits[id,path]',
        paging: false,
    },
})

export const apiFetchMe = async dataEngine => {
    try {
        const meData = await dataEngine.query({
            me: meQuery(),
        })
        return meData.me.me
    } catch (error) {
        console.log('Error: ', error)
    }
}
