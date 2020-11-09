import React from 'react'

import i18n from '@dhis2/d2-i18n'
import {
    CLEAN,
    DATA_SET,
    dataSetSettingsDefault,
    DataSetting,
    DataSetTitles,
    DataSpecificSetting,
    DEFAULT,
    SPECIFIC,
    SPECIFIC_SETTINGS,
} from '../../../constants/data-set-settings'
import GlobalSpecificSettings from '../../../pages/global-specific-settings'
import { DATASET_SETTINGS } from '../../../constants/data-store'
import { getInstance } from 'd2'
import { parseValueBySettingType } from '../../../modules/dataset/parseValueBySettingType'
import { populateSettingObject } from '../../../modules/dataset/populateSettingObject'
import { getItemFromList } from '../../../modules/getItemFromList'
import { prepareDataToSubmit } from '../../../modules/prepareDataToSubmit'
import { prepareSpecificSettingsToSave } from '../../../modules/prepareSpecificSettingToSave'
import { removeSettingFromList } from '../../../modules/removeSettingFromList'
import { apiLoadDatasetSettings } from '../../../modules/dataset/apiLoadSettings'
import { apiUpdateDataStore } from '../../../modules/apiUpdateDataStore'
import SectionWrapper from '../section-wrapper'

const dataSetSettings = DataSetting
const dataSpecificSetting = DataSpecificSetting

const { periodDSDownload, periodDSDBTrimming } = dataSetSettingsDefault

class DataSetSettings extends React.Component {
    constructor(props) {
        super(props)

        this.dataSetNamesList = []
        this.globalSettings = {}
        this.specificSettings = {}
        this.specificSettingsRows = []
        this.dataSetList = []
        this.dataSetListComplete = []
        this.dataSetToChange = undefined
        this.argsRow = undefined
        this.dataSetName = undefined
    }

    state = {
        periodDSDownload,
        periodDSDBTrimming,
        specificSetting: {
            openDialog: false,
            periodDSDBTrimming: '',
            periodDSDownload: '',
            name: '',
        },
        loading: true,
        deleteDialog: {
            open: false,
        },
        disableSave: true,
        saveDataDialog: {
            open: false,
        },
        submitDataStore: {
            success: false,
            error: false,
            message: undefined,
        },
        openErrorAlert: false,
        disableAll: false,
    }

    /**
     * Edit and Delete actions for specific settings table
     * @param args
     */
    tableActions = {
        edit: (...args) => {
            this.dataSetToChange = args[0].name
            const argsData = args[0]
            const settings = populateSettingObject(SPECIFIC, argsData)
            this.setState({
                specificSetting: {
                    ...settings,
                    name: argsData.id,
                    openDialog: true,
                },
            })
            this.dataSetList = getItemFromList(
                this.dataSetNamesList,
                this.dataSetListComplete,
                this.dataSetList
            )
        },
        delete: (...args) => {
            this.argsRow = args[0]
            this.dataSetName = args[0].name

            this.setState({
                deleteDialog: {
                    open: true,
                },
            })
        },
    }

    /**
     * Handle change for global settings
     * */
    handleChange = e => {
        this.setState({
            ...this.state,
            disableSave: false,
            [e.name]: parseValueBySettingType(e.name, e.value),
        })
    }

    /**
     * Updates data using Api
     * @param data (object data)
     */
    saveDataApi = data => {
        apiUpdateDataStore(data, DATASET_SETTINGS)
            .then(() => {
                this.setState({
                    submitDataStore: {
                        success: true,
                        error: false,
                    },
                })
            })
            .catch(e => {
                console.error(e)
                this.setState({
                    submitDataStore: {
                        success: false,
                        error: true,
                        message: e.message,
                    },
                })
            })
    }

    /**
     * When close Specific Settings Dialog
     */
    handleClose = () => {
        this.dataSetToChange = undefined
        const settings = populateSettingObject(CLEAN)
        this.setState({
            specificSetting: {
                ...settings,
                openDialog: false,
                name: '',
            },
        })
    }

    /**
     * Set to default values
     * Global settings: initial/default values
     * Specific settings: no specific settings for datasets
     * */
    handleReset = () => {
        const settings = populateSettingObject(DEFAULT)
        this.specificSettings = {}
        this.specificSettingsRows = []
        this.dataSetNamesList = []
        this.dataSetList = this.dataSetListComplete

        this.setState({
            ...settings,
            disableSave: false,
            submitDataStore: {
                success: false,
                error: false,
                message: undefined,
            },
        })
    }

    /**
     * Methods to handle Delete Dialog
     * */
    handleDeleteDialog = {
        onClose: () => {
            this.argsRow = undefined
            this.dataSetName = undefined
            this.setState({
                deleteDialog: {
                    open: false,
                },
            })
        },
        delete: () => {
            const {
                specificSettings,
                rowSettings,
                nameList,
                optionList,
            } = removeSettingFromList({
                row: this.argsRow,
                specificSettings: this.specificSettings,
                rowSettings: this.specificSettingsRows,
                nameList: this.dataSetNamesList,
                optionList: this.dataSetList,
                listComplete: this.dataSetListComplete,
            })
            this.specificSettings = specificSettings
            this.specificSettingsRows = rowSettings
            this.dataSetNamesList = nameList
            this.dataSetList = optionList
            this.setState({
                deleteDialog: {
                    open: false,
                },
                disableSave: false,
            })
        },
        titleName: this.dataSetName,
    }

