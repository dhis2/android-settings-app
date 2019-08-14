import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Button } from '@dhis2/d2-ui-core'

import ProgramTable from './program-table'

class DialogTable extends React.Component {
    constructor(props) {
        super(props)
        this.dialogTable = props
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle id="form-dialog-title">
                    Values per {this.props.title}
                </DialogTitle>
                <DialogContent>
                    {this.props.dataTitle === undefined ? (
                        <Select
                            value={this.props.titleValue}
                            onChange={this.props.handleChange}
                            id={this.props.textFieldTitleId}
                            name={this.props.textFieldTitleName}
                            style={{ minWidth: '150px' }}
                        >
                            {this.props.dataTitleOptions.map(option => (
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
                            {this.props.dataTitle}
                        </p>
                    )}

                    <ProgramTable
                        data={this.props.data}
                        states={this.props.state}
                        onChange={this.props.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        raised
                        onClick={this.props.handleClose}
                        className="main-content__dialog__button"
                    >
                        CANCEL
                    </Button>
                    <Button raised onClick={this.props.handleSubmitDialog}>
                        ADD/SAVE
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default DialogTable
