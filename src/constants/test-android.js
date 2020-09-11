import i18n from '@dhis2/d2-i18n'

export const testAndroidDataConstants = [
    {
        title: i18n.t('org units available for data capture'),
        description: i18n.t(
            'Number of org unit that are available for data capture'
        ),
        tooltipTitle: 'tooltipOUCapture',
        state: 'organisationUnitsNumber',
        maxValueState: 'maxValueOUCapture',
        load: 'orgUnitLoad',
        maxValue: 10,
    },
    {
        title: i18n.t('org units available for data search'),
        description: i18n.t(
            'Number of org unit that are available for data capture'
        ),
        tooltipTitle: 'tooltipOUSearch',
        state: 'organisationUnitSearchNumber',
        maxValueState: 'maxValueOUSearch',
        load: 'orgUnitLoad',
        maxValue: 5,
    },
    {
        title: i18n.t('data sets linked to capture org units'),
        description: i18n.t('Number of datasets associated to capture OUs'),
        tooltipTitle: 'tooltipDataSet',
        state: 'datasetNumber',
        maxValueState: 'maxValueDataSet',
        load: 'dataSetLoad',
        maxValue: 20,
    },
    {
        title: i18n.t('programs linked to org units'),
        description: i18n.t('Number of program associated to capture OUs'),
        tooltipTitle: 'tooltipProgram',
        state: 'programNumber',
        maxValueState: 'maxValueProgram',
        load: 'programLoad',
        maxValue: 20,
    },
    {
        title: i18n.t('program rules linked to org units'),
        description: i18n.t('Number of program rules to download'),
        tooltipTitle: 'tooltipProgramRule',
        state: 'programRuleNumber',
        maxValueState: 'maxValueProgramRule',
        load: 'programRuleLoad',
        maxValue: 50,
    },
    {
        title: i18n.t('reserved values per TEI'),
        description: i18n.t(
            'Number of reserved values downloaded per TEI attribute'
        ),
        tooltipTitle: 'tooltipReservedValue',
        state: 'reservedValueNumber',
        maxValueState: 'maxValueReservedValue',
        load: 'reservedValuesLoad',
        maxValue: 500,
    },
    {
        title: i18n.t('metadata download size (KB)'),
        description: '',
        tooltipTitle: 'tooltipMetadata',
        state: 'metadataSize',
        maxValueState: 'maxValueMetadata',
        load: 'metadataLoad',
        maxValue: 1000,
    },
    {
        title: i18n.t('data download size (KB)'),
        description: '',
        tooltipTitle: 'tooltipData',
        state: 'dataSize',
        maxValueState: 'maxValueData',
        load: 'dataLoad',
        maxValue: 2000,
    },
]
