import {getPrograms} from "../helper";

const organisationUnitList =
    [
        {
            "name":"Adonkia CHP",
            "programs":[
                {"name":"Information Campaign", "id":"q04UBOqq3rp", "programTrackedEntityAttributes":[]},
                {
                    "name":"Malaria focus investigation",
                    "trackedEntityType":{"id":"We9I19a3vO1"},
                    "id":"M3xtLkYBlKI",
                    "programTrackedEntityAttributes":[
                        {"id":"GyLuqD7bb68", "trackedEntityAttribute":{"id":"coaSpbzZiTB"}},
                        {"id":"DWWOqGHSCS8", "trackedEntityAttribute":{"optionSet":{"id":"NxVachTgbj0"}, "id":"TgSJNUL2cqd"}},
                        {"id":"ZxCo2arDZ8o", "trackedEntityAttribute":{"optionSet":{"id":"oBWhZmavxQY"},"id":"KrCahWFMYYz"}},
                        {"id":"TLp2KXqWJ2T", "trackedEntityAttribute":{"id":"qDQUHqdAXkT"}}
                    ]
                },
                {
                    "name":"Child Programme",
                    "trackedEntityType":{"id":"nEenWmSyUEp"},
                    "id":"IpHINAT79UW",
                    "programTrackedEntityAttributes":[
                        {"id":"l2T72XzBCLd", "trackedEntityAttribute":{"id":"w75KJ2mc4zz"}},
                        {"id":"pWEEfUJUjej", "trackedEntityAttribute":{"optionSet":{"id":"pC3N9N77UmT"}, "id":"cejWyOfXge6"}},
                        {"id":"ALw63dHrw1n", "trackedEntityAttribute":{"id":"lZGmxYbs97q"}}
                    ]
                },
                {
                    "name":"TB program",
                    "trackedEntityType":{"id":"nEenWmSyUEp"},
                    "id":"ur1Edk5Oe2n",
                    "programTrackedEntityAttributes":[
                        {"id":"dbzpQYr5G2g", "trackedEntityAttribute":{"id":"w75KJ2mc4zz"}},
                        {"id":"aQQTyeGoWm4", "trackedEntityAttribute":{"id":"zDhUuAYrxNC"}},
                        {"id":"lxo3ITSkcpt", "trackedEntityAttribute":{"optionSet":{"id":"pC3N9N77UmT"}, "id":"cejWyOfXge6"}},
                    ]
                },
            ],
            "id":"Rp268JB6Ne4"
        },
        {
            "name":"Afro Arab Clinic",
            "programs":[
                {
                    "name":"Malaria focus investigation",
                    "trackedEntityType":{"id":"We9I19a3vO1"},
                    "id":"M3xtLkYBlKI",
                    "programTrackedEntityAttributes":[
                        {"id":"DWWOqGHSCS8", "trackedEntityAttribute":{"optionSet":{"id":"NxVachTgbj0"}, "id":"TgSJNUL2cqd"}},
                        {"id":"ZxCo2arDZ8o", "trackedEntityAttribute":{"optionSet":{"id":"oBWhZmavxQY"}, "id":"KrCahWFMYYz"}},
                        {"id":"TLp2KXqWJ2T", "trackedEntityAttribute":{"id":"qDQUHqdAXkT"}}
                    ]
                },
                {
                    "name":"MNCH / PNC (Adult Woman)",
                    "trackedEntityType":{"id":"nEenWmSyUEp"},
                    "id":"uy2gU8kT1jF",
                    "programTrackedEntityAttributes":[
                        {"id":"CgwB73TbuLC","trackedEntityAttribute":{"id":"w75KJ2mc4zz"}},
                        {"id":"hLznDk07IWe","trackedEntityAttribute":{"id":"lw1SqmMlnfh"}}
                    ]
                },
                {
                    "name":"Malaria testing and surveillance","id":"bMcwwoVnbSR",
                    "programTrackedEntityAttributes":[]
                },
                {
                    "name":"WHO RMNCH Tracker",
                    "trackedEntityType":{"id":"nEenWmSyUEp"},
                    "id":"WSGAb5XwJ3Y",
                    "programTrackedEntityAttributes":[
                        {"id":"TkzhnIQGFdV","trackedEntityAttribute":{"id":"gHGyrwKPzej"}},
                        {"id":"ItIljP9pyO2", "trackedEntityAttribute":{"optionSet":{"id":"xjA5E9MimMU"}, "id":"ciq2USN94oJ"}}
                    ]
                }
            ],
            "id":"cDw53Ej8rju"
        },
        {"name":"Baoma Oil Mill CHC",
            "programs":[
                {
                    "name":"WHO RMNCH Tracker",
                    "trackedEntityType":{"id":"nEenWmSyUEp"},
                    "id":"WSGAb5XwJ3Y",
                    "programTrackedEntityAttributes":[
                        {"id":"TkzhnIQGFdV","trackedEntityAttribute":{"id":"gHGyrwKPzej"}},
                        {"id":"ItIljP9pyO2","trackedEntityAttribute":{"optionSet":{"id":"xjA5E9MimMU"},"id":"ciq2USN94oJ"}}
                    ]
                }
            ],"id":"Y8foq27WLti"
        }
    ]

const desiredResult = {
    total: 7,
    idList: ['q04UBOqq3rp', 'M3xtLkYBlKI', 'IpHINAT79UW', 'ur1Edk5Oe2n', 'uy2gU8kT1jF', 'bMcwwoVnbSR', 'WSGAb5XwJ3Y'],
    trackedEntityType: [ 'We9I19a3vO1', 'nEenWmSyUEp' ],
    trackedEntityAttribute: [
        'GyLuqD7bb68',
        'DWWOqGHSCS8',
        'ZxCo2arDZ8o',
        'TLp2KXqWJ2T',
        'l2T72XzBCLd',
        'pWEEfUJUjej',
        'ALw63dHrw1n',
        'dbzpQYr5G2g',
        'aQQTyeGoWm4',
        'lxo3ITSkcpt',
        'CgwB73TbuLC',
        'hLznDk07IWe',
        'TkzhnIQGFdV',
        'ItIljP9pyO2'
    ],
    optionSet: ['NxVachTgbj0', 'oBWhZmavxQY', 'pC3N9N77UmT', 'xjA5E9MimMU'],
}

test('From a list of org units you can get program properties like ids, TE type, TEA, option set', () => {
    expect(getPrograms(organisationUnitList)).toMatchObject(desiredResult)
})
