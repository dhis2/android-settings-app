import { isNullUndefinedOrEmptyString } from 'd2/lib/check'

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

export const convertToByte = (kiloBytes) =>
    isNullUndefinedOrEmptyString(kiloBytes) ? null : kiloBytes * 1024

/**
 * Returns Kb or null
 * */
export const convertBytesToKilobytes = (bytes) =>
    isNullUndefinedOrEmptyString(bytes) ? null : Math.round(bytes / 1024)