    /**
     * Methods to handle Specific Settings Table Actions
     */
    handleSpecificSetting = {
        handleActions: this.tableActions,
        columnsTitle: [i18n.t('Name'), i18n.t('Number of Periods')],
    }

    /**
     * Methods to handle Specific Setting Dialog
     * */
    handleSpecificSettingDialog = {
        handleOpen: () => {
            this.dataSetList = getItemFromList(
                this.dataSetNamesList,
                this.dataSetListComplete,
                this.dataSetList
            )
            this.setState({
                specificSetting: {
                    ...this.state.specificSetting,
                    openDialog: true,
                },
            })
        },
        onClose: () => {
            this.handleClose()
        },
        onSave: () => {
            const {
                specificSettings,
                specificSettingsRows,
                specificSettingsNameList,
            } = prepareSpecificSettingsToSave({
                settingType: DATA_SET,
                states: this.state,
                specificSettings: this.specificSettings,
                specificSettingToChange: this.dataSetToChange,
                specificSettingsRows: this.specificSettingsRows,
                specificSettingsNameList: this.dataSetNamesList,
                settingsCompleteList: this.dataSetListComplete,
            })
            this.specificSettings = specificSettings
            this.specificSettingsRows = specificSettingsRows
            this.dataSetNamesList = specificSettingsNameList

            this.handleClose()
            this.setState({
                disableSave: false,
            })
        },
        onInputChange: (e, key) => {
            const name = typeof key === 'string' ? key : e.name
            const value = typeof key === 'string' ? e.selected : e.value

            if (name === 'name') {
                const dataSetSelected = this.dataSetListComplete.filter(
                    dataSetOption => dataSetOption.id === e.selected
                )
                const settings = populateSettingObject(
                    SPECIFIC_SETTINGS,
                    dataSetSelected
                )

                this.setState({
                    ...this.state,
                    specificSetting: {
                        ...this.state.specificSetting,
                        ...settings,
                        [name]: parseValueBySettingType(name, value),
                    },
                })
            } else {
                this.setState({
                    ...this.state,
                    specificSetting: {
                        ...this.state.specificSetting,
                        [name]: parseValueBySettingType(name, value),
                    },
                })
            }
        },
    }

    /**
     * Handle save DataStore dialog
     * */
    handleSaveDataDialog = {
        open: () => {
            this.setState({
                saveDataDialog: {
                    open: true,
                },
            })
        },
        close: () => {
            this.setState({
                saveDataDialog: {
                    open: false,
                },
            })
        },
        save: () => {
            const { globalSettings, settingsToSubmit } = prepareDataToSubmit({
                settingType: DATA_SET,
                states: this.state,
                globalSettingsObject: this.globalSettings,
                specificSettings: this.specificSettings,
            })
            this.globalSettings = globalSettings
            this.saveDataApi(settingsToSubmit)
            this.setState({
                disableSave: true,
                saveDataDialog: {
                    open: false,
                },
                submitDataStore: {
                    success: false,
                    error: false,
                },
            })
        },
    }

    componentDidMount() {
        getInstance()
            .then(d2 => {
                return d2.models.dataSet
                    .list({
                        paging: false,
                        level: 1,
                        fields: 'id,name,periodType',
                        filter: 'access.data.write:eq:true',
                    })
                    .then(collection => {
                        const dataSetList = collection.toArray()
                        this.dataSetList = dataSetList
                        this.dataSetListComplete = dataSetList
                    })
            })
            .then(() => {
                apiLoadDatasetSettings({
                    specificSettings: this.specificSettings,
                    datasetNameList: this.dataSetNamesList,
                    datasetListComplete: this.dataSetListComplete,
                    specificSettingsRows: this.specificSettingsRows,
                    globalSettings: this.globalSettings,
                })
                    .then(res => {
                        const {
                            settings,
                            specificSettings,
                            datasetNameList,
                            datasetListComplete,
                            specificSettingsRows,
                            globalSettings,
                        } = res

                        this.specificSettings = specificSettings
                        this.dataSetNamesList = datasetNameList
                        this.dataSetListComplete = datasetListComplete
                        this.specificSettingsRows = specificSettingsRows
                        this.globalSettings = globalSettings

                        this.setState({
                            ...settings.globalSettings,
                            loading: false,
                        })
                    })
                    .catch(e => {
                        console.error(e)
                        this.setState({
                            loading: false,
                            openErrorAlert: true,
                        })
                    })
            })
    }

    render() {
        return (
            <SectionWrapper
                loading={this.state.loading}
                unsavedChanges={!this.state.disableSave}
            >
                <GlobalSpecificSettings
                    programTableData={dataSetSettings}
                    states={this.state}
                    handleTableChange={this.handleChange}
                    specificSettings={this.dataSetNamesList}
                    specificSettingList={this.specificSettingsRows}
                    dialogDeleteName={this.dataSetName}
                    handleSetDefaultValues={this.handleReset}
                    specificSettingDataTitle={this.dataSetToChange}
                    specificSettingOptions={this.dataSetList}
                    specificSettingData={dataSpecificSetting}
                    completeListOptions={this.dataSetListComplete}
                    handleSaveDialog={this.handleSaveDataDialog}
                    deleteDialog={this.handleDeleteDialog}
                    specificSettingDialog={this.handleSpecificSettingDialog}
                    specificSettingTable={this.handleSpecificSetting}
                    settingType={DataSetTitles}
                />
            </SectionWrapper>
        )
    }
}

export default DataSetSettings
