import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import ProgramTable from './program-table'
import {
    DataSetting,
    DataSpecificSetting,
} from '../constants/data-set-settings'

const styles = {
    title_p: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '19px',
        color: 'rgba(51, 51, 51, 0.87)',
    },
    subheader_p: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '24px',
        color: 'rgba(51, 51, 51, 0.87)',
    },
    button: {
        marginRight: '10px',
    },
}

const dataSetSettings = DataSetting
const dataSpecificSetting = DataSpecificSetting

class DataSetSettings extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            periodDSDownload: '',
            periodDSDBTrimming: '',
            specificDataSet: {
                openDialog: false,
            },
        }
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
            specificDataSet: {
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
            specificDataSet: {
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
                    <p style={styles.title_p}> Data Sets global settings </p>
                    <p style={styles.subheader_p}>
                        {' '}
                        Applies to all Data Sets that an Android user has access
                        to, unless an specific set of values has been configured
                        for a Data Sets (see below){' '}
                    </p>

                    <ProgramTable
                        data={dataSetSettings}
                        states={this.state}
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <p style={styles.title_p}> Data Sets specific settings </p>
                    <p style={styles.subheader_p}>
                        {' '}
                        Data Set settings listed below overwrite the global
                        settings above{' '}
                    </p>

                    <Button raised onClick={this.handleClickOpen}>
                        {' '}
                        ADD{' '}
                    </Button>

                    <Dialog
                        open={this.state.specificDataSet.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        fullWidth
                        maxWidth="lg"
                    >
                        <DialogTitle id="form-dialog-title">
                            Values per Data Set
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
                                data={dataSpecificSetting}
                                states={this.state}
                                onChange={this.handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                raised
                                onClick={this.handleClose}
                                style={styles.button}
                            >
                                RUN TEST
                            </Button>
                            <Button
                                raised
                                onClick={this.handleClose}
                                style={styles.button}
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

export default DataSetSettings
