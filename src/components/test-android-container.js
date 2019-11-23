import React from 'react'

import { CircularProgress } from '@dhis2/d2-ui-core'

import {
    testAndroidConstants,
    testAndroidDataConstants,
} from '../constants/test-android'
import TestAndroid from './test-android'
import { memorySizeOf, formatByteSize } from '../utils/memory-size'
import { testAndroidQuery } from '../constants/queries'

import api from '../utils/api'

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
        this.globalSettings = undefined
        this.specificSettings = undefined
        this.organisationUnitsCapture = undefined
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
        dataLoad: false,
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
                    console.log('access r', element, element.userGroupAccesses)
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

    splitArray = (list, howMany) => {
        let idx = 0
        const result = []

        while (idx < list.length) {
            if (idx % howMany === 0) result.push([])
            result[result.length - 1].push(list[idx++])
        }

        return result
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
        const organisationUnitIDList = []

        organisationUnits.forEach((value, key) => {
            organisationUnitList.push(key)
        })

        organisationUnitSearch.forEach((value, key) => {
            organisationUnitSearchList.push(key)
        })

        if (organisationUnitSearchList.length > 0) {
            organisationUnitSearchList.forEach(orgUnitSearch => {
                promisesOrganisationUnitsSearch.push(
                    this.props.d2.models.organisationUnits.list(
                        testAndroidQuery.organisationUnitsSearch(orgUnitSearch)
                    )
                )
            })

            await Promise.all(promisesOrganisationUnitsSearch).then(data => {
                if (data.length > 0) {
                    data.forEach(orgUnitData => {
                        orgUnitData.toArray().forEach(ousearch => {
                            organisationUnitSearchCollection.push(ousearch)
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
                    this.props.d2.models.organisationUnits.list(
                        testAndroidQuery.organisationUnit(orgUnit)
                    )
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
                //console.log('data promises ou', data, data[0].toArray())
                if (data.length > 0) {
                    data.forEach(orgUnitData => {
                        console.log('obteniendo org units')
                        console.log('ou', orgUnitData.toArray())
                        orgUnitData.toArray().forEach(oucapture => {
                            organisationUnitCapture.push(oucapture)
                            organisationUnitIDList.push(oucapture.id)
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

                                console.log(
                                    'idAccess program',
                                    this.checkAccess(
                                        programsValuesList,
                                        programsIdAccess
                                    )
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

                                console.log(
                                    'idAccess dataset',
                                    this.checkAccess(
                                        dataSetValuesList,
                                        datasetsIdAccess
                                    ),
                                    dataSetValuesList
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

                    // organisationUnitCapture.forEach(ou => this.organisationUnitsCapture.push(ou.id))
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

                if ((dataSetList.length > 0) & (programsList.length > 0)) {
                    console.log('data element lista', dataElementListId)

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
                        const splitCollection = this.splitArray(
                            dataElementCollection,
                            100
                        )
                        console.log('split', splitCollection)

                        splitCollection.forEach(dataElement => {
                            dataElementList.push(
                                this.props.d2.models.dataElements.list(
                                    testAndroidQuery.dataElement(dataElement)
                                )
                            )
                        })

                        Promise.all(dataElementList).then(data => {
                            dataElementResult = this.getDownloadSize(data)
                            console.log(
                                'data elements result api',
                                data,
                                dataElementResult
                            )
                        })
                    }

                    this.props.d2.models.dataSets
                        .list(testAndroidQuery.dataSet(dataSetList))
                        .then(collection => {
                            dataSetResult = collection
                        })

                    this.props.d2.models.programs
                        .list(testAndroidQuery.program(programsList))
                        .then(collection => {
                            programResult = collection
                        })

                    this.props.d2.models.programRules
                        .list(testAndroidQuery.programRule(programsList))
                        .then(collection => {
                            programRuleResult = collection
                        })

                    Promise.all([
                        this.props.d2.models.programStages.list(
                            testAndroidQuery.programStage(programsList)
                        ),
                        this.props.d2.models.trackedEntityTypes.list(
                            testAndroidQuery.trackedEntityType(
                                trackedEntityTypeListId
                            )
                        ),
                        this.props.d2.models.relationshipTypes.list(
                            testAndroidQuery.relationshipType
                        ),
                        this.props.d2.models.optionSets.list(
                            testAndroidQuery.optionSet(optionSetListId)
                        ),
                        this.props.d2.models.optionGroups.list(
                            testAndroidQuery.optionGroup(optionSetListId)
                        ),
                        this.props.d2.models.indicators.list(
                            testAndroidQuery.indicator(indicatorListId)
                        ),
                        this.props.d2.models.indicatorTypes.list(
                            testAndroidQuery.indicatorType(indicatorTypeListId)
                        ),
                        this.props.d2.models.categoryCombos.list(
                            testAndroidQuery.categoryCombo(categoryComboListId)
                        ),
                        this.props.d2.models.categories.list(
                            testAndroidQuery.category(categoryListId)
                        ),
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
                                //dataElementResult
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
                                dataLoad: true,
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

                    const orgUnitParent = organisationUnitList
                    const orgUnitCompleteList = organisationUnitIDList
                    this.getData(
                        orgUnitCompleteList,
                        orgUnitParent,
                        programsList
                    )
                }
            })
        }
    }

    getMetadata = () => {
        // metadata
    }

    getDataPerSettingType = (settingType, orgUnitList, programList) => {
        // after checking setting type, get promise data

        const teiPromises = []
        const _tei = (parseInt(settingType.sizeTEI) / 20).toFixed()
        const _event = (parseInt(settingType.sizeEvent) / 20).toFixed()
        const _teiProgram = (parseInt(settingType.sizeTEI) / 20).toFixed()
        const _eventProgrm = (parseInt(settingType.sizeEvent) / 20).toFixed()

        /* let organisationUnitIDLists = {
            orgUnit: orgUnitCompleteList,
            orgUnitParents: orgUnitParent
        } */

        let settingsObject = {
            orgUnit: '',
            page: '',
            program: '',
        }

        switch (
            settingType.type //this.specificSettings
        ) {
            case undefined:
                // if it's global or doesn't have specific settings
                // with ou Parents and "DESCENDENT"

                orgUnitList.orgUnitParents.forEach(orgUnit => {
                    for (let i = 1; i <= _tei; i++) {
                        settingsObject = {
                            orgUnit: orgUnit,
                            page: i,
                            program: '',
                        }
                        teiPromises.push(
                            this.props.d2.Api.getApi().get(
                                'trackedEntityInstances',
                                /* {
                                    page: `${i}`,
                                    pageSize: 20,
                                    ou: `${orgUnit}`,
                                    ouMode: 'DESCENDANTS',
                                    fields:
                                        'trackedEntityInstance,created,lastUpdated,orgUnit,trackedEntityType,coordinates,featureType,deleted,attributes[attribute,value,created,lastUpdated],relationships[trackedEntityInstanceA,trackedEntityInstanceB,relationship,relationshipName,relationshipType,created,lastUpdated,from[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],to[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],relative],enrollments[enrollment,created,lastUpdated,orgUnit,program,enrollmentDate,incidentDate,followup,status,deleted,trackedEntityInstance,coordinate,events[event,enrollment,created,lastUpdated,status,coordinate,program,programStage,orgUnit,eventDate,completedDate,deleted,dueDate,attributeOptionCombo,dataValues[dataElement,storedBy,value,created,lastUpdated,providedElsewhere]],notes[note,value,storedBy,storedDate]]',
                                    includeAllAttributes: true,
                                    includeDeleted: true,
                                } */
                                testAndroidQuery.trackedEntityInstance(
                                    undefined,
                                    settingsObject
                                )
                            )
                        )
                    }

                    for (let j = 1; j <= _event; j++) {
                        teiPromises.push(
                            this.props.d2.Api.getApi().get('events', {
                                page: `${j}`,
                                pageSize: 20,
                                orgUnit: `${orgUnit}`,
                                ouMode: 'DESCENDANTS',
                                includeAllAttributes: true,
                                includeDeleted: true,
                            })
                        )
                    }
                })

                break
            case 'global':
                // if it's global or doesn't have specific settings
                // with ou Parents and "DESCENDENT"

                orgUnitList.orgUnitParents.forEach(orgUnit => {
                    for (let i = 1; i <= _tei; i++) {
                        settingsObject = {
                            orgUnit: orgUnit,
                            page: i,
                            program: '',
                        }
                        teiPromises.push(
                            this.props.d2.Api.getApi().get(
                                'trackedEntityInstances',
                                /* {
                                    page: `${i}`,
                                    pageSize: 20,
                                    ou: `${orgUnit}`,
                                    ouMode: 'DESCENDANTS',
                                    fields:
                                        'trackedEntityInstance,created,lastUpdated,orgUnit,trackedEntityType,coordinates,featureType,deleted,attributes[attribute,value,created,lastUpdated],relationships[trackedEntityInstanceA,trackedEntityInstanceB,relationship,relationshipName,relationshipType,created,lastUpdated,from[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],to[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],relative],enrollments[enrollment,created,lastUpdated,orgUnit,program,enrollmentDate,incidentDate,followup,status,deleted,trackedEntityInstance,coordinate,events[event,enrollment,created,lastUpdated,status,coordinate,program,programStage,orgUnit,eventDate,completedDate,deleted,dueDate,attributeOptionCombo,dataValues[dataElement,storedBy,value,created,lastUpdated,providedElsewhere]],notes[note,value,storedBy,storedDate]]',
                                    includeAllAttributes: true,
                                    includeDeleted: true,
                                } */
                                testAndroidQuery.trackedEntityInstance(
                                    'global',
                                    settingsObject
                                )
                            )
                        )
                    }

                    for (let j = 1; j <= _event; j++) {
                        teiPromises.push(
                            this.props.d2.Api.getApi().get('events', {
                                page: `${j}`,
                                pageSize: 20,
                                orgUnit: `${orgUnit}`,
                                ouMode: 'DESCENDANTS',
                                includeAllAttributes: true,
                                includeDeleted: true,
                            })
                        )
                    }
                    //console.log('tei promise', teiPromises, tei)
                })

                break
            case 'ou':
                // per ou
                // should put every single ou capture by itself with no ouMode

                orgUnitList.orgUnit.forEach(orgUnit => {
                    for (let i = 1; i <= _tei; i++) {
                        settingsObject = {
                            orgUnit: orgUnit,
                            page: i,
                            program: '',
                        }
                        teiPromises.push(
                            this.props.d2.Api.getApi().get(
                                'trackedEntityInstances',
                                /* {
                                    page: `${i}`,
                                    pageSize: 20,
                                    ou: `${orgUnit}`,
                                    fields:
                                        'trackedEntityInstance,created,lastUpdated,orgUnit,trackedEntityType,coordinates,featureType,deleted,attributes[attribute,value,created,lastUpdated],relationships[trackedEntityInstanceA,trackedEntityInstanceB,relationship,relationshipName,relationshipType,created,lastUpdated,from[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],to[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],relative],enrollments[enrollment,created,lastUpdated,orgUnit,program,enrollmentDate,incidentDate,followup,status,deleted,trackedEntityInstance,coordinate,events[event,enrollment,created,lastUpdated,status,coordinate,program,programStage,orgUnit,eventDate,completedDate,deleted,dueDate,attributeOptionCombo,dataValues[dataElement,storedBy,value,created,lastUpdated,providedElsewhere]],notes[note,value,storedBy,storedDate]]',
                                    includeAllAttributes: true,
                                    includeDeleted: true,
                                } */
                                testAndroidQuery.trackedEntityInstance(
                                    'ou',
                                    settingsObject
                                )
                            )
                        )
                    }

                    for (let j = 1; j <= _event; j++) {
                        teiPromises.push(
                            this.props.d2.Api.getApi().get('events', {
                                page: `${j}`,
                                pageSize: 20,
                                orgUnit: `${orgUnit}`,
                                includeAllAttributes: true,
                                includeDeleted: true,
                            })
                        )
                    }
                })

                break
            case 'program':
                // per program
                // I should get programTEI also if OUPrograms have specificSettings
                // should add a for programs

                programList.forEach(program => {
                    orgUnitList.orgUnitParents.forEach(orgUnit => {
                        for (let i = 1; i <= _teiProgram; i++) {
                            settingsObject = {
                                orgUnit: orgUnit,
                                page: i,
                                program: program,
                            }
                            teiPromises.push(
                                this.props.d2.Api.getApi().get(
                                    'trackedEntityInstances',
                                    /* {
                                        page: `${i}`,
                                        pageSize: 20,
                                        ou: `${orgUnit}`,
                                        ouMode: 'DESCENDANTS',
                                        programs: `${program}`,
                                        fields:
                                            'trackedEntityInstance,created,lastUpdated,orgUnit,trackedEntityType,coordinates,featureType,deleted,attributes[attribute,value,created,lastUpdated],relationships[trackedEntityInstanceA,trackedEntityInstanceB,relationship,relationshipName,relationshipType,created,lastUpdated,from[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],to[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],relative],enrollments[enrollment,created,lastUpdated,orgUnit,program,enrollmentDate,incidentDate,followup,status,deleted,trackedEntityInstance,coordinate,events[event,enrollment,created,lastUpdated,status,coordinate,program,programStage,orgUnit,eventDate,completedDate,deleted,dueDate,attributeOptionCombo,dataValues[dataElement,storedBy,value,created,lastUpdated,providedElsewhere]],notes[note,value,storedBy,storedDate]]',
                                        includeAllAttributes: true,
                                        includeDeleted: true,
                                    } */
                                    testAndroidQuery.trackedEntityInstance(
                                        'program',
                                        settingsObject
                                    )
                                )
                            )
                        }

                        for (let j = 1; j <= _eventProgrm; j++) {
                            teiPromises.push(
                                this.props.d2.Api.getApi().get('events', {
                                    page: `${j}`,
                                    pageSize: 20,
                                    orgUnit: `${orgUnit}`,
                                    ouMode: 'DESCENDANTS',
                                    programs: `${program}`,
                                    includeAllAttributes: true,
                                    includeDeleted: true,
                                })
                            )
                        }
                    })
                    //console.log('tei promise', teiPromises, tei)
                })
                break
            case 'ouProgram':
                // per program & per ou

                orgUnitList.orgUnit.forEach(orgUnit => {
                    programList.forEach(program => {
                        for (let i = 1; i <= _tei; i++) {
                            settingsObject = {
                                orgUnit: orgUnit,
                                page: i,
                                program: program,
                            }
                            teiPromises.push(
                                this.props.d2.Api.getApi().get(
                                    'trackedEntityInstances',
                                    /* {
                                        page: `${i}`,
                                        pageSize: 20,
                                        ou: `${orgUnit}`,
                                        programs: `${program}`, //`${VBqh0ynB2wv}`
                                        fields:
                                            'trackedEntityInstance,created,lastUpdated,orgUnit,trackedEntityType,coordinates,featureType,deleted,attributes[attribute,value,created,lastUpdated],relationships[trackedEntityInstanceA,trackedEntityInstanceB,relationship,relationshipName,relationshipType,created,lastUpdated,from[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],to[trackedEntityInstance[trackedEntityInstance],enrollment[enrollment],event[event]],relative],enrollments[enrollment,created,lastUpdated,orgUnit,program,enrollmentDate,incidentDate,followup,status,deleted,trackedEntityInstance,coordinate,events[event,enrollment,created,lastUpdated,status,coordinate,program,programStage,orgUnit,eventDate,completedDate,deleted,dueDate,attributeOptionCombo,dataValues[dataElement,storedBy,value,created,lastUpdated,providedElsewhere]],notes[note,value,storedBy,storedDate]]',
                                        includeAllAttributes: true,
                                        includeDeleted: true,
                                    } */
                                    testAndroidQuery.trackedEntityInstance(
                                        'ouProgram',
                                        settingsObject
                                    )
                                )
                            )
                        }

                        for (let j = 1; j <= _event; j++) {
                            teiPromises.push(
                                this.props.d2.Api.getApi().get('events', {
                                    page: `${j}`,
                                    pageSize: 20,
                                    orgUnit: `${orgUnit}`,
                                    programs: `${program}`,
                                    includeAllAttributes: true,
                                    includeDeleted: true,
                                })
                            )
                        }
                    })
                    //console.log('tei promise', teiPromises, tei)
                })

                break
            default:
                console.log(this.specificSettings)
                break
        }

        return teiPromises
    }

    checkType = (type, settingType) => {
        switch (type) {
            case 'Global':
                settingType = 'global'
                break
            case 'Per Org Unit':
                settingType = 'ou'
                break
            case 'Per program':
                settingType = 'program'
                break
            case 'Per OU and program':
                settingType = 'ouProgram'
                break
            case 'All Org Units':
                settingType = 'global'
                break
            default:
                break
        }

        return settingType
    }

    getSettingsID = array => {
        array[1].id = array[0]
        return array[1]
    }

    getData = (orgUnitCompleteList, orgUnitParent, programList) => {
        const teiPromises = []
        const settingTypeArray = []
        const organisationUnitIDLists = {
            orgUnit: orgUnitCompleteList,
            orgUnitParents: orgUnitParent,
        }
        let temporalType = undefined
        let _settingType = undefined
        let _temporalObject = {}
        const _tempPromises = []

        console.log('program list', programList, organisationUnitIDLists)

        console.log(this.globalSettings)
        temporalType = this.checkType(
            this.globalSettings.settingDownload,
            _settingType
        )
        _temporalObject = {
            type: temporalType,
            sizeTEI: this.globalSettings.teiDownload,
            sizeEvent: this.globalSettings.eventsDownload,
        }

        settingTypeArray.push(_temporalObject)

        if (this.specificSettings !== undefined) {
            console.log(this.specificSettings)
            _temporalObject = {}
            _settingType = undefined
            temporalType = undefined
            const _temporalSettingsArray = Object.entries(this.specificSettings)
            const _specificSettingArray = []
            _temporalSettingsArray.forEach(array => {
                const tempt = this.getSettingsID(array)
                _specificSettingArray.push(tempt)
            })

            _specificSettingArray.forEach(specificSetting => {
                temporalType = this.checkType(
                    specificSetting.specificSettingDownload,
                    _settingType
                )
                _temporalObject = {
                    id: specificSetting.id,
                    type: temporalType,
                    sizeTEI: specificSetting.specificTeiDownload,
                    sizeEvent: specificSetting.specificEventsDownload,
                }
                settingTypeArray.push(_temporalObject)
            })

            console.log('setting type for specific settings', settingTypeArray)
        }

        // should check every program (program associated to OU)
        settingTypeArray.forEach(settingType => {
            const _tempSettingType = this.getDataPerSettingType(
                settingType,
                organisationUnitIDLists,
                programList
            )
            _tempPromises.push(_tempSettingType)
        })

        _tempPromises.forEach(promise => {
            promise.forEach(prom => {
                teiPromises.push(prom)
            })
        })

        console.log('promises', _tempPromises, teiPromises, teiPromises.length)

        Promise.all(teiPromises)
            .then(data => {
                console.log(
                    'TEI',
                    data,
                    memorySizeOf(data),
                    formatByteSize(memorySizeOf(data))
                )
                const dataSizeDownload = formatByteSize(memorySizeOf(data))
                this.setState({
                    dataLoad: false,
                    dataSize: dataSizeDownload,
                })
            })
            .catch(error => console.log({ errorDataDwn: error }))
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
            .list(testAndroidQuery.user)
            .then(collection => {
                const usersOptions = collection.toArray()
                this.usersOptions = usersOptions
                this.usersOptionsComplete = usersOptions
                console.log('userOptions', this.usersOptionsComplete)
                this.setState({
                    loading: false,
                })
            })

        api.getValue('ANDROID_SETTING_APP', 'program_settings')
            .then(res => {
                console.log('getvalue api', res)
                this.globalSettings = res.value.globalSettings
                this.specificSettings = res.value.specificSettings
            })
            .catch(e => console.log('error', e))
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
                programLoad={this.state.programLoad}
                programRuleLoad={this.state.programRuleLoad}
                metadataLoad={this.state.metadataLoad}
                dataLoad={this.state.dataLoad}
            />
        )
    }
}

export default TestAndroidContainer
