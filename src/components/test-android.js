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
        console.log(props)
        this.userGroupOptions = []
        this.usersOptions = []
        this.usersOptionsComplete = []
        this.userGroupOptionsComplete = []
        this.userGroupIds = []
        this.userSelected = undefined
        this.userSelectedId = undefined
        this.organisationUnitsNumber = undefined
        this.organisationUnitSearchNumber = undefined
        this.datasetNumber = undefined
        this.programNumber = undefined
        this.programRuleNumber = undefined
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
        this.organisationUnitsNumber = undefined
        this.organisationUnitSearchNumber = undefined
        this.datasetNumber = undefined
        this.programNumber = undefined
        this.programRuleNumber = undefined
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

    getUserData = () => {
        const organisationUnits = this.userSelected.organisationUnits
            .valuesContainerMap

        const organisationUnitList = []
        const dataSetList = []
        const programsList = []
        const programsId = []
        const organisationUnitSearch = []
        const programRuleList = []

        organisationUnits.forEach((value, key) => {
            organisationUnitList.push(key)
            console.log(`key: ${key}, value: ${value}`)
        })
        console.log(
            'user',
            this.userSelected.organisationUnits.valuesContainerMap,
            this.userSelectedId,
            organisationUnitList
        )

        this.props.d2.models.organisationUnits
            .list({
                paging: false,
                filter: `id:in:[${organisationUnitList}]`,
            })
            .then(data => {
                const orgUnitData = data.toArray()
                this.organisationUnitsNumber = orgUnitData.length
                console.log(orgUnitData, this.organisationUnitsNumber)
                for (const i in orgUnitData) {
                    const dataSet = orgUnitData[i].dataSets.valuesContainerMap
                    const programs = orgUnitData[i].programs.valuesContainerMap

                    console.log(
                        'data para program y dataset',
                        programs,
                        dataSet
                    )

                    dataSet.forEach((value, key) => {
                        dataSetList.push(key)
                        console.log(`key: ${key}, value: ${value}`)
                    })

                    if (programs.size > 0) {
                        programs.forEach((value, key) => {
                            const program = {
                                id: key,
                                value: value,
                            }
                            programsList.push(program)
                            programsId.push(key)
                            console.log(`key: ${key}, value: ${value}`)
                        })

                        this.props.d2.models.program
                            .list({
                                paging: false,
                                filter: `id:in:[${programsId}]`,
                            })
                            .then(data => {
                                const programsListForOUSearch = data.toArray()
                                /* for (let j in programsListForOUSearch) {
                                let orgUnitSearch = programsListForOUSearch[j].organisationUnits.valuprogramsListForOUSearchesContainerMap
                                orgUnitSearch.forEach((value, key) => {
                                    if (organisationUnitSearch.length > 0) {
                                        organisationUnitSearch.filter( ouSearch => ouSearch !== key )
                                    }
                                    organisationUnitSearch.push(key)
                                })
                            } */
                                console.log(
                                    'programas',
                                    programsListForOUSearch
                                )
                            })
                    }

                    this.organisationUnitSearchNumber =
                        organisationUnitSearch.length > 0
                            ? organisationUnitSearch.length
                            : 0
                    this.datasetNumber =
                        dataSetList.length > 0 ? dataSetList.length : 0
                    this.programNumber =
                        programsList.length > 0 ? programsList.length : 0
                    this.programRuleNumber =
                        programRuleList.length > 0 ? programRuleList.length : 0
                }
                console.log(
                    'data OU',
                    data.toArray()[0],
                    data.toArray(),
                    dataSetList,
                    programsList,
                    this.datasetNumber,
                    this.programNumber,
                    this.organisationUnitsNumber
                )

                this.setState({
                    loading: false,
                    runTest: true,
                })
            })

        /* if (programsList.length > 0) {
            this.props.d2.models.program.list({
                paging: false,
                filter: `id:in:[${programsList}]`
            })
            .then (data => {
                let programs = data.toArray()
                console.log(programs)
            })
        } */
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
                for (const i in userGroupOptions) {
                    console.log(userGroupOptions[i].users)
                    /*  userGroupOptions[i].users
                    .then(users => (console.log("users", users))) */
                }
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
