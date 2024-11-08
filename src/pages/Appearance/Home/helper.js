const filterSortingDefault = {
    filter: false,
    sort: false,
}

export const createInitialValues = (prevDetails) => ({
    date: prevDetails.date || filterSortingDefault,
    organisationUnit: prevDetails.organisationUnit || filterSortingDefault,
    syncStatus: prevDetails.syncStatus || filterSortingDefault,
    assignedToMe: prevDetails.assignedToMe || filterSortingDefault,
})
