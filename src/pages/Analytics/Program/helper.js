import mapValues from 'lodash/mapValues'
import { validateObjectByProperty } from '../../../utils/validators'

export const createInitialValues = initialValues => ({
    id: initialValues.id || '',
    program: initialValues.program || '',
    visualization: initialValues.visualization || '',
    name: initialValues.name || '',
    group: initialValues.group || {
        name: '',
        id: '',
    },
})

export const validMandatoryFields = settings => {
    return !validateObjectByProperty(['program', 'visualization'], settings)
}

export const createVisualizationValues = value => ({
    id: value.visualization || value.id,
    name: value.name || value.visualizationName,
    timestamp: value.timestamp || new Date().toJSON(),
    program: value.program,
    programName: value.programName,
    group: {
        id: value.group.id,
        name: value.group.name,
    },
})

export const getGroupList = visualizations => {
    const groupList = {}

    mapValues(visualizations, (program, i) => {
        const programGroup = []
        mapValues(program.groups, group => {
            programGroup.push({
                id: group[0].group.id,
                name: group[0].group.name,
                program: i,
                programName: program.programName,
            })
            groupList[i] = programGroup
        })
    })

    return groupList
}

export const prepareRows = (visualizations, programList) => {
    const rows = {}
    mapValues(visualizations, (program, i) => {
        let groups = {}
        program.map(group => {
            const visual = []
            const foundProgram = programList.find(p => p.id === i)
            group.program = i
            group.programName = program.programName || foundProgram.name
            group.visualizations.map(visualization => {
                visual.push({
                    ...visualization,
                    timestamp: visualization.timestamp || new Date().toJSON(),
                    program: i,
                    programName: program.programName || foundProgram.name,
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
                    programName: program.programName || foundProgram.name,
                    groups: { ...groups },
                }
            })
        })
    })

    return {
        visualizationsByPrograms: rows,
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

    mapValues(rows, (program, i) => {
        const groups = []
        mapValues(program.groups, group => {
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
    mapValues(dataStoreGroups, (program, i) => {
        const groups = []
        program.map(group => groups.push(createGroup(group)))
        result[i] = groups
    })

    return result
}

export const updateRows = (current, rows) => {
    const updatedRow = Object.assign({}, rows)
    const programFound = Object.keys(updatedRow).find(
        program => program === current.program
    )

    if (programFound) {
        const groupFound = Object.keys(updatedRow[programFound].groups).find(
            group => group === current.group.id
        )

        const updatedGroups = groupFound
            ? {
                  ...updatedRow[programFound].groups,
                  [groupFound]: [
                      ...updatedRow[programFound].groups[groupFound],
                      current,
                  ],
              }
            : {
                  ...updatedRow[programFound].groups,
                  [current.group.id]: [current],
              }

        updatedRow[programFound] = {
            ...updatedRow[programFound],
            groups: updatedGroups,
        }
    } else {
        updatedRow[current.program] = {
            programName: current.programName,
            groups: {
                [current.group.id]: [current],
            },
        }
    }

    return updatedRow
}
