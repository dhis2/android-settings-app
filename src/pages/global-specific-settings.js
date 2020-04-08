import React from 'react'

import { Button } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import SettingsTable from '../components/settings-table/settings-table'
import DialogDelete from '../components/dialog-delete'
import DialogTable from '../components/dialog-table'
import TableActions from '../components/table-actions'

import styles from '../styles/LayoutTitles.module.css'
import buttonStyles from '../styles/Button.module.css'
import layoutStyles from '../styles/Layout.module.css'

import '@dhis2/d2-ui-core/css/Table.css'

const GlobalSpecificSettings = ({
    componentSubtitleSingular,
    componentSubtitlePlural,
    programTableData,
    states,
    handleTableChange,
    specificSettings,
    specificSettingList,
    programTableActions,
    addSpecificSetting,
    deleteDialogDelete,
    closeDialogDelete,
    typeNameDialogDelete,
    dialogDeleteName,
    handleResetGlobalSettings,
    specificSettingDialogClose,
    specificSettingDataTitle,
    specificSettingOptions,
    specificSettingHandleChange,
    specificSettingData,
    specificSettingHandleSubmit,
    tableActionsTitles,
    completeListOptions,
}) => {
    return (
        <React.Fragment>
            <div>
                <p className={styles.mainContent__title__main}>
                    {i18n.t('{{elementPlural}} global settings', {
                        elementPlural: componentSubtitlePlural,
                    })}
                </p>
                <p className={styles.mainContent__subtitle}>
                    {i18n.t(
                        'Applies to all {{elementPlural}} that an Android user has access to, unless a specific set of values has been configured for {{elementSingular}} (see below).',
                        {
                            elementPlural: componentSubtitlePlural,
                            elementSingular: componentSubtitleSingular,
                        }
                    )}
                </p>

                <SettingsTable
                    data={programTableData}
                    states={states}
                    onChange={handleTableChange}
                />
            </div>

            <div>
                <p className={styles.mainContent__title__main}>
                    {i18n.t('{{elementPlural}} specific settings', {
                        elementPlural: componentSubtitlePlural,
                    })}
                </p>
                <p className={styles.mainContent__subtitle}>
                    {i18n.t(
                        '{{elementPlural}} settings listed below overwrite the global settings above',
                        {
                            elementPlural: componentSubtitlePlural,
                        }
                    )}
                </p>

                {specificSettings.length > 0 && (
                    <div className={layoutStyles.data__topMargin}>
                        <TableActions
                            {...states}
                            columns={tableActionsTitles}
                            rows={specificSettingList}
                            menuActions={programTableActions}
                        />
                    </div>
                )}

                <div className={buttonStyles.container_button__add}>
                    <Button
                        className={buttonStyles.button__add}
                        onClick={addSpecificSetting}
                    >
                        {i18n.t('ADD')}
                    </Button>
                </div>

                <DialogDelete
                    open={states.deleteDialog.open}
                    onHandleDelete={deleteDialogDelete}
                    onHandleClose={closeDialogDelete}
                    typeName={typeNameDialogDelete}
                    name={dialogDeleteName}
                />

                <div className={buttonStyles.mainContent__button__container}>
                    <Button onClick={handleResetGlobalSettings} primary>
                        {i18n.t('SET TO DEFAULT')}
                    </Button>
                </div>

                <DialogTable
                    open={states.specificSetting.openDialog}
                    title={componentSubtitlePlural}
                    handleClose={specificSettingDialogClose}
                    dataTitle={specificSettingDataTitle}
                    dataTitleOptions={specificSettingOptions}
                    titleValue={states.specificSetting.name}
                    handleChange={specificSettingHandleChange}
                    textFieldTitleName="name"
                    data={specificSettingData}
                    handleSubmitDialog={specificSettingHandleSubmit}
                    specificSetting={states.specificSetting}
                    completeListOptions={completeListOptions}
                />
            </div>
        </React.Fragment>
    )
}

export default GlobalSpecificSettings
