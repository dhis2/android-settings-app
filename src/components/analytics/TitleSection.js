import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { TextField } from './TextField'
import { Section } from './Section'

export const TitleSection = ({ onChange, value }) => {
    const handleChange = e => {
        onChange({
            ...value,
            [e.name]: e.value,
        })
    }

    return (
        <Section legend={i18n.t('Title and name')}>
            <TextField
                name="name"
                label={i18n.t('Analytics chart title')}
                onChange={handleChange}
                value={value.name || ''}
                required
            />

            <TextField
                name="shortName"
                label={i18n.t('Short name')}
                onChange={handleChange}
                value={value.shortName || ''}
            />
        </Section>
    )
}

TitleSection.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
}
