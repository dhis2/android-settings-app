import i18n from '@dhis2/d2-i18n'
import {
    InputField,
    SingleSelectField,
    SingleSelectOption,
    IconInfo16,
    spacers,
    NoticeBox,
    Tooltip,
} from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import React, { useEffect, useState } from 'react'
import { validateAndroidExpressions } from '../../pages/Appearance/Programs/helper'
import { useWorkflowContext } from '../../workflow-context'
import { FieldSection } from './FieldSection'
import { Section } from './Section'

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

            const checkedExpressions = validateAndroidExpressions(indicators)

            setOptions(checkedExpressions)
        }
    }, [program])

    useEffect(() => {
        // get expression
        const indicator = options.find(
            (i) => i.id === settings[CODE]
        )?.expression
        setExpression(indicator)
        console.log('program ind', indicator)
    }, [settings[CODE]])

    return (
        <>
            <Section legend={i18n.t('TEI Header')}>
                {!isEmpty(options) ? (
                    <>
                        <FieldSection>
                            <>
                                <SingleSelectField
                                    name={CODE}
                                    label={i18n.t('Program Indicator')}
                                    inputWidth={spacers.dp384}
                                    dense
                                    selected={settings[CODE]}
                                    onChange={(e) => handleChange(e, CODE)}
                                >
                                    {options.map((option) => (
                                        <SingleSelectOption
                                            key={option.value || option.id}
                                            label={option.label || option.name}
                                            value={option.value || option.id}
                                            disabled={!option.valid}
                                        />
                                    ))}
                                </SingleSelectField>
                                <Tooltip
                                    content={i18n.t(
                                        "Disable elements don't meet android criteria"
                                    )}
                                    placement="right"
                                >
                                    <span>
                                        <IconInfo16 />
                                    </span>
                                </Tooltip>
                            </>
                        </FieldSection>

                        {settings[CODE] && (
                            <FieldSection>
                                <InputField
                                    readOnly
                                    dense
                                    inputWidth={spacers.dp384}
                                    value={`This is a: ${expression}`}
                                />
                            </FieldSection>
                        )}
                    </>
                ) : (
                    <NoticeBox>
                        {i18n.t(
                            'There are no Program Indicators with expressions that meet android criteria'
                        )}
                    </NoticeBox>
                )}
            </Section>
        </>
    )
}
