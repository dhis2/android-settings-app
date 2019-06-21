import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import { Program, SpecificProgram } from '../constants/program-settings'
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

    render() {
        return (
            <div>
                <div>
                    <p className="main-content__title main-content__title__main">
                        {' '}
                        Program global settings{' '}
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        {' '}
                        Applies to all programs that an Android user has access
                        to, unless an specific set of values has been configured
                        for a program (see below){' '}
                    </p>

                    <ProgramTable
                        data={programData}
                        states={this.state}
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <p className="main-content__title main-content__title__main">
                        {' '}
                        Program specific settings{' '}
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        {' '}
                        Programs settings listed below overwrite the global
                        settings above{' '}
                    </p>

                    <Button raised onClick={this.handleClickOpen}>
                        {' '}
                        ADD{' '}
                    </Button>

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
