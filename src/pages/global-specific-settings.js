import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import Table from '@dhis2/d2-ui-table'

import ProgramTable from '../components/program-table'
import DialogDelete from '../components/dialog-delete'
import DialogTable from '../components/dialog-table'

import '@dhis2/d2-ui-core/css/Table.css'

const style = {
    button: {
        margin: '20px 0px 10px 0px',
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}

class GlobalSpecificSettings extends React.Component {
    constructor(props) {
        super(props)

        props.d2.i18n.translations['name'] = this.props.tableNameProperty
        props.d2.i18n.translations['sumary_settings'] = 'Sumary Settings'

        props.d2.i18n.translations['edit'] = 'edit'
        props.d2.i18n.translations['delete'] = 'delete'
        props.d2.i18n.translations['actions'] = 'actions'
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p className="main-content__title main-content__title__main">
                        {this.props.componentSubtitlePlural} global settings
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        Applies to all {this.props.componentSubtitlePlural} that
                        an Android user has access to, unless an specific set of
                        values has been configured for a{' '}
                        {this.props.componentSubtitleSingular} (see below)
                    </p>

                    <ProgramTable
                        data={this.props.programTableData}
                        states={this.props.states}
                        onChange={this.props.handleTableChange}
                    />
                </div>

                <div>
                    <p className="main-content__title main-content__title__main">
                        {this.props.componentSubtitlePlural} specific settings
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        {this.props.componentSubtitlePlural} settings listed
                        below overwrite the global settings above
                    </p>

                    {this.props.specificSettings.length > 0 && (
                        <div className="data__top-margin">
                            <Table
                                {...this.props.states}
                                columns={['name', 'sumarySettings']}
                                rows={this.props.specificSettingList}
                                contextMenuActions={
                                    this.props.programTableActions
                                }
                            />
                        </div>
                    )}

                    <div style={style.container}>
                        <Button
                            raised
                            style={style.button}
                            onClick={this.props.addSpecificSetting}
                        >
                            ADD
                        </Button>
                    </div>

                    <DialogDelete
                        open={this.props.states.deleteDialog.open}
                        onHandleDelete={this.props.deleteDialogDelete}
                        onHandleClose={this.props.closeDialogDelete}
                        typeName={this.props.typeNameDialogDelete}
                        name={this.props.dialogDeleteName}
                    />

                    <div className="main-content__button__container">
                        <Button
                            onClick={this.props.handleResetGlobalSettings}
                            raised
                            color="primary"
                        >
                            SET TO DEFAULT
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
