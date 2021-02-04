import React, { useEffect, useState } from 'react'
import { WITH_REGISTRATION } from '../../constants/program-settings'
import ProgramTableRow from './program-table-row'
import Wrapper from '../wrapper'

const ProgramTable = props => {
    const [program, setProgram] = useState(props.programSelected)
    const [programData, setData] = useState(props.data)
    const [programFilter, setProgramFiltered] = useState('')
    const [programType, setProgramType] = useState('')

    const checkProgramType = () => {
        if (props.programSelected !== '') {
            const programSelected = props.completeListOptions.filter(
                programOption => programOption.id === props.programSelected
            )
            setProgram(props.programSelected)
            setProgramFiltered(programSelected)
            setProgramType(programSelected[0].programType)
        }
    }

    useEffect(() => {
        if (props.programSelected !== '') {
            if (!program || !programType || program !== props.programSelected) {
                checkProgramType()
            }
        }
    })

    if (!program || !programType || props.programSelected === '') {
        return null
    } else {
        return (
            <Wrapper fullWidth>
                <div>
                    {programType === WITH_REGISTRATION
                        ? programData.withRegistration.map(row => (
                              <ProgramTableRow
                                  key={row.option}
                                  dataRow={row}
                                  states={props.states}
                                  onChange={props.onChange}
                              />
                          ))
                        : programData.withoutRegistration.map(row => (
                              <ProgramTableRow
                                  key={row.option}
                                  dataRow={row}
                                  states={props.states}
                                  onChange={props.onChange}
                              />
                          ))}
                </div>
            </Wrapper>
        )
    }
}

export default ProgramTable
