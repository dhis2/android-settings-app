import { defaultDataSync, defaultMetadataSync } from '../../../components/field'

export const createInitialValues = prevGlobalDetails => ({
    metadataSync: prevGlobalDetails.metadataSync || defaultMetadataSync,
    dataSync: prevGlobalDetails.dataSync || defaultDataSync,
    newTrackerImporter: false,
})
