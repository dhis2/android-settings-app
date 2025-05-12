import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { TextField } from '../../components/field/TextField'
import { CustomMultiSelectField } from '../../components/field/CustomMultiSelectField'
import { SelectField } from '../../components/field/SelectField'

const screenActionOptions = [
    { label: 'Search', value: 'SEARCH' },
    { label: 'Data Entry', value: 'DATA_ENTRY' },
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
        console.log({selected}, formData.trigger)
    }

    const handleTriggerChange = ({ selected }) => {
        const mapped = selected.map((id) => ({ id }))
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
                required
                name="description"
                label={i18n.t('Description')}
                onChange={(e) => onChange('description', e.value)}
                value={formData.description || ''}
            />

            <SelectField
                name="elementType"
                label={i18n.t('Choose element type')}
                selected={selectedElementType}
                onChange={handleElementTypeChange}
                options={elementTypeOptions}
                inputWidth="300px"
                dense
            />

            {selectedElementType && (
                <SelectField
                    required
                    name="elementId"
                    label={
                        selectedElementType === 'dataElements'
                            ? i18n.t('Choose Data Elements')
                            : i18n.t('Choose Attributes')
                    }
                    selected={
                        (selectedElementType === 'dataElements'
                            ? formData.trigger?.dataElements
                            : formData.trigger?.attributes
                        )?.map((item) => item.id) || []
                    }
                    onChange={handleTriggerChange}
                    options={list.map((item) => ({
                        label: item.displayName,
                        value: item.id,
                    }))}
                    inputWidth="300px"
                    dense
                    multiple
                />
            )}
            <CustomMultiSelectField
                label={i18n.t('Screen Actions')}
                selected={formData.action || []}
                onChange={(e) => onChange('action', e.value || e.selected)}
                options={screenActionOptions}
                required
                error={(formData.action || []).length === 0}
                validationText={i18n.t('At least one action is required')}
            />

            <TextField
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
    edit: PropTypes.bool,
    dataElements: PropTypes.array.isRequired,
    attributes: PropTypes.array.isRequired,
}

export default IntentIdentifiers
