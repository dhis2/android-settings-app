import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { createInitialValues } from '../../pages/Analytics/TEI/helper'
import { isValidValue } from '../../utils/validators'
import { SelectField } from './SelectField'

export const SelectProgramStage = ({
    onChange,
    value,
    options,
    fixedValue,
}) => {
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
            disabled={!isValidValue(value.program) || fixedValue}
        />
    )
}

SelectProgramStage.propTypes = {
    value: PropTypes.object,
    options: PropTypes.array,
    onChange: PropTypes.func,
    fixedValue: PropTypes.bool,
}
