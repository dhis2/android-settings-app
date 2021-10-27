import i18n from '@dhis2/d2-i18n'

export const formatList = items => {
    try {
        const formatter = new Intl.ListFormat(i18n.language, {
            style: 'long',
            type: 'conjunction',
        })
        return formatter.format(items)
    } catch (error) {
        return items.join(', ')
    }
}
