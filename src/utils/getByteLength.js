/**
 * Returns the byte length
 * */
export const getByteLength = (element) => {
    const encoder = new TextEncoder()
    return encoder.encode(JSON.stringify(element)).length
}

/**
 * Returns Kb
 * */
export const formatByteSize = (bytes) => Math.round(bytes / 1024)

/**
 * Returns bytes
 **/

export const convertToByte = (kiloBytes) => kiloBytes * 1024
