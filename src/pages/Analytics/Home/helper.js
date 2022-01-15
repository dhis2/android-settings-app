import findIndex from 'lodash/findIndex'
import flattenDeep from 'lodash/flattenDeep'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'
import { apiFetchVisualizations } from '../VisualizationQuery'
import { validateObjectByProperty } from '../../../utils/validators'

export const createInitialValues = initialValues => ({
    id: initialValues.id || '',
    visualization: initialValues.visualization || '',
    name: initialValues.name || '',
    group: initialValues.group || {
        name: '',
        id: '',
    },
})

export const invalidMandatoryFields = settings => {
    return !validateObjectByProperty(['visualization'], settings)
}

export const createVisualizationValues = (value, visualization) => ({
    id: value.visualization || value.id,
    name: value.name || '',
    visualizationName: value.visualizationName || visualization.name,
    timestamp: value.timestamp || new Date().toJSON(),
})

export const updateRows = (current, rows) => {
    const updateGroup = rows.slice()
    const index = findIndex(rows, { id: current.group.id })
    const homeGroup = rows[index]

    if (homeGroup) {
        updateGroup[index] = {
            ...homeGroup,
            visualizations: [
                ...homeGroup.visualizations,
                createVisualizationValues(current),
            ],
        }
    } else {
        updateGroup.push({
            id: current.group.id,
            name: current.group.name,
            visualizations: [createVisualizationValues(current)],
        })
    }

    return updateGroup
}

const createVisualization = value => ({
    id: value.visualization || value.id,
    name: value.name || '',
    timestamp: value.timestamp || new Date().toJSON(),
})

const createGroup = (group, visualizations) => ({
    id: group.id,
    name: group.name,
    visualizations: visualizations || group.visualizations,
})

export const getVisualizationIdList = datastore => {
    const visualizationList = []
    datastore.map(group => {
        visualizationList.push(map(group.visualizations, 'id'))
    })
    return flattenDeep(visualizationList)
}

export const updateVisualizationRows = (
    visualizations,
    dataEngine,
    handleRows
) => {
    const query = getVisualizationIdList(visualizations)
    apiFetchVisualizations(dataEngine, query).then(visualizationAPI =>
        handleRows(createRows(visualizations, visualizationAPI))
    )
}

const findVisualizationById = (apiVisualizationList, visualization) =>
    apiVisualizationList.find(v => v.id === visualization.id)

export const createRows = (datastore, apiVisualizationList) => {
    const result = []
    datastore.forEach(group => {
        let visualizations = []
        group.visualizations.forEach(vis => {
            const visualizationToAdd = !isEmpty(apiVisualizationList)
                ? createVisualizationValues(
                      vis,
                      findVisualizationById(apiVisualizationList, vis)
                  )
                : createVisualization(vis)
            visualizations.push(visualizationToAdd)
        })
        visualizations = uniqBy(visualizations, 'id')
        result.push(createGroup(group, visualizations))
    })
    return result
}
