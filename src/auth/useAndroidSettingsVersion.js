import { useDataQuery } from '@dhis2/app-runtime'
import { INFO, NAMESPACE } from '../constants/data-store'
import { infoDefault } from '../constants/info'

export const getKeyInfo = {
    info: {
        resource: `dataStore/${NAMESPACE}/${INFO}`,
    },
}

export const updateInfoMutation = {
    resource: `dataStore/${NAMESPACE}/${INFO}`,
    type: 'update',
    data: { ...infoDefault },
}

const isUpdatedVersion = (currentVersion, updatedVersion) =>
    currentVersion === updatedVersion

export const useAndroidSettingsVersion = () => {
    const { data } = useDataQuery(getKeyInfo)

    return {
        isInfoUpdated:
            data &&
            isUpdatedVersion(
                data.info?.androidSettingsVersion,
                infoDefault.androidSettingsVersion
            ),
        isDatastoreUpdated:
            data &&
            isUpdatedVersion(
                data.info?.dataStoreVersion,
                infoDefault.dataStoreVersion
            ),
    }
}
