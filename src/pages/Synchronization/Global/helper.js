import {
    dataOptions,
    defaultDataSync,
    defaultMetadataSync,
    defaultTrackerImporterVersion,
    metadataOptions,
    minApiVersionNewTrackerDefault,
    newTrackerVersion,
} from '../../../components/field'

export const createInitialValues = (prevGlobalDetails, apiVersion) => ({
    metadataSync: prevGlobalDetails.metadataSync || defaultMetadataSync,
    dataSync: prevGlobalDetails.dataSync || defaultDataSync,
    trackerImporterVersion:
        prevGlobalDetails.trackerImporterVersion ||
        getImporterVersion(apiVersion),
    trackerExporterVersion:
        prevGlobalDetails.trackerExporterVersion ||
        getImporterVersion(apiVersion),
})

const getImporterVersion = (apiVersion) =>
    apiVersion >= minApiVersionNewTrackerDefault
        ? newTrackerVersion
        : defaultTrackerImporterVersion

export const validValue = (validList, value, defaultValue) =>
    validList.find((e) => e.value === value) ? value : defaultValue

export const createValidValues = (values) => ({
    ...values,
    metadataSync: validValue(
        metadataOptions,
        values.metadataSync,
        defaultMetadataSync
    ),
    dataSync: validValue(dataOptions, values.dataSync, defaultDataSync),
})
