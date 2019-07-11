import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import { CircularProgress } from '@dhis2/d2-ui-core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Table from '@dhis2/d2-ui-table'
import '@dhis2/d2-ui-core/build/css/Table.css'

import DialogDelete from '../components/dialog-delete'
import {
    Program,
    SpecificProgram,
    ProgramSettingsDefault,
} from '../constants/program-settings'
import api from '../utils/api'
import ProgramTable from './program-table'

const programData = Program
const specificProgramData = SpecificProgram
const {
    settingDownload,
    settingDBTrimming,
    teiDownload,
    teiDBTrimmming,
    enrollmentDownload,
    enrollmentDBTrimming,
    enrollmentDateDownload,
    enrollmentDateDBTrimming,
    updateDownload,
    updateDBTrimming,
    teReservedDownload,
    teReservedDBTrimming,
    eventsDownload,
    eventsDBTrimming,
    eventPeriodDownload,
    eventPeriodDBTrimming,
} = ProgramSettingsDefault

class ProgramSettings extends React.Component {
    constructor(props) {
        super(props)

        props.d2.i18n.translations['name'] = 'Program Name'
        props.d2.i18n.translations['sumary_settings'] = 'Sumary Settings'

        props.d2.i18n.translations['edit'] = 'edit'
        props.d2.i18n.translations['delete'] = 'delete'
        props.d2.i18n.translations['actions'] = 'actions'

        this.nameSpace = undefined
        this.keyName = undefined
        this.programNamesList = []
        this.globalSettings = {}
        this.specificSettings = {}
        this.updateGlobal = false
        this.specificSettingsRows = []
        this.programList = []
        this.programListComplete = []
        this.programToChange = undefined
        this.argsRow = undefined
        this.programName = undefined
    }

    state = {
        settingDownload: settingDownload,
        settingDBTrimming: settingDBTrimming,
        teiDownload: teiDownload,
        teiDBTrimmming: teiDBTrimmming,
        enrollmentDownload: enrollmentDownload,
        enrollmentDBTrimming: enrollmentDBTrimming,
        enrollmentDateDownload: enrollmentDateDownload,
        enrollmentDateDBTrimming: enrollmentDateDBTrimming,
        updateDownload: updateDownload,
        updateDBTrimming: updateDBTrimming,
        teReservedDownload: teReservedDownload,
        teReservedDBTrimming: teReservedDBTrimming,
        eventsDownload: eventsDownload,
        eventsDBTrimming: eventsDBTrimming,
        eventPeriodDownload: eventPeriodDownload,
        eventPeriodDBTrimming: eventPeriodDBTrimming,
        specificProgram: {
            openDialog: false,
        },
        specificProgramName: '',
        specificSettingDownload: '',
        specificSettingDBTrimming: '',
        specificTeiDownload: '',
        specificTeiDBTrimming: '',
        specificEnrollmentDownload: '',
        specificEnrollmentDBTrimming: '',
        specificEnrollmentDateDownload: '',
        specificEnrollmentDateDBTrimming: '',
        specificUpdateDownload: '',
        specificUpdateDBTrimming: '',
        specificTEReservedDownload: '',
        specificTEReservedDBTrimming: '',
        specificEventsDownload: '',
        specificEventsDBTrimming: '',
        specificEventPeriodDownload: '',
        specificEventPeriodDBTrimming: '',
        loading: true,
        isUpdated: false,
        deleteDialog: {
            open: false,
        },
    }

