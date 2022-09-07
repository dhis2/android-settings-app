import { Button, Field } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Field.module.css'

export const ButtonField = ({ label, helpText, onOpen, disabled }) => (
    <div className={styles.rowMargin}>
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
    disabled: PropTypes.bool,
    onOpen: PropTypes.func,
}
