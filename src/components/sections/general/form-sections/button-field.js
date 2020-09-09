import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import formStyles from '../../../../styles/Form.module.css'
import { Button, Field } from '@dhis2/ui'

export const ButtonField = ({
    handleForm,
    handleDisableSettings,
    syncElement,
}) => {
    const { label, helpText } = syncElement

    return (
        <div className={formStyles.rowMargin}>
            <Field helpText={i18n.t('{{helpText}}', { helpText })}>
                <Button
                    onClick={handleDisableSettings.open}
                    disabled={handleForm.fields.disableAll}
                >
                    {i18n.t('{{label}}', { label })}
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