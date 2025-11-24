import i18n from '@dhis2/d2-i18n'
import { Button, ButtonStrip } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import buttonStyles from '../../styles/Button.module.css'
import SaveErrorAlert from '../alertBar/SaveErrorAlert.jsx'
import SuccessAlert from '../alertBar/SuccessAlert.jsx'
import DialogSaveData from '../dialog/DialogSaveData.jsx'

const FooterStripButtons = ({
    saveButtonDisabled,
    onReset,
    onSave,
    errorRequest,
    requestResult,
    handleDisableSave,
    disableAll,
}) => {
    const [openDialog, setOpenDialog] = useState(false)

    useEffect(() => {
        if (requestResult) {
            handleDisableSave(true)
        }
    }, [requestResult])

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleSaveDatStore = () => {
        onSave()
        handleCloseDialog()
    }

    const handleOpenSaveDialog = () => {
        setOpenDialog(true)
    }

    return (
        <>
            <ButtonStrip className={buttonStyles.container__padding}>
                <Button
                    primary
                    className={buttonStyles.button_marginLeft}
                    onClick={handleOpenSaveDialog}
                    disabled={saveButtonDisabled || disableAll}
                >
                    {i18n.t('Save')}
                </Button>
                <Button onClick={onReset} disabled={disableAll}>
                    {i18n.t('Reset all values to default')}
                </Button>
            </ButtonStrip>

            <DialogSaveData
                openDialog={openDialog}
                onClose={handleCloseDialog}
                saveDataStore={handleSaveDatStore}
            />

            {requestResult && (
                <SuccessAlert show={requestResult.httpStatusCode === 200} />
            )}

            {errorRequest && (
                <SaveErrorAlert show={true} message={errorRequest.message} />
            )}
        </>
    )
}

FooterStripButtons.propTypes = {
    saveButtonDisabled: PropTypes.bool,
    onReset: PropTypes.func,
    onSave: PropTypes.func,
    handleDisableSave: PropTypes.func,
    errorRequest: PropTypes.shape({
        httpStatusCode: PropTypes.string,
        message: PropTypes.string,
    }),
    requestResult: PropTypes.shape({
        httpStatusCode: PropTypes.string,
        message: PropTypes.string,
    }),
    disableAll: PropTypes.bool,
}

export default FooterStripButtons
