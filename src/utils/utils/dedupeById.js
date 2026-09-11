export const dedupeById = (items) => {
    const seen = new Map()

    items.forEach((item) => {
        if (item?.id && !seen.has(item.id)) {
            seen.set(item.id, item)
        }
    })

    return Array.from(seen.values())
}
