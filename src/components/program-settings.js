import React from 'react'

import { CircularProgress } from '@dhis2/d2-ui-core'
import api from '../utils/api'

import {
    Program,
    SpecificProgram,
    ProgramSettingsDefault,
    maxValues,
} from '../constants/program-settings'

import GlobalSpecificSettings from '../pages/global-specific-settings'
import { programQuery } from '../constants/queries'

const programData = Program
const specificProgramData = SpecificProgram
const {
    settingDownload,
    settingDBTrimming,
    teiDownload,
    teiDBTrimmming,
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
    eventPeriodDownload,
    eventPeriodDBTrimming,
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
        teiDBTrimmming: teiDBTrimmming,
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
        eventPeriodDownload: eventPeriodDownload,
        eventPeriodDBTrimming: eventPeriodDBTrimming,
        specificSetting: {
            openDialog: false,
        },
        specificSettingName: '',
        specificSettingDownload: '',
        specificSettingDBTrimming: '',
        specificTeiDownload: '',
        specificTeiDBTrimming: '',
        specificEnrollmentDownload: '',
        specificEnrollmentDBTrimming: '',
        specificEnrollmentDateDownload: '',
        specificEnrollmentDateDBTrimming: '',
        specificUpdateDownload: '',
        specificUpdateDBTrimming: '',
        specificTEReservedDownload: '',
        specificTEReservedDBTrimming: '',
        specificEventsDownload: '',
        specificEventsDBTrimming: '',
        specificEventPeriodDownload: '',
        specificEventPeriodDBTrimming: '',
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
                specificSettingDownload: argsData.specificSettingDownload,
                specificSettingDBTrimming: argsData.specificSettingDBTrimming,
                specificTeiDownload: argsData.specificTeiDownload,
                specificTeiDBTrimming: argsData.specificTeiDBTrimming,
                specificEnrollmentDownload: argsData.specificEnrollmentDownload,
                specificEnrollmentDBTrimming:
                    argsData.specificEnrollmentDBTrimming,
                specificEnrollmentDateDownload:
                    argsData.specificEnrollmentDateDownload,
                specificEnrollmentDateDBTrimming:
                    argsData.specificEnrollmentDateDBTrimming,
                specificUpdateDownload: argsData.specificUpdateDownload,
                specificUpdateDBTrimming: argsData.specificUpdateDBTrimming,
                specificTEReservedDownload: argsData.specificTEReservedDownload,
                specificTEReservedDBTrimming:
                    argsData.specificTEReservedDBTrimming,
                specificEventsDownload: argsData.specificEventsDownload,
                specificEventsDBTrimming: argsData.specificEventsDBTrimming,
                specificEventPeriodDownload:
                    argsData.specificEventPeriodDownload,
                specificEventPeriodDBTrimming:
                    argsData.specificEventPeriodDBTrimming,
                specificSettingName: argsData.id,
            })
            this.handleClickOpen()
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
            case 'teiDBTrimmming':
                e.target.value > maxValues.teiDBTrimmming
                    ? (e.target.value = maxValues.teiDBTrimmming)
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
            case 'specificTeiDownload':
                e.target.value > maxValues.specificTeiDownload
                    ? (e.target.value = maxValues.specificTeiDownload)
                    : (e.target.value = valueInput)
                break
            case 'specificTeiDBTrimming':
                e.target.value > maxValues.specificTeiDBTrimming
                    ? (e.target.value = maxValues.specificTeiDBTrimming)
                    : (e.target.value = valueInput)
                break
            case 'specificTEReservedDownload':
                e.target.value > maxValues.specificTEReservedDownload
                    ? (e.target.value = maxValues.specificTEReservedDownload)
                    : (e.target.value = valueInput)
                break
            case 'specificTEReservedDBTrimming':
                e.target.value > maxValues.specificTEReservedDBTrimming
                    ? (e.target.value = maxValues.specificTEReservedDBTrimming)
                    : (e.target.value = valueInput)
                break
            case 'specificEventsDownload':
                e.target.value > maxValues.specificEventsDownload
                    ? (e.target.value = maxValues.specificEventsDownload)
                    : (e.target.value = valueInput)
                break
            case 'specificEventsDBTrimming':
                e.target.value > maxValues.specificEventsDBTrimming
                    ? (e.target.value = maxValues.specificEventsDBTrimming)
                    : (e.target.value = valueInput)
                break
            default:
                break
        }
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        this.updateGlobal = false
    }

    saveDataApi = (settingType, data) => {
        if (this.keyName === 'program_settings') {
            if (Object.keys(this[settingType]).length) {
                data[settingType] = this[settingType]
            }

            api.updateValue(
                'ANDROID_SETTING_APP',
                'program_settings',
                data
            ).then(res => res)
        } else {
            api.getKeys('ANDROID_SETTING_APP').then(
                api
                    .createValue(
                        'ANDROID_SETTING_APP',
                        'program_settings',
                        data
                    )
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
            teiDBTrimmming: this.state.teiDBTrimmming,
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
            eventPeriodDownload: this.state.eventPeriodDownload,
            eventPeriodDBTrimming: this.state.eventPeriodDBTrimming,
        }

        this.globalSettings = globalSettings

        const programSettingData = {
            globalSettings: {
                ...this.globalSettings,
            },
        }

        this.saveDataApi('specificSettings', programSettingData)
    }

    handleClickOpen = () => {
        if (this.programNamesList.length > 0) {
            const programListComplete = this.programListComplete
            const programUsedlist = this.programNamesList

            const programNameFilter = programListComplete.filter(
                item => !programUsedlist.includes(item.id)
            )
            this.programList = programNameFilter
        }

        this.setState({
            specificSetting: {
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
            },
            specificSettingDownload: '',
            specificSettingDBTrimming: '',
            specificTeiDownload: '',
            specificTeiDBTrimming: '',
            specificEnrollmentDownload: '',
            specificEnrollmentDBTrimming: '',
            specificEnrollmentDateDownload: '',
            specificEnrollmentDateDBTrimming: '',
            specificUpdateDownload: '',
            specificUpdateDBTrimming: '',
            specificTEReservedDownload: '',
            specificTEReservedDBTrimming: '',
            specificEventsDownload: '',
            specificEventsDBTrimming: '',
            specificEventPeriodDownload: '',
            specificEventPeriodDBTrimming: '',
            specificSettingName: '',
        })

        this.updateGlobal = false
    }

    handleSubmitDialog = async e => {
        e.preventDefault()

        var specificProgramNameKey = this.state.specificSettingName
        var objData = this.specificSettings

        const programNameFilter = this.programListComplete.filter(
            option => option.id === specificProgramNameKey
        )

        objData[specificProgramNameKey] = {
            lastUpdated: new Date().toJSON(),
            name: programNameFilter[0].name,
            specificSettingDownload: this.state.specificSettingDownload,
            specificSettingDBTrimming: this.state.specificSettingDBTrimming,
            specificTeiDownload: this.state.specificTeiDownload,
            specificTeiDBTrimming: this.state.specificTeiDBTrimming,
            specificEnrollmentDownload: this.state.specificEnrollmentDownload,
            specificEnrollmentDBTrimming: this.state
                .specificEnrollmentDBTrimming, //specificEventDBTrimming,
            specificEnrollmentDateDownload: this.state
                .specificEnrollmentDateDownload,
            specificEnrollmentDateDBTrimming: this.state
                .specificEnrollmentDateDBTrimming,
            specificUpdateDownload: this.state.specificUpdateDownload,
            specificUpdateDBTrimming: this.state.specificUpdateDBTrimming, //updateDBTrimming,
            specificTEReservedDownload: this.state.specificTEReservedDownload,
            specificTEReservedDBTrimming: this.state
                .specificTEReservedDBTrimming,
            specificEventsDownload: this.state.specificEventsDownload,
            specificEventsDBTrimming: this.state.specificEventsDBTrimming,
            specificEventPeriodDownload: this.state.specificEventPeriodDownload,
            specificEventPeriodDBTrimming: this.state
                .specificEventPeriodDBTrimming,
        }

        const sumarySettings =
            (this.state.specificTeiDownload === undefined
                ? 0
                : this.state.specificTeiDownload) +
            ' TEI/ ' +
            (this.state.specificEventsDownload === undefined
                ? 0
                : this.state.specificEventsDownload) +
            ' events per OU, ' +
            (this.state.specificTEReservedDownload === undefined
                ? 0
                : this.state.specificTEReservedDownload) +
            ' reserved values'
        const newProgramRow = {
            name: programNameFilter[0].name,
            sumarySettings: sumarySettings,
            id: specificProgramNameKey,
            specificSettingDownload: this.state.specificSettingDownload,
            specificSettingDBTrimming: this.state.specificSettingDBTrimming,
            specificTeiDownload: this.state.specificTeiDownload,
            specificTeiDBTrimming: this.state.specificTeiDBTrimming,
            specificEnrollmentDownload: this.state.specificEnrollmentDownload,
            specificEnrollmentDBTrimming: this.state
                .specificEnrollmentDBTrimming, //specificEventDBTrimming,
            specificEnrollmentDateDownload: this.state
                .specificEnrollmentDateDownload,
            specificEnrollmentDateDBTrimming: this.state
                .specificEnrollmentDateDBTrimming,
            specificUpdateDownload: this.state.specificUpdateDownload,
            specificUpdateDBTrimming: this.state.specificUpdateDBTrimming, //updateDBTrimming,
            specificTEReservedDownload: this.state.specificTEReservedDownload,
            specificTEReservedDBTrimming: this.state
                .specificTEReservedDBTrimming,
            specificEventsDownload: this.state.specificEventsDownload,
            specificEventsDBTrimming: this.state.specificEventsDBTrimming,
            specificEventPeriodDownload: this.state.specificEventPeriodDownload,
            specificEventPeriodDBTrimming: this.state
                .specificEventPeriodDBTrimming,
        }

        this.specificSettings = objData

        const programData = {
            specificSettings: objData,
        }

        if (this.programToChange !== undefined) {
            let newRowList = []
            const rowList = this.specificSettingsRows
            newRowList = rowList.filter(row => row.id !== newProgramRow.id)
            newRowList.push(newProgramRow)
            this.specificSettingsRows = newRowList

            const nameList = this.programNamesList
            const newNameList = nameList.filter(
                name => name !== this.state.specificSettingName
            )

            this.programNamesList = newNameList
        } else {
            this.specificSettingsRows.push(newProgramRow)
        }

        this.programNamesList.push(this.state.specificSettingName)

        this.saveDataApi('globalSettings', programData)
        this.handleClose()
    }

    handleReset = e => {
        e.preventDefault()
        console.log('e reset', e)
        this.setState({
            settingDownload: settingDownload,
            settingDBTrimming: settingDBTrimming,
            teiDownload: teiDownload,
            teiDBTrimmming: teiDBTrimmming,
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
            eventPeriodDownload: eventPeriodDownload,
            eventPeriodDBTrimming: eventPeriodDBTrimming,
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
                    console.log('namespace android')
                    api.getKeys(this.nameSpace).then(res => {
                        const keyName = res.filter(
                            name => name === 'program_settings'
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
                                                    (program.specificTeiDownload ===
                                                    undefined
                                                        ? 0
                                                        : program.specificTeiDownload) +
                                                    ' TEI/ ' +
                                                    (program.specificEventsDownload ===
                                                    undefined
                                                        ? 0
                                                        : program.specificEventsDownload) +
                                                    ' events per OU, ' +
                                                    (program.specificTEReservedDownload ===
                                                    undefined
                                                        ? 0
                                                        : program.specificTEReservedDownload) +
                                                    ' reserved values'
                                                const newProgramRow = {
                                                    name: program.name,
                                                    sumarySettings: sumarySettings,
                                                    id: key,
                                                    specificSettingDownload:
                                                        program.specificSettingDownload,
                                                    specificSettingDBTrimming:
                                                        program.specificSettingDBTrimming,
                                                    specificTeiDownload:
                                                        program.specificTeiDownload,
                                                    specificTeiDBTrimming:
                                                        program.specificTeiDBTrimming,
                                                    specificEnrollmentDownload:
                                                        program.specificEnrollmentDownload,
                                                    specificEnrollmentDBTrimming:
                                                        program.specificEnrollmentDBTrimming, //specificEventDBTrimming,
                                                    specificEnrollmentDateDownload:
                                                        program.specificEnrollmentDateDownload,
                                                    specificEnrollmentDateDBTrimming:
                                                        program.specificEnrollmentDateDBTrimming,
                                                    specificUpdateDownload:
                                                        program.specificUpdateDownload,
                                                    specificUpdateDBTrimming:
                                                        program.specificUpdateDBTrimming, //updateDBTrimming,
                                                    specificTEReservedDownload:
                                                        program.specificTEReservedDownload,
                                                    specificTEReservedDBTrimming:
                                                        program.specificTEReservedDBTrimming,
                                                    specificEventsDownload:
                                                        program.specificEventsDownload,
                                                    specificEventsDBTrimming:
                                                        program.specificEventsDBTrimming,
                                                    specificEventPeriodDownload:
                                                        program.specificEventPeriodDownload,
                                                    specificEventPeriodDBTrimming:
                                                        program.specificEventPeriodDBTrimming,
                                                }
                                                console.log(newProgramRow)
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
                                teiDBTrimmming: teiDBTrimmming,
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
                                eventPeriodDownload: eventPeriodDownload,
                                eventPeriodDBTrimming: eventPeriodDBTrimming,
                            }

                            const data = {
                                globalSettings: {
                                    ...this.globalSettings,
                                },
                            }

                            this.saveDataApi('specificSettings', data)

                            this.nameSpace = 'ANDROID_SETTING_APP'
                            this.keyName = 'program_settings'

                            this.setState({
                                isUpdated: true,
                                loading: false,
                            })
                        }
                    })
                } else if (this.nameSpace === undefined) {
                    api.createNamespace(
                        'ANDROID_SETTING_APP',
                        'program_settings'
                    ).catch(e => console.log(e))
                }
            })
            .catch(e => {
                this.setState({
                    isUpdated: false,
                })
            })

        this.props.d2.models.program.list(programQuery).then(collection => {
            const programList = collection.toArray()
            this.programList = programList
            this.programListComplete = programList
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
            <GlobalSpecificSettings
                d2={this.props.d2}
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
            />
        )
    }
}

export default ProgramSettings
