import React from 'react'

import { CircularLoader } from '@dhis2/ui-core'
import api from '../utils/api'

import {
    Program,
    SpecificProgram,
    ProgramSettingsDefault,
    maxValues,
} from '../constants/program-settings'
import { NAMESPACE, PROGRAM_SETTINGS } from '../constants/data-store'

import GlobalSpecificSettings from '../pages/global-specific-settings'
import { getInstance } from 'd2'

const programData = Program
const specificProgramData = SpecificProgram
const {
    settingDownload,
    settingDBTrimming,
    teiDownload,
    teiDBTrimming,
    enrollmentDownload,
    enrollmentDBTrimming,
    enrollmentDateDownload,
    enrollmentDateDBTrimming,
    updateDownload,
    updateDBTrimming,
    teReservedDownload,
    teReservedDBTrimming,
    eventsDownload,
    eventsDBTrimming,
    eventDateDownload,
    eventDateDBTrimming,
} = ProgramSettingsDefault

class ProgramSettings extends React.Component {
    constructor(props) {
        super(props)

        this.nameSpace = undefined
        this.keyName = undefined
        this.programNamesList = []
        this.globalSettings = {}
        this.specificSettings = {}
        this.updateGlobal = false
        this.specificSettingsRows = []
        this.programList = []
        this.programListComplete = []
        this.programToChange = undefined
        this.argsRow = undefined
        this.programName = undefined
    }

    state = {
        settingDownload: settingDownload,
        settingDBTrimming: settingDBTrimming,
        teiDownload: teiDownload,
        teiDBTrimming: teiDBTrimming,
        enrollmentDownload: enrollmentDownload,
        enrollmentDBTrimming: enrollmentDBTrimming,
        enrollmentDateDownload: enrollmentDateDownload,
        enrollmentDateDBTrimming: enrollmentDateDBTrimming,
        updateDownload: updateDownload,
        updateDBTrimming: updateDBTrimming,
        teReservedDownload: teReservedDownload,
        teReservedDBTrimming: teReservedDBTrimming,
        eventsDownload: eventsDownload,
        eventsDBTrimming: eventsDBTrimming,
        eventDateDownload: eventDateDownload,
        eventDateDBTrimming: eventDateDBTrimming,
        specificSetting: {
            openDialog: false,
            name: '',
            settingDownload: '',
            settingDBTrimming: '',
            teiDownload: '',
            teiDBTrimming: '',
            enrollmentDownload: '',
            enrollmentDBTrimming: '',
            enrollmentDateDownload: '',
            enrollmentDateDBTrimming: '',
            updateDownload: '',
            updateDBTrimming: '',
            teReservedDownload: '',
            teReservedDBTrimming: '',
            eventsDownload: '',
            eventsDBTrimming: '',
            eventDateDownload: '',
            eventDateDBTrimming: '',
        },
        loading: true,
        isUpdated: false,
        deleteDialog: {
            open: false,
        },
    }

