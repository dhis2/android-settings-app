/**
 * When delete specific settings, should remove it from specific settings list
 * */
import { getItemFromList } from './getItemFromList'

export const removeSettingFromList = ({
    row,
    specificSettings,
    rowSettings,
    nameList,
    optionList,
    listComplete,
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

    optionList = getItemFromList(nameList, listComplete, optionList)

    return {
        specificSettings,
        rowSettings,
        nameList,
        optionList,
    }
}
