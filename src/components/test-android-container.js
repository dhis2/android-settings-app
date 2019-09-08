import React from 'react'

import { CircularProgress } from '@dhis2/d2-ui-core'

import {
    testAndroidConstants,
    testAndroidDataConstants,
} from '../constants/test-android'
import TestAndroid from './test-android'
import { memorySizeOf, formatByteSize } from '../utils/memory-size'

class TestAndroidContainer extends React.Component {
    constructor(props) {
        super(props)
        this.usersOptions = []
        this.usersOptionsComplete = []
        this.userSelected = undefined
        this.userSelectedId = undefined
        this.organisationUnitsNumber = 0
        this.organisationUnitSearchNumber = 0
        this.datasetNumber = 0
        this.programNumber = 0
        this.programRuleNumber = 0
        this.metadataSize = 0
        this.dataSize = 0
    }

    state = {
        username: '',
        runTest: false,
        loading: true,
        disabled: true,
        loadData: false,
        completed: '...',
        errorUsername: false,
        organisationUnitsNumber: 0,
        organisationUnitSearchNumber: 0,
        datasetNumber: 0,
        programNumber: 0,
        programRuleNumber: 0,
        metadataSize: 0,
        dataSize: 0,
        tooltipOUCapture: undefined,
        tooltipOUSearch: undefined,
        tooltipDataSet: undefined,
        tooltipProgram: undefined,
        tooltipProgramRule: undefined,
        tooltipMetadata: undefined,
        tooltipData: undefined,
        maxValueOUCapture: undefined,
        maxValueOUSearch: undefined,
        maxValueDataSet: undefined,
        maxValueProgram: undefined,
        maxValueProgramRule: undefined,
        maxValueMetadata: undefined,
        maxValueData: undefined,
        orgUnitLoad: false,
        dataSetLoad: false,
        programLoad: false,
        programRuleLoad: false,
        metadataLoad: false,
    }

    clearFields = () => {
        this.userSelected = undefined
        this.userSelectedId = undefined
        this.organisationUnitsNumber = 0
        this.organisationUnitSearchNumber = 0
        this.datasetNumber = 0
        this.programNumber = 0
        this.programRuleNumber = 0

        this.setState({
            userSelected: undefined,
            userSelectedId: undefined,
            organisationUnitsNumber: 0,
            organisationUnitSearchNumber: 0,
            datasetNumber: 0,
            programNumber: 0,
            programRuleNumber: 0,
            metadataSize: 0,
            loadData: false,
            orgUnitLoad: false,
            dataSetLoad: false,
            programLoad: false,
            programRuleLoad: false,
            metadataLoad: false,
        })
    }

    createTooltipText = () => {
        testAndroidConstants.forEach(test => {
            const tooltip = `Min: ${test.min} 
            Normal: ${test.normal}
            Max: ${test.max}`

            this.setState({
                [test.value]: tooltip,
                [test.maxValueState]: test.max,
            })
            //this[test.value] = tooltip
        })
    }

    getDownloadSize = dataArray => {
        let downloadSize = 0
        dataArray.forEach(dataElement => {
            const dataSize = parseFloat(
                memorySizeOf(JSON.stringify(dataElement.toArray()))
            )

            downloadSize += dataSize
        })
        return downloadSize
    }

    checkAccess = (elementArray, accessIDList) => {
        elementArray.forEach(element => {
            switch (element.publicAccess) {
                case 'r-------':
                    // if user userGroupAccess, if user userAccess
                    console.log('access r', element, accessIDList)
                    break
                case 'rw------':
                    accessIDList.push(element)
                    console.log('access rw', element, accessIDList)
                    break
                case 'rwr-----':
                    accessIDList.push(element)
                    break
                case 'rwrw----':
                    accessIDList.push(element)
                    break
                case 'rwrwr---':
                    accessIDList.push(element)
                    break
                case 'rwrwrw--':
                    accessIDList.push(element)
                    break
                case 'rwrwrwr-':
                    accessIDList.push(element)
                    break
                case 'rwrwrwrw':
                    accessIDList.push(element)
                    break
                default:
                    break
            }
        })

        return accessIDList
    }

