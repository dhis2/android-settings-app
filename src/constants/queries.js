export const dataSetQuery = {
    paging: false,
    level: 1,
    fields: 'id,name',
    filter: 'access.data.write:eq:true',
}

export const programQuery = {
    paging: false,
    level: 1,
    fields: 'id,name',
    filter: 'access.data.write:eq:true',
}

export const testAndroidQuery = {
    user: {
        order: 'name:asc',
        paging: false,
        level: 1,
        fields: 'id,name,userCredentials,userGroups,organisationUnits',
    },
    organisationUnitsSearch: orgUnitSearch => {
        const query = {
            paging: false,
            filter: `path:like:${orgUnitSearch}`,
        }
        return query
    },
    organisationUnit: orgUnit => {
        const query = {
            paging: false,
            filter: `path:like:${orgUnit}`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,path,openingDate,closedDate,level,parent[id],programs[id,name,publicAccess,userAccesses,userGroupAccesses,trackedEntityType[id],programTrackedEntityAttributes[trackedEntityAttribute[optionSet[id]]]],dataSets[id,categoryCombo[id,categories[id]],publicAccess,userAccesses,userGroupAccesses,indicators[id,indicatorType[id]],dataSetElements[dataElement[id]]],ancestors[id,displayName],organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]',
        }
        return query
    },
    dataElement: dataElement => {
        const query = {
            paging: false,
            filter: `id:in:[${dataElement}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],style[color,icon],access[read]',
        }
        return query
    },
    dataSet: dataSetList => {
        const query = {
            paging: false,
            filter: `id:in:[${dataSetList}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,periodType,categoryCombo[id],mobile,version,expiryDays,timelyDays,notifyCompletingUser,openFuturePeriods,fieldCombinationRequired,validCompleteOnly,noValueRequiresComment,skipOffline,dataElementDecoration,renderAsTabs,renderHorizontally,workflow[id],dataSetElements[dataSet[id],dataElement[id],categoryCombo[id]],indicators[id],sections[id,code,name,displayName,created,lastUpdated,deleted,description,sortOrder,dataSet[id],showRowTotals,showColumnTotals,dataElements[id],greyedFields[id,deleted,dataElement[id],categoryOptionCombo[id]]],compulsoryDataElementOperands[id,deleted,dataElement[id],categoryOptionCombo[id]],dataInputPeriods[period,openingDate,closingDate],access[data[write]],style[color,icon]',
        }
        return query
    },
    program: programsList => {
        const query = {
            paging: false,
            filter: `id:in:[${programsList}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,version,onlyEnrollOnce,enrollmentDateLabel,displayIncidentDate,incidentDateLabel,registration,selectEnrollmentDatesInFuture,dataEntryMethod,ignoreOverdueEvents,relationshipFromA,selectIncidentDatesInFuture,captureCoordinates,useFirstStageDuringRegistration,displayFrontPageList,programType,relationshipType[id],relationshipText,programTrackedEntityAttributes[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,mandatory,program[id],allowFutureDate,displayInList,sortOrder,searchable,trackedEntityAttribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,pattern,sortOrderInListNoProgram,valueType,expression,programScope,displayInListNoProgram,generated,displayOnVisitSchedule,orgunitScope,unique,inherit,optionSet[id],style[color,icon],access[read],formName],renderType],relatedProgram[id],trackedEntityType[id],categoryCombo[id],access[data[write]],programIndicators[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,displayInForm,expression,dimensionItem,filter,decimals,aggregationType,program[id],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]]],programStages[id],programRuleVariables[id,code,name,displayName,created,lastUpdated,deleted,useCodeForOptionSet,program[id],programStage[id],dataElement[id],trackedEntityAttribute[id],programRuleVariableSourceType],style[color,icon],expiryDays,completeEventsExpiryDays,expiryPeriodType,minAttributesRequiredToSearch,maxTeiCountToReturn,featureType,programSections[id,code,name,displayName,created,lastUpdated,deleted,description,program[id],programTrackedEntityAttribute[id],sortOrder,description,style[color,icon],formName]',
        }
        return query
    },
    programRule: programsList => {
        const query = {
            paging: false,
            filter: `program.id:in:[${programsList}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,priority,condition,program[id],programStage[id],programRuleActions[id,code,name,displayName,created,lastUpdated,deleted,data,content,location,trackedEntityAttribute[id],programIndicator[id],programStageSection[id],programRuleActionType,programStage[id],dataElement[id],option[id],optionGroup[id]]',
        }
        return query
    },
    programStage: programsList => {
        const query = {
            paging: false,
            filter: `program.id:in:[${programsList}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,description,displayDescription,executionDateLabel,allowGenerateNextVisit,validCompleteOnly,reportDateToUse,openAfterEnrollment,repeatable,captureCoordinates,featureType,formType,displayGenerateEventBox,generatedByEnrollmentDate,autoGenerateEvent,sortOrder,hideDueDate,blockEntryForm,minDaysFromStart,standardInterval,programStageSections[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,programIndicators[id,program[id]],dataElements[id],renderType],programStageDataElements[id,code,name,displayName,created,lastUpdated,deleted,displayInReports,dataElement[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],style[color,icon],access[read]],compulsory,allowProvidedElsewhere,sortOrder,allowFutureDate,renderType,programStage[id]],style[color,icon],periodType,program,access[data[write]],remindCompleted',
        }
        return query
    },
    trackedEntityType: trackedEntityTypeListId => {
        const query = {
            paging: false,
            filter: `id:in:[${trackedEntityTypeListId}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,trackedEntityTypeAttributes[trackedEntityType[id],trackedEntityAttribute[id],displayInList,mandatory,searchable],style[color,icon]',
        }
        return query
    },
    relationshipType: {
        paging: false,
        fields:
            'id,code,name,displayName,created,lastUpdated,deleted,bIsToA,aIsToB,fromConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],toConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]]',
    },
    optionSet: optionSetListId => {
        const query = {
            paging: false,
            filter: `id:in:[${optionSetListId}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,version,valueType,options[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,optionSet[id],style[color,icon]]',
        }
        return query
    },
    optionGroup: optionSetListId => {
        const query = {
            paging: false,
            filter: `optionSet.id:in:[${optionSetListId}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,optionSet[id],options[id]',
        }
        return query
    },
    indicator: indicatorListId => {
        const query = {
            paging: false,
            filter: `id:in:[${indicatorListId}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,annualized,indicatorType[id],numerator,numeratorDescription,denominator,denominatorDescription,url',
        }
        return query
    },
    indicatorType: indicatorTypeListId => {
        const query = {
            paging: false,
            filter: `id:in:[${indicatorTypeListId}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,number,factor',
        }
        return query
    },
    categoryCombo: categoryComboListId => {
        const query = {
            paging: false,
            filter: `id:in:[${categoryComboListId}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,isDefault,categories[id],categoryOptionCombos[id,code,name,displayName,created,lastUpdated,deleted,categoryOptions[id]]',
        }
        return query
    },
    category: categoryListId => {
        const query = {
            paging: false,
            filter: `id:in:[${categoryListId}]`,
            fields:
                'id,code,name,displayName,created,lastUpdated,deleted,categoryOptions[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,startDate,endDate,access[data[read,write]]],dataDimensionType',
        }
        return query
    },
}
