import React, { useEffect, useRef } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import isEqual from 'lodash/isEqual'

const query = {
    visualization: {
        resource: 'visualizations',
        params: ({ ids }) => ({
            fields: ['id', 'name', 'displayName'],
            filter: `id:in:[${ids}]`,
            paging: 'false',
        }),
    },
}

const usePrevious = value => {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

export const useVisualizations = ids => {
    const prevIds = usePrevious(ids)
    const { loading, error, data, refetch } = useDataQuery(query, {
        lazy: true,
    })

    useEffect(() => {
        if (!isEqual(ids, prevIds)) {
            refetch({ ids })
        }
    })

    return {
        loading,
        error,
        visualizations: data && data.visualization.visualizations,
    }
}
