import {
    defaultDataSync,
    defaultMetadataSync,
    defaultTrackerImporterVersion,
    minApiVersionNewTrackerDefault,
    newTrackerVersion,
} from '../../../components/field'

export const createInitialValues = (prevGlobalDetails, apiVersion) => ({
    metadataSync: prevGlobalDetails.metadataSync || defaultMetadataSync,
    dataSync: prevGlobalDetails.dataSync || defaultDataSync,
    trackerImporterVersion:
        prevGlobalDetails.trackerImporterVersion ||
        getImporterVersion(apiVersion),
})

const getImporterVersion = (apiVersion) =>
    apiVersion >= minApiVersionNewTrackerDefault
        ? newTrackerVersion
        : defaultTrackerImporterVersion
