import React from 'react'

import { Button } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'

import ProgramTable from '../components/program-table'
import DialogDelete from '../components/dialog-delete'
import DialogTable from '../components/dialog-table'
import TableActions from '../components/table-actions'

import styles from '../styles/LayoutTitles.module.css'
import buttonStyles from '../styles/Button.module.css'
import layoutStyles from '../styles/Layout.module.css'

import '@dhis2/d2-ui-core/css/Table.css'

class GlobalSpecificSettings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p className={styles.mainContent__title__main}>
                        {i18n.t('{{elementPlural}} global settings', {
                            elementPlural: this.props.componentSubtitlePlural,
                        })}
                    </p>
                    <p className={styles.mainContent__subtitle}>
                        {i18n.t(
                            'Applies to all {{elementPlural}} that an Android user has access to, unless a specific set of values has been configured for {{elementSingular}} (see below).',
                            {
                                elementPlural: this.props
                                    .componentSubtitlePlural,
                                elementSingular: this.props
                                    .componentSubtitleSingular,
                            }
                        )}
                    </p>

                    <ProgramTable
                        data={this.props.programTableData}
                        states={this.props.states}
                        onChange={this.props.handleTableChange}
                    />
                </div>

                <div>
                    <p className={styles.mainContent__title__main}>
                        {i18n.t('{{elementPlural}} specific settings', {
                            elementPlural: this.props.componentSubtitlePlural,
                        })}
                    </p>
                    <p className={styles.mainContent__subtitle}>
                        {i18n.t(
                            '{{elementPlural}} settings listed below overwrite the global settings above',
                            {
                                elementPlural: this.props
                                    .componentSubtitlePlural,
                            }
                        )}
                    </p>

                    {this.props.specificSettings.length > 0 && (
                        <div className={layoutStyles.data__topMargin}>
                            <TableActions
                                {...this.props.states}
                                columns={[
                                    i18n.t('Name'),
                                    i18n.t('Sumary Settings'),
                                ]}
                                rows={this.props.specificSettingList}
                                menuActions={this.props.programTableActions}
                            />
                        </div>
                    )}

                    <div className={buttonStyles.container_button__add}>
                        <Button
                            className={buttonStyles.button__add}
                            onClick={this.props.addSpecificSetting}
                        >
                            {i18n.t('ADD')}
                        </Button>
                    </div>

                    <DialogDelete
                        open={this.props.states.deleteDialog.open}
                        onHandleDelete={this.props.deleteDialogDelete}
                        onHandleClose={this.props.closeDialogDelete}
                        typeName={this.props.typeNameDialogDelete}
                        name={this.props.dialogDeleteName}
                    />

                    <div
                        className={buttonStyles.mainContent__button__container}
                    >
                        <Button
                            onClick={this.props.handleResetGlobalSettings}
                            primary
                        >
                            {i18n.t('SET TO DEFAULT')}
                        </Button>
                    </div>

                    <DialogTable
                        open={this.props.states.specificSetting.openDialog}
                        title={this.props.componentSubtitlePlural}
                        handleClose={this.props.specificSettingDialogClose}
                        dataTitle={this.props.specificSettingDataTitle}
                        dataTitleOptions={this.props.specificSettingOptions}
                        titleValue={this.props.states.specificSettingName}
                        handleChange={this.props.specificSettingHandleChange}
                        textFieldTitleId="specificSettingName"
                        textFieldTitleName="specificSettingName"
                        data={this.props.specificSettingData}
                        state={this.props.states}
                        handleSubmitDialog={
                            this.props.specificSettingHandleSubmit
                        }
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default GlobalSpecificSettings
