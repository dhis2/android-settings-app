import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@dhis2/d2-ui-core'
import { Divider, Grid } from '@material-ui/core'
import { CircularProgress } from '@dhis2/d2-ui-core'
import MenuItem from 'material-ui/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import { testAndroidConstants } from '../constants/test-android'

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
        this.userGroupOptions = []
        this.usersOptions = []
        this.usersOptionsComplete = []
        this.userGroupOptionsComplete = []
        this.userGroupIds = []
        this.userSelected = undefined
        this.userSelectedId = undefined
        this.organisationUnitsNumber = 0
        this.organisationUnitSearchNumber = 0
        this.datasetNumber = 0
        this.programNumber = 0
        this.programRuleNumber = 0
        this.tooltipOUCapture = undefined
        this.tooltipOUSearch = undefined
        this.tooltipDataSet = undefined
        this.tooltipProgram = undefined
        this.tooltipProgramRule = undefined
    }

    state = {
        userGroup: '',
        username: '',
        runTest: false,
        loading: true,
        disabled: false,
    }

    clearFields = () => {
        this.userGroupIds = []
        this.userSelected = undefined
        this.userSelectedId = undefined
        this.organisationUnitsNumber = 0
        this.organisationUnitSearchNumber = 0
        this.datasetNumber = 0
        this.programNumber = 0
        this.programRuleNumber = 0
    }

    createTooltipText = () => {
        const organisationUnitCapture = `Min: ${testAndroidConstants.organisationUnitCapture.min} 
            Normal: ${testAndroidConstants.organisationUnitCapture.normal}
            Max: ${testAndroidConstants.organisationUnitCapture.max}`

        const organisationUnitSearch = `Min: ${testAndroidConstants.organisationUnitSearch.min} 
            Normal: ${testAndroidConstants.organisationUnitSearch.normal}
            Max: ${testAndroidConstants.organisationUnitSearch.max}`

        const dataSet = `Min: ${testAndroidConstants.dataSet.min} 
            Normal: ${testAndroidConstants.dataSet.normal}
            Max: ${testAndroidConstants.dataSet.max}`

        const program = `Min: ${testAndroidConstants.program.min} 
            Normal: ${testAndroidConstants.program.normal}
            Max: ${testAndroidConstants.program.max}`

        const programRules = `Min: ${testAndroidConstants.programRules.min} 
            Normal: ${testAndroidConstants.programRules.normal}
            Max: ${testAndroidConstants.programRules.max}`

        this.tooltipOUCapture = organisationUnitCapture
        this.tooltipOUSearch = organisationUnitSearch
        this.tooltipDataSet = dataSet
        this.tooltipProgram = program
        this.tooltipProgramRule = programRules
    }

    handleChange = e => {
        console.log({
            [e.target.name]: e.target.value,
        })

        this.clearFields()

        /* const d2Api = this.props.d2.Api.getApi()
        d2Api.get()
        .then(data => console.log('data', data) ) */

        this.props.d2.models.users
            .list({
                paging: false,
                level: 1,
                filter: `id:eq:${e.target.value}`,
            })
            .then(collection => {
                const user = collection.toArray()[0]

                const group = user.userGroups.valuesContainerMap
                const userGroup = []
                group.forEach(element => {
                    userGroup.push(element)
                })
                this.userGroupIds = userGroup
                console.log('userGroup Id', group, userGroup)

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
        //const dataSetList = []
        let programsList = []
        const programsIdAccess = []
        const organisationUnitSearchList = []
        // const programRuleList = []
        const promisesOrganisationUnits = []
        const organisationUnitCapture = []
        const promisesOrganisationUnitsSearch = []
        const organisationUnitSearchCollection = []

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
            organisationUnitSearchList.map(orgUnitSearch => {
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
                    data.map(orgUnitData => {
                        orgUnitData.toArray().map(ousearch => {
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
            organisationUnitList.map(orgUnit => {
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
                    data.map(orgUnitData => {
                        orgUnitData.toArray().map(oucapture => {
                            organisationUnitCapture.push(oucapture)
                            const programPerOU = []
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

                            console.log(programPerOU)
                        })
                    })
                    console.log(organisationUnitCapture, data.length)
                    this.organisationUnitsNumber =
                        organisationUnitCapture.length
                }

                if (programsList.length > 0) {
                    this.props.d2.models.program
                        .list({
                            paging: false,
                            filter: `id:in:[${programsList}]`,
                        })
                        .then(data => {
                            const programs = data.toArray()
                            programs.forEach(program => {
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
                            })

                            this.programNumber = programsIdAccess.length
                            console.log('programs list data', programsIdAccess)

                            this.setState({
                                loading: false,
                                runTest: true,
                            })
                        })
                }
            })
        }
    }

    handleRun = () => {
        console.log('run')
        this.setState({
            loading: true,
        })

        this.getUserData()
    }

    async componentDidMount() {
        this.createTooltipText()
        this.props.d2.models.userGroups
            .list({
                paging: false,
                level: 1,
                fields: 'id,name',
            })
            .then(collection => {
                const userGroupOptions = collection.toArray()
                /* for (const i in userGroupOptions) {
                    console.log(userGroupOptions[i].users)
                     userGroupOptions[i].users
                    .then(users => (console.log("users", users)))
                } */
                this.userGroupOptions = userGroupOptions
                this.userGroupOptionsComplete = userGroupOptions
                console.log('data set list', this.userGroupOptionsComplete)
            })
            .then(users => console.log('users ', users))

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
                console.log('data set list', usersOptions)
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
                    {/* <TextField
                        id="userGroup"
                        name="userGroup"
                        label="User Group"
                        type="text"
                        margin="normal"
                        select
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.userGroup}
                        onChange={this.handleChange}
                    > 
                        {this.userGroupOptions.map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField> */}

                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        margin="normal"
                        select
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.username}
                        onChange={this.handleChange}
                    >
                        {this.usersOptions.map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {this.state.runTest && (
                        <div className="data__top-margin">
                            <Grid container>
                                <Grid item xs={10}>
                                    <small className="subitem-title">
                                        Org Units capture
                                    </small>
                                    <p className="subitem-item">
                                        Number of org unit that are available
                                        for data capture
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <Tooltip
                                        title={this.tooltipOUCapture}
                                        placement="bottom"
                                    >
                                        <p className="subitem-item">
                                            {this.organisationUnitsNumber}
                                        </p>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={10}>
                                    <small className="subitem-title">
                                        Org Units search
                                    </small>
                                    <p className="subitem-item">
                                        Number of org unit that are available
                                        for data capture
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <Tooltip
                                        title={this.tooltipOUSearch}
                                        placement="bottom"
                                    >
                                        <p className="subitem-item">
                                            {this.organisationUnitSearchNumber}
                                        </p>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={10}>
                                    <small className="subitem-title">
                                        Data sets associated to OU capture of
                                        user
                                    </small>
                                    <p className="subitem-item">
                                        Number of datasets associated to capture
                                        OUs
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <Tooltip
                                        title={this.tooltipDataSet}
                                        placement="bottom"
                                    >
                                        <p className="subitem-item">
                                            {this.datasetNumber}
                                        </p>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={10}>
                                    <small className="subitem-title">
                                        Program associated to OU
                                    </small>
                                    <p className="subitem-item">
                                        Number of program associated to capture
                                        OUs
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <Tooltip
                                        title={this.tooltipProgram}
                                        placement="bottom"
                                    >
                                        <p className="subitem-item">
                                            {this.programNumber}
                                        </p>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container>
                                <Grid item xs={10}>
                                    <small className="subitem-title">
                                        Program rules associated to OU
                                    </small>
                                    <p className="subitem-item">
                                        Number of program rules to capture OUs
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <Tooltip
                                        title={this.tooltipProgramRule}
                                        placement="bottom"
                                    >
                                        <p className="subitem-item">
                                            {this.programRuleNumber}
                                        </p>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Divider />
                        </div>
                    )}

                    <div style={style.container}>
                        <Button
                            raised
                            style={style.button}
                            onClick={this.handleRun}
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

/*  < Table className = "data-table" >
        <TableBody className="data-table__rows">
            <TableRow>
                <TableCell></TableCell>
            </TableRow>
        </TableBody>
                    </Table > */
