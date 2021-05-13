import {
    programSettingsDefault,
    specificSettingsDefault,
    WITH_REGISTRATION,
} from '../../../constants/program-settings'

export const createInitialValues = prevGlobalDetails => ({
    settingDownload:
        prevGlobalDetails.settingDownload ||
        programSettingsDefault.settingDownload,
    teiDownload:
        prevGlobalDetails.teiDownload || programSettingsDefault.teiDownload,
    enrollmentDownload:
        prevGlobalDetails.enrollmentDownload ||
        programSettingsDefault.enrollmentDownload,
    enrollmentDateDownload:
        prevGlobalDetails.enrollmentDateDownload ||
        programSettingsDefault.enrollmentDateDownload,
    updateDownload:
        prevGlobalDetails.updateDownload ||
        programSettingsDefault.updateDownload,
    eventsDownload:
        prevGlobalDetails.eventsDownload ||
        programSettingsDefault.eventsDownload,
    eventDateDownload:
        prevGlobalDetails.eventDateDownload ||
        programSettingsDefault.eventDateDownload,
})

export const createInitialSpecificValues = prevDetails => ({
    name: '',
    settingDownload:
        prevDetails.settingDownload || specificSettingsDefault.settingDownload,
    teiDownload: prevDetails.teiDownload || specificSettingsDefault.teiDownload,
    enrollmentDownload:
        prevDetails.enrollmentDownload ||
        specificSettingsDefault.enrollmentDownload,
    enrollmentDateDownload:
        prevDetails.enrollmentDateDownload ||
        specificSettingsDefault.enrollmentDateDownload,
    updateDownload:
        prevDetails.updateDownload || specificSettingsDefault.updateDownload,
    eventsDownload:
        prevDetails.eventsDownload || specificSettingsDefault.eventsDownload,
    eventDateDownload:
        prevDetails.eventDateDownload ||
        specificSettingsDefault.eventDateDownload,
})

export const isProgramWithRegistration = (programList, specificProgram) => {
    const program = programList.find(
        programApi => programApi.id === specificProgram
    )
    return program.programType === WITH_REGISTRATION
}

export const prepareSpecificSettingsList = (
    programSettings,
    apiProgramList
) => {
    const specificSettingsRowList = []

    const programsId = []
    apiProgramList.map(program => programsId.push(program.id))

    for (const key in programSettings) {
        if (programsId.includes(key)) {
            const program = programSettings[key]
            const summarySettings = isProgramWithRegistration(
                apiProgramList,
                program.id
            )
                ? `${program.teiDownload} TEI`
                : `${program.eventsDownload} events per OU`

            const row = {
                ...program,
                summarySettings,
            }
            specificSettingsRowList.push(row)
        }
    }
    return specificSettingsRowList
}

export const removeSettingsFromList = (setting, settingList) => {
    return settingList.filter(program => program.id !== setting.id)
}

export const updateSettingsList = (settings, settingsList) => {
    const updatedList = settingsList.filter(
        program => program.id !== settings.id
    )
    updatedList.push(settings)
    return updatedList
}

export const findProgramNameById = (programList, specificProgram) => {
    const program = programList.find(
        program => program.id === specificProgram.id
    )
    return program.name
}

export const filterUnusedElements = (apiElementList, settingList) => {
    const list = []
    apiElementList.map(program => {
        if (!settingList.some(settings => settings.name === program.name)) {
            list.push(program)
        }
    })
    return list
}
