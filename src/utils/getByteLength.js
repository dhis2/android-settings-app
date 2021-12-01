/**
 * Returns the byte length
 * */
export const getByteLength = element =>
    Buffer.byteLength(JSON.stringify(element))

/**
 * Returns Kb
 * */
export const formatByteSize = bytes => Math.round(bytes / 1024)
