import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { useWorkflowContext } from '../../workflow-context'
import { SelectField } from '../field'

export const SelectProgram = ({ settings, onChange }) => {
    const { programs: programList } = useWorkflowContext()
    const options = programList || []

    const handleChange = (e) => {
        const name = options.find((program) => program.id === e.selected)
        onChange({
            ...settings,
            program: e.selected,
            programName: name.name,
        })
    }

    return (
        <SelectField
            dense
            inputWidth="350px"
            name="program"
            label={i18n.t('Program')}
            selected={settings.program || ''}
            onChange={handleChange}
            options={options}
        />
    )
}

SelectProgram.propTypes = {
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
