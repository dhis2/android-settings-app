export const splitArray = (list, howMany) => {
    let idx = 0
    const result = []

    while (idx < list.length) {
        if (idx % howMany === 0) {
            result.push([])
        }
        result[result.length - 1].push(list[idx++])
    }

    return result
}