    tableActions = {
        edit: (...args) => {
            this.programToChange = args[0].name
            const argsData = args[0]
            this.setState({
                specificSetting: {
                    settingDownload: argsData.settingDownload,
                    settingDBTrimming: argsData.settingDBTrimming,
                    teiDownload: argsData.teiDownload,
                    teiDBTrimming: argsData.teiDBTrimming,
                    enrollmentDownload: argsData.enrollmentDownload,
                    enrollmentDBTrimming: argsData.enrollmentDBTrimming,
                    enrollmentDateDownload: argsData.enrollmentDateDownload,
                    enrollmentDateDBTrimming: argsData.enrollmentDateDBTrimming,
                    updateDownload: argsData.updateDownload,
                    updateDBTrimming: argsData.updateDBTrimming,
                    teReservedDownload: argsData.teReservedDownload,
                    teReservedDBTrimming: argsData.teReservedDBTrimming,
                    eventsDownload: argsData.eventsDownload,
                    eventsDBTrimming: argsData.eventsDBTrimming,
                    eventDateDownload: argsData.eventDateDownload,
                    eventDateDBTrimming: argsData.eventDateDBTrimming,
                    name: argsData.id,
                    openDialog: true,
                },
            })
            this.getItemList()
            this.updateGlobal = false
        },
        delete: (...args) => {
            this.argsRow = args[0]
            this.programName = args[0].name

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
        const valueInput = e.target.value
        switch (e.target.name) {
            case 'teiDownload':
                e.target.value > maxValues.teiDownload
                    ? (e.target.value = maxValues.teiDownload)
                    : (e.target.value = valueInput)
                break
            case 'teiDBTrimming':
                e.target.value > maxValues.teiDBTrimming
                    ? (e.target.value = maxValues.teiDBTrimming)
                    : (e.target.value = valueInput)
                break
            case 'teReservedDownload':
                e.target.value > maxValues.teReservedDownload
                    ? (e.target.value = maxValues.teReservedDownload)
                    : (e.target.value = valueInput)
                break
            case 'teReservedDBTrimming':
                e.target.value > maxValues.teReservedDBTrimming
                    ? (e.target.value = maxValues.teReservedDBTrimming)
                    : (e.target.value = valueInput)
                break
            case 'eventsDownload':
                e.target.value > maxValues.eventsDownload
                    ? (e.target.value = maxValues.eventsDownload)
                    : (e.target.value = valueInput)
                break
            case 'eventsDBTrimming':
                e.target.value > maxValues.eventsDBTrimming
                    ? (e.target.value = maxValues.eventsDBTrimming)
                    : (e.target.value = valueInput)
                break
            default:
                break
        }

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        this.updateGlobal = true
    }

    handleChangeDialog = e => {
        e.preventDefault()
        const valueInput = e.target.value
        switch (e.target.name) {
            case 'teiDownload':
                e.target.value > maxValues.teiDownload
                    ? (e.target.value = maxValues.teiDownload)
                    : (e.target.value = valueInput)
                break
            case 'teiDBTrimming':
                e.target.value > maxValues.teiDBTrimming
                    ? (e.target.value = maxValues.teiDBTrimming)
                    : (e.target.value = valueInput)
                break
            case 'teReservedDownload':
                e.target.value > maxValues.teReservedDownload
                    ? (e.target.value = maxValues.teReservedDownload)
                    : (e.target.value = valueInput)
                break
            case 'teReservedDBTrimming':
                e.target.value > maxValues.teReservedDBTrimming
                    ? (e.target.value = maxValues.teReservedDBTrimming)
                    : (e.target.value = valueInput)
                break
            case 'eventsDownload':
                e.target.value > maxValues.eventsDownload
                    ? (e.target.value = maxValues.eventsDownload)
                    : (e.target.value = valueInput)
                break
            case 'eventsDBTrimming':
                e.target.value > maxValues.eventsDBTrimming
                    ? (e.target.value = maxValues.eventsDBTrimming)
                    : (e.target.value = valueInput)
                break
            default:
                break
        }

        this.setState({
            ...this.state,
            specificSetting: {
                ...this.state.specificSetting,
                [e.target.name]: e.target.value,
            },
        })
        this.updateGlobal = false
    }

    saveDataApi = (settingType, data) => {
        if (this.keyName === PROGRAM_SETTINGS) {
            if (Object.keys(this[settingType]).length) {
                data[settingType] = this[settingType]
            }

            api.updateValue(NAMESPACE, PROGRAM_SETTINGS, data).then(res => res)
        } else {
            api.getKeys(NAMESPACE).then(
                api
                    .createValue(NAMESPACE, PROGRAM_SETTINGS, data)
                    .then(data => data)
            )
        }
    }

    submitData = () => {
        if (!this.updateGlobal) {
            return true
        }
        const globalSettings = {
            lastUpdated: new Date().toJSON(),
            settingDownload: this.state.settingDownload,
            settingDBTrimming: this.state.settingDBTrimming,
            teiDownload: this.state.teiDownload,
            teiDBTrimming: this.state.teiDBTrimming,
            enrollmentDownload: this.state.enrollmentDownload,
            enrollmentDBTrimming: this.state.enrollmentDBTrimming,
            enrollmentDateDownload: this.state.enrollmentDateDownload,
            enrollmentDateDBTrimming: this.state.enrollmentDateDBTrimming,
            updateDownload: this.state.updateDownload,
            updateDBTrimming: this.state.updateDBTrimming,
            teReservedDownload: this.state.teReservedDownload,
            teReservedDBTrimming: this.state.teReservedDBTrimming,
            eventsDownload: this.state.eventsDownload,
            eventsDBTrimming: this.state.eventsDBTrimming,
            eventDateDownload: this.state.eventDateDownload,
            eventDateDBTrimming: this.state.eventDateDBTrimming,
        }

        this.globalSettings = globalSettings

        const programSettingData = {
            globalSettings: {
                ...this.globalSettings,
            },
        }

        this.saveDataApi('specificSettings', programSettingData)
    }

    getItemList = () => {
        if (this.programNamesList.length > 0) {
            const programListComplete = this.programListComplete
            const programUsedlist = this.programNamesList

            const programNameFilter = programListComplete.filter(
                item => !programUsedlist.includes(item.id)
            )
            this.programList = programNameFilter
        }
    }

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
        this.programToChange = undefined

        this.setState({
            specificSetting: {
                openDialog: false,
                settingDownload: '',
                settingDBTrimming: '',
                teiDownload: '',
                teiDBTrimming: '',
                enrollmentDownload: '',
                enrollmentDBTrimming: '',
                enrollmentDateDownload: '',
                enrollmentDateDBTrimming: '',
                updateDownload: '',
                updateDBTrimming: '',
                teReservedDownload: '',
                teReservedDBTrimming: '',
                eventsDownload: '',
                eventsDBTrimming: '',
                eventDateDownload: '',
                eventDateDBTrimming: '',
                name: '',
            },
        })

        this.updateGlobal = false
    }

