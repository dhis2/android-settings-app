import React from 'react'

import TestAndroid from './test-android'
import { formatByteSize, memorySizeOf } from '../../../utils/memory-size'
import {
    GENERAL_SETTINGS,
    NAMESPACE,
    PROGRAM_SETTINGS,
} from '../../../constants/data-store'

import api from '../../../utils/api'
import { getDownloadSize } from '../../../modules/userSyncTest/downloadSize'
import { splitArray } from '../../../modules/splitArray'
import { prepareDataSizeRequest } from '../../../modules/userSyncTest/prepareDataSizeRequest'
import { testAndroidDataConstants } from '../../../constants/test-android'
import { prepareMetadataRequest } from '../../../modules/userSyncTest/prepareMetadataSizeRequest'
import SectionWrapper from '../section-wrapper'
import { getRequestDownloadSize } from '../../../utils/getRequestDownloadSize'

class UserSyncTestContainer extends React.Component {
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
        this.globalSettings = undefined
        this.specificSettings = undefined
        this.organisationUnitsCapture = undefined
        this.reservedValues = 0
    }

    state = {
        username: '',
        runTest: false,
        loading: true,
        disabled: true,
        loadData: false,
        errorUsername: false,
        organisationUnitsNumber: 0,
        organisationUnitSearchNumber: 0,
        datasetNumber: 0,
        programNumber: 0,
        programRuleNumber: 0,
        metadataSize: 0,
        dataSize: 0,
        maxValueOUCapture: 0,
        maxValueOUSearch: 0,
        maxValueDataSet: 0,
        maxValueProgram: 0,
        maxValueProgramRule: 0,
        maxValueMetadata: 0,
        maxValueData: 0,
        orgUnitLoad: false,
        dataSetLoad: false,
        programLoad: false,
        programRuleLoad: false,
        metadataLoad: false,
        dataLoad: false,
        reservedValueNumber: 0,
        maxValueReservedValue: 0,
        reservedValuesLoad: false,
    }

    updateRecommendedValue = () => {
        testAndroidDataConstants.forEach(test => {
            this.setState({
                [test.maxValueState]: test.maxValue,
            })
        })
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
            dataSize: 0,
            loadData: false,
            orgUnitLoad: false,
            dataSetLoad: false,
            programLoad: false,
            programRuleLoad: false,
            metadataLoad: false,
            dataLoad: false,
            reservedValueNumber: 0,
            reservedValuesLoad: false,
        })
    }

    checkAccess = (elementArray, accessIDList) => {
        elementArray.forEach(element => {
            if (element.publicAccess.indexOf('rw') === 0) {
                accessIDList.push(element)
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
        const organisationUnitSearchList = []
        const promisesOrganisationUnits = []
        let organisationUnitCapture = []
        const promisesOrganisationUnitsSearch = []
        const organisationUnitSearchCollection = []
        let trackedEntityTypeListId = []
        let optionSetListId = []
        let dataSetValuesList = []
        let dataElementListId = []
        let indicatorListId = []
        let indicatorValuesList = []
        let indicatorTypeListId = []
        let categoryComboListId = []
        let categoryListId = []
        let organisationUnitIDList = []

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
                        orgUnitData.toArray().forEach(ouSearch => {
                            organisationUnitSearchCollection.push(ouSearch)
                        })
                    })
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
                            'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,path,openingDate,closedDate,level,parent[id],programs[id,name,publicAccess,userAccesses,userGroupAccesses,trackedEntityType[id],programTrackedEntityAttributes[trackedEntityAttribute[optionSet[id]]]],dataSets[id,categoryCombo[id,categories[id]],publicAccess,userAccesses,userGroupAccesses,indicators[id,indicatorType[id]],dataSetElements[dataElement[id]]],ancestors[id,displayName],organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]',
                    })
                )
            })

            this.setState({
                loading: false,
                runTest: true,
                loadData: true,
                disabled: true,
                orgUnitLoad: true,
                dataSetLoad: false,
                programLoad: false,
                programRuleLoad: false,
                metadataLoad: false,
                dataLoad: false,
            })

            await Promise.all(promisesOrganisationUnits).then(data => {
                if (data.length > 0) {
                    const {
                        datasetIdList,
                        programIdList,
                        programDataList,
                        trackedEntityTypeIdList,
                        optionSetIdList,
                        datasetDataList,
                        dataElementIdList,
                        indicatorIdList,
                        indicatorTypeIdList,
                        categoryComboIdList,
                        categoryIdList,
                        orgUnitCaptureDataList,
                        orgUnitCaptureIdList,
                        indicatorDataList,
                    } = prepareMetadataRequest(data)

                    dataSetList = datasetIdList
                    programsList = programIdList
                    programsValuesList = programDataList
                    trackedEntityTypeListId = trackedEntityTypeIdList
                    optionSetListId = optionSetIdList
                    dataSetValuesList = datasetDataList
                    dataElementListId = dataElementIdList
                    indicatorListId = indicatorIdList
                    indicatorTypeListId = indicatorTypeIdList
                    categoryComboListId = categoryComboIdList
                    categoryListId = categoryIdList
                    organisationUnitCapture = orgUnitCaptureDataList
                    organisationUnitIDList = orgUnitCaptureIdList
                    indicatorValuesList = indicatorDataList

                    this.organisationUnitsNumber =
                        organisationUnitCapture.length

                    this.organisationUnitsCapture = organisationUnitCapture

                    this.setState({
                        loadData: true,
                        orgUnitLoad: true,
                        dataSetLoad: true,
                        programLoad: true,
                        programRuleLoad: true,
                        metadataLoad: false,
                        dataLoad: false,
                    })
                }

                if (dataSetList.length > 0 && programsList.length > 0) {
                    this.getData(
                        organisationUnitIDList,
                        organisationUnitList,
                        programsList
                    )

                    let dataSetResult = []
                    let programResult = []
                    let programRuleResult = []
                    let dataElementResult = []
                    const dataElementList = []

                    if (dataElementListId.length > 100) {
                        this.setState({
                            loadData: true,
                            orgUnitLoad: true,
                            dataSetLoad: true,
                            programLoad: true,
                            programRuleLoad: true,
                            metadataLoad: true,
                            dataLoad: true,
                        })

                        const dataElementCollection = dataElementListId.slice()
                        const splitCollection = splitArray(
                            dataElementCollection,
                            100
                        )

                        splitCollection.forEach(dataElement => {
                            dataElementList.push(
                                this.props.d2.models.dataElements.list({
                                    paging: false,
                                    filter: `id:in:[${dataElement}]`,
                                    fields:
                                        'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,valueType,zeroIsSignificant,aggregationType,formName,domainType,displayFormName,optionSet[id],categoryCombo[id],style[color,icon],access[read]',
                                })
                            )
                        })

                        Promise.all(dataElementList).then(data => {
                            dataElementResult = getDownloadSize(data)
                        })
                    }

                    this.props.d2.models.dataSets
                        .list({
                            paging: false,
                            filter: `id:in:[${dataSetList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,periodType,categoryCombo[id],mobile,version,expiryDays,timelyDays,notifyCompletingUser,openFuturePeriods,fieldCombinationRequired,validCompleteOnly,noValueRequiresComment,skipOffline,dataElementDecoration,renderAsTabs,renderHorizontally,workflow[id],dataSetElements[dataSet[id],dataElement[id],categoryCombo[id]],indicators[id],sections[id,code,name,displayName,created,lastUpdated,deleted,description,sortOrder,dataSet[id],showRowTotals,showColumnTotals,dataElements[id],greyedFields[id,deleted,dataElement[id],categoryOptionCombo[id]]],compulsoryDataElementOperands[id,deleted,dataElement[id],categoryOptionCombo[id]],dataInputPeriods[period,openingDate,closingDate],access[data[write]],style[color,icon]',
                        })
                        .then(collection => {
                            dataSetResult = collection
                        })

                    this.props.d2.models.programs
                        .list({
                            paging: false,
                            filter: `id:in:[${programsList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,version,onlyEnrollOnce,enrollmentDateLabel,displayIncidentDate,incidentDateLabel,registration,selectEnrollmentDatesInFuture,dataEntryMethod,ignoreOverdueEvents,relationshipFromA,selectIncidentDatesInFuture,captureCoordinates,useFirstStageDuringRegistration,displayFrontPageList,programType,relationshipType[id],relationshipText,programTrackedEntityAttributes[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,mandatory,program[id],allowFutureDate,displayInList,sortOrder,searchable,trackedEntityAttribute[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,pattern,sortOrderInListNoProgram,valueType,expression,programScope,displayInListNoProgram,generated,displayOnVisitSchedule,orgunitScope,unique,inherit,optionSet[id],style[color,icon],access[read],formName],renderType],relatedProgram[id],trackedEntityType[id],categoryCombo[id],access[data[write]],programIndicators[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,displayInForm,expression,dimensionItem,filter,decimals,aggregationType,program[id],legendSets[id,code,name,displayName,created,lastUpdated,deleted,symbolizer,legends[id,code,name,displayName,created,lastUpdated,deleted,startValue,endValue,color]]],programStages[id],programRuleVariables[id,code,name,displayName,created,lastUpdated,deleted,useCodeForOptionSet,program[id],programStage[id],dataElement[id],trackedEntityAttribute[id],programRuleVariableSourceType],style[color,icon],expiryDays,completeEventsExpiryDays,expiryPeriodType,minAttributesRequiredToSearch,maxTeiCountToReturn,featureType,programSections[id,code,name,displayName,created,lastUpdated,deleted,description,program[id],programTrackedEntityAttribute[id],sortOrder,description,style[color,icon],formName]',
                        })
                        .then(collection => {
                            programResult = collection
                        })

                    this.props.d2.models.programRules
                        .list({
                            paging: false,
                            filter: `program.id:in:[${programsList}]`,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,priority,condition,program[id],programStage[id],programRuleActions[id,code,name,displayName,created,lastUpdated,deleted,data,content,location,trackedEntityAttribute[id],programIndicator[id],programStageSection[id],programRuleActionType,programStage[id],dataElement[id],option[id],optionGroup[id]]',
                        })
                        .then(collection => {
                            programRuleResult = collection
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
                            let metadata = getDownloadSize([
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

                            metadata = metadata + dataElementResult
                            metadata = formatByteSize(metadata)

                            this.setState({
                                runTest: true,
                                loadData: false,
                                orgUnitLoad: false,
                                dataSetLoad: false,
                                programLoad: false,
                                programRuleLoad: false,
                                metadataLoad: false,
                                organisationUnitSearchNumber: this
                                    .organisationUnitSearchNumber,
                                organisationUnitsNumber: this
                                    .organisationUnitsNumber,
                                programNumber: programResult.toArray().length,
                                datasetNumber: dataSetResult.toArray().length,
                                programRuleNumber: programRuleResult.toArray()
                                    .length,
                                metadataSize: metadata,
                                reservedValueNumber: this.reservedValues,
                                reservedValuesLoad: false,
                            })
                        }
                    )
                }
            })
        }
    }

    getData = async (orgUnitCompleteList, orgUnitParent, programList) => {
        const dataSizeRequests = prepareDataSizeRequest({
            props: this.props,
            orgUnitCompleteList,
            orgUnitParent,
            programList,
            globalSettings: this.globalSettings,
            specificSettings: this.specificSettings,
        })
        await Promise.all(dataSizeRequests).then(data => {
            const dataSizeDownload = formatByteSize(memorySizeOf(data))
            this.setState({
                dataLoad: false,
                dataSize: dataSizeDownload,
            })
        })
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
                        this.userSelected = collection
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

    /***/

    /*getRequestDownloadSize= (url) => {
        var fileSize = '';
        var http = new XMLHttpRequest();
        http.open('HEAD', url, true); // false = Synchronous

        http.send(null); // it will stop here until this http request is complete

        // when we are here, we already have a response, b/c we used Synchronous XHR

        if (http.status === 200) {
            fileSize = http.getResponseHeader('content-length');
            console.log('fileSize = ' + fileSize);
        }

        return fileSize;
    }*/

    /***/

    componentDidMount() {
        this.updateRecommendedValue()
        this.props.d2.models.users
            .list({
                paging: false,
                level: 1,
                fields: 'id,name,userCredentials,userGroups',
            })
            .then(collection => {
                const usersOptions = collection.toArray()
                this.usersOptions = usersOptions
                this.usersOptionsComplete = usersOptions
                this.setState({
                    loading: false,
                })
            })

        const urlDataStore = 'http://localhost:8034/api/31/dataStore'
        getRequestDownloadSize(urlDataStore).then(r =>
            console.log({ receivedLength: r })
        )
        // this.getRequestDownloadSize("https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/fonts/devicon.woff?-hdf3wh").then(second => console.log('second result:',{second}))
        getRequestDownloadSize(
            'http://localhost:8034/api/31/programs?fields=id%2Ccode%2Cname%2CdisplayName%2Ccreated%2ClastUpdated%2Cdeleted%2CshortName%2CdisplayShortName%2Cdescription%2CdisplayDescription%2Cversion%2ConlyEnrollOnce%2CenrollmentDateLabel%2CdisplayIncidentDate%2CincidentDateLabel%2Cregistration%2CselectEnrollmentDatesInFuture%2CdataEntryMethod%2CignoreOverdueEvents%2CrelationshipFromA%2CselectIncidentDatesInFuture%2CcaptureCoordinates%2CuseFirstStageDuringRegistration%2CdisplayFrontPageList%2CprogramType%2CrelationshipType%5Bid%5D%2CrelationshipText%2CprogramTrackedEntityAttributes%5Bid%2Ccode%2Cname%2CdisplayName%2Ccreated%2ClastUpdated%2Cdeleted%2CshortName%2CdisplayShortName%2Cdescription%2CdisplayDescription%2Cmandatory%2Cprogram%5Bid%5D%2CallowFutureDate%2CdisplayInList%2CsortOrder%2Csearchable%2CtrackedEntityAttribute%5Bid%2Ccode%2Cname%2CdisplayName%2Ccreated%2ClastUpdated%2Cdeleted%2CshortName%2CdisplayShortName%2Cdescription%2CdisplayDescription%2Cpattern%2CsortOrderInListNoProgram%2CvalueType%2Cexpression%2CprogramScope%2CdisplayInListNoProgram%2Cgenerated%2CdisplayOnVisitSchedule%2CorgunitScope%2Cunique%2Cinherit%2CoptionSet%5Bid%5D%2Cstyle%5Bcolor%2Cicon%5D%2Caccess%5Bread%5D%2CformName%5D%2CrenderType%5D%2CrelatedProgram%5Bid%5D%2CtrackedEntityType%5Bid%5D%2CcategoryCombo%5Bid%5D%2Caccess%5Bdata%5Bwrite%5D%5D%2CprogramIndicators%5Bid%2Ccode%2Cname%2CdisplayName%2Ccreated%2ClastUpdated%2Cdeleted%2CshortName%2CdisplayShortName%2Cdescription%2CdisplayDescription%2CdisplayInForm%2Cexpression%2CdimensionItem%2Cfilter%2Cdecimals%2CaggregationType%2Cprogram%5Bid%5D%2ClegendSets%5Bid%2Ccode%2Cname%2CdisplayName%2Ccreated%2ClastUpdated%2Cdeleted%2Csymbolizer%2Clegends%5Bid%2Ccode%2Cname%2CdisplayName%2Ccreated%2ClastUpdated%2Cdeleted%2CstartValue%2CendValue%2Ccolor%5D%5D%5D%2CprogramStages%5Bid%5D%2CprogramRuleVariables%5Bid%2Ccode%2Cname%2CdisplayName%2Ccreated%2ClastUpdated%2Cdeleted%2CuseCodeForOptionSet%2Cprogram%5Bid%5D%2CprogramStage%5Bid%5D%2CdataElement%5Bid%5D%2CtrackedEntityAttribute%5Bid%5D%2CprogramRuleVariableSourceType%5D%2Cstyle%5Bcolor%2Cicon%5D%2CexpiryDays%2CcompleteEventsExpiryDays%2CexpiryPeriodType%2CminAttributesRequiredToSearch%2CmaxTeiCountToReturn%2CfeatureType%2CprogramSections%5Bid%2Ccode%2Cname%2CdisplayName%2Ccreated%2ClastUpdated%2Cdeleted%2Cdescription%2Cprogram%5Bid%5D%2CprogramTrackedEntityAttribute%5Bid%5D%2CsortOrder%2Cdescription%2Cstyle%5Bcolor%2Cicon%5D%2CformName%5D&paging=false&filter=id%3Ain%3A%5Bq04UBOqq3rp%2Ckla3mAPgvCH%2CM3xtLkYBlKI%2Cuy2gU8kT1jF%2CMoUd5BTQ3lY%2CVBqh0ynB2wv%2CeBAyeGv0exc%2CqDkgAbB5Jlk%2CIpHINAT79UW%2ClxAQ7Zs9VYR%2CbMcwwoVnbSR%2CWSGAb5XwJ3Y%2Cur1Edk5Oe2n%2CfDd25txQckK%5D'
        ).then(forth => console.log({ forth }))

        Promise.all([
            api.getValue(NAMESPACE, PROGRAM_SETTINGS),
            api.getValue(NAMESPACE, GENERAL_SETTINGS),
        ])
            .then(res => {
                this.globalSettings = res[0].value.globalSettings
                this.specificSettings = res[0].value.specificSettings
                this.reservedValues = res[1].value.reservedValues
            })
            .catch(e => {
                console.error(e)
            })
    }

    render() {
        /*if (this.state.loading === true) {
            return <CircularLoader small />
        }*/

        return (
            <SectionWrapper loading={this.state.loading}>
                <TestAndroid
                    checkUsername={this.checkUsername}
                    clearSearchField={this.clearFields}
                    searchFieldValue={this.state.username}
                    runTest={this.state.runTest}
                    states={this.state}
                    handleRun={this.handleRun}
                    disabledTest={this.state.disabled}
                    options={this.usersOptionsComplete}
                />
            </SectionWrapper>
        )
    }
}

export default UserSyncTestContainer
