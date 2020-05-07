import api from '../../utils/api'
import { NAMESPACE, PROGRAM_SETTINGS } from '../../constants/data-store'
import {
    GLOBAL,
    GlobalProgram,
    GlobalProgramSpecial,
    PER_ORG_UNIT,
    specificSettingsDefault,
    WITH_REGISTRATION,
} from '../../constants/program-settings'

export const apiLoadProgramSettings = async ({
    specificSettings,
    programNameList,
    programListComplete,
    specificSettingsRows,
    globalSettings,
    globalDefaultValues,
}) => {
    return api.getNamespaces().then(res => {
        if (res.includes(NAMESPACE)) {
            return api.getKeys(NAMESPACE).then(res => {
                if (res.includes(PROGRAM_SETTINGS)) {
                    return api
                        .getValue(NAMESPACE, PROGRAM_SETTINGS)
                        .then(res => {
                            if (res.value.specificSettings) {
                                specificSettings = res.value.specificSettings
                                programNameList = Object.keys(specificSettings)

                                for (const key in specificSettings) {
                                    if (specificSettings.hasOwnProperty(key)) {
                                        const program = specificSettings[key]

                                        let filter = programListComplete.filter(
                                            listItem =>
                                                listItem.id === program.id
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
                                                    : specificSettingsDefault.teiDownload) +
                                                ' TEI'
                                        } else {
                                            summarySettings =
                                                (program.eventsDownload
                                                    ? program.eventsDownload
                                                    : specificSettingsDefault.eventsDownload) +
                                                ' events per OU'
                                        }

                                        const newProgramRow = {
                                            ...program,
                                            summarySettings,
                                        }

                                        specificSettingsRows.push(newProgramRow)
                                    }
                                }
                            }

                            if (res.value.globalSettings) {
                                globalSettings = res.value.globalSettings

                                if (
                                    globalSettings.settingDownload === GLOBAL ||
                                    globalSettings.settingDownload ===
                                        PER_ORG_UNIT
                                ) {
                                    globalDefaultValues = GlobalProgramSpecial
                                } else {
                                    globalDefaultValues = GlobalProgram
                                }
                            }

                            return {
                                settings: res.value,
                                specificSettings,
                                programNameList,
                                programListComplete,
                                specificSettingsRows,
                                globalSettings,
                                globalDefaultValues,
                            }
                        })
                }
            })
        }
    })
}
