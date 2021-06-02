import React, { useEffect, useState } from 'react'
import PropTypes from '@dhis2/prop-types'
import { CircularLoader } from '@dhis2/ui'
import { Section } from './Section'
import { SelectProgram } from './SelectProgram'
import { SelectProgramStage } from './SelectProgramStage'

export const ProgramSection = ({ onChange, value, edit, programList }) => {
    const [programStageList, setProgramStageList] = useState([])

    useEffect(() => {
        if (programList && edit) {
            setProgramStageList(
                programList.filter(program => program.id === value.program)[0]
                    .programStages
            )
        }
    }, [programList, edit])

    if (edit && programStageList.length === 0) return <CircularLoader small />

    return (
        <Section>
            <SelectProgram
                onChange={onChange}
                value={value}
                options={programList || []}
                handleProgramStage={setProgramStageList}
                disabled={edit}
            />

            <SelectProgramStage
                onChange={onChange}
                value={value}
                options={programStageList || []}
                fixedValue={edit}
            />
        </Section>
    )
}

ProgramSection.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object,
    edit: PropTypes.bool,
}
