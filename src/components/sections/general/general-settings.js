import React from 'react'

import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import DialogEncrypt from '../../dialog/dialog-encrypt'
import DialogSaveData from '../../dialog/dialog-save-data'
import SuccessAlert from '../../alert-bar/success-alert'
import SaveErrorAlert from '../../alert-bar/save-error-alert'
import ErrorAlert from '../../alert-bar/error-alert'
import GeneralForm from './general-form'

import styles from '../../../styles/LayoutTitles.module.css'

const GeneralSettings = ({
    state,
    handleChange,
    validatePhoneNumber,
    handleReset,
    handleEncryptCheckbox,
    handleSaveDialog,
    removeNamespace,
}) => {
    return (
        <>
            <div>
                <p className={styles.mainContent__title_headerBar}>
                    {i18n.t('General download sync settings')}
                </p>
                <p className={styles.mainContent__subtitle}>
                    {i18n.t('These settings apply to all Android users.')}
                </p>
            </div>

            <GeneralForm
                state={state}
                handleChange={handleChange}
                validatePhoneNumber={validatePhoneNumber}
                handleReset={handleReset}
                handleEncryptCheckbox={handleEncryptCheckbox}
                handleSaveDialog={handleSaveDialog}
                removeNamespace={removeNamespace}
            />

            <DialogEncrypt
                openDialog={state.openDialog}
                checked={state.encryptDB}
                onClose={handleEncryptCheckbox.onClose}
                handleEncrypt={handleEncryptCheckbox.handleEncrypt}
            />

            <DialogSaveData
                openDialog={state.openDialogSaveData}
                onClose={handleSaveDialog.close}
                saveDataStore={handleSaveDialog.save}
            />

            <SuccessAlert
                show={
                    state.submitDataStore.success &&
                    !state.submitDataStore.error
                }
            />

            <SaveErrorAlert
                show={
                    state.submitDataStore.error &&
                    !state.submitDataStore.success
                }
                message={state.submitDataStore.message}
            />

            <ErrorAlert show={state.openErrorAlert} />
        </>
    )
}

GeneralSettings.propTypes = {
    state: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    validatePhoneNumber: PropTypes.object.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleEncryptCheckbox: PropTypes.object.isRequired,
    handleSaveDialog: PropTypes.object.isRequired,
}

export default GeneralSettings
