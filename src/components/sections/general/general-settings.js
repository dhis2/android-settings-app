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
import DialogDisableSettings from '../../dialog/dialog-disable-settings'
import NoticeAlert from '../../notice-alert'
import DialogManualAlert from '../../dialog/dialog-manual-alert'

const GeneralSettings = ({
    state,
    generalForm,
    handleSaveDialog,
    handleDisableSettings,
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

            <NoticeAlert
                title={i18n.t('Manual options')}
                notice={i18n.t(
                    'Manual options for data and metadata sync are only available from android app version 2.3.0 onwards.'
                )}
            />

            <GeneralForm
                handleForm={generalForm}
                handleSaveDialog={handleSaveDialog}
                handleDisableSettings={handleDisableSettings}
            />

            <DialogManualAlert
                openDialog={generalForm.manualAlertDialog.open}
                chooseOption={generalForm.handleManualAlert.save}
                onClose={generalForm.handleManualAlert.close}
            />

            <DialogEncrypt
                openDialog={generalForm.openEncryptDialog}
                checked={generalForm.fields.encryptDB}
                onClose={generalForm.handleEncryptDialog.onClose}
                handleEncrypt={generalForm.handleEncryptDialog.handleEncrypt}
            />

            <DialogSaveData
                openDialog={state.openDialog.saveData}
                onClose={handleSaveDialog.close}
                saveDataStore={handleSaveDialog.save}
            />

            <DialogDisableSettings
                openDialog={state.openDialog.disableSettings}
                onClose={handleDisableSettings.cancel}
                disableSettings={handleDisableSettings.disableSettings}
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
    generalForm: PropTypes.object.isRequired,
    handleSaveDialog: PropTypes.object.isRequired,
    handleDisableSettings: PropTypes.object.isRequired,
}

export default GeneralSettings
