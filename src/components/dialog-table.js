import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Button } from '@dhis2/ui-core'

import ProgramTable from './program-table'
import DataSetTable from './settings-table/dataset-table'
import i18n from '@dhis2/d2-i18n'
import titleStyles from '../styles/LayoutTitles.module.css'
import buttonStyles from '../styles/Button.module.css'

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
                    {i18n.t('Values per')} {this.props.title}
                </DialogTitle>
                <DialogContent>
                    {this.props.dataTitle === undefined ? (
                        <Select
                            value={this.props.titleValue}
                            onChange={this.props.handleChange}
                            id={this.props.textFieldTitleName}
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
                        <p className={titleStyles.mainContent__title__dialog}>
                            {this.props.dataTitle}
                        </p>
                    )}

                    {this.props.title === 'Programs' ? (
                        <ProgramTable
                            data={this.props.data}
                            states={this.props.specificSetting}
                            onChange={this.props.handleChange}
                            programTitle={this.props.dataTitle}
                            programOptions={this.props.dataTitleOptions}
                            programSelected={this.props.titleValue}
                            completeListOptions={this.props.completeListOptions}
                        />
                    ) : (
                        <DataSetTable
                            data={this.props.data}
                            states={this.props.specificSetting}
                            onChange={this.props.handleChange}
                            dataSetTitle={this.props.dataTitle}
                            dataSetOptions={this.props.dataTitleOptions}
                            dataSetSelected={this.props.titleValue}
                            completeListOptions={this.props.completeListOptions}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.props.handleClose}
                        className={buttonStyles.mainContent__dialog__button}
                    >
                        {i18n.t('CANCEL')}
                    </Button>
                    <Button onClick={this.props.handleSubmitDialog}>
                        {i18n.t('ADD/SAVE')}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default DialogTable
