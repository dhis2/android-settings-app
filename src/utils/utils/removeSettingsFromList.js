export const removeSettingsFromList = (setting, settingList) =>
    settingList.filter(element => {
        const elementID = element.uid || element.id
        const settingID = setting.uid || setting.id
        return elementID !== settingID
    })
