export const getVisualizationsQuery = (query = '') => ({
    resource: `visualizations`,
    params: {
        query,
        pageSize: 20,
        fields: 'id,displayName,type,relativePeriods,rowDimensions,columnDimensions,userOrganisationUnit,userOrganisationUnitChildren,userOrganisationUnitGrandChildren',
        order: 'displayName:asc',
    },
})

export const getEventVisualizationsQuery = (query = '') => ({
    resource: `eventVisualizations`,
    params: {
        query,
        pageSize: 20,
        fields: 'id,displayName,type,rowDimensions,columnDimensions,userOrganisationUnit,userOrganisationUnitChildren,userOrganisationUnitGrandChildren',
        order: 'displayName:asc',
    },
})
