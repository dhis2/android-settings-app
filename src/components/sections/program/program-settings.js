import React from 'react'

import i18n from '@dhis2/d2-i18n'
import {
    DEFAULT,
    FULL_SPECIFIC,
    GLOBAL,
    GlobalProgram,
    GlobalProgramSpecial,
    PER_ORG_UNIT,
    PROGRAM,
    programSettingsDefault,
    ProgramTitles,
    SETTING_DOWNLOAD,
    SpecificProgram,
    specificSettingsDefault,
} from '../../../constants/program-settings'
import { PROGRAM_SETTINGS } from '../../../constants/data-store'
import GlobalSpecificSettings from '../../../pages/global-specific-settings'
import { getInstance } from 'd2'
import { parseValueByType } from '../../../modules/programs/parseValueBySettingType'
import { populateProgramObject } from '../../../modules/programs/populateProgramObject'
import { getItemFromList } from '../../../modules/getItemFromList'
import { prepareDataToSubmit } from '../../../modules/prepareDataToSubmit'
import { prepareSpecificSettingsToSave } from '../../../modules/prepareSpecificSettingToSave'
import { removeSettingFromList } from '../../../modules/removeSettingFromList'
import { apiLoadProgramSettings } from '../../../modules/programs/apiLoadSettings'
import { apiUpdateDataStore } from '../../../modules/apiUpdateDataStore'
import SectionWrapper from '../section-wrapper'

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
} = programSettingsDefault

class ProgramSettings extends React.Component {
    constructor(props) {
        super(props)

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
            ...specificSettingsDefault,
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
            message: undefined,
        },
        openErrorAlert: false,
        disableAll: false,
        programDefaultValues: GlobalProgram,
    }

    /**
     * Edit and Delete actions for specific settings table
     * @param args
     */
    tableActions = {
        edit: (...args) => {
            this.programToChange = args[0].name
            const argsData = args[0]
            const settings = populateProgramObject(FULL_SPECIFIC, argsData)
            this.setState({
                specificSetting: {
                    ...settings,
                    name: argsData.id,
                    openDialog: true,
                },
            })
            this.programList = getItemFromList(
                this.programNamesList,
                this.programListComplete,
                this.programList
            )
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

    /**
     * handle onChange for global settings
     * */
    handleChange = (e, key) => {
        const name = typeof key === 'string' ? key : e.name
        const value = typeof key === 'string' ? e.selected : e.value

        if (name === SETTING_DOWNLOAD) {
            if (value === GLOBAL || value === PER_ORG_UNIT) {
                this.setState({
                    ...this.state,
                    programDefaultValues: GlobalProgramSpecial,
                    disableSave: false,
                    [name]: parseValueByType(name, value),
                })
            } else {
                this.setState({
                    ...this.state,
                    programDefaultValues: GlobalProgram,
                    disableSave: false,
                    [name]: parseValueByType(name, value),
                })
            }
        } else {
            this.setState({
                ...this.state,
                disableSave: false,
                [name]: parseValueByType(name, value),
            })
        }
    }

    /**
     * Updates data using Api
     * @param data (object data)
     */
    saveDataApi = data => {
        apiUpdateDataStore(data, PROGRAM_SETTINGS)
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
     * Updates global settings on Fly
     */
    handleClose = () => {
        this.programToChange = undefined
        const settings = populateProgramObject(
            FULL_SPECIFIC,
            specificSettingsDefault
        )

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
     * Specific settings: no specific settings
     */
    handleReset = () => {
        const settings = populateProgramObject(DEFAULT)
        this.specificSettings = {}
        this.specificSettingsRows = []
        this.programNamesList = []
        this.programList = this.programListComplete

        this.setState({
            ...settings,
            programDefaultValues: GlobalProgramSpecial,
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
            this.programName = undefined
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
                nameList: this.programNamesList,
                optionList: this.programList,
                listComplete: this.programListComplete,
            })
            this.specificSettings = specificSettings
            this.specificSettingsRows = rowSettings
            this.programNamesList = nameList
            this.programList = optionList
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
            this.programList = getItemFromList(
                this.programNamesList,
                this.programListComplete,
                this.programList
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
                settingType: PROGRAM,
                states: this.state,
                specificSettings: this.specificSettings,
                specificSettingToChange: this.programToChange,
                specificSettingsRows: this.specificSettingsRows,
                specificSettingsNameList: this.programNamesList,
                settingsCompleteList: this.programListComplete,
            })
            this.specificSettings = specificSettings
            this.specificSettingsRows = specificSettingsRows
            this.programNamesList = specificSettingsNameList

            this.handleClose()
            this.setState({
                disableSave: false,
            })
        },
        onInputChange: (e, key) => {
            if (key === 'name') {
                const settings = populateProgramObject(
                    FULL_SPECIFIC,
                    specificSettingsDefault
                )
                this.setState({
                    ...this.state,
                    specificSetting: {
                        ...this.state.specificSetting,
                        ...settings,
                        [key]: parseValueByType(key, e.selected),
                    },
                })
            } else {
                const name = typeof key === 'string' ? key : e.name
                const value = typeof key === 'string' ? e.selected : e.value

                this.setState({
                    ...this.state,
                    specificSetting: {
                        ...this.state.specificSetting,
                        [name]: parseValueByType(name, value),
                    },
                })
            }
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
            const { globalSettings, settingsToSubmit } = prepareDataToSubmit({
                settingType: PROGRAM,
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
                return d2.models.program
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
            .then(() => {
                apiLoadProgramSettings({
                    specificSettings: this.specificSettings,
                    programNameList: this.programNamesList,
                    programListComplete: this.programListComplete,
                    specificSettingsRows: this.specificSettingsRows,
                    globalSettings: this.globalSettings,
                    globalDefaultValues: this.state.programDefaultValues,
                })
                    .then(res => {
                        const {
                            settings,
                            specificSettings,
                            programNameList,
                            programListComplete,
                            specificSettingsRows,
                            globalSettings,
                            globalDefaultValues,
                        } = res

                        this.specificSettings = specificSettings
                        this.programNamesList = programNameList
                        this.programListComplete = programListComplete
                        this.specificSettingsRows = specificSettingsRows
                        this.globalSettings = globalSettings

                        this.setState({
                            ...settings.globalSettings,
                            programDefaultValues: globalDefaultValues,
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
                    programTableData={this.state.programDefaultValues}
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
            </SectionWrapper>
        )
    }
}

export default ProgramSettings
