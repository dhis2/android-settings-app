import {
    defaultDataSync,
    defaultMetadataSync,
    defaultTrackerImporterVersion,
    minApiVersionNewTrackerDefault,
    newTrackerVersion,
} from '../../../components/field'
import { convertToByte, formatByteSize } from '../../../utils/getByteLength'

export const createInitialValues = (prevGlobalDetails, apiVersion) => ({
    metadataSync: prevGlobalDetails.metadataSync || defaultMetadataSync,
    dataSync: prevGlobalDetails.dataSync || defaultDataSync,
    trackerImporterVersion:
        prevGlobalDetails.trackerImporterVersion ||
        getImporterVersion(apiVersion),
    trackerExporterVersion:
        prevGlobalDetails.trackerExporterVersion ||
        getImporterVersion(apiVersion),
    fileMaxLengthBytes:
        formatByteSize(prevGlobalDetails.fileMaxLengthBytes) || 0,
})

const getImporterVersion = (apiVersion) =>
    apiVersion >= minApiVersionNewTrackerDefault
        ? newTrackerVersion
        : defaultTrackerImporterVersion

export const checkValidSettings = (settings) => ({
    ...settings,
    fileMaxLengthBytes: convertToByte(settings.fileMaxLengthBytes),
})
