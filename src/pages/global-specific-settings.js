import React from 'react'

import { Button, ButtonStrip } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import SettingsTable from '../components/settings-table/settings-table'
import ProgramGlobalSettings from '../components/settings-table/program-global-settings'
import DialogDelete from '../components/dialog/dialog-delete'
import DialogTable from '../components/dialog-table'
import TableActions from '../components/table-actions'
import DialogSaveData from '../components/dialog/dialog-save-data'
import SuccessAlert from '../components/alert-bar/success-alert'
import SaveErrorAlert from '../components/alert-bar/save-error-alert'

import styles from '../styles/LayoutTitles.module.css'
import buttonStyles from '../styles/Button.module.css'
import '@dhis2/d2-ui-core/css/Table.css'
import ErrorAlert from '../components/alert-bar/error-alert'

const GlobalSpecificSettings = ({
    programTableData,
    states,
    handleTableChange,
    specificSettings,
    specificSettingList,
    dialogDeleteName,
    handleSetDefaultValues,
    specificSettingDataTitle,
    specificSettingOptions,
    specificSettingData,
    completeListOptions,
    handleSaveDialog,
    deleteDialog,
    specificSettingDialog,
    specificSettingTable,
    settingType,
}) => {
    return (
        <React.Fragment>
            <div>
                <p className={styles.mainContent__title_headerBar}>
                    {i18n.t('{{elementPlural}} global download sync settings', {
                        elementPlural: settingType.typePlural,
                    })}
                </p>
                <p className={styles.mainContent__subtitle}>
                    {i18n.t(
                        'Applies to all {{elementPlural}} an Android user has access to. Specific {{elementSingular}} settings can be defined in the section below.',
                        {
                            elementPlural: settingType.typePlural,
                            elementSingular: settingType.type,
                        }
                    )}
                </p>

                {settingType.type === 'Program' ? (
                    <ProgramGlobalSettings
                        states={states}
                        data={programTableData}
                        handleChange={handleTableChange}
                    />
                ) : (
                    <SettingsTable
                        data={programTableData}
                        states={states}
                        onChange={handleTableChange}
                    />
                )}
            </div>

            <div>
                <p className={styles.mainContent__title_headerBar}>
                    {i18n.t(
                        '{{elementPlural}} specific download sync settings',
                        {
                            elementPlural: settingType.typePlural,
                        }
                    )}
                </p>
                <p className={styles.mainContent__subtitle}>
                    {i18n.t(
                        'Applies only to the assigned {{elementLowerCase}}. {{elementSingular}} specific settings will overwrite the global settings above.',
                        {
                            elementLowerCase: settingType.typeLowercase,
                            elementSingular: settingType.type,
                        }
                    )}
                </p>

                {specificSettings.length > 0 && (
                    <TableActions
                        states={states}
                        columns={specificSettingTable.columnsTitle}
                        rows={specificSettingList}
                        menuActions={specificSettingTable.handleActions}
                    />
                )}

                <Button
                    className={buttonStyles.button__add}
                    onClick={specificSettingDialog.handleOpen}
                    disabled={states.disableAll}
                >
                    {i18n.t('Add a {{elementSingular}} specific setting', {
                        elementSingular: settingType.type,
                    })}
                </Button>

                <ButtonStrip className={buttonStyles.container__padding}>
                    <Button
                        primary
                        onClick={handleSaveDialog.open}
                        disabled={states.disableSave}
                        className={buttonStyles.button_marginLeft}
                    >
                        {i18n.t('Save')}
                    </Button>
                    <Button
                        onClick={handleSetDefaultValues}
                        disabled={states.disableAll}
                    >
                        {i18n.t('Reset all values to default')}
                    </Button>
                </ButtonStrip>

                <DialogDelete
                    open={states.deleteDialog.open}
                    onHandleDelete={deleteDialog.delete}
                    onHandleClose={deleteDialog.onClose}
                    typeName={settingType.typeLowercase}
                    name={dialogDeleteName}
                />

                <DialogTable
                    open={states.specificSetting.openDialog}
                    title={settingType.typePlural}
                    handleClose={specificSettingDialog.onClose}
                    dataTitle={specificSettingDataTitle}
                    dataTitleOptions={specificSettingOptions}
                    titleValue={states.specificSetting.name}
                    handleChange={specificSettingDialog.onInputChange}
                    data={specificSettingData}
                    handleSubmitDialog={specificSettingDialog.onSave}
                    specificSetting={states.specificSetting}
                    completeListOptions={completeListOptions}
                />

                <DialogSaveData
                    openDialog={states.saveDataDialog.open}
                    onClose={handleSaveDialog.close}
                    saveDataStore={handleSaveDialog.save}
                />
            </div>

            <SuccessAlert
                show={
                    states.submitDataStore.success &&
                    !states.submitDataStore.error
                }
            />

            <SaveErrorAlert
                show={
                    states.submitDataStore.error &&
                    !states.submitDataStore.success
                }
                message={states.submitDataStore.message}
            />

            <ErrorAlert show={states.openErrorAlert} />
        </React.Fragment>
    )
}

export default GlobalSpecificSettings
