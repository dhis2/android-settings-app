import api from '../utils/api'
import {
    DATASET_SETTINGS,
    GENERAL_SETTINGS,
    NAMESPACE,
    PROGRAM_SETTINGS,
} from '../constants/data-store'
import { androidSettingsDefault } from '../constants/android-settings'
import {
    DEFAULT_DATASET,
    DEFAULT_PROGRAM,
    populateObject,
} from './populateDefaultSettings'
import { getInstance } from 'd2'

const getDataStoreKeyId = () => {
    return Promise.all([
        api.getMetaData(NAMESPACE, GENERAL_SETTINGS),
        api.getMetaData(NAMESPACE, PROGRAM_SETTINGS),
        api.getMetaData(NAMESPACE, DATASET_SETTINGS),
    ]).then(data => {
        return {
            [data[0].key]: data[0].id,
            [data[1].key]: data[1].id,
            [data[2].key]: data[2].id,
        }
    })
}

const updateSecurityDataStore = id => {
    const updatedObject = {
        object: {
            publicAccess: 'r-------',
            externalAccess: false,
        },
    }

    return getInstance().then(d2 => {
        const keyNames = [GENERAL_SETTINGS, PROGRAM_SETTINGS, DATASET_SETTINGS]
        const sharingPromises = []
        keyNames.map(keyName => {
            const sharingUrl = `sharing?type=dataStore&id=${id[keyName]}`
            sharingPromises.push(
                d2.Api.getApi().post(sharingUrl, updatedObject)
            )
        })

        return Promise.all(sharingPromises)
    })
}

const apiSetDefaultValues = () => {
    return api.createNamespace(NAMESPACE, GENERAL_SETTINGS).then(() => {
        return Promise.all([
            api.updateValue(NAMESPACE, GENERAL_SETTINGS, {
                ...androidSettingsDefault,
            }),
            api.createValue(NAMESPACE, PROGRAM_SETTINGS, {
                globalSettings: populateObject(DEFAULT_PROGRAM),
            }),
            api.createValue(NAMESPACE, DATASET_SETTINGS, {
                globalSettings: populateObject(DEFAULT_DATASET),
            }),
        ])
    })
}

export const apiCreateFirstSetup = () => {
    return apiSetDefaultValues().then(() => {
        return getDataStoreKeyId().then(ids => updateSecurityDataStore(ids))
    })
}
