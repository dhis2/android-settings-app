import {
    DEFAULT_DATASET,
    DEFAULT_GLOBAL,
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
