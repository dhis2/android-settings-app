import PropTypes from 'prop-types'
import React from 'react'
import { DATA_VISUALIZATION } from '../../constants'
import { FieldSection } from '../field'
import { VisualizationSearch } from './VisualizationSearch'

export const SelectVisualization = ({ settings, onChange }) => {
    const handleChange = (e) => {
        onChange({
            ...settings,
            visualization: e.id,
            visualizationName: e.name || e.displayName,
        })
    }

    const clearSelection = () => {
        onChange({
            ...settings,
            visualization: '',
            visualizationName: '',
        })
    }

    return (
        <FieldSection>
            <VisualizationSearch
                setSelection={handleChange}
                clearSelection={clearSelection}
                type={settings.type || DATA_VISUALIZATION}
            />
        </FieldSection>
    )
}

SelectVisualization.propTypes = {
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
