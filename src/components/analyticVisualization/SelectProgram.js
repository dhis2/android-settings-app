import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import { SelectField } from '../field'
import { useReadProgramQuery } from '../../pages/Analytics/Program/ProgramVisualizationQueries'

export const SelectProgram = ({ settings, onChange }) => {
    const { programList, loading } = useReadProgramQuery()
    const options = programList || []

    const handleChange = e => {
        const name = options.find(program => program.id === e.selected)
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
            loading={loading}
            options={options}
        />
    )
}

SelectProgram.propTypes = {
    settings: PropTypes.object,
    onChange: PropTypes.func,
}
