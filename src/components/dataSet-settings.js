import React from 'react'

import { CircularLoader } from '@dhis2/ui-core'
import api from '../utils/api'

import {
    DataSetting,
    DataSpecificSetting,
    DataSetSettingsDefault,
} from '../constants/data-set-settings'
import GlobalSpecificSettings from '../pages/global-specific-settings'
import { NAMESPACE, DATASET_SETTINGS } from '../constants/data-store'
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
        this.updateGlobal = false
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
        isUpdated: false,
        loading: true,
        deleteDialog: {
            open: false,
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
            this.setState({
                specificSetting: {
                    name: argsData.id,
                    periodDSDownload: argsData.periodDSDownload,
                    periodDSDBTrimming: argsData.periodDSDBTrimming,
                    openDialog: true,
                },
            })
            this.getItemList()
            this.updateGlobal = false
        },
        delete: (...args) => {
            this.argsRow = args[0]
            this.dataSetName = args[0].name

            this.setState({
                deleteDialog: {
                    open: true,
                },
                isUpdated: true,
            })
            this.updateGlobal = false
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

    handleChange = e => {
        e.preventDefault()

        this.setState({
            ...this.state,
            [e.target.name]: this.chooseSetting(e.target.name, e.target.value),
        })
        this.updateGlobal = true
    }

    handleChangeDialog = e => {
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
        this.updateGlobal = false
    }

    /**
     * Updates data using Api, checks if keyname exists before updating or creating keyname
     * @param settingType (global or specific setting)
     * @param data (object data)
     */
    saveDataApi = (settingType, data) => {
        if (this.keyName === DATASET_SETTINGS) {
            if (Object.keys(this[settingType]).length) {
                data[settingType] = this[settingType]
            }

            api.updateValue(NAMESPACE, DATASET_SETTINGS, data).then(res => res)
        } else {
            api.getKeys(NAMESPACE).then(
                api
                    .createValue(NAMESPACE, DATASET_SETTINGS, data)
                    .then(data => data)
            )
        }
    }

    /**
     * Updates global settings on Fly
     */
    submitData = () => {
        if (!this.updateGlobal) {
            return true
        }

        const globalSettings = {
            lastUpdated: new Date().toJSON(),
            periodDSDownload: this.state.periodDSDownload,
            periodDSDBTrimming: this.state.periodDSDBTrimming,
        }

        this.globalSettings = globalSettings

        const dataSetData = {
            globalSettings: {
                ...this.globalSettings,
            },
        }

        this.saveDataApi('specificSettings', dataSetData)
    }

    /**
     * Get dataset list not including current data sets with specific settings
     * @case edit action
     * @case add specific setting
     */
    getItemList = () => {
        if (this.dataSetNamesList.length > 0) {
            const dataSetListComplete = this.dataSetListComplete
            const dataUsedlist = this.dataSetNamesList

            const dataSetNameFilter = dataSetListComplete.filter(
                item => !dataUsedlist.includes(item.id)
            )
            this.dataSetList = dataSetNameFilter
        }
    }

    /**
     * Open Dialog Table Component
     * @case add specific setting: opens Dialog Component with DataSets specific setting List
     */
    handleClickOpen = () => {
        this.getItemList()

        this.setState({
            specificSetting: {
                ...this.state.specificSetting,
                openDialog: true,
            },
        })

        this.updateGlobal = false
    }

    handleClose = () => {
        this.dataSetToChange = undefined

        this.setState({
            specificSetting: {
                openDialog: false,
                periodDSDownload: '',
                periodDSDBTrimming: '',
                name: '',
            },
        })

        this.updateGlobal = false
    }

    /**
     * Submit Dialog data, specific settings
     */
    handleSubmitDialog = () => {
        var specificDataSetNameKey = this.state.specificSetting.name
        var objData = this.specificSettings

        const dataSetNameFilter = this.dataSetListComplete.filter(
            option => option.id === specificDataSetNameKey
        )

        if (dataSetNameFilter.length > 0) {
            objData[specificDataSetNameKey] = {
                id: specificDataSetNameKey,
                lastUpdated: new Date().toJSON(),
                name: dataSetNameFilter[0].name,
                periodDSDownload: this.state.specificSetting.periodDSDownload,
                periodDSDBTrimming: this.state.specificSetting
                    .periodDSDBTrimming,
            }

            const sumarySettings =
                this.state.specificSetting.periodDSDownload === undefined
                    ? undefined
                    : this.state.specificSetting.periodDSDownload
            const newDataSetRow = {
                ...objData[specificDataSetNameKey],
                sumarySettings,
            }

            this.specificSettings = objData

            const dataSetData = {
                specificSettings: objData,
            }

            if (this.dataSetToChange !== undefined) {
                this.specificSettingsRows = this.specificSettingsRows.filter(
                    row => row.id !== newDataSetRow.id
                )
                this.specificSettingsRows.push(newDataSetRow)

                const nameList = this.dataSetNamesList
                const newNameList = nameList.filter(
                    name => name !== this.state.specificSetting.name
                )

                this.dataSetNamesList = newNameList
            } else {
                this.specificSettingsRows.push(newDataSetRow)
            }

            this.dataSetNamesList.push(this.state.specificSetting.name)

            this.saveDataApi('globalSettings', dataSetData)
        }

        this.handleClose()
    }

    handleReset = () => {
        this.setState({
            periodDSDownload,
            periodDSDBTrimming,
        })
        this.updateGlobal = true
    }

    handleCloseDelete = () => {
        const data = this.argsRow
        const oldList = this.specificSettings
        const rowList = this.specificSettingsRows
        const dataNamesUsed = this.dataSetNamesList

        const dataListNew = dataNamesUsed.filter(dataSet => dataSet !== data.id)
        this.dataSetNamesList = dataListNew

        const newList = {}
        let newRowList = []

        for (const key in oldList) {
            if (key !== data.id) {
                const dataSet = this.specificSettings[key]
                newList[key] = dataSet
            }
        }

        newRowList = rowList.filter(row => row.id !== data.id)

        this.specificSettingsRows = newRowList
        this.specificSettings = newList

        this.setState({
            isUpdated: true,
            deleteDialog: {
                open: false,
            },
        })
        this.updateGlobal = true
    }

    handleCancelDialog = () => {
        this.argsRow = undefined
        this.dataSetName = undefined
        this.setState({
            isUpdated: true,
            deleteDialog: {
                open: false,
            },
        })
        this.updateGlobal = false
    }

    async componentDidMount() {
        await api
            .getNamespaces()
            .then(res => {
                const nameSpace = res.filter(name => name === NAMESPACE)
                nameSpace.length === 0
                    ? (this.nameSpace = undefined)
                    : (this.nameSpace = nameSpace[0])
                this.nameSpace !== undefined
                    ? this.setState({ isUpdated: true })
                    : this.setState({ isUpdated: false })
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
                                                const dataSet = this
                                                    .specificSettings[key]
                                                const sumarySettings =
                                                    dataSet.periodDSDownload ===
                                                    undefined
                                                        ? undefined
                                                        : dataSet.periodDSDownload

                                                const newDataSetRow = {
                                                    ...dataSet,
                                                    sumarySettings,
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
                                            isUpdated: true,
                                            loading: false,
                                        })
                                        this.globalSettings =
                                            res.value.globalSettings
                                    }
                                }
                            )
                        } else {
                            this.globalSettings = {
                                periodDSDownload,
                                periodDSDBTrimming,
                            }

                            const data = {
                                globalSettings: {
                                    ...this.globalSettings,
                                },
                            }

                            this.saveDataApi('specificSettings', data)

                            this.nameSpace = NAMESPACE
                            this.keyName = DATASET_SETTINGS

                            this.setState({
                                isUpdated: true,
                                loading: false,
                            })
                        }
                    })
                } else if (this.nameSpace === undefined) {
                    api.createNamespace(NAMESPACE, DATASET_SETTINGS).catch(e =>
                        console.error(e)
                    )
                }
            })
            .catch(e => {
                this.setState({
                    isUpdated: false,
                    loading: false,
                })
            })

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
    }

    componentDidUpdate() {
        this.submitData()
    }

    render() {
        if (this.state.loading === true) {
            return <CircularLoader small />
        }

        return (
            <GlobalSpecificSettings
                tableNameProperty="Data Set Name"
                componentSubtitleSingular="Data Set"
                componentSubtitlePlural="Data Sets"
                programTableData={dataSetSettings}
                states={this.state}
                handleTableChange={this.handleChange}
                specificSettings={this.dataSetNamesList}
                specificSettingList={this.specificSettingsRows}
                programTableActions={this.tableActions}
                addSpecificSetting={this.handleClickOpen}
                deleteDialogDelete={this.handleCloseDelete}
                closeDialogDelete={this.handleCancelDialog}
                typeNameDialogDelete="data set"
                dialogDeleteName={this.dataSetName}
                handleResetGlobalSettings={this.handleReset}
                specificSettingDialogClose={this.handleClose}
                specificSettingDataTitle={this.dataSetToChange}
                specificSettingOptions={this.dataSetList}
                specificSettingHandleChange={this.handleChangeDialog}
                specificSettingData={dataSpecificSetting}
                specificSettingHandleSubmit={this.handleSubmitDialog}
                specificSetting={this.state.specificSetting}
                completeListOptions={this.dataSetListComplete}
            />
        )
    }
}

export default DataSetSettings
