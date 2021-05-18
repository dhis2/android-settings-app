import { periodTypeConstants } from '../../../constants/data-set-settings'

export const prepareSpecificSettingsList = (
    datasetSettings,
    apiDatasetList
) => {
    const specificSettingsRowList = []

    const datasetId = []
    apiDatasetList.map(dataset => datasetId.push(dataset.id))

    for (const key in datasetSettings) {
        if (datasetId.includes(key)) {
            const periodType = getPeriodType(key, apiDatasetList).name
            const dataset = datasetSettings[key]
            const summarySettings = `${dataset.periodDSDownload} ${periodType} period`

            const row = {
                ...dataset,
                summarySettings,
            }
            specificSettingsRowList.push(row)
        }
    }
    return specificSettingsRowList
}

export const getPeriodType = (id, datasetList) =>
    datasetList.find(dataset => dataset.id === id).periodType

export const findDatasetName = (datasetList, specificProgram) => {
    const dataset = datasetList.find(
        dataset => dataset.id === specificProgram.id
    )
    return dataset.name
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

export const filterUnusedElements = (apiElementList, settingList) => {
    const list = []
    apiElementList.map(program => {
        if (!settingList.some(settings => settings.name === program.name)) {
            list.push(program)
        }
    })
    return list
}

export const getPeriodDefaultValueByType = periodType =>
    periodTypeConstants[periodType].default
