import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { MultiSelectField } from '../../components/field/MultiSelectField'
import { SelectField } from '../../components/field/SelectField'
import { TextField } from '../../components/field/TextField'
import styles from './Intent.module.css'

const screenActionOptions = [
    { label: i18n.t('Search'), value: 'SEARCH' },
    { label: i18n.t('Data Entry'), value: 'DATA_ENTRY' },
]

const elementTypeOptions = [
    {
        value: 'dataElements',
        label: i18n.t('Data element'),
    },
    {
        value: 'trackedEntityAttributes',
        label: i18n.t('Tracked entity attribute'),
    },
]

const IntentIdentifiers = ({
    formData,
    onChange,
    dataElements,
    attributes,
}) => {
    const [selectedElementType, setSelectedElementType] = useState(() => {
        if (formData.trigger?.dataElements?.length > 0) {
            return 'dataElements'
        } else if (formData.trigger?.attributes?.length > 0) {
            return 'trackedEntityAttributes'
        }
    })

    const handleElementTypeChange = ({ selected }) => {
        setSelectedElementType(selected)
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
    

    const elementOptions = (() => {
        if (selectedElementType === 'dataElements') {
            return dataElements
        }
        if (selectedElementType === 'trackedEntityAttributes') {
            return attributes
        }
        return []
    })()

    const selectedTriggerId = (() => {
        if (selectedElementType === 'dataElements') {
            return formData.trigger?.dataElements?.[0]?.id || ''
        }
        if (selectedElementType === 'trackedEntityAttributes') {
            return formData.trigger?.attributes?.[0]?.id || ''
        }
        return ''
    })()

    return (
        <div className={styles.intentFormGrid}>
            <TextField
                required
                name="name"
                label={i18n.t('Intent name')}
                onChange={(e) => onChange('name', e.value)}
                value={formData.name || ''}
            />

            <TextField
                name="description"
                label={i18n.t('Intent description')}
                onChange={(e) => onChange('description', e.value)}
                value={formData.description || ''}
            />

            <SelectField
                required
                name="elementType"
                label={i18n.t('Element type')}
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
                            ? i18n.t('Data Element')
                            : i18n.t('Attribute')
                    }
                    selected={selectedTriggerId || ''}
                    onChange={({ selected }) =>
                        handleTriggerChange({ selected })
                    }
                    options={elementOptions.map((item) => ({
                        label: item.displayName,
                        value: item.id,
                    }))}
                    inputWidth="300px"
                    required
                />
            )}

            <div className={styles.intentFieldGroup}>
                <MultiSelectField
                    label={i18n.t('Screen/Action')}
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
