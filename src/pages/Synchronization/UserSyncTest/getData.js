import toArray from 'lodash/toArray'
import {
    apiFetchEvents,
    apiFetchTrackedEntityInstances,
} from './queries/dataQueries'
import { formatByteSize, getByteLength } from '../../../utils/getByteLength'

export const getDataSize = async ({
    dataEngine,
    orgUnit,
    program,
    globalLimit,
}) => {
    const programList = toArray(program)
    let metadataSize = 0

    await getTEI({ dataEngine, programList, globalLimit, orgUnit }).then(
        result => result.map(data => (metadataSize += getByteLength(data)))
    )

    return formatByteSize(metadataSize)
}

const getTEI = ({ dataEngine, programList, globalLimit, orgUnit }) => {
    const teiPromises = []
    const limitByProgram = globalLimit.settingDownload === 'PER_PROGRAM'
    orgUnit.map(ou =>
        programList.map(program => {
            const tei = program.teiDownload
            let pageSize
            if (tei) {
                pageSize = limitByProgram
                    ? globalLimit.teiDownload
                    : Math.round(globalLimit.teiDownload / programList.length)
            } else {
                pageSize = limitByProgram
                    ? globalLimit.eventsDownload
                    : Math.round(
                          globalLimit.eventsDownload / programList.length
                      )
            }
            teiPromises.push(
                tei
                    ? apiFetchTrackedEntityInstances({
                          dataEngine,
                          ou,
                          program: program.id,
                          pageSize,
                      })
                    : apiFetchEvents({
                          dataEngine,
                          ou,
                          program: program.id,
                          pageSize,
                      })
            )
        })
    )

    return Promise.all(teiPromises)
}