    handleSubmitDialog = async () => {
        var specificProgramNameKey = this.state.specificSetting.name
        var objData = this.specificSettings

        const programNameFilter = this.programListComplete.filter(
            option => option.id === specificProgramNameKey
        )

        if (programNameFilter.length > 0) {
            objData[specificProgramNameKey] = {
                id: specificProgramNameKey,
                lastUpdated: new Date().toJSON(),
                name: programNameFilter[0].name,
                settingDownload: this.state.specificSetting.settingDownload,
                settingDBTrimming: this.state.specificSetting.settingDBTrimming,
                teiDownload: this.state.specificSetting.teiDownload,
                teiDBTrimming: this.state.specificSetting.teiDBTrimming,
                enrollmentDownload: this.state.specificSetting
                    .enrollmentDownload,
                enrollmentDBTrimming: this.state.specificSetting
                    .enrollmentDBTrimming,
                enrollmentDateDownload: this.state.specificSetting
                    .enrollmentDateDownload,
                enrollmentDateDBTrimming: this.state.specificSetting
                    .enrollmentDateDBTrimming,
                updateDownload: this.state.specificSetting.updateDownload,
                updateDBTrimming: this.state.specificSetting.updateDBTrimming,
                teReservedDownload: this.state.specificSetting
                    .teReservedDownload,
                teReservedDBTrimming: this.state.specificSetting
                    .teReservedDBTrimming,
                eventsDownload: this.state.specificSetting.eventsDownload,
                eventsDBTrimming: this.state.specificSetting.eventsDBTrimming,
                eventDateDownload: this.state.specificSetting.eventDateDownload,
                eventDateDBTrimming: this.state.specificSetting
                    .eventDateDBTrimming,
            }

            const sumarySettings =
                (this.state.specificSetting.teiDownload === undefined
                    ? 0
                    : this.state.specificSetting.teiDownload) +
                ' TEI/ ' +
                (this.state.specificSetting.eventsDownload === undefined
                    ? 0
                    : this.state.specificSetting.eventsDownload) +
                ' events per OU, ' +
                (this.state.specificSetting.teReservedDownload === undefined
                    ? 0
                    : this.state.specificSetting.teReservedDownload) +
                ' reserved values'
            const newProgramRow = {
                name: programNameFilter[0].name,
                sumarySettings: sumarySettings,
                id: specificProgramNameKey,
                settingDownload: this.state.specificSetting.settingDownload,
                settingDBTrimming: this.state.specificSetting.settingDBTrimming,
                teiDownload: this.state.specificSetting.teiDownload,
                teiDBTrimming: this.state.specificSetting.teiDBTrimming,
                enrollmentDownload: this.state.specificSetting
                    .enrollmentDownload,
                enrollmentDBTrimming: this.state.specificSetting
                    .enrollmentDBTrimming,
                enrollmentDateDownload: this.state.specificSetting
                    .enrollmentDateDownload,
                enrollmentDateDBTrimming: this.state.specificSetting
                    .enrollmentDateDBTrimming,
                updateDownload: this.state.specificSetting.updateDownload,
                updateDBTrimming: this.state.specificSetting.updateDBTrimming,
                teReservedDownload: this.state.specificSetting
                    .teReservedDownload,
                teReservedDBTrimming: this.state.specificSetting
                    .teReservedDBTrimming,
                eventsDownload: this.state.specificSetting.eventsDownload,
                eventsDBTrimming: this.state.specificSetting.eventsDBTrimming,
                eventDateDownload: this.state.specificSetting.eventDateDownload,
                eventDateDBTrimming: this.state.specificSetting
                    .eventDateDBTrimming,
            }

            this.specificSettings = objData

            const programData = {
                specificSettings: objData,
            }

            if (this.programToChange !== undefined) {
                this.specificSettingsRows = this.specificSettingsRows.filter(
                    row => row.id !== newProgramRow.id
                )
                this.specificSettingsRows.push(newProgramRow)

                const nameList = this.programNamesList
                const newNameList = nameList.filter(
                    name => name !== this.state.specificSetting.name
                )

                this.programNamesList = newNameList
            } else {
                this.specificSettingsRows.push(newProgramRow)
            }

            this.programNamesList.push(this.state.specificSetting.name)

            this.saveDataApi('globalSettings', programData)
        }
        this.handleClose()
    }

