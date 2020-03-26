import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Button } from '@dhis2/ui-core'

import ProgramTable from './program-table'
import SettingsTable from './settings-table'
import i18n from '@dhis2/d2-i18n'
import titleStyles from '../styles/LayoutTitles.module.css'
import buttonStyles from '../styles/Button.module.css'

const DialogTable = ({
    open,
    title,
    handleClose,
    dataTitle,
    dataTitleOptions,
    titleValue,
    handleChange,
    textFieldTitleName,
    data,
    handleSubmitDialog,
    specificSetting,
    completeListOptions,
}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="lg"
        >
            <DialogTitle id="form-dialog-title">
                {i18n.t('Values per')} {title}
            </DialogTitle>
            <DialogContent>
                {dataTitle === undefined ? (
                    <Select
                        value={titleValue}
                        onChange={handleChange}
                        id={textFieldTitleName}
                        name={textFieldTitleName}
                        style={{ minWidth: '150px' }}
                    >
                        {dataTitleOptions.map(option => (
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
                        {dataTitle}
                    </p>
                )}

                {title === 'Programs' ? (
                    <ProgramTable
                        data={data}
                        states={specificSetting}
                        onChange={handleChange}
                        programTitle={dataTitle}
                        programOptions={dataTitleOptions}
                        programSelected={titleValue}
                        completeListOptions={completeListOptions}
                    />
                ) : (
                    <SettingsTable
                        data={data}
                        states={specificSetting}
                        onChange={handleChange}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    className={buttonStyles.mainContent__dialog__button}
                >
                    {i18n.t('CANCEL')}
                </Button>
                <Button onClick={handleSubmitDialog}>
                    {i18n.t('ADD/SAVE')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogTable
