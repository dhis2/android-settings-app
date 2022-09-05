export const getUserQuery = (query = '') => {
    return {
        resource: `users`,
        params: {
            query,
            fields: 'id,name,userGroups',
            order: 'name:asc',
        },
    }
}
