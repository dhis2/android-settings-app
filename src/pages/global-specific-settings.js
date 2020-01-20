import React from 'react'

/* import { Button } from '@dhis2/d2-ui-core' */
import { Button } from '@dhis2/ui-core'
import Table from '@dhis2/d2-ui-table'
import i18n from '@dhis2/d2-i18n'

import ProgramTable from '../components/program-table'
import DialogDelete from '../components/dialog-delete'
import DialogTable from '../components/dialog-table'

import styles from '../styles/LayoutTitles.module.css'
import buttonStyles from '../styles/Button.module.css'
import layoutStyles from '../styles/Layout.module.css'

import '@dhis2/d2-ui-core/css/Table.css'

class GlobalSpecificSettings extends React.Component {
    constructor(props) {
        super(props)
        console.log('props', props, i18n)
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p className={styles.mainContent__title__main}>
                        {' '}
                        {/* "main-content__title main-content__title__main" */}
                        {i18n.t('{{elementPlural}} global settings', {
                            elementPlural: this.props.componentSubtitlePlural,
                        })}
                    </p>
                    <p className={styles.mainContent__subtitle}>
                        {i18n.t(
                            'Applies to all {{elementPlural}} that an Android user has access to, unless an specific set of values has been configured for a {{elementSingular}} (see below).',
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
                            {/* <Table
                                {...this.props.states}
                                columns={['name', 'sumarySettings']}
                                rows={this.props.specificSettingList}
                                contextMenuActions={
                                    this.props.programTableActions
                                }
                            /> */}
                        </div>
                    )}

                    <div className={buttonStyles.container_button__add}>
                        <Button
                            raised
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
                            raised
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
