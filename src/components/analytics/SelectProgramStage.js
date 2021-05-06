import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { SelectField } from './SelectField'
import { createInitialValues } from '../../pages/Analytics/helper'
import { isValidValue } from '../../utils/validators/isValidValue'

export const SelectProgramStage = ({ onChange, value, options }) => {
    const handleChange = (e, key) => {
        onChange({
            ...createInitialValues(''),
            program: value.program,
            [key]: e.selected,
        })
    }

    return (
        <SelectField
            name="programStage"
            inputWidth="350px"
            label={i18n.t('Program Stage')}
            onChange={handleChange}
            value={value.programStage || ''}
            options={options}
            disabled={!isValidValue(value.program)}
        />
    )
}

SelectProgramStage.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func,
}
