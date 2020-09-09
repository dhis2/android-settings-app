import React from 'react'
import PropTypes from '@dhis2/prop-types'
import formStyles from '../../../../styles/Form.module.css'
import { Button, Field } from '@dhis2/ui'

const ButtonField = ({ handleForm, handleDisableSettings, syncElement }) => {
    const { label, helpText } = syncElement

    return (
        <div className={formStyles.rowMargin}>
            <Field helpText={helpText}>
                <Button
                    onClick={handleDisableSettings.open}
                    disabled={handleForm.fields.disableAll}
                >
                    {label}
                </Button>
            </Field>
        </div>
    )
}

ButtonField.propTypes = {
    syncElement: PropTypes.shape({
        label: PropTypes.string,
        helpText: PropTypes.string,
    }),
    handleForm: PropTypes.object,
    handleDisableSettings: PropTypes.object,
}

export default ButtonField
