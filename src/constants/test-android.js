export const testAndroidConstants = [
    {
        value: 'tooltipOUCapture',
        tootip: 'organisationUnitCapture',
        min: 1,
        normal: 3,
        max: 5,
    },
    {
        value: 'tooltipOUSearch',
        tootip: 'organisationUnitSearch',
        min: 3,
        normal: 5,
        max: 7,
    },
    {
        value: 'tooltipDataSet',
        tootip: 'dataSet',
        min: 5,
        normal: 7,
        max: 9,
    },
    {
        value: 'tooltipProgram',
        tootip: 'program',
        min: 7,
        normal: 9,
        max: 11,
    },
    {
        value: 'tooltipProgramRule',
        tootip: 'programRules',
        min: 9,
        normal: 11,
        max: 13,
    },
    {
        value: 'tooltipMetadata',
        tootip: 'metadata',
        min: 11,
        normal: 13,
        max: 15,
    },
    {
        value: 'tooltipData',
        tootip: 'data',
        min: 13,
        normal: 15,
        max: 17,
    },
]

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
