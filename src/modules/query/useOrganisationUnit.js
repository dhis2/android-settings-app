import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

const organisationUnitSearchQuery = {
    organisationUnits: {
        resource: 'organisationUnits',
        params: {
            fields: ['id', 'name'],
            filter: ({ orgUnit }) => `path:like:${orgUnit}`, //orgUnitSearch
        },
        paging: false,
    },
}

export const useOrganisationUnitSearch = ({ orgUnit }) => {
    const { loading, error, data } = useDataQuery(organisationUnitSearchQuery, {
        variables: {
            orgUnit: orgUnit,
        },
    })

    return { loading, error, orgUnits: data && data.organisationUnits }
}

const organisationUnitCaptureQuery = {
    organisationUnits: {
        resource: 'organisationUnits',
        params: {
            fields: [
                'id',
                'code',
                'name',
                'displayName',
                'created',
                'lastUpdated',
                'deleted',
                'shortName',
                'displayShortName',
                'description',
                'displayDescription',
                'path',
                'openingDate',
                'closedDate',
                'level',
                'parent[id]',
                'programs[id,name,publicAccess,userAccesses,userGroupAccesses,trackedEntityType[id],programTrackedEntityAttributes[trackedEntityAttribute[optionSet[id]]]]',
                'dataSets[id,categoryCombo[id,categories[id]],publicAccess,userAccesses,userGroupAccesses,indicators[id,indicatorType[id]],dataSetElements[dataElement[id]]]',
                'ancestors[id,displayName],organisationUnitGroups[id,code,name,displayName,created,lastUpdated,deleted,shortName,displayShortName]',
            ],
            filter: ({ orgUnit }) => `path:like:${orgUnit}`,
        },
        paging: false,
    },
}

export const useOrganisationUnitCapture = ({ orgUnit }) => {
    const { loading, error, data } = useDataQuery(
        organisationUnitCaptureQuery,
        {
            variables: {
                orgUnit: orgUnit,
            },
        }
    )

    return { loading, error, orgUnits: data && data.organisationUnits }
}
