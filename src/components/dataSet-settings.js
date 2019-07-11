import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import { CircularProgress } from '@dhis2/d2-ui-core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Table from '@dhis2/d2-ui-table'
import '@dhis2/d2-ui-core/build/css/Table.css'
import api from '../utils/api'

import DialogDelete from '../components/dialog-delete'
import ProgramTable from './program-table'
import {
    DataSetting,
    DataSpecificSetting,
    DataSetSettingsDefault,
} from '../constants/data-set-settings'

const dataSetSettings = DataSetting
const dataSpecificSetting = DataSpecificSetting

const { periodDSDownload, periodDSDBTrimming } = DataSetSettingsDefault

class DataSetSettings extends React.Component {
    constructor(props) {
        super(props)

        props.d2.i18n.translations['name'] = 'Data Set Name'
        props.d2.i18n.translations['sumary_settings'] = 'Sumary Settings'

        props.d2.i18n.translations['edit'] = 'edit'
        props.d2.i18n.translations['delete'] = 'delete'
        props.d2.i18n.translations['actions'] = 'actions'

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
        specificDataSet: {
            openDialog: false,
        },
        isUpdated: false,
        specificPeriodDSDownload: '',
        specificPeriodDSDBTrimming: '',
        specificDataSetName: '',
        loading: true,
        deleteDialog: {
            open: false,
        },
    }

    tableActions = {
        edit: (...args) => {
            console.log('Edit', args, args[0])
            this.dataSetToChange = args[0].name
            const argsData = args[0]
            this.setState({
                specificPeriodDSDownload: argsData.specificPeriodDSDownload,
                specificPeriodDSDBTrimming: argsData.specificPeriodDSDBTrimming,
                specificDataSetName: argsData.id,
            })
            this.handleClickOpen()
        },
        delete: (...args) => {
            console.log('Delete', ...args)
            /*             const data = args[0]
            const oldList = this.specificSettings
            const rowList = this.specificSettingsRows

            console.log({
                specificSettings: oldList,
                args: data,
            })
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

            console.log({
                newList: newList,
                row: newRowList,
                specificSettings: this.specificSettings,
            }) */
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
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        this.updateGlobal = true
    }

    handleChangeDialog = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        this.updateGlobal = false
    }

    submitData = () => {
        if (!this.updateGlobal) {
            console.log('update', this)
            return true
        }

        const globalSettings = {
            date: new Date().toJSON(),
            periodDSDownload: this.state.periodDSDownload,
            periodDSDBTrimming: this.state.periodDSDBTrimming,
        }

        this.globalSettings = globalSettings

        const dataSetData = {
            globalSettings: {
                ...this.globalSettings,
            },
        }

        if (this.keyName === 'dataSet_settings') {
            console.log('specificSettings', this.specificSettings)
            if (Object.keys(this.specificSettings).length) {
                dataSetData.specificSettings = this.specificSettings
                console.log('envio de data', dataSetData)
            }

            console.log('submit', dataSetData)

            api.updateValue(
                'ANDROID_SETTING_APP',
                'dataSet_settings',
                dataSetData
            ).then(res => {
                console.log('res update', res)
            })
        } else {
            api.getKeys('ANDROID_SETTING_APP').then(
                api
                    .createValue(
                        'ANDROID_SETTING_APP',
                        'dataSet_settings',
                        dataSetData
                    )
                    .then(res => {
                        console.log('data response update', res)
                    })
            )
            console.log('submit', dataSetData)
        }
    }

    handleClickOpen = () => {
        if (this.dataSetNamesList.length > 0) {
            const dataSetListComplete = this.dataSetListComplete
            const dataUsedlist = this.dataSetNamesList

            const dataSetNameFilter = dataSetListComplete.filter(
                item => !dataUsedlist.includes(item.id)
            )
            this.dataSetList = dataSetNameFilter
            console.log('nueva lista', this.dataSetList)
        }

        this.setState({
            specificDataSet: {
                openDialog: true,
            },
        })

        this.updateGlobal = false
    }

