export const filterUnusedElements = (apiElementList, settingList) => {
    const list = []
    apiElementList.map((element) => {
        if (!settingList.some((settings) => settings.name === element.name)) {
            list.push(element)
        }
    })
    return list
}
