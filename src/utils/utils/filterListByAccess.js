import filter from 'lodash/filter'

export const filterListByReadAccess = (list) =>
    filter(list, { access: { read: true } })

export const filterListByDataWriteAccess = (list) =>
    filter(list, { access: { data: { write: true } } })