    handleClose = () => {
        this.dataSetToChange = undefined

        this.setState({
            specificDataSet: {
                openDialog: false,
            },
            specificPeriodDSDownload: '',
            specificPeriodDSDBTrimming: '',
            specificDataSetName: '',
        })

        this.updateGlobal = false
    }

    handleSubmitDialog = async e => {
        e.preventDefault()

        var specificDataSetNameKey = this.state.specificDataSetName
        var objData = this.specificSettings

        const dataSetNameFilter = this.dataSetList.filter(
            option => option.id === specificDataSetNameKey
        )

        console.log(dataSetNameFilter[0], this.specificSettings)

        objData[specificDataSetNameKey] = {
            date: new Date().toJSON(),
            name: dataSetNameFilter[0].name,
            specificPeriodDSDownload: this.state.specificPeriodDSDownload,
            specificPeriodDSDBTrimming: this.state.specificPeriodDSDBTrimming,
        }

        const sumarySettings =
            this.state.specificPeriodDSDownload === undefined
                ? 0
                : this.state.specificPeriodDSDownload
        const newDataSetRow = {
            name: dataSetNameFilter[0].name,
            sumarySettings: sumarySettings,
            specificPeriodDSDownload: this.state.specificPeriodDSDownload,
            specificPeriodDSDBTrimming: this.state.specificPeriodDSDBTrimming,
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
                name => name !== this.state.specificDataSetName
            )

            this.dataSetNamesList = newNameList
            console.log('nameList', this.dataSetNamesList)
        } else {
            this.specificSettingsRows.push(newDataSetRow)
            console.log('rows table', this.specificSettingsRows)
        }

        this.dataSetNamesList.push(this.state.specificDataSetName)

        console.log(dataSetData, this.specificSettings)

        if (this.keyName === 'dataSet_settings') {
            if (Object.keys(this.globalSettings).length) {
                dataSetData.globalSettings = this.globalSettings
                console.log(dataSetData)
            }

            api.updateValue(
                'ANDROID_SETTING_APP',
                'dataSet_settings',
                dataSetData
            ).then(res => {
                console.log('res update', res)
            })
        } else {
            api.getKeys('ANDROID_SETTING_APP').then(
                api
                    .createValue(
                        'ANDROID_SETTING_APP',
                        'dataSet_settings',
                        dataSetData
                    )
                    .then(data => {
                        console.log('data response update', data)
                    })
            )
        }

