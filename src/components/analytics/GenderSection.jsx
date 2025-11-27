import i18n from '@dhis2/d2-i18n'
import { CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import { isValidValue } from '../../utils/validators'
import { Section } from './Section.jsx'
import { SelectField } from './SelectField.jsx'
import { TextField } from './TextField.jsx'

export const GenderSection = ({
    onChange,
    specificSettings,
    attributeOptions,
    edit,
}) => {
    useEffect(() => {
        console.log('change specific', {attributeOptions, specificSettings, edit})
        // error found cause no attributes where found when edit, needs to change the list
    }, [specificSettings])

    const handleChange = (e, key) => {
        const name = typeof key === 'string' ? key : e.name

        onChange({
            ...specificSettings,
            [name]: e.value || e.selected,
        })
    }

    if (edit && attributeOptions.length === 0) {
        console.log({edit, attributeOptions, specificSettings})
        return <CircularLoader small />
    }

    return (
        <Section legend={i18n.t('Gender Attributes')}>
            <SelectField
                name="attribute"
                inputWidth="300px"
                label={i18n.t('Choose attribute')}
                onChange={handleChange}
                value={specificSettings.attribute || ''}
                options={attributeOptions}
                disabled={!isValidValue(specificSettings.programStage)}
            />

            <TextField
                required
                inputWidth="300px"
                name="female"
                label={i18n.t('Female title')}
                onChange={handleChange}
                value={specificSettings.female || ''}
            />

            <TextField
                required
                inputWidth="300px"
                name="male"
                label={i18n.t('Male title')}
                onChange={handleChange}
                value={specificSettings.male || ''}
            />
        </Section>
    )
}

GenderSection.propTypes = {
    onChange: PropTypes.func,
    specificSettings: PropTypes.object,
    attributeOptions: PropTypes.array,
    edit: PropTypes.bool,
}
