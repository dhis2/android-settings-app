import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

const usersQuery = {
    users: {
        resource: 'users',
        params: {
            fields: [
                'id',
                'name',
                'userCredentials',
                'userGroups',
                'organisationUnits',
                'teiSearchOrganisationUnits',
            ],
        },
        paging: false,
    },
}

const useUsers = () => {
    const { loading, error, data } = useDataQuery(usersQuery)

    return { loading, error, users: data && data.users.users }
}

export default useUsers
