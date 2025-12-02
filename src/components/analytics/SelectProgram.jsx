import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { createInitialValues } from '../../pages/Analytics/TEI/helper'
import { SelectField } from './SelectField.jsx'

export const SelectProgram = ({
    onChange,
    value,
    options,
    handleProgramStage,
    ...props
}) => {
    const handleSearchProgramStage = (id) => {
        handleProgramStage(
            options.find((program) => program.id === id)?.programStages || []
        )
    }

    const handleChange = (e, key) => {
        handleSearchProgramStage(e.selected)
        onChange({
            ...createInitialValues(''),
            [key]: e.selected,
        })
    }

    return (
        <SelectField
            name="program"
            inputWidth="350px"
            label={i18n.t('Program')}
            onChange={handleChange}
            value={value.program || ''}
            options={options}
            {...props}
        />
    )
}

SelectProgram.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
    options: PropTypes.array,
    handleProgramStage: PropTypes.func,
}
