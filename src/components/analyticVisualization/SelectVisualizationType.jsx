import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { visualizationTypes } from '../../constants'
import { SelectField } from '../analytics'

const CODE = 'type'

export const SelectVisualizationType = ({ settings, onChange, disabled }) => {
    const handleChange = (e) => {
        onChange({
            ...settings,
            visualization: '',
            visualizationName: '',
            [CODE]: e.selected,
        })
    }

    return (
        <SelectField
            dense
            name={CODE}
            options={visualizationTypes}
            label={i18n.t('Visualization Type')}
            value={settings[CODE]}
            onChange={handleChange}
            disabled={disabled}
        />
    )
}

SelectVisualizationType.propTypes = {
    settings: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}
