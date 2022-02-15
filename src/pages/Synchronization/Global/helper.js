import {
    defaultDataSync,
    defaultMetadataSync,
    defaultTrackerImporterVersion,
} from '../../../components/field'

export const createInitialValues = prevGlobalDetails => ({
    metadataSync: prevGlobalDetails.metadataSync || defaultMetadataSync,
    dataSync: prevGlobalDetails.dataSync || defaultDataSync,
    trackerImporterVersion:
        prevGlobalDetails.trackerImporterVersion ||
        defaultTrackerImporterVersion,
})
