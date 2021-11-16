import findIndex from 'lodash/findIndex'
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

export const createVisualizationValues = value => ({
    id: value.visualization || value.id,
    name: value.name || value.visualizationName,
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
