import { getDatasets } from '../helper'

const orgUnitList = [
    {
        name: 'Adonkia CHP',
        id: 'Rp268JB6Ne4',
        dataSets: [
            {
                name: 'Project Management',
                id: 'Y8gAn9DfAGU',
                categoryCombo: {
                    id: 'bjDvmb4bfuf',
                    categories: [
                        {
                            id: 'GLevLNI9wkl',
                            categoryOptions: [{ id: 'xYerKDKCefk' }],
                        },
                    ],
                },
                dataSetElements: [{ dataElement: { id: 'seNDI6rguib' } }],
                indicators: [],
            },
            {
                name: 'Reproductive Health',
                id: 'QX4ZTUbOt3a',
                categoryCombo: {
                    id: 'bjDvmb4bfuf',
                    categories: [
                        {
                            id: 'GLevLNI9wkl',
                            categoryOptions: [{ id: 'xYerKDKCefk' }],
                        },
                    ],
                },
                dataSetElements: [
                    { dataElement: { id: 'h8vtacmZL5j' } },
                    { dataElement: { id: 'rbkr8PL0rwM' } },
                ],
                indicators: [
                    { id: 'gNAXtpqAqW2', indicatorType: { id: 'JkWynlWMjJR' } },
                    { id: 'po1QxztD1K1', indicatorType: { id: 'JkWynlWMjJR' } },
                    { id: 'aEtcFtcJjtZ', indicatorType: { id: 'JkWynlWMjJR' } },
                ],
            },
            {
                name: 'Facility Assessment',
                id: 'V8MHeZHIrcP',
                categoryCombo: {
                    id: 'bjDvmb4bfuf',
                    categories: [
                        {
                            id: 'GLevLNI9wkl',
                            categoryOptions: [{ id: 'xYerKDKCefk' }],
                        },
                    ],
                },
                dataSetElements: [
                    { dataElement: { id: 'a57FmdPj3Zl' } },
                    { dataElement: { id: 'uF1DLnZNlWe' } },
                ],
                indicators: [],
            },
            {
                name: 'TB Facility Reporting Form',
                id: 'SF8FDSqw30D',
                categoryCombo: {
                    id: 'bjDvmb4bfuf',
                    categories: [
                        {
                            id: 'GLevLNI9wkl',
                            categoryOptions: [{ id: 'xYerKDKCefk' }],
                        },
                    ],
                },
                dataSetElements: [
                    { dataElement: { id: 'PcdVnX3EthS' } },
                    { dataElement: { id: 'x4KonEdVrf4' } },
                ],
                indicators: [],
            },
        ],
    },
    {
        name: 'Ahamadyya Mission Cl',
        id: 'plnHVbJR6p4',
        dataSets: [
            {
                name: 'Project Management',
                id: 'Y8gAn9DfAGU',
                categoryCombo: {
                    id: 'bjDvmb4bfuf',
                    categories: [
                        {
                            id: 'GLevLNI9wkl',
                            categoryOptions: [{ id: 'xYerKDKCefk' }],
                        },
                    ],
                },
                dataSetElements: [{ dataElement: { id: 'seNDI6rguib' } }],
                indicators: [],
            },
            {
                name: 'Mortality < 5 years',
                id: 'pBOMPrpg1QX',
                categoryCombo: {
                    id: 'bjDvmb4bfuf',
                    categories: [
                        {
                            id: 'GLevLNI9wkl',
                            categoryOptions: [{ id: 'xYerKDKCefk' }],
                        },
                    ],
                },
                dataSetElements: [
                    { dataElement: { id: 'LjNlMTl9Nq9' } },
                    { dataElement: { id: 'hM4ya5T2AqX' } },
                ],
                indicators: [],
            },
            {
                name: 'PMTCT monthly summary',
                id: 'Rl58JxmKJo2',
                categoryCombo: {
                    id: 'bjDvmb4bfuf',
                    categories: [
                        {
                            id: 'GLevLNI9wkl',
                            categoryOptions: [{ id: 'xYerKDKCefk' }],
                        },
                    ],
                },
                dataSetElements: [
                    { dataElement: { id: 'OCU92ttHmic' } },
                    { dataElement: { id: 'WQqSx9H0RDf' } },
                ],
                indicators: [],
            },
        ],
    },
]

const expectedResult = {
    total: 6,
    idList: [
        'Y8gAn9DfAGU',
        'QX4ZTUbOt3a',
        'V8MHeZHIrcP',
        'SF8FDSqw30D',
        'pBOMPrpg1QX',
        'Rl58JxmKJo2',
    ],
    dataElement: [
        'seNDI6rguib',
        'h8vtacmZL5j',
        'rbkr8PL0rwM',
        'a57FmdPj3Zl',
        'uF1DLnZNlWe',
        'PcdVnX3EthS',
        'x4KonEdVrf4',
        'LjNlMTl9Nq9',
        'hM4ya5T2AqX',
        'OCU92ttHmic',
        'WQqSx9H0RDf',
    ],
    categoryCombo: ['bjDvmb4bfuf'],
    category: ['GLevLNI9wkl'],
    indicator: ['gNAXtpqAqW2', 'po1QxztD1K1', 'aEtcFtcJjtZ'],
}

test('From a list of org units you can get dataset properties like ids, data element, indicator, category and category combo', () => {
    expect(getDatasets(orgUnitList)).toMatchObject(expectedResult)
})
