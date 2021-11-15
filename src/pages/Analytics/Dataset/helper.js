import mapValues from 'lodash/mapValues'

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

export const prepareRows = (visualizations, datasetList) => {
    const rows = {}
    mapValues(visualizations, (dataset, i) => {
        let groups = {}
        dataset.map(group => {
            const visual = []
            const foundDataset = datasetList.find(d => d.id === i)
            group.dataset = i
            group.datasetName = dataset.datasetName || foundDataset.name
            group.visualizations.map(visualization => {
                visual.push({
                    ...visualization,
                    timestamp: visualization.timestamp || new Date().toJSON(),
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
            })
        })
    })

    return {
        visualizationsByDatasets: rows,
        groupList: getGroupList(rows),
    }
}

export const createGroup = (group, visualizations) => ({
    id: group.id,
    name: group.name,
    visualizations: group.visualizations || visualizations,
})

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
