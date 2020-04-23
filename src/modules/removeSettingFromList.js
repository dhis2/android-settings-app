/**
 * When delete specific settings, should remove it from specific settings list
 * */
export const removeSettingFromList = ({
    row,
    specificSettings,
    rowSettings,
    nameList,
}) => {
    const data = row
    const oldList = specificSettings
    const rowList = rowSettings
    const programNamesUsed = nameList

    nameList = programNamesUsed.filter(program => program !== data.id)

    const newList = {}

    for (const key in oldList) {
        if (key !== data.id) {
            newList[key] = specificSettings[key]
        }
    }

    rowSettings = rowList.filter(row => row.id !== data.id)
    specificSettings = newList

    return {
        specificSettings,
        rowSettings,
        nameList,
    }
}
