import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from '@dhis2/prop-types'
import buttonStyles from '../styles/Button.module.css'
import { Button, ButtonStrip } from '@dhis2/ui'

const FooterActionButtons = ({
    saveButtonDisabled,
    resetButtonDisabled,
    onResetClick,
    onSave,
}) => (
    <ButtonStrip className={buttonStyles.container__padding}>
        <Button
            primary
            className={buttonStyles.button_marginLeft}
            onClick={onSave}
            disabled={saveButtonDisabled}
        >
            {i18n.t('Save')}
        </Button>
        <Button onClick={onResetClick} disabled={resetButtonDisabled}>
            {i18n.t('Reset all values to default')}
        </Button>
    </ButtonStrip>
)

FooterActionButtons.propTypes = {
    saveButtonDisabled: PropTypes.bool,
    resetButtonDisabled: PropTypes.bool,
    onResetClick: PropTypes.func,
    onSave: PropTypes.func,
}

export default FooterActionButtons
