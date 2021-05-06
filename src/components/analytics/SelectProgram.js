import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { SelectField } from './SelectField'
import { createInitialValues } from '../../pages/Analytics/helper'

export const SelectProgram = ({
    onChange,
    value,
    options,
    handleProgramStage,
}) => {
    const handleSearchProgramStage = id => {
        handleProgramStage(
            options.filter(program => program.id === id)[0].programStages
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
        />
    )
}

SelectProgram.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
    options: PropTypes.array,
    handleProgramStage: PropTypes.func,
}
