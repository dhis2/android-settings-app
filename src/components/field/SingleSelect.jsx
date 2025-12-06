import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export const SingleSelect = ({ label, options, onChange, ...props }) => (
    <SingleSelectField label={label} onChange={onChange} {...props}>
        {options.map((option) => (
            <SingleSelectOption
                key={option.value || option.id}
                label={option.label || option.name}
                value={option.value || option.id}
            />
        ))}
    </SingleSelectField>
)

SingleSelect.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
}
