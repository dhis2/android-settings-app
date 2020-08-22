import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import formStyles from '../../../../styles/Form.module.css'
import { Button, Help } from '@dhis2/ui'

const ButtonField = ({ handleForm, handleDisableSettings, syncElement }) => {
    const { label, helpText } = syncElement

    return (
        <div className={formStyles.rowMargin}>
            <Button
                onClick={handleDisableSettings.open}
                disabled={handleForm.fields.disableAll}
            >
                {i18n.t('{{label}}', { label })}
            </Button>
            <Help>{i18n.t('{{helpText}}', { helpText })}</Help>
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
