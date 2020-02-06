import React from 'react'

import { CircularLoader } from '@dhis2/ui-core'
import api from '../utils/api'

import {
    DataSetting,
    DataSpecificSetting,
    DataSetSettingsDefault,
} from '../constants/data-set-settings'
import GlobalSpecificSettings from '../pages/global-specific-settings'
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
        periodDSDownload: periodDSDownload,
        periodDSDBTrimming: periodDSDBTrimming,
        specificSetting: {
            openDialog: false,
            periodDSDBTrimming: '',
            periodDSDownload: '',
            specificSettingName: '',
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
                    specificSettingName: argsData.id,
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

    handleChange = e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        this.updateGlobal = true
    }

    handleChangeDialog = e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            specificSetting: {
                ...this.state.specificSetting,
                [e.target.name]: e.target.value,
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
        if (this.keyName === 'dataSet_settings') {
            if (Object.keys(this[settingType]).length) {
                data[settingType] = this[settingType]
            }

            api.updateValue(
                'ANDROID_SETTING_APP',
                'dataSet_settings',
                data
            ).then(res => res)
        } else {
            api.getKeys('ANDROID_SETTING_APP').then(
                api
                    .createValue(
                        'ANDROID_SETTING_APP',
                        'dataSet_settings',
                        data
                    )
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
                specificSettingName: '',
            },
        })

        this.updateGlobal = false
    }

    arrangeWord = word => {
        let newString = word.toUpperCase().split('_')
        newString = newString.join(' ')
        return newString
    }

    /**
     * Submit Dialog data, specific settings
     */
    handleSubmitDialog = () => {
        var specificDataSetNameKey = this.state.specificSetting
            .specificSettingName
        var objData = this.specificSettings

        const dataSetNameFilter = this.dataSetListComplete.filter(
            option => option.id === specificDataSetNameKey
        )

        objData[specificDataSetNameKey] = {
            id: specificDataSetNameKey,
            lastUpdated: new Date().toJSON(),
            name: dataSetNameFilter[0].name,
            periodDSDownload: this.state.specificSetting.periodDSDownload,
            periodDSDBTrimming: this.state.specificSetting.periodDSDBTrimming,
        }

        const sumaryString = this.state.specificSetting.periodDSDownload
        const sumarySettings =
            this.state.specificSetting.periodDSDownload === undefined
                ? 0
                : this.arrangeWord(sumaryString)
        const newDataSetRow = {
            name: dataSetNameFilter[0].name,
            sumarySettings: sumarySettings,
            periodDSDownload: this.state.specificSetting.periodDSDownload,
            periodDSDBTrimming: this.state.specificSetting.periodDSDBTrimming,
            id: specificDataSetNameKey,
        }

        this.specificSettings = objData

        const dataSetData = {
            specificSettings: objData,
        }

        if (this.dataSetToChange !== undefined) {
            let newRowList = []
            const rowList = this.specificSettingsRows
            newRowList = rowList.filter(row => row.id !== newDataSetRow.id)
            newRowList.push(newDataSetRow)
            this.specificSettingsRows = newRowList

            const nameList = this.dataSetNamesList
            const newNameList = nameList.filter(
                name => name !== this.state.specificSetting.specificSettingName
            )

            this.dataSetNamesList = newNameList
        } else {
            this.specificSettingsRows.push(newDataSetRow)
        }

        this.dataSetNamesList.push(
            this.state.specificSetting.specificSettingName
        )

        this.saveDataApi('globalSettings', dataSetData)

        this.handleClose()
    }

    handleReset = () => {
        this.setState({
            periodDSDownload: periodDSDownload,
            periodDSDBTrimming: periodDSDBTrimming,
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
                const nameSpace = res.filter(
                    name => name === 'ANDROID_SETTING_APP'
                )
                nameSpace.length === 0
                    ? (this.nameSpace = undefined)
                    : (this.nameSpace = nameSpace[0])
                this.nameSpace !== undefined
                    ? this.setState({ isUpdated: true })
                    : this.setState({ isUpdated: false })
                if (this.nameSpace === 'ANDROID_SETTING_APP') {
                    api.getKeys(this.nameSpace).then(res => {
                        const keyName = res.filter(
                            name => name === 'dataSet_settings'
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
                                                const sumaryString =
                                                    dataSet.periodDSDownload
                                                const sumarySettings =
                                                    dataSet.periodDSDownload ===
                                                    undefined
                                                        ? 0
                                                        : this.arrangeWord(
                                                              sumaryString
                                                          )
                                                const newDataSetRow = {
                                                    name: dataSet.name,
                                                    sumarySettings: sumarySettings,
                                                    periodDSDownload:
                                                        dataSet.periodDSDownload,
                                                    periodDSDBTrimming:
                                                        dataSet.periodDSDBTrimming,
                                                    id: key,
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
                                periodDSDownload: periodDSDownload,
                                periodDSDBTrimming: periodDSDBTrimming,
                            }

                            const data = {
                                globalSettings: {
                                    ...this.globalSettings,
                                },
                            }

                            this.saveDataApi('specificSettings', data)

                            this.nameSpace = 'ANDROID_SETTING_APP'
                            this.keyName = 'dataSet_settings'

                            this.setState({
                                isUpdated: true,
                                loading: false,
                            })
                        }
                    })
                } else if (this.nameSpace === undefined) {
                    api.createNamespace(
                        'ANDROID_SETTING_APP',
                        'dataSet_settings'
                    ).catch(e => console.error(e))
                }
            })
            .catch(e => {
                this.setState({
                    isUpdated: false,
                })
            })

        getInstance().then(d2 => {
            d2.models.dataSet
                .list({
                    paging: false,
                    level: 1,
                    fields: 'id,name',
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
                statesSpecific={this.state.specificSetting}
            />
        )
    }
}

export default DataSetSettings
