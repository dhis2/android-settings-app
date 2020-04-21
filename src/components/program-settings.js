import React from 'react'

import { CircularLoader } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import api from '../utils/api'

import {
    ENROLLMENT_DOWNLOAD,
    GLOBAL,
    GlobalProgram,
    GlobalProgramSpecial,
    maxValues,
    PER_ORG_UNIT,
    ProgramSettingsDefault,
    ProgramTitles,
    SpecificProgram,
    SpecificSettingsDefault,
    WITH_REGISTRATION,
    WITHOUT_REGISTRATION,
} from '../constants/program-settings'
import { NAMESPACE, PROGRAM_SETTINGS } from '../constants/data-store'

import GlobalSpecificSettings from '../pages/global-specific-settings'
import { getInstance } from 'd2'

let programData = GlobalProgram
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
        this.specificSettingsRows = []
        this.programList = []
        this.programListComplete = []
        this.programToChange = undefined
        this.argsRow = undefined
        this.programName = undefined
    }

    state = {
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
        eventsDownload,
        eventsDBTrimming,
        eventDateDownload,
        eventDateDBTrimming,
        specificSetting: {
            ...SpecificSettingsDefault,
            openDialog: false,
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
            this.programToChange = args[0].name
            const argsData = args[0]
            const settings = this.populateObject('FULL_SPECIFIC', argsData)
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
            this.programName = args[0].name

            this.setState({
                deleteDialog: {
                    open: true,
                },
            })
        },
    }

    chooseSetting = (name, value) => {
        switch (name) {
            case 'teiDownload':
                value = Math.min(maxValues.teiDownload, parseInt(value))
                break
            case 'teiDBTrimming':
                value = Math.min(maxValues.teiDBTrimming, parseInt(value))
                break
            case 'eventsDownload':
                value = Math.min(maxValues.eventsDownload, parseInt(value))
                break
            case 'eventsDBTrimming':
                value = Math.min(maxValues.eventsDBTrimming, parseInt(value))
                break
            default:
                break
        }
        return value
    }

    /**
     * handle onChange for global settings
     * */
    handleChange = e => {
        if (e.name === ENROLLMENT_DOWNLOAD) {
            this.setState({
                ...this.state,
                disableSave: false,
                [e.name]: e.value,
            })
        } else {
            e.preventDefault()

            if (e.target.name === 'settingDownload') {
                if (
                    e.target.value === GLOBAL ||
                    e.target.value === PER_ORG_UNIT
                ) {
                    programData = GlobalProgramSpecial
                } else {
                    programData = GlobalProgram
                }
            }

            this.setState({
                ...this.state,
                disableSave: false,
                [e.target.name]: this.chooseSetting(
                    e.target.name,
                    e.target.value
                ),
            })
        }
    }

    /**
     * Updates data using Api
     * @param data (object data)
     */
    saveDataApi = data => {
        api.updateValue(NAMESPACE, PROGRAM_SETTINGS, data)
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

    /**
     * Updates global and specific settings only when click on save btn
     * */
    submitData = () => {
        let globalSettings

        if (
            this.state.settingDownload === GLOBAL ||
            this.state.settingDownload === PER_ORG_UNIT
        ) {
            const settings = this.populateObject('GLOBAL_SPECIAL', this.state)
            globalSettings = {
                ...settings,
                lastUpdated: new Date().toJSON(),
            }
        } else {
            const settings = this.populateObject('GLOBAL', this.state)
            globalSettings = {
                ...settings,
                lastUpdated: new Date().toJSON(),
            }
        }

        this.globalSettings = globalSettings

        const programSettingData = {
            globalSettings: {
                ...this.globalSettings,
            },
        }

        if (this.specificSettings) {
            programSettingData.specificSettings = {
                ...this.specificSettings,
            }
        }

        this.saveDataApi(programSettingData)
    }

    /**
     * get program list including current program with specific settings
     * */
    getItemList = () => {
        if (this.programNamesList.length > 0) {
            const programListComplete = this.programListComplete
            const programUsedIdList = this.programNamesList

            this.programList = programListComplete.filter(
                item => !programUsedIdList.includes(item.id)
            )
        }
    }

    /**
     * Updates global settings on Fly
     */
    handleClose = () => {
        this.programToChange = undefined
        const settings = this.populateObject(
            'FULL_SPECIFIC',
            SpecificSettingsDefault
        )

        this.setState({
            specificSetting: {
                ...settings,
                openDialog: false,
                name: '',
            },
        })
    }

    populateObject = (programType, settingsList) => {
        let object
        switch (programType) {
            case 'WITH_REGISTRATION':
                object = {
                    settingDownload: settingsList.settingDownload,
                    teiDownload: settingsList.teiDownload,
                    enrollmentDownload: settingsList.enrollmentDownload,
                    enrollmentDateDownload: settingsList.enrollmentDateDownload,
                    updateDownload: settingsList.updateDownload,
                }
                break
            case 'WITHOUT_REGISTRATION':
                object = {
                    settingDownload: settingsList.settingDownload,
                    eventsDownload: settingsList.eventsDownload,
                    eventDateDownload: settingsList.eventDateDownload,
                }
                break
            case 'GLOBAL':
                object = {
                    settingDownload: settingsList.settingDownload,
                    teiDownload: settingsList.teiDownload,
                    enrollmentDownload: settingsList.enrollmentDownload,
                    enrollmentDateDownload: settingsList.enrollmentDateDownload,
                    updateDownload: settingsList.updateDownload,
                    eventsDownload: settingsList.eventsDownload,
                    eventDateDownload: settingsList.eventDateDownload,
                }
                break
            case 'GLOBAL_SPECIAL':
                object = {
                    settingDownload: settingsList.settingDownload,
                    teiDownload: settingsList.teiDownload,
                    updateDownload: settingsList.updateDownload,
                    eventsDownload: settingsList.eventsDownload,
                    eventDateDownload: settingsList.eventDateDownload,
                }
                break
            case 'DEFAULT':
                object = {
                    settingDownload,
                    teiDownload,
                    enrollmentDownload,
                    enrollmentDateDownload,
                    updateDownload,
                    eventsDownload,
                    eventDateDownload,
                }
                break
            case 'FULL_SPECIFIC':
                object = {
                    settingDownload: settingsList.settingDownload,
                    teiDownload: settingsList.teiDownload,
                    enrollmentDownload: settingsList.enrollmentDownload,
                    enrollmentDateDownload: settingsList.enrollmentDateDownload,
                    updateDownload: settingsList.updateDownload,
                    eventsDownload: settingsList.eventsDownload,
                    eventDateDownload: settingsList.eventDateDownload,
                }
                break
            default:
                break
        }
        return object
    }

    /**
     * Saves specific settings
     * */
    handleSubmitDialog = () => {
        const specificProgramNameKey = this.state.specificSetting.name
        const objData = this.specificSettings

        const programNameFilter = this.programListComplete.filter(
            option => option.id === specificProgramNameKey
        )

        if (programNameFilter.length > 0) {
            let programObject
            let summarySettings
            if (programNameFilter[0].programType === WITH_REGISTRATION) {
                if (
                    this.state.specificSetting.settingDownload ||
                    this.state.specificSetting.teiDownload ||
                    this.state.specificSetting.enrollmentDownload ||
                    this.state.specificSetting.enrollmentDateDownload ||
                    this.state.specificSetting.updateDownload
                ) {
                    programObject = this.populateObject(
                        WITH_REGISTRATION,
                        this.state.specificSetting
                    )
                } else {
                    programObject = this.populateObject(
                        WITH_REGISTRATION,
                        SpecificSettingsDefault
                    )
                }

                summarySettings =
                    (this.state.specificSetting.teiDownload
                        ? this.state.specificSetting.teiDownload
                        : SpecificSettingsDefault.teiDownload) + ' TEI'
            } else if (
                programNameFilter[0].programType === WITHOUT_REGISTRATION
            ) {
                if (
                    this.state.specificSetting.settingDownload ||
                    this.state.specificSetting.eventsDownload ||
                    this.state.specificSetting.eventDateDownload
                ) {
                    programObject = this.populateObject(
                        WITHOUT_REGISTRATION,
                        this.state.specificSetting
                    )
                } else {
                    programObject = this.populateObject(
                        WITHOUT_REGISTRATION,
                        SpecificSettingsDefault
                    )
                }

                summarySettings =
                    (this.state.specificSetting.eventsDownload
                        ? this.state.specificSetting.eventsDownload
                        : SpecificSettingsDefault.eventsDownload) +
                    ' events per OU'
            }

            objData[specificProgramNameKey] = {
                ...programObject,
                id: specificProgramNameKey,
                lastUpdated: new Date().toJSON(),
                name: programNameFilter[0].name,
            }

            const newProgramRow = {
                ...objData[specificProgramNameKey],
                summarySettings,
            }

            this.specificSettings = objData

            if (this.programToChange !== undefined) {
                this.specificSettingsRows = this.specificSettingsRows.filter(
                    row => row.id !== newProgramRow.id
                )
                this.specificSettingsRows.push(newProgramRow)

                const nameList = this.programNamesList
                this.programNamesList = nameList.filter(
                    name => name !== this.state.specificSetting.name
                )
            } else {
                this.specificSettingsRows.push(newProgramRow)
            }

            this.programNamesList.push(this.state.specificSetting.name)
        }
        this.handleClose()
    }

    /**
     * Set to default values
     * Global settings: initial/default values
     * Specific settings: no specific settings
     */
    handleReset = () => {
        programData = GlobalProgramSpecial
        const settings = this.populateObject('DEFAULT')
        this.specificSettings = {}
        this.specificSettingsRows = []
        this.programNamesList = []
        this.setState({
            ...settings,
            disableSave: false,
        })
    }

    /**
     * After click on Delete Dialog will remove a specific settings
     * */
    handleCloseDelete = () => {
        const data = this.argsRow
        const oldList = this.specificSettings
        const rowList = this.specificSettingsRows
        const programNamesUsed = this.programNamesList

        this.programNamesList = programNamesUsed.filter(
            program => program !== data.id
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
            this.programName = undefined
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
        titleName: this.programName,
    }

    /**
     * Handle Specific settings Table Actions
     * @type {{columnsTitle: [*, *], handleActions: {edit: ProgramSettings.tableActions.edit, delete: ProgramSettings.tableActions.delete}}}
     */
    handleSpecificSetting = {
        handleActions: this.tableActions,
        columnsTitle: [i18n.t('Name'), i18n.t('Summary Settings')],
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
     * Methods to handle DataStore dialog
     * */
    handleSaveDataDialog = {
        open: () => {
            this.setState({
                saveDataDialog: {
                    open: true,
                },
                submitDataStore: {
                    success: false,
                    error: false,
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
            d2.models.program
                .list({
                    paging: false,
                    level: 1,
                    fields: 'id,name,programType',
                    filter: 'access.data.write:eq:true',
                })
                .then(collection => {
                    const programList = collection.toArray()
                    this.programList = programList
                    this.programListComplete = programList
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

                                                let filter = this.programListComplete.filter(
                                                    listItem =>
                                                        listItem.id ===
                                                        program.id
                                                )
                                                filter = filter[0]

                                                let summarySettings

                                                if (
                                                    filter.programType ===
                                                    WITH_REGISTRATION
                                                ) {
                                                    summarySettings =
                                                        (program.teiDownload
                                                            ? program.teiDownload
                                                            : SpecificSettingsDefault.teiDownload) +
                                                        ' TEI'
                                                } else {
                                                    summarySettings =
                                                        (program.eventsDownload
                                                            ? program.eventsDownload
                                                            : SpecificSettingsDefault.eventsDownload) +
                                                        ' events per OU'
                                                }

                                                const newProgramRow = {
                                                    ...program,
                                                    summarySettings,
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
                                        this.globalSettings =
                                            res.value.globalSettings

                                        if (
                                            this.globalSettings
                                                .settingDownload === GLOBAL ||
                                            this.globalSettings
                                                .settingDownload ===
                                                PER_ORG_UNIT
                                        ) {
                                            programData = GlobalProgramSpecial
                                        } else {
                                            programData = GlobalProgram
                                        }

                                        this.setState({
                                            ...res.value.globalSettings,
                                            loading: false,
                                        })
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
                programTableData={programData}
                states={this.state}
                handleTableChange={this.handleChange}
                specificSettings={this.programNamesList}
                specificSettingList={this.specificSettingsRows}
                dialogDeleteName={this.programName}
                handleSetDefaultValues={this.handleReset}
                specificSettingDataTitle={this.programToChange}
                specificSettingOptions={this.programList}
                specificSettingData={specificProgramData}
                completeListOptions={this.programListComplete}
                handleSaveDialog={this.handleSaveDataDialog}
                deleteDialog={this.handleDeleteDialog}
                specificSettingDialog={this.handleSpecificSettingDialog}
                specificSettingTable={this.handleSpecificSetting}
                settingType={ProgramTitles}
            />
        )
    }
}

export default ProgramSettings
