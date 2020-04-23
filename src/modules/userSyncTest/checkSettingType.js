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

export const checkSettingType = (type, settingType) => {
    switch (type) {
        case GLOBAL:
            settingType = global
            break
        case PER_ORG_UNIT:
            settingType = ORG_UNIT
            break
        case PER_PROGRAM:
            settingType = program
            break
        case PER_OU_PROGRAM:
            settingType = perOuProgram
            break
        case ALL_ORG_UNIT:
            settingType = global
            break
        default:
            break
    }

    return settingType
}
