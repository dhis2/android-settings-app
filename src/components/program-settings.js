import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Table from '@dhis2/d2-ui-table'
import '@dhis2/d2-ui-core/build/css/Table.css'

import { Program, SpecificProgram } from '../constants/program-settings'
import api from '../utils/api'
import ProgramTable from './program-table'

const programData = Program
const specificProgramData = SpecificProgram

class ProgramSettings extends React.Component {
    constructor(props) {
        super(props)

        props.d2.i18n.translations['program_name'] = 'Program Name'
        props.d2.i18n.translations['sumary_settings'] = 'Sumary Settings'

        props.d2.i18n.translations['edit'] = 'edit'
        props.d2.i18n.translations['delete'] = 'delete'
        props.d2.i18n.translations['actions'] = 'actions'

        this.nameSpace = undefined
        this.keyName = undefined
        this.programNamesList = []
        this.globalSettings = {}
        this.specificSettings = {}
        this.currentUserData = props.d2.currentUser
        this.userPrograms = this.currentUserData.programs
        console.log('props program', props, this.currentUserData, this)
        this.openDialog = false
        this.myRows = [
            {
                programName: 'John',
                sumarySettings: '2014-11-11T21:56:05.469',
                publicAccess: 'rwrw----',
                props: this.state,
            },
            {
                programName: 'Tom',
                sumarySettings: '2015-08-06T13:28:05.512',
                publicAccess: 'r-rw----',
                props: this.state,
            },
        ]

        //this.multipleCma = this.multipleCma.bind(this)
    }

    _this = this

    state = {
        download: '',
        settingDownload: '',
        settingDBTrimming: '',
        teiDownload: '',
        teiDBTrimmming: '',
        enrollmentDownload: '',
        enrollmentDBTrimming: '',
        enrollmentDateDownload: '',
        enrollmentDateDBTrimming: '',
        updateDownload: '',
        updateDBTrimming: '',
        teReservedDownload: '',
        teReservedDBTrimming: '',
        eventsDownload: '',
        eventPeriodDownload: '',
        eventPeriodDBTrimming: '',
        specificProgram: {
            openDialog: false,
        },
        specificProgramName: '',
        specificSettingDownload: '',
        specificSettingDBTrimming: '',
        eventsDBTrimming: '',
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
    }

    multipleCma = {
        edit(props, ...args) {
            console.log('Edit', ...args)
            /* this.setState({
                specificProgram: {
                    openDialog: true,
                },
            }) */
            // this.openDialog = true
            console.log(props, props.specificProgram, this.state)
            //props.specificProgram.openDialog = true
        },
        delete(...args) {
            console.log('Delete', ...args)
        },
        remove(...args) {
            console.log('Remove', ...args)
        },
    }

    handleChange = e => {
        console.log({
            target: e.target,
            name: e.target.name,
            value: e.target.value,
        })
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        console.log({
            state: this.state,
            changedValue: e.target.value,
        })
    }

    handleClickOpen = () => {
        this.setState({
            specificProgram: {
                openDialog: true,
            },
        })

        this.openDialog = true

        this.cleanDialogStates()

        console.log({
            action: 'open',
            state: this.state,
        })
    }

    handleClose = () => {
        this.setState({
            specificProgram: {
                openDialog: false,
            },
        })

        console.log('close', this.openDialog)

        this.openDialog = false

        console.log(this.openDialog)
        /* console.log({
            action: 'close',
            state: this.state,
        }) */
    }

    handleSubmit = async e => {
        // e.preventDefault()

        /* this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        }) */

        this.handleChange(e)

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

        const programData = {
            globalSettings: {
                ...this.globalSettings,
            },
        }

        if (this.keyName === 'program_settings') {
            if (Object.keys(this.specificSettings).length) {
                programData.specificSettings = this.specificSettings
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

        console.log({
            state: this.state,
        })
    }

    handleCancel = e => {
        e.preventDefault()
    }

    async componentWillMount() {
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

                                    if (res.value.globalSettings) {
                                        this.setState({
                                            ...res.value.globalSettings,
                                            isUpdated: true,
                                        })
                                        this.globalSettings =
                                            res.value.globalSettings
                                    }

                                    if (res.value.specificSettings) {
                                        this.specificSettings =
                                            res.value.specificSettings
                                        this.programNamesList = Object.keys(
                                            this.specificSettings
                                        )
                                        console.log(this.programNamesList)
                                    }
                                    console.log(
                                        this.globalSettings,
                                        this.specificSettings,
                                        this.state,
                                        this.programNamesList
                                    )
                                }
                            )
                        } else {
                            console.log('no program settings')
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
    }

    cleanDialogStates = () => {
        this.setState({
            programName: '',
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
        })
    }

    handleReset = e => {
        e.preventDefault()
        this.setState({
            settingDownload: '',
            settingDBTrimming: '',
            teiDownload: '',
            teiDBTrimmming: '',
            enrollmentDownload: '',
            enrollmentDBTrimming: '',
            enrollmentDateDownload: '',
            enrollmentDateDBTrimming: '',
            updateDownload: '',
            updateDBTrimming: '',
            teReservedDownload: '',
            teReservedDBTrimming: '',
            eventsDownload: '',
            eventsDBTrimming: '',
            eventPeriodDownload: '',
            eventPeriodDBTrimming: '',
        })
    }

    handleSubmitDialog = async e => {
        e.preventDefault()

        var specificProgramNameKey = this.state.specificProgramName
        var objData = {
            ...this.specificSettings,
        }
        objData[specificProgramNameKey] = {
            date: new Date().toJSON(),
            programName: this.state.specificProgramName,
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

        const programData = {
            specificSettings: objData,
        }

        this.specificSettings = programData
        this.programNamesList.push(this.state.specificProgramName)
        console.log(programData)

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

    render() {
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
                        onChange={this.handleSubmit}
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

                    {this.programNamesList.length > 0 ? (
                        <div className="data__top-margin">
                            <Table
                                {...this.state}
                                columns={['programName', 'sumarySettings']}
                                rows={this.myRows}
                                contextMenuActions={this.multipleCma}
                            />
                            {this.programNamesList.map(program => (
                                <p key={program}> {program} </p>
                            ))}
                        </div>
                    ) : (
                        <p></p>
                    )}

                    <Button raised onClick={this.handleClickOpen}>
                        ADD
                    </Button>

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
                        open={this.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        fullWidth
                        maxWidth="lg"
                    >
                        <DialogTitle id="form-dialog-title">
                            Values per program
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="specificProgramName"
                                label="Programs"
                                type="text"
                                name="specificProgramName"
                                onChange={this.handleChange}
                            />

                            <ProgramTable
                                data={specificProgramData}
                                states={this.state}
                                onChange={this.handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                raised
                                onClick={this.handleClose}
                                className="main-content__dialog__button"
                            >
                                RUN TEST
                            </Button>
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
