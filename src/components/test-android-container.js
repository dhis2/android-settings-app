import React from 'react'

import { CircularProgress } from '@dhis2/d2-ui-core'

import {
    testAndroidConstants,
    testAndroidDataConstants,
} from '../constants/test-android'
import TestAndroid from './test-android'
import memorySizeOf from '../utils/memory-size'
//import main from '../utils/puppeteer'

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

    getUserData = async () => {
        const organisationUnits = this.userSelected.organisationUnits
            .valuesContainerMap

        const organisationUnitSearch = this.userSelected
            .teiSearchOrganisationUnits.valuesContainerMap

        const organisationUnitList = []
        let dataSetList = []
        let programsList = []
        const programsValuesList = []
        const programsIdAccess = []
        const organisationUnitSearchList = []
        // const programRuleList = []
        const promisesOrganisationUnits = []
        const organisationUnitCapture = []
        const promisesOrganisationUnitsSearch = []
        const organisationUnitSearchCollection = []
        const datasetsIdAccess = []

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
                    })
                )
            })

            await Promise.all(promisesOrganisationUnits).then(data => {
                console.log('data promises ou', data, data[0].toArray())
                if (data.length > 0) {
                    data.forEach(orgUnitData => {
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
                                            //programsList.filter(program => program)
                                            programsList = programIds
                                            programsList.push(key)
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
                                        } else {
                                            dataSetList.push(key)
                                        }
                                    }
                                )
                            }
                            console.log({
                                dataset: dataSetList,
                                program: programsList,
                                programV: programsValuesList,
                            })
                        })
                    })
                    this.organisationUnitsNumber =
                        organisationUnitCapture.length
                }

                if ((dataSetList.length > 0) & (programsList.length > 0)) {
                    console.log('data set lista', dataSetList)
                    Promise.all([
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
                        /* this.props.d2.models.trackedEntityTypes.list({
                            paging: false,
                            filter: `program.id:in:[${programsList}]`,
                            fields: 'id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName,description,displayDescription,trackedEntityTypeAttributes[trackedEntityType[id],trackedEntityAttribute[id],displayInList,mandatory,searchable],style[color,icon]'
                        }), */
                        this.props.d2.models.relationshipTypes.list({
                            paging: false,
                            fields:
                                'id,code,name,displayName,created,lastUpdated,deleted,bIsToA,aIsToB,fromConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]],toConstraint[id,code,name,displayName,created,lastUpdated,deleted,relationshipEntity,trackedEntityType[id],program[id],programStage[id]]',
                        }),
                        /* this.props.d2.models.optionSets.list({
                            paging: false,
                            filter: `program.id:in:[${programsList}]`,
                            fields: 'id,code,name,displayName,created,lastUpdated,deleted,version,valueType,options[id,code,name,displayName,created,lastUpdated,deleted,sortOrder,optionSet[id],style[color,icon]]'
                        }) */
                    ]).then(
                        ([
                            datasets,
                            programs,
                            programRules,
                            programStages,
                            relationshipTypes,
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
                            })
                            /* datasets.forEach(dataset => {
                                switch (dataset.publicAccess) {
                                    case 'r-------':
                                        // if user userGroupAccess, if user userAccess
                                        console.log(
                                            'access r',
                                            dataset,
                                            datasetsIdAccess
                                        )
                                        break
                                    case 'rw------':
                                        programsIdAccess.push(dataset)
                                        console.log(
                                            'access rw',
                                            dataset,
                                            datasetsIdAccess
                                        )
                                        break
                                    case 'rwr-----':
                                        datasetsIdAccess.push(dataset)
                                        break
                                    case 'rwrw----':
                                        datasetsIdAccess.push(dataset)
                                        break
                                    case 'rwrwr---':
                                        datasetsIdAccess.push(dataset)
                                        break
                                    case 'rwrwrw--':
                                        datasetsIdAccess.push(dataset)
                                        break
                                    case 'rwrwrwr-':
                                        datasetsIdAccess.push(dataset)
                                        break
                                    case 'rwrwrwrw':
                                        datasetsIdAccess.push(dataset)
                                        break
                                    default:
                                        break
                                }
                            }) */
                            const programsToAccess = programs.toArray()
                            /* programs.forEach(program => {
                                switch (program.publicAccess) {
                                    case 'r-------':
                                        // if user userGroupAccess, if user userAccess
                                        console.log(
                                            'access r',
                                            program,
                                            programsIdAccess
                                        )
                                        break
                                    case 'rw------':
                                        programsIdAccess.push(program)
                                        console.log(
                                            'access rw',
                                            program,
                                            programsIdAccess
                                        )
                                        break
                                    case 'rwr-----':
                                        programsIdAccess.push(program)
                                        break
                                    case 'rwrw----':
                                        programsIdAccess.push(program)
                                        break
                                    case 'rwrwr---':
                                        programsIdAccess.push(program)
                                        break
                                    case 'rwrwrw--':
                                        programsIdAccess.push(program)
                                        break
                                    case 'rwrwrwr-':
                                        programsIdAccess.push(program)
                                        break
                                    case 'rwrwrwrw':
                                        programsIdAccess.push(program)
                                        break
                                    default:
                                        break
                                }
                            }) */

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
                                loading: false,
                                runTest: true,
                                disabled: true,
                                organisationUnitSearchNumber: this
                                    .organisationUnitSearchNumber,
                                organisationUnitsNumber: this
                                    .organisationUnitsNumber,
                                programNumber: this.programNumber,
                                datasetNumber: this.datasetNumber,
                                programRuleNumber: this.programRuleNumber,
                            })
                        }
                    )
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
                fields: 'id,name',
            })
            .then(collection => {
                const usersOptions = collection.toArray()
                this.usersOptions = usersOptions
                this.usersOptionsComplete = usersOptions
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
            />
        )
    }
}

export default TestAndroidContainer
