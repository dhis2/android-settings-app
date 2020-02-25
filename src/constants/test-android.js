import i18n from '@dhis2/d2-i18n'

export const testAndroidConstants = [
    {
        value: 'tooltipOUCapture',
        tootip: 'organisationUnitCapture',
        maxValueState: 'maxValueOUCapture',
        min: 1,
        normal: 3,
        max: 5,
    },
    {
        value: 'tooltipOUSearch',
        tootip: 'organisationUnitSearch',
        maxValueState: 'maxValueOUSearch',
        min: 3,
        normal: 5,
        max: 7,
    },
    {
        value: 'tooltipDataSet',
        tootip: 'dataSet',
        maxValueState: 'maxValueDataSet',
        min: 5,
        normal: 7,
        max: 9,
    },
    {
        value: 'tooltipProgram',
        tootip: 'program',
        maxValueState: 'maxValueProgram',
        min: 7,
        normal: 9,
        max: 11,
    },
    {
        value: 'tooltipProgramRule',
        tootip: 'programRules',
        maxValueState: 'maxValueProgramRule',
        min: 9,
        normal: 11,
        max: 13,
    },
    {
        value: 'tooltipMetadata',
        tootip: 'metadata',
        maxValueState: 'maxValueMetadata',
        min: 11,
        normal: 13,
        max: 15,
    },
    {
        value: 'tooltipData',
        tootip: 'data',
        maxValueState: 'maxValueData',
        min: 13,
        normal: 15,
        max: 17,
    },
]

export const testAndroidDataConstants = [
    {
        title: i18n.t('Org Units capture'),
        description: i18n.t(
            'Number of org unit that are available for data capture'
        ),
        tooltipTitle: 'tooltipOUCapture',
        state: 'organisationUnitsNumber',
        maxValueState: 'maxValueOUCapture',
        load: 'orgUnitLoad',
    },
    {
        title: i18n.t('Org Units search'),
        description: i18n.t(
            'Number of org unit that are available for data capture'
        ),
        tooltipTitle: 'tooltipOUSearch',
        state: 'organisationUnitSearchNumber',
        maxValueState: 'maxValueOUSearch',
        load: 'orgUnitLoad',
    },
    {
        title: i18n.t('Data sets associated to OU capture of user'),
        description: i18n.t('Number of datasets associated to capture OUs'),
        tooltipTitle: 'tooltipDataSet',
        state: 'datasetNumber',
        maxValueState: 'maxValueDataSet',
        load: 'dataSetLoad',
    },
    {
        title: i18n.t('Program associated to OU'),
        description: i18n.t('Number of program associated to capture OUs'),
        tooltipTitle: 'tooltipProgram',
        state: 'programNumber',
        maxValueState: 'maxValueProgram',
        load: 'programLoad',
    },
    {
        title: i18n.t('Program rules associated to OU'),
        description: i18n.t('Number of program rules to download'),
        tooltipTitle: 'tooltipProgramRule',
        state: 'programRuleNumber',
        maxValueState: 'maxValueProgramRule',
        load: 'programRuleLoad',
    },
    {
        title: i18n.t('Metadata download size (KB)'),
        description: '',
        tooltipTitle: 'tooltipMetadata',
        state: 'metadataSize',
        maxValueState: 'maxValueMetadata',
        load: 'metadataLoad',
    },
    {
        title: i18n.t('Data download size (KB)'),
        description: '',
        tooltipTitle: 'tooltipData',
        state: 'dataSize',
        maxValueState: 'maxValueData',
        load: 'dataLoad',
    },
]
