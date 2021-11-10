import findIndex from 'lodash/findIndex'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'

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
