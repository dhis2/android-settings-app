import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
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
    edit,
}) => {
    const [selectedElementType, setSelectedElementType] = useState('')

    useEffect(() => {
        if (edit) {
            if (formData.trigger?.dataElements?.length > 0) {
                setSelectedElementType('dataElements')
            } else if (formData.trigger?.attributes?.length > 0) {
                setSelectedElementType('trackedEntityAttributes')
            }
        }
    }, [edit, formData])

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

    const elementOptions =
        selectedElementType === 'dataElements'
            ? dataElements
            : selectedElementType === 'trackedEntityAttributes'
            ? attributes
            : []

    const selectedTriggerId =
        selectedElementType === 'dataElements'
            ? formData.trigger?.dataElements?.[0]?.id
            : selectedElementType === 'trackedEntityAttributes'
            ? formData.trigger?.attributes?.[0]?.id
            : ''

    return (
        <div className={styles.intentFormGrid}>
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

            {!edit && (
                <SelectField
                    required
                    name="elementType"
                    label={i18n.t('Choose element type')}
                    selected={selectedElementType}
                    onChange={handleElementTypeChange}
                    options={elementTypeOptions}
                    inputWidth="300px"
                />
            )}

            {selectedElementType && (
                <SelectField
                    name="elementId"
                    label={
                        selectedElementType === 'dataElements'
                            ? i18n.t('Choose Data Element')
                            : i18n.t('Choose Attribute')
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
    edit: PropTypes.bool,
}

export default IntentIdentifiers
