import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { TextField } from '../field'

export const VisualizationTitle = ({ settings, onChange }) => {
    const handleChange = e => {
        onChange({
            ...settings,
            name: e.value,
        })
    }

    return (
        <TextField
            dense
            value={settings.name}
            label={i18n.t('Visualization title')}
            onChange={handleChange}
            helpText={i18n.t(
                'This will override the visualization title when shown in the app'
            )}
        />
    )
}

VisualizationTitle.propTypes = {
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