    handleReset = () => {
        this.setState({
            settingDownload: settingDownload,
            settingDBTrimming: settingDBTrimming,
            teiDownload: teiDownload,
            teiDBTrimming: teiDBTrimming,
            enrollmentDownload: enrollmentDownload,
            enrollmentDBTrimming: enrollmentDBTrimming,
            enrollmentDateDownload: enrollmentDateDownload,
            enrollmentDateDBTrimming: enrollmentDateDBTrimming,
            updateDownload: updateDownload,
            updateDBTrimming: updateDBTrimming,
            teReservedDownload: teReservedDownload,
            teReservedDBTrimming: teReservedDBTrimming,
            eventsDownload: eventsDownload,
            eventsDBTrimming: eventsDBTrimming,
            eventDateDownload: eventDateDownload,
            eventDateDBTrimming: eventDateDBTrimming,
        })

        this.updateGlobal = true
    }

    handleCloseDelete = () => {
        const data = this.argsRow
        const oldList = this.specificSettings
        const rowList = this.specificSettingsRows
        const programNamesUsed = this.programNamesList

        const programListNew = programNamesUsed.filter(
            program => program !== data.id
        )
        this.programNamesList = programListNew

        const newList = {}
        let newRowList = []

        for (const key in oldList) {
            if (key !== data.id) {
                const program = this.specificSettings[key]
                newList[key] = program
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
        this.programName = undefined
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
                            name => name === PROGRAM_SETTINGS
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
                                        this.programNamesList = Object.keys(
                                            this.specificSettings
                                        )

                                        for (const key in this
                                            .specificSettings) {
                                            if (
                                                this.specificSettings.hasOwnProperty(
                                                    key
                                                )
                                            ) {
                                                const program = this
                                                    .specificSettings[key]
                                                const sumarySettings =
                                                    (program.teiDownload ===
                                                    undefined
                                                        ? 0
                                                        : program.teiDownload) +
                                                    ' TEI/ ' +
                                                    (program.eventsDownload ===
                                                    undefined
                                                        ? 0
                                                        : program.eventsDownload) +
                                                    ' events per OU, ' +
                                                    (program.teReservedDownload ===
                                                    undefined
                                                        ? 0
                                                        : program.teReservedDownload) +
                                                    ' reserved values'
                                                const newProgramRow = {
                                                    name: program.name,
                                                    sumarySettings: sumarySettings,
                                                    id: key,
                                                    settingDownload:
                                                        program.settingDownload,
                                                    settingDBTrimming:
                                                        program.settingDBTrimming,
                                                    teiDownload:
                                                        program.teiDownload,
                                                    teiDBTrimming:
                                                        program.teiDBTrimming,
                                                    enrollmentDownload:
                                                        program.enrollmentDownload,
                                                    enrollmentDBTrimming:
                                                        program.enrollmentDBTrimming,
                                                    enrollmentDateDownload:
                                                        program.enrollmentDateDownload,
                                                    enrollmentDateDBTrimming:
                                                        program.enrollmentDateDBTrimming,
                                                    updateDownload:
                                                        program.updateDownload,
                                                    updateDBTrimming:
                                                        program.updateDBTrimming,
                                                    teReservedDownload:
                                                        program.teReservedDownload,
                                                    teReservedDBTrimming:
                                                        program.teReservedDBTrimming,
                                                    eventsDownload:
                                                        program.eventsDownload,
                                                    eventsDBTrimming:
                                                        program.eventsDBTrimming,
                                                    eventDateDownload:
                                                        program.eventDateDownload,
                                                    eventDateDBTrimming:
                                                        program.eventDateDBTrimming,
                                                }
                                                this.specificSettingsRows.push(
                                                    newProgramRow
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
                                settingDownload: settingDownload,
                                settingDBTrimming: settingDBTrimming,
                                teiDownload: teiDownload,
                                teiDBTrimming: teiDBTrimming,
                                enrollmentDownload: enrollmentDownload,
                                enrollmentDBTrimming: enrollmentDBTrimming,
                                enrollmentDateDownload: enrollmentDateDownload,
                                enrollmentDateDBTrimming: enrollmentDateDBTrimming,
                                updateDownload: updateDownload,
                                updateDBTrimming: updateDBTrimming,
                                teReservedDownload: teReservedDownload,
                                teReservedDBTrimming: teReservedDBTrimming,
                                eventsDownload: eventsDownload,
                                eventsDBTrimming: eventsDBTrimming,
                                eventDateDownload: eventDateDownload,
                                eventDateDBTrimming: eventDateDBTrimming,
                            }

                            const data = {
                                globalSettings: {
                                    ...this.globalSettings,
                                },
                            }

                            this.saveDataApi('specificSettings', data)

                            this.nameSpace = NAMESPACE
                            this.keyName = PROGRAM_SETTINGS

                            this.setState({
                                isUpdated: true,
                                loading: false,
                            })
                        }
                    })
                } else if (this.nameSpace === undefined) {
                    api.createNamespace(NAMESPACE, PROGRAM_SETTINGS).catch(e =>
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
            d2.models.program
                .list({
                    paging: false,
                    level: 1,
                    fields: 'id,name',
                    filter: 'access.data.write:eq:true',
                })
                .then(collection => {
                    const programList = collection.toArray()
                    this.programList = programList
                    this.programListComplete = programList
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
                tableNameProperty="Program Name"
                componentSubtitleSingular="Program"
                componentSubtitlePlural="Programs"
                programTableData={programData}
                states={this.state}
                handleTableChange={this.handleChange}
                specificSettings={this.programNamesList}
                specificSettingList={this.specificSettingsRows}
                programTableActions={this.tableActions}
                addSpecificSetting={this.handleClickOpen}
                deleteDialogDelete={this.handleCloseDelete}
                closeDialogDelete={this.handleCancelDialog}
                typeNameDialogDelete="program"
                dialogDeleteName={this.programName}
                handleResetGlobalSettings={this.handleReset}
                specificSettingDialogClose={this.handleClose}
                specificSettingDataTitle={this.programToChange}
                specificSettingOptions={this.programList}
                specificSettingHandleChange={this.handleChangeDialog}
                specificSettingData={specificProgramData}
                specificSettingHandleSubmit={this.handleSubmitDialog}
                specificSetting={this.state.specificSetting}
            />
        )
    }
}

export default ProgramSettings
