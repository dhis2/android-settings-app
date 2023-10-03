import i18n from '@dhis2/d2-i18n'
import { spacers } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { validateAndroidExpressions } from '../../pages/Appearance/Programs/helper'
import { useWorkflowContext } from '../../workflow-context'
import { SelectField } from './SelectField'

const CODE = 'programIndicator'

// expression does not meet android criteria
export const TeiHeader = ({ settings, handleChange, program }) => {
    const { programs } = useWorkflowContext()
    //const {refetch, loading} = use
    const [options, setOptions] = useState([])
    const [programIndicator, setProgramIndicator] = useState([])
    const [expression, setExpression] = useState('')

    useEffect(() => {
        // filter list of options based on selected program
        if (program) {
            const indicators = programs.find(
                (p) => p.id === program
            )?.programIndicators

            validateAndroidExpressions(indicators)
            console.log('valid check', { indicators })
            setOptions(indicators)
        }
    }, [program])

    useEffect(() => {
        // get expression
        console.log('program ind', settings)
    }, [settings[CODE]])

    return (
        <>
            <SelectField
                name={CODE}
                label={i18n.t('Program Indicator')}
                inputWidth={spacers.dp384}
                selected={settings[CODE]}
                options={options}
                //onChange={handleChange}
                onChange={(e) => handleChange(e, CODE)}
            />

            <p>{expression}</p>
        </>
    )
}
