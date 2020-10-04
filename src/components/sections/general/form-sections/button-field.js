import React from 'react'
import PropTypes from '@dhis2/prop-types'
import formStyles from '../../../../styles/Form.module.css'
import { Button, Field } from '@dhis2/ui'

export const ButtonField = ({ label, helpText, onOpen, disabled }) => (
    <div className={formStyles.rowMargin}>
        <Field helpText={helpText}>
            <Button onClick={onOpen} disabled={disabled}>
                {label}
            </Button>
        </Field>
    </div>
)

ButtonField.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
    onOpen: PropTypes.func,
    disabled: PropTypes.bool,
}
