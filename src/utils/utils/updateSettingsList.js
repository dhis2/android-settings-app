export const updateSettingsList = (newEntry, list) => {
    const updatedList = list.filter(element => {
        const elementID = element.uid || element.id
        const newEntryID = newEntry.uid || newEntry.id
        return elementID !== newEntryID
    })
    updatedList.push(newEntry)
    return updatedList
}