    tableActions = {
        edit: (...args) => {
            console.log('Edit', ...args)
            this.programToChange = args[0].name
            const argsData = args[0]
            this.setState({
                specificSettingDownload: argsData.specificSettingDownload,
                specificSettingDBTrimming: argsData.specificSettingDBTrimming,
                specificTeiDownload: argsData.specificTeiDownload,
                specificTeiDBTrimming: argsData.specificTeiDBTrimming,
                specificEnrollmentDownload: argsData.specificEnrollmentDownload,
                specificEnrollmentDBTrimming:
                    argsData.specificEnrollmentDBTrimming,
                specificEnrollmentDateDownload:
                    argsData.specificEnrollmentDateDownload,
                specificEnrollmentDateDBTrimming:
                    argsData.specificEnrollmentDateDBTrimming,
                specificUpdateDownload: argsData.specificUpdateDownload,
                specificUpdateDBTrimming: argsData.specificUpdateDBTrimming,
                specificTEReservedDownload: argsData.specificTEReservedDownload,
                specificTEReservedDBTrimming:
                    argsData.specificTEReservedDBTrimming,
                specificEventsDownload: argsData.specificEventsDownload,
                specificEventsDBTrimming: argsData.specificEventsDBTrimming,
                specificEventPeriodDownload:
                    argsData.specificEventPeriodDownload,
                specificEventPeriodDBTrimming:
                    argsData.specificEventPeriodDBTrimming,
                specificProgramName: argsData.id,
            })
            this.handleClickOpen()
        },
        delete: (...args) => {
            console.log('Delete', ...args)
            this.argsRow = args[0]
            this.programName = args[0].name

            this.setState({
                deleteDialog: {
                    open: true,
                },
                isUpdated: true,
            })
            this.updateGlobal = false
        },
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        this.updateGlobal = true
    }

