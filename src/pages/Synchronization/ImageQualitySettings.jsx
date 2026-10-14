import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { HelpText, Section } from '../../components/field'
import { MultiSelect } from '../../components/inputs'
import { UPLOAD_QUALITY_ORIGINAL } from '../../constants/image-settings'

/**
 * Multi-select of IMAGE dataElements/attributes to sync at full quality
 * imageSettings and onChange follow the imageSettings map shape stored
 * in a program/dataSet specific settings: {[itemId]: {uploadQuality}}
 */
const ImageQualitySettings = ({ items, imageSettings, onChange, disabled }) => {
    if (!items || items.length === 0) {
        return null
    }

    const selected = items
        .filter(
            (item) =>
                imageSettings?.[item.id]?.uploadQuality ===
                UPLOAD_QUALITY_ORIGINAL
        )
        .map((item) => item.id)

    const options = items.map((item) => ({
        label: item.name,
        value: item.id,
    }))

    const handleChange = ({ selected: selectedIds }) => {
        const updatedImageSettings = selectedIds.reduce(
            (acc, id) => ({
                ...acc,
                [id]: { uploadQuality: UPLOAD_QUALITY_ORIGINAL },
            }),
            {}
        )
        onChange(updatedImageSettings)
    }

    return (
        <Section
            legend={
                <HelpText
                    helpText={i18n.t('Maximum quality images')}
                    warning={i18n.t(
                        'Only applicable for users using Android app version 3.5 or later.'
                    )}
                    version={i18n.t('3.5 +')}
                    type="info"
                />
            }
        >
            <MultiSelect
                filterable
                label={i18n.t(
                    'Images compress to medium quality by default. Add items here that should be synced at full quality'
                )}
                selected={selected}
                onChange={handleChange}
                options={options}
                disabled={disabled}
            />
        </Section>
    )
}

ImageQualitySettings.propTypes = {
    items: PropTypes.array,
    imageSettings: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}

export default ImageQualitySettings
