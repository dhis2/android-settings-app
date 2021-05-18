import {
    ALL_ORG_UNIT,
    global,
    GLOBAL,
    ORG_UNIT,
    PER_ORG_UNIT,
    PER_OU_PROGRAM,
    PER_PROGRAM,
    perOuProgram,
    program,
} from './settingType'

export const checkSettingType = type => {
    switch (type) {
        case GLOBAL || global || ALL_ORG_UNIT || 'ALL_ORG_UNITS':
            return global
        case PER_ORG_UNIT || 'PER_ORG_UNIT':
            return ORG_UNIT
        case PER_PROGRAM || 'PER_PROGRAM':
            return program
        case PER_OU_PROGRAM || 'PER_OU_AND_PROGRAM':
            return perOuProgram
        default:
            return global
    }
}