    handleChangeDialog = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        this.updateGlobal = false
    }

    submitData = () => {
        if (!this.updateGlobal) {
            console.log('update', this)
            return true
        }
        console.log('update', this.specificSettings)
        const globalSettings = {
            date: new Date().toJSON(),
            settingDownload: this.state.settingDownload,
            settingDBTrimming: this.state.settingDBTrimming,
            teiDownload: this.state.teiDownload,
            teiDBTrimmming: this.state.teiDBTrimmming,
            enrollmentDownload: this.state.enrollmentDownload,
            enrollmentDBTrimming: this.state.enrollmentDBTrimming,
            enrollmentDateDownload: this.state.enrollmentDateDownload,
            enrollmentDateDBTrimming: this.state.enrollmentDateDBTrimming,
            updateDownload: this.state.updateDownload,
            updateDBTrimming: this.state.updateDBTrimming,
            teReservedDownload: this.state.teReservedDownload,
            teReservedDBTrimming: this.state.teReservedDBTrimming,
            eventsDownload: this.state.eventsDownload,
            eventsDBTrimming: this.state.eventsDBTrimming,
            eventPeriodDownload: this.state.eventPeriodDownload,
            eventPeriodDBTrimming: this.state.eventPeriodDBTrimming,
        }

        this.globalSettings = globalSettings

        const programSettingData = {
            globalSettings: {
                ...this.globalSettings,
            },
        }

        if (this.keyName === 'program_settings') {
            if (Object.keys(this.specificSettings).length) {
                programSettingData.specificSettings = this.specificSettings
                console.log(programSettingData)
            }

            api.updateValue(
                'ANDROID_SETTING_APP',
                'program_settings',
                programSettingData
            ).then(res => {
                console.log('res update', res)
            })
        } else {
            api.getKeys('ANDROID_SETTING_APP').then(
                api
                    .createValue(
                        'ANDROID_SETTING_APP',
                        'program_settings',
                        programSettingData
                    )
                    .then(data => {
                        console.log('data response update', data)
                    })
            )
            console.log('submit', programSettingData)
        }
    }

    handleClickOpen = () => {
        if (this.programNamesList.length > 0) {
            const programListComplete = this.programListComplete
            const programUsedlist = this.programNamesList

            const dataSetNameFilter = programListComplete.filter(
                item => !programUsedlist.includes(item.id)
            )
            this.programList = dataSetNameFilter
            console.log('nueva lista', this.programList)
        }

        this.setState({
            specificProgram: {
                openDialog: true,
            },
        })

        this.updateGlobal = false
    }

    handleClose = () => {
        this.programToChange = undefined

        this.setState({
            specificProgram: {
                openDialog: false,
            },
            specificSettingDownload: '',
            specificSettingDBTrimming: '',
            specificTeiDownload: '',
            specificTeiDBTrimming: '',
            specificEnrollmentDownload: '',
            specificEnrollmentDBTrimming: '',
            specificEnrollmentDateDownload: '',
            specificEnrollmentDateDBTrimming: '',
            specificUpdateDownload: '',
            specificUpdateDBTrimming: '',
            specificTEReservedDownload: '',
            specificTEReservedDBTrimming: '',
            specificEventsDownload: '',
            specificEventsDBTrimming: '',
            specificEventPeriodDownload: '',
            specificEventPeriodDBTrimming: '',
            specificProgramName: '',
        })

        this.updateGlobal = false
    }

    handleSubmitDialog = async e => {
        e.preventDefault()

        var specificProgramNameKey = this.state.specificProgramName
        var objData = this.specificSettings

        const programNameFilter = this.programListComplete.filter(
            option => option.id === specificProgramNameKey
        )

        console.log(programNameFilter[0], this.specificSettings)

        objData[specificProgramNameKey] = {
            date: new Date().toJSON(),
            name: programNameFilter[0].name,
            specificSettingDownload: this.state.specificSettingDownload,
            specificSettingDBTrimming: this.state.specificSettingDBTrimming,
            specificTeiDownload: this.state.specificTeiDownload,
            specificTeiDBTrimming: this.state.specificTeiDBTrimming,
            specificEnrollmentDownload: this.state.specificEnrollmentDownload,
            specificEnrollmentDBTrimming: this.state.specificEventDBTrimming,
            specificEnrollmentDateDownload: this.state
                .specificEnrollmentDateDownload,
            specificEnrollmentDateDBTrimming: this.state
                .specificEnrollmentDateDBTrimming,
            specificUpdateDownload: this.state.specificUpdateDownload,
            specificUpdateDBTrimming: this.state.updateDBTrimming,
            specificTEReservedDownload: this.state.specificTEReservedDownload,
            specificTEReservedDBTrimming: this.state
                .specificTEReservedDBTrimming,
            specificEventsDownload: this.state.specificEventsDownload,
            specificEventsDBTrimming: this.state.specificEventsDBTrimming,
            specificEventPeriodDownload: this.state.specificEventPeriodDownload,
            specificEventPeriodDBTrimming: this.state
                .specificEventPeriodDBTrimming,
        }

        const sumarySettings =
            (this.state.specificTeiDownload === undefined
                ? 0
                : this.state.specificTeiDownload) +
            ' TEI/ ' +
            (this.state.specificEventsDownload === undefined
                ? 0
                : this.state.specificEventsDownload) +
            ' events per OU, ' +
            (this.state.specificTEReservedDownload === undefined
                ? 0
                : this.state.specificTEReservedDownload) +
            ' reserved values'
        const newProgramRow = {
            name: programNameFilter[0].name,
            sumarySettings: sumarySettings,
            id: specificProgramNameKey,
            specificSettingDownload: this.state.specificSettingDownload,
            specificSettingDBTrimming: this.state.specificSettingDBTrimming,
            specificTeiDownload: this.state.specificTeiDownload,
            specificTeiDBTrimming: this.state.specificTeiDBTrimming,
            specificEnrollmentDownload: this.state.specificEnrollmentDownload,
            specificEnrollmentDBTrimming: this.state.specificEventDBTrimming,
            specificEnrollmentDateDownload: this.state
                .specificEnrollmentDateDownload,
            specificEnrollmentDateDBTrimming: this.state
                .specificEnrollmentDateDBTrimming,
            specificUpdateDownload: this.state.specificUpdateDownload,
            specificUpdateDBTrimming: this.state.updateDBTrimming,
            specificTEReservedDownload: this.state.specificTEReservedDownload,
            specificTEReservedDBTrimming: this.state
                .specificTEReservedDBTrimming,
            specificEventsDownload: this.state.specificEventsDownload,
            specificEventsDBTrimming: this.state.specificEventsDBTrimming,
            specificEventPeriodDownload: this.state.specificEventPeriodDownload,
            specificEventPeriodDBTrimming: this.state
                .specificEventPeriodDBTrimming,
        }

        this.specificSettings = objData

        const programData = {
            specificSettings: objData,
        }

        if (this.programToChange !== undefined) {
            let newRowList = []
            const rowList = this.specificSettingsRows
            newRowList = rowList.filter(row => row.id !== newProgramRow.id)
            newRowList.push(newProgramRow)
            this.specificSettingsRows = newRowList

            const nameList = this.programNamesList
            const newNameList = nameList.filter(
                name => name !== this.state.specificProgramName
            )

            this.programNamesList = newNameList
            console.log('nameList', this.programNamesList)
        } else {
            this.specificSettingsRows.push(newProgramRow)
            console.log('rows table', this.specificSettingsRows)
        }

        this.programNamesList.push(this.state.specificProgramName)
        console.log(programData, this.specificSettings)

        if (this.keyName === 'program_settings') {
            if (Object.keys(this.globalSettings).length) {
                programData.globalSettings = this.globalSettings
                console.log(programData)
            }

            api.updateValue(
                'ANDROID_SETTING_APP',
                'program_settings',
                programData
            ).then(res => {
                console.log('res update', res)
            })
        } else {
            api.getKeys('ANDROID_SETTING_APP').then(
                api
                    .createValue(
                        'ANDROID_SETTING_APP',
                        'program_settings',
                        programData
                    )
                    .then(data => {
                        console.log('data response update', data)
                    })
            )
        }

        this.handleClose()
    }

    handleReset = e => {
        e.preventDefault()

        this.setState({
            settingDownload: settingDownload,
            settingDBTrimming: settingDBTrimming,
            teiDownload: teiDownload,
            teiDBTrimmming: teiDBTrimmming,
            enrollmentDownload: enrollmentDownload,
            enrollmentDBTrimming: enrollmentDBTrimming,
            enrollmentDateDownload: enrollmentDateDownload,
            enrollmentDateDBTrimming: enrollmentDateDBTrimming,
            updateDownload: updateDownload,
            updateDBTrimming: updateDBTrimming,
            teReservedDownload: teReservedDownload,
            teReservedDBTrimming: teReservedDBTrimming,
            eventsDownload: eventsDownload,
            eventsDBTrimming: eventsDBTrimming,
            eventPeriodDownload: eventPeriodDownload,
            eventPeriodDBTrimming: eventPeriodDBTrimming,
        })

        this.updateGlobal = true
    }

    handleCloseDelete = () => {
        console.log('delete', this.argsRow)
        const data = this.argsRow
        const oldList = this.specificSettings
        const rowList = this.specificSettingsRows
        const programNamesUsed = this.programNamesList

        const programListNew = programNamesUsed.filter(
            program => program !== data.id
        )
        this.programNamesList = programListNew

        console.log({
            specificSettings: oldList,
            args: data,
            listName: this.programNamesList,
        })
        const newList = {}
        let newRowList = []

        for (const key in oldList) {
            if (key !== data.id) {
                const dataSet = this.specificSettings[key]
                newList[key] = dataSet
            }
        }

        newRowList = rowList.filter(row => row.id !== data.id)

        this.specificSettingsRows = newRowList
        this.specificSettings = newList

        /* const programSettingData = {}
        programSettingData.specificSettings = this.specificSettings
        programSettingData.globalSettings = this.globalSettings */

        console.log({
            newList: newList,
            row: newRowList,
            specificSettings: this.specificSettings,
            globalSettings: this.globalSettings,
        })

        this.setState({
            isUpdated: true,
            deleteDialog: {
                open: false,
            },
        })

        this.updateGlobal = true
    }

    handleCancelDialog = () => {
        this.argsRow = undefined
        this.programName = undefined
        this.setState({
            isUpdated: true,
            deleteDialog: {
                open: false,
            },
        })
        this.updateGlobal = false
    }

    async componentDidMount() {
        await api
            .getNamespaces()
            .then(res => {
                const nameSpace = res.filter(
                    name => name === 'ANDROID_SETTING_APP'
                )
                nameSpace.length === 0
                    ? (this.nameSpace = undefined)
                    : (this.nameSpace = nameSpace[0])
                this.nameSpace !== undefined
                    ? this.setState({ isUpdated: true })
                    : this.setState({ isUpdated: false })
                if (this.nameSpace === 'ANDROID_SETTING_APP') {
                    api.getKeys(this.nameSpace).then(res => {
                        const keyName = res.filter(
                            name => name === 'program_settings'
                        )
                        keyName.length === 0
                            ? (this.keyName = undefined)
                            : (this.keyName = keyName[0])
                        if (this.keyName !== undefined) {
                            api.getValue(this.nameSpace, this.keyName).then(
                                res => {
                                    console.group(res)

                                    if (res.value.specificSettings) {
                                        this.specificSettings =
                                            res.value.specificSettings
                                        this.programNamesList = Object.keys(
                                            this.specificSettings
                                        )
                                        console.log(this.programNamesList)
                                        for (const key in this
                                            .specificSettings) {
                                            if (
                                                this.specificSettings.hasOwnProperty(
                                                    key
                                                )
                                            ) {
                                                const program = this
                                                    .specificSettings[key]
                                                console.log(program)
                                                const sumarySettings =
                                                    (program.specificTeiDownload ===
                                                    undefined
                                                        ? 0
                                                        : program.specificTeiDownload) +
                                                    ' TEI/ ' +
                                                    (program.specificEventsDownload ===
                                                    undefined
                                                        ? 0
                                                        : program.specificEventsDownload) +
                                                    ' events per OU, ' +
                                                    (program.specificTEReservedDownload ===
                                                    undefined
                                                        ? 0
                                                        : program.specificTEReservedDownload) +
                                                    ' reserved values'
                                                const newProgramRow = {
                                                    name: program.name,
                                                    sumarySettings: sumarySettings,
                                                    id: key,
                                                    specificSettingDownload:
                                                        program.specificSettingDownload,
                                                    specificSettingDBTrimming:
                                                        program.specificSettingDBTrimming,
                                                    specificTeiDownload:
                                                        program.specificTeiDownload,
                                                    specificTeiDBTrimming:
                                                        program.specificTeiDBTrimming,
                                                    specificEnrollmentDownload:
                                                        program.specificEnrollmentDownload,
                                                    specificEnrollmentDBTrimming:
                                                        program.specificEventDBTrimming,
                                                    specificEnrollmentDateDownload:
                                                        program.specificEnrollmentDateDownload,
                                                    specificEnrollmentDateDBTrimming:
                                                        program.specificEnrollmentDateDBTrimming,
                                                    specificUpdateDownload:
                                                        program.specificUpdateDownload,
                                                    specificUpdateDBTrimming:
                                                        program.updateDBTrimming,
                                                    specificTEReservedDownload:
                                                        program.specificTEReservedDownload,
                                                    specificTEReservedDBTrimming:
                                                        program.specificTEReservedDBTrimming,
                                                    specificEventsDownload:
                                                        program.specificEventsDownload,
                                                    specificEventsDBTrimming:
                                                        program.specificEventsDBTrimming,
                                                    specificEventPeriodDownload:
                                                        program.specificEventPeriodDownload,
                                                    specificEventPeriodDBTrimming:
                                                        program.specificEventPeriodDBTrimming,
                                                }
                                                console.log(newProgramRow)
                                                this.specificSettingsRows.push(
                                                    newProgramRow
                                                )
                                            }
                                        }
                                        this.setState({
                                            loading: false,
                                        })
                                    }

                                    if (res.value.globalSettings) {
                                        this.setState({
                                            ...res.value.globalSettings,
                                            isUpdated: true,
                                            loading: false,
                                        })
                                        this.globalSettings =
                                            res.value.globalSettings
                                    }
                                }
                            )
                        } else {
                            console.log('no program settings')

                            this.setState({
                                isUpdated: true,
                                loading: false,
                            })
                        }
                    })
                } else if (this.nameSpace === undefined) {
                    console.log('no hay program setting')
                    api.createNamespace(
                        'ANDROID_SETTING_APP',
                        'program_settings'
                    ).catch(e => console.log(e))
                }
            })
            .catch(e => {
                this.setState({
                    isUpdated: false,
                })
            })

        this.props.d2.models.program
            .list({
                paging: false,
                level: 1,
                fields: 'id,name',
                filter: 'access.data.write:eq:true',
            })
            .then(collection => {
                const programList = collection.toArray()
                this.programList = programList
                this.programListComplete = programList
                console.log('program list', this.programList)
            })
    }

    componentDidUpdate() {
        this.submitData()
    }

    render() {
        if (this.state.loading === true) {
            return <CircularProgress small />
        }

        return (
            <div>
                <div>
                    <p className="main-content__title main-content__title__main">
                        Program global settings
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        Applies to all programs that an Android user has access
                        to, unless an specific set of values has been configured
                        for a program (see below)
                    </p>

                    <ProgramTable
                        data={programData}
                        states={this.state}
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <p className="main-content__title main-content__title__main">
                        Program specific settings
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        Programs settings listed below overwrite the global
                        settings above
                    </p>

                    {this.programNamesList.length > 0 && (
                        <div className="data__top-margin">
                            <Table
                                {...this.state}
                                columns={['name', 'sumarySettings']}
                                rows={this.specificSettingsRows}
                                contextMenuActions={this.tableActions}
                            />
                        </div>
                    )}

                    <Button raised onClick={this.handleClickOpen}>
                        ADD
                    </Button>

                    <DialogDelete
                        open={this.state.deleteDialog.open}
                        onHandleDelete={this.handleCloseDelete}
                        onHandleClose={this.handleCancelDialog}
                        typeName="program"
                        name={this.programName}
                    />

                    <div className="main-content__button__container">
                        <Button
                            onClick={this.handleReset}
                            raised
                            color="primary"
                        >
                            SET TO DEFAULT
                        </Button>
                    </div>

                    <Dialog
                        open={this.state.specificProgram.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        fullWidth
                        maxWidth="lg"
                    >
                        <DialogTitle id="form-dialog-title">
                            Values per program
                        </DialogTitle>
                        <DialogContent>
                            {this.programToChange === undefined ? (
                                <Select
                                    value={this.state.specificProgramName}
                                    onChange={this.handleChangeDialog}
                                    id="specificProgramName"
                                    name="specificProgramName"
                                    style={{ minWidth: '150px' }}
                                >
                                    {this.programList.map(option => (
                                        <MenuItem
                                            value={option.id}
                                            key={option.id}
                                            name={option.name}
                                        >
                                            <em> {option.name} </em>
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <p className="main-content__title main-content__title__dialog">
                                    {this.programToChange}
                                </p>
                            )}

                            <ProgramTable
                                data={specificProgramData}
                                states={this.state}
                                onChange={this.handleChangeDialog}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                raised
                                onClick={this.handleClose}
                                className="main-content__dialog__button"
                            >
                                CANCEL
                            </Button>
                            <Button raised onClick={this.handleSubmitDialog}>
                                ADD/SAVE
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default ProgramSettings

/* < Dialog
open = { this.state.deleteDialog.open }
onClose = { this.handleCloseDelete }
    >
    <DialogTitle>
        {' Are you sure you want to delete this program?'}
    </DialogTitle>
    <DialogActions style={{ borderTop: 'none' }}>
        <Button
            onClick={this.handleCloseDelete}
            color="primary"
        >
            Delete
                            </Button>
        <Button
            onClick={this.handleCloseDelete}
            color="primary"
            autoFocus
        >
            Cancel
                            </Button>
    </DialogActions>
                    </Dialog > */
