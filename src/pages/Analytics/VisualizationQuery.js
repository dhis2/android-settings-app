const visualizationQuery = query => ({
    resource: 'visualizations',
    params: {
        fields: 'id,name,displayName',
        filter: `id:in:[${query}]`,
        paging: false,
    },
})

export const apiFetchVisualizations = async (dataEngine, visualization) => {
    try {
        const visualizationData = await dataEngine.query({
            visualization: visualizationQuery(visualization),
        })
        return visualizationData.visualization.visualizations
    } catch (error) {
        console.log('Error: ', error)
    }
}
