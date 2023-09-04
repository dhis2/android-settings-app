export const appearanceDefault = {
    programConfiguration: {
        globalSettings: {
            completionSpinner: true,
            disableReferrals: false,
            collapsibleSections: true,
        },
        specificSettings: {},
    },
    completionSpinner: {
        globalSettings: {
            visible: true,
        },
        specificSettings: {},
    },
    filterSorting: {
        home: {
            assignedToMe: {
                filter: true,
                sort: true,
            },
            date: {
                filter: true,
                sort: true,
            },
            organisationUnit: {
                filter: true,
                sort: true,
            },
            syncStatus: {
                filter: true,
                sort: true,
            },
        },
        programSettings: {
            globalSettings: {
                assignedToMe: {
                    filter: true,
                    sort: true,
                },
                enrollmentDate: {
                    filter: true,
                    sort: true,
                },
                enrollmentStatus: {
                    filter: true,
                    sort: true,
                },
                eventDate: {
                    filter: true,
                    sort: true,
                },
                eventStatus: {
                    filter: true,
                    sort: true,
                },
                organisationUnit: {
                    filter: true,
                    sort: true,
                },
                syncStatus: {
                    filter: true,
                    sort: true,
                },
                followUp: {
                    filter: true,
                    sort: true,
                },
            },
            specificSettings: {},
        },
        dataSetSettings: {
            globalSettings: {
                organisationUnit: {
                    filter: true,
                    sort: true,
                },
                period: {
                    filter: true,
                    sort: true,
                },
                syncStatus: {
                    filter: true,
                    sort: true,
                },
            },
            specificSettings: {},
        },
    },
}

export const COMPLETION_SPINNER = 'completionSpinner'
export const DISABLE_REFERRALS = 'disableReferrals'
export const COLLAPSIBLE_SECTIONS = 'collapsibleSections'
