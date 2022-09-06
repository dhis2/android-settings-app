import { getInstance } from 'd2'
import {
    ANALYTICS,
    APPEARANCE,
    GENERAL_SETTINGS,
    INFO,
    NAMESPACE,
    SYNC_SETTINGS,
} from '../constants/data-store'
import { initialSetup } from '../constants/initial-setup'
import api from '../utils/api'

const {
    info,
    generalSettings,
    synchronization,
    appearance,
    analytics,
} = initialSetup

const getDataStoreKeyId = () => {
    return Promise.all([
        api.getMetaData(NAMESPACE, INFO),
        api.getMetaData(NAMESPACE, GENERAL_SETTINGS),
        api.getMetaData(NAMESPACE, SYNC_SETTINGS),
        api.getMetaData(NAMESPACE, APPEARANCE),
        api.getMetaData(NAMESPACE, ANALYTICS),
    ]).then(data => {
        return {
            [data[0].key]: data[0].id,
            [data[1].key]: data[1].id,
            [data[2].key]: data[2].id,
            [data[3].key]: data[3].id,
            [data[4].key]: data[4].id,
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
        const keyNames = [
            INFO,
            GENERAL_SETTINGS,
            SYNC_SETTINGS,
            APPEARANCE,
            ANALYTICS,
        ]
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
    return api.createNamespace(NAMESPACE, INFO).then(() => {
        return Promise.all([
            api.updateValue(NAMESPACE, INFO, { ...info }),
            api.createValue(NAMESPACE, GENERAL_SETTINGS, {
                ...generalSettings,
            }),
            api.createValue(NAMESPACE, SYNC_SETTINGS, { ...synchronization }),
            api.createValue(NAMESPACE, APPEARANCE, { ...appearance }),
            api.createValue(NAMESPACE, ANALYTICS, { ...analytics }),
        ])
    })
}

export const apiCreateFirstSetup = () => {
    return apiSetDefaultValues().then(() => {
        return getDataStoreKeyId().then(ids => updateSecurityDataStore(ids))
    })
}
