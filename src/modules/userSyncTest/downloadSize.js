import { memorySizeOf } from '../../utils/memory-size'

export const getDownloadSize = dataArray => {
    let downloadSize = 0
    dataArray.forEach(dataElement => {
        const dataSize = parseFloat(
            memorySizeOf(JSON.stringify(dataElement.toArray()))
        )

        downloadSize += dataSize
    })
    return downloadSize
}
