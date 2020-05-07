/**
 * Get settings list not including current settings with specific settings
 * @case edit action
 * @case add specific setting
 */

export const getItemFromList = (usedList, completeList, updatedList) => {
    if (usedList.length > 0) {
        const settingCompleteList = completeList
        const usedIdList = usedList

        updatedList = settingCompleteList.filter(
            item => !usedIdList.includes(item.id)
        )
    }

    return updatedList
}