    getUserData = async () => {
        const organisationUnits = this.userSelected.organisationUnits
            .valuesContainerMap

        const organisationUnitSearch = this.userSelected
            .teiSearchOrganisationUnits.valuesContainerMap

        const organisationUnitList = []
        let dataSetList = []
        let programsList = []
        let programsValuesList = []
        const programsIdAccess = []
        const organisationUnitSearchList = []
        // const programRuleList = []
        const promisesOrganisationUnits = []
        const organisationUnitCapture = []
        const promisesOrganisationUnitsSearch = []
        const organisationUnitSearchCollection = []
        const datasetsIdAccess = []
        let trackedEntityTypeListId = []
        let optionSetListId = []
        let dataSetValuesList = []
        let dataElementListId = []
        let indicatorListId = []
        const indicatorValuesList = []
        let indicatorTypeListId = []
        let categoryComboListId = []
        let categoryListId = []

        organisationUnits.forEach((value, key) => {
            organisationUnitList.push(key)
        })

        organisationUnitSearch.forEach((value, key) => {
            organisationUnitSearchList.push(key)
        })

        if (organisationUnitSearchList.length > 0) {
            organisationUnitSearchList.forEach(orgUnitSearch => {
                promisesOrganisationUnitsSearch.push(
                    this.props.d2.models.organisationUnits.list({
                        paging: false,
                        filter: `path:like:${orgUnitSearch}`,
                    })
                )
            })

            await Promise.all(promisesOrganisationUnitsSearch).then(data => {
                if (data.length > 0) {
                    data.forEach(orgUnitData => {
                        orgUnitData.toArray().forEach(ousearch => {
                            organisationUnitSearchCollection.push(ousearch)
                        })
                    })
                    console.log(organisationUnitSearchCollection)
                    this.organisationUnitSearchNumber =
                        organisationUnitSearchCollection.length
                }
            })
        }

        if (organisationUnitList.length > 0) {
            organisationUnitList.forEach(orgUnit => {
                promisesOrganisationUnits.push(
                    this.props.d2.models.organisationUnits.list({
                        paging: false,
                        filter: `path:like:${orgUnit}`,
                        fields:
                            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,path,openingDate,closedDate,level,parent[id],programs[id,name,trackedEntityType[id],programTrackedEntityAttributes[trackedEntityAttribute[optionSet[id]]]],dataSets[id,categoryCombo[id,categories[id]],indicators[id,indicatorType[id]],dataSetElements[dataElement[id]]],ancestors[id,displayName],organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]',
                    })
                )
            })

            this.setState({
                loading: false,
                runTest: false,
                loadData: true,
                disabled: true,
                orgUnitLoad: true,
            })

            await Promise.all(promisesOrganisationUnits).then(data => {
                //console.log('data promises ou', data, data[0].toArray())
                if (data.length > 0) {
                    /* this.setState({
                        loading: false,
                        runTest: false,
                        loadData: true,
                        disabled: true,
                        orgUnitLoad: true,
                    }) */

                    data.forEach(orgUnitData => {
                        console.log('obteniendo org units')

                        orgUnitData.toArray().forEach(oucapture => {
                            organisationUnitCapture.push(oucapture)
                            const programPerOU = []
                            const datasetPerOU = []
                            if (
                                oucapture.programs.valuesContainerMap.size > 0
                            ) {
                                oucapture.programs.valuesContainerMap.forEach(
                                    key => {
                                        programPerOU.push(key)
                                    }
                                )
                                oucapture.programs.valuesContainerMap.forEach(
                                    (value, key) => {
                                        if (programsList.length >= 1) {
                                            const programIds = programsList.filter(
                                                program => program !== key
                                            )
                                            programsList = programIds
                                            programsList.push(key)
                                            const programVIds = programsValuesList.filter(
                                                program => program.id !== key
                                            )
                                            programsValuesList = programVIds
                                            programsValuesList.push(value)
                                        } else {
                                            programsList.push(key)
                                            programsValuesList.push(value)
                                        }
                                    }
                                )
                            }

                            if (
                                oucapture.dataSets.valuesContainerMap.size > 0
                            ) {
                                oucapture.dataSets.valuesContainerMap.forEach(
                                    key => {
                                        datasetPerOU.push(key)
                                    }
                                )

                                oucapture.dataSets.valuesContainerMap.forEach(
                                    (value, key) => {
                                        if (dataSetList.length >= 1) {
                                            const datasetIds = dataSetList.filter(
                                                dataset => dataset !== key
                                            )
                                            dataSetList = datasetIds
                                            dataSetList.push(key)
                                            const datasetVIds = dataSetValuesList.filter(
                                                dataset => dataset.id !== key
                                            )
                                            dataSetValuesList = datasetVIds
                                            dataSetValuesList.push(value)
                                        } else {
                                            dataSetList.push(key)
                                            dataSetValuesList.push(value)
                                        }
                                    }
                                )
                            }
                            if (dataSetValuesList.length > 0) {
                                dataSetValuesList.forEach(value => {
                                    const dataSetElement = value.dataSetElements
                                    if (
                                        dataSetElement !== undefined &&
                                        dataSetElement.length > 0
                                    ) {
                                        dataSetElement.forEach(value => {
                                            if (
                                                Object.keys(value.dataElement)
                                                    .length !== 0
                                            ) {
                                                if (
                                                    dataElementListId.length >=
                                                    1
                                                ) {
                                                    const dataElements = dataElementListId.filter(
                                                        dataElement =>
                                                            dataElement !==
                                                            value.dataElement.id
                                                    )
                                                    dataElementListId = dataElements
                                                    dataElementListId.push(
                                                        value.dataElement.id
                                                    )
                                                } else {
                                                    dataElementListId.push(
                                                        value.dataElement.id
                                                    )
                                                }
                                            }
                                        })
                                    }
                                    const indicators =
                                        value.indicators.valuesContainerMap
                                    if (indicators.size > 0) {
                                        value.indicators.valuesContainerMap.forEach(
                                            (value, key) => {
                                                if (
                                                    indicatorListId.length >= 1
                                                ) {
                                                    const indicators = indicatorListId.filter(
                                                        indicator =>
                                                            indicator !== key
                                                    )
                                                    indicatorListId = indicators
                                                    indicatorListId.push(key)
                                                    indicatorValuesList.push(
                                                        value
                                                    )
                                                } else {
                                                    indicatorListId.push(key)
                                                    indicatorValuesList.push(
                                                        value
                                                    )
                                                }
                                            }
                                        )
                                    }
                                    const categoryCombos = value.categoryCombo
                                    if (categoryCombos !== undefined) {
                                        if (categoryComboListId.length >= 1) {
                                            const categoryComboL = categoryComboListId.filter(
                                                categoryCombo =>
                                                    categoryCombo !==
                                                    categoryCombos.id
                                            )
                                            categoryComboListId = categoryComboL
                                            categoryComboListId.push(
                                                categoryCombos.id
                                            )
                                        } else {
                                            categoryComboListId.push(
                                                categoryCombos.id
                                            )
                                        }

                                        if (
                                            value.categoryCombo.categories
                                                .length > 0
                                        ) {
                                            value.categoryCombo.categories.forEach(
                                                categoryValue => {
                                                    /* console.log(
                                                        'categorys',
                                                        categoryListId,
                                                        categoryValue
                                                    ) */
                                                    if (
                                                        categoryListId.length >=
                                                        1
                                                    ) {
                                                        const categoryL = categoryListId.filter(
                                                            category =>
                                                                category !==
                                                                categoryValue.id
                                                        )
                                                        categoryListId = categoryL
                                                        categoryListId.push(
                                                            categoryValue.id
                                                        )
                                                    } else {
                                                        categoryListId.push(
                                                            categoryValue.id
                                                        )
                                                    }
                                                }
                                            )
                                        }

                                        if (indicatorValuesList.length > 0) {
                                            indicatorValuesList.forEach(
                                                value => {
                                                    if (
                                                        Object.keys(
                                                            value.indicatorType
                                                        ).length !== 0
                                                    ) {
                                                        if (
                                                            indicatorTypeListId.length >=
                                                            1
                                                        ) {
                                                            const indicatorType = indicatorTypeListId.filter(
                                                                indicatorT =>
                                                                    indicatorT !==
                                                                    value
                                                                        .indicatorType
                                                                        .id
                                                            )
                                                            indicatorTypeListId = indicatorType
                                                            indicatorTypeListId.push(
                                                                value
                                                                    .indicatorType
                                                                    .id
                                                            )
                                                        } else {
                                                            indicatorTypeListId.push(
                                                                value
                                                                    .indicatorType
                                                                    .id
                                                            )
                                                        }
                                                    }
                                                }
                                            )
                                        }
                                    }
                                })
                            }
                            if (programsValuesList.length > 0) {
                                programsValuesList.forEach((value, key) => {
                                    const trackedEntityT =
                                        value.trackedEntityType
                                    if (trackedEntityT !== undefined) {
                                        if (
                                            trackedEntityTypeListId.length >= 1
                                        ) {
                                            const trackedEntityTypes = trackedEntityTypeListId.filter(
                                                trackedEntity =>
                                                    trackedEntity !==
                                                    trackedEntityT.id
                                            )
                                            trackedEntityTypeListId = trackedEntityTypes
                                            trackedEntityTypeListId.push(
                                                trackedEntityT.id
                                            )
                                        } else {
                                            trackedEntityTypeListId.push(
                                                trackedEntityT.id
                                            )
                                        }
                                    }

                                    const programTEA =
                                        value.programTrackedEntityAttributes
                                    if (
                                        programTEA !== undefined &&
                                        programTEA.length > 0
                                    ) {
                                        programTEA.forEach(value => {
                                            if (
                                                Object.keys(
                                                    value.trackedEntityAttribute
                                                ).length !== 0
                                            ) {
                                                if (
                                                    optionSetListId.length >= 1
                                                ) {
                                                    const optionSets = optionSetListId.filter(
                                                        optionSet =>
                                                            optionSet !==
                                                            value
                                                                .trackedEntityAttribute
                                                                .optionSet.id
                                                    )
                                                    optionSetListId = optionSets
                                                    optionSetListId.push(
                                                        value
                                                            .trackedEntityAttribute
                                                            .optionSet.id
                                                    )
                                                } else {
                                                    optionSetListId.push(
                                                        value
                                                            .trackedEntityAttribute
                                                            .optionSet.id
                                                    )
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            /* console.log({
                                dataset: dataSetList,
                                datasetV: dataSetValuesList,
                                program: programsList,
                                programV: programsValuesList,
                                trackedEntity: trackedEntityTypeListId,
                                optionSetListId: optionSetListId,
                                dataSetValuesList: dataSetValuesList,
                                dataElement: dataElementListId,
                                indicators: indicatorListId,
                                categoryCombo: categoryComboListId,
                                category: categoryListId,
                                indicatorValuesList: indicatorValuesList,
                                indicatorT: indicatorTypeListId,
                            }) */
                        })
                    })
                    this.organisationUnitsNumber =
                        organisationUnitCapture.length
                }

                if ((dataSetList.length > 0) & (programsList.length > 0)) {
                    // console.log('data set lista', dataSetList)
                    let dataSetResult = []
                    let programResult = []
                    let programRuleResult = []

                    this.props.d2.models.dataSets
                        .list({
                            paging: false,
                            filter: `id:in:[${dataSetList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,periodType,categoryCombo[id],mobile,version,expiryDays,timelyDays,notifyCompletingUser,openFuturePeriods,fieldCombinationRequired,validCompleteOnly,noValueRequiresComment,skipOffline,dataElementDecoration,renderAsTabs,renderHorizontally,workflow[id],dataSetElements[dataSet[id],dataElement[id],categoryCombo[id]],indicators[id],sections[id,code,name,displayName,created,lastUpdated,deleted,description,sortOrder,dataSet[id],showRowTotals,showColumnTotals,dataElements[id],greyedFields[id,deleted,dataElement[id],categoryOptionCombo[id]]],compulsoryDataElementOperands[id,deleted,dataElement[id],categoryOptionCombo[id]],dataInputPeriods[period,openingDate,closingDate],access[data[write]],style[color,icon]',
                        })
                        .then(collection => {
                            console.log('obteniendo datasets')
                            dataSetResult = collection
                            console.log(
                                'datasets',
                                dataSetResult.toArray().length
                            )
                            this.setState({
                                loadData: true,
                                orgUnitLoad: true,
                                dataSetLoad: true,
                            })
                        })

                    this.props.d2.models.programs
                        .list({
                            paging: false,
                            filter: `id:in:[${programsList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,version,onlyEnrollOnce,enrollmentDateLabel,displayIncidentDate,incidentDateLabel,registration,selectEnrollmentDatesInFuture,dataEntryMethod,ignoreOverdueEvents,relationshipFromA,selectIncidentDatesInFuture,captureCoordinates,useFirstStageDuringRegistration,displayFrontPageList,programType,relationshipType[id],relationshipText,programTrackedEntityAttributes[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,mandatory,program[id],allowFutureDate,displayInList,sortOrder,searchable,trackedEntityAttribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,pattern,sortOrderInListNoProgram,valueType,expression,programScope,displayInListNoProgram,generated,displayOnVisitSchedule,orgunitScope,unique,inherit,optionSet[id],style[color,icon],access[read],formName],renderType],relatedProgram[id],trackedEntityType[id],categoryCombo[id],access[data[write]],programIndicators[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,displayInForm,expression,dimensionItem,filter,decimals,aggregationType,program[id],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]]],programStages[id],programRuleVariables[id,code,name,displayName,created,lastUpdated,deleted,useCodeForOptionSet,program[id],programStage[id],dataElement[id],trackedEntityAttribute[id],programRuleVariableSourceType],style[color,icon],expiryDays,completeEventsExpiryDays,expiryPeriodType,minAttributesRequiredToSearch,maxTeiCountToReturn,featureType,programSections[id,code,name,displayName,created,lastUpdated,deleted,description,program[id],programTrackedEntityAttribute[id],sortOrder,description,style[color,icon],formName]',
                        })
                        .then(collection => {
                            console.log('obteniendo programs')
                            programResult = collection
                            console.log(
                                'programs',
                                programResult.toArray().length
                            )
                            this.setState({
                                loadData: true,
                                programLoad: false,
                            })
                        })

                    this.props.d2.models.programRules
                        .list({
                            paging: false,
                            filter: `program.id:in:[${programsList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,priority,condition,program[id],programStage[id],programRuleActions[id,code,name,displayName,created,lastUpdated,deleted,data,content,location,trackedEntityAttribute[id],programIndicator[id],programStageSection[id],programRuleActionType,programStage[id],dataElement[id],option[id],optionGroup[id]]',
                        })
                        .then(collection => {
                            console.log('obteniendo program rules')
                            programRuleResult = collection
                            console.log(
                                'program rules',
                                programRuleResult.toArray().length
                            )
                            this.setState({
                                loadData: true,
                                programRuleLoad: true,
                            })
                        })

                    Promise.all([
                        this.props.d2.models.programStages.list({
                            paging: false,
                            filter: `program.id:in:[${programsList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,description,displayDescription,executionDateLabel,allowGenerateNextVisit,validCompleteOnly,reportDateToUse,openAfterEnrollment,repeatable,captureCoordinates,featureType,formType,displayGenerateEventBox,generatedByEnrollmentDate,autoGenerateEvent,sortOrder,hideDueDate,blockEntryForm,minDaysFromStart,standardInterval,programStageSections[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,programIndicators[id,program[id]],dataElements[id],renderType],programStageDataElements[id,code,name,displayName,created,lastUpdated,deleted,displayInReports,dataElement[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],style[color,icon],access[read]],compulsory,allowProvidedElsewhere,sortOrder,allowFutureDate,renderType,programStage[id]],style[color,icon],periodType,program,access[data[write]],remindCompleted',
                        }),
                        this.props.d2.models.trackedEntityTypes.list({
                            paging: false,
                            filter: `id:in:[${trackedEntityTypeListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,trackedEntityTypeAttributes[trackedEntityType[id],trackedEntityAttribute[id],displayInList,mandatory,searchable],style[color,icon]',
                        }),
                        this.props.d2.models.relationshipTypes.list({
                            paging: false,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,bIsToA,aIsToB,fromConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],toConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]]',
                        }),
                        this.props.d2.models.optionSets.list({
                            paging: false,
                            filter: `id:in:[${optionSetListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,version,valueType,options[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,optionSet[id],style[color,icon]]',
                        }),
                        this.props.d2.models.optionGroups.list({
                            paging: false,
                            filter: `optionSet.id:in:[${optionSetListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,optionSet[id],options[id]',
                        }),
                        // this.props.d2.models.dataElements.list({
                        //     paging: false,
                        //     filter: `id:in:[${dataElementListId}]`,
                        //     fields: 'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],style[color,icon],access[read]'
                        // }),
                        this.props.d2.models.indicators.list({
                            paging: false,
                            filter: `id:in:[${indicatorListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,annualized,indicatorType[id],numerator,numeratorDescription,denominator,denominatorDescription,url',
                        }),
                        this.props.d2.models.indicatorTypes.list({
                            paging: false,
                            filter: `id:in:[${indicatorTypeListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,number,factor',
                        }),
                        this.props.d2.models.categoryCombos.list({
                            paging: false,
                            filter: `id:in:[${categoryComboListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,isDefault,categories[id],categoryOptionCombos[id,code,name,displayName,created,lastUpdated,deleted,categoryOptions[id]]',
                        }),
                        this.props.d2.models.categories.list({
                            paging: false,
                            filter: `id:in:[${categoryListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,categoryOptions[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,startDate,endDate,access[data[read,write]]],dataDimensionType',
                        }),
                    ]).then(
                        ([
                            programStages,
                            trackedEntityTypes,
                            relationshipTypes,
                            optionSets,
                            optionGroups,
                            indicators,
                            indicatorTypes,
                            categoryCombos,
                            categories,
                        ]) => {
                            console.log('obteniendo metadata')
                            let metadata = this.getDownloadSize([
                                programResult,
                                dataSetResult,
                                programRuleResult,
                                programStages,
                                trackedEntityTypes,
                                relationshipTypes,
                                indicators,
                                categoryCombos,
                                indicatorTypes,
                                categories,
                                optionSets,
                                optionGroups,
                            ])
                            console.log('metadata', metadata)
                            console.log(metadata, formatByteSize(metadata))
                            metadata = formatByteSize(metadata)

                            this.setState({
                                //loading: false,
                                runTest: true,
                                loadData: false,
                                //disabled: true,
                                organisationUnitSearchNumber: this
                                    .organisationUnitSearchNumber,
                                organisationUnitsNumber: this
                                    .organisationUnitsNumber,
                                programNumber: programResult.toArray().length,
                                datasetNumber: dataSetResult.toArray().length,
                                programRuleNumber: programRuleResult.toArray()
                                    .length,
                                metadataSize: metadata,
                            })
                        }
                    )

                    /* .then(
                        ([
                            datasets,
                            programs,
                            programRules,
                            programStages,
                            trackedEntityTypes,
                            relationshipTypes,
                            optionSets,
                            optionGroups,
                            indicators,
                            indicatorTypes,
                            categoryCombos,
                            categories,
                        ]) => {
                            const datasetToAccess = datasets.toArray()
                            console.log({
                                dataset: datasetToAccess,
                                'datasets response': datasets,
                                'size response': JSON.stringify(datasetToAccess)
                                    .length,
                                size: memorySizeOf(
                                    JSON.stringify(datasetToAccess)
                                ),
                                'dataset Size': memorySizeOf(
                                    JSON.stringify(datasets.toArray())
                                ),
                                'prgram size': memorySizeOf(
                                    JSON.stringify(programs.toArray())
                                ),
                                programStages: memorySizeOf(
                                    JSON.stringify(programStages.toArray())
                                ),
                                relation: memorySizeOf(
                                    JSON.stringify(relationshipTypes.toArray())
                                ),
                                trackedEntity: memorySizeOf(
                                    JSON.stringify(trackedEntityTypes.toArray())
                                ),
                                optionSet: memorySizeOf(
                                    JSON.stringify(optionSets.toArray())
                                ),
                                optionG: memorySizeOf(
                                    JSON.stringify(optionGroups.toArray())
                                ),
                                indicator: memorySizeOf(
                                    JSON.stringify(indicators.toArray())
                                ),
                                categoryCombo: memorySizeOf(
                                    JSON.stringify(categoryCombos.toArray())
                                ),
                                programRule: memorySizeOf(
                                    JSON.stringify(programRules.toArray())
                                ),
                                indicatorTypes: memorySizeOf(
                                    JSON.stringify(indicatorTypes.toArray())
                                ),
                                categories: memorySizeOf(
                                    JSON.stringify(categories.toArray())
                                ),
                            })

                            let metadata = this.getDownloadSize([programs, datasets, programRules, programStages, trackedEntityTypes, relationshipTypes, indicators, categoryCombos, indicatorTypes, categories, optionSets, optionGroups])
                            console.log('metadata', metadata)
                            console.log(metadata, formatByteSize(metadata))
                            metadata = formatByteSize(metadata)

                            const programsToAccess = programs.toArray()

                            //this.programNumber = programsIdAccess.length
                            console.log({
                                'no array': programs,
                                'no array string': JSON.stringify(
                                    programs.toArray()
                                ),
                                'no array size': JSON.stringify(
                                    programs.toArray()
                                ).length,
                                'programs list data': programsToAccess,
                                'size response': JSON.stringify(
                                    programsToAccess
                                ).length,
                                'string response': JSON.stringify(
                                    programsToAccess
                                ),
                                size: memorySizeOf(
                                    JSON.stringify(programsToAccess)
                                ),
                            })
                            const programRulesToAccess = programRules.toArray()
                            console.log(programRulesToAccess)

                            this.programNumber = programsToAccess.length
                            this.datasetNumber = datasetToAccess.length
                            this.programRuleNumber = programRulesToAccess.length

                            this.setState({
                                //loading: false,
                                runTest: true,
                                loadData: false,
                                //disabled: true,
                                organisationUnitSearchNumber: this
                                    .organisationUnitSearchNumber,
                                organisationUnitsNumber: this
                                    .organisationUnitsNumber,
                                programNumber: this.programNumber,
                                datasetNumber: this.datasetNumber,
                                programRuleNumber: this.programRuleNumber,
                                metadataSize: metadata,
                            })
                        }
                    ) */

                    /* Promise.all([
                        this.props.d2.models.dataSets.list({
                            paging: false,
                            filter: `id:in:[${dataSetList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,periodType,categoryCombo[id],mobile,version,expiryDays,timelyDays,notifyCompletingUser,openFuturePeriods,fieldCombinationRequired,validCompleteOnly,noValueRequiresComment,skipOffline,dataElementDecoration,renderAsTabs,renderHorizontally,workflow[id],dataSetElements[dataSet[id],dataElement[id],categoryCombo[id]],indicators[id],sections[id,code,name,displayName,created,lastUpdated,deleted,description,sortOrder,dataSet[id],showRowTotals,showColumnTotals,dataElements[id],greyedFields[id,deleted,dataElement[id],categoryOptionCombo[id]]],compulsoryDataElementOperands[id,deleted,dataElement[id],categoryOptionCombo[id]],dataInputPeriods[period,openingDate,closingDate],access[data[write]],style[color,icon]',
                        }),
                        this.props.d2.models.programs.list({
                            paging: false,
                            filter: `id:in:[${programsList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,version,onlyEnrollOnce,enrollmentDateLabel,displayIncidentDate,incidentDateLabel,registration,selectEnrollmentDatesInFuture,dataEntryMethod,ignoreOverdueEvents,relationshipFromA,selectIncidentDatesInFuture,captureCoordinates,useFirstStageDuringRegistration,displayFrontPageList,programType,relationshipType[id],relationshipText,programTrackedEntityAttributes[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,mandatory,program[id],allowFutureDate,displayInList,sortOrder,searchable,trackedEntityAttribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,pattern,sortOrderInListNoProgram,valueType,expression,programScope,displayInListNoProgram,generated,displayOnVisitSchedule,orgunitScope,unique,inherit,optionSet[id],style[color,icon],access[read],formName],renderType],relatedProgram[id],trackedEntityType[id],categoryCombo[id],access[data[write]],programIndicators[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,displayInForm,expression,dimensionItem,filter,decimals,aggregationType,program[id],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]]],programStages[id],programRuleVariables[id,code,name,displayName,created,lastUpdated,deleted,useCodeForOptionSet,program[id],programStage[id],dataElement[id],trackedEntityAttribute[id],programRuleVariableSourceType],style[color,icon],expiryDays,completeEventsExpiryDays,expiryPeriodType,minAttributesRequiredToSearch,maxTeiCountToReturn,featureType,programSections[id,code,name,displayName,created,lastUpdated,deleted,description,program[id],programTrackedEntityAttribute[id],sortOrder,description,style[color,icon],formName]',
                        }),
                        this.props.d2.models.programRules.list({
                            paging: false,
                            filter: `program.id:in:[${programsList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,priority,condition,program[id],programStage[id],programRuleActions[id,code,name,displayName,created,lastUpdated,deleted,data,content,location,trackedEntityAttribute[id],programIndicator[id],programStageSection[id],programRuleActionType,programStage[id],dataElement[id],option[id],optionGroup[id]]',
                        }),
                        this.props.d2.models.programStages.list({
                            paging: false,
                            filter: `program.id:in:[${programsList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,description,displayDescription,executionDateLabel,allowGenerateNextVisit,validCompleteOnly,reportDateToUse,openAfterEnrollment,repeatable,captureCoordinates,featureType,formType,displayGenerateEventBox,generatedByEnrollmentDate,autoGenerateEvent,sortOrder,hideDueDate,blockEntryForm,minDaysFromStart,standardInterval,programStageSections[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,programIndicators[id,program[id]],dataElements[id],renderType],programStageDataElements[id,code,name,displayName,created,lastUpdated,deleted,displayInReports,dataElement[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],style[color,icon],access[read]],compulsory,allowProvidedElsewhere,sortOrder,allowFutureDate,renderType,programStage[id]],style[color,icon],periodType,program,access[data[write]],remindCompleted',
                        }),
                        this.props.d2.models.trackedEntityTypes.list({
                            paging: false,
                            filter: `id:in:[${trackedEntityTypeListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,trackedEntityTypeAttributes[trackedEntityType[id],trackedEntityAttribute[id],displayInList,mandatory,searchable],style[color,icon]',
                        }),
                        this.props.d2.models.relationshipTypes.list({
                            paging: false,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,bIsToA,aIsToB,fromConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],toConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]]',
                        }),
                        this.props.d2.models.optionSets.list({
                            paging: false,
                            filter: `id:in:[${optionSetListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,version,valueType,options[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,optionSet[id],style[color,icon]]',
                        }),
                        this.props.d2.models.optionGroups.list({
                            paging: false,
                            filter: `optionSet.id:in:[${optionSetListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,optionSet[id],options[id]',
                        }),
                        // this.props.d2.models.dataElements.list({
                        //     paging: false,
                        //     filter: `id:in:[${dataElementListId}]`,
                        //     fields: 'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],style[color,icon],access[read]'
                        // }),
                        this.props.d2.models.indicators.list({
                            paging: false,
                            filter: `id:in:[${indicatorListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,annualized,indicatorType[id],numerator,numeratorDescription,denominator,denominatorDescription,url',
                        }),
                        this.props.d2.models.indicatorTypes.list({
                            paging: false,
                            filter: `id:in:[${indicatorTypeListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,number,factor',
                        }),
                        this.props.d2.models.categoryCombos.list({
                            paging: false,
                            filter: `id:in:[${categoryComboListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,isDefault,categories[id],categoryOptionCombos[id,code,name,displayName,created,lastUpdated,deleted,categoryOptions[id]]',
                        }),
                        this.props.d2.models.categories.list({
                            paging: false,
                            filter: `id:in:[${categoryListId}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,categoryOptions[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,startDate,endDate,access[data[read,write]]],dataDimensionType',
                        }),
                    ]) */
                }
            })
        }
    }

    checkUsername = userToCheck => {
        this.clearFields()
        if (userToCheck.length > 3) {
            const foundUser = this.usersOptionsComplete.find(
                user => user.name === userToCheck
            )

            if (foundUser !== undefined) {
                this.props.d2.models.users
                    .get(`${foundUser.id}`, { paging: false })
                    .then(collection => {
                        const user = collection
                        this.userSelected = user
                        this.userSelectedId = foundUser.id
                    })

                this.setState({
                    errorUsername: false,
                    disabled: false,
                    username: userToCheck,
                })
            } else {
                this.setState({
                    disabled: true,
                    errorUsername: true,
                })
            }
        } else {
            this.setState({
                disabled: true,
                errorUsername: true,
            })
        }
    }

    handleRun = () => {
        this.setState({
            loading: true,
        })

        this.getUserData()
    }

    async componentDidMount() {
        this.createTooltipText()

        this.props.d2.models.users
            .list({
                paging: false,
                level: 1,
                fields: 'id,name,userCredentials',
            })
            .then(collection => {
                const usersOptions = collection.toArray()
                this.usersOptions = usersOptions
                this.usersOptionsComplete = usersOptions
                console.log('userOptions', this.usersOptionsComplete)
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        if (this.state.loading === true) {
            return <CircularProgress small />
        }

        return (
            <TestAndroid
                suggestionsSearch={this.usersOptionsComplete}
                checkUsername={this.checkUsername}
                clearSearchField={this.clearFields}
                searchFieldValue={this.state.username}
                runTest={this.state.runTest}
                dataConstants={testAndroidDataConstants}
                states={this.state}
                handleRun={this.handleRun}
                disabledTest={this.state.disabled}
                loadData={this.state.loadData}
                orgUnitLoad={this.state.orgUnitLoad}
                dataSetLoad={this.state.dataSetLoad}
                programLoad={this.programLoad}
                programRuleLoad={this.programRuleLoad}
            />
        )
    }
}

export default TestAndroidContainer
