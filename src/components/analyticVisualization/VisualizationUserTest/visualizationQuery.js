import React, { useEffect, useRef } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import isEqual from 'lodash/isEqual'

const visualization = {
    visualizations: {
        resource: 'visualizations',
        id: ({ id }) => `${id}`,
        params: {
            fields: [
                'id',
                'name',
                'publicAccess',
                'userGroupAccesses',
                'userAccesses',
            ],
            paging: 'false',
        },
    },
}

/**
 * Query to get data set list
 * */

const usePrevious = value => {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

export const useReadVisualizationQuery = id => {
    const prevIds = usePrevious(id)
    const { called, loading, error, data, refetch } = useDataQuery(
        visualization,
        {
            lazy: true,
        }
    )

    useEffect(() => {
        if (!isEqual(id, prevIds)) {
            refetch({ id })
        }
    }, [id, prevIds])

    return {
        loading: !called || loading,
        error,
        data: data && data.visualizations,
    }
}
