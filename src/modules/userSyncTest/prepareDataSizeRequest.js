import { checkSettingType } from './checkSettingType'
import { getDataPerProgramSettingType } from './dataPerProgramType'
import { addSettingsId } from './addSettingsId'

export const prepareDataSizeRequest = ({
    props,
    orgUnitCompleteList,
    orgUnitParent,
    programList,
    globalSettings,
    specificSettings,
}) => {
    const dataSizeRequest = []
    const settingTypeArray = []
    const organisationUnitIDLists = {
        orgUnit: orgUnitCompleteList,
        orgUnitParents: orgUnitParent,
    }
    let temporalType = undefined
    let _temporalObject = {}
    const _tempPromises = []

    temporalType = checkSettingType(globalSettings.settingDownload)
    _temporalObject = {
        type: temporalType,
        sizeTEI: globalSettings.teiDownload,
        sizeEvent: globalSettings.eventsDownload,
    }

    settingTypeArray.push(_temporalObject)

    if (specificSettings !== undefined) {
        _temporalObject = {}
        temporalType = undefined
        const _temporalSettingsArray = Object.entries(specificSettings)
        const _specificSettingArray = []
        _temporalSettingsArray.forEach(array => {
            const tempt = addSettingsId(array)
            _specificSettingArray.push(tempt)
        })

        _specificSettingArray.forEach(specificSetting => {
            temporalType = checkSettingType(specificSetting.settingDownload)
            _temporalObject = {
                id: specificSetting.id,
                type: temporalType,
                sizeTEI: specificSetting.teiDownload || 0,
                sizeEvent: specificSetting.eventsDownload || 0,
            }
            settingTypeArray.push(_temporalObject)
        })
    }

    // should check every program (program associated to OU)
    settingTypeArray.forEach(settingType => {
        const _tempSettingType = getDataPerProgramSettingType({
            props,
            settingType,
            orgUnitList: organisationUnitIDLists,
            programList,
        })
        _tempPromises.push(_tempSettingType)
    })

    _tempPromises.forEach(promise => {
        promise.forEach(prom => {
            dataSizeRequest.push(prom)
        })
    })

    return dataSizeRequest
}
