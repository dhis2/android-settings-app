import i18n from '@dhis2/d2-i18n'
import {
    SingleSelectField,
    SingleSelectOption,
    spacers,
    Tooltip,
    IconInfo16,
    InputField,
    NoticeBox,
} from '@dhis2/ui'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FieldSection } from '../../../components/field'
import {
    getAttributes,
    getExpressionDescription,
    validateAndroidExpressions,
} from './expressionHelper'
import { useGetPrograms } from './ProgramQueries'

const CODE = 'programIndicator'

export const TeiHeader = ({ settings, program, handleChange }) => {
    const { programs } = useGetPrograms()
    const [options, setOptions] = useState([])
    const [attributes, setAttributes] = useState([])
    const [expression, setExpression] = useState('')

    useEffect(() => {
        if (program && programs) {
            const selectedProgram = programs.find((p) => p.id === program)
            setOptions(
                validateAndroidExpressions(selectedProgram?.programIndicators)
            )
            setAttributes(getAttributes(selectedProgram))
        }
    }, [program, programs])

    useEffect(() => {
        if (options) {
            const indicator = options.find(
                (i) => i.id === settings[CODE]
            )?.expression

            setExpression(getExpressionDescription(indicator, attributes))
        }
    }, [settings[CODE], options])

    if (isEmpty(options)) {
        return (
            <NoticeBox>
                {i18n.t(
                    'There are no Program Indicators with valid expressions for Android'
                )}
            </NoticeBox>
        )
    }

    return (
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
                            'Disable elements do not meet Android criteria'
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
    )
}

TeiHeader.propTypes = {
    settings: PropTypes.object,
    handleChange: PropTypes.func,
    program: PropTypes.string,
}
