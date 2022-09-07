import flattenDeep from 'lodash/flattenDeep'
import mapValues from 'lodash/mapValues'
import values from 'lodash/values'

export const createGroup = (group, visualizations) => ({
    id: group.id,
    name: group.name,
    visualizations: visualizations || group.visualizations,
})

export const createBasicVisualization = (
    visualization,
    visualizationFound
) => ({
    id: visualization.visualization || visualization.id,
    name: visualization.name || '',
    visualizationName:
        visualization.visualizationName || visualizationFound.name,
    timestamp: visualization.timestamp || new Date().toJSON(),
})

export const findVisualizationById = (apiVisualizationList, visualization) =>
    apiVisualizationList.find((v) => v.id === visualization.id)

export const getVisualizationIdList = (datastore) => {
    const visualizationList = []
    mapValues(datastore, (element) =>
        element.map((group) =>
            visualizationList.push(
                values(mapValues(group.visualizations, 'id'))
            )
        )
    )
    return flattenDeep(visualizationList)
}
