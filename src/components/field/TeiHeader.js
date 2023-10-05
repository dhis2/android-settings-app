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
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import {
    getAttributes,
    getExpressionDescription,
    validateAndroidExpressions,
} from '../../pages/Appearance/Programs/helper'
import { useGetProgram } from '../../pages/Appearance/Programs/ProgramQueries'
import { FieldSection } from './FieldSection'
import { Section } from './Section'

const CODE = 'programIndicator'

export const TeiHeader = ({ settings, handleChange, program }) => {
    const { programs } = useGetProgram()
    const [options, setOptions] = useState([])
    const [attributes, setAttributes] = useState([])
    const [expression, setExpression] = useState('')

    useEffect(() => {
        // filter list of options based on selected program
        if (program && programs) {
            const selectedProgram = programs.find((p) => p.id === program)
            const checkedExpressions = validateAndroidExpressions(
                selectedProgram?.programIndicators
            )
            setOptions(checkedExpressions)
            setAttributes(getAttributes(selectedProgram))
        }
    }, [program, programs])

    useEffect(() => {
        // get expression
        if (options && attributes) {
            const indicator = options.find(
                (i) => i.id === settings[CODE]
            )?.expression

            setExpression(getExpressionDescription(indicator, attributes))
        }
    }, [settings[CODE], options])

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
                                    inputWidth={spacers.dp512}
                                    value={expression}
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

TeiHeader.propTypes = {
    settings: PropTypes.object,
    handleChange: PropTypes.func,
    program: PropTypes.string,
}
