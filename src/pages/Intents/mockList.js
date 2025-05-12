export const IntentsList = [
    {
        id: 'a-system-generated-11-characters-id-1',
        name: 'Face recognition 1',
        summarySettings: 'this is a description',
        trigger: {
            dataElements: [
                {
                    id: 'dataElementUid',
                },
            ],
        },
        action: ['DATA_ENTRY', 'SEARCH'],
        packageName: 'com.company.application.REGISTER',
        request: {
            arguments: {
                projectID: 'project one',
                serverUrl: 'https://server.org',
                location: 'V{orgunit_uid}',
            },
        },
        response: {
            data: {
                argument: 'registration',
                path: 'guid',
            },
        },
    },
    {
        id: 'a-system-generated-11-characters-id-2',
        name: 'Face recognition 2',
        summarySettings: 'this is a description',
        trigger: {
            attributes: [
                {
                    id: 'attributeUid',
                },
            ],
        },
        action: ['DATA_ENTRY', 'SEARCH'],
        packageName: 'com.company.application.REGISTER',
        request: {
            arguments: {
                projectID: 'project one',
                serverUrl: 'https://server.org',
                location: 'V{orgunit_uid}',
            },
        },
        response: {
            data: {
                argument: 'registration',
                path: 'guid',
            },
        },
    },
    {
        id: 'a-system-generated-11-characters-id-3',
        name: 'Face recognition 3',
        summarySettings: 'this is a description',
        trigger: {
            dataElements: [
                {
                    id: 'dataElementUid',
                },
            ],
        },
        action: ['DATA_ENTRY', 'SEARCH'],
        packageName: 'com.company.application.REGISTER',
        request: {
            arguments: {
                projectID: 'project one',
                serverUrl: 'https://server.org',
                location: 'V{orgunit_uid}',
            },
        },
        response: {
            data: {
                argument: 'registration',
                path: 'guid',
            },
        },
    },
]
