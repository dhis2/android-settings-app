import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

const infoQuery = {
    system: {
        resource: 'system/info',
    },
}

export const useApiVersion = () => {
    const { loading, error, data } = useDataQuery(infoQuery)
    let apiVersion = ''

    if (data) {
        apiVersion = data.system.version.replace(/[^0-9.]/g, '')
    }

    return {
        loading,
        error,
        apiVersion: data && apiVersion,
    }
}