        this.handleClose()
    }

    handleReset = e => {
        e.preventDefault()

        this.setState({
            periodDSDownload: periodDSDownload,
            periodDSDBTrimming: periodDSDBTrimming,
        })
        this.updateGlobal = true
    }

    handleCloseDelete = () => {
        console.log('delete', this.argsRow)
        const data = this.argsRow
        const oldList = this.specificSettings
        const rowList = this.specificSettingsRows
        const dataNamesUsed = this.dataSetNamesList

        const dataListNew = dataNamesUsed.filter(dataSet => dataSet !== data.id)
        this.dataSetNamesList = dataListNew

        console.log({
            specificSettings: oldList,
            args: data,
            listName: this.dataSetNamesList,
        })
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

        console.log({
            newList: newList,
            row: newRowList,
            specificSettings: this.specificSettings,
        })

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
                                    console.group(res)

                                    if (res.value.specificSettings) {
                                        this.specificSettings =
                                            res.value.specificSettings
                                        this.dataSetNamesList = Object.keys(
                                            this.specificSettings
                                        )
                                        console.log(this.dataSetNamesList)
                                        for (const key in this
                                            .specificSettings) {
                                            if (
                                                this.specificSettings.hasOwnProperty(
                                                    key
                                                )
                                            ) {
                                                const dataSet = this
                                                    .specificSettings[key]
                                                console.log(dataSet)
                                                const sumarySettings =
                                                    dataSet.specificPeriodDSDownload ===
                                                    undefined
                                                        ? 0
                                                        : dataSet.specificPeriodDSDownload
                                                const newDataSetRow = {
                                                    name: dataSet.name,
                                                    sumarySettings: sumarySettings,
                                                    specificPeriodDSDownload:
                                                        dataSet.specificPeriodDSDownload,
                                                    specificPeriodDSDBTrimming:
                                                        dataSet.specificPeriodDSDBTrimming,
                                                    id: key,
                                                }

                                                console.log(newDataSetRow)
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
                            console.log('no data settings')

                            this.setState({
                                isUpdated: true,
                                loading: false,
                            })
                        }
                    })
                } else if (this.nameSpace === undefined) {
                    console.log('no hay data setting')
                    api.createNamespace(
                        'ANDROID_SETTING_APP',
                        'dataSet_settings'
                    ).catch(e => console.log(e))
                }
            })
            .catch(e => {
                this.setState({
                    isUpdated: false,
                })
            })

        this.props.d2.models.dataSet
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
                console.log('data set list', this.dataSetList)
            })
    }

    componentDidUpdate() {
        this.submitData()
    }

    render() {
        if (this.state.loading === true) {
            return <CircularProgress small />
        }

        return (
            <div>
                <div>
                    <p className="main-content__title main-content__title__main">
                        Data Sets global settings
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        Applies to all Data Sets that an Android user has access
                        to, unless an specific set of values has been configured
                        for a Data Sets (see below)
                    </p>

                    <ProgramTable
                        data={dataSetSettings}
                        states={this.state}
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <p className="main-content__title main-content__title__main">
                        Data Sets specific settings
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        Data Set settings listed below overwrite the global
                        settings above
                    </p>

                    {this.dataSetNamesList.length > 0 && (
                        <div className="data__top-margin">
                            <Table
                                {...this.state}
                                columns={['name', 'sumarySettings']}
                                rows={this.specificSettingsRows}
                                contextMenuActions={this.tableActions}
                            />
                        </div>
                    )}

                    <Button raised onClick={this.handleClickOpen}>
                        ADD
                    </Button>

                    <DialogDelete
                        open={this.state.deleteDialog.open}
                        onHandleDelete={this.handleCloseDelete}
                        onHandleClose={this.handleCancelDialog}
                        typeName="data set"
                        name={this.dataSetName}
                    />

                    <div className="main-content__button__container">
                        <Button
                            onClick={this.handleReset}
                            raised
                            color="primary"
                        >
                            SET TO DEFAULT
                        </Button>
                    </div>

                    <Dialog
                        open={this.state.specificDataSet.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        fullWidth
                        maxWidth="lg"
                    >
                        <DialogTitle id="form-dialog-title">
                            Values per Data Set
                        </DialogTitle>
                        <DialogContent>
                            {this.dataSetToChange === undefined ? (
                                <Select
                                    value={this.state.specificDataSetName}
                                    onChange={this.handleChangeDialog}
                                    id="specificDataSetName"
                                    name="specificDataSetName"
                                    style={{ minWidth: '150px' }}
                                >
                                    {this.dataSetList.map(option => (
                                        <MenuItem
                                            value={option.id}
                                            key={option.id}
                                            name={option.name}
                                        >
                                            <em> {option.name} </em>
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <p className="main-content__title main-content__title__dialog">
                                    {this.dataSetToChange}
                                </p>
                            )}

                            <ProgramTable
                                data={dataSpecificSetting}
                                states={this.state}
                                onChange={this.handleChangeDialog}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                raised
                                onClick={this.handleClose}
                                className="main-content__dialog__button"
                            >
                                CANCEL
                            </Button>
                            <Button raised onClick={this.handleSubmitDialog}>
                                ADD/SAVE
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default DataSetSettings
