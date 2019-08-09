import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import { Divider, Grid } from '@material-ui/core'
import { CircularProgress } from '@dhis2/d2-ui-core'
import TextFieldSearch from './text-field-search'
import Tooltip from '@material-ui/core/Tooltip'
import {
    testAndroidConstants,
    testAndroidDataConstants,
} from '../constants/test-android'

const style = {
    button: {
        margin: '20px 0px 10px 0px',
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}

class TestAndroid extends React.Component {
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
        this.tooltipOUCapture = undefined
        this.tooltipOUSearch = undefined
        this.tooltipDataSet = undefined
        this.tooltipProgram = undefined
        this.tooltipProgramRule = undefined
        this.tooltipMetadata = undefined
        this.tooltipData = undefined
    }

    state = {
        username: '',
        runTest: false,
        loading: true,
        disabled: true,
        errorUsername: false,
    }

    clearFields = () => {
        this.userSelected = undefined
        this.userSelectedId = undefined
        this.organisationUnitsNumber = 0
        this.organisationUnitSearchNumber = 0
        this.datasetNumber = 0
        this.programNumber = 0
        this.programRuleNumber = 0
    }

    createTooltipText = () => {
        testAndroidConstants.forEach(test => {
            const tooltip = `Min: ${test.min} 
            Normal: ${test.normal}
            Max: ${test.max}`

            this[test.value] = tooltip
        })
    }

    handleChange = e => {
        console.log({
            [e.target.name]: e.target.value,
        })

        this.clearFields()

        this.props.d2.models.users
            .list({
                paging: false,
                level: 1,
                filter: `id:eq:${e.target.value}`,
            })
            .then(collection => {
                const user = collection.toArray()[0]

                this.userSelected = user
                console.log(
                    'user selected',
                    user,
                    this.userSelected,
                    collection.toArray()[0]
                )
                this.userSelectedId = e.target.value
            })

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
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
            console.log(`key: ${key}, value: ${value}`)
        })

        organisationUnitSearch.forEach((value, key) => {
            organisationUnitSearchList.push(key)
            console.log(`key: ${key}, value: ${value}`)
        })
        console.log(
            'user',
            this.userSelected.organisationUnits.valuesContainerMap,
            this.userSelectedId,
            organisationUnitList
        )

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
                console.log('data promises search', data, data[0].toArray())
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
                                console.log(programPerOU)
                                oucapture.programs.valuesContainerMap.forEach(
                                    (value, key) => {
                                        console.log('key program', key)
                                        if (programsList.length >= 1) {
                                            const programIds = programsList.filter(
                                                program => program !== key
                                            )
                                            //programsList.filter(program => program)
                                            programsList = programIds
                                            programsList.push(key)
                                            console.log({
                                                status: 'filtrado lenght > 1',
                                                key: key,
                                                programIdListAfterFilter: programIds,
                                                programListAfterKey: programsList,
                                            })
                                        } else {
                                            programsList.push(key)
                                            console.log(
                                                'program 1',
                                                programsList
                                            )
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
                            })
                        })
                    })
                    console.log(organisationUnitCapture, data.length)
                    this.organisationUnitsNumber =
                        organisationUnitCapture.length
                }

                if ((dataSetList.length > 0) & (programsList.length > 0)) {
                    console.log('data set lista', dataSetList)
                    Promise.all([
                        this.props.d2.models.dataSets.list({
                            paging: false,
                            filter: `id:in:[${dataSetList}]`,
                        }),
                        this.props.d2.models.program.list({
                            paging: false,
                            filter: `id:in:[${programsList}]`,
                        }),
                        this.props.d2.models.programRules.list({
                            paging: false,
                            filter: `program.id:in:[${programsList}]`,
                        }),
                    ]).then(([datasets, programs, programRules]) => {
                        const datasetToAccess = datasets.toArray()
                        console.log('dataset', datasetToAccess)
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
                        console.log('programs list data', programsToAccess)
                        const programRulesToAccess = programRules.toArray()
                        console.log(programRulesToAccess)

                        this.programNumber = programsToAccess.length
                        this.datasetNumber = datasetToAccess.length
                        this.programRuleNumber = programRulesToAccess.length

                        this.setState({
                            loading: false,
                            runTest: true,
                            disabled: true,
                        })
                    })
                }
            })
        }
    }

    checkUsername = userToCheck => {
        console.log(
            'username',
            this.usersOptionsComplete,
            this.usersOptionsComplete[0],
            this.usersOptionsComplete[0].name
        )

        this.clearFields()
        if (userToCheck.length > 3) {
            const foundUser = this.usersOptionsComplete.find(
                user => user.name === userToCheck
            )
            console.log('found user', foundUser)

            if (foundUser !== undefined) {
                this.props.d2.models.users
                    .list({
                        paging: false,
                        level: 1,
                        filter: `id:eq:${foundUser.id}`,
                    })
                    .then(collection => {
                        const user = collection.toArray()[0]
                        this.userSelected = user
                        console.log('user selected', user, this.userSelected)
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
                console.log({
                    'data set list': usersOptions,
                    'collection-wholeDate': collection,
                })
                // 'contentLength': collection.headers.get("content-length")
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
            <div>
                <div>
                    <p className="main-content__title main-content__title__main">
                        Test Android Login
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        Enter a user to check access to
                    </p>
                </div>

                <div>
                    <TextFieldSearch
                        suggestions={this.usersOptionsComplete}
                        handleChange={this.handleChange}
                        checkUsername={this.checkUsername}
                        clearFields={this.clearFields}
                        suggestionPreSelected={this.state.username}
                    />

                    {this.state.runTest && (
                        <div className="data__top-margin">
                            {testAndroidDataConstants.map(test => (
                                <div key={test.state}>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <small className="subitem-title">
                                                {test.title}
                                            </small>
                                            <p className="subitem-item">
                                                {test.description}
                                            </p>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Tooltip
                                                title={this[test.tooltipTitle]}
                                                placement="bottom"
                                            >
                                                <p className="subitem-item subitem-bigitem">
                                                    {this[test.state]}
                                                </p>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={style.container}>
                        <Button
                            raised
                            style={style.button}
                            onClick={this.handleRun}
                            disabled={this.state.disabled}
                        >
                            RUN TEST
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TestAndroid
