import mapValues from 'lodash/mapValues'
import { validateObjectByProperty } from '../../../utils/validators'
import { apiFetchVisualizations } from '../VisualizationQuery'
import {
    createBasicVisualization,
    createGroup,
    findVisualizationById,
    getVisualizationIdList,
} from '../helper'

export const createInitialValues = initialValues => ({
    id: initialValues.id || '',
    dataset: initialValues.dataset || '',
    visualization: initialValues.visualization || '',
    name: initialValues.name || '',
    group: initialValues.group || {
        name: '',
        id: '',
    },
})

export const invalidMandatoryFields = settings => {
    return !validateObjectByProperty(['dataset', 'visualization'], settings)
}

export const createVisualizationValues = value => ({
    id: value.visualization || value.id,
    name: value.name || '',
    visualizationName: value.visualizationName || value.name,
    timestamp: value.timestamp || new Date().toJSON(),
    dataset: value.dataset,
    datasetName: value.datasetName,
    group: {
        id: value.group.id,
        name: value.group.name,
    },
})

export const updateRows = (current, rows) => {
    const datasetRow = rows[current.dataset]

    if (datasetRow) {
        const group = datasetRow.groups[current.group.id]
        const updatedGroups = {
            ...datasetRow.groups,
            [current.group.id]: group ? [...group, current] : [current],
        }
        return {
            ...rows,
            [current.dataset]: {
                ...datasetRow,
                groups: updatedGroups,
            },
        }
    }

    return {
        ...rows,
        [current.dataset]: {
            datasetName: current.datasetName,
            groups: {
                [current.group.id]: [current],
            },
        },
    }
}

export const getGroupList = visualizations => {
    const groupList = {}

    mapValues(visualizations, (dataset, i) => {
        const datasetGroup = []
        mapValues(dataset.groups, group => {
            datasetGroup.push({
                id: group[0].group.id,
                name: group[0].group.name,
                dataset: i,
                datasetName: dataset.datasetName,
            })
            groupList[i] = datasetGroup
        })
    })

    return groupList
}

export const updateVisualizationRow = (
    visualizations,
    datasetList,
    dataEngine
) => {
    const idList = getVisualizationIdList(visualizations)
    return apiFetchVisualizations(dataEngine, idList).then(visualizationAPI =>
        prepareRows(visualizations, datasetList, visualizationAPI)
    )
}

/**
 * Verify if the visualization has a title, if not add the API name
 * Only save visualization that can be found using the API
 * */

export const prepareRows = (visualizations, datasetList, visualizationAPI) => {
    const rows = {}
    mapValues(visualizations, (dataset, i) => {
        let groups = {}
        dataset.map(group => {
            const visual = []
            const foundDataset = datasetList.find(d => d.id === i)
            group.dataset = i
            group.datasetName = dataset.datasetName || foundDataset.name
            group.visualizations.map(visualization => {
                const visualizationFound = findVisualizationById(
                    visualizationAPI,
                    visualization
                )
                if (visualizationFound) {
                    visual.push({
                        ...createBasicVisualization(
                            visualization,
                            visualizationFound
                        ),
                        timestamp:
                            visualization.timestamp || new Date().toJSON(),
                        dataset: i,
                        datasetName: dataset.datasetName || foundDataset.name,
                        group: {
                            id: group.id,
                            name: group.name,
                        },
                    })
                    groups = {
                        ...groups,
                        [group.id]: visual,
                    }
                    rows[i] = {
                        datasetName: dataset.datasetName || foundDataset.name,
                        groups: { ...groups },
                    }
                }
            })
        })
    })

    return {
        visualizationsByDatasets: rows,
        groupList: getGroupList(rows),
    }
}

export const rowsToDataStore = rows => {
    const updatedRows = {}

    mapValues(rows, (dataset, i) => {
        const groups = []
        mapValues(dataset.groups, group => {
            const visualizations = []
            let groupUpdated = {}
            group.map(visualization => {
                visualizations.push({
                    id: visualization.id,
                    name: visualization.name,
                    timestamp: visualization.timestamp,
                })
                groupUpdated = createGroup(visualization.group, visualizations)
            })
            groups.push(groupUpdated)
            updatedRows[i] = groups
        })
    })
    return updatedRows
}

export const createDataStoreGroupRows = datastore => {
    const dataStoreGroups = Object.assign({}, datastore)
    const result = {}
    mapValues(dataStoreGroups, (dataset, i) => {
        const groups = []
        dataset.map(group => groups.push(createGroup(group)))
        result[i] = groups
    })

    return result
}
