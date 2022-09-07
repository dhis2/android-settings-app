import {
    DEFAULT_GENERAL,
    populateObject,
} from '../modules/populateDefaultSettings'
import { appearanceDefault } from './appearance-settings'
import { infoDefault } from './info'
import { syncDefault } from './sync-settings'

export const initialSetup = {
    info: infoDefault,
    generalSettings: populateObject(DEFAULT_GENERAL),
    synchronization: syncDefault,
    appearance: appearanceDefault,
    analytics: {
        tei: [],
        dhisVisualizations: {
            home: [],
            program: {},
            dataSet: {},
        },
    },
}
