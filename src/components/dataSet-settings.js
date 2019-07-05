import React from 'react'

import { Button } from '@dhis2/d2-ui-core'
import { CircularProgress } from '@dhis2/d2-ui-core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
//import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Table from '@dhis2/d2-ui-table'
import '@dhis2/d2-ui-core/build/css/Table.css'
import api from '../utils/api'

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

        props.d2.i18n.translations['data_set_name'] = 'Data Set Name'
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
        this.dataSetToChange = undefined
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
    }

    multipleCma = {
        edit: (...args) => {
            console.log('Edit', args, args[0], this.dataSetToChange)
            this.dataSetToChange = args[0].dataSetName
            const argsData = args[0]
            this.setState({
                specificPeriodDSDownload: argsData.specificPeriodDSDownload,
                specificPeriodDSDBTrimming: argsData.specificPeriodDSDBTrimming,
                specificDataSetName: argsData.dataSetId,
            })
            this.handleClickOpen()
            console.log(this.state)
        },
        delete(...args) {
            console.log('Delete', ...args)
        },
        remove: (...args) => {
            this.handleClickOpen()
            console.log('Remove', this, this.state, ...args)
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
        console.log({
            [e.target.name]: e.target.value,
        })
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
            if (Object.keys(this.specificSettings).length) {
                dataSetData.specificSettings = this.specificSettings
                console.log(dataSetData)
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
        this.setState({
            specificDataSet: {
                openDialog: true,
            },
        })

        this.updateGlobal = false
        console.log({
            action: 'open',
            state: this.state,
        })
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
        console.log({
            action: 'close',
            state: this.state,
        })
    }

    handleSubmitDialog = async e => {
        e.preventDefault()

        var specificProgramNameKey = this.state.specificDataSetName
        var objData = {
            ...this.specificSettings,
        }

        const dataSetNameFilter = this.dataSetList.filter(
            option => option.id === specificProgramNameKey
        )

        console.log(dataSetNameFilter[0])

        objData[specificProgramNameKey] = {
            date: new Date().toJSON(),
            dataSetName: dataSetNameFilter[0].name,
            specificPeriodDSDownload: this.state.specificPeriodDSDownload,
            specificPeriodDSDBTrimming: this.state.specificPeriodDSDBTrimming,
        }

        const dataSetData = {
            specificSettings: objData,
        }

        const sumarySettings =
            this.state.specificPeriodDSDownload === undefined
                ? 0
                : this.state.specificPeriodDSDownload
        const newDataSetRow = {
            dataSetName: dataSetNameFilter[0].name,
            sumarySettings: sumarySettings,
            specificPeriodDSDownload: this.state.specificPeriodDSDownload,
            specificPeriodDSDBTrimming: this.state.specificPeriodDSDBTrimming,
            dataSetId: specificProgramNameKey,
        }

        this.specificSettings = dataSetData
        this.dataSetNamesList.push(this.state.specificDataSetName)
        this.specificSettingsRows.push(newDataSetRow)
        console.log(dataSetData)

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
                                                    dataSetName:
                                                        dataSet.dataSetName,
                                                    sumarySettings: sumarySettings,
                                                    specificPeriodDSDownload:
                                                        dataSet.specificPeriodDSDownload,
                                                    specificPeriodDSDBTrimming:
                                                        dataSet.specificPeriodDSDBTrimming,
                                                    dataSetId: key,
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

        this.props.d2.models.program
            .list({
                paging: false,
                level: 1,
                fields: 'id,name',
                filter: 'access.data.write:eq:true',
            })
            .then(collection => {
                const programList = collection.toArray()
                console.log('program list', programList)
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
                        {' '}
                        Data Sets global settings{' '}
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
                        {' '}
                        Data Sets specific settings{' '}
                    </p>
                    <p className="main-content__title main-content__subtitle">
                        Data Set settings listed below overwrite the global
                        settings above
                    </p>

                    {this.dataSetNamesList.length > 0 && (
                        <div className="data__top-margin">
                            <Table
                                {...this.state}
                                columns={['dataSetName', 'sumarySettings']}
                                rows={this.specificSettingsRows}
                                contextMenuActions={this.multipleCma}
                            />
                        </div>
                    )}

                    <Button raised onClick={this.handleClickOpen}>
                        ADD
                    </Button>

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
                                <p className="main-content__title main-content__title__main">
                                    {' '}
                                    {this.dataSetToChange}{' '}
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

/*     < TextField
autoFocus
margin = "dense"
id = "specificDataSetName"
label = "Data Set"
type = "text"
name = "specificDataSetName"
onChange = { this.handleChangeDialog }
    /> */
