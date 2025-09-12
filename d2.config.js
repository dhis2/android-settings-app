const config = {
    title: 'Android Settings',
    description:
        'Configure synchronization parameters for the DHIS2 Android App, customize appearance, add TEI Analytics items.',
    type: 'app',
    entryPoints: {
        app: './src/App',
    },
    shortcuts: [
        {
            name: 'Android settings',
            url: '#/general-settings'
        },
        {
            name: 'Android sync settings',
            url: '#/sync/global-settings'
        },
        {
            name: 'Android appearance settings',
            url: '#/appearance/home-screen'
        },
        {
            name: 'Android analytics configuration',
            url: '#/analytics/TEI'
        }
    ]
}

module.exports = config
