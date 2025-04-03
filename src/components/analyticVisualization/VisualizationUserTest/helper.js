import find from 'lodash/find'
import intersectionBy from 'lodash/intersectionBy'
import isEmpty from 'lodash/isEmpty'
import values from 'lodash/values'

export const validateUserVisualization = (user, visualization) =>
    visualizationHasPublicAccess(visualization) ||
    userGroupHasAccess(visualization, user) ||
    userHasAccess(visualization, user)

/**
 * User has at least read access to a visualization
 * From 2.36 a new sharing property has been introduced in order to replace the old sharing properties: sharing.public
 * */
export const visualizationHasPublicAccess = (visualization) =>
    visualization?.sharing?.public?.startsWith('r') ||
    visualization?.publicAccess?.startsWith('r')

/**
 * Check if a user belongs to user Group that has access to a visualization
 * From 2.36 a new sharing property has been introduced in order to replace the old sharing properties: sharing.userGroups
 * */
export const userGroupHasAccess = (visualization, user) => {
    const groupAccess = !isEmpty(values(visualization?.sharing?.userGroups))
        ? values(visualization?.sharing?.userGroups)
        : visualization?.userGroupAccesses

    const groupIntersection = intersectionBy(user.userGroups, groupAccess, 'id')
    return !isEmpty(groupIntersection)
}

/**
 * Check if user has access to a visualization
 * From 2.36 a new sharing property has been introduced in order to replace the old sharing properties: sharing.users
 * */
export const userHasAccess = (visualization, user) => {
    const userAccess =
        visualization?.sharing?.users || visualization?.userAccesses
    return !isEmpty(find(userAccess, { id: user.id }))
}
