import { formatByteSize } from './memory-size'

export const getRequestDownloadSize = async url => {
    const abortController = new AbortController()

    // Step 1: start the fetch and obtain a reader
    const response = await fetch(url, {
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
        },
        signal: abortController.signal,
    })

    const reader = response.body.getReader()

    // Step 2: get total length
    const contentLength = +response.headers.get('Content-Length')

    // Step 3: read the data
    let receivedLength = 0 // received that many bytes at the moment
    const chunks = [] // array of received binary chunks (comprises the body)
    while (true) {
        const { done, value } = await reader.read()

        if (done) {
            break
        }

        chunks.push(value)
        receivedLength += value.length

        console.log(`Received ${receivedLength} of ${contentLength}`)
    }

    // Step 4: concatenate chunks into single Uint8Array
    const chunksAll = new Uint8Array(receivedLength)
    let position = 0
    for (const chunk of chunks) {
        chunksAll.set(chunk, position)
        position += chunk.length
    }

    // Step 5: decode into a string
    const result = new TextDecoder('utf-8').decode(chunksAll)
    const resultParsed = JSON.parse(result)

    console.log('result', {
        result,
        chunksAll,
        byte: chunksAll.byteLength,
        reader,
        resultParsed,
    })
    //return chunksAll
    return formatByteSize(receivedLength)
}
