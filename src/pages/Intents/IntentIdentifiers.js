import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { MultiSelectField } from '../../components/field/MultiSelectField'
import { SelectField } from '../../components/field/SelectField'
import { TextField } from '../../components/field/TextField'

const screenActionOptions = [
    { label: i18n.t('Search'), value: 'SEARCH' },
    { label: i18n.t('Data Entry'), value: 'DATA_ENTRY' },
]

const elementTypeOptions = [
    {
        value: 'dataElements',
        label: i18n.t('Data Element'),
    },
    {
        value: 'trackedEntityAttributes',
        label: i18n.t('Tracked Entity Attribute'),
    },
]

const IntentIdentifiers = ({
    formData,
    onChange,
    dataElements,
    attributes,
}) => {
    const [selectedElementType, setSelectedElementType] = useState('')
    const [list, setList] = useState([])

    const handleElementTypeChange = ({ selected }) => {
        setSelectedElementType(selected)

        if (selected === 'dataElements') {
            setList(dataElements || [])
        } else if (selected === 'trackedEntityAttributes') {
            setList(attributes || [])
        }

        onChange('trigger.dataElements', [])
        onChange('trigger.attributes', [])
    }

    const handleTriggerChange = ({ selected }) => {
        const selectedArray = Array.isArray(selected) ? selected : [selected]
        const mapped = selectedArray.map((id) => ({ id }))
        const key =
            selectedElementType === 'dataElements'
                ? 'trigger.dataElements'
                : 'trigger.attributes'
        onChange(key, mapped)
    }

    return (
        <div className="column-gap" style={{ display: 'grid' }}>
            <TextField
                required
                name="shortName"
                label={i18n.t('Short name')}
                onChange={(e) => onChange('name', e.value)}
                value={formData.name || ''}
            />

            <TextField
                name="description"
                label={i18n.t('Description')}
                onChange={(e) => onChange('description', e.value)}
                value={formData.description || ''}
            />

            <SelectField
                required
                name="elementType"
                label={i18n.t('Choose element type')}
                selected={selectedElementType}
                onChange={handleElementTypeChange}
                options={elementTypeOptions}
                inputWidth="300px"
            />

            {selectedElementType && (
                <SelectField
                    name="elementId"
                    label={
                        selectedElementType === 'dataElements'
                            ? i18n.t('Choose Data Element')
                            : i18n.t('Choose Attribute')
                    }
                    selected={
                        (selectedElementType === 'dataElements'
                            ? formData.trigger?.dataElements?.[0]?.id
                            : formData.trigger?.attributes?.[0]?.id) || ''
                    }
                    onChange={({ selected }) =>
                        handleTriggerChange({ selected })
                    }
                    options={list.map((item) => ({
                        label: item.displayName,
                        value: item.id,
                    }))}
                    inputWidth="300px"
                    required
                />
            )}

            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                <MultiSelectField
                    label={i18n.t('Screen Actions')}
                    selected={formData.action || []}
                    onChange={(e) => onChange('action', e.value || e.selected)}
                    options={screenActionOptions}
                    required
                />
            </div>

            <TextField
                required
                name="packageName"
                label={i18n.t('Package name')}
                onChange={(e) => onChange('packageName', e.value)}
                value={formData.packageName || ''}
            />
        </div>
    )
}

IntentIdentifiers.propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    dataElements: PropTypes.array.isRequired,
    attributes: PropTypes.array.isRequired,
}

export default IntentIdentifiers
