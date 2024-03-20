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

// columns[dimension,dimensionType,filter,programStage[id],optionSet[id],valueType,legendSet[id],repetition,items[dimensionItem~rename(id)]]
// check what fields for event visualization
// if type === dataVisualization use dataQuery
// if no type use dataQuery
// validation for each type of visualization
