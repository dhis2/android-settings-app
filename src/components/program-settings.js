import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import { Program, SpecificProgram } from '../constants/program-settings'
import api from '../utils/api'
import ProgramTable from './program-table'

const programData = Program
const specificProgramData = SpecificProgram

class ProgramSettings extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            download: '',
            settingDownload: '',
            settingDBTrimming: '',
            enrollmentDownload: '',
            enrollmentDBTrimming: '',
            enrollmentDateDownload: '',
            enrollmentDateDBTrimming: '',
            updateDownload: '',
            updateDBTrimming: '',
            eventDownload: '',
            eventDBTrimming: '',
            specificProgram: {
                openDialog: false,
            },
            specificProgramName: '',
            specificSettingDownload: '',
            specificSettingDBTrimming: '',
            specificEnrollmentDownload: '',
            specificEnrollmentDBTrimming: '',
            specificEnrollmentDateDownload: '',
            specificEnrollmentDateDBTrimming: '',
            specificUpdateDownload: '',
            specificUpdateDBTrimming: '',
            specificEventDownload: '',
            specificEventDBTrimming: '',
        }

        this.nameSpace = undefined
        this.keyName = undefined
        this.programNamesList = []
        this.globalSettings = {}
        this.specificSettings = {}
        this.currentUserData = props.d2.currentUser
        this.userPrograms = this.currentUserData.programs
        console.log('props program', props, this.currentUserData)
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
        console.log({
            action: 'close',
            state: this.state,
        })
    }

    handleSubmit = async e => {
        e.preventDefault()

        const programData = {
            globalSettings: {
                date: new Date().toJSON(),
                settingDownload: this.state.settingDownload,
                settingDBTrimming: this.state.settingDBTrimming,
                enrollmentDownload: this.state.enrollmentDownload,
                enrollmentDBTrimming: this.state.enrollmentDBTrimming,
                enrollmentDateDownload: this.state.enrollmentDateDownload,
                enrollmentDateDBTrimming: this.state.enrollmentDateDBTrimming,
                updateDownload: this.state.updateDownload,
                updateDBTrimming: this.state.updateDBTrimming,
                eventDownload: this.state.eventDownload,
                eventDBTrimming: this.state.eventDBTrimming,
            },
        }

        this.globalSettings = programData

        if (this.keyName === 'program_settings') {
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
            specificEnrollmentDownload: '',
            specificEnrollmentDBTrimming: '',
            specificEnrollmentDateDownload: '',
            specificEnrollmentDateDBTrimming: '',
            specificUpdateDownload: '',
            specificUpdateDBTrimming: '',
            specificEventDownload: '',
            specificEventDBTrimming: '',
        })
    }

    handleSubmitDialog = async e => {
        e.preventDefault()

        if (Object.keys(this.specificSettings).length) {
            console.log(this.specificSettings)
        }

        var specificProgramNameKey = this.state.specificProgramName
        var objData = {
            ...this.specificSettings,
        }
        objData[specificProgramNameKey] = {
            date: new Date().toJSON(),
            programName: this.state.specificProgramName,
            specificSettingDownload: this.state.specificSettingDownload,
            specificSettingDBTrimming: this.state.specificSettingDBTrimming,
            specificEnrollmentDownload: this.state.specificEnrollmentDownload,
            specificEnrollmentDBTrimming: this.state.specificEventDBTrimming,
            specificEnrollmentDateDownload: this.state
                .specificEnrollmentDateDownload,
            specificEnrollmentDateDBTrimming: this.state
                .specificEnrollmentDateDBTrimming,
            specificUpdateDownload: this.state.specificUpdateDownload,
            specificUpdateDBTrimming: this.state.updateDBTrimming,
            specificEventDownload: this.state.specificEventDownload,
            specificEventDBTrimming: this.state.specificEventDBTrimming,
        }

        const programData = {
            specificSettings: objData,
        }

        this.specificSettings = programData
        /*
        const programData = {
            specificSettings : {
                nameP: {
                    date: new Date().toJSON(),
                    programName: this.state.specificProgramName,
                    specificSettingDownload: this.state.specificSettingDownload,
                    specificSettingDBTrimming: this.state.specificSettingDBTrimming,
                    specificEnrollmentDownload: this.state.specificEnrollmentDownload,
                    specificEnrollmentDBTrimming: this.state.specificEventDBTrimming,
                    specificEnrollmentDateDownload: this.state.specificEnrollmentDateDownload,
                    specificEnrollmentDateDBTrimming: this.state.specificEnrollmentDateDBTrimming,
                    specificUpdateDownload: this.state.specificUpdateDownload,
                    specificUpdateDBTrimming: this.state.updateDBTrimming,
                    specificEventDownload: this.state.specificEventDownload,
                    specificEventDBTrimming: this.state.specificEventDBTrimming,
                }
            }
        }
*/
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

                    {this.programNamesList.length > 0 ? (
                        <div>
                            Tabla
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
                            onClick={this.handleSubmit}
                            raised
                            color="primary"
                        >
                            SAVE
                        </Button>
                        <Button
                            onClick={this.handleCancel}
                            className="main-content__button__cancel"
                        >
                            CANCEL
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
