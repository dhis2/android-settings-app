export function memorySizeOf(obj) {
    var bytes = 0

    function sizeOf(obj) {
        if (obj !== null && obj !== undefined) {
            switch (typeof obj) {
                case 'number':
                    bytes += 8
                    break
                case 'string':
                    bytes += obj.length * 2
                    break
                case 'boolean':
                    bytes += 4
                    break
                case 'object':
                    var objClass = Object.prototype.toString
                        .call(obj)
                        .slice(8, -1)
                    if (objClass === 'Object' || objClass === 'Array') {
                        for (var key in obj) {
                            if (!obj.hasOwnProperty(key)) continue
                            sizeOf(obj[key])
                        }
                    } else bytes += obj.toString().length * 2
                    break
                default: //console.log(bytes)
            }
        }
        return bytes
    }

    // return formatByteSize(sizeOf(obj));
    return sizeOf(obj)
}

export function formatByteSize(bytes) {
    if (bytes < 1024) return bytes
    // + " bytes";
    else return Math.round(bytes / 1024)
    // else if (bytes < 1048576) return Math.round(bytes / 1024) //.toFixed(3) //+ " KB";
    /* else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
    else return (bytes / 1073741824).toFixed(3) + " GB"; */
}

// export default memorySizeOf
