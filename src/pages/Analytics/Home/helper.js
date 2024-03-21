import findIndex from 'lodash/findIndex'
import flattenDeep from 'lodash/flattenDeep'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'
import { DATA_VISUALIZATION } from '../../../constants'
import { validateObjectByProperty } from '../../../utils/validators'
import {
    createBasicVisualization,
    createGroup,
    findVisualizationById,
} from '../helper'

export const createInitialValues = (initialValues) => ({
    id: initialValues.id || '',
    visualization: initialValues.visualization || '',
    name: initialValues.name || '',
    group: initialValues.group || {
        name: '',
        id: '',
    },
})

export const invalidMandatoryFields = (settings) => {
    return !validateObjectByProperty(['visualization'], settings)
}

export const updateRows = (current, rows) => {
    const updateGroup = rows.slice()
    const index = findIndex(rows, { id: current.group.id })
    const homeGroup = rows[index]

    if (homeGroup) {
        updateGroup[index] = {
            ...homeGroup,
            visualizations: [
                ...homeGroup.visualizations,
                createBasicVisualization(current),
            ],
        }
    } else {
        updateGroup.push({
            id: current.group.id,
            name: current.group.name,
            visualizations: [createBasicVisualization(current)],
        })
    }

    return updateGroup
}

const createVisualization = (value) => ({
    id: value.visualization || value.id,
    name: value.name || '',
    timestamp: value.timestamp || new Date().toJSON(),
    type: value.type || DATA_VISUALIZATION,
})

/**
 * Get visualization's ID
 * */

export const getVisualizationIdList = (datastore) => {
    const visualizationList = []
    datastore.map((group) => {
        visualizationList.push(map(group.visualizations, 'id'))
    })
    return flattenDeep(visualizationList)
}

/**
 * Prepare rows:
 * - rows of objects that will be saved in datastore
 * - rows of objects to show in table: verify if the android visualization has a title, in case it doesn't add the name that comes from the API
 * */

export const createRows = (datastore, apiVisualizationList) => {
    const result = []
    datastore.forEach((group) => {
        let visualizations = []
        group.visualizations.forEach((vis) => {
            if (!isEmpty(apiVisualizationList)) {
                const visualizationFound = findVisualizationById(
                    apiVisualizationList,
                    vis
                )
                if (visualizationFound) {
                    visualizations.push(
                        createBasicVisualization(vis, visualizationFound)
                    )
                }
            } else {
                visualizations.push(createVisualization(vis))
            }
        })
        visualizations = uniqBy(visualizations, 'id')
        result.push(createGroup(group, visualizations))
    })
    return result
}
