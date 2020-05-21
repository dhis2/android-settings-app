import api from '../../utils/api'
import { DATASET_SETTINGS, NAMESPACE } from '../../constants/data-store'

export const apiLoadDatasetSettings = async ({
    specificSettings,
    datasetNameList,
    datasetListComplete,
    specificSettingsRows,
    globalSettings,
}) => {
    return api.getNamespaces().then(res => {
        if (res.includes(NAMESPACE)) {
            return api.getKeys(NAMESPACE).then(res => {
                if (res.includes(DATASET_SETTINGS)) {
                    return api
                        .getValue(NAMESPACE, DATASET_SETTINGS)
                        .then(res => {
                            if (res.value.specificSettings) {
                                specificSettings = res.value.specificSettings
                                datasetNameList = Object.keys(specificSettings)
                                for (const key in specificSettings) {
                                    if (specificSettings.hasOwnProperty(key)) {
                                        const dataSetNameFilter = datasetListComplete.filter(
                                            option => option.id === key
                                        )

                                        const dataSet = specificSettings[key]

                                        const summarySettings = `${dataSet.periodDSDownload} ${dataSetNameFilter[0].periodType} period`

                                        const newDataSetRow = {
                                            ...dataSet,
                                            summarySettings,
                                        }

                                        specificSettingsRows.push(newDataSetRow)
                                    }
                                }
                            }

                            if (res.value.globalSettings) {
                                globalSettings = res.value.globalSettings
                            }

                            return {
                                settings: res.value,
                                specificSettings,
                                datasetNameList,
                                datasetListComplete,
                                specificSettingsRows,
                                globalSettings,
                            }
                        })
                }
            })
        }
    })
}
