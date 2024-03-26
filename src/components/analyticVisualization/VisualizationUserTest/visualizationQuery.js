import { useDataQuery } from '@dhis2/app-runtime'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useRef } from 'react'

const visualization = {
    visualization: {
        resource: 'visualizations',
        params: ({ id }) => ({
            fields: [
                'id',
                'name',
                'publicAccess',
                'userGroupAccesses',
                'userAccesses',
            ],
            filter: `id:eq:${id}`,
            paging: 'false',
        }),
    },
    eventVisualization: {
        resource: 'eventVisualizations',
        params: ({ id }) => ({
            fields: [
                'id',
                'name',
                'publicAccess',
                'userGroupAccesses',
                'userAccesses',
            ],
            filter: `id:eq:${id}`,
            paging: 'false',
        }),
    },
}

/**
 * Query to get data set list
 * */

const usePrevious = (value) => {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

export const useReadVisualizationQuery = (id) => {
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
        dataVisualization: data && data.visualization.visualizations[0],
        eventVisualization:
            data && data.eventVisualization.eventVisualizations[0],
    }
}
