import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import {
    DATASET_SETTINGS,
    GENERAL_SETTINGS,
    NAMESPACE,
    PROGRAM_SETTINGS,
} from '../../constants/data-store'

const dataStoreQuery = {
    dataStore: {
        resource: `dataStore/${NAMESPACE}`,
    },
}

const generalSettingsDataStoreQuery = {
    generalSettings: {
        resource: `dataStore/${NAMESPACE}/${GENERAL_SETTINGS}`,
    },
}

const programSettingsDataStoreQuery = {
    programSettings: {
        resource: `dataStore/${NAMESPACE}/${PROGRAM_SETTINGS}`,
    },
}

const dataSetSettingsDataStoreQuery = {
    dataSetSettings: {
        resource: `dataStore/${NAMESPACE}/${DATASET_SETTINGS}`,
    },
}

export const useDataStore = () => {
    const { loading, error, data } = useDataQuery(dataStoreQuery)

    return { loading, error, dataStore: data && data.dataStore }
}

export const useGeneralDataStore = () => {
    const { loading, error, data } = useDataQuery(generalSettingsDataStoreQuery)

    return { loading, error, generalSettings: data && data.generalSettings }
}

export const useProgramDataStore = () => {
    const { loading, error, data } = useDataQuery(programSettingsDataStoreQuery)

    return { loading, error, programSettings: data && data.programSettings }
}

export const useDataSetDataStore = () => {
    const { loading, error, data } = useDataQuery(dataSetSettingsDataStoreQuery)

    return { loading, error, dataSetSettings: data && data.dataSetSettings }
}
