import React from 'react'

import { CircularLoader } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import api from '../utils/api'

import {
    DataSetSettingsDefault,
    DataSetting,
    DataSetTitles,
    DataSpecificSetting,
} from '../constants/data-set-settings'
import GlobalSpecificSettings from '../pages/global-specific-settings'
import { DATASET_SETTINGS, NAMESPACE } from '../constants/data-store'
import { getInstance } from 'd2'

const dataSetSettings = DataSetting
const dataSpecificSetting = DataSpecificSetting

const { periodDSDownload, periodDSDBTrimming } = DataSetSettingsDefault

class DataSetSettings extends React.Component {
    constructor(props) {
        super(props)

        this.nameSpace = undefined
        this.keyName = undefined
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
        },
    }

    /**
     * Edit and Delete actions for specific settings table
     * @param args
     */
    tableActions = {
        edit: (...args) => {
            this.dataSetToChange = args[0].name
            const argsData = args[0]
            const settings = this.populateObject('SPECIFIC', argsData)
            this.setState({
                specificSetting: {
                    ...settings,
                    name: argsData.id,
                    openDialog: true,
                },
            })
            this.getItemList()
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

    chooseSetting = (name, value) => {
        switch (name) {
            case 'periodDSDownload':
                return parseInt(value)
            case 'periodDSDBTrimming':
                return parseInt(value)
            default:
                return value
        }
    }

    /**
     * Handle change for global settings
     * */
    handleChange = e => {
        e.preventDefault()

        this.setState({
            ...this.state,
            disableSave: false,
            [e.target.name]: this.chooseSetting(e.target.name, e.target.value),
        })
    }

    /**
     * Updates data using Api
     * @param data (object data)
     */
    saveDataApi = data => {
        api.updateValue(NAMESPACE, DATASET_SETTINGS, data)
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
                    },
                })
            })
    }

    populateObject = (type, settingsList) => {
        let object
        switch (type) {
            case 'GLOBAL':
                object = {
                    periodDSDownload: settingsList.periodDSDownload,
                }
                break
            case 'SPECIFIC':
                object = {
                    periodDSDownload: settingsList.periodDSDownload,
                }
                break
            case 'DEFAULT':
                object = {
                    periodDSDownload,
                }
                break
            case 'CLEAN':
                object = {
                    periodDSDownload: '',
                }
                break
            default:
                break
        }
        return object
    }

    /**
     * Updates global settings on Fly
     */
    submitData = () => {
        const settings = this.populateObject('GLOBAL', this.state)
        this.globalSettings = {
            ...settings,
            lastUpdated: new Date().toJSON(),
        }

        const dataSetData = {
            globalSettings: {
                ...this.globalSettings,
            },
        }

        if (this.specificSettings) {
            dataSetData.specificSettings = {
                ...this.specificSettings,
            }
        }

        this.saveDataApi(dataSetData)
    }

    /**
     * Get dataset list not including current data sets with specific settings
     * @case edit action
     * @case add specific setting
     */
    getItemList = () => {
        if (this.dataSetNamesList.length > 0) {
            const dataSetListComplete = this.dataSetListComplete
            const dataSetUsedIdList = this.dataSetNamesList

            this.dataSetList = dataSetListComplete.filter(
                item => !dataSetUsedIdList.includes(item.id)
            )
        }
    }

    /**
     * When close Specific Settings Dialog
     */
    handleClose = () => {
        this.dataSetToChange = undefined
        const settings = this.populateObject('CLEAN')
        this.setState({
            specificSetting: {
                ...settings,
                openDialog: false,
                name: '',
            },
        })
    }

    /**
     * Submit Dialog data, specific settings
     */
    handleSubmitDialog = () => {
        const specificDataSetNameKey = this.state.specificSetting.name
        const objData = this.specificSettings

        const dataSetNameFilter = this.dataSetListComplete.filter(
            option => option.id === specificDataSetNameKey
        )

        if (dataSetNameFilter.length > 0) {
            if (this.state.specificSetting.periodDSDownload) {
                const settings = this.populateObject(
                    'SPECIFIC',
                    this.state.specificSetting
                )
                objData[specificDataSetNameKey] = {
                    ...settings,
                    id: specificDataSetNameKey,
                    lastUpdated: new Date().toJSON(),
                    name: dataSetNameFilter[0].name,
                }
            } else {
                const settings = this.populateObject('DEFAULT')
                objData[specificDataSetNameKey] = {
                    ...settings,
                    id: specificDataSetNameKey,
                    lastUpdated: new Date().toJSON(),
                    name: dataSetNameFilter[0].name,
                }
            }

            const summarySettings = this.state.specificSetting.periodDSDownload
                ? `${this.state.specificSetting.periodDSDownload} ${dataSetNameFilter[0].periodType} period`
                : periodDSDownload

            const newDataSetRow = {
                ...objData[specificDataSetNameKey],
                summarySettings,
            }

            this.specificSettings = objData

            if (this.dataSetToChange !== undefined) {
                this.specificSettingsRows = this.specificSettingsRows.filter(
                    row => row.id !== newDataSetRow.id
                )
                this.specificSettingsRows.push(newDataSetRow)

                const nameList = this.dataSetNamesList
                this.dataSetNamesList = nameList.filter(
                    name => name !== this.state.specificSetting.name
                )
            } else {
                this.specificSettingsRows.push(newDataSetRow)
            }

            this.dataSetNamesList.push(this.state.specificSetting.name)
        }

        this.handleClose()
    }

    /**
     * Set to default values
     * Global settings: initial/default values
     * Specific settings: no specific settings for datasets
     * */
    handleReset = () => {
        const settings = this.populateObject('DEFAULT')
        this.specificSettings = {}
        this.specificSettingsRows = []
        this.dataSetNamesList = []
        this.setState({
            ...settings,
            disableSave: false,
        })
    }

    /**
     * When close delete specific settings dialog, should remove it from specific settings list
     * */
    handleCloseDelete = () => {
        const data = this.argsRow
        const oldList = this.specificSettings
        const rowList = this.specificSettingsRows
        const dataNamesUsed = this.dataSetNamesList

        this.dataSetNamesList = dataNamesUsed.filter(
            dataSet => dataSet !== data.id
        )

        const newList = {}

        for (const key in oldList) {
            if (key !== data.id) {
                newList[key] = this.specificSettings[key]
            }
        }

        this.specificSettingsRows = rowList.filter(row => row.id !== data.id)
        this.specificSettings = newList
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
            this.handleCloseDelete()
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
            this.getItemList()
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
            this.handleSubmitDialog()
            this.setState({
                disableSave: false,
            })
        },
        onInputChange: e => {
            e.preventDefault()

            this.setState({
                ...this.state,
                specificSetting: {
                    ...this.state.specificSetting,
                    [e.target.name]: this.chooseSetting(
                        e.target.name,
                        e.target.value
                    ),
                },
            })
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
            this.submitData()
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
        getInstance().then(d2 => {
            d2.models.dataSet
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

        api.getNamespaces()
            .then(res => {
                const nameSpace = res.filter(name => name === NAMESPACE)
                nameSpace.length === 0
                    ? (this.nameSpace = undefined)
                    : (this.nameSpace = nameSpace[0])

                if (this.nameSpace === NAMESPACE) {
                    api.getKeys(this.nameSpace).then(res => {
                        const keyName = res.filter(
                            name => name === DATASET_SETTINGS
                        )
                        keyName.length === 0
                            ? (this.keyName = undefined)
                            : (this.keyName = keyName[0])
                        if (this.keyName !== undefined) {
                            api.getValue(this.nameSpace, this.keyName).then(
                                res => {
                                    if (res.value.specificSettings) {
                                        this.specificSettings =
                                            res.value.specificSettings
                                        this.dataSetNamesList = Object.keys(
                                            this.specificSettings
                                        )
                                        for (const key in this
                                            .specificSettings) {
                                            if (
                                                this.specificSettings.hasOwnProperty(
                                                    key
                                                )
                                            ) {
                                                const dataSetNameFilter = this.dataSetListComplete.filter(
                                                    option => option.id === key
                                                )

                                                const dataSet = this
                                                    .specificSettings[key]

                                                const summarySettings =
                                                    dataSet.periodDSDownload ===
                                                    undefined
                                                        ? undefined
                                                        : `${dataSet.periodDSDownload} ${dataSetNameFilter[0].periodType} period`

                                                const newDataSetRow = {
                                                    ...dataSet,
                                                    summarySettings,
                                                }

                                                this.specificSettingsRows.push(
                                                    newDataSetRow
                                                )
                                            }
                                        }
                                        this.setState({
                                            loading: false,
                                        })
                                    }

                                    if (res.value.globalSettings) {
                                        this.setState({
                                            ...res.value.globalSettings,
                                            loading: false,
                                        })
                                        this.globalSettings =
                                            res.value.globalSettings
                                    }
                                }
                            )
                        }
                    })
                }
            })
            .catch(e => {
                console.error(e)
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        if (this.state.loading === true) {
            return <CircularLoader small />
        }

        return (
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
        )
    }
}

export default DataSetSettings
