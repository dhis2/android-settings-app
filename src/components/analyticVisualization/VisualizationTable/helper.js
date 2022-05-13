import findIndex from 'lodash/findIndex'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import reject from 'lodash/reject'

export const removeElement = (elementList, elementId) =>
    omit(elementList, [elementId])

export const updateElement = (elementList, elementId, updatedElement) =>
    Object.assign({}, elementList, {
        [elementId]: updatedElement,
    })

export const updateGroup = (elementList, elementId, updatedElement) =>
    !isEmpty(updatedElement)
        ? updateElement(elementList, elementId, updatedElement)
        : removeElement(elementList, elementId)

const updateList = (groups, groupId, updatedList) => {
    const groupFound = groups.find(group => group.id === groupId)
    const index = findIndex(groups, { id: groupId })
    const updatedGroup = groups.slice()
    updatedGroup.splice(
        index,
        1,
        updateElement(groupFound, 'visualizations', updatedList)
    )

    return updatedGroup
}

export const removeElementList = (groups, groupId) =>
    groups.filter(group => group.id !== groupId)

export const updateGroupList = (groups, groupId, updatedElement) =>
    !isEmpty(updatedElement)
        ? updateList(groups, groupId, updatedElement)
        : removeElementList(groups, groupId)

export const findGroupIndex = (groupList, groupId) =>
    findIndex(groupList, { id: groupId })

export const updateVisualizationName = (groupList, groupId, visualization) => {
    const updatedGroup = Object.assign([], groupList)
    const index = findGroupIndex(groupList, groupId)
    const homeGroup = groupList[index]
    const visualizationList = reject(homeGroup.visualizations, {
        id: visualization.id,
    })
    visualizationList.push(visualization)

    updatedGroup[index] = {
        ...homeGroup,
        visualizations: visualizationList,
    }

    return updatedGroup
}

export const updateVisualizations = (currentGroup, rows, element) => {
    const { currentElement, elementType } = element
    const updatedGroups = Object.assign({}, rows)
    const groupList = Object.assign([], currentGroup)
    const elementIndex = findGroupIndex(currentGroup, currentElement.id)
    const typeId = currentElement[elementType]

    groupList.splice(elementIndex, 1, currentElement)

    updatedGroups[typeId] = {
        ...updatedGroups[typeId],
        groups: updateGroup(
            updatedGroups[typeId].groups,
            currentElement.group.id,
            groupList
        ),
    }

    return updatedGroups
}
