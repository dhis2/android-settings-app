import {
    dataSetSettingsDefault,
    periodTypeConstants,
} from '../../../constants/data-set-settings'

export const createInitialValues = prevDetails => ({
    periodDSDownload:
        prevDetails.periodDSDownload || dataSetSettingsDefault.periodDSDownload,
})

export const createInitialSpecificValues = (prevDetails, periodType) => ({
    name: '',
    periodDSDownload:
        prevDetails.periodDSDownload || getPeriodDefaultValueByType(periodType),
})

export const prepareSpecificSettingsList = (
    datasetSettings,
    apiDatasetList
) => {
    const specificSettingsRowList = []

    const datasetId = []
    apiDatasetList.map(dataset => datasetId.push(dataset.id))

    for (const key in datasetSettings) {
        if (datasetId.includes(key)) {
            const periodType =
                getPeriodType(key, apiDatasetList).name ||
                getPeriodType(key, apiDatasetList)
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
    return settingList.filter(element => element.id !== setting.id)
}

export const updateSettingsList = (settings, settingsList) => {
    const updatedList = settingsList.filter(
        element => element.id !== settings.id
    )
    updatedList.push(settings)
    return updatedList
}

export const filterUnusedElements = (apiElementList, settingList) => {
    const list = []
    apiElementList.map(element => {
        if (!settingList.some(settings => settings.name === element.name)) {
            list.push(element)
        }
    })
    return list
}

export const getPeriodDefaultValueByType = periodType =>
    periodTypeConstants[periodType].default
