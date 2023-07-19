import {
    DEFAULT_GENERAL,
    populateObject,
} from '../modules/populateDefaultSettings'
import { appearanceDefault } from './appearance-settings'
import { infoDefault } from './info'
import { syncDefault, syncDefault_V2 } from './sync-settings'

export const initialSetup = {
    info: infoDefault,
    generalSettings: populateObject(DEFAULT_GENERAL),
    synchronization: syncDefault,
    synchronization_v2: syncDefault_V2,
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
