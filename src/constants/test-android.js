export const testAndroidConstants = {
    organisationUnitCapture: {
        min: 1,
        normal: 3,
        max: 5,
    },
    organisationUnitSearch: {
        min: 1,
        normal: 3,
        max: 5,
    },
    dataSet: {
        min: 1,
        normal: 3,
        max: 5,
    },
    program: {
        min: 1,
        normal: 3,
        max: 5,
    },
    programRules: {
        min: 1,
        normal: 3,
        max: 5,
    },
    metadata: {
        min: 1,
        normal: 3,
        max: 5,
    },
    data: {
        min: 1,
        normal: 3,
        max: 5,
    },
}

export const testAndroidDataConstants = [
    {
        title: 'Org Units capture',
        description: 'Number of org unit that are available for data capture',
        tooltipTitle: 'tooltipOUCapture',
        state: 'organisationUnitsNumber',
    },
    {
        title: 'Org Units search',
        description: 'Number of org unit that are available for data capture',
        tooltipTitle: 'tooltipOUSearch',
        state: 'organisationUnitSearchNumber',
    },
    {
        title: 'Data sets associated to OU capture of user',
        description: 'Number of datasets associated to capture OUs',
        tooltipTitle: 'tooltipDataSet',
        state: 'datasetNumber',
    },
    {
        title: 'Program associated to OU',
        description: 'Number of program associated to capture OUs',
        tooltipTitle: 'tooltipProgram',
        state: 'programNumber',
    },
    {
        title: 'Program rules associated to OU',
        description: 'Number of program rules to capture OUs',
        tooltipTitle: 'tooltipProgramRule',
        state: 'programRuleNumber',
    },
    {
        title: 'Metadata download size',
        description: '',
        tooltipTitle: 'tooltipMetadata',
        state: 'metadataSize',
    },
    {
        title: 'Data download size',
        description: '',
        tooltipTitle: 'tooltipData',
        state: 'dataSize',
    },
]
