import {
    DEFAULT_DATASET,
    DEFAULT_GLOBAL,
    DEFAULT_GLOBAL_v2,
    DEFAULT_PROGRAM,
    populateObject,
} from '../modules/populateDefaultSettings'

export const syncDefault = {
    ...populateObject(DEFAULT_GLOBAL),
    programSettings: {
        globalSettings: populateObject(DEFAULT_PROGRAM),
        specificSettings: {},
    },
    dataSetSettings: {
        globalSettings: populateObject(DEFAULT_DATASET),
        specificSettings: {},
    },
}

export const syncDefault_V2 = {
    ...populateObject(DEFAULT_GLOBAL_v2),
    programSettings: {
        globalSettings: populateObject(DEFAULT_PROGRAM),
        specificSettings: {},
    },
    dataSetSettings: {
        globalSettings: populateObject(DEFAULT_DATASET),
        specificSettings: {},
    },
}
