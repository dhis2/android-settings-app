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

        console.log('props program', props)
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

        const androidData = {
            generalSettings: {
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

        if (this.nameSpace === 'program_settings') {
            api.updateValue(
                'ANDROID_SETTING_APP',
                'program_settings',
                androidData
            )
                .then(res => {
                    console.log('res update', res)
                })
                .then(data => {
                    console.log('data response update', data)
                })
        } else {
            api.getKeys('ANDROID_SETTING_APP').then(
                api
                    .createValue(
                        'ANDROID_SETTING_APP',
                        'program_settings',
                        androidData
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
                                    this.setState({
                                        ...res.value.generalSettings,
                                        isUpdated: true,
                                    })
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
                                id="name"
                                label="Programs"
                                type="text"
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
                            <Button raised onClick={this.handleClose}>
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
