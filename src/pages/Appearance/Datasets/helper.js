const filterSortingDefault = {
    filter: true,
    sort: true,
}

export const createInitialValues = prevDetails => ({
    period: prevDetails.period || filterSortingDefault,
    organisationUnit: prevDetails.organisationUnit || filterSortingDefault,
    syncStatus: prevDetails.syncStatus || filterSortingDefault,
})
